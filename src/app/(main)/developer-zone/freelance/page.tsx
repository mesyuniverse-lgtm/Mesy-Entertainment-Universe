'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Star, UserPlus, Video, MoreHorizontal, Heart, MessageCircle, Share2, Gem, HandCoins, Code, BookOpen, MessageSquare, Briefcase, Sparkles, Wand2, Swords, BadgeCent, PlusCircle } from "lucide-react";
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

const freelancers = [
    {
        ...popularDevelopers[1],
        post: 'Just finished designing a new line of enchanted armor. Available for custom 3D modeling commissions!',
        media: PlaceHolderImages.find(i => i.id === 'socialive-preview'),
        likes: 350,
        comments: 45
    },
    {
        ...popularDevelopers[0],
        post: 'My Genkit integration services are open. Let\'s build intelligent features for your project.',
        media: null,
        likes: 180,
        comments: 22
    }
];

const featuredSkills = [
    { name: 'Logo Design', rating: 4.8, users: 1500, price: 250, icon: <Sparkles/> },
    { name: 'VFX Effects', rating: 4.9, users: 800, price: 800, icon: <Wand2/> },
    { name: 'Character Rigging', rating: 4.7, users: 450, price: 500, icon: <UserPlus/> },
]

export default function FreelancePage() {
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
                    <CardTitle>Top Freelancers</CardTitle>
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
                    <CardTitle>Featured Services</CardTitle>
                    <CardDescription>Discover popular skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {featuredSkills.map(skill => (
                        <div key={skill.name} className="flex items-center gap-3">
                            <div className="p-2 bg-secondary rounded-md text-primary">{skill.icon}</div>
                            <div className="flex-grow">
                                <p className="font-semibold text-sm">{skill.name}</p>
                                <div className="flex items-center text-xs text-muted-foreground gap-2">
                                    <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-400 fill-yellow-400"/> {skill.rating}</span>
                                    <span>({skill.users} users)</span>
                                </div>
                            </div>
                            <Button size="sm" variant="outline">{skill.price} MC</Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-6 space-y-4">
            <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 shadow-inner shadow-primary/10">
                <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                    <span className="mx-4 tracking-wider">Need a project done? Hire top-tier talent from the MESY Freelance Market! 🧑‍💻</span>
                    <span className="mx-4 tracking-wider">Top artist 'Elara' is now available for custom 3D model commissions. ✨</span>
                </div>
                <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                    <span className="mx-4 tracking-wider">Need a project done? Hire top-tier talent from the MESY Freelance Market! 🧑‍💻</span>
                    <span className="mx-4 tracking-wider">Top artist 'Elara' is now available for custom 3D model commissions. ✨</span>
                </div>
                <style jsx>{`
                @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
                @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
                .animate-marquee { animation: marquee 20s linear infinite; }
                .animate-marquee2 { animation: marquee2 20s linear infinite; }
                `}</style>
            </div>

            <Tabs defaultValue="freelance" className="w-full">
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
                <TabsContent value="freelance" className="mt-4 space-y-4">
                    {freelancers.map((freelancer, index) => (
                        <Card key={index} className="overflow-hidden bg-card/50 border border-border/50">
                            <CardHeader className="p-4">
                                <div className="flex items-center gap-3">
                                    <Avatar><AvatarImage src={freelancer.avatar} /><AvatarFallback>{freelancer.name.charAt(0)}</AvatarFallback></Avatar>
                                    <div className="flex-grow"><p className="font-semibold">{freelancer.name}</p><p className="text-xs text-muted-foreground">{freelancer.skill}</p></div>
                                    <Button variant="outline" size="sm">Hire Me</Button>
                                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5"/></Button>
                                </div>
                            </CardHeader>
                            <CardContent className="px-4 pb-4 space-y-4">
                                <p className="whitespace-pre-wrap text-sm">{freelancer.post}</p>
                                {freelancer.media && (
                                    <div className="relative aspect-video rounded-lg overflow-hidden border"><Image src={freelancer.media.imageUrl} alt={freelancer.media.description} fill objectFit="cover" /></div>
                                )}
                                <div className="flex justify-between items-center text-muted-foreground pt-2 border-t border-border">
                                    <div className="flex">
                                        <Button variant="ghost" size="sm" className="flex items-center gap-2"><Heart className="h-5 w-5"/>{freelancer.likes}</Button>
                                        <Button variant="ghost" size="sm" className="flex items-center gap-2"><MessageCircle className="h-5 w-5"/>{freelancer.comments}</Button>
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
                    <div className="relative aspect-video"><Image src={videoAdImage.imageUrl} alt={videoAdImage.description} data-ai-hint={videoAdImage.imageHint} fill className="object-cover rounded-t-lg"/><div className="absolute inset-0 bg-black/50 flex items-center justify-center"><Button variant="ghost" size="icon" className="h-16 w-16 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm"><Video className="h-8 w-8 text-white"/></Button></div></div>
                    )}
                </CardHeader>
                <CardContent className="p-4"><CardTitle className="text-base">Find Top Talent</CardTitle><p className="text-muted-foreground text-xs mt-1">Browse our freelance market to find the perfect developer for your project.</p></CardContent>
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
            <Card className="bg-card/50">
                <CardHeader><CardTitle>Discover Developers</CardTitle></CardHeader>
                <CardContent>
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10"><AvatarImage src={popularDevelopers[2].avatar}/></Avatar>
                        <div>
                            <p className="font-semibold text-sm">{popularDevelopers[2].name}</p>
                            <p className="text-xs text-muted-foreground">{popularDevelopers[2].skill}</p>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto">Follow</Button>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-card/50">
                <CardHeader><CardTitle>Recommended Courses</CardTitle></CardHeader>
                <CardContent>
                   <div className="space-y-3">
                       <div><p className="font-semibold text-sm">Intro to 3D Modeling for MESY</p><p className="text-xs text-muted-foreground">By: {popularDevelopers[1].name}</p></div>
                       <div><p className="font-semibold text-sm">Advanced AI Agent Design</p><p className="text-xs text-muted-foreground">By: {popularDevelopers[0].name}</p></div>
                   </div>
                </CardContent>
            </Card>
        </aside>

        </div>
    </div>
    );
}
