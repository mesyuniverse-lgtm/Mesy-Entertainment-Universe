'use client';

import React, { useState } from 'react';
import { useFirebase, useUser } from '@/firebase';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Gem, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// This price ID must correspond to a Price object in your Stripe account.
// You can create products and prices in the Stripe Dashboard.
const coinPackages = [
  {
    name: 'Starter Pack',
    coins: 1000,
    price: 9.99,
    priceId: 'price_1PgUTcRvu5gJzJ6B5wR9o8fL', 
    bonus: '5%',
    bgColor: 'bg-green-900/30',
    borderColor: 'border-green-500/50',
  },
  {
    name: 'Adventurer Bundle',
    coins: 5500,
    price: 49.99,
    priceId: 'price_1PgUUORvu5gJzJ6BWM5xYieP',
    bonus: '10%',
    isPopular: true,
    bgColor: 'bg-purple-900/30',
    borderColor: 'border-purple-500/50',
  },
  {
    name: 'Legendary Hoard',
    coins: 12000,
    price: 99.99,
    priceId: 'price_1PgUUvRvu5gJzJ6Bo9FSAznR',
    bonus: '20%',
    bgColor: 'bg-yellow-900/30',
    borderColor: 'border-yellow-500/50',
  },
];

export default function OfficialShopPage() {
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

    try {
      // Create a new checkout session document in Firestore.
      const checkoutSessionRef = await addDoc(collection(firestore, 'customers', user.uid, 'checkout_sessions'), {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      // Listen for changes on the document. The Stripe extension will update it with a URL.
      const unsubscribe = onSnapshot(checkoutSessionRef, (snap) => {
        const { error, url } = snap.data() || {};
        if (error) {
          console.error(`An error occurred: ${error.message}`);
          toast({ title: 'Payment Error', description: error.message, variant: 'destructive' });
          setLoadingPriceId(null);
          unsubscribe();
        }
        if (url) {
          // We have a Stripe Checkout URL, let's redirect.
          window.location.assign(url);
        }
      });

    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast({ title: 'Error', description: 'Could not initiate checkout. Please try again.', variant: 'destructive' });
      setLoadingPriceId(null);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-widest text-primary uppercase" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}>
          MESY Official Shop
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Purchase MESY Coins to use across the universe. Fuel your journey, support creators, and unlock exclusive items.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {coinPackages.map((pkg) => (
          <Card
            key={pkg.name}
            className={cn(
              'flex flex-col text-center items-center transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden shadow-lg hover:shadow-primary/20',
              pkg.bgColor,
              pkg.borderColor,
              pkg.isPopular ? 'border-2' : 'border'
            )}
          >
            {pkg.isPopular && (
              <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-bl-lg">
                Popular
              </div>
            )}
            <CardHeader className="items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Gem className="w-12 h-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">{pkg.name}</CardTitle>
              <CardDescription>Get {pkg.coins.toLocaleString()} MESY Coins</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center">
              <p className="text-5xl font-bold mb-2">${pkg.price}</p>
              <div className="flex items-center gap-2 text-yellow-400">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Bonus {pkg.bonus}</span>
              </div>
            </CardContent>
            <CardFooter className="w-full p-4">
              <Button
                className="w-full h-12 text-lg"
                onClick={() => handlePurchase(pkg.priceId)}
                disabled={!!loadingPriceId}
              >
                {loadingPriceId === pkg.priceId ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  'Purchase'
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

       <div className="text-center mt-12 text-sm text-muted-foreground">
        <p>Payments are processed securely by Stripe. MESY does not store your card details.</p>
        <p>MESY Coins are a virtual currency for use within the MESY Universe only.</p>
      </div>
    </div>
  );
}
