"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { initializeApp, type FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./config";
import { FirebaseProvider } from "./provider";

// The "official" context for the Firebase app object.
export const FirebaseAppContext = createContext<FirebaseApp | undefined>(
  undefined,
);

type FirebaseServices = {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
};

// Top-level provider for all Firebase services.
export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [services, setServices] = useState<FirebaseServices | null>(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const firestore = getFirestore(app);

    setServices({ app, auth, firestore });
  }, []);

  if (!services) {
    // Show a loading screen until Firebase is initialized.
    // This can be customized as needed.
    return null;
  }

  return (
    <FirebaseAppContext.Provider value={services.app}>
      <FirebaseProvider
        app={services.app}
        auth={services.auth}
        firestore={services.firestore}
      >
        {children}
      </FirebaseProvider>
    </FirebaseAppContext.Provider>
  );
}

export const useFirebaseApp = () => useContext(FirebaseAppContext);
