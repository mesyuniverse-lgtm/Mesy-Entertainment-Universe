'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Star, UserPlus, Video, MoreHorizontal, Heart, MessageCircle, Share2, Gem, HandCoins, Code, BookOpen, MessageSquare, Briefcase, Sparkles, Wand2, Swords, PlusCircle, Terminal, Brush, Bot } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';

const popularDevelopers = [
    { name: 'Draconis', skill: 'AI & Backend', rating: 4.9, hires: 28, avatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl },
    { name: 'Elara', skill: '3D Art & Animation', rating: 4.8, hires: 42, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
    { name: 'Valerius', skill: 'Game Logic & Unreal', rating: 4.7, hires: 15, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
];

const quests = [
    {
        title: 'Design a 3D model for a mythical creature',
        description: 'We need a high-quality, game-ready 3D model of a Griffin. Must be rigged and textured.',
        bounty: 1500,
        category: '3D Art',
        user: { name: 'Aria', avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
        tags: ['3D Modeling', 'Blender', 'Animation'],
    },
    {
        title: 'Develop a custom AI chatbot for our guild',
        description: 'Looking for a developer to integrate a Genkit-powered chatbot into our Discord server for member support.',
        bounty: 800,
        category: 'AI Development',
        user: { name: 'Zane', avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl },
        tags: ['AI', 'Genkit', 'Discord API'],
    },
    {
        title: 'Create a dynamic weather system in Unreal Engine 5',
        description: 'Implement a realistic weather system with rain, snow, and wind that affects gameplay.',
        bounty: 2500,
        category: 'Game Logic',
        user: { name: 'Kael', avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
        tags: ['Unreal Engine', 'Blueprints', 'VFX'],
    }
];

export default function QuestsPage() {
    const videoAdImage = PlaceHolderImages.find(i => i.id === 'fantasy-landscape-2');
    const adImage = PlaceHolderImages.find(i => i.id === 'glowing-gem-1');
    const pathname = usePathname();


    return (
    <div className="min-h-screen bg-background/90 text-foreground p-4 lg:p-6" style={{background: 'radial-gradient(ellipse at bottom, hsl(var(--accent)/0.1), hsl(var(--background)) 70%)'}}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 hidden lg:block space-y-6">
             <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><PlusCircle /> Create your Developer page</CardTitle>
                    <CardDescription>Create a page to show your identity as a Developer.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full">Create Page</Button>
                </CardContent>
            </Card>
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle>Top Developers</CardTitle>
                    <CardDescription>Most sought-after talent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                {popularDevelopers.map((dev, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <Avatar className="h-12 w-12"><AvatarImage src={dev.avatar} /><AvatarFallback>{dev.name.charAt(0)}</AvatarFallback></Avatar>
                        <div className="flex-grow">
                            <p className="font-bold">{dev.name}</p>
                            <div className="flex items-center text-xs text-amber-400 gap-1"><Star className="h-3 w-3 fill-current"/>{dev.rating} ({dev.hires} hires)</div>
                            <p className="text-xs text-muted-foreground">{dev.skill}</p>
                        </div>
                        <Button variant="outline" size="sm"><UserPlus className="h-4 w-4"/></Button>
                    </div>
                ))}
                </CardContent>
            </Card>
            
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle>Recommended Quest</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <h4 className="font-semibold text-sm">Legendary Sword VFX</h4>
                    <p className="text-xs text-muted-foreground">Need a VFX artist to create a fire aura for the 'Blade of Ancalor'.</p>
                    <div className="flex items-center justify-between">
                         <Badge>500 MC</Badge>
                         <Button variant="secondary" size="sm">Accept</Button>
                    </div>
                </CardContent>
            </Card>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-6 space-y-4">
            <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 shadow-inner shadow-primary/10">
                <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                    <span className="mx-4 tracking-wider">Double Bounty on all AI-related quests this week! 🤖</span>
                    <span className="mx-4 tracking-wider">Top contributor 'Elara' is now available for freelance work. ✨</span>
                </div>
                <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                    <span className="mx-4 tracking-wider">Double Bounty on all AI-related quests this week! 🤖</span>
                    <span className="mx-4 tracking-wider">Top contributor 'Elara' is now available for freelance work. ✨</span>
                </div>
                <style jsx>{`
                @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
                @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
                .animate-marquee { animation: marquee 20s linear infinite; }
                .animate-marquee2 { animation: marquee2 20s linear infinite; }
                `}</style>
            </div>

            <Tabs defaultValue={pathname.includes('/quests') ? 'quests' : ''} className="w-full">
                <TabsList className="h-auto flex-wrap justify-center">
                    <TabsTrigger value="forum" asChild>
                        <Link href="/developer-zone"><MessageSquare className="mr-2 h-4 w-4"/>Forum</Link>
                    </TabsTrigger>
                     <TabsTrigger value="developers" asChild>
                        <Link href="/developer-zone/developers"><Code className="mr-2 h-4 w-4"/>Developers</Link>
                    </TabsTrigger>
                    <TabsTrigger value="quests" asChild>
                         <Link href="/developer-zone/quests"><HandCoins className="mr-2 h-4 w-4"/>Quests (Bounties)</Link>
                    </TabsTrigger>
                    <TabsTrigger value="academy" asChild>
                        <Link href="/developer-zone/academy"><BookOpen className="mr-2 h-4 w-4"/>Academy</Link>
                    </TabsTrigger>
                    <TabsTrigger value="freelance" asChild><Link href="/developer-zone/freelance"><Briefcase className="mr-2 h-4 w-4"/>Freelance</Link></TabsTrigger>
                </TabsList>
                <TabsContent value="quests" className="mt-4 space-y-4">
                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle>Quest Board</CardTitle>
                            <CardDescription>Find your next adventure. Members post bounties for developers to complete.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {quests.map((quest, index) => (
                                <Card key={index} className="bg-background/50 border border-border/50 hover:border-primary/50 transition-colors">
                                    <CardHeader className="flex flex-row items-start justify-between gap-4">
                                        <div>
                                            <CardTitle className="text-lg mb-1">{quest.title}</CardTitle>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Avatar className="h-5 w-5"><AvatarImage src={quest.user.avatar}/><AvatarFallback>{quest.user.name.charAt(0)}</AvatarFallback></Avatar>
                                                <span>Posted by {quest.user.name}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-primary">{quest.bounty} <span className="text-sm">MC</span></p>
                                            <p className="text-xs text-muted-foreground">Bounty</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4">{quest.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {quest.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                        </div>
                                        <Separator className="mb-4"/>
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2">
                                                <Button variant="outline">View Details</Button>
                                                <Button><HandCoins className="mr-2 h-4 w-4"/>Accept Quest</Button>
                                            </div>
                                            <div className="flex gap-2 text-muted-foreground">
                                                <Button variant="ghost" size="icon"><Heart className="h-4 w-4"/></Button>
                                                <Button variant="ghost" size="icon"><Share2 className="h-4 w-4"/></Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>

        {/* Right Sidebar */}
        <aside className="lg:col-span-3 hidden lg:block space-y-6">
            <Card className="bg-card/50 border-primary/50 shadow-lg shadow-primary/10">
                <CardHeader className="p-0">
                    {videoAdImage && (
                    <div className="relative aspect-video"><Image src={videoAdImage.imageUrl} alt={videoAdImage.description} data-ai-hint={videoAdImage.imageHint} fill className="object-cover rounded-t-lg"/><div className="absolute inset-0 bg-black/50 flex items-center justify-center"><Button variant="ghost" size="icon" className="h-16 w-16 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm"><Video className="h-8 w-8 text-white"/></Button></div></div>
                    )}
                </CardHeader>
                <CardContent className="p-4"><CardTitle className="text-base">Genkit for MESY</CardTitle><p className="text-muted-foreground text-xs mt-1">Integrate powerful AI features into your creations with our official SDK.</p></CardContent>
            </Card>
             <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle>Developer Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start gap-2"><Terminal className="h-4 w-4"/> Studio Playground</Button>
                    <Button variant="ghost" className="w-full justify-start gap-2"><Code className="h-4 w-4"/> Code Editor</Button>
                    <Button variant="ghost" className="w-full justify-start gap-2"><Brush className="h-4 w-4"/> Design Tools</Button>
                    <Button variant="ghost" className="w-full justify-start gap-2"><Bot className="h-4 w-4"/> Genkit AI</Button>
                </CardContent>
            </Card>
            <Card className="bg-card/50">
                <CardHeader><CardTitle>Sponsored Tools</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        {adImage && <Image src={adImage.imageUrl} alt={adImage.description} data-ai-hint={adImage.imageHint} width={60} height={60} className="rounded-md"/>}
                        <div><p className="font-semibold text-sm">Chrono Debugger</p><p className="text-xs text-muted-foreground">Trace bugs through time!</p></div>
                    </div>
                </CardContent>
            </Card>
        </aside>

        </div>
    </div>
    );
}
