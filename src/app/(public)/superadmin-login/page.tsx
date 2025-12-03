'use client';

import { UserAuthForm } from '@/components/auth/user-auth-form';
import Link from 'next/link';

export default function SuperAdminLoginPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-primary" style={{textShadow: '0 0 5px hsl(var(--primary) / 0.5)'}}>
          Welcome Super-Admin
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access the command center.
        </p>
      </div>
      <UserAuthForm
        action="login"
        redirectPath="/sup-profile"
        role="Super-admin"
      />
      <p className="px-8 text-center text-sm text-muted-foreground">
        This is a restricted access area.
        <br />
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Return to member login
        </Link>
      </p>
    </>
  );
}
