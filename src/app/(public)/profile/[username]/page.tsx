'use client';

import React, { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  limit,
} from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { notFound } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle, UserPlus, MessageSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type MemberProfile = {
  id: string;
  username: string;
  nickname: string;
  bio?: string;
  avatar?: string;
  accountId: string;
};

export default function UserProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const firestore = useFirestore();
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!firestore || !params.username) {
        return;
      }
      try {
        setIsLoading(true);
        // We query the 'members' collection group to find the username across all accounts
        const membersRef = collectionGroup(firestore, 'members');
        const q = query(
          membersRef,
          where('username', '==', params.username),
          limit(1)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError('User not found');
        } else {
          const profileDoc = querySnapshot.docs[0];
          setProfile({ id: profileDoc.id, ...profileDoc.data() } as MemberProfile);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [firestore, params.username]);

  useEffect(() => {
    if (error === 'User not found') {
      notFound();
    }
  }, [error]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center text-destructive">
        {error}
      </div>
    );
  }

  const avatarUrl = profile?.avatar || PlaceHolderImages.find(p => p.id === 'default-avatar')?.imageUrl;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="max-w-4xl mx-auto bg-card/50">
        <CardHeader className="p-0 relative h-48">
           <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-50 rounded-t-lg"></div>
        </CardHeader>
        <CardContent className="p-6 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20 sm:-mt-16">
            <Avatar className="h-32 w-32 border-4 border-background bg-background">
              <AvatarImage src={avatarUrl} alt={profile?.username} />
              <AvatarFallback className="text-4xl">
                {profile?.username?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                {profile?.nickname || profile?.username}
                <CheckCircle className="w-6 h-6 text-green-500" />
              </h1>
              <p className="text-muted-foreground">@{profile?.username}</p>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0 sm:ml-auto">
              <Button>
                <UserPlus className="mr-2 h-4 w-4" /> Follow
              </Button>
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" /> Message
              </Button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-muted-foreground">
              {profile?.bio || `Welcome to the profile of ${profile?.username}.`}
            </p>

             <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>Contact: {`${profile?.username}@mesy.com`}</span>
                </div>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="max-w-4xl mx-auto bg-card/50">
        <CardHeader className="p-0 relative h-48">
          <Skeleton className="h-full w-full rounded-t-lg" />
        </CardHeader>
        <CardContent className="p-6 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20 sm:-mt-16">
            <Skeleton className="h-32 w-32 rounded-full border-4 border-background" />
            <div className="sm:ml-6 mt-4 sm:mt-0">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32 mt-2" />
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0 sm:ml-auto">
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
