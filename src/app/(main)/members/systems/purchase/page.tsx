
'use client';

import React, { useState } from 'react';
import { useFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Gem, Loader2, Sparkles, CheckCircle, Crown, Calendar, CalendarDays, WalletCards } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Updated to reflect income plans instead of member ID packages
const incomePlans = [
  {
    level: 1,
    name: 'แผน 1 (Basic)',
    income: '$1 USD ต่อเดือน',
    priceId: 'price_1PgWd4Rvu5gJzJ6Bd4pUKTfC', // Placeholder, should be updated if this plan is purchasable
    features: ['รับรายได้เป็นรายเดือน', 'หักค่าบริการ 3% จากรายได้', 'เป็นแผนพื้นฐานสำหรับสมาชิกทุกคน'],
    bgColor: 'bg-green-900/30',
    borderColor: 'border-green-500/50',
    isDefault: true,
  },
  {
    level: 2,
    name: 'แผน 2 (Weekly)',
    income: '$1 USD ต่อสัปดาห์',
    priceId: 'price_1PgWddRvu5gJzJ6B91A4dD2j', // Placeholder, adjust price in Stripe
    features: ['สร้างรายได้รายสัปดาห์', 'รับเงินเร็วขึ้น', 'หักค่าบริการ 3% จากรายได้'],
    isPopular: true,
    bgColor: 'bg-purple-900/30',
    borderColor: 'border-purple-500/50',
  },
  {
    level: 3,
    name: 'แผน 3 (Daily)',
    income: '$1 USD ต่อวัน',
    priceId: 'price_1PgWeBRvu5gJzJ6BqBvEa7oP', // Placeholder, adjust price in Stripe
    features: ['รับรายได้ทุกวัน', 'สภาพคล่องสูงสุด', 'หักค่าบริการ 3% จากรายได้'],
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
          อัปเกรดแผนการสร้างรายได้
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          สมาชิกระบบทุกคนจะเริ่มต้นด้วยแผน Basic (รายเดือน) และสามารถอัปเกรดเพื่อรับรายได้ที่เร็วขึ้นได้
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {incomePlans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              'flex flex-col text-center items-center transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden shadow-lg hover:shadow-primary/20',
              plan.bgColor,
              plan.borderColor,
              plan.isPopular || plan.isFounder ? 'border-2' : 'border'
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-bl-lg">
                Popular
              </div>
            )}
             {plan.isFounder && (
              <div className="absolute top-0 right-0 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-bl-lg flex items-center gap-1">
                <Crown className="w-3 h-3"/> Daily
              </div>
            )}
            <CardHeader className="items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                {plan.level === 1 && <Calendar className={cn("w-12 h-12 text-primary")} />}
                {plan.level === 2 && <CalendarDays className={cn("w-12 h-12 text-primary")} />}
                {plan.level === 3 && <WalletCards className={cn("w-12 h-12 text-yellow-400")} />}
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.income}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center w-full px-6">
                <ul className="space-y-2 text-left text-sm text-muted-foreground w-full">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter className="w-full p-6">
              {plan.isDefault ? (
                <Button
                  className="w-full h-12 text-lg"
                  disabled={true}
                  variant="outline"
                >
                  เป็นแผนพื้นฐาน
                </Button>
              ) : (
                <Button
                  className="w-full h-12 text-lg"
                  onClick={() => handlePurchase(plan.priceId)}
                  disabled={!!loadingPriceId}
                  variant={plan.isFounder ? 'default' : 'secondary'}
                >
                  {loadingPriceId === plan.priceId ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    'ซื้อแผนสร้างรายได้'
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

       <div className="text-center mt-12 text-sm text-muted-foreground">
        <p>Payments are processed securely by Stripe. Upon successful purchase, your income plan will be upgraded.</p>
        <p>Already a member? <Link href="/dashboard" className="underline hover:text-primary">Go to your dashboard</Link>.</p>
      </div>
    </div>
  );
}
