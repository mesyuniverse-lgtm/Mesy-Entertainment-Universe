
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Badge } from "lucide-react";
import { useUser, useFirestore, useMemoFirebase } from "@/firebase";
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';

export default function UserProfilePage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const userProfileRef = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return doc(firestore, `users/${user.uid}/profile`, user.uid);
    }, [user, firestore]);

    const { data: profileData, isLoading } = useDoc(userProfileRef);

    if (isLoading) {
        return <div>Loading profile...</div>;
    }
    
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
                <p className="text-muted-foreground">Manage your public profile and personal information.</p>
            </div>

            {/* Account Information Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><User className="text-primary"/> Account Information</CardTitle>
                    <CardDescription>This is your private account information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2"><Mail className="h-4 w-4"/> Email Address</Label>
                        <Input id="email" type="email" defaultValue={user?.email || ''} readOnly />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2"><Phone className="h-4 w-4"/> Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue={profileData?.phoneNumber?.number || 'Not set'} />
                    </div>
                </CardContent>
            </Card>

            {/* Personal Details Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Badge className="text-primary"/> Personal Details</CardTitle>
                    <CardDescription>This information may be displayed on your public profile.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue={profileData?.username || ''} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="nickname">Nickname</Label>
                        <Input id="nickname" defaultValue={profileData?.nickname || ''} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="firstname">Firstname</Label>
                        <Input id="firstname" defaultValue={profileData?.firstname || ''} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastname">Lastname</Label>
                        <Input id="lastname" defaultValue={profileData?.lastname || ''} />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                         <Button>Save Details</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
