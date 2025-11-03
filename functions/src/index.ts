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
 * It automatically deletes the corresponding user document from Cloud Firestore.
 */
export const onUserDelete = auth.user().onDelete(async (user) => {
  const userDocRef = getFirestore().collection("users").doc(user.uid);
  
  logger.log(`User account for ${user.email} (${user.uid}) deleted. Deleting user data from Firestore.`);

  try {
    // Note: This only deletes the document itself. For subcollections, a more complex
    // recursive delete function would be required. For this project's scope,
    // deleting the main user document is sufficient.
    await userDocRef.delete();
    logger.log(`Successfully deleted Firestore data for user: ${user.uid}`);
  } catch (error) {
    logger.error(`Error deleting Firestore data for user: ${user.uid}`, error);
  }
});
