'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Bookmark, Calendar, ChevronDown, Clapperboard, Clock, Gamepad2, HandCoins, Heart, History, Home, Inbox, MessageCircle, MicVocal, MoreHorizontal, Music, Play, Plus, Radio, Search, Share2, Shield, Star, Store, ThumbsUp, Tv, User, UserPlus, Users, Users2, Video } from 'lucide-react';

const entertainmentZones = [
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: 'Artist Community',
    description: 'Showcase your work, perform live, and find opportunities in the Talent Hub.',
    href: '/entertainment/artist-community',
  },
  {
    icon: <Clapperboard className="w-8 h-8 text-primary" />,
    title: 'Streaming & Video',
    description: 'Enjoy a curated selection of films, series, and MESY Originals.',
    href: '/entertainment/streaming-videos',
  },
  {
    icon: <Gamepad2 className="w-8 h-8 text-primary" />,
    title: 'Games & eSports',
    description: 'Explore our game library, watch live tournaments, and get behind-the-scenes access.',
    href: '/entertainment/games-esports',
  },
  {
    icon: <MicVocal className="w-8 h-8 text-primary" />,
    title: 'Karaoke hub',
    description: 'Sing your heart out with friends in public or private karaoke rooms.',
    href: '/entertainment/karaoke-hub',
  },
];

const leftNavItems = [
    { icon: <Video className="w-5 h-5" />, label: 'Watch' },
    { icon: <Clapperboard className="w-5 h-5" />, label: 'Your videos' },
    { icon: <Play className="w-5 h-5" />, label: 'Library' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Events' },
    { icon: <Clock className="w-5 h-5" />, label: 'Memories' },
    { icon: <ThumbsUp className="w-5 h-5" />, label: 'Liked videos' },
];

const initialStats = {
  online: 137990,
  artistCommunity: 139812,
  streamingVideo: 127912,
  gamesEsports: 127982,
  karaokeHub: 127898,
};

export default function EntertainmentPage() {
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        online: prev.online + Math.floor(Math.random() * 20 - 10),
        artistCommunity: prev.artistCommunity + Math.floor(Math.random() * 5),
        streamingVideo: prev.streamingVideo + Math.floor(Math.random() * 5),
        gamesEsports: prev.gamesEsports + Math.floor(Math.random() * 5),
        karaokeHub: prev.karaokeHub + Math.floor(Math.random() * 5),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const adImage = PlaceHolderImages.find(p => p.id === 'fantasy-door-1');
  const mainVideoBg = PlaceHolderImages.find(p => p.id === 'rose-background');
  const currentUserAvatar = PlaceHolderImages.find(p => p.id === 'female-warrior-1');

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header and Stats */}
      <header className="text-center mb-8">
         <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card className="bg-card/50 border-primary/20 flex flex-col items-center justify-center text-center p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Radio className="w-5 h-5 text-red-500 animate-pulse"/>
                    <span className="font-semibold">Online</span>
                </div>
                <p className="text-4xl font-bold tracking-tighter text-red-500">
                    {(stats.online || 0).toLocaleString()}
                </p>
            </Card>
            <Card className="bg-card/50 border-primary/20 p-4 text-center">
                 <p className="font-semibold text-muted-foreground">Artist Community</p>
                 <p className="text-4xl font-bold tracking-tighter text-foreground">{(stats.artistCommunity || 0).toLocaleString()}</p>
                 <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </Card>
            <Card className="bg-card/50 border-primary/20 p-4 text-center">
                 <p className="font-semibold text-muted-foreground">Streaming & Video</p>
                 <p className="text-4xl font-bold tracking-tighter text-foreground">{(stats.streamingVideo || 0).toLocaleString()}</p>
                 <p className="text-xs text-muted-foreground">+3 since last hour</p>
            </Card>
            <Card className="bg-card/50 border-primary/20 p-4 text-center">
                 <p className="font-semibold text-muted-foreground">Games & eSports</p>
                 <p className="text-4xl font-bold tracking-tighter text-foreground">{(stats.gamesEsports || 0).toLocaleString()}</p>
                 <p className="text-xs text-muted-foreground">+3 since last hour</p>
            </Card>
            <Card className="bg-card/50 border-primary/20 p-4 text-center">
                 <p className="font-semibold text-muted-foreground">Karaoke hub</p>
                 <p className="text-4xl font-bold tracking-tighter text-foreground">{(stats.karaokeHub || 0).toLocaleString()}</p>
                 <p className="text-xs text-muted-foreground">+3 since last hour</p>
            </Card>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-widest text-primary uppercase" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}>
          Entertainment Hub
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Your portal to a universe of music, film, games, and creativity. Discover, create, and connect.
        </p>
      </header>

      {/* Main Content Area */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <aside className="col-span-12 lg:col-span-3 space-y-2 hidden lg:block">
             <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30">
                {currentUserAvatar && <Avatar>
                    <AvatarImage src={currentUserAvatar.imageUrl} alt="User Name" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>}
                <div>
                    <p className="font-semibold text-sm">Levels: 15</p>
                    <p className="font-semibold">Name: Josephine</p>
                </div>
            </div>
            {leftNavItems.map((item, index) => (
                <Button key={index} variant="ghost" className="w-full justify-start gap-3 p-2 h-auto text-base">
                    {item.icon} {item.label}
                </Button>
            ))}
            <Button variant="ghost" className="w-full justify-start gap-3 p-2 h-auto text-base">
                <ChevronDown className="w-5 h-5"/> Show more
            </Button>
        </aside>

        {/* Center Video */}
        <main className="col-span-12 lg:col-span-6">
            <div className="relative aspect-[9/16] max-w-sm mx-auto rounded-xl overflow-hidden bg-card/50 flex items-center justify-center">
                {mainVideoBg && (
                    <Image src={mainVideoBg.imageUrl} alt="Main Video" layout="fill" objectFit="cover" className="opacity-80"/>
                )}
                <div className="absolute inset-0 bg-black/30"></div>

                <div className="absolute top-4 left-4 flex gap-2">
                  <Button size="icon" variant="ghost" className="bg-black/30 rounded-full text-white"><ChevronDown /></Button>
                </div>
                <div className="absolute top-4 right-4 text-white font-semibold text-sm py-1 px-3 bg-black/50 rounded-lg">VIDEO</div>

                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-5 text-white">
                    <div className="flex flex-col items-center gap-1">
                        <Button size="icon" variant="ghost" className="rounded-full bg-black/30 h-12 w-12"><Heart className="h-7 w-7" /></Button>
                        <span className="text-xs font-semibold">250.5K</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Button size="icon" variant="ghost" className="rounded-full bg-black/30 h-12 w-12"><MessageCircle className="h-7 w-7" /></Button>
                        <span className="text-xs font-semibold">100K</span>
                    </div>
                </div>
                
                <div className="absolute bottom-0 inset-x-0 p-4 text-white" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}>
                    <div className="mb-2">
                        <h3 className="font-bold">Name and Last name <span className="font-normal text-sm">#fyp</span></h3>
                        <p className="text-sm">Caption of the post</p>
                        <p className="text-sm flex items-center gap-2"><Music className="w-4 h-4"/> Song name - song artist</p>
                    </div>
                    <div className="flex justify-between items-center text-center text-xs font-semibold bg-black/30 backdrop-blur-sm rounded-lg p-2">
                        <div className="flex flex-col items-center w-full"><Home className="w-5 h-5"/><span>Home</span></div>
                        <div className="flex flex-col items-center w-full"><Play className="w-5 h-5"/><span>Now</span></div>
                        <div className="flex flex-col items-center w-full"><div className='w-10 h-7 bg-primary rounded-lg flex items-center justify-center'><Plus className="w-5 h-5"/></div></div>
                        <div className="flex flex-col items-center w-full relative"><div className="w-5 h-5" /><span>Inbox</span> <span className='absolute top-0 right-5 text-[10px] bg-red-500 rounded-full px-1.5 py-0.5'>12</span></div>
                        <div className="flex flex-col items-center w-full"><User className="w-5 h-5"/><span>Profile</span></div>
                    </div>
                </div>
            </div>
        </main>

        {/* Right Ad/History */}
        <aside className="col-span-12 lg:col-span-3 space-y-4 hidden lg:block">
            <Card className="bg-card/50 p-2">
                {adImage && <div className='relative w-full aspect-video rounded-md overflow-hidden'>
                    <Image src={adImage.imageUrl} layout="fill" objectFit="cover" alt="Ad"/>
                </div>}
                <div className='p-2'>
                    <p className='text-xs text-muted-foreground'>Orange Egypt</p>
                    <p className='text-sm font-semibold'>Call #012# and Get Free Mcdonald's Meal</p>
                </div>
            </Card>
            <Button variant="ghost" className="w-full justify-start gap-3 p-2 h-auto text-base">
                <History className="w-5 h-5" /> History
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 p-2 h-auto text-base">
                <Tv className="w-5 h-5" /> Watch later
            </Button>
        </aside>
      </div>

      {/* Bottom Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
        {entertainmentZones.map((zone) => (
          <Link href={zone.href} key={zone.title}>
            <Card className="h-full bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20 group">
              <CardHeader className="flex flex-row items-center gap-6 space-y-0 p-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  {zone.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-1">{zone.title}</CardTitle>
                  <CardDescription>{zone.description}</CardDescription>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1" />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
