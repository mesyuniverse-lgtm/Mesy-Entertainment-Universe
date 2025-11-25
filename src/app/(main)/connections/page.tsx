'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, Heart, UserSearch } from 'lucide-react';
import Link from 'next/link';

const connectionZones = [
  {
    icon: <Heart className="w-12 h-12 text-red-400" />,
    title: 'Dating Zone',
    description: 'Find meaningful relationships. Connect with singles or those ready for a new beginning.',
    href: '/connections/dating-zone',
    cta: 'Find Your Match',
  },
  {
    icon: <UserSearch className="w-12 h-12 text-blue-400" />,
    title: 'Post Quest (Find Employees)',
    description: 'Looking for help? Post a quest to hire personal assistants, bodyguards, chefs, and more.',
    href: '/connections/post-quest',
    cta: 'Post a Quest',
  },
  {
    icon: <Briefcase className="w-12 h-12 text-green-400" />,
    title: 'Need Jobs (Part-time)',
    description: 'Offer your skills and find part-time opportunities. Showcase your talent to find your next gig.',
    href: '#',
    cta: 'Find Gigs',
  },
];

export default function ConnectionsPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-widest text-primary uppercase" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}>
          The Connection Hub
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          The center for all relationships in the MESY Universe, from personal connections to professional opportunities.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {connectionZones.map((zone) => (
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
