'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getRemoteConfig } from 'firebase/remote-config';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  if (typeof window !== 'undefined') {
    // Ensure the reCAPTCHA placeholder is handled.
    // This should be set to `true` for production with a proper site key.
    (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;

    // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure
    // this key is from the correct project.
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider('6Ld-iYkpAAAAAHi-g3OBCx6F9S5cLeZ5LdGfcl4-'), // Replace with your site key
      isTokenAutoRefreshEnabled: true
    });
  }

  return getSdks(app);
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
    remoteConfig: getRemoteConfig(firebaseApp),
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
export * from './remote-config/use-remote-config';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
