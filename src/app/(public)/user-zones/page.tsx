
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle, Gift, MessageSquare, Trophy, Users, Video } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const StatCard = ({ icon, title, value, unit }: { icon: React.ReactNode, title: string, value: string, unit?: string }) => (
    <Card className="bg-card/70 backdrop-blur-sm border-white/10">
        <CardContent className="p-6 text-center">
            <div className="mx-auto w-fit p-3 bg-primary/10 rounded-full mb-2 text-primary">
                {icon}
            </div>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-muted-foreground text-sm">{title}</p>
        </CardContent>
    </Card>
);

export default function UsersZonePage() {
    const [stats, setStats] = useState({
        totalRegister: 137799,
        online: 1349,
        questSuccess: 87675,
        prizeWinners: 2454,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prevStats => ({
                totalRegister: prevStats.totalRegister + 1,
                online: prevStats.online + Math.floor(Math.random() * 5) - 2,
                questSuccess: prevStats.questSuccess + Math.floor(Math.random() * 3),
                prizeWinners: prevStats.prizeWinners + (Math.random() > 0.9 ? 1 : 0),
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    
    const onlineFriends = [
        { name: 'Kael', level: 12, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
        { name: 'Lyra', level: 10, avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl },
    ];
    
    const allUsers = [
        ...onlineFriends,
        { name: 'Zane', level: 20, avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl },
        { name: 'Aria', level: 15, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
        { name: 'Echo', level: 18, avatar: PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl },
        { name: 'Silas', level: 22, avatar: PlaceHolderImages.find(i => i.id === 'fighter-silhouette')?.imageUrl },
    ];

    const adImage = PlaceHolderImages.find(i => i.id === 'glowing-gem-1');
    const videoAdImage = PlaceHolderImages.find(i => i.id === 'rose-background');


    return (
        <div className="container py-12">
             <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 text-sm mb-6">
                <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                    <span className="mx-4">Aria has received a Legendary Item: Shadowfire Bow! ✨</span>
                    <span className="mx-4">Kael reached Level 15! 🚀</span>
                </div>
                <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                    <span className="mx-4">Aria has received a Legendary Item: Shadowfire Bow! ✨</span>
                    <span className="mx-4">Kael reached Level 15! 🚀</span>
                </div>
            </div>
             <style jsx>{`
                @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
                @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
                .animate-marquee { animation: marquee 20s linear infinite; }
                .animate-marquee2 { animation: marquee2 20s linear infinite; }
            `}</style>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                
                {/* Left Column */}
                <div className='lg:col-span-1 xl:col-span-1 space-y-6'>
                     <Card className="bg-card/70 backdrop-blur-sm border-white/10">
                        <CardContent className="p-6 text-center">
                            <p className="text-muted-foreground text-sm">จำนวนผู้สมัคร</p>
                            <p className="text-4xl font-bold text-red-500">{stats.totalRegister.toLocaleString()}</p>
                        </CardContent>
                    </Card>
                    <div className="grid grid-cols-1 gap-6">
                       <StatCard icon={<Users className="h-6 w-6"/>} title="ผู้ที่ล็อกอินอยู่" value={stats.online.toLocaleString()} />
                       <StatCard icon={<CheckCircle className="h-6 w-6"/>} title="เควสที่สำเร็จ" value={stats.questSuccess.toLocaleString()} />
                       <StatCard icon={<Trophy className="h-6 w-6"/>} title="ผู้รับรางวัล" value={stats.prizeWinners.toLocaleString()} />
                    </div>
                     <Card className="bg-card/70 backdrop-blur-sm border-white/10">
                         <CardHeader>
                            <CardTitle className="text-base text-primary">ALL USERS TOTALLY</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[...onlineFriends, ...onlineFriends, ...onlineFriends].map((friend, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={friend.avatar} />
                                            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-sm">{friend.name}</p>
                                            <p className="text-xs text-muted-foreground">Level {friend.level}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon"><MessageSquare className="h-5 w-5 text-muted-foreground"/></Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className='lg:col-span-3 xl:col-span-4'>
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                        <main className="xl:col-span-3 space-y-6">
                            <div className="text-center">
                                <h1 className="text-5xl font-headline font-bold tracking-wider text-white" style={{ textShadow: '0 0 10px hsl(var(--primary))' }}>USERS ZONE</h1>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {allUsers.map((user, index) => (
                                    <Card key={index} className="overflow-hidden text-center group relative bg-card/70 border-border/50 hover:border-primary/50 transition-all shadow-lg">
                                        <div className="relative">
                                            <Image src={user.avatar || ''} alt={user.name} width={200} height={200} className="aspect-[4/5] w-full object-cover"/>
                                            <span className="absolute top-2 right-2 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" title="Online"></span>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                            <div className="absolute bottom-2 left-0 right-0 px-2">
                                                <p className="text-white font-bold text-lg truncate">{user.name}</p>
                                                <p className="text-xs text-white/80">Level {user.level}</p>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-background/50">
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm" className="flex-1">Profile</Button>
                                                <Button variant="secondary" size="sm" className="flex-1"><Gift className="h-4 w-4 mr-1"/> Gift</Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </main>
                        {/* Right sidebar inside main area */}
                        <aside className="xl:col-span-1 space-y-6">
                            <Card className="bg-card/70 border-primary/50 shadow-lg shadow-primary/10">
                                <CardHeader className="p-0">
                                {videoAdImage && (
                                    <div className="relative aspect-video">
                                        <Image src={videoAdImage.imageUrl} alt={videoAdImage.description} data-ai-hint={videoAdImage.imageHint} fill className="object-cover rounded-t-lg"/>
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <Button variant="ghost" size="icon" className="h-16 w-16 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm">
                                                <Video className="h-8 w-8 text-white"/>
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                </CardHeader>
                                <CardContent className="p-4">
                                <CardTitle className="text-lg">Featured Promotion</CardTitle>
                                <p className="text-muted-foreground text-sm mt-1">Discover the new 'Chrono Blade' in the marketplace!</p>
                                <Button className="w-full mt-3">Watch Trailer</Button>
                                </CardContent>
                            </Card>
                            <Card className="bg-card/70">
                                <CardHeader>
                                    <CardTitle>Sponsored Ads</CardTitle>
                                    <CardDescription>Promotions from across the universe.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                <div className="flex items-center gap-4 p-3 rounded-lg bg-background/30">
                                        {adImage && <Image src={adImage.imageUrl} alt={adImage.description} data-ai-hint={adImage.imageHint} width={50} height={50} className="rounded-md"/>}
                                        <div className="flex-grow">
                                            <p className="font-semibold text-sm">Genesis Gem Dating</p>
                                            <p className="text-xs text-muted-foreground">Find your soulmate in the stars!</p>
                                        </div>
                                        <Button variant="secondary" size="sm">Visit</Button>
                                </div>
                                </CardContent>
                            </Card>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}
