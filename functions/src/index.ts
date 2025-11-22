
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

// Initialize Firebase Admin SDK
initializeApp();

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
