'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Star, UserPlus, Video, Code, BookOpen, MessageSquare, Briefcase, HandCoins, Search, PlusCircle, Terminal, Brush, Bot } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const developers = [
    { name: 'Draconis', skill: 'AI & Backend', rating: 4.9, followers: '12.5k', avatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl, isHirable: true },
    { name: 'Elara', skill: '3D Art & Animation', rating: 4.8, followers: '8.2k', avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl, isHirable: true },
    { name: 'Valerius', skill: 'Game Logic & Unreal', rating: 4.7, followers: '6.1k', avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl, isHirable: false },
    { name: 'Zane', skill: 'VFX & Particle Systems', rating: 4.9, followers: '5.5k', avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl, isHirable: true },
    { name: 'Lyra', skill: 'UI/UX & Frontend', rating: 4.8, followers: '7.2k', avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl, isHirable: false },
    { name: 'Kael', skill: 'Blockchain & Web3', rating: 4.6, followers: '4.8k', avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl, isHirable: true },
];

export default function DevelopersPage() {
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
                    <span className="mx-4 tracking-wider">Meet the architects of the MESY Universe! 🧑‍💻</span>
                    <span className="mx-4 tracking-wider">Top-rated developers are now available for freelance projects. ✨</span>
                </div>
                <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                    <span className="mx-4 tracking-wider">Meet the architects of the MESY Universe! 🧑‍💻</span>
                    <span className="mx-4 tracking-wider">Top-rated developers are now available for freelance projects. ✨</span>
                </div>
                <style jsx>{`
                @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
                @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
                .animate-marquee { animation: marquee 20s linear infinite; }
                .animate-marquee2 { animation: marquee2 20s linear infinite; }
                `}</style>
            </div>

            <Tabs defaultValue={pathname.includes('/developers') ? 'developers' : ''} className="w-full">
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
                <TabsContent value="developers" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Developer Directory</CardTitle>
                            <CardDescription>Discover the talented developers building the MESY Universe.</CardDescription>
                             <div className="relative pt-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="Search developers by name or skill..." className="pl-10" />
                            </div>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {developers.map((dev, index) => (
                                 <Card key={index} className="overflow-hidden bg-card/50 border border-border/50 hover:border-primary/50 hover:shadow-primary/10 transition-all shadow-lg">
                                    <CardHeader className="flex flex-row items-center gap-4">
                                         <Avatar className="h-16 w-16 border-2 border-primary/50">
                                            <AvatarImage src={dev.avatar} />
                                            <AvatarFallback>{dev.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-grow">
                                            <CardTitle className="text-xl">{dev.name}</CardTitle>
                                            <p className="text-sm text-primary font-semibold">{dev.skill}</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-around items-center text-center text-sm p-3 bg-secondary/30 rounded-md">
                                            <div>
                                                <p className="font-bold text-lg">{dev.rating}</p>
                                                <p className="text-xs text-muted-foreground">Rating</p>
                                            </div>
                                             <div>
                                                <p className="font-bold text-lg">{dev.followers}</p>
                                                <p className="text-xs text-muted-foreground">Followers</p>
                                            </div>
                                             <div>
                                                {dev.isHirable ? (
                                                    <Badge>Hirable</Badge>
                                                ) : (
                                                    <Badge variant="outline">Not Available</Badge>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" className="flex-1"><UserPlus className="mr-2 h-4 w-4"/> Follow</Button>
                                            <Button className="flex-1">View Profile</Button>
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
                <CardContent className="p-4"><CardTitle className="text-base">Build with Genkit</CardTitle><p className="text-muted-foreground text-xs mt-1">Learn to build AI-powered features with our official SDK.</p></CardContent>
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
