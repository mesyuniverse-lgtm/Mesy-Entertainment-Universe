
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
import { onCall } from "firebase-functions/v2/https";

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
    const counterRef = db.collection("counters").doc("members");
    const newMemberDocRef = db.collection('members').doc(); // Create a new doc reference with a random ID

    try {
        const isSuperAdmin = user.email === 'mesy.universe@gmail.com';
        const isAiAdmin = user.email === 'ai.admin@mesy.universe';

        let role = 'Member';
        let level = 0;
        let verificationStatus = 'unverified';
        let uplineMemberId = null;

        // Generate the sequential ID within a transaction to ensure atomicity
        const sequentialId = await db.runTransaction(async (transaction) => {
            const counterDoc = await transaction.get(counterRef);
            let nextId = 1;
            if (counterDoc.exists) {
                const data = counterDoc.data();
                if (data && typeof data.lastMemberId === 'number') {
                    nextId = data.lastMemberId + 1;
                }
            }
            transaction.set(counterRef, { lastMemberId: nextId }, { merge: true });
            return `member.${nextId}`;
        });
        
        if (isSuperAdmin) {
            role = 'Super-admin';
            level = 50;
            verificationStatus = 'verified';
        } else if (isAiAdmin) {
            role = 'AI-admin';
            level = 50;
            verificationStatus = 'verified';
            // Find Super-admin's member document to set as upline
            const superAdminAccountQuery = await db.collection('accounts').where('email', '==', 'mesy.universe@gmail.com').limit(1).get();
            if (!superAdminAccountQuery.empty) {
                const superAdminAccountId = superAdminAccountQuery.docs[0].id;
                const superAdminMemberQuery = await db.collection('members').where('accountId', '==', superAdminAccountId).limit(1).get();
                if(!superAdminMemberQuery.empty) {
                    uplineMemberId = superAdminMemberQuery.docs[0].id;
                }
            }
        }

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
        // The form data is not directly available here. We rely on the `user` object from Auth.
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
        
        // 3. Create the first Member ID document for this user with the new sequential ID
        batch.set(newMemberDocRef, {
            id: newMemberDocRef.id,
            sequentialMemberId: sequentialId,
            accountId: user.uid,
            username: user.email?.split('@')[0] || `user_${user.uid.substring(0,5)}`,
            nickname: user.displayName || user.email?.split('@')[0],
            level: level,
            uplineMemberId: uplineMemberId,
            createdAt: new Date().toISOString(),
        });

        await batch.commit();

        logger.log(`Successfully created structures for user ${user.uid} with role ${role} and Member ID ${sequentialId}`);
        
    } catch (error) {
        logger.error(`Failed to create account structure for user ${user.uid}:`, error);
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
    // Note: Deleting associated 'member' documents requires a more complex query.
    // This will now be handled separately if needed, as members are in a top-level collection.
    const membersQuery = await db.collection('members').where('accountId', '==', user.uid).get();
    const batch = db.batch();
    membersQuery.docs.forEach(doc => {
        batch.delete(doc.ref);
        logger.log(`Queueing member document ${doc.id} for deletion.`);
    });
    
    // Also delete the account and its subcollections
    await db.recursiveDelete(accountDocRef);
    logger.log(`Queueing recursive delete for account document: ${user.uid}`);
    
    await batch.commit();
    logger.log(`Successfully deleted Firestore data for user: ${user.uid}`);

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

    