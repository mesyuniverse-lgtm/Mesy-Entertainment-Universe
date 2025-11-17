'use client';

import React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Users,
  UserPlus,
  Radio,
  Trophy,
  Users2,
  Gift,
  ArrowRight,
  PlusCircle,
  Gem,
  Bell,
  Settings,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const statsCards = [
  {
    title: 'Total Members',
    value: '139,789',
    change: '+12.5% from last month',
    icon: <Users className="h-6 w-6 text-muted-foreground" />,
  },
  {
    title: 'New Members (Today)',
    value: '127,895',
    change: '+3 since last hour',
    icon: <UserPlus className="h-6 w-6 text-muted-foreground" />,
  },
  {
    title: 'Total Live',
    value: '127,895',
    change: '+3 since last hour',
    icon: <Radio className="h-6 w-6 text-muted-foreground" />,
  },
  {
    title: 'Quest Complete',
    value: '127,895',
    change: '+3 since last hour',
    icon: <Trophy className="h-6 w-6 text-muted-foreground" />,
  },
];

const leaderboard = [
    { rank: 55, name: 'Dean Malcom', score: '59,365', avatarId: 'default-avatar'},
    { rank: 56, name: 'Boyd Rusty', score: '57,063', avatarId: 'fighter-character'},
    { rank: 57, name: 'Loreen Romy', score: '56,125', avatarId: 'female-archer-1'},
    { rank: 58, name: 'You', score: '55,365', avatarId: 'female-warrior-1', isCurrentUser: true},
    { rank: 59, name: 'Caitlyn Liana', score: '52,305', avatarId: 'knight-1'},
    { rank: 60, name: 'Philip Hall', score: '49,333', avatarId: 'explorer-1'},
];

const liveNow = [
    { name: 'Austin', role: 'CEO', status: 'Followed', avatarId: 'default-avatar'},
    { name: 'Thomas', role: 'CEO', status: 'Followed', avatarId: 'fighter-character'},
    { name: 'Chase', role: 'MD', status: 'Follow', avatarId: 'female-archer-1'},
    { name: 'Xavier', role: 'VFX', status: 'Follow', avatarId: 'female-warrior-1'},
    { name: 'Brody', role: 'UX', status: 'Followed', avatarId: 'knight-1'},
    { name: 'Jaxon', role: 'PMO', status: 'Follow', avatarId: 'explorer-1'},
    { name: 'Carlos', role: 'ADO', status: 'Follow', avatarId: 'default-avatar'},
];

const memberProfiles = [
    { name: 'CyberNinja', level: 88, avatarId: 'fighter-character'},
    { name: 'PixelPioneer', level: 75, avatarId: 'default-avatar'},
    { name: 'GalacticGamer', level: 92, avatarId: 'explorer-1'},
    { name: 'ArcadeAvenger', level: 64, avatarId: 'knight-1'},
    { name: 'QuantumQueen', level: 99, avatarId: 'female-warrior-1'},
    { name: 'VoidWalker', level: 58, avatarId: 'default-avatar'},
    { name: 'Seraphina', level: 81, avatarId: 'female-archer-1'},
    { name: 'ShadowStalker', level: 77, avatarId: 'fighter-character'},
];

const newsFeed = [
    { icon: <Gem/>, text: "PixelPioneer reached Level 75!", time: "2h ago" },
    { icon: <Gem/>, text: "CyberNinja acquired the legendary 'Blade of Echoes'.", time: "5h ago" },
    { icon: <Gem/>, text: "QuantumQueen unlocked 'Master of Dimensions' achievement.", time: "1d ago" },
    { icon: <Gem/>, text: "GalacticGamer reached Level 92!", time: "2d ago" },
];

const promotions = [
    {
        title: "Summer Quest Festival",
        description: "Join the special summer event for exclusive rewards and items!",
        imageId: 'fantasy-landscape-1'
    },
    {
        title: "Sponsored: Neon Nights Gear",
        description: "Get the latest cyber-enhanced gear from our sponsors. Limited time only.",
        imageId: 'auth-background'
    }
]

export default function DashboardPage() {
  const slideImages = PlaceHolderImages.filter(i => ['fantasy-landscape-2', 'fantasy-landscape-3', 'fantasy-landscape-4'].includes(i.id))
  
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Top Header Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="lg:col-span-1 bg-card/50 border-primary/20 flex flex-col items-center justify-center text-center p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
                <Users2 className="w-5 h-5"/>
                <span className="font-semibold">จำนวนผู้สมัคร</span>
            </div>
            <p className="text-5xl font-bold tracking-tighter text-red-500" style={{textShadow: '0 0 10px #ef4444'}}>
                137,846
            </p>
        </Card>
        {statsCards.map((stat, index) => (
          <Card key={index} className="bg-card/50 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

       {/* Ticker */}
      <div className="relative flex overflow-hidden whitespace-nowrap py-2 mb-6">
        <div className="animate-marquee flex gap-8 text-sm text-muted-foreground items-center">
            <p>Kael reached Level 15! ✨</p>
            <p>Aria has received a Legendary Item: Shadowfire Bow! 🏹</p>
            <p>PixelPioneer reached Level 75! 💎</p>
            <p>CyberNinja acquired the legendary 'Blade of Echoes'. ⚔️</p>
        </div>
        <div className="animate-marquee2 absolute top-2 left-0 flex gap-8 text-sm text-muted-foreground items-center">
             <p>Kael reached Level 15! ✨</p>
            <p>Aria has received a Legendary Item: Shadowfire Bow! 🏹</p>
            <p>PixelPioneer reached Level 75! 💎</p>
            <p>CyberNinja acquired the legendary 'Blade of Echoes'. ⚔️</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column */}
        <aside className="lg:col-span-3 space-y-6">
            <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-primary text-md">MESY Weekly Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {leaderboard.map(member => (
                            <div key={member.rank} className={`flex items-center gap-3 p-2 rounded-md ${member.isCurrentUser ? 'bg-primary/20' : ''}`}>
                                <span className="text-sm font-bold text-muted-foreground w-6">{member.rank}</span>
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={PlaceHolderImages.find(p=>p.id === member.avatarId)?.imageUrl} alt={member.name} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <p className="font-semibold flex-1">{member.name}</p>
                                <p className="text-sm font-mono text-primary">{member.score}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

             <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-md">LIVE NOW <span className="text-red-500 animate-pulse">12,248</span></CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {liveNow.map(live => (
                             <div key={live.name} className="flex items-center gap-3">
                                <Avatar className="h-9 w-9 relative">
                                    <AvatarImage src={PlaceHolderImages.find(p=>p.id === live.avatarId)?.imageUrl} alt={live.name} />
                                    <AvatarFallback>{live.name.charAt(0)}</AvatarFallback>
                                    <div className="absolute -bottom-1 -right-1 text-xs bg-red-600 rounded-full px-1 py-0.5 text-[8px] font-bold">LIVE</div>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold text-sm">{live.name}</p>
                                    <p className="text-xs text-muted-foreground">{live.role}</p>
                                </div>
                                <Button size="sm" variant={live.status === 'Followed' ? 'secondary' : 'outline'}>{live.status}</Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </aside>

        {/* Center Column */}
        <main className="lg:col-span-6 space-y-6">
            <Carousel className="w-full">
                <CarouselContent>
                    {slideImages.map((image, index) => (
                        <CarouselItem key={index}>
                            <Card className="overflow-hidden border-primary/20">
                                <div className="relative aspect-video">
                                    <Image src={image.imageUrl} alt={image.description} fill className="object-cover" />
                                    <Badge className="absolute top-2 right-2" variant={index === 1 ? 'destructive' : 'secondary'}>{index === 1 ? 'LIVE' : 'VIDEO'}</Badge>
                                </div>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
            </Carousel>
            
            <div>
                <h2 className="text-xl font-bold text-primary mb-4">MEMBERS PROFILES</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {memberProfiles.map(profile => (
                         <Card key={profile.name} className="bg-gradient-to-b from-card/80 to-primary/20 border-primary/30 text-center p-4">
                             <Avatar className="h-20 w-20 mx-auto border-4 border-background">
                                <AvatarImage src={PlaceHolderImages.find(p=>p.id === profile.avatarId)?.imageUrl} alt={profile.name}/>
                                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="font-bold mt-2">{profile.name}</p>
                            <p className="text-sm text-muted-foreground">Level {profile.level}</p>
                            <div className="flex gap-2 mt-4">
                                <Button variant="secondary" size="sm" className="flex-1"><Users2 className="mr-1 h-4 w-4"/> Profile</Button>
                                <Button variant="secondary" size="sm" className="flex-1"><Gift className="mr-1 h-4 w-4"/> Gift</Button>
                            </div>
                         </Card>
                    ))}
                </div>
            </div>
        </main>

        {/* Right Column */}
        <aside className="lg:col-span-3 space-y-6">
            <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-md">News Feed</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {newsFeed.map((item, index) => (
                             <div key={index} className="flex gap-3">
                                <div className="text-primary mt-1">{item.icon}</div>
                                <div>
                                    <p className="text-sm">{item.text}</p>
                                    <p className="text-xs text-muted-foreground">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-md">Featured Promotions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   {promotions.map(promo => {
                       const promoImage = PlaceHolderImages.find(i => i.id === promo.imageId)
                       return (
                            <div key={promo.title} className="rounded-lg overflow-hidden relative border border-primary/20">
                                {promoImage && <Image src={promoImage.imageUrl} alt={promo.title} width={400} height={200} className="w-full h-auto" />}
                                <div className="p-3 bg-black/50 backdrop-blur-sm absolute bottom-0 inset-x-0">
                                    <p className="font-semibold text-sm">{promo.title}</p>
                                    <p className="text-xs text-muted-foreground">{promo.description}</p>
                                </div>
                            </div>
                       )
                   })}
                </CardContent>
            </Card>
        </aside>
      </div>
    </div>
  );
}

    