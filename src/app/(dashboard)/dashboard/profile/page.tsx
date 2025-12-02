'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { useFirebase, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, where, limit } from 'firebase/firestore';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Camera, Edit, MoreHorizontal, User, Mail, Smartphone, Badge } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge as UiBadge } from '@/components/ui/badge'; // Renamed to avoid conflict

// Define clear types for our data
type MemberData = {
  id: string;
  nickname?: string;
  username?: string;
  avatar?: string;
  level?: number;
  downlines?: number;
};

type ProfileData = {
  firstname?: string;
  lastname?: string;
  phoneNumber?: { number: string };
};

export default function ProfilePage() {
  const { user, isUserLoading, firestore } = useFirebase();

  // Query to get the first member document associated with the account
  const memberQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
        collection(firestore, 'members'),
        where('accountId', '==', user.uid),
        limit(1)
    );
  }, [user, firestore]);

  const { data: memberCollection, isLoading: isMemberLoading } = useCollection<MemberData>(memberQuery);
  const memberData = memberCollection?.[0]; // Get the first member from the result array


  // Memoize the document reference for the private user profile document.
  const profileDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, `accounts/${user.uid}/profile`, user.uid);
  }, [user, firestore]);

  const { data: profileData, isLoading: isProfileLoading } = useDoc<ProfileData>(profileDocRef);

  const isLoading = isUserLoading || isMemberLoading || isProfileLoading;

  const coverImage = PlaceHolderImages.find(p => p.id === 'fantasy-landscape-1');

  // Unified loading skeleton
  const renderSkeleton = () => (
    <div className="w-full">
        <div className="max-w-7xl mx-auto">
             <Card className="bg-card/80 border-0 rounded-none md:rounded-b-lg shadow-none">
                <CardContent className="p-0">
                    <Skeleton className="h-[250px] md:h-[400px] w-full rounded-b-lg" />
                    <div className="px-4 md:px-8">
                        <div className="flex flex-col md:flex-row gap-4 -mt-12 md:-mt-20">
                             <Skeleton className="h-32 w-32 md:h-44 md:w-44 rounded-full border-4 border-background bg-background" />
                             <div className="flex-1 pt-4 md:pt-24">
                                <Skeleton className="h-8 w-64" />
                                <Skeleton className="h-4 w-48 mt-2" />
                            </div>
                            <div className="flex items-end gap-2 pb-4">
                                <Skeleton className="h-10 w-32" />
                                <Skeleton className="h-10 w-24" />
                            </div>
                        </div>
                        <hr className="my-4 border-border" />
                        <div className="flex justify-between items-center">
                            <div className="flex gap-1">
                                <Skeleton className="h-10 w-20" />
                                <Skeleton className="h-10 w-20" />
                                <Skeleton className="h-10 w-20" />
                            </div>
                            <Skeleton className="h-10 w-10" />
                        </div>
                    </div>
                </CardContent>
             </Card>
             <div className="p-4 md:p-8">
                <Card className="bg-card/80"><CardContent className="p-4"><Skeleton className="h-40 w-full" /></CardContent></Card>
            </div>
        </div>
    </div>
  );

  if (isLoading) {
    return renderSkeleton();
  }

  // Combine data safely, providing fallbacks
  const displayName = memberData?.nickname || `${profileData?.firstname || ''} ${profileData?.lastname || ''}`.trim() || user?.displayName || 'User';
  const username = memberData?.username || user?.email?.split('@')[0] || 'username';
  const avatarUrl = memberData?.avatar || user?.photoURL || PlaceHolderImages.find(p => p.id === 'default-avatar')?.imageUrl || '';
  const fallbackChar = displayName?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-card/80 border-0 rounded-none md:rounded-b-lg shadow-none">
          <CardContent className="p-0">
            {/* Cover photo */}
            <div className="relative h-[250px] md:h-[400px]">
              {coverImage && (
                <Image
                  src={coverImage.imageUrl}
                  alt="Cover photo"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-b-lg"
                />
              )}
              <div className="absolute inset-0 bg-black/10 rounded-b-lg" />
              <div className="absolute bottom-4 right-4">
                <Button variant="secondary">
                  <Camera className="mr-2 h-4 w-4" />
                  Edit Cover Photo
                </Button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="px-4 md:px-8">
              <div className="flex flex-col md:flex-row gap-4 -mt-12 md:-mt-20">
                <Avatar className="h-32 w-32 md:h-44 md:w-44 rounded-full border-4 border-background bg-background">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback className="text-5xl">
                    {fallbackChar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 pt-4 md:pt-24">
                  <h1 className="text-3xl font-bold">{displayName}</h1>
                  <p className="text-muted-foreground">
                    @{username}
                  </p>
                </div>
                <div className="flex items-end gap-2 pb-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">Professional Dashboard</Button>
                  <Button variant="secondary"><Edit className="mr-2 h-4 w-4"/>Edit</Button>
                </div>
              </div>
              
              <hr className="my-4 border-border" />
              
              {/* Profile Navigation */}
              <div className="flex justify-between items-center">
                 <div className="flex gap-1">
                    <Button variant="ghost" className="text-foreground font-semibold">Posts</Button>
                    <Button variant="ghost" className="bg-primary/10 text-primary font-semibold">About</Button>
                    <Button variant="ghost" className="text-muted-foreground font-semibold">Reels</Button>
                    <Button variant="ghost" className="text-muted-foreground font-semibold">Photos</Button>
                 </div>
                 <Button variant="secondary" size="icon"><MoreHorizontal /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* About Section Content */}
        <div className="p-4 md:p-8">
             <Card className="bg-card/80">
                <CardHeader>
                    <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <User className="w-5 h-5 text-muted-foreground" />
                        <p>{`${profileData?.firstname || ''} ${profileData?.lastname || ''}`.trim()}</p>
                    </div>
                     <div className="flex items-center gap-4">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <p>{user?.email}</p>
                    </div>
                    {profileData?.phoneNumber?.number && (
                        <div className="flex items-center gap-4">
                            <Smartphone className="w-5 h-5 text-muted-foreground" />
                            <p>{profileData.phoneNumber.number}</p>
                        </div>
                    )}
                    {memberData && (
                        <div className="flex items-center gap-4">
                            <UiBadge variant="secondary">Level {memberData.level}</UiBadge>
                            <UiBadge variant="outline">Downline: {(memberData.downlines || 0).toLocaleString()}</UiBadge>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

