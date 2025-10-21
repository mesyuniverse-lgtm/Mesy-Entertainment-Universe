'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Users, DollarSign, Gem, Shield, Star, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function RegisterMemberPage() {
    // In a real app, this status would come from the user's data.
    const isUserVerified = true; 

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold tracking-tight font-headline">Register a New Member ID</h1>
                <p className="text-muted-foreground mt-2">Initiate the ceremonial process of creating a new lifelong Member ID.</p>
            </div>

            <Card className="shadow-2xl shadow-primary/10">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                        <Gem className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="!mt-4 text-2xl">Membership Terms & Agreement</CardTitle>
                    <CardDescription>Please review the terms before creating a new Member ID.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                        <div className="space-y-4 rounded-lg border p-4">
                            <h3 className="font-semibold flex items-center gap-2"><DollarSign className="h-5 w-5 text-green-500"/>Fees & Income</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-3">
                                    <p><strong className="text-foreground">Registration Fee:</strong> A one-time payment of <span className="font-bold text-primary">$9.99</span> is required.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <p><strong className="text-foreground">Service Fee:</strong> 3% of total monthly income is deducted for system maintenance.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                     <p><strong className="text-foreground">Income Source:</strong> Earn <span className="font-bold text-green-400">$1 per downline member</span>, per month.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4 rounded-lg border p-4">
                            <h3 className="font-semibold flex items-center gap-2"><Users className="h-5 w-5 text-blue-500"/>Levels & Growth</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-3">
                                    <p><strong className="text-foreground">Level System:</strong> Progress from Level 0 to 50 based on your downline count.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <p><strong className="text-foreground">Maximum Income:</strong> Income growth is capped at 50,000 downline members (Level 50), providing a stable, lifelong monthly income.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <p><strong className="text-foreground">ID Sequencing:</strong> Member IDs are assigned sequentially (e.g., #1, #2, #3...) based on registration order.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <Separator />

                    <div className="text-center">
                        <h3 className="font-semibold">Verification Status</h3>
                        {isUserVerified ? (
                            <div className="mt-2 flex items-center justify-center gap-2 text-green-500">
                                <CheckCircle2 className="h-5 w-5" />
                                <p>Your User Account is verified and eligible to register members.</p>
                            </div>
                        ) : (
                            <div className="mt-2 flex items-center justify-center gap-2 text-red-500">
                                <AlertTriangle className="h-5 w-5" />
                                <p>Your User Account is not verified. Please complete verification.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                             <Button 
                                size="lg" 
                                className={cn(
                                    "w-full text-lg",
                                    isUserVerified ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                                )}
                                disabled={!isUserVerified}
                            >
                                {isUserVerified ? 'Agree & Create Member ID' : 'Verification Required'}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Final Confirmation</AlertDialogTitle>
                                <AlertDialogDescription>
                                    You are about to create a new, lifelong Member ID. A one-time fee of $9.99 will be charged to your primary payment method. This action cannot be undone. Do you wish to proceed?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Proceed with Registration</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </div>
    );
}
