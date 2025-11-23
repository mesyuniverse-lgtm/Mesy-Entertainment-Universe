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
import { Loader2, Save, Edit, User, LayoutDashboard, Cog, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
      // Use collection().doc() to generate a new unique ID
      const newMemberRef = doc(collection(firestore, `accounts/${user.uid}/members`));
      const memberId = newMemberRef.id;

      await setDoc(newMemberRef, {
        id: memberId,
        accountId: user.uid,
        username: avatarName.trim(),
        nickname: avatarName.trim(),
        level: 0,
        createdAt: serverTimestamp(),
        // Add other default member properties here
      });

      setCreatedMemberId(memberId);
      toast({
        title: "Member ID Created!",
        description: `Your new Member ID for ${avatarName} has been saved.`,
      });
      setIsEditing(false); // Switch to view mode

    } catch (error) {
      console.error("Failed to create member ID:", error);
      toast({ title: "Save Failed", description: "Could not create the new Member ID. Please try again.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-4xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Create Your Member ID</CardTitle>
          <CardDescription>
            {isEditing ? "Confirm your details and give your new digital identity a name." : "Your Member ID has been created. You can edit if needed."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Column 1 */}
              <div className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label>อันดับ (Rank)</Label>
                  <p className="p-2 text-muted-foreground text-sm">{displayData.rank}</p>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Account Name</Label>
                  <p className="p-2 text-muted-foreground text-sm">{displayData.accountName}</p>
                </div>
                 <div className="grid w-full items-center gap-1.5">
                  <Label>Account ID</Label>
                  <p className="p-2 text-muted-foreground text-sm truncate">{displayData.accountId}</p>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Email (Verified)</Label>
                  <p className="p-2 text-muted-foreground text-sm">{displayData.email}</p>
                </div>
              </div>
              
              {/* Column 2 */}
              <div className="space-y-4">
                 <div className="grid w-full items-center gap-1.5">
                  <Label>Phone-number (Verified)</Label>
                  <p className="p-2 text-muted-foreground text-sm">{displayData.phoneNumber}</p>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Member ID</Label>
                   <p className="p-2 text-muted-foreground text-sm font-mono h-10">
                    {createdMemberId ? createdMemberId : '[System Generated]'}
                  </p>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="avatar-name">Avatar Name</Label>
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
                  <Label>Level</Label>
                  <p className="p-2 text-muted-foreground text-sm">{displayData.level}</p>
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-4 md:col-span-2 lg:col-span-1">
                 <div className="grid w-full items-center gap-1.5">
                  <Label>Downline</Label>
                  <p className="p-2 text-muted-foreground text-sm">{displayData.downline.toLocaleString()}</p>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Income</Label>
                  <p className="p-2 text-muted-foreground text-sm">${displayData.income.toFixed(2)}</p>
                </div>
                 <div className="grid w-full items-center gap-1.5">
                  <Label>Service Fee (3%)</Label>
                  <p className="p-2 text-muted-foreground text-sm text-red-400">-${displayData.serviceFee.toFixed(2)}</p>
                </div>
                 <div className="grid w-full items-center gap-1.5">
                  <Label>Net Income</Label>
                  <p className="p-2 font-bold text-primary text-sm">${displayData.netIncome.toFixed(2)}</p>
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
                  <Button type="submit" disabled={isSaving || isLoading}>
                    {isSaving ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    บันทึกข้อมูล
                  </Button>
                ) : (
                   <Button type="button" variant="secondary" onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      แก้ไข
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
