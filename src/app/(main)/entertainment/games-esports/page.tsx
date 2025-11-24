'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Gamepad2, PlayCircle, Radio, Trophy, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const liveTournaments = [
    { id: 't1', title: 'Chrono Blade: World Championship', game: 'Chrono Blade', viewers: '125K', imageId: 'dragon-1' },
    { id: 't2', title: 'Void Walker: Nexus League Finals', game: 'Void Walker', viewers: '88K', imageId: 'fantasy-landscape-5' },
    { id: 't3', title: 'Aethelgard Arena: Season Opener', game: 'Aethelgard\'s Fall', viewers: '62K', imageId: 'fantasy-castle-1' },
];

const gameLibrary = [
    { id: 'g1', title: 'Chrono Blade', genre: 'Action RPG', imageId: 'fighter-character' },
    { id: 'g2', title: 'Void Walker', genre: 'Stealth Action', imageId: 'fighter-silhouette' },
    { id: 'g3', title: 'Aethelgard\'s Fall', genre: 'Strategy', imageId: 'knight-1' },
    { id: 'g4', title: 'Path of the Explorer', genre: 'Adventure', imageId: 'explorer-1' },
    { id: 'g5', title: 'Celestial Hymn', genre: 'Rhythm Game', imageId: 'female-archer-1' },
];

export default function GamesEsportsPage() {
    const heroImage = PlaceHolderImages.find((i) => i.id === 'dragon-1');

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-end text-white">
                {heroImage && (
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        data-ai-hint={heroImage.imageHint}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="relative z-10 p-8 md:p-12 max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                        Chrono Blade
                    </h1>
                    <p className="max-w-xl text-lg text-primary-foreground/90 mb-8" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                        Embark on a time-bending journey in the latest action RPG from MESY Studios. Forge your destiny, master the elements, and rewrite history.
                    </p>
                    <div className="flex gap-4">
                        <Button size="lg" className="h-12 px-8 text-lg">
                            <PlayCircle className="mr-2 h-6 w-6" /> Play Now
                        </Button>
                         <Button size="lg" variant="secondary" className="h-12 px-8 text-lg">
                            Add to Library
                        </Button>
                    </div>
                </div>
            </section>

             {/* Content Section */}
            <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-16">
                 {/* Live Tournaments */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold flex items-center gap-3"><Radio className="w-8 h-8 text-red-500 animate-pulse" /> Live Tournaments</h2>
                         <Button variant="outline" asChild>
                            <Link href="#">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {liveTournaments.map(tournament => {
                            const image = PlaceHolderImages.find(i => i.id === tournament.imageId);
                            return (
                                <Card key={tournament.id} className="group border-border/50 hover:border-primary/50 transition-all overflow-hidden">
                                    <CardHeader className="p-0 relative">
                                        <div className="aspect-video relative">
                                            {image && <Image src={image.imageUrl} alt={tournament.title} fill className="object-cover transition-transform group-hover:scale-105" />}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                            <Badge variant="destructive" className="absolute top-2 left-2">LIVE</Badge>
                                            <div className="absolute bottom-2 left-4 text-white">
                                                <h3 className="font-bold text-lg leading-tight" style={{textShadow: '1px 1px 3px #000'}}>{tournament.title}</h3>
                                                <p className="text-sm opacity-90">{tournament.game}</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4 bg-card/50 flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Trophy className="w-4 h-4 text-yellow-400" />
                                            <span>World Championship</span>
                                        </div>
                                        <div className="text-sm font-semibold">{tournament.viewers} Viewers</div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </section>

                {/* Game Library */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold flex items-center gap-3"><Gamepad2 className="w-8 h-8 text-primary" /> Game Library</h2>
                         <Button variant="outline" asChild>
                            <Link href="#">Browse All Games <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </div>
                     <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {gameLibrary.map(game => {
                                const coverImage = PlaceHolderImages.find(i => i.id === game.imageId);
                                return (
                                    <CarouselItem key={game.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-2 md:pl-4">
                                        <Card className="group border-none bg-transparent overflow-hidden">
                                            <CardContent className="p-0">
                                                <div className="aspect-[3/4] relative rounded-lg overflow-hidden border-2 border-border/50 group-hover:border-primary transition-all duration-300">
                                                    {coverImage && (
                                                        <Image 
                                                            src={coverImage.imageUrl} 
                                                            alt={game.title} 
                                                            fill
                                                            className="object-cover transition-transform group-hover:scale-105"
                                                        />
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3">
                                                         <h4 className="font-bold text-white text-lg leading-tight" style={{textShadow: '1px 1px 2px #000'}}>{game.title}</h4>
                                                         <p className="text-xs text-white/80">{game.genre}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                )
                            })}
                        </CarouselContent>
                        <CarouselPrevious className="hidden lg:flex" />
                        <CarouselNext className="hidden lg:flex" />
                     </Carousel>
                </section>
            </div>
        </div>
    );
}
