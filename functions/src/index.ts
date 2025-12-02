
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
import {auth} from "firebase-functions";
import { onCall, HttpsError } from "firebase-functions/v2/https";

// Export Genkit flows
export * from './ai';

// Initialize Firebase Admin SDK
initializeApp();
const db = getFirestore();

/**
 * Cloud Function that triggers when a new user is created in Firebase Authentication.
 * It creates the corresponding 'account' and 'profile' documents in Firestore,
 * and also creates the first globally sequential Member ID for that account.
 */
export const onUserCreate = auth.user().onCreate(async (user) => {
    const accountRef = db.collection("accounts").doc(user.uid);
    const profileRef = accountRef.collection("profile").doc(user.uid);

    try {
        const isSuperAdmin = user.email === 'mesy.universe@gmail.com';
        const isAiAdmin = user.email === 'ai.admin@mesy.universe';

        const role = isSuperAdmin ? 'Super-admin' : isAiAdmin ? 'AI-admin' : 'Member';
        const verificationStatus = isSuperAdmin || isAiAdmin ? 'verified' : 'unverified';

        // Batch writes for efficiency
        const batch = db.batch();

        // 1. Create the main account document
        batch.set(accountRef, {
            id: user.uid,
            email: user.email,
            role: role,
            verificationStatus: verificationStatus,
            createdAt: new Date().toISOString(),
        });

        // 2. Create the user's private profile document
        batch.set(profileRef, {
            accountId: user.uid,
            id: user.uid,
            firstname: user.displayName?.split(' ')[0] || '',
            lastname: user.displayName?.split(' ').slice(1).join(' ') || '',
            phoneNumber: {
                countryCode: '',
                number: user.phoneNumber || ''
            }
        });

        await batch.commit();
        logger.log(`Successfully created account and profile for user ${user.uid} with role ${role}.`);

        // 3. Conditionally create the first Member ID
        // This is separate because it involves a transaction and conditional logic
        if (isSuperAdmin || isAiAdmin) {
            await createInitialMemberForAdmin(user, role);
        }
        
    } catch (error) {
        logger.error(`Failed to create account structure for user ${user.uid}:`, error);
    }
});


/**
 * Helper function to create the initial Member ID for admin roles within a transaction.
 */
async function createInitialMemberForAdmin(user: auth.UserRecord, role: 'Super-admin' | 'AI-admin') {
    const counterRef = db.collection("counters").doc("members");
    const membersCollectionRef = db.collection('members');

    try {
        const sequentialId = await db.runTransaction(async (transaction) => {
            const counterDoc = await transaction.get(counterRef);
            const nextId = (counterDoc.data()?.lastMemberId || 0) + 1;
            transaction.set(counterRef, { lastMemberId: nextId }, { merge: true });
            return `member.${nextId}`;
        });

        let uplineMemberId = null;
        if (role === 'AI-admin') {
            const superAdminQuery = await membersCollectionRef.where('sequentialMemberId', '==', 'member.1').limit(1).get();
            if (!superAdminQuery.empty) {
                uplineMemberId = superAdminQuery.docs[0].id;
            }
        }

        const newMemberDocRef = membersCollectionRef.doc();
        await newMemberDocRef.set({
            id: newMemberDocRef.id,
            sequentialMemberId: sequentialId,
            accountId: user.uid,
            username: user.email?.split('@')[0] || `user_${user.uid.substring(0,5)}`,
            nickname: user.displayName || user.email?.split('@')[0],
            level: 50, // Admins start at level 50
            uplineMemberId: uplineMemberId,
            createdAt: new Date().toISOString(),
        });
        
        logger.log(`Successfully created Member ID ${sequentialId} for ${role} ${user.uid}`);

    } catch (error) {
         logger.error(`Failed to create initial member ID for admin ${user.uid}:`, error);
    }
}

/**
 * Callable Cloud Function for a user to create a new Member ID.
 */
export const createMemberId = onCall(async (request) => {
    if (!request.auth) {
        throw new HttpsError('unauthenticated', 'You must be logged in to create a Member ID.');
    }

    const { nickname, avatar } = request.data;
    if (!nickname || typeof nickname !== 'string' || nickname.trim().length === 0) {
        throw new HttpsError('invalid-argument', 'A valid nickname is required.');
    }

    const accountId = request.auth.uid;
    const counterRef = db.collection("counters").doc("members");
    const membersCollectionRef = db.collection('members');

    try {
        // Run as a transaction to ensure atomic ID generation
        const newMemberData = await db.runTransaction(async (transaction) => {
            const counterDoc = await transaction.get(counterRef);
            const nextId = (counterDoc.data()?.lastMemberId || 0) + 1;

            // Check if user is creating their first member ID to link to upline if applicable
            const existingMembersQuery = membersCollectionRef.where('accountId', '==', accountId).limit(1);
            const existingMembersSnapshot = await transaction.get(existingMembersQuery);
            
            let uplineMemberId = null;
            if (existingMembersSnapshot.empty) {
                // This is the user's first Member ID.
                // You could implement logic here to find an upline if necessary.
                // For now, it defaults to null.
            }

            transaction.set(counterRef, { lastMemberId: nextId }, { merge: true });
            
            const sequentialId = `member.${nextId}`;
            const newMemberDocRef = membersCollectionRef.doc();

            const memberData = {
                id: newMemberDocRef.id,
                sequentialMemberId: sequentialId,
                accountId: accountId,
                username: nickname.trim().toLowerCase().replace(/\s+/g, '.') + `.${nextId}`,
                nickname: nickname.trim(),
                level: 0,
                uplineMemberId: uplineMemberId,
                avatar: avatar || '',
                createdAt: new Date().toISOString(),
            };

            transaction.set(newMemberDocRef, memberData);
            return memberData;
        });

        logger.log(`Successfully created Member ID ${newMemberData.sequentialMemberId} for user ${accountId}`);
        return newMemberData;

    } catch (error) {
        logger.error(`Error creating Member ID for user ${accountId}:`, error);
        throw new HttpsError('internal', 'An error occurred while creating the Member ID.');
    }
});



/**
 * Cloud Function that triggers when a user is deleted from Firebase Authentication.
 * It automatically deletes the corresponding account document from Cloud Firestore
 * and recursively deletes all documents within its subcollections.
 */
export const onUserDelete = auth.user().onDelete(async (user) => {
  const accountDocRef = db.collection("accounts").doc(user.uid);
  
  logger.log(`Account for ${user.email} (${user.uid}) deleted. Deleting all account data from Firestore.`);

  try {
    const membersQuery = db.collection('members').where('accountId', '==', user.uid);
    const membersSnapshot = await membersQuery.get();
    
    const batch = db.batch();
    
    membersSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
        logger.log(`Queueing member document ${doc.id} for deletion.`);
    });
    
    await batch.commit();
    logger.log(`Successfully deleted member documents for user: ${user.uid}`);
    
    // Also delete the account and its subcollections
    await db.recursiveDelete(accountDocRef);
    logger.log(`Successfully completed recursive delete for account document: ${user.uid}`);

  } catch (error) {
    logger.error(`Error deleting Firestore data for user: ${user.uid}`, error);
  }
});


/**
 * A callable Cloud Function that acts as a proxy for Google Compute Engine API calls.
 * This function can be securely called from the client-side application.
 *
 * In a real-world scenario, you would add logic here to:
 * 1. Authenticate and authorize the user (e.g., check if they are an admin).
 * 2. Use the Google Cloud Client Library for Node.js to interact with the Compute Engine API.
 * 3. Start, stop, or manage VM instances based on the data received from the client.
 * 4. Return the result of the operation to the client.
 */
export const computeEngineProxy = onCall((request) => {
  // Log the data received from the client
  logger.info("computeEngineProxy was called with data:", request.data);

  // Example: Check if user is authenticated (recommended for most functions)
  if (!request.auth) {
    logger.warn("Unauthenticated user tried to call computeEngineProxy.");
    return { success: false, message: "Authentication required." };
  }

  // TODO: Add logic here to call the Compute Engine API using Google Cloud client libraries.
  // For example:
  // const {InstancesClient} = require('@google-cloud/compute');
  // const instancesClient = new InstancesClient();
  // await instancesClient.start({project: 'your-project-id', zone: 'your-zone', instance: 'your-instance-name'});

  // For now, we'll just return a success message.
  const jobType = request.data.jobType || "unknown job";
  logger.info(`Simulating Compute Engine job of type: ${jobType}`);

  return {
    success: true,
    message: `Successfully received request to start a Compute Engine job of type '${jobType}'.`,
  };
});
