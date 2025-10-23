'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Crown, Video, Clapperboard, UserPlus, Rss, Tv, UsersRound, CalendarClock, Heart, MessageCircle, Share2, Gem } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const popularMembers = [
  { name: 'Aria', level: 15, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
  { name: 'Kael', level: 12, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
  { name: 'Lyra', level: 10, avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl },
  { name: 'Zane', level: 20, avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl },
];

export default function SocialivePage() {
  const adImage = PlaceHolderImages.find(i => i.id === 'glowing-gem-1');
  const videoImage = PlaceHolderImages.find(i => i.id === 'fantasy-landscape-1');
  const userAvatar = PlaceHolderImages.find(i => i.id === 'female-archer-1');

  return (
    <div className="min-h-screen bg-background text-foreground p-4 lg:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 hidden lg:block space-y-6">
          <Card className="bg-card/50">
            <CardHeader className="flex-row items-center gap-4 space-y-0">
              <Users className="h-6 w-6 text-primary" />
              <CardTitle>Community</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">1,257</div>
              <p className="text-muted-foreground">Members Online</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
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
          <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2">
            <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
              <span className="mx-4">Aria has received a Legendary Item: Shadowfire Bow! ✨</span>
              <span className="mx-4">Kael reached Level 15! 🚀</span>
              <span className="mx-4">New Quest Available: The Crystal Caverns! 💎</span>
            </div>
             <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
              <span className="mx-4">Aria has received a Legendary Item: Shadowfire Bow! ✨</span>
              <span className="mx-4">Kael reached Level 15! 🚀</span>
              <span className="mx-4">New Quest Available: The Crystal Caverns! 💎</span>
            </div>
            <style jsx>{`
              @keyframes marquee {
                from { transform: translateX(0); }
                to { transform: translateX(-100%); }
              }
              @keyframes marquee2 {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
              }
              .animate-marquee {
                animation: marquee 20s linear infinite;
              }
              .animate-marquee2 {
                animation: marquee2 20s linear infinite;
              }
            `}</style>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="video" className="w-full">
            <TabsList className="h-auto flex-wrap justify-center">
              <TabsTrigger value="video"><Video className="h-4 w-4 mr-1 sm:hidden" />Social Video</TabsTrigger>
              <TabsTrigger value="live"><Clapperboard className="h-4 w-4 mr-1 sm:hidden"/>Live</TabsTrigger>
              <TabsTrigger asChild>
                <Link href="/friends"><UserPlus className="h-4 w-4 mr-1 sm:hidden"/>Friends</Link>
              </TabsTrigger>
              <TabsTrigger asChild>
                <Link href="/followers"><Rss className="h-4 w-4 mr-1 sm:hidden"/>Followers</Link>
              </TabsTrigger>
              <TabsTrigger asChild>
                <Link href="/groups"><UsersRound className="h-4 w-4 mr-1 sm:hidden"/>Groups</Link>
              </TabsTrigger>
              <TabsTrigger value="timeline"><CalendarClock className="h-4 w-4 mr-1 sm:hidden"/>Timeline</TabsTrigger>
            </TabsList>
            <TabsContent value="video" className="mt-4">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {videoImage && (
                    <div className="relative aspect-video bg-black">
                        <Image src={videoImage.imageUrl} alt={videoImage.description} fill objectFit="cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={userAvatar?.imageUrl} />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold text-lg">Exploring the Floating Islands</h3>
                                    <p className="text-sm">Aria's Adventure</p>
                                </div>
                            </div>
                        </div>
                    </div>
                  )}
                   <div className="p-4 flex justify-between items-center bg-card/80">
                        <div className="flex gap-4">
                            <Button variant="ghost" size="sm" className="flex items-center gap-2"><Heart className="h-5 w-5"/> 1.2k</Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-2"><MessageCircle className="h-5 w-5"/> 345</Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-2"><Share2 className="h-5 w-5"/> 128</Button>
                        </div>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2"><Gem className="text-cyan-400"/> Give Reward</Button>
                    </div>
                </CardContent>
              </Card>
               <div className="text-center mt-4">
                    <Button variant="outline">Load More Videos</Button>
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
