'use client';
import { useState, useEffect } from 'react';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';

// Return type for useUser() - specific to user auth state
export interface UserHookResult {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

/**
 * Hook specifically for accessing the authenticated user's state from a given Auth instance.
 * This provides the User object, loading status, and any auth errors.
 * @param {Auth} auth - The Firebase Auth service instance.
 * @returns {UserHookResult} Object with user, isUserLoading, userError.
 */
export const useUser = (auth: Auth): UserHookResult => {
  const [userAuthState, setUserAuthState] = useState<UserHookResult>({
    user: null,
    isUserLoading: true, // Start loading until first auth event
    userError: null,
  });

  // Effect to subscribe to Firebase auth state changes
  useEffect(() => {
    // If no Auth service instance, cannot determine user state
    if (!auth) {
      setUserAuthState({ user: null, isUserLoading: false, userError: new Error("Auth service not provided.") });
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => { // Auth state determined
        setUserAuthState({ user: firebaseUser, isUserLoading: false, userError: null });
      },
      (error) => { // Auth listener error
        console.error("useUser: onAuthStateChanged error:", error);
        setUserAuthState({ user: null, isUserLoading: false, userError: error });
      }
    );

    return () => unsubscribe(); // Cleanup
  }, [auth]); // Depends on the auth instance

  return userAuthState;
};
