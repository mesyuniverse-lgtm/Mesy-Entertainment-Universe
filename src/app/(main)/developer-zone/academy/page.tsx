'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Star, UserPlus, Video, MoreHorizontal, Heart, MessageCircle, Share2, Gem, HandCoins, Code, BookOpen, MessageSquare, Briefcase, PlayCircle, Clock, BarChart, GraduationCap, Calendar, Zap, Crown, PlusCircle, Terminal, Brush, Bot } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const popularInstructors = [
    { name: 'Draconis', skill: 'AI & Backend', rating: 4.9, students: 1250, avatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl, course: 'Advanced AI Agent Design' },
    { name: 'Elara', skill: '3D Art & Animation', rating: 4.8, students: 2300, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl, course: 'Intro to 3D Modeling for MESY' },
    { name: 'Valerius', skill: 'Game Logic & Unreal', rating: 4.7, students: 850, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl, course: 'Unreal Engine 5 for Beginners' },
];

const liveClasses = [
    { title: 'Live Coding: Building a Genkit Flow', instructor: 'Draconis', viewers: 128, avatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl, isFree: true },
    { title: '3D Sculpting Session: Mythical Creatures', instructor: 'Elara', viewers: 256, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl, isFree: false },
]

const courses = [
    { 
        title: "Mastering Genkit: Building AI-Powered Features",
        instructor: "Draconis",
        avatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl,
        level: "Intermediate",
        students: "1.2k",
        rating: 4.9,
        price: 50,
        thumbnail: PlaceHolderImages.find(i => i.id === 'auth-background'),
        likes: 1200, comments: 250,
    },
    { 
        title: "The Ultimate Guide to 3D Character Creation",
        instructor: "Elara",
        avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl,
        level: "Beginner",
        students: "2.3k",
        rating: 4.8,
        price: 0, // Free
        thumbnail: PlaceHolderImages.find(i => i.id === 'socialive-preview'),
        likes: 2500, comments: 450,
    }
];

const registrationOptions = [
    { id: 'session', name: 'Single Session', price: '25 MC' },
    { id: 'week', name: 'Weekly Pass', price: '150 MC' },
    { id: 'month', name: 'Monthly Pass', price: '500 MC', popular: true },
    { id: 'year', name: 'Annual Pass', price: '5,500 MC' },
]

export default function AcademyPage() {
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
                    <CardTitle>Popular Instructors</CardTitle>
                    <CardDescription>Top-rated developers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                {popularInstructors.map((dev, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <Avatar className="h-12 w-12"><AvatarImage src={dev.avatar} /><AvatarFallback>{dev.name.charAt(0)}</AvatarFallback></Avatar>
                        <div className="flex-grow">
                            <p className="font-bold">{dev.name}</p>
                             <div className="flex items-center text-xs text-amber-400 gap-1"><Star className="h-3 w-3 fill-current"/>{dev.rating} ({dev.students} students)</div>
                            <p className="text-xs text-muted-foreground truncate">{dev.course}</p>
                        </div>
                        <Button variant="outline" size="sm"><UserPlus className="h-4 w-4"/></Button>
                    </div>
                ))}
                </CardContent>
            </Card>
            
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle>Live Now</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                   {liveClasses.map((live, index) => (
                       <div key={index}>
                            <div className="flex items-center gap-2">
                               <Avatar className="h-8 w-8"><AvatarImage src={live.avatar}/></Avatar>
                               <div>
                                   <p className="text-sm font-semibold truncate">{live.title}</p>
                                   <p className="text-xs text-muted-foreground">by {live.instructor}</p>
                               </div>
                            </div>
                            {live.isFree ? (
                                <Button className="w-full mt-2" size="sm" variant="secondary"><PlayCircle className="mr-2 h-4 w-4"/> Join for Free ({live.viewers} watching)</Button>
                            ): (
                                <Button className="w-full mt-2" size="sm"><Calendar className="mr-2 h-4 w-4"/> Register to Join</Button>
                            )}
                       </div>
                   ))}
                </CardContent>
            </Card>

            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle>Course Registration</CardTitle>
                    <CardDescription>Join Draconis's advanced AI course.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <RadioGroup defaultValue="month" className="space-y-2">
                        {registrationOptions.map(opt => (
                            <Label key={opt.id} htmlFor={opt.id} className="flex items-center justify-between p-3 rounded-md border border-border has-[:checked]:border-primary has-[:checked]:bg-primary/10 cursor-pointer transition-colors">
                                <RadioGroupItem value={opt.id} id={opt.id} />
                                <span className="font-semibold text-sm flex-grow ml-3">{opt.name}</span>
                                {opt.popular && <Badge variant="secondary" className="mr-2">Popular</Badge>}
                                <span className="font-bold text-primary">{opt.price}</span>
                            </Label>
                        ))}
                    </RadioGroup>
                    <Separator />
                    <div className="space-y-2">
                        <Label htmlFor="session-date">Select Date & Time</Label>
                        <Input type="datetime-local" id="session-date" className="bg-background/50" />
                    </div>
                    <Button className="w-full"><HandCoins className="mr-2 h-4 w-4"/> Register & Pay</Button>
                </CardContent>
            </Card>

        </aside>

        {/* Main Content */}
        <main className="lg:col-span-6 space-y-4">
            <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 shadow-inner shadow-primary/10">
                <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                    <span className="mx-4 tracking-wider">New Course: Master Genkit for advanced AI features! 🤖</span>
                    <span className="mx-4 tracking-wider">Elara's "3D Character Creation" course is now FREE for a limited time! ✨</span>
                </div>
                <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                     <span className="mx-4 tracking-wider">New Course: Master Genkit for advanced AI features! 🤖</span>
                    <span className="mx-4 tracking-wider">Elara's "3D Character Creation" course is now FREE for a limited time! ✨</span>
                </div>
                <style jsx>{`
                @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
                @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
                .animate-marquee { animation: marquee 20s linear infinite; }
                .animate-marquee2 { animation: marquee2 20s linear infinite; }
                `}</style>
            </div>

            <Tabs defaultValue={pathname.includes('/academy') ? 'academy' : ''} className="w-full">
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
                <TabsContent value="academy" className="mt-4 space-y-4">
                     {courses.map((course, index) => (
                        <Card key={index} className="overflow-hidden bg-card/50 border border-border/50">
                            <CardHeader className="p-4">
                                <div className="flex items-center gap-3">
                                    <Avatar><AvatarImage src={course.avatar} /><AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback></Avatar>
                                    <div className="flex-grow"><p className="font-semibold">{course.instructor}</p><p className="text-xs text-muted-foreground">Posted a new course</p></div>
                                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5"/></Button>
                                </div>
                            </CardHeader>
                            <CardContent className="px-4 pb-4 space-y-4">
                               {course.thumbnail && (
                                    <div className="relative aspect-video rounded-lg overflow-hidden border">
                                        <Image src={course.thumbnail.imageUrl} alt={course.thumbnail.description} data-ai-hint={course.thumbnail.imageHint} fill objectFit="cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                                            <h3 className="text-2xl font-bold text-white tracking-tight">{course.title}</h3>
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex gap-4 text-muted-foreground">
                                        <div className="flex items-center gap-1"><BarChart className="h-4 w-4 text-primary"/><span>{course.level}</span></div>
                                        <div className="flex items-center gap-1"><Users className="h-4 w-4 text-primary"/><span>{course.students} Students</span></div>
                                        <div className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-400 fill-yellow-400"/><span>{course.rating}</span></div>
                                    </div>
                                    <div>
                                        {course.price > 0 ? (
                                            <Button>{`Enroll for ${course.price} MC`}</Button>
                                        ) : (
                                            <Button variant="secondary">Enroll for Free</Button>
                                        )}
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center text-muted-foreground">
                                    <div className="flex">
                                        <Button variant="ghost" size="sm" className="flex items-center gap-2"><Heart className="h-5 w-5"/>{course.likes}</Button>
                                        <Button variant="ghost" size="sm" className="flex items-center gap-2"><MessageCircle className="h-5 w-5"/>{course.comments}</Button>
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
                <CardContent className="p-4"><CardTitle className="text-base">Become an Instructor</CardTitle><p className="text-muted-foreground text-xs mt-1">Share your knowledge and earn rewards by creating courses for the MESY community.</p><Button className="w-full mt-3">Start Teaching</Button></CardContent>
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
