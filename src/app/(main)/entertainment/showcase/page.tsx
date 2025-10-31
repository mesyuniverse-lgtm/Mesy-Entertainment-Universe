
'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Gem, Star, Gift, MoreHorizontal, Video, Music } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

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
        </div>
    );
}
