
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Edit } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid'; // Assuming uuid is installed for unique IDs

export default function GetMemberIdPage() {
  const { user, firestore, isUserLoading } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  const [avatarName, setAvatarName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  // Fetch the main account profile data
  const accountProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, `accounts/${user.uid}/profile`, user.uid);
  }, [firestore, user]);
  
  const { data: accountProfile, isLoading: isProfileLoading } = useDoc(accountProfileRef);
  
  const isLoading = isUserLoading || isProfileLoading;

  // Placeholder data for display
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
      const memberId = uuidv4(); // Generate a unique ID for the new member
      const memberDocRef = doc(firestore, `accounts/${user.uid}/members`, memberId);

      await setDoc(memberDocRef, {
        id: memberId,
        accountId: user.uid,
        username: avatarName.trim(),
        nickname: avatarName.trim(),
        level: 0,
        createdAt: serverTimestamp(),
        // Add other default member properties here
      });

      toast({
        title: "Member ID Created!",
        description: `Your new Member ID for ${avatarName} has been saved.`,
      });
      setIsEditing(false);
      // Optionally redirect after a delay
      setTimeout(() => router.push('/create-member-id'), 2000);

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
            Confirm your details and give your new digital identity a name.
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
                  <p className="p-2 text-muted-foreground text-sm font-mono">[System Generated]</p>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="avatar-name">Avatar Name</Label>
                  <Input 
                    id="avatar-name" 
                    placeholder="Enter a name for this identity" 
                    value={avatarName}
                    onChange={(e) => setAvatarName(e.target.value)}
                    disabled={!isEditing || isSaving}
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

            <div className="mt-8 flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setIsEditing(true)} disabled={isEditing || isSaving}>
                <Edit className="mr-2 h-4 w-4" />
                แก้ไข
              </Button>
              <Button type="submit" disabled={!isEditing || isSaving}>
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                บันทึกข้อมูล
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Note: For a real implementation, you would need to install a UUID library, e.g., `npm install uuid` and `@types/uuid`.
