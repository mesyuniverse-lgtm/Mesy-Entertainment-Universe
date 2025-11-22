'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UploadCloud } from 'lucide-react';
import { useFirebase } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function ConfirmFormPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [nationalId, setNationalId] = useState('');
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const { user, firestore } = useFirebase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !firestore) {
      toast({
        title: 'Error',
        description: 'You must be logged in to verify your identity.',
        variant: 'destructive',
      });
      return;
    }
    if (!nationalId || !idCardFile) {
      toast({
        title: 'Missing Information',
        description: 'Please provide your national ID and upload a photo of your ID card.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real application, you would upload the file to Firebase Storage
      // and get the URL. For now, we'll just update the Firestore document
      // to change the user's status.
      
      const memberDocRef = doc(firestore, 'members', user.uid);
      const userProfileDocRef = doc(firestore, `members/${user.uid}/profile`, user.uid);

      await updateDoc(memberDocRef, {
        verificationStatus: 'pending',
      });

      await updateDoc(userProfileDocRef, {
        nationalId: nationalId, // In a real app, this should be encrypted.
      });

      toast({
        title: 'Verification Submitted',
        description: 'Your identity information has been submitted for review.',
      });

      // Redirect to the next step
      router.push('/create-member-id');

    } catch (error) {
      console.error('Verification submission error:', error);
      toast({
        title: 'Submission Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <CardHeader className="text-center px-0">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Identity Verification
        </CardTitle>
        <CardDescription>
          Please provide the following information to verify your account.
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="national-id">National ID Number</Label>
          <Input
            id="national-id"
            placeholder="e.g., 1234567890123"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="id-card-photo">Photo of National ID Card</Label>
          <div className="relative flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md border-muted-foreground/50">
            <UploadCloud className="w-8 h-8 text-muted-foreground" />
            <Input
              id="id-card-photo"
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setIdCardFile(e.target.files ? e.target.files[0] : null)}
              accept="image/*"
              disabled={isLoading}
              required
            />
             {idCardFile && (
                <p className="absolute bottom-2 text-xs text-muted-foreground">{idCardFile.name}</p>
             )}
          </div>
        </div>
        <Button type="submit" className="w-full h-11" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit for Verification
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Your information is secure and will be reviewed shortly.
      </p>
       <p className="mt-2 text-center text-sm text-muted-foreground">
        <Link href="/create-member-id" className="underline hover:text-primary">
          Skip for now
        </Link>
      </p>
    </div>
  );
}
