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
import {auth, firestore} from "firebase-functions";
import { onCall } from "firebase-functions/v2/https";

// Export Genkit flows
export * from './ai';

// Initialize Firebase Admin SDK
initializeApp();
const db = getFirestore();

/**
 * Cloud Function that triggers when a new user is created in Firebase Authentication.
 * It creates the corresponding 'account' and 'profile' documents in Firestore.
 */
export const onUserCreate = auth.user().onCreate(async (user) => {
    const accountRef = db.collection("accounts").doc(user.uid);
    const profileRef = db.collection("accounts").doc(user.uid).collection("profile").doc(user.uid);

    try {
        const isSuperAdmin = user.email === 'mesy.universe@gmail.com';

        // Create the main account document
        await accountRef.set({
            id: user.uid,
            email: user.email,
            role: isSuperAdmin ? 'Super-admin' : 'Member',
            verificationStatus: 'unverified',
            createdAt: new Date().toISOString(),
        });
        
        // Create the user's private profile document
        await profileRef.set({
            accountId: user.uid,
            id: user.uid,
            // Pre-fill with any available data, otherwise empty strings
            firstname: user.displayName?.split(' ')[0] || '',
            lastname: user.displayName?.split(' ').slice(1).join(' ') || '',
            phoneNumber: {
                countryCode: '',
                number: user.phoneNumber || ''
            }
        });

        logger.log(`Successfully created account and profile for user ${user.uid}`);
        
    } catch (error) {
        logger.error(`Failed to create account structure for user ${user.uid}:`, error);
    }
});


/**
 * Cloud Function that triggers when a new Member ID is created in the global 'members' collection.
 * It generates a globally sequential, human-readable member ID (e.g., member.1, member.2)
 * and saves it back to the member's document.
 */
export const onMemberCreate = firestore.document('members/{memberId}').onCreate(async (snap, context) => {
    const { memberId } = context.params;
    const memberRef = db.collection("members").doc(memberId);
    const counterRef = db.collection("counters").doc("members");

    try {
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

        await memberRef.update({ sequentialMemberId: sequentialId });
        logger.log(`Successfully assigned sequential ID '${sequentialId}' to member ${memberId}`);
        
    } catch (error) {
        logger.error(`Failed to generate sequential ID for member ${memberId}:`, error);
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
    // Note: Deleting associated 'member' documents would require a more complex query
    // and is omitted here for simplicity. A production app would need to handle this.
    await db.recursiveDelete(accountDocRef);
    logger.log(`Successfully deleted Firestore account data for user: ${user.uid}`);
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
