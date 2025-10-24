'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Video, Clapperboard, UserPlus, Rss, UsersRound, CalendarClock, Heart, MessageCircle, Share2, MoreHorizontal, ImagePlus, Mic, Smile, Globe, Lock, Upload, Cloud, Film, Gamepad2, ShoppingBag, MapPin, Beer } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

const timelinePosts = [
    { 
        type: 'image',
        user: { name: 'Kael', avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
        time: '30 min ago',
        text: 'Forged a new blade today. The "Chrono Blade" is ready for battle! What should I enchant it with?',
        media: PlaceHolderImages.find(i => i.id === 'entertainment-preview'),
        likes: 95,
        comments: 25,
    },
    { 
        type: 'text',
        user: { name: 'System Announcement', avatar: PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl },
        time: '3 hours ago',
        text: 'A new world event has begun! The Crystal Caverns are now open for exploration. Great treasures await the bravest adventurers! Join your friends and guilds to conquer the depths and unearth rare artifacts. Good luck, heroes!',
        media: null,
        likes: 543,
        comments: 88,
    }
]

export default function TimelinePage() {
  const userAvatar = PlaceHolderImages.find(i => i.id === 'default-avatar');
  const avatarOptions = [
      PlaceHolderImages.find(i => i.id === 'female-archer-1'),
      PlaceHolderImages.find(i => i.id === 'knight-1'),
      PlaceHolderImages.find(i => i.id === 'explorer-1'),
      PlaceHolderImages.find(i => i.id === 'fighter-character'),
  ];
  const galleryImages = PlaceHolderImages.slice(5, 11);
  const videoAdImage = PlaceHolderImages.find(i => i.id === 'fantasy-landscape-2');
  const adImage = PlaceHolderImages.find(i => i.id === 'glowing-gem-1');


  return (
    <div className="min-h-screen bg-background/90 text-foreground p-4 lg:p-6" style={{background: 'radial-gradient(ellipse at bottom, hsl(var(--primary)/0.1), hsl(var(--background)) 70%)'}}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 hidden lg:block space-y-6">
          <Card className="bg-card/50">
            <CardHeader>
                <CardTitle>My Avatar</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-primary shadow-lg">
                    <AvatarImage src={userAvatar?.imageUrl} />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="grid grid-cols-4 gap-2 mb-4">
                    {avatarOptions.map((img, idx) => img && (
                        <Avatar key={idx} className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-primary">
                            <AvatarImage src={img.imageUrl} />
                        </Avatar>
                    ))}
                </div>
                <Button variant="outline" className="w-full"><Upload className="mr-2 h-4 w-4" /> Upload Photo</Button>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader><CardTitle>My Gallery</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-3 gap-2">
                {galleryImages.map((img, idx) => img && (
                    <Image key={idx} src={img.imageUrl} alt={img.description} width={100} height={100} className="rounded-md aspect-square object-cover hover:opacity-80 transition-opacity"/>
                ))}
            </CardContent>
          </Card>
           <Card className="bg-card/50">
            <CardHeader><CardTitle>Friends (12)</CardTitle></CardHeader>
            <CardContent>
               <p className="text-sm text-muted-foreground">Friend list component would go here.</p>
            </CardContent>
          </Card>
           <Card className="bg-card/50">
            <CardHeader><CardTitle>My Groups (3)</CardTitle></CardHeader>
             <CardContent>
               <p className="text-sm text-muted-foreground">Joined groups component would go here.</p>
            </CardContent>
          </Card>
           <Card className="bg-card/50">
            <CardHeader><CardTitle>My Pages (1)</CardTitle></CardHeader>
             <CardContent className="space-y-3">
               <p className="text-sm text-muted-foreground">Pages list component.</p>
               <Button variant="secondary" className="w-full">Create a Page</Button>
            </CardContent>
          </Card>

        </aside>

        {/* Main Content */}
        <main className="lg:col-span-6 space-y-4">
          <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 shadow-inner shadow-primary/10">
            <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
              <span className="mx-4 tracking-wider">Aria has received a Legendary Item: Shadowfire Bow! ✨</span>
              <span className="mx-4 tracking-wider">Kael reached Level 15! 🚀</span>
              <span className="mx-4 tracking-wider">New Quest Available: The Crystal Caverns! 💎</span>
            </div>
             <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
              <span className="mx-4 tracking-wider">Aria has received a Legendary Item: Shadowfire Bow! ✨</span>
              <span className="mx-4 tracking-wider">Kael reached Level 15! 🚀</span>
              <span className="mx-4 tracking-wider">New Quest Available: The Crystal Caverns! 💎</span>
            </div>
            <style jsx>{`
              @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
              @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
              .animate-marquee { animation: marquee 20s linear infinite; }
              .animate-marquee2 { animation: marquee2 20s linear infinite; }
            `}</style>
          </div>

          <Tabs defaultValue="timeline" className="w-full">
             <TabsList className="h-auto flex-wrap justify-center">
              <TabsTrigger value="video" asChild><Link href="/socialive"><Video className="h-4 w-4 mr-1 sm:hidden" />Social Video</Link></TabsTrigger>
              <TabsTrigger value="live" asChild><Link href="/live"><Clapperboard className="h-4 w-4 mr-1 sm:hidden"/>Live</Link></TabsTrigger>
              <TabsTrigger value="friends" asChild><Link href="/friends"><UserPlus className="h-4 w-4 mr-1 sm:hidden"/>Friends</Link></TabsTrigger>
              <TabsTrigger value="followers" asChild><Link href="/followers"><Rss className="h-4 w-4 mr-1 sm:hidden"/>Followers</Link></TabsTrigger>
              <TabsTrigger value="groups" asChild><Link href="/groups"><UsersRound className="h-4 w-4 mr-1 sm:hidden"/>Groups</Link></TabsTrigger>
              <TabsTrigger value="timeline" asChild><Link href="/timeline"><CalendarClock className="h-4 w-4 mr-1 sm:hidden"/>Timeline</Link></TabsTrigger>
            </TabsList>
            <TabsContent value="timeline" className="mt-4 space-y-4">
                <Card className="bg-card/50">
                    <CardContent className="p-3">
                        <div className='flex gap-3'>
                            <Avatar>
                                <AvatarImage src={userAvatar?.imageUrl} />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <Textarea placeholder="What's on your mind, User?" className="bg-background/50 border-0 focus-visible:ring-1 focus-visible:ring-primary flex-grow" />
                        </div>
                        <Separator className="my-3"/>
                        <div className='flex justify-between items-center'>
                             <div className='flex gap-1 text-muted-foreground'>
                                <Button variant="ghost" size="sm" aria-label="Add Media"><ImagePlus className="mr-2 h-4 w-4" /> Photo/Video</Button>
                                <Button variant="ghost" size="sm" aria-label="From Cloud"><Cloud className="mr-2 h-4 w-4" /> From Cloud</Button>
                                <Button variant="ghost" size="sm" aria-label="Add Emoji"><Smile className="h-5 w-5" /></Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="flex items-center gap-1"><Globe className="h-4 w-4"/> Public</Button>
                                <Button>Post</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {timelinePosts.map((post, index) => (
                    <Card key={index} className="overflow-hidden bg-card/50 border border-primary/10 shadow-md">
                        <CardHeader className='p-4'>
                            <div className='flex items-center gap-3'>
                                <Avatar>
                                    <AvatarImage src={post.user.avatar} />
                                    <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <p className="font-semibold">{post.user.name}</p>
                                    <p className="text-xs text-muted-foreground">{post.time}</p>
                                </div>
                                <Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5"/></Button>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 space-y-4">
                            <p className='whitespace-pre-wrap text-sm'>{post.text}</p>
                            {post.media && (
                                <div className="relative aspect-video rounded-lg overflow-hidden border">
                                    <Image src={post.media.imageUrl} alt={post.media.description} data-ai-hint={post.media.imageHint} fill objectFit="cover" />
                                </div>
                            )}
                            <div className="flex justify-between items-center text-muted-foreground pt-2 border-t border-border">
                                <Button variant="ghost" size="sm" className="flex items-center gap-2"><Heart className="h-5 w-5"/> {post.likes}</Button>
                                <Button variant="ghost" size="sm" className="flex items-center gap-2"><MessageCircle className="h-5 w-5"/> {post.comments}</Button>
                                <Button variant="ghost" size="sm" className="flex items-center gap-2"><Share2 className="h-5 w-5"/></Button>
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
                  <CardTitle className="text-base">Featured Promotion</CardTitle>
                  <p className="text-muted-foreground text-xs mt-1">Discover the new 'Chrono Blade' in the marketplace!</p>
              </CardContent>
          </Card>
          <Card className="bg-card/50">
              <CardHeader><CardTitle>Sponsored</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                      {adImage && <Image src={adImage.imageUrl} alt={adImage.description} data-ai-hint={adImage.imageHint} width={60} height={60} className="rounded-md"/>}
                      <div>
                          <p className="font-semibold text-sm">Genesis Gem</p>
                          <p className="text-xs text-muted-foreground">Claim your exclusive gem now!</p>
                      </div>
                  </div>
              </CardContent>
          </Card>
           <Card className="bg-card/50">
              <CardHeader><CardTitle className="flex items-center gap-2"><Gamepad2/> Recommended Games</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Game recommendation component here.</p></CardContent>
          </Card>
          <Card className="bg-card/50">
              <CardHeader><CardTitle className="flex items-center gap-2"><Film/> Upcoming Movies</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Movie recommendation component here.</p></CardContent>
          </Card>
           <Card className="bg-card/50">
              <CardHeader><CardTitle className="flex items-center gap-2"><MapPin/> Discover Places</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Places recommendation component here.</p></CardContent>
          </Card>
        </aside>

      </div>
    </div>
  );
}
