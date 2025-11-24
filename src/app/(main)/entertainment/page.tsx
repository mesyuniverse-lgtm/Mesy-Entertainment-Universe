'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Clapperboard, Gamepad2, MicVocal, Music, Users } from 'lucide-react';
import Link from 'next/link';

const entertainmentZones = [
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: 'Artist Community',
    description: 'Showcase your work, perform live, and find opportunities in the Talent Hub.',
    href: '/entertainment/artist-community',
    tags: ['Showcase', 'Live', 'Talent Hub']
  },
  {
    icon: <Clapperboard className="w-8 h-8 text-primary" />,
    title: 'Streaming & Video',
    description: 'Enjoy a curated selection of films, series, and MESY Originals.',
    href: '/entertainment/streaming-videos',
    tags: ['Movies', 'Series', 'Originals']
  },
  {
    icon: <Gamepad2 className="w-8 h-8 text-primary" />,
    title: 'Games & eSports',
    description: 'Explore our game library, watch live tournaments, and get behind-the-scenes access.',
    href: '/entertainment/games-esports',
    tags: ['Gaming', 'eSports', 'Tournaments']
  },
  {
    icon: <MicVocal className="w-8 h-8 text-primary" />,
    title: 'Karaoke hub',
    description: 'Sing your heart out with friends in public or private karaoke rooms.',
    href: '#',
    tags: ['Social', 'Music', 'Fun']
  }
];

export default function EntertainmentPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-widest text-primary uppercase" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}>
          Entertainment Hub
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Your portal to a universe of music, film, games, and creativity. Discover, create, and connect.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {entertainmentZones.map((zone) => (
          <Link href={zone.href} key={zone.title}>
            <Card className="h-full bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20 group">
              <CardHeader className="flex flex-row items-center gap-6 space-y-0">
                <div className="p-4 bg-primary/10 rounded-lg">
                  {zone.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-1">{zone.title}</CardTitle>
                  <CardDescription>{zone.description}</CardDescription>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1" />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
