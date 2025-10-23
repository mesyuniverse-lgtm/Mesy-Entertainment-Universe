'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Loader } from 'lucide-react';

// This is a transitional component. The logic has been moved to /src/app/(member)/layout.tsx
// This file can be removed in a future cleanup.
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
        router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background text-white">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default Layout;
