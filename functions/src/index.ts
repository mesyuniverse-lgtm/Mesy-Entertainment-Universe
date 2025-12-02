/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {initializeApp} from "firebase-admin/app";
import {getFirestore, FieldValue} from "firebase-admin/firestore";
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
 * It generates a sequential, human-readable account ID (e.g., account.1, account.2)
 * and saves it to the user's account document in Firestore.
 */
export const onUserCreate = auth.user().onCreate(async (user) => {
    const counterRef = db.collection("counters").doc("accounts");
    const userAccountRef = db.collection("accounts").doc(user.uid);

    try {
        const sequentialId = await db.runTransaction(async (transaction) => {
            const counterDoc = await transaction.get(counterRef);
            
            let nextId = 1;
            if (counterDoc.exists) {
                const data = counterDoc.data();
                if (data && typeof data.lastAccountId === 'number') {
                    nextId = data.lastAccountId + 1;
                }
            }
            
            transaction.set(counterRef, { lastAccountId: nextId }, { merge: true });
            
            return `account.${nextId}`;
        });

        await userAccountRef.update({ sequentialAccountId: sequentialId });
        logger.log(`Successfully assigned sequential ID '${sequentialId}' to user ${user.uid}`);
        
    } catch (error) {
        logger.error(`Failed to generate sequential ID for user ${user.uid}:`, error);
    }
});


/**
 * Cloud Function that triggers when a user is deleted from Firebase Authentication.
 * It automatically deletes the corresponding account document from Cloud Firestore
 * and recursively deletes all documents within its subcollections.
 */
export const onUserDelete = auth.user().onDelete(async (user) => {
  const firestore = getFirestore();
  const accountDocRef = firestore.collection("accounts").doc(user.uid);
  
  logger.log(`Account for ${user.email} (${user.uid}) deleted. Deleting all account data from Firestore.`);

  try {
    // Get all subcollections of the account document
    const collections = await accountDocRef.listCollections();
    for (const collection of collections) {
        const documents = await collection.listDocuments();
        for (const doc of documents) {
            await doc.delete();
            logger.log(`Deleted document: ${doc.path}`);
        }
        logger.log(`All documents in subcollection ${collection.id} deleted.`);
    }

    // After deleting all subcollections, delete the main account document
    await accountDocRef.delete();
    logger.log(`Successfully deleted Firestore data and all subcollections for account: ${user.uid}`);
  } catch (error) {
    logger.error(`Error deleting Firestore data for account: ${user.uid}`, error);
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
