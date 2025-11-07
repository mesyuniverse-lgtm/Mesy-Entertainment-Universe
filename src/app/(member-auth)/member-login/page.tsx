
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fingerprint, Smartphone, User, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import styles from './MemberLoginPage.module.css';

const Star = ({ style }: { style: React.CSSProperties }) => <div className={styles.stars} style={style}></div>;

const LoadingVortex = () => {
    const [stars, setStars] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        const generateStars = () => {
            const newStars = Array.from({ length: 100 }).map((_, i) => {
                const style = {
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                };
                return <Star key={i} style={style} />;
            });
            setStars(newStars);
        };
        generateStars();
    }, []);
    
    return (
        <div className={styles.loadingVortex} style={{ perspective: '800px' }}>
            <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
                {stars}
            </div>
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="mt-4 text-xl font-semibold text-white">Entering MESY Universe...</p>
        </div>
    );
};


export default function MemberLoginPage() {
    const [memberId, setMemberId] = useState('');
    const [pin, setPin] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGateOpen, setIsGateOpen] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { toast } = useToast();

    // Mock verification status for non-members
    const verificationStatus = {
        email: true,
        phone: false,
        payment: false,
    };
    const allVerified = Object.values(verificationStatus).every(status => status);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Mock Login Logic
        setTimeout(() => {
            // Replace with actual Firebase Auth logic
            if (memberId === 'admin@mesy.io' && pin === '1234') {
                toast({
                    title: "Access Granted",
                    description: "Welcome back, Member.",
                });
                setIsGateOpen(true);
                // Redirect after animation
                setTimeout(() => {
                    router.push('/dashboard');
                }, 2500);
            } else if (memberId === 'user@mesy.io') {
                setIsLoading(false);
                setError('This ID belongs to a regular user, not a member.');
                 toast({
                    variant: "destructive",
                    title: "Access Denied",
                    description: "Please use the regular login page or upgrade to a member.",
                });
            }
            else {
                setIsLoading(false);
                setError('Invalid Member ID or PIN.');
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: "Invalid Member ID or PIN.",
                });
            }
        }, 1000);
    };

    const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 4) {
            setPin(value);
        }
    };

    return (
        <div className={cn("transition-opacity duration-1000", isGateOpen ? "opacity-0" : "opacity-100")}>
            <div className={cn(styles.gateContainer, isGateOpen && styles.gateOpen)}>
                <LoadingVortex />
                <div className={cn(styles.door, styles.doorLeft)}></div>
                <div className={cn(styles.door, styles.doorRight)}></div>
                
                <Card className="relative z-20 w-[90%] max-w-[380px] bg-background/80 backdrop-blur-sm border-primary/20">
                    <CardHeader className="text-center">
                        <CardTitle>Member Access</CardTitle>
                        <CardDescription>Enter your credentials to pass through the gate.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="member-id" className="flex items-center gap-2"><User /> MESY Member ID</Label>
                                <Input id="member-id" placeholder="Your Member ID" value={memberId} onChange={e => setMemberId(e.target.value)} disabled={isLoading} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pin" className="flex items-center gap-2">PIN Code</Label>
                                <Input id="pin" type="password" placeholder="••••" value={pin} onChange={handlePinChange} disabled={isLoading} maxLength={4} className="tracking-[1em] text-center"/>
                            </div>
                            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Unlock Gate
                            </Button>
                        </form>
                        <div className="mt-4 flex justify-center gap-4">
                             <Button variant="outline" size="icon" disabled><Fingerprint /></Button>
                             <Button variant="outline" size="icon" disabled><Smartphone /></Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            {/* Non-member section */}
            <Card className="mt-8 bg-card/50">
                 <CardHeader>
                    <CardTitle>Not a Member?</CardTitle>
                    <CardDescription>Complete the steps below to unlock your ceremonial journey.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                        <span className="font-medium">1. Email Verification</span>
                        {verificationStatus.email ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <XCircle className="h-6 w-6 text-destructive" />}
                    </div>
                     <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                        <span className="font-medium">2. Phone Number Verification</span>
                        {verificationStatus.phone ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <Button size="sm" variant="outline" asChild><Link href="/users/settings">Verify</Link></Button>}
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                        <span className="font-medium">3. Connect Payment Method</span>
                        {verificationStatus.payment ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <Button size="sm" variant="outline" asChild><Link href="/users/payment">Connect</Link></Button>}
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                        <span className="font-medium">4. Pay Registration Fee ($9.99)</span>
                        {allVerified ? <Button size="sm">Pay Now</Button> : <span className="text-xs text-muted-foreground">Complete previous steps</span>}
                    </div>
                </CardContent>
                <CardContent className="text-center">
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Are you a regular user?{" "}
                        <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                        Login here
                        </Link>
                        .
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

