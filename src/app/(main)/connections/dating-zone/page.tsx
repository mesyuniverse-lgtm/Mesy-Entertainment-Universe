
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Heart, Sparkles, User, Users, Plus, Radio, MessageCircle, Bookmark, Share2, Music, Home, Play, MoreHorizontal, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './dating-zone.module.css';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const featuredProfilesData = [
    { name: 'Seraphina, 25', imageId: 'female-archer-1', location: 'Crystal Gardens', tags: ['Art', 'Music'], status: 'Single' },
    { name: 'Kael, 28', imageId: 'knight-1', location: 'Obsidian Keep', tags: ['Adventure', 'Gaming'], status: 'Single' },
    { name: 'Lyra, 26', imageId: 'explorer-1', location: 'Whispering Woods', tags: ['Nature', 'Books'], status: 'New Beginning' },
    { name: 'Zephyr, 29', imageId: 'fighter-character', location: 'Sky-High Citadel', tags: ['Tech', 'Movies'], status: 'Single' },
    { name: 'Aetheria, 27', imageId: 'female-warrior-1', location: 'Sunstone City', tags: ['Fitness', 'Cooking'], status: 'New Beginning' },
];

const stories = [
  { name: 'Add to Story', isAdd: true, avatarId: 'female-warrior-1', bgId: 'glowing-gem-1' },
  { name: 'Tom Russo', avatarId: 'default-avatar', bgId: 'fantasy-landscape-1' },
  { name: 'Betty Chen', avatarId: 'female-archer-1', bgId: 'fantasy-landscape-2' },
  { name: 'Dennis Han', avatarId: 'knight-1', bgId: 'fantasy-landscape-3' },
  { name: 'Cynthia Lopez', avatarId: 'explorer-1', bgId: 'fantasy-landscape-4' },
];

const featuredProfilesList = [
    { name: 'MARWAN PABLO', avatarId: 'fighter-character'},
    { name: 'Mamdouh NasrAllah', avatarId: 'default-avatar'},
    { name: 'Elzero Web School', avatarId: 'glowing-gem-1'},
    { name: 'Mahmoud Abo EL Ro...', avatarId: 'knight-1'},
    { name: 'MNEU', avatarId: 'explorer-1'},
];


export default function DatingZonePage() {
  const [stats, setStats] = useState({
    online: 137922,
    singles: 139802,
    newBeginnings: 139802,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => ({
        online: prevStats.online + Math.floor(Math.random() * 21) - 10,
        singles: prevStats.singles + Math.floor(Math.random() * 5),
        newBeginnings: prevStats.newBeginnings + Math.floor(Math.random() * 3)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const mainVideoBg = PlaceHolderImages.find(p => p.id === 'rose-background');
  const promotionImage = PlaceHolderImages.find(p => p.id === 'rose-background');
  const currentUserAvatar = PlaceHolderImages.find(p=> p.id === 'female-warrior-1');

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-white">
      <header className="text-center mb-8">
        <h1 className={`text-5xl md:text-7xl font-bold tracking-wider ${styles.title}`}>
          Dating Zone
        </h1>
        <p className={`mt-4 text-lg max-w-3xl mx-auto ${styles.subtitle}`}>
          Where fantasy meets romance. Discover your destined partner in the MESY Universe.
        </p>
      </header>

      <Alert className="mb-8 border-yellow-500/50 text-yellow-200 bg-yellow-900/20">
        <ShieldCheck className="h-4 w-4 !text-yellow-400" />
        <AlertTitle>Safety First!</AlertTitle>
        <AlertDescription>
          To ensure the safety of all members, interacting and connecting is limited to members who have completed identity verification.
        </AlertDescription>
      </Alert>

      {/* Stats and Stories */}
      <section className="mb-8">
          <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-3">
                  <Card className="bg-card/50 border-primary/20 h-full flex flex-col items-center justify-center text-center p-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                          <Radio className="w-5 h-5 text-red-500 animate-pulse"/>
                          <span className="font-semibold">Online</span>
                      </div>
                      <p className="text-4xl font-bold tracking-tighter text-red-400">
                        {stats.online.toLocaleString()}
                      </p>
                  </Card>
              </div>
              <div className="col-span-12 md:col-span-6">
                 <div className="grid grid-cols-5 gap-2 h-full">
                    {stories.map((story) => {
                        const storyBg = PlaceHolderImages.find(p=> p.id === story.bgId);
                        const storyAvatar = PlaceHolderImages.find(p=> p.id === story.avatarId);
                        return (
                            <Card key={story.name} className="relative aspect-[3/4] overflow-hidden rounded-xl border-none group">
                                {storyBg && <Image src={storyBg.imageUrl} alt={story.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300"/>}
                                <div className="absolute inset-0 bg-black/40"></div>
                                {storyAvatar && <Avatar className="absolute top-2 left-2 h-8 w-8 border-2 border-primary">
                                    <AvatarImage src={storyAvatar.imageUrl} alt={story.name} />
                                    <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                                </Avatar>}
                                {story.isAdd && (
                                    <div className="absolute bottom-0 inset-x-0 bg-card h-1/4 flex flex-col justify-end items-center p-1">
                                        <Button size="icon" className="absolute -top-4 w-8 h-8 border-4 border-card rounded-full bg-primary text-primary-foreground"><Plus className="w-4 h-4"/></Button>
                                    </div>
                                )}
                                <p className="absolute bottom-1 inset-x-0 text-center text-[10px] font-semibold text-white truncate px-1">{story.name}</p>
                            </Card>
                        )
                    })}
                 </div>
              </div>
              <div className="col-span-12 md:col-span-3">
                  <div className='h-full grid grid-cols-2 gap-4'>
                      <Card className="bg-card/50 border-primary/20 p-2 text-center">
                          <p className="font-semibold">Singles</p>
                          <p className="text-2xl font-bold">{stats.singles.toLocaleString()}</p>
                          <p className="text-xs text-green-400">+12.5%</p>
                      </Card>
                      <Card className="bg-card/50 border-primary/20 p-2 text-center">
                          <p className="font-semibold">New Beginnings</p>
                          <p className="text-2xl font-bold">{stats.newBeginnings.toLocaleString()}</p>
                          <p className="text-xs text-green-400">+12.3%</p>
                      </Card>
                  </div>
              </div>
          </div>
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-12 gap-6">
            <aside className="col-span-3 space-y-2 hidden lg:block">
                <h2 className="text-lg font-bold text-primary mb-2">Featured Profiles</h2>
                {featuredProfilesList.map((profile, index) => {
                    const avatar = PlaceHolderImages.find(p => p.id === profile.avatarId);
                    return (
                        <Button key={index} variant="ghost" className="w-full justify-start gap-3 h-auto p-2">
                           {avatar && <Avatar>
                                <AvatarImage src={avatar.imageUrl} alt={profile.name} />
                                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                            </Avatar>}
                            <span className="font-semibold">{profile.name}</span>
                        </Button>
                    );
                })}
                 <Button variant="ghost" className="w-full justify-start p-2 text-sm text-muted-foreground">
                    Show 70 more
                </Button>
            </aside>
            <main className="col-span-12 lg:col-span-6">
                 <div className="relative aspect-video rounded-xl overflow-hidden bg-card/50 flex items-center justify-center">
                    {mainVideoBg && (
                    <Image src={mainVideoBg.imageUrl} alt="Main Video" layout="fill" objectFit="cover" className="opacity-80"/>
                    )}
                    <div className="absolute inset-0 bg-black/30"></div>
                    
                    <div className="absolute top-4 right-4 text-white font-semibold text-sm py-1 px-3 bg-black/50 rounded-lg">VIDEO</div>

                    {/* Right Action Bar */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-5 text-white">
                        <div className="flex flex-col items-center gap-1">
                            <Button size="icon" variant="ghost" className="rounded-full bg-black/30 h-10 w-10"><Heart className="h-6 w-6" /></Button>
                            <span className="text-xs font-semibold">250.5K</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Button size="icon" variant="ghost" className="rounded-full bg-black/30 h-10 w-10"><MessageCircle className="h-6 w-6" /></Button>
                            <span className="text-xs font-semibold">100K</span>
                        </div>
                    </div>

                    {/* Bottom Info & Nav */}
                    <div className="absolute bottom-0 inset-x-0 p-4 text-white" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}>
                    <div className="mb-2">
                        <h3 className="font-bold">Seraphina, 25 <span className="font-normal text-sm">#LookingForLove #Gamer</span></h3>
                        <p className="text-sm">Hi there! I'm a digital artist who loves exploring new worlds, both in-game and out. Looking for a partner for my next adventure! 💖</p>
                        <p className="text-sm flex items-center gap-2"><Music className="w-4 h-4"/> My Anthem - Favorite Artist</p>
                    </div>
                    <div className="flex justify-between items-center text-center text-xs font-semibold bg-black/30 backdrop-blur-sm rounded-lg p-2">
                        <div className="flex flex-col items-center w-full"><Home className="w-5 h-5"/><span>Home</span></div>
                        <div className="flex flex-col items-center w-full"><Play className="w-5 h-5"/><span>Now</span></div>
                        <div className="flex flex-col items-center w-full"><div className='w-10 h-7 bg-primary rounded-lg flex items-center justify-center'><Plus className="w-5 h-5"/></div></div>
                        <div className="flex flex-col items-center w-full relative"><MessageCircle className="w-5 h-5"/><span className='absolute -top-1 -right-3 text-[10px] bg-red-500 rounded-full px-1.5 py-0.5'>12</span><span>Inbox</span></div>
                        <div className="flex flex-col items-center w-full"><Users className="w-5 h-5"/><span>Profile</span></div>
                    </div>
                    </div>
                </div>
            </main>
             <aside className="col-span-12 lg:col-span-3">
                 <Card className="bg-card/50 border-primary/20 overflow-hidden">
                    <CardContent className="p-0">
                         {promotionImage && 
                            <div className="relative aspect-video">
                                <Image src={promotionImage.imageUrl} alt="Featured Promotion" fill className="object-cover"/>
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                    <Button variant="ghost" size="icon" className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm">
                                        <Play className="w-6 h-6 text-white fill-white"/>
                                    </Button>
                                </div>
                            </div>
                        }
                        <div className="p-3">
                            <p className="text-sm text-muted-foreground">Featured Promotion</p>
                            <p className="font-semibold">Single Lady 36 Age</p>
                             <p className="text-xs text-yellow-300 bg-black/50 p-1 rounded-md inline-block my-1">Looking for True love</p>
                            <Button variant="secondary" className="w-full mt-2 h-9">Watch Trailer</Button>
                        </div>
                    </CardContent>
                </Card>
            </aside>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
        <div className={`p-8 rounded-2xl flex flex-col items-center text-center ${styles['zone-card']}`}>
          <div className="p-4 bg-pink-500/20 rounded-full mb-4">
            <Users className="w-12 h-12 text-pink-300" />
          </div>
          <h2 className="text-3xl font-bold mb-2">For Singles</h2>
          <p className="text-white/80 mb-2 flex-grow">
            For all members seeking a partner. Create your profile, browse others, and find your perfect match.
          </p>
          <p className="text-2xl font-bold text-pink-300 mb-4">{stats.singles.toLocaleString()}</p>
          <Button variant="secondary" size="lg" className="bg-pink-500/50 border border-pink-400 hover:bg-pink-500/70 text-white">
            Explore Singles
          </Button>
        </div>
        <div className={`p-8 rounded-2xl flex flex-col items-center text-center ${styles['zone-card']}`}>
          <div className="p-4 bg-purple-500/20 rounded-full mb-4">
            <Heart className="w-12 h-12 text-purple-300" />
          </div>
          <h2 className="text-3xl font-bold mb-2">New Beginnings</h2>
          <p className="text-white/80 mb-2 flex-grow">
            A dedicated space for those who are widowed or divorced, ready to write their next chapter.
          </p>
          <p className="text-2xl font-bold text-purple-300 mb-4">{stats.newBeginnings.toLocaleString()}</p>
          <Button variant="secondary" size="lg" className="bg-purple-500/50 border border-purple-400 hover:bg-purple-500/70 text-white">
            Find a New Start
          </Button>
        </div>
      </div>
      
      <section className="mb-16">
        <h2 className={`text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3 ${styles.title}`}>
          <Sparkles className="w-8 h-8"/> AI Matching
        </h2>
        <div className={`p-8 rounded-2xl text-center ${styles['zone-card']}`}>
            <p className="text-lg text-white/90">Our advanced AI helps you find the most compatible partners based on your personality, interests, and activity within the universe. Complete your profile to get your first matches!</p>
            <Button size="lg" className="mt-6 bg-blue-500/50 border border-blue-400 hover:bg-blue-500/70 text-white">
                <User className="mr-2 h-5 w-5" />
                Complete Your Profile
            </Button>
        </div>
      </section>

      <section>
        <h2 className={`text-3xl font-bold text-center mb-8 ${styles.title}`}>
          Featured Profiles
        </h2>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
                {featuredProfilesData.map((profile) => {
                    const image = PlaceHolderImages.find(p => p.id === profile.imageId);
                    return (
                        <CarouselItem key={profile.name} className="md:basis-1/2 lg:basis-1/3 pl-4">
                            <div className={`w-full aspect-[3/4] ${styles['profile-card']}`}>
                                {image && <Image src={image.imageUrl} alt={profile.name} layout="fill" objectFit="cover" />}
                                <div className={styles.info}>
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h3 className="text-xl font-bold">{profile.name}</h3>
                                        <p className="text-sm text-white/80">{profile.location}</p>
                                      </div>
                                      <Badge variant={profile.status === 'Single' ? 'default' : 'secondary'} className={profile.status === 'Single' ? 'bg-pink-500/80 border-pink-400' : 'bg-purple-500/80 border-purple-400'}>{profile.status}</Badge>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        {profile.tags.map(tag => <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-none">{tag}</Badge>)}
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
             <CarouselPrevious className="hidden lg:flex" />
             <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </section>
    </div>
  );
}

    