
'use client';

import * as React from "react";
import Link from "next/link";
import { useAuth } from "@/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function ForgotPasswordPage() {
    const [email, setEmail] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSent, setIsSent] = React.useState(false);
    const auth = useAuth();
    const { toast } = useToast();

    async function handleResetPassword(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setIsSent(true);
            toast({
                title: "Password Reset Email Sent",
                description: "Please check your inbox for instructions to reset your password.",
            });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error Sending Email",
                description: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Reset Your Password
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your email and we'll send you a link to get back into your account.
                </p>
            </div>
            
            {isSent ? (
                <div className="text-center p-4 bg-secondary/50 rounded-md">
                    <p className="text-foreground">An email has been sent to <strong>{email}</strong>. Please follow the instructions in the email to reset your password.</p>
                </div>
            ) : (
                <form onSubmit={handleResetPassword}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <Button disabled={isLoading}>
                            {isLoading && (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            )}
                            Send Reset Link
                        </Button>
                    </div>
                </form>
            )}

            <p className="px-8 text-center text-sm text-muted-foreground">
                <Link
                    href="/login"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Back to Login
                </Link>
            </p>
        </div>
    );
}
