'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UploadCloud, Mail, Phone, CreditCard, CheckCircle, Wallet, QrCode } from 'lucide-react';
import { useFirebase } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


export default function ConfirmFormPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const { user, firestore } = useFirebase();
  
  const [verificationStatus, setVerificationStatus] = useState({
      email: 'pending',
      phone: 'pending'
  });

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
    
    // In a real app, we would verify all steps are complete.
    // Here we simulate success.

    setIsLoading(true);

    try {
      const memberDocRef = doc(firestore, 'members', user.uid);
      
      // Simulate successful verification by updating status
      await updateDoc(memberDocRef, {
        verificationStatus: 'verified', // Change to 'verified'
      });

      toast({
        title: 'Verification Complete!',
        description: 'Your account has been successfully verified. Welcome!',
        className: 'bg-green-500 text-white border-green-600'
      });

      // Redirect to the next step
      router.push('/create-member-id');

    } catch (error) {
      console.error('Verification submission error:', error);
      toast({
        title: 'Verification Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <CardHeader className="text-center px-0">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Complete Your Verification
        </CardTitle>
        <CardDescription>
          Just a few more steps to unlock the MESY Universe.
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Email & Phone */}
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle className='text-lg'>Account Verification</CardTitle>
                <CardDescription>Verify your email and phone number.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-md bg-secondary/50">
                    <div className='flex items-center gap-3'>
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm font-medium">{user?.email || 'your-email@example.com'}</span>
                    </div>
                     <Button type="button" size="sm" variant={verificationStatus.email === 'verified' ? 'ghost' : 'outline'} onClick={() => setVerificationStatus({...verificationStatus, email: 'verified'})} className={cn(verificationStatus.email === 'verified' && 'text-green-500 hover:text-green-500')}>
                        {verificationStatus.email === 'verified' ? <CheckCircle className='w-4 h-4 mr-2'/> : null}
                        {verificationStatus.email === 'verified' ? 'Verified' : 'Send Code'}
                    </Button>
                </div>
                 <div className="flex items-center justify-between p-3 rounded-md bg-secondary/50">
                    <div className='flex items-center gap-3'>
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm font-medium">***-***-**XX</span>
                    </div>
                    <Button type="button" size="sm" variant={verificationStatus.phone === 'verified' ? 'ghost' : 'outline'} onClick={() => setVerificationStatus({...verificationStatus, phone: 'verified'})} className={cn(verificationStatus.phone === 'verified' && 'text-green-500 hover:text-green-500')}>
                        {verificationStatus.phone === 'verified' ? <CheckCircle className='w-4 h-4 mr-2'/> : null}
                        {verificationStatus.phone === 'verified' ? 'Verified' : 'Send Code'}
                    </Button>
                </div>
            </CardContent>
        </Card>

        {/* Step 2: Payment */}
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle className="text-lg">Payment Verification (1 USD)</CardTitle>
                <CardDescription>Connect a payment method to finalize your verification. A $1.00 fee will be charged.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="card">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="card"><CreditCard className='w-4 h-4 mr-2'/>Card</TabsTrigger>
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                        <TabsTrigger value="wallet"><Wallet className='w-4 h-4 mr-2'/>Wallet</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className='pt-4 space-y-4'>
                        <div className="grid gap-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input id="card-number" placeholder="•••• •••• •••• ••••" disabled={isLoading} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="grid gap-2">
                             <Label htmlFor="expiry-date">Expiry Date</Label>
                             <Input id="expiry-date" placeholder="MM / YY" disabled={isLoading} />
                           </div>
                            <div className="grid gap-2">
                             <Label htmlFor="cvc">CVC</Label>
                             <Input id="cvc" placeholder="•••" disabled={isLoading} />
                           </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="paypal" className='text-center py-8 text-muted-foreground'>
                        PayPal integration coming soon.
                    </TabsContent>
                    <TabsContent value="wallet" className='text-center py-8 text-muted-foreground'>
                        Wallet connect coming soon.
                    </TabsContent>
                </Tabs>

                <div className="relative my-4 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative bg-card px-2 text-xs uppercase text-muted-foreground">Or</div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="id-card-photo">Upload Payment QR Code</Label>
                  <div className="relative flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md border-muted-foreground/50">
                    <QrCode className="w-8 h-8 text-muted-foreground" />
                    <Input
                      id="id-card-photo"
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => setIdCardFile(e.target.files ? e.target.files[0] : null)}
                      accept="image/*"
                      disabled={isLoading}
                    />
                     {idCardFile && (
                        <p className="absolute bottom-2 text-xs text-muted-foreground">{idCardFile.name}</p>
                     )}
                  </div>
                </div>

            </CardContent>
        </Card>
        
        <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Verify & Pay $1.00
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Your information is secure and will be reviewed shortly. By continuing, you authorize a one-time $1.00 verification fee.
      </p>
       <p className="mt-2 text-center text-sm text-muted-foreground">
        <Link href="/create-member-id" className="underline hover:text-primary">
          Skip for now
        </Link>
      </p>
    </div>
  );
}
