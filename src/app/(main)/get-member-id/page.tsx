'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useFirebase, useDoc, useMemoFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { doc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Edit, User, LayoutDashboard, Cog, ArrowLeft, CheckCircle, Pencil, Hand, UserRound, Bot, PartyPopper, Flower2, HandPlatter, Laugh, Annoyed } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const emoteList = [
    { name: 'ทักทาย', icon: <Hand size={24} /> },
    { name: 'โค้งคำนับ', icon: <UserRound size={24} /> },
    { name: 'เศร้า', icon: <Bot size={24} /> },
    { name: 'นั่ง', icon: <UserRound size={24} /> },
    { name: 'นอนลง', icon: <UserRound size={24} /> },
    { name: 'เต้น', icon: <PartyPopper size={24} /> },
    { name: 'ช่อดอกไม้', icon: <Flower2 size={24} /> },
    { name: 'ปรบมือ', icon: <HandPlatter size={24} /> },
    { name: 'หัวเราะ', icon: <Laugh size={24} /> },
    { name: 'โกรธ', icon: <Annoyed size={24} /> },
    { name: 'ยั่วเย้า', icon: <Bot size={24} /> },
    { name: 'ชัยชนะ', icon: <PartyPopper size={24} /> },
];


export default function GetMemberIdPage() {
  const { user, firestore, isUserLoading } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  const [avatarName, setAvatarName] = React.useState('Grace');
  const [isSaving, setIsSaving] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(true);
  const [createdMemberId, setCreatedMemberId] = React.useState<string | null>(null);

  const accountProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, `accounts/${user.uid}/profile`, user.uid);
  }, [firestore, user]);
  
  const { data: accountProfile, isLoading: isProfileLoading } = useDoc(accountProfileRef);
  
  const isLoading = isUserLoading || isProfileLoading;
  const avatarImage = PlaceHolderImages.find(p => p.id === 'female-warrior-1');
  const bgImage = PlaceHolderImages.find(p => p.id === 'fantasy-castle-1');


  const displayData = {
    rank: 1,
    accountName: user?.displayName || 'Loading...',
    accountId: user?.uid || 'Loading...',
    email: user?.email || 'Loading...',
    phoneNumber: (accountProfile as any)?.phoneNumber?.number || 'Loading...',
    level: 0,
    downline: 0,
    income: 0,
    serviceFee: 0,
    netIncome: 0,
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !firestore) {
      toast({ title: "Error", description: "Not authenticated.", variant: "destructive" });
      return;
    }
    if (!avatarName.trim()) {
      toast({ title: "Avatar Name Required", description: "Please enter a name for your avatar.", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    
    // In a real scenario, payment would be processed here.
    // For now, we simulate success and create the Member ID document.
    
    const newMemberRef = doc(collection(firestore, 'members'));
    const memberId = newMemberRef.id;
    const newMemberData = {
      id: memberId,
      accountId: user.uid,
      username: avatarName.trim().toLowerCase().replace(/\s+/g, '.'), // Create a username
      nickname: avatarName.trim(),
      level: 0,
      createdAt: serverTimestamp(),
      avatar: avatarImage?.imageUrl || '', // Store avatar image url
    };

    setDoc(newMemberRef, newMemberData)
      .then(() => {
        setCreatedMemberId(memberId);
        toast({
          title: "Member ID Created!",
          description: `Your new Member ID for ${avatarName} has been saved.`,
        });
        setIsEditing(false);
      })
      .catch((error) => {
        const permissionError = new FirestorePermissionError({
          path: newMemberRef.path,
          operation: 'create',
          requestResourceData: newMemberData,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-7xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Create Your Member ID</CardTitle>
          <CardDescription>
            {isEditing ? "Confirm your details, name your identity, and complete payment to join." : "Your Member ID has been created. You can edit if needed."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Avatar Section */}
                <div className="md:col-span-1">
                    <Card className="bg-card/50 h-full">
                        <CardHeader>
                            <CardTitle className="text-lg">Your Avatar</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center gap-4">
                           <div className="flex gap-2">
                               <div className="relative w-[250px] aspect-[3/4] rounded-lg overflow-hidden border border-primary/20">
                                   {bgImage && (
                                       <Image src={bgImage.imageUrl} alt="Avatar Background" layout="fill" objectFit="cover" className="opacity-40" />
                                   )}
                                   {avatarImage && (
                                       <div className="absolute inset-0 flex items-end justify-center">
                                           <Image src={avatarImage.imageUrl} alt="Your Avatar" width={200} height={300} className="object-contain" />
                                       </div>
                                   )}
                                   <div className='absolute top-2 inset-x-0 flex flex-col items-center'>
                                       <p className='font-bold text-lg text-white' style={{textShadow: '1px 1px 4px #000'}}>{avatarName}</p>
                                       <div className='w-24 h-1.5 bg-black/50 rounded-full overflow-hidden mt-1'>
                                           <div className='h-full bg-orange-500 w-[80%]'></div>
                                       </div>
                                   </div>
                               </div>

                               <div className="p-2 rounded-lg bg-black/30 shadow-lg w-32 space-y-1">
                                   <p className="font-bold text-white text-sm text-center mb-1">อีโมต</p>
                                   <div className="grid grid-cols-2 gap-1">
                                       {emoteList.slice(0, 12).map(emote => (
                                           <div key={emote.name} title={emote.name} className="flex flex-col items-center justify-center p-1 rounded-md bg-black/40 text-white w-full aspect-square hover:bg-white/10 cursor-pointer">
                                               {React.cloneElement(emote.icon, {size: 18})}
                                           </div>
                                       ))}
                                   </div>
                               </div>
                           </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/create-avatar">
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Change Avatar
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Details & Payment Section */}
                <div className="md:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Details Section */}
                    <div className="space-y-4">
                        <CardTitle className="text-xl border-b pb-2">Member Details</CardTitle>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="grid w-full items-center gap-1.5">
                                <Label>Account Name</Label>
                                <p className="p-2 text-muted-foreground text-sm">{displayData.accountName}</p>
                            </div>
                             <div className="grid w-full items-center gap-1.5">
                                <Label>Account ID</Label>
                                <p className="p-2 text-muted-foreground text-sm truncate">{displayData.accountId}</p>
                            </div>
                            <div className="grid w-full items-center gap-1.5 sm:col-span-2">
                                <Label>Email (Verified)</Label>
                                <p className="p-2 text-muted-foreground text-sm">{displayData.email}</p>
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label htmlFor="avatar-name">Identity Name</Label>
                              <Input 
                                id="avatar-name" 
                                placeholder="Enter a name for this identity" 
                                value={avatarName}
                                onChange={(e) => setAvatarName(e.target.value)}
                                disabled={!isEditing || isSaving || isLoading}
                                required 
                              />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label>Initial Level</Label>
                              <p className="p-2 text-muted-foreground text-sm">{displayData.level}</p>
                            </div>
                             <div className="grid w-full items-center gap-1.5 sm:col-span-2">
                              <Label>Member ID</Label>
                               <p className="p-2 text-muted-foreground text-sm font-mono h-10">
                                {createdMemberId ? createdMemberId : '[System Generated]'}
                              </p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="space-y-4">
                        <CardTitle className="text-xl border-b pb-2">Creation Fee</CardTitle>
                         <Card className="bg-card/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Payment (9.99 USD)</CardTitle>
                                <CardDescription>A one-time fee to create your Member ID and activate your earning potential.</CardDescription>
                            </CardHeader>
                            <CardContent>
                               <div className='flex flex-col items-center justify-center p-8 bg-secondary/50 rounded-lg text-center'>
                                    <CheckCircle className='w-12 h-12 text-green-500 mb-4' />
                                    <h3 className='text-lg font-semibold'>Payment Method Verified</h3>
                                    <p className='text-muted-foreground text-sm'>Your payment method is connected and ready. The fee will be charged upon creation.</p>
                               </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
              <div>
                {!isEditing && (
                   <div className="flex gap-2">
                        <Button type="button" variant="outline" asChild>
                            <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4"/>Dashboard</Link>
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href="/dashboard/profile"><User className="mr-2 h-4 w-4"/>Profile</Link>
                        </Button>
                        <Button type="button" variant="outline" asChild>
                             <Link href="/account-memberid"><Cog className="mr-2 h-4 w-4"/>Account / MemberID</Link>
                        </Button>
                    </div>
                )}
              </div>
              <div className="flex gap-4">
                {isEditing ? (
                  <Button type="submit" disabled={isSaving || isLoading} className="h-11 px-6">
                    {isSaving ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Create &amp; Pay $9.99
                  </Button>
                ) : (
                   <Button type="button" variant="secondary" onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Information
                  </Button>
                )}
                <Button type="button" variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
