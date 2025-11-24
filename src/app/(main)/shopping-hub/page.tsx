'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Gift, HandCoins, Heart, Landmark, ShoppingBag, Store, Users } from 'lucide-react';
import Link from 'next/link';

const shoppingZones = [
  {
    icon: <Store className="w-12 h-12 text-blue-400" />,
    title: 'MESY Market (P2P)',
    description: 'A peer-to-peer marketplace to buy and sell digital items, avatars, and effects with other members.',
    href: '#',
    cta: 'Explore Market',
  },
  {
    icon: <ShoppingBag className="w-12 h-12 text-green-400" />,
    title: 'MESY Official Shop',
    description: 'Purchase MESY Coins, special items, and exclusive partner services directly from us.',
    href: '/shopping-hub/official-shop',
    cta: 'Visit Shop',
  },
  {
    icon: <Landmark className="w-12 h-12 text-purple-400" />,
    title: 'Partner Shops',
    description: 'Discover and shop from a curated selection of approved external brands and partners.',
    href: '#',
    cta: 'Browse Partners',
  },
  {
    icon: <Gift className="w-12 h-12 text-red-400" />,
    title: 'Cashback Rewards',
    description: 'Earn points on every purchase and redeem them for discounts, special items, and more.',
    href: '#',
    cta: 'View Rewards',
  },
];

export default function ShoppingHubPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-widest text-primary uppercase" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}>
          Shopping Hub
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          The heart of the MESY Universe economy. Discover, trade, and earn in our unified commerce center.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {shoppingZones.map((zone) => (
          <Card key={zone.title} className="flex flex-col text-center items-center bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-primary/20">
            <CardHeader className="items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                {zone.icon}
              </div>
              <CardTitle className="text-2xl">{zone.title}</CardTitle>
              <CardDescription className="px-4">{zone.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Button asChild>
                <Link href={zone.href}>
                  {zone.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
