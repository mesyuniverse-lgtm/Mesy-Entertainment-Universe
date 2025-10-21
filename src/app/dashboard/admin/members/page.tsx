'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, MailCheck, Phone, Wallet, UserPlus } from "lucide-react";
import Link from 'next/link';

export default function AdminMembersPage() {
    // In a real app, this status would come from the user's data in Firestore.
    const isUserVerified = true; 

    const verificationSteps = [
        { name: "Email Verified", icon: <MailCheck className="h-5 w-5" />, completed: true },
        { name: "Phone Number Verified", icon: <Phone className="h-5 w-5" />, completed: true },
        { name: "Payment Method Connected", icon: <Wallet className="h-5 w-5" />, completed: true },
    ];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Member Registration</h1>
                <p className="text-muted-foreground">Register new Member IDs under your verified User Account.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Verification Status</CardTitle>
                        <CardDescription>You must be a Verified User to register new Member IDs.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isUserVerified ? (
                            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-lg flex flex-col items-center text-center">
                                <CheckCircle2 className="h-12 w-12 text-green-500" />
                                <h3 className="mt-4 text-lg font-semibold text-green-400">Account Verified</h3>
                                <p className="mt-1 text-sm text-muted-foreground">You have full access to create and manage Member IDs.</p>
                                 <div className="mt-4 space-y-2 text-left w-full">
                                    {verificationSteps.map(step => (
                                        <div key={step.name} className="flex items-center gap-2 text-sm">
                                            <CheckCircle2 className="h-4 w-4 text-green-500"/>
                                            <span className="text-muted-foreground">{step.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                             <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg flex flex-col items-center text-center">
                                <AlertTriangle className="h-12 w-12 text-red-500" />
                                <h3 className="mt-4 text-lg font-semibold text-red-500">กรุณายืนยันตัวตน</h3>
                                <p className="mt-1 text-sm text-muted-foreground">Your account is not verified. Please complete all verification steps to proceed.</p>
                                <Button className="mt-4" variant="destructive">Start Verification</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Membership Conditions</CardTitle>
                        <CardDescription>Rules for registering a new Member ID.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <p><strong>Universal Eligibility:</strong> Membership is open to everyone, regardless of age. You can even register for newborns or pets.</p>
                        <p><strong>Lifetime Membership:</strong> Once registered, a Member ID is for life.</p>
                        <p><strong>Guardian Responsibility:</strong> For members under 14, the User Account holder acts as the guardian until the child can manage their own account.</p>
                        <p><strong>No Limit:</strong> A single Verified User can register and manage an unlimited number of Member IDs.</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><UserPlus className="text-primary" />Create New Member</CardTitle>
                    <CardDescription>Start the process of adding a new Member ID to your network.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Button size="lg" disabled={!isUserVerified} asChild>
                        <Link href="/dashboard/admin/members/register">
                            Register New Member ID
                        </Link>
                    </Button>
                     {!isUserVerified && <p className="text-sm text-red-500 mt-2">You must verify your account before you can register members.</p>}
                </CardContent>
            </Card>
        </div>
    );
}
