"use client";

import { useEffect, useState } from "react";
import { onSnapshot, doc, type Firestore, type DocumentData } from "firebase/firestore";
import { useFirestore } from "../provider";

export function useDoc<T = DocumentData>(path: string) {
  const firestore = useFirestore();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!firestore || !path) {
        setLoading(false);
        return;
    };

    // Basic path validation
    const pathSegments = path.split('/').filter(Boolean);
    if (pathSegments.length % 2 !== 0) {
      console.error(`Invalid Firestore document path: ${path}. Path must have an even number of segments.`);
      setError(new Error("Invalid Firestore document path."));
      setLoading(false);
      return;
    }

    try {
      const docRef = doc(firestore, path);
      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            setData({ id: docSnap.id, ...docSnap.data() } as T);
          } else {
            setData(null); // Document does not exist
          }
          setLoading(false);
        },
        (err) => {
          console.error(`Error fetching document from ${path}:`, err);
          setError(err);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err: any) {
      console.error(`Error setting up document listener for ${path}:`, err);
      setError(err);
      setLoading(false);
    }
  }, [firestore, path]);

  return { data, loading, error };
}
