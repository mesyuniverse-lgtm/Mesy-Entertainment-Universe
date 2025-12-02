'use client';

import React, { useState } from 'react';
import { useFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Gem, Loader2, Sparkles, CheckCircle, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// These price IDs must correspond to Price objects in your Stripe account.
const memberIdPackages = [
  {
    level: 0,
    name: 'Entry Level 0',
    idRange: '49,002 - 50,001',
    price: 9.99,
    priceId: 'price_1PgWd4Rvu5gJzJ6Bd4pUKTfC', // Replace with your actual Stripe Price ID
    features: ['Activate your first ID', 'Start your downline', 'Access basic features'],
    bgColor: 'bg-green-900/30',
    borderColor: 'border-green-500/50',
  },
  {
    level: 25,
    name: 'Ascendant Level 25',
    idRange: '24,002 - 25,001',
    price: 250.00,
    priceId: 'price_1PgWddRvu5gJzJ6B91A4dD2j', // Replace with your actual Stripe Price ID
    features: ['Significant downline potential', 'Higher income tier', 'Priority support'],
    isPopular: true,
    bgColor: 'bg-purple-900/30',
    borderColor: 'border-purple-500/50',
  },
  {
    level: 50,
    name: 'Founder Level 50',
    idRange: '1 - 1,001',
    price: 5000.00,
    priceId: 'price_1PgWeBRvu5gJzJ6BqBvEa7oP', // Replace with your actual Stripe Price ID
    features: ['Highest income potential', 'Founder status & badge', 'Lifetime premium access'],
    isFounder: true,
    bgColor: 'bg-yellow-900/30',
    borderColor: 'border-yellow-500/50',
  },
];

export default function MemberIdPurchasePage() {
  const { firestore, user } = useFirebase();
  const { toast } = useToast();
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const handlePurchase = async (priceId: string) => {
    if (!user || !firestore) {
      toast({
        title: 'Authentication Required',
        description: 'You must be logged in to make a purchase.',
        variant: 'destructive',
      });
      return;
    }

    setLoadingPriceId(priceId);

    const checkoutSessionData = {
      price: priceId,
      success_url: `${window.location.origin}/members/systems`,
      cancel_url: window.location.origin,
    };
    const collectionRef = collection(firestore, 'customers', user.uid, 'checkout_sessions');

    addDoc(collectionRef, checkoutSessionData)
      .then(docRef => {
        const unsubscribe = onSnapshot(docRef, (snap) => {
          const { error, url } = snap.data() || {};
          if (error) {
            console.error(`An error occurred: ${error.message}`);
            toast({ title: 'Payment Error', description: error.message, variant: 'destructive' });
            setLoadingPriceId(null);
            unsubscribe();
          }
          if (url) {
            window.location.assign(url);
          }
        });
      })
      .catch(error => {
        const permissionError = new FirestorePermissionError({
          path: collectionRef.path,
          operation: 'create',
          requestResourceData: checkoutSessionData,
        });
        errorEmitter.emit('permission-error', permissionError);
        setLoadingPriceId(null);
      });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-widest text-primary uppercase" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}>
          Claim Your Member ID
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Secure your position in the MESY Universe. Each Member ID is a unique key to unlocking your earning potential and status within the community.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {memberIdPackages.map((pkg) => (
          <Card
            key={pkg.name}
            className={cn(
              'flex flex-col text-center items-center transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden shadow-lg hover:shadow-primary/20',
              pkg.bgColor,
              pkg.borderColor,
              pkg.isPopular || pkg.isFounder ? 'border-2' : 'border'
            )}
          >
            {pkg.isPopular && (
              <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-bl-lg">
                Most Popular
              </div>
            )}
             {pkg.isFounder && (
              <div className="absolute top-0 right-0 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-bl-lg flex items-center gap-1">
                <Crown className="w-3 h-3"/> Founder
              </div>
            )}
            <CardHeader className="items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Gem className={cn("w-12 h-12", pkg.isFounder ? "text-yellow-400" : "text-primary")} />
              </div>
              <CardTitle className="text-2xl">{pkg.name}</CardTitle>
              <CardDescription>ID Range: {pkg.idRange}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center w-full px-6">
                <p className="text-5xl font-bold mb-4">${pkg.price.toFixed(2)}</p>
                <ul className="space-y-2 text-left text-sm text-muted-foreground w-full">
                    {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter className="w-full p-6">
              <Button
                className="w-full h-12 text-lg"
                onClick={() => handlePurchase(pkg.priceId)}
                disabled={!!loadingPriceId}
                variant={pkg.isFounder ? 'default' : 'secondary'}
              >
                {loadingPriceId === pkg.priceId ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  'Purchase Now'
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

       <div className="text-center mt-12 text-sm text-muted-foreground">
        <p>Payments are processed securely by Stripe. Upon successful purchase, your Member ID will be activated.</p>
        <p>Already have an activation code? <Link href="/members/systems" className="underline hover:text-primary">Activate it here</Link>.</p>
      </div>
    </div>
  );
}
