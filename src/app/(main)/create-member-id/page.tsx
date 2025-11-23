
'use client';

import { useState, useMemo, useEffect } from 'react';
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

  const isLoading = isUserLoading || isAccountDataLoading;

  // This page should always show the "Create" state initially.
  // The logic to show existing members will be handled differently after creation.
  const memberSlots = Array(5).fill({ inUse: false });


  const bgImage = PlaceHolderImages.find((i) => i.id === 'fantasy-door-1');
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
                    <Link href="/create-avatar">Create Avatar</Link>
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
                {memberSlots.map((_, index) => (
                    <Link key={index} href="/get-member-id" passHref>
                        <button className='w-full p-3 rounded-lg border-2 bg-black/40 border-transparent hover:border-primary/50 transition-all duration-300 flex items-center'>
                           <PlusCircle className="h-8 w-8 text-muted-foreground/50"/>
                           <p className="ml-4 text-muted-foreground">Create Member ID</p>
                        </button>
                    </Link>
                ))}
            </div>
            <Button className="mt-8 w-full max-w-xs h-12 text-lg font-bold bg-gradient-to-r from-amber-400 to-yellow-600 text-black shadow-lg hover:shadow-yellow-400/50" asChild>
                <Link href="/dashboard">Start</Link>
            </Button>
        </div>
      </main>
    </div>
  );
}
