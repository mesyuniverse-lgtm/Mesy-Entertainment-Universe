
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useFirebase, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, orderBy } from 'firebase/firestore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Gem, PlusCircle, Settings, Signal, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Member {
  id: string;
  username: string;
  nickname: string;
  level: number;
  avatar?: string;
  downlines?: number;
}

export default function AccountMemberIdPage() {
  const { user, isUserLoading, firestore } = useFirebase();
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);

  // Fetch account data (private profile)
  const accountProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, `accounts/${user.uid}/profile`, user.uid);
  }, [user, firestore]);

  const { data: accountProfile, isLoading: isAccountProfileLoading } = useDoc(accountProfileRef);
  
  // Fetch account data (public)
  const accountRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, "accounts", user.uid);
  }, [user, firestore]);
  const { data: accountData, isLoading: isAccountDataLoading } = useDoc(accountRef);


  // Fetch all member IDs for this account
  const membersQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(collection(firestore, `accounts/${user.uid}/members`), orderBy('createdAt', 'asc'));
  }, [user, firestore]);

  const { data: members, isLoading: areMembersLoading } = useCollection<Member>(membersQuery);

  const isLoading = isUserLoading || isAccountProfileLoading || areMembersLoading || isAccountDataLoading;

  const memberSlots: (Member | null)[] = useMemo(() => {
    const slots = Array(5).fill(null);
    if (members) {
      members.forEach((member, index) => {
        if (index < 5) {
          slots[index] = member;
        }
      });
    }
    return slots;
  }, [members]);

  const selectedMember = memberSlots[selectedMemberIndex];

  const calculateIncome = (downlines: number) => {
    const grossIncome = downlines * 1; // Assuming 1 USD per downline
    const serviceFee = grossIncome * 0.03;
    const netIncome = grossIncome - serviceFee;
    return { grossIncome, serviceFee, netIncome };
  };

  const selectedMemberIncome = useMemo(() => {
    const downlines = selectedMember?.downlines || 0;
    return calculateIncome(downlines);
  }, [selectedMember]);
  
  const bgImage = PlaceHolderImages.find((i) => i.id === 'fantasy-door-1');
  const yogaImage = PlaceHolderImages.find((i) => i.id === 'yoga-pose-1');

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  
  const accountProfileData = accountProfile as any;

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
                        <p className='flex items-center gap-2'>Account Name: <span className='text-muted-foreground'>{accountProfileData?.firstname} {accountProfileData?.lastname}</span></p>
                        <p className='flex items-center gap-2'>Account ID: <span className='text-muted-foreground truncate'>{user?.uid}</span> <CheckCircle className='w-4 h-4 text-green-400'/></p>
                        <p className='flex items-center gap-2'>Email: <span className='text-muted-foreground'>{user?.email}</span> <CheckCircle className='w-4 h-4 text-green-400'/></p>
                        <p className='flex items-center gap-2'>Tel: <span className='text-muted-foreground'>{accountProfileData?.phoneNumber?.number}</span> <CheckCircle className='w-4 h-4 text-green-400'/></p>
                        <p className='flex items-center gap-2'>PayMent <CheckCircle className='w-4 h-4 text-green-400'/></p>
                    </div>
                    <hr className="border-white/10"/>
                    <div className="space-y-2 text-sm">
                        <p className="font-semibold text-purple-300 flex items-center gap-2"><div className='w-2 h-2 rounded-full bg-purple-400 animate-pulse'></div>Select MemberID</p>
                        {selectedMember ? (
                          <div className='text-xs space-y-1 pl-4'>
                            <p>MemberName: <span className='font-bold text-base'>{selectedMember.nickname}</span></p>
                            <p>MemberID: <span className='text-muted-foreground'>{selectedMember.id}</span></p>
                            <p>Level: <span className='font-bold'>{selectedMember.level}</span></p>
                            <p>Downline: <span className='font-bold'>{(selectedMember.downlines || 0).toLocaleString()}</span></p>
                            <div className='pt-2 mt-2 border-t border-white/10'>
                                <p>Gross Income (USD): <span className='font-bold'>${selectedMemberIncome.grossIncome.toFixed(2)}</span></p>
                                <p>Service Fee (3%): <span className='font-bold text-red-400'>-${selectedMemberIncome.serviceFee.toFixed(2)}</span></p>
                                <p>Net Income (USD): <span className='font-bold text-green-400'>${selectedMemberIncome.netIncome.toFixed(2)}</span></p>
                            </div>
                          </div>
                        ) : (
                          <p className='text-muted-foreground text-xs pl-4'>No Member ID selected. Create one to begin.</p>
                        )}
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
                {memberSlots.map((member, index) => {
                  const avatar = member?.avatar ? PlaceHolderImages.find(p => p.id === member.avatar) : PlaceHolderImages.find(p => p.id === 'default-avatar');
                  const isSelected = index === selectedMemberIndex;

                  if (member) {
                    return (
                       <button 
                          key={member.id} 
                          onClick={() => setSelectedMemberIndex(index)}
                          className={cn(
                            'w-full p-2 rounded-lg border-2 bg-black/40 transition-all duration-300 flex items-center gap-3 text-left',
                            isSelected ? 'border-primary shadow-lg shadow-primary/30' : 'border-transparent hover:border-primary/50'
                          )}
                        >
                          <Avatar className='w-12 h-12 border-2 border-primary/50'>
                              {avatar && <AvatarImage src={avatar.imageUrl} />}
                              <AvatarFallback>{member.nickname.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className='flex-1'>
                              <p className='font-bold text-lg flex items-center justify-between'>
                                <span>{member.nickname}</span>
                                <span className='px-2 py-0.5 rounded-md bg-purple-600 text-xs font-semibold'>Lv.{member.level}</span>
                              </p>
                              <p className='text-xs text-muted-foreground truncate'>MemberID: {member.id}</p>
                          </div>
                       </button>
                    )
                  }
                  return (
                    <Link key={index} href="/get-member-id" passHref>
                        <button className='w-full p-3 rounded-lg border-2 bg-black/40 border-transparent hover:border-primary/50 transition-all duration-300 flex items-center'>
                           <PlusCircle className="h-8 w-8 text-muted-foreground/50"/>
                           <p className="ml-4 text-muted-foreground">Create Member ID</p>
                        </button>
                    </Link>
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


function LoadingSkeleton() {
  const bgImage = PlaceHolderImages.find((i) => i.id === 'fantasy-door-1');
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black text-white p-4">
      {bgImage && <Image src={bgImage.imageUrl} alt="Loading Background" fill className="object-cover opacity-60" />}
      <main className="relative z-10 grid h-full w-full max-w-7xl grid-cols-12 gap-6">
        <div className="col-span-3 flex flex-col justify-between py-8">
          <div>
            <div className="flex items-center space-x-2 mb-10">
              <Gem className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl font-headline">MESY MEMBER</span>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-white/10 space-y-3">
              <h3 className="text-xl font-bold text-green-400">Activated</h3>
              <div className="text-sm space-y-2">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
              </div>
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="col-span-6 flex items-center justify-center">
          <Skeleton className="w-[80%] aspect-video rounded-lg" />
        </div>
        <div className="col-span-3 flex flex-col justify-center items-end">
          <div className="space-y-3 w-full max-w-xs">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
          <Skeleton className="mt-8 h-12 w-full max-w-xs" />
        </div>
      </main>
    </div>
  );
}
