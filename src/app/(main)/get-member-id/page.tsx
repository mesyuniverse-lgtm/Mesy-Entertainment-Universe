'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Edit, User, LayoutDashboard, Cog, ArrowLeft, CreditCard, Wallet, QrCode, CheckCircle, Pencil } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function GetMemberIdPage() {
  const { user, firestore, isUserLoading } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  const [avatarName, setAvatarName] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(true);
  const [createdMemberId, setCreatedMemberId] = React.useState<string | null>(null);

  const accountProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, `accounts/${user.uid}/profile`, user.uid);
  }, [firestore, user]);
  
  const { data: accountProfile, isLoading: isProfileLoading } = useDoc(accountProfileRef);
  
  const isLoading = isUserLoading || isProfileLoading;
  const avatarImage = PlaceHolderImages.find(p => p.id === 'female-archer-1');


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
    try {
      const newMemberRef = doc(collection(firestore, `accounts/${user.uid}/members`));
      const memberId = newMemberRef.id;

      console.log('Simulating payment of $9.99...');

      await setDoc(newMemberRef, {
        id: memberId,
        accountId: user.uid,
        username: avatarName.trim(),
        nickname: avatarName.trim(),
        level: 0,
        createdAt: serverTimestamp(),
        avatar: avatarImage?.imageUrl,
      });

      setCreatedMemberId(memberId);
      toast({
        title: "Member ID Created!",
        description: `Your new Member ID for ${avatarName} has been saved.`,
      });
      setIsEditing(false);

    } catch (error) {
      console.error("Failed to create member ID:", error);
      toast({ title: "Save Failed", description: "Could not create the new Member ID. Please try again.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-6xl bg-card/80 backdrop-blur-sm">
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
                           {avatarImage && (
                                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/50 shadow-lg">
                                    <Image src={avatarImage.imageUrl} alt="Your Avatar" layout="fill" objectFit="cover" />
                                </div>
                            )}
                            <p className="font-bold text-xl">{avatarName || "Your Avatar"}</p>
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
                    Create & Pay $9.99
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
