
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fingerprint, Smartphone, User, Loader2, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function TheDoorPage() {
    const [memberId, setMemberId] = useState('');
    const [pin, setPin] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { toast } = useToast();
    const auth = useAuth();
    
    const sonyaAvatar = PlaceHolderImages.find(i => i.id === 'female-archer-1');


    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const memberEmails: { [key: string]: string } = {
            'admin@mesy.io': 'admin@mesy.io',
            'tipyatida@gmail.com': 'tipyatida@gmail.com',
            'mesy.universe@gmail.com': 'mesy.universe@gmail.com'
        };

        const email = memberEmails[memberId];

        if (!email) {
            setError('Invalid Member ID or PIN.');
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: "Invalid Member ID or PIN.",
            });
            setIsLoading(false);
            return;
        }

        if (pin === '1234' || pin === '0000') {
            const mockPassword = 'password'; 
             signInWithEmailAndPassword(auth, email, mockPassword)
                .then(userCredential => {
                    toast({
                        title: "Access Granted",
                        description: "Welcome back, Member.",
                    });
                    
                    if (email === 'mesy.universe@gmail.com') {
                        router.push('/sup-dashboard');
                    } else {
                        router.push('/dashboard');
                    }
                })
                .catch(authError => {
                    setError('Authentication failed. Please check credentials.');
                     toast({
                        variant: "destructive",
                        title: "Authentication Failed",
                        description: authError.message,
                    });
                    setIsLoading(false);
                });
        } else {
            setError('Invalid Member ID or PIN.');
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: "Invalid Member ID or PIN.",
            });
            setIsLoading(false);
        }
    };

    const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 4) {
            setPin(value);
        }
    };

    return (
        <div className="w-full">
            <div className="relative mx-auto max-w-[250px] mb-6">
                {sonyaAvatar && (
                    <Image 
                        src={sonyaAvatar.imageUrl} 
                        alt="Sonya's Avatar"
                        width={250}
                        height={250}
                        className="rounded-lg border-2 border-primary/30 shadow-2xl shadow-primary/20"
                    />
                )}
                <div className="absolute -top-4 -right-4 bg-background border-2 border-primary/50 p-3 rounded-md text-center shadow-lg">
                    <p className="font-mono text-xs tracking-widest text-muted-foreground">MEMBER.NAME</p>
                    <p className="font-headline text-lg font-bold text-primary">SONYA'S</p>
                </div>
            </div>

            <Card className="w-full bg-card/50">
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
                        {error && <p className="text-sm font-medium text-destructive text-center">{error}</p>}
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Unlock Gate
                        </Button>
                    </form>
                    <div className="mt-4 flex justify-center gap-4">
                         <Button variant="outline" size="icon" disabled><Fingerprint /></Button>
                         <Button variant="outline" size="icon" disabled><QrCode /></Button>
                    </div>
                </CardContent>
            </Card>

            <div className="text-center mt-6 space-y-2 text-sm">
                <p className="text-muted-foreground">
                    Are you a regular User?{" "}
                    <Link href="/login" className="underline text-primary">Login here.</Link>
                </p>
                <p className="text-muted-foreground">
                    Don&apos;t have a Member ID?{" "}
                    <Link href="/member-signup" className="underline text-primary">Create Member ID.</Link>
                </p>
            </div>
        </div>
    );
}
