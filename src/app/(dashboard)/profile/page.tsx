'use client';

import React from 'react';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Mail, Smartphone, User, Shield, Bell, KeyRound } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ProfilePage() {
  const { firestore, user } = useFirebase();

  const userProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, `users/${user.uid}/profile`, user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading } = useDoc(userProfileRef);

  const avatarUrl = userProfile?.avatar || PlaceHolderImages.find(p => p.id === 'default-avatar')?.imageUrl;

  const renderLoadingSkeleton = () => (
    <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
            <CardHeader className="items-center text-center">
                <Skeleton className="h-24 w-24 rounded-full" />
                <Skeleton className="h-6 w-32 mt-4" />
                <Skeleton className="h-4 w-24 mt-2" />
            </CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </CardContent>
        </Card>
        <Card className="md:col-span-2">
            <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-10 w-full" /></div>
                    <div className="space-y-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-10 w-full" /></div>
                </div>
                <div className="space-y-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-10 w-full" /></div>
                <div className="space-y-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-10 w-full" /></div>
            </CardContent>
        </Card>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Account Profile</h1>
      
      {isLoading || !userProfile ? renderLoadingSkeleton() : (
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1 bg-card/50">
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 border-4 border-primary/50">
                <AvatarImage src={avatarUrl} alt={userProfile.username} />
                <AvatarFallback>{userProfile.username?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <CardTitle className="!mt-4">{userProfile.nickname || userProfile.username}</CardTitle>
              <CardDescription>@{userProfile.username}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start"><KeyRound className="mr-2 h-4 w-4" /> Change Password</Button>
              <Button variant="outline" className="w-full justify-start"><Bell className="mr-2 h-4 w-4" /> Notification Settings</Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 bg-card/50">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstname">First Name</Label>
                        <Input id="firstname" value={userProfile.firstname || ''} readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastname">Last Name</Label>
                        <Input id="lastname" value={userProfile.lastname || ''} readOnly />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="email" type="email" value={user.email || ''} readOnly className="pl-9"/>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                     <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="phone" value={userProfile.phoneNumber?.number ? `${userProfile.phoneNumber.countryCode} ${userProfile.phoneNumber.number}` : ''} readOnly className="pl-9"/>
                    </div>
                </div>

                <div className="text-right">
                    <Button>Save Changes</Button>
                </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
