'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Music, Play, Plus, Star, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const featuredArtists = [
    {
        name: 'Aetheria',
        role: 'Vocalist & Songwriter',
        avatarId: 'female-warrior-1',
        followers: '1.2M',
    },
    {
        name: 'Zephyr',
        role: '3D & VFX Artist',
        avatarId: 'fighter-character',
        followers: '890K',
    },
    {
        name: 'Kael',
        role: 'Live Performer',
        avatarId: 'knight-1',
        followers: '750K',
    },
    {
        name: 'Lyra',
        role: 'Digital Painter',
        avatarId: 'female-archer-1',
        followers: '680K',
    }
];

const popularWorks = [
    {
        type: 'Music',
        title: 'Echoes of the Void',
        artist: 'Aetheria',
        coverId: 'glowing-gem-1'
    },
    {
        type: 'Video',
        title: 'Realms of Creation',
        artist: 'Zephyr',
        coverId: 'fantasy-landscape-5'
    },
     {
        type: 'Music',
        title: 'Celestial Hymn',
        artist: 'Aetheria',
        coverId: 'fantasy-landscape-1'
    },
    {
        type: 'Video',
        title: 'The Last Stand',
        artist: 'Kael',
        coverId: 'dragon-1'
    }
]


export default function ArtistCommunityPage() {

    const heroImage = PlaceHolderImages.find((i) => i.id === 'entertainment-preview');

    return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center text-center text-white">
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
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-4">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight mb-4" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>
                Artist Community
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/90" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>
                Discover, support, and connect with the creators shaping the MESY Universe.
            </p>
        </div>
      </section>

      <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-16">
        {/* Featured Artists Section */}
        <section>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Featured Artists</h2>
                <Button variant="outline" asChild>
                    <Link href="#">See All Artists <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredArtists.map(artist => {
                    const avatar = PlaceHolderImages.find(p => p.id === artist.avatarId);
                    return(
                        <Card key={artist.name} className="bg-card/50 border-border/50 text-center overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-primary/20 hover:border-primary/40">
                             <div className="h-24 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                             <CardContent className="p-4 flex flex-col items-center">
                                <Avatar className="-mt-12 w-24 h-24 border-4 border-background">
                                    <AvatarImage src={avatar?.imageUrl} />
                                    <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <p className="text-xl font-bold mt-3">{artist.name}</p>
                                <p className="text-sm text-muted-foreground">{artist.role}</p>
                                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span>{artist.followers} followers</span>
                                </div>
                                <Button variant="secondary" className="mt-4 w-full">View Profile</Button>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </section>

        {/* Popular Works Section */}
        <section>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Popular Works</h2>
                 <Button variant="outline" asChild>
                    <Link href="#">Explore Showcase <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularWorks.map(work => {
                    const cover = PlaceHolderImages.find(p => p.id === work.coverId);
                    return (
                        <Card key={work.title} className="group bg-card/50 border-border/50 overflow-hidden">
                            <div className="relative aspect-video">
                                <Image src={cover?.imageUrl || ''} alt={work.title} fill className="object-cover transition-transform group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" className="w-12 h-12 rounded-full"><Play className="w-6 h-6" /></Button>
                                </div>
                                <Badge variant="secondary" className="absolute top-2 right-2">{work.type}</Badge>
                            </div>
                            <CardContent className="p-4">
                                <p className="font-bold truncate">{work.title}</p>
                                <p className="text-sm text-muted-foreground">by {work.artist}</p>
                            </CardContent>
                        </Card>
                    )
                })}
             </div>
        </section>

        {/* CTA Section for Artists */}
        <section>
            <Card className="bg-gradient-to-r from-primary/80 to-accent/80 text-primary-foreground border-none">
                <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-3xl font-bold">Are You a Creator?</h3>
                        <p className="max-w-lg mt-2 opacity-90">Join our community of artists, showcase your talent, and find new opportunities.</p>
                    </div>
                    <Button variant="secondary" size="lg" className="text-lg h-12 px-8 shrink-0 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                       <Plus className="mr-2 h-5 w-5" /> Create Your Profile
                    </Button>
                </div>
            </Card>
        </section>
      </div>
    </div>
    )
}
