'use client';

import React, { useMemo, type ReactNode, useEffect } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    return initializeFirebase();
  }, []);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && firebaseServices.firebaseApp) {
      // Set the debug token to true for development environments.
      // This should be removed or set to false in production.
      if (process.env.NODE_ENV === 'development') {
        (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
      }

      initializeAppCheck(firebaseServices.firebaseApp, {
        provider: new ReCaptchaV3Provider('6Ld-iYkpAAAAAHi-g3OBCx6F9S5cLeZ5LdGfcl4-'), // Replace with your public site key
        isTokenAutoRefreshEnabled: true,
      });
    }
  }, [firebaseServices.firebaseApp]);

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
      remoteConfig={firebaseServices.remoteConfig}
    >
      {children}
    </FirebaseProvider>
  );
}
