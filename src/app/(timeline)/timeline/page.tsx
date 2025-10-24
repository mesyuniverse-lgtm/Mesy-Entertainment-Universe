'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Crown, Video, Clapperboard, UserPlus, Rss, Tv, UsersRound, CalendarClock, Heart, MessageCircle, Share2, Gem, ImagePlus, Mic, Smile } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';

const popularMembers = [
  { name: 'Aria', level: 15, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
  { name: 'Kael', level: 12, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
  { name: 'Lyra', level: 10, avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl },
  { name: 'Zane', level: 20, avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl },
];

const timelinePosts = [
    { 
        user: { name: 'Aria', avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
        time: '5 min ago',
        text: 'Just discovered a hidden waterfall in the Whispering Woods! The view is absolutely breathtaking. ✨ #adventure #explore',
        image: PlaceHolderImages.find(i => i.id === 'fantasy-landscape-2'),
        likes: 128,
        comments: 12,
    },
    { 
        user: { name: 'Kael', avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
        time: '1 hour ago',
        text: 'Forged a new blade today. The "Chrono Blade" is ready for battle! What should I enchant it with?',
        image: null,
        likes: 95,
        comments: 25,
    },
    { 
        user: { name: 'System Announcement', avatar: PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl },
        time: '3 hours ago',
        text: 'A new world event has begun! The Crystal Caverns are now open for exploration. Great treasures await the bravest adventurers!',
        image: PlaceHolderImages.find(i => i.id === 'fantasy-landscape-3'),
        likes: 543,
        comments: 88,
    }
]

export default function TimelinePage() {
  const adImage = PlaceHolderImages.find(i => i.id === 'glowing-gem-1');
  const userAvatar = PlaceHolderImages.find(i => i.id === 'default-avatar');

  return (
    <div className="min-h-screen bg-background/90 text-foreground p-4 lg:p-6" style={{background: 'radial-gradient(ellipse at bottom, hsl(var(--primary)/0.1), hsl(var(--background)) 70%)'}}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 hidden lg:block space-y-6">
          <Card className="bg-card/50 border border-primary/20 shadow-lg">
            <CardHeader className="flex-row items-center gap-4 space-y-0">
              <Users className="h-6 w-6 text-primary" />
              <CardTitle>Community</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">1,257</div>
              <p className="text-muted-foreground">Members Online</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border border-primary/20 shadow-lg">
            <CardHeader className="flex-row items-center gap-4 space-y-0">
              <Crown className="h-6 w-6 text-yellow-400" />
              <CardTitle>Popular Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {popularMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="font-bold text-lg w-4">{index + 1}</span>
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-xs text-muted-foreground">Level {member.level}</p>
                  </div>
                  <Button variant="secondary" size="sm">Follow</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-6 space-y-4">
          {/* Marquee */}
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

          {/* Content Tabs */}
          <Tabs defaultValue="timeline" className="w-full">
             <TabsList className="h-auto flex-wrap justify-center">
              <TabsTrigger value="video" asChild><Link href="/socialive"><Video className="h-4 w-4 mr-1 sm:hidden" />Social Video</Link></TabsTrigger>
              <TabsTrigger value="live" asChild><Link href="/live"><Clapperboard className="h-4 w-4 mr-1 sm:hidden"/>Live</Link></TabsTrigger>
              <TabsTrigger value="friends" asChild>
                <Link href="/friends"><UserPlus className="h-4 w-4 mr-1 sm:hidden"/>Friends</Link>
              </TabsTrigger>
              <TabsTrigger value="followers" asChild>
                <Link href="/followers"><Rss className="h-4 w-4 mr-1 sm:hidden"/>Followers</Link>
              </TabsTrigger>
              <TabsTrigger value="groups" asChild>
                <Link href="/groups"><UsersRound className="h-4 w-4 mr-1 sm:hidden"/>Groups</Link>
              </TabsTrigger>
              <TabsTrigger value="timeline" asChild>
                <Link href="/timeline"><CalendarClock className="h-4 w-4 mr-1 sm:hidden"/>Timeline</Link>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="timeline" className="mt-4 space-y-4">
                {/* Create Post Card */}
                <Card className="bg-card/50">
                    <CardContent className="p-4 flex gap-4">
                        <Avatar>
                            <AvatarImage src={userAvatar?.imageUrl} />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className='w-full space-y-2'>
                           <Textarea placeholder="What's happening in your universe?" className="bg-background/50 border-0 focus-visible:ring-1 focus-visible:ring-primary" />
                           <div className='flex justify-between items-center'>
                                <div className='flex gap-2 text-muted-foreground'>
                                    <Button variant="ghost" size="icon"><ImagePlus className="h-5 w-5" /></Button>
                                    <Button variant="ghost" size="icon"><Mic className="h-5 w-5" /></Button>
                                    <Button variant="ghost" size="icon"><Smile className="h-5 w-5" /></Button>
                                </div>
                                <Button>Post</Button>
                           </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Timeline Posts */}
                {timelinePosts.map((post, index) => (
                    <Card key={index} className="overflow-hidden bg-card/50 border border-primary/10 shadow-md">
                        <CardHeader className='p-4'>
                            <div className='flex items-center gap-3'>
                                <Avatar>
                                    <AvatarImage src={post.user.avatar} />
                                    <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{post.user.name}</p>
                                    <p className="text-xs text-muted-foreground">{post.time}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 space-y-4">
                            <p className='whitespace-pre-wrap'>{post.text}</p>
                            {post.image && (
                                <div className="relative aspect-video rounded-lg overflow-hidden border">
                                    <Image src={post.image.imageUrl} alt={post.image.description} data-ai-hint={post.image.imageHint} fill objectFit="cover" />
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

               <div className="text-center mt-4">
                    <Button variant="outline">Load More</Button>
                </div>
            </TabsContent>
          </Tabs>

        </main>

        {/* Right Sidebar */}
        <aside className="lg:col-span-3 hidden lg:block space-y-6">
          <Card className="bg-card/50 border-primary/50 shadow-lg shadow-primary/10">
            <CardHeader>
              <CardTitle>Sponsored Content</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
                {adImage && <Image src={adImage.imageUrl} alt={adImage.description} data-ai-hint={adImage.imageHint} width={300} height={300} className="rounded-lg mx-auto" />}
              <p className="text-muted-foreground text-sm">Claim your exclusive "Genesis Gem" now! Limited time offer for new members.</p>
              <Button className="w-full bg-primary/80 hover:bg-primary">Claim Now</Button>
            </CardContent>
          </Card>
        </aside>

      </div>
    </div>
  );
}
