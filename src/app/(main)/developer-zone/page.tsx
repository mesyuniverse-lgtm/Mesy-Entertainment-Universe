'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Star, UserPlus, Video, MoreHorizontal, Heart, MessageCircle, Share2, Gem, HandCoins, Code, BookOpen, MessageSquare, Briefcase } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

const developers = [
    { name: 'Draconis', skill: 'AI & Backend', rating: 4.9, followers: '12.5k', avatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl },
    { name: 'Elara', skill: '3D Art & Animation', rating: 4.8, followers: '8.2k', avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
    { name: 'Valerius', skill: 'Game Logic & Unreal', rating: 4.7, followers: '6.1k', avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
];

const timelinePosts = [
    { 
        user: developers[0],
        time: '1h ago',
        text: 'Just deployed a new sentiment analysis model for the chat system. It can now detect sarcasm with 95% accuracy! 🔥 #AI #MachineLearning',
        media: null,
        likes: 128,
        comments: 32,
    },
    { 
        user: developers[1],
        time: '5h ago',
        text: 'Work in progress of the new capital city environment. What do you guys think? #3DArt #Blender',
        media: PlaceHolderImages.find(i => i.id === 'fantasy-castle-1'),
        likes: 567,
        comments: 112,
    }
];

export default function DeveloperZonePage() {
    const videoAdImage = PlaceHolderImages.find(i => i.id === 'fantasy-landscape-2');
    const adImage = PlaceHolderImages.find(i => i.id === 'glowing-gem-1');
    const userAvatar = PlaceHolderImages.find(i => i.id === 'default-avatar');

    return (
    <div className="min-h-screen bg-background/90 text-foreground p-4 lg:p-6" style={{background: 'radial-gradient(ellipse at bottom, hsl(var(--accent)/0.1), hsl(var(--background)) 70%)'}}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 hidden lg:block space-y-6">
            <Card className="bg-card/50">
                <CardHeader className="flex-row items-center gap-3 space-y-0">
                    <Users className="h-6 w-6 text-primary" />
                    <CardTitle>Developers Active</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">1,842</p>
                    <p className="text-sm text-muted-foreground">Contributing to the Universe</p>
                </CardContent>
            </Card>

            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle>Top Contributors</CardTitle>
                    <CardDescription>Leading developers this cycle</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                {developers.map((dev, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <Avatar className="h-12 w-12"><AvatarImage src={dev.avatar} /><AvatarFallback>{dev.name.charAt(0)}</AvatarFallback></Avatar>
                        <div className="flex-grow">
                            <p className="font-bold">{dev.name}</p>
                            <div className="flex items-center text-xs text-amber-400 gap-1"><Star className="h-3 w-3 fill-current"/>{dev.rating}</div>
                            <p className="text-xs text-muted-foreground">{dev.skill}</p>
                        </div>
                        <Button variant="outline" size="sm"><UserPlus className="h-4 w-4"/></Button>
                    </div>
                ))}
                </CardContent>
            </Card>
            
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle>Featured Freelancers</CardTitle>
                    <CardDescription>Top-rated instructors and designers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                     {developers.slice(0, 2).map((dev, index) => (
                        <div key={index} className="flex items-center gap-3">
                           <Avatar className="h-10 w-10"><AvatarImage src={dev.avatar} /><AvatarFallback>{dev.name.charAt(0)}</AvatarFallback></Avatar>
                           <div>
                               <p className="font-semibold text-sm">{dev.name}</p>
                               <p className="text-xs text-muted-foreground">{dev.followers} followers</p>
                           </div>
                           <Button variant="secondary" size="sm" className="ml-auto">Follow</Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-6 space-y-4">
            <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 shadow-inner shadow-primary/10">
                <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                    <span className="mx-4 tracking-wider">New SDK for Unreal Engine 5.4 released! 🚀</span>
                    <span className="mx-4 tracking-wider">Quest Bounty: Need a custom 3D model for a new creature. Prize: 5000 MC! 💎</span>
                </div>
                <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                    <span className="mx-4 tracking-wider">New SDK for Unreal Engine 5.4 released! 🚀</span>
                    <span className="mx-4 tracking-wider">Quest Bounty: Need a custom 3D model for a new creature. Prize: 5000 MC! 💎</span>
                </div>
                <style jsx>{`
                @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
                @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
                .animate-marquee { animation: marquee 20s linear infinite; }
                .animate-marquee2 { animation: marquee2 20s linear infinite; }
                `}</style>
            </div>

            <Tabs defaultValue="forum" className="w-full">
                <TabsList className="h-auto flex-wrap justify-center">
                    <TabsTrigger value="forum"><MessageSquare className="mr-2 h-4 w-4"/>Forum</TabsTrigger>
                    <TabsTrigger value="quests"><HandCoins className="mr-2 h-4 w-4"/>Quests (Bounties)</TabsTrigger>
                    <TabsTrigger value="academy"><BookOpen className="mr-2 h-4 w-4"/>Academy</TabsTrigger>
                    <TabsTrigger value="freelance"><Briefcase className="mr-2 h-4 w-4"/>Freelance</TabsTrigger>
                </TabsList>
                <TabsContent value="forum" className="mt-4 space-y-4">
                    <Card className="bg-card/50">
                        <CardContent className="p-3">
                            <div className="flex gap-3">
                                <Avatar><AvatarImage src={userAvatar?.imageUrl} /><AvatarFallback>D</AvatarFallback></Avatar>
                                <Textarea placeholder="Share your progress, developer..." className="bg-background/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"/>
                            </div>
                            <Separator className="my-3"/>
                            <div className="flex justify-between items-center">
                                <div className="flex gap-1 text-muted-foreground">
                                    <Button variant="ghost" size="sm"><Video className="mr-2 h-4 w-4"/>Video</Button>
                                    <Button variant="ghost" size="sm"><Code className="mr-2 h-4 w-4"/>Code</Button>
                                </div>
                                <Button>Post Update</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {timelinePosts.map((post, index) => (
                        <Card key={index} className="overflow-hidden bg-card/50 border border-border/50">
                            <CardHeader className="p-4">
                                <div className="flex items-center gap-3">
                                    <Avatar><AvatarImage src={post.user.avatar} /><AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback></Avatar>
                                    <div className="flex-grow"><p className="font-semibold">{post.user.name}</p><p className="text-xs text-muted-foreground">{post.time}</p></div>
                                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5"/></Button>
                                </div>
                            </CardHeader>
                            <CardContent className="px-4 pb-4 space-y-4">
                                <p className="whitespace-pre-wrap text-sm">{post.text}</p>
                                {post.media && (
                                    <div className="relative aspect-video rounded-lg overflow-hidden border"><Image src={post.media.imageUrl} alt={post.media.description} fill objectFit="cover" /></div>
                                )}
                                <div className="flex justify-between items-center text-muted-foreground pt-2 border-t border-border">
                                    <div className="flex">
                                        <Button variant="ghost" size="sm" className="flex items-center gap-2"><Heart className="h-5 w-5"/>{post.likes}</Button>
                                        <Button variant="ghost" size="sm" className="flex items-center gap-2"><MessageCircle className="h-5 w-5"/>{post.comments}</Button>
                                        <Button variant="ghost" size="sm" className="flex items-center gap-2"><Share2 className="h-5 w-5"/></Button>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="sm" className="flex items-center gap-2"><Star className="h-5 w-5 text-yellow-400"/>Give Star</Button>
                                        <Button variant="ghost" size="sm" className="flex items-center gap-2"><Gem className="h-5 w-5 text-cyan-400"/>Give Coin</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </main>

        {/* Right Sidebar */}
        <aside className="lg:col-span-3 hidden lg:block space-y-6">
            <Card className="bg-card/50 border-primary/50 shadow-lg shadow-primary/10">
                <CardHeader className="p-0">
                    {videoAdImage && (
                    <div className="relative aspect-video"><Image src={videoAdImage.imageUrl} alt={videoAdImage.description} fill className="object-cover rounded-t-lg"/><div className="absolute inset-0 bg-black/50 flex items-center justify-center"><Button variant="ghost" size="icon" className="h-16 w-16 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm"><Video className="h-8 w-8 text-white"/></Button></div></div>
                    )}
                </CardHeader>
                <CardContent className="p-4"><CardTitle className="text-base">Build with Genkit</CardTitle><p className="text-muted-foreground text-xs mt-1">Learn to build AI-powered features with our official SDK.</p></CardContent>
            </Card>
            <Card className="bg-card/50">
                <CardHeader><CardTitle>Sponsored Tools</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        {adImage && <Image src={adImage.imageUrl} alt={adImage.description} width={60} height={60} className="rounded-md"/>}
                        <div><p className="font-semibold text-sm">Chrono Debugger</p><p className="text-xs text-muted-foreground">Trace bugs through time!</p></div>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-card/50">
                <CardHeader><CardTitle>Discover Developers</CardTitle></CardHeader>
                <CardContent>
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10"><AvatarImage src={developers[2].avatar}/></Avatar>
                        <div>
                            <p className="font-semibold text-sm">{developers[2].name}</p>
                            <p className="text-xs text-muted-foreground">{developers[2].skill}</p>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto">Follow</Button>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-card/50">
                <CardHeader><CardTitle>Recommended Courses</CardTitle></CardHeader>
                <CardContent>
                   <div className="space-y-3">
                       <div><p className="font-semibold text-sm">Intro to 3D Modeling for MESY</p><p className="text-xs text-muted-foreground">By: {developers[1].name}</p></div>
                       <div><p className="font-semibold text-sm">Advanced AI Agent Design</p><p className="text-xs text-muted-foreground">By: {developers[0].name}</p></div>
                   </div>
                </CardContent>
            </Card>
        </aside>

        </div>
    </div>
    );
}
