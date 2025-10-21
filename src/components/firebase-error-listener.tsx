'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';

// This is a client-side component that listens for errors from the data layer.
// When an error is received, it throws an uncaught exception, which is then
// displayed by the Next.js development error overlay.
//
// NOTE: This component should only be used in development.
export function FirebaseErrorListener() {
  useEffect(() => {
    const handlePermissionError = (error: Error) => {
      // Throw an uncaught exception.
      setTimeout(() => {
        throw error;
      });
    };

    errorEmitter.on('permission-error', handlePermissionError);

    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, []);

  return null;
}
