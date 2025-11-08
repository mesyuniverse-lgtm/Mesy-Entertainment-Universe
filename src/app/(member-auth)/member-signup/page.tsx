'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CreditCard, Phone, UserCheck, Check, XCircle } from "lucide-react";
import Link from "next/link";

export default function MemberSignupPage() {

    // Mock verification status. In a real app, this would come from user data.
    const verificationStatus = {
        email: true,
        phone: false,
        payment: false,
    };

    const allPreviousStepsDone = verificationStatus.email && verificationStatus.phone && verificationStatus.payment;

    return (
        <div className="w-full max-w-md">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">Become a Member</h1>
                <p className="text-sm text-muted-foreground">
                    Complete the steps below to unlock your ceremonial journey.
                </p>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                    <span className="font-medium flex items-center gap-3"><UserCheck className="h-5 w-5 text-muted-foreground"/> 1. Email Verification</span>
                    {verificationStatus.email ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <XCircle className="h-6 w-6 text-destructive" />}
                </div>
                 <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                    <span className="font-medium flex items-center gap-3"><Phone className="h-5 w-5 text-muted-foreground"/> 2. Phone Number Verification</span>
                    {verificationStatus.phone ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <Button size="sm" variant="outline">Verify</Button>}
                </div>
                 <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                    <span className="font-medium flex items-center gap-3"><CreditCard className="h-5 w-5 text-muted-foreground"/> 3. Connect Payment Method</span>
                    {verificationStatus.payment ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <Button size="sm" variant="outline">Connect</Button>}
                </div>
                 <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                    <span className="font-medium flex items-center gap-3">4. Pay Registration Fee ($9.99)</span>
                    <span className="text-xs text-muted-foreground">
                        {allPreviousStepsDone ? <Button size="sm">Pay Now</Button> : "Complete previous steps"}
                    </span>
                </div>
            </div>

            <div className="mt-6 space-y-4">
                 {/* This would be a form in a real implementation */}
                <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="text-muted-foreground">ผู้แนะนำ</Button>
                    <Button variant="outline" className="text-muted-foreground">ใส่รหัสผู้แนะนำถ้ามี</Button>
                </div>
                <Button className="w-full text-lg h-12" disabled={!allPreviousStepsDone}>
                    CREATE MESY MEMBER ID
                </Button>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
                >
                Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
                >
                Privacy Policy
                </Link>
                .
            </p>
            <p className="mt-2 text-center text-sm text-muted-foreground">
                Already a member?{" "}
                <Link
                href="/member-login"
                className="underline underline-offset-4 hover:text-primary"
                >
                Login
                </Link>
                .
            </p>
        </div>
    );
}
