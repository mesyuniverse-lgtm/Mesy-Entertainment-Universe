"use client";

import { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  endBefore,
  limitToLast,
  type Firestore,
  type DocumentData,
  type Query,
} from "firebase/firestore";
import { useFirestore } from "../provider";

interface UseCollectionOptions {
  where?: [string, any, any][];
  orderBy?: [string, "asc" | "desc"];
  limit?: number;
  startAfter?: any;
  endBefore?: any;
}

export function useCollection<T = DocumentData>(
  path: string,
  options?: UseCollectionOptions,
) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!firestore) return;

    try {
      let q: Query<DocumentData> = collection(firestore, path);

      if (options?.where) {
        options.where.forEach((w) => {
          q = query(q, where(w[0], w[1], w[2]));
        });
      }
      if (options?.orderBy) {
        q = query(q, orderBy(options.orderBy[0], options.orderBy[1]));
      }
      if (options?.startAfter) {
        q = query(q, startAfter(options.startAfter));
      }
      if (options?.endBefore) {
        q = query(q, endBefore(options.endBefore));
      }
      if (options?.limit) {
        if (options.endBefore) {
          q = query(q, limitToLast(options.limit));
        } else {
          q = query(q, limit(options.limit));
        }
      }

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const result: T[] = [];
          snapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() } as T);
          });
          setData(result);
          setLoading(false);
        },
        (err) => {
          console.error(`Error fetching collection from ${path}:`, err);
          setError(err);
          setLoading(false);
        },
      );

      return () => unsubscribe();
    } catch (err: any) {
      console.error(`Error setting up collection listener for ${path}:`, err);
      setError(err);
      setLoading(false);
    }
  }, [firestore, path, JSON.stringify(options)]);

  return { data, loading, error };
}
