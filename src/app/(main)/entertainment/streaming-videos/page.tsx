'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PlayCircle, Plus, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const categories = [
    {
        title: 'MESY Originals',
        items: [
            { id: 'mov1', title: 'The Architect', coverId: 'fighter-silhouette' },
            { id: 'mov2', title: 'Chronicle of the Gem', coverId: 'glowing-gem-1' },
            { id: 'mov3', title: 'Void Walker', coverId: 'fantasy-landscape-5' },
            { id: 'mov4', title: 'Dragon\'s Peak', coverId: 'dragon-1' },
            { id: 'mov5', title: 'The Last Stand', coverId: 'knight-1' },
        ]
    },
    {
        title: 'Trending Now',
        items: [
            { id: 'mov6', title: 'Aethelgard\'s Fall', coverId: 'fantasy-castle-1' },
            { id: 'mov7', title: 'Echoes of the Forest', coverId: 'enchanted-forest-1' },
            { id: 'mov8', title: 'Cybernetic Dawn', coverId: 'auth-background' },
            { id: 'mov9', title: 'The Archer\'s Path', coverId: 'female-archer-1' },
            { id: 'mov10', title: 'Path of the Explorer', coverId: 'explorer-1' },
        ]
    }
];

export default function StreamingVideosPage() {
    const heroImage = PlaceHolderImages.find((i) => i.id === 'fantasy-landscape-1');

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
                    <Badge variant="destructive" className="mb-2 text-lg px-4 py-1">MESY Original</Badge>
                    <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                        The Crimson Blade
                    </h1>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5" />
                        </div>
                        <span className="text-sm">2026</span>
                        <Badge variant="outline">4K</Badge>
                    </div>
                    <p className="max-w-xl text-lg text-primary-foreground/90 mb-8" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                        In a world shrouded in twilight, a lone warrior seeks the legendary Crimson Blade to save her kingdom from an eternal darkness.
                    </p>
                    <div className="flex gap-4">
                        <Button size="lg" className="h-12 px-8 text-lg">
                            <PlayCircle className="mr-2 h-6 w-6" /> Play Now
                        </Button>
                         <Button size="lg" variant="secondary" className="h-12 px-8 text-lg">
                            <Plus className="mr-2 h-6 w-6" /> My List
                        </Button>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-12 -mt-10 relative z-20">
                {categories.map(category => (
                    <section key={category.title}>
                         <h2 className="text-2xl font-bold mb-4">{category.title}</h2>
                         <Carousel
                            opts={{
                                align: "start",
                                dragFree: true,
                            }}
                            className="w-full"
                         >
                            <CarouselContent className="-ml-2 md:-ml-4">
                                {category.items.map(item => {
                                    const coverImage = PlaceHolderImages.find(i => i.id === item.coverId);
                                    return (
                                        <CarouselItem key={item.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 pl-2 md:pl-4">
                                            <Card className="group border-none bg-transparent overflow-hidden">
                                                <CardContent className="p-0">
                                                    <div className="aspect-[2/3] relative rounded-lg overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300">
                                                        {coverImage && (
                                                            <Image 
                                                                src={coverImage.imageUrl} 
                                                                alt={item.title} 
                                                                fill
                                                                className="object-cover transition-transform group-hover:scale-105"
                                                            />
                                                        )}
                                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <PlayCircle className="w-12 h-12 text-white" />
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
                ))}
            </div>
        </div>
    );
}
