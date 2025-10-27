import { UserAuthForm } from "@/components/auth/user-auth-form"
import Link from "next/link"

export default function MemberLoginPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Member Login
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access the Member Zone.
        </p>
      </div>
      <UserAuthForm action="login" />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Not a member yet?{" "}
        <Link
          href="/member-signup"
          className="underline underline-offset-4 hover:text-primary"
        >
          Register here
        </Link>
        .
      </p>
    </>
  )
}
