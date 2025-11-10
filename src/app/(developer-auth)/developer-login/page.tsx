
'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fingerprint, QrCode, User, Loader2 } from "lucide-react";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';

export default function DeveloperLoginPage() {
    const [isLoading, setIsLoading] = React.useState(false);
    const devAvatar = PlaceHolderImages.find(i => i.id === 'feature-2');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock login logic
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <Card className="bg-transparent border-0 shadow-none">
                <CardHeader className="p-0 mb-4">
                     <div className="relative aspect-[4/5] max-w-[250px] mx-auto border-2 border-primary/30 rounded-lg overflow-hidden shadow-2xl shadow-primary/20">
                        {devAvatar && <Image src={devAvatar.imageUrl} alt="Developer Avatar" layout="fill" objectFit="cover" />}
                        <div className="absolute top-0 inset-x-0 p-2 bg-black/50 text-center">
                            <p className="text-white font-mono text-sm tracking-widest">MESY-MD-ID00001</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="bg-card/50 p-6 rounded-lg border border-primary/20">
                     <CardTitle className="text-primary text-center text-lg tracking-widest">DEVELOPER ACCESS</CardTitle>
                    <CardDescription className="text-center mb-6">
                        Enter your credentials to pass through the gate.
                    </CardDescription>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="dev-id" className="flex items-center gap-2"><User className="h-4 w-4"/> YOUR DEV ID</Label>
                            <Input id="dev-id" placeholder="Your Developer ID" disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pin">PIN Code</Label>
                            <Input id="pin" type="password" placeholder="••••" disabled={isLoading} className="text-center tracking-[0.5em]"/>
                        </div>
                        <Button type="submit" className="w-full bg-primary/80 hover:bg-primary" disabled={isLoading}>
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
                <p className="text-muted-foreground">Are you a regular User? <Link href="/login" className="underline text-primary">Login here.</Link></p>
                <p className="text-muted-foreground">Don't have a DEV.ID? <Link href="/developer-signup" className="underline text-primary">Create DEV.ID.</Link></p>
            </div>
        </div>
    );
}
