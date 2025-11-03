
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Users, Video, Clapperboard, UserPlus, Rss, Tv, UsersRound, Home, Heart, MessageCircle, Share2, Gem, ThumbsUp, ThumbsDown, Star, Maximize, Minimize, LayoutGrid, Rows } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const videoPosts = [
  {
    id: 1,
    user: { name: 'Aria', avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
    title: 'Exploring the Crystal Caves',
    description: 'Found this breathtaking place during my last quest! The crystals sing a unique melody. #Adventure #MESYUniverse',
    videoUrl: 'https://cdn.pixabay.com/video/2023/07/29/173359-849539322_large.mp4',
    likes: 1800,
    comments: 250,
  },
  {
    id: 2,
    user: { name: 'Kael', avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
    title: 'Forging the Chrono Blade',
    description: 'A glimpse into the creation of a legendary weapon. The process requires patience and a bit of magic. #Crafting #Blacksmith',
    videoUrl: 'https://cdn.pixabay.com/video/2022/10/31/136009-768524458_large.mp4',
    likes: 2500,
    comments: 450,
  },
  {
    id: 3,
    user: { name: 'Draconis', avatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl },
    title: 'A Flight Over Aethelgard',
    description: 'The world looks different from above. The mountains, the forests... everything connected.',
    videoUrl: 'https://cdn.pixabay.com/video/2024/04/23/209140-933334614_large.mp4',
    likes: 3200,
    comments: 600,
  },
];


const VideoPlayerCard = ({ post, isHorizontal = false }: { post: typeof videoPosts[0], isHorizontal?: boolean }) => {
    return (
        <Card className={cn(
            "w-full mx-auto relative overflow-hidden shadow-2xl shadow-primary/20 bg-black", 
            isHorizontal ? "aspect-video" : "aspect-[9/16] max-h-[80vh] sm:max-h-[calc(100vh-200px)]"
        )}>
            <video
                key={post.videoUrl}
                controls
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                playsInline
                loop
            >
                <source src={post.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 z-10 pointer-events-none"></div>

            <div className="absolute top-0 left-0 right-0 p-4 z-20 pointer-events-none">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3 bg-black/50 p-2 rounded-full pointer-events-auto">
                        <Avatar className="h-10 w-10 border-2 border-primary">
                            <AvatarImage src={post.user.avatar} />
                            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold text-white text-sm">{post.user.name}</p>
                            <p className="text-xs text-white/80">{post.title}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                <div className="flex items-end">
                    <div className="flex-grow space-y-2 max-h-48 overflow-y-auto pr-2 pointer-events-auto">
                        <p className="text-sm font-semibold">{post.description}</p>
                    </div>
                    <div className="flex flex-col gap-3 pl-3 pointer-events-auto">
                        <Button variant="ghost" size="icon" className="bg-white/10 rounded-full h-12 w-12 hover:bg-white/20 flex flex-col items-center">
                            <Heart className="text-red-500 h-6 w-6" />
                            <span className="text-xs">{post.likes > 1000 ? `${(post.likes/1000).toFixed(1)}k` : post.likes}</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="bg-white/10 rounded-full h-12 w-12 hover:bg-white/20 flex flex-col items-center">
                            <MessageCircle className="h-6 w-6" />
                             <span className="text-xs">{post.comments}</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="bg-white/10 rounded-full h-12 w-12 hover:bg-white/20"><Share2 className="h-6 w-6" /></Button>
                        <Button variant="ghost" size="icon" className="bg-white/10 rounded-full h-12 w-12 hover:bg-white/20"><Star className="text-yellow-400 h-6 w-6" /></Button>
                        <Button variant="ghost" size="icon" className="bg-white/10 rounded-full h-12 w-12 hover:bg-white/20"><Gem className="text-cyan-400 h-6 w-6" /></Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};


export default function SocialivePage() {
    const pathname = usePathname();
    const [layout, setLayout] = useState<'vertical' | 'horizontal'>('vertical');

  return (
    <div className="min-h-screen bg-background/90 text-foreground p-4 lg:p-6" style={{background: 'radial-gradient(ellipse at bottom, hsl(var(--primary)/0.1), hsl(var(--background)) 70%)'}}>
        {/* Marquee */}
        <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 shadow-inner shadow-primary/10 mb-4">
            <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                <span className="mx-4 tracking-wider">Aria has received a Legendary Item: Shadowfire Bow! ✨</span>
                <span className="mx-4 tracking-wider">Kael reached Level 15! 🚀</span>
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                <span className="mx-4 tracking-wider">Aria has received a Legendary Item: Shadowfire Bow! ✨</span>
                <span className="mx-4 tracking-wider">Kael reached Level 15! 🚀</span>
            </div>
            <style jsx>{`
            @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
            @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
            .animate-marquee { animation: marquee 20s linear infinite; }
            .animate-marquee2 { animation: marquee2 20s linear infinite; }
            `}</style>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue={pathname === '/socialive' ? 'video' : ''} className="w-full">
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
            <TabsTrigger value="home" asChild><Link href="/home"><Home className="h-4 w-4 mr-1 sm:hidden"/>Home</Link></TabsTrigger>
            </TabsList>
            <TabsContent value="video" className="mt-4">
                 <div className="flex justify-end mb-4">
                    <Button variant="outline" onClick={() => setLayout(layout === 'vertical' ? 'horizontal' : 'vertical')}>
                        {layout === 'vertical' ? <LayoutGrid className="mr-2 h-4 w-4" /> : <Rows className="mr-2 h-4 w-4" />}
                        {layout === 'vertical' ? 'Horizontal View' : 'Vertical View'}
                    </Button>
                </div>

                {layout === 'vertical' ? (
                     <div className="space-y-8 max-w-md mx-auto">
                        {videoPosts.map(post => (
                           <VideoPlayerCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <Carousel className="w-full" opts={{loop: true}}>
                        <CarouselContent className="-ml-2">
                            {videoPosts.map((post) => (
                                <CarouselItem key={post.id} className="pl-2 md:basis-1/1 lg:basis-1/1">
                                    <div className="p-1">
                                        <VideoPlayerCard post={post} isHorizontal={true} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4"/>
                    </Carousel>
                )}

            </TabsContent>
        </Tabs>
    </div>
  );
}
