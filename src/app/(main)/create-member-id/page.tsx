
'use client';

import { useState, useMemo } from 'react';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Gem, PlusCircle, Settings, Signal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';


function formatCurrency(value: number) {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CreateMemberIdPage() {
  const { user, isUserLoading, firestore } = useFirebase();
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);
  
  const userDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, "users", user.uid);
  }, [user, firestore]);

  const { data: userData, isLoading: isUserDataLoading } = useDoc(userDocRef);
  
  const userProfileRef = useMemoFirebase(() => {
    if(!user || !firestore) return null;
    return doc(firestore, `users/${user.uid}/profile`, user.uid);
  }, [user, firestore]);


  const { data: userProfileData, isLoading: isUserProfileLoading } = useDoc(userProfileRef);


  const isLoading = isUserLoading || isUserDataLoading || isUserProfileLoading;

  const hasCreatedMemberId = useMemo(() => {
    if (isLoading || !userData) return false;
    // We determine if a user has created an ID by checking if their level is > 0
    // This is a business logic assumption for now.
    return (userData as any).level > 0;
  }, [isLoading, userData]);

  const memberSlots = useMemo(() => {
    if (!hasCreatedMemberId) {
        return Array(5).fill({ inUse: false });
    }
    // If the user has an ID, create one slot for it and 4 empty ones.
    return [
        { inUse: true },
        ...Array(4).fill({ inUse: false })
    ];
  }, [hasCreatedMemberId]);


  const memberData = useMemo(() => {
    if (isLoading || !userData || !userProfileData) {
      return {
        memberName: 'Loading...',
        memberId: '...',
        level: 0,
        downline: 0,
        grossIncome: 0,
        serviceFee: 0,
        netIncome: 0,
      };
    }

    const level = (userData as any).level || 0;
    // Only calculate downline if level > 0
    const downline = level > 0 ? (level * 1000) + Math.floor(Math.random() * 999) : 0;
    const grossIncome = downline * 1;
    const serviceFee = grossIncome * 0.03;
    const netIncome = grossIncome - serviceFee;

    return {
      memberName: (userProfileData as any).username || user?.email?.split('@')[0],
      memberId: user.uid.substring(0, 8),
      level,
      downline,
      grossIncome,
      serviceFee,
      netIncome,
    };
  }, [isLoading, userData, userProfileData, user]);

  const bgImage = PlaceHolderImages.find((i) => i.id === 'fantasy-landscape-5');
  const avatarImage = PlaceHolderImages.find((i) => i.id === 'female-warrior-1');

  const renderMemberInfo = () => {
    if (isLoading) {
      return (
        <CardContent className="space-y-1 p-2">
            <div className="flex items-center gap-2"><span className="text-muted-foreground">MemberName:</span> <Skeleton className="h-4 w-24" /></div>
            <div className="flex items-center gap-2"><span className="text-muted-foreground">MemberID:</span> <Skeleton className="h-4 w-16" /></div>
            <div className="flex items-center gap-2"><span className="text-muted-foreground">Level:</span> <Skeleton className="h-4 w-8" /></div>
            <div className="flex items-center gap-2"><span className="text-muted-foreground">Downline:</span> <Skeleton className="h-4 w-12" /></div>
            <div className="pt-4 space-y-1">
                <div className="flex items-center gap-2"><span className="text-muted-foreground">Gross Income (USD):</span> <Skeleton className="h-4 w-20" /></div>
                <div className="flex items-center gap-2"><span className="text-muted-foreground">Service Fee (3%):</span> <Skeleton className="h-4 w-16" /></div>
                <div className="font-bold flex items-center gap-2"><span className="text-muted-foreground">Net Income (USD):</span> <Skeleton className="h-4 w-24" /></div>
            </div>
        </CardContent>
      );
    }

    const currentMember = memberSlots[selectedSlotIndex]?.inUse ? memberData : null;

    return (
        <CardContent className="space-y-1 p-2">
            <div><span className="text-muted-foreground">MemberName:</span> {currentMember?.memberName || 'N/A'}</div>
            <div><span className="text-muted-foreground">MemberID:</span> {currentMember?.memberId || 'N/A'}</div>
            <div><span className="text-muted-foreground">Level:</span> {currentMember?.level ?? 'N/A'}</div>
            <div><span className="text-muted-foreground">Downline:</span> {currentMember ? currentMember.downline.toLocaleString() : 'N/A'}</div>
            <div className="pt-4 space-y-1">
                <div><span className="text-muted-foreground">Gross Income (USD):</span> ${currentMember ? formatCurrency(currentMember.grossIncome) : '0.00'}</div>
                <div><span className="text-muted-foreground">Service Fee (3%):</span> -${currentMember ? formatCurrency(currentMember.serviceFee) : '0.00'}</div>
                <div className="font-bold"><span className="text-muted-foreground">Net Income (USD):</span> ${currentMember ? formatCurrency(currentMember.netIncome) : '0.00'}</div>
            </div>
        </CardContent>
    );
  }

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black text-white p-4">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt="Background"
          fill
          className="object-cover opacity-30"
        />
      )}
      
      <main className="relative z-10 grid h-full w-full max-w-7xl grid-cols-12 gap-6">
        {/* Left Panel */}
        <div className="col-span-3 flex flex-col justify-between py-8">
            <div>
                <Link href="/welcome" className="flex items-center space-x-2 mb-10">
                    <Gem className="h-6 w-6 text-primary" />
                    <span className="font-bold text-xl font-headline">MESY MEMBER</span>
                </Link>
                <Card className="border-none bg-black/30 backdrop-blur-sm p-4 text-sm">
                   <CardHeader className="p-2">
                        <div className="flex items-center gap-2 text-primary">
                          <div className='w-4 h-4 rounded-full bg-primary/50 flex items-center justify-center'><div className='w-2 h-2 rounded-full bg-primary animate-pulse'></div></div>
                          <span>Select MemberID</span>
                        </div>
                   </CardHeader>
                   {renderMemberInfo()}
                </Card>
            </div>
            <div className="space-y-4">
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Signal className="h-4 w-4 text-green-400"/>
                    <span>337 ms</span>
                 </div>
                 <Button variant="ghost" className="justify-start p-0 h-auto hover:bg-transparent hover:text-primary">
                    <Settings className="h-4 w-4 mr-2"/>
                    Settings
                 </Button>
                  <Button variant="outline" className="w-full bg-black/30 border-primary/50" asChild>
                    <Link href="/create-avatar">CREATE AVATAR</Link>
                 </Button>
            </div>
        </div>

        {/* Center Panel */}
        <div className="col-span-6 flex items-center justify-center">
          {avatarImage && (
             <Image 
                src={avatarImage.imageUrl}
                alt="Avatar Preview"
                width={450}
                height={800}
                className="object-contain drop-shadow-[0_10px_35px_rgba(var(--primary-rgb),0.25)]"
                priority
             />
          )}
        </div>

        {/* Right Panel */}
        <div className="col-span-3 flex flex-col justify-center items-end">
            <div className="space-y-3 w-full max-w-xs">
                {memberSlots.map((slot, index) => {
                    const isActive = index === selectedSlotIndex;
                    return (
                        <button key={index} onClick={() => setSelectedSlotIndex(index)} className={`w-full p-2 rounded-lg border-2 transition-all duration-300 flex items-center ${isActive ? 'bg-primary/20 border-primary' : 'bg-black/40 border-transparent hover:border-primary/50'}`}>
                            {slot.inUse ? (
                                <>
                                    <Avatar className="h-14 w-14 border-2 border-primary/50">
                                        <AvatarImage src={avatarImage?.imageUrl} alt={`Member ${memberData.memberId}`} />
                                        <AvatarFallback>M</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 text-left">
                                        {isLoading ? (
                                            <>
                                                <Skeleton className="h-5 w-16 mb-1" />
                                                <Skeleton className="h-3 w-24" />
                                            </>
                                        ) : (
                                            <>
                                                <p className={`font-bold ${isActive ? 'text-primary' : ''}`}>Lv.{(memberData as any).level}</p>
                                                <p className="text-xs text-muted-foreground">MemberID: {memberData.memberId}</p>
                                            </>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <PlusCircle className="h-8 w-8 text-muted-foreground/50"/>
                                    <p className="ml-4 text-muted-foreground">Create Member ID</p>
                                </>
                            )}
                        </button>
                    )
                })}
            </div>
            <Button className="mt-8 w-full max-w-xs h-12 text-lg font-bold bg-gradient-to-r from-amber-400 to-yellow-600 text-black shadow-lg hover:shadow-yellow-400/50" asChild>
                <Link href="/dashboard">Start</Link>
            </Button>
        </div>
      </main>
    </div>
  );
}
