
'use client';

import { useState, useMemo } from 'react';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Gem, PlusCircle, Settings, Signal, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';


export default function CreateMemberIdPage() {
  const { user, isUserLoading, firestore } = useFirebase();
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);
  
  const accountDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, "accounts", user.uid);
  }, [user, firestore]);

  const { data: accountData, isLoading: isAccountDataLoading } = useDoc(accountDocRef);
  
  // Assuming the first member created has the same ID as the user for now
  const memberDocRef = useMemoFirebase(() => {
    if(!user || !firestore) return null;
    return doc(firestore, `accounts/${user.uid}/members`, user.uid);
  }, [user, firestore]);

  const { data: memberProfileData, isLoading: isMemberProfileLoading } = useDoc(memberDocRef);

  const isLoading = isUserLoading || isAccountDataLoading || isMemberProfileLoading;

  const hasCreatedMemberId = useMemo(() => {
    if (isLoading || !memberProfileData) return false;
    // Check if the member document exists.
    return !!memberProfileData;
  }, [isLoading, memberProfileData]);

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


  const bgImage = PlaceHolderImages.find((i) => i.id === 'fantasy-door-1');
  const avatarImage = PlaceHolderImages.find((i) => i.id === 'female-warrior-1');
  const yogaImage = PlaceHolderImages.find((i) => i.id === 'yoga-pose-1');

  
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black text-white p-4">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt="Background"
          fill
          className="object-cover opacity-60"
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
                <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-white/10 space-y-3">
                    <h3 className="text-xl font-bold text-green-400">Activated</h3>
                    <div className="text-sm space-y-2">
                        <p className='flex items-center gap-2'>Account Name: <span className='text-muted-foreground'>{user?.displayName || '...'}</span></p>
                        <p className='flex items-center gap-2'>Account ID: <span className='text-muted-foreground truncate'>{user?.uid}</span> <CheckCircle className='w-4 h-4 text-green-400'/></p>
                        <p className='flex items-center gap-2'>Email: <span className='text-muted-foreground'>{user?.email}</span> <CheckCircle className='w-4 h-4 text-green-400'/></p>
                        <p className='flex items-center gap-2'>Tel: <span className='text-muted-foreground'>0915622991</span> <CheckCircle className='w-4 h-4 text-green-400'/></p>
                        <p className='flex items-center gap-2'>PayMent <CheckCircle className='w-4 h-4 text-green-400'/></p>
                    </div>
                    <hr className="border-white/10"/>
                    <div className="space-y-2 text-sm">
                        <p className="font-semibold">บัญชีคุณผ่านการยืนยันตัวตนแล้ว</p>
                        <p className="text-muted-foreground">กรุณาสร้าง AVATAR และ สร้าง Members ID ตามขั้นตอน ให้สำเร็จสมบรูณ์</p>
                        <div className="text-red-400 font-semibold space-y-1 pt-2">
                            <p>1. Create AVATAR</p>
                            <p>2. Create Members ID</p>
                        </div>
                    </div>
                    <div className="!mt-4 p-2 border border-yellow-400/50 bg-yellow-400/10 rounded-md text-xs text-yellow-300">
                        <p>1 Account สามารถ สร้าง Member ID ได้ถึง 5 Members ID ต่อบัญชี</p>
                    </div>
                </div>
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
                    <Link href="/get-member-id">CREATE MEMBER ID</Link>
                 </Button>
            </div>
        </div>

        {/* Center Panel */}
        <div className="col-span-6 flex items-center justify-center">
          {yogaImage && (
             <div className="w-[80%] aspect-video relative rounded-lg overflow-hidden border-2 border-white/10 shadow-2xl">
                 <Image 
                    src={yogaImage.imageUrl}
                    alt={yogaImage.description}
                    data-ai-hint={yogaImage.imageHint}
                    fill
                    className="object-cover"
                    priority
                 />
             </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="col-span-3 flex flex-col justify-center items-end">
            <div className="space-y-3 w-full max-w-xs">
                {memberSlots.map((slot, index) => {
                    const isActive = index === selectedSlotIndex;
                    return (
                        <button key={index} onClick={() => setSelectedSlotIndex(index)} className={`w-full p-2 rounded-lg border-2 transition-all duration-300 flex items-center ${isActive ? 'bg-primary/20 border-primary' : 'bg-black/40 border-transparent hover:border-primary/50'}`}>
                            {slot.inUse && hasCreatedMemberId ? (
                                <>
                                    <Avatar className="h-14 w-14 border-2 border-primary/50">
                                        <AvatarImage src={memberProfileData?.avatar || avatarImage?.imageUrl} alt={`Member`} />
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
                                                <p className={`font-bold ${isActive ? 'text-primary' : ''}`}>Lv.{memberProfileData?.level}</p>
                                                <p className="text-xs text-muted-foreground">MemberID: {memberProfileData?.id.substring(0,8)}</p>
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
