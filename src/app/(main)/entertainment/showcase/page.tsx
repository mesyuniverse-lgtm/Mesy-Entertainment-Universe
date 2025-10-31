
'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Gem, Star, Gift, MoreHorizontal, Video, Music, Sparkles, Clapperboard, Users, Mic } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

const showcasePosts = [
    { 
        user: { name: 'Aria', avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
        time: '2 hours ago',
        text: 'New single "Celestial Echoes" is out now! ✨ So excited to share this with you all. Let me know what you think! #NewMusic',
        media: PlaceHolderImages.find(i => i.id === 'socialive-preview'),
        mediaType: 'music',
        likes: 1800,
        comments: 350,
    },
    { 
        user: { name: 'Kael', avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
        time: '8 hours ago',
        text: 'Behind the scenes of the "Knightfall" music video shoot. It was an epic day! ⚔️',
        media: PlaceHolderImages.find(i => i.id === 'entertainment-preview'),
        mediaType: 'video',
        likes: 950,
        comments: 120,
    },
    { 
        user: { name: 'Lyra', avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl },
        time: '1 day ago',
        text: 'Just exploring some ancient ruins for inspiration for my next song. This world is full of magic.',
        media: PlaceHolderImages.find(i => i.id === 'fantasy-landscape-4'),
        mediaType: 'image',
        likes: 780,
        comments: 95,
    }
];

export default function ShowcasePage() {
    return (
        <div className="container py-12 md:py-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Artist Showcase</h1>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    The latest posts, songs, and videos from your favorite artists. Show your support and be part of their journey.
                </p>
            </div>

            <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 text-sm mb-6">
                <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                    <span className="mx-4">New Album "Celestial" by Aria just dropped! 🎵</span>
                    <span className="mx-4">Kael is hosting a live concert this Friday! 🎤</span>
                    <span className="mx-4">Top 10 MESY Chart updated. See who's number one! 🏆</span>
                </div>
                <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                    <span className="mx-4">New Album "Celestial" by Aria just dropped! 🎵</span>
                    <span className="mx-4">Kael is hosting a live concert this Friday! 🎤</span>
                    <span className="mx-4">Top 10 MESY Chart updated. See who's number one! 🏆</span>
                </div>
            </div>
             <style jsx>{`
                @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
                @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
                .animate-marquee { animation: marquee 30s linear infinite; }
                .animate-marquee2 { animation: marquee2 30s linear infinite; }
            `}</style>

            <Tabs defaultValue="showcase" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto">
                    <TabsTrigger value="showcase" asChild><Link href="/entertainment/showcase"><Sparkles className="h-4 w-4 mr-1"/>Showcase</Link></TabsTrigger>
                    <TabsTrigger value="live" asChild><Link href="/entertainment/artists/live-performance"><Mic className="h-4 w-4 mr-1"/>Live performance</Link></TabsTrigger>
                    <TabsTrigger value="artists" asChild><Link href="/entertainment/artists"><Users className="h-4 w-4 mr-1"/> Artists</Link></TabsTrigger>
                    <TabsTrigger value="songs"><Music className="h-4 w-4 mr-1"/> Songs</TabsTrigger>
                    <TabsTrigger value="videos"><Video className="h-4 w-4 mr-1"/> Videos</TabsTrigger>
                    <TabsTrigger value="talent-hub" asChild><Link href="/entertainment/artists/talent-hub"><Star className="h-4 w-4 mr-1"/> Talent Hub</Link></TabsTrigger>
                </TabsList>
                <TabsContent value="showcase" className="mt-6">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {showcasePosts.map((post, index) => (
                            <Card key={index} className="overflow-hidden bg-card/70 border border-border/50">
                                <CardHeader className="p-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar><AvatarImage src={post.user.avatar} /><AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback></Avatar>
                                        <div className="flex-grow">
                                            <p className="font-semibold">{post.user.name}</p>
                                            <p className="text-xs text-muted-foreground">{post.time}</p>
                                        </div>
                                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5"/></Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-4 pb-4 space-y-4">
                                    <p className="whitespace-pre-wrap text-sm">{post.text}</p>
                                    {post.media && (
                                        <div className="relative aspect-video rounded-lg overflow-hidden border">
                                            <Image src={post.media.imageUrl} alt={post.media.description} data-ai-hint={post.media.imageHint} fill objectFit="cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                                                {post.mediaType === 'video' && (
                                                    <Button variant="ghost" size="icon" className="h-16 w-16 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm"><Video className="h-8 w-8 text-white"/></Button>
                                                )}
                                                {post.mediaType === 'music' && (
                                                    <Button variant="ghost" size="icon" className="h-16 w-16 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm"><Music className="h-8 w-8 text-white"/></Button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-muted-foreground pt-2 border-t border-border">
                                        <div className="flex">
                                            <Button variant="ghost" size="sm" className="flex items-center gap-2"><Heart className="h-5 w-5"/>{post.likes}</Button>
                                            <Button variant="ghost" size="sm" className="flex items-center gap-2"><MessageCircle className="h-5 w-5"/>{post.comments}</Button>
                                            <Button variant="ghost" size="sm" className="flex items-center gap-2"><Share2 className="h-5 w-5"/></Button>
                                        </div>
                                        <div className="flex gap-1">
                                            <Button variant="ghost" size="sm" className="flex items-center gap-2"><Star className="h-5 w-5 text-yellow-400"/>Give Star</Button>
                                            <Button variant="ghost" size="sm" className="flex items-center gap-2"><Gift className="h-5 w-5 text-pink-400"/>Gift</Button>
                                            <Button variant="ghost" size="sm" className="flex items-center gap-2"><Gem className="h-5 w-5 text-cyan-400"/>Coin</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <div className="text-center pt-8">
                            <Button variant="outline" size="lg">Load More</Button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
