import { UserAuthForm } from "@/components/auth/user-auth-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome Back, Member
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your dashboard.
        </p>
      </div>
      <UserAuthForm action="login" redirectPath="/create-member-id" />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Not a member yet?{" "}
        <Link
          href="/signup"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign Up Now
        </Link>
      </p>
    </>
  );
}
