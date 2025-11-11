
'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Clapperboard, Crown, Gift, Heart, MessageCircle, Share2, Gem, Star, LayoutGrid, Video, ArrowLeft, Rss, UserPlus, Send } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const videoPost = {
    user: { name: 'Aria', avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
    title: 'Exploring the Crystal Caves',
    description: 'Found this breathtaking place during my last quest! The crystals sing a unique melody. #Adventure #MESYUniverse',
    videoUrl: 'https://cdn.pixabay.com/video/2023/07/29/173359-849539322_large.mp4',
    likes: 1800,
    comments: 250,
};

const VideoPlayerCard = ({ post }: { post: typeof videoPost }) => {
    return (
        <Card className={cn(
            "w-full mx-auto relative overflow-hidden shadow-2xl shadow-primary/20 bg-black aspect-[9/16] max-h-[80vh] sm:max-h-[calc(100vh-240px)]"
        )}>
            <video
                key={post.videoUrl}
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                playsInline
                loop
                autoPlay
                muted
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
                 <div className="flex items-center gap-2 mt-3 pointer-events-auto">
                    <Input placeholder="Add a comment..." className="bg-black/50 border-white/20 h-10"/>
                    <Button size="icon" className="h-10 w-10"><Send /></Button>
                </div>
            </div>
        </Card>
    );
};

export default function SocialPage() {
    const topStreamers = [
        { name: 'Aria', viewers: 1200, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
        { name: 'Kael', viewers: 950, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
    ];
    const topGifters = [
        { name: 'Zane', amount: 5000, avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl },
    ];
    const friendsLive = [
        { name: 'Lyra', avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl },
    ];
    
    const videoAdImage = PlaceHolderImages.find(i => i.id === 'rose-background');

  return (
    <div className="min-h-screen bg-background/90 text-foreground">
        <div className="relative flex overflow-x-hidden bg-primary/10 border-b border-t border-primary/30 py-2 shadow-inner">
            <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                <span className="mx-4 tracking-wider">Aria has received a Legendary Item: Shadowfire Bow! ✨</span>
                <span className="mx-4 tracking-wider">Kael reached Level 15! 🚀</span>
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                <span className="mx-4 tracking-wider">Aria has received a Legendary Item: Shadowfire Bow! ✨</span>
                <span className="mx-4 tracking-wider">Kael reached Level 15! 🚀</span>
            </div>
        </div>
        <style jsx>{`
            @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
            @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
            .animate-marquee { animation: marquee 20s linear infinite; }
            .animate-marquee2 { animation: marquee2 20s linear infinite; }
        `}</style>
            
        <div className="container mx-auto p-4 lg:p-6">
             <div className="mb-6">
                <Button asChild variant="outline">
                    <Link href="/users">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Sidebar */}
                <aside className="lg:col-span-3 space-y-6">
                    <Card className="bg-card/50">
                        <CardHeader className="flex-row items-center gap-3">
                            <Users className="h-6 w-6 text-primary"/>
                            <CardTitle>Users Online</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">12,503</p>
                            <p className="text-sm text-muted-foreground">Currently exploring</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50">
                        <CardHeader className="flex-row items-center gap-3">
                            <Clapperboard className="h-6 w-6 text-primary"/>
                            <CardTitle>Now Live</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">1,234</p>
                            <p className="text-sm text-muted-foreground">Members streaming now</p>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Crown className="text-yellow-400" />Top Streamers</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {topStreamers.map((streamer, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={streamer.avatar} />
                                        <AvatarFallback>{streamer.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-sm">{streamer.name}</p>
                                        <p className="text-xs text-primary flex items-center gap-1"><Users className="h-3 w-3"/> {streamer.viewers.toLocaleString()}</p>
                                    </div>
                                    <Button variant="secondary" size="sm">View</Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Gift className="text-pink-400"/>Top Gifters</CardTitle>
                        </CardHeader>
                         <CardContent className="space-y-3">
                            {topGifters.map((gifter, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={gifter.avatar} />
                                        <AvatarFallback>{gifter.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-sm">{gifter.name}</p>
                                        <p className="text-xs text-muted-foreground">Gave ${gifter.amount.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                     <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">Friends Live</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                             {friendsLive.length > 0 ? friendsLive.map((friend, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={friend.avatar} />
                                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-sm">{friend.name}</p>
                                        <p className="text-xs text-green-400">is now live!</p>
                                    </div>
                                    <Button variant="outline" size="sm">Join</Button>
                                </div>
                            )) : (
                                <p className="text-sm text-muted-foreground text-center py-4">No friends are live right now.</p>
                            )}
                        </CardContent>
                    </Card>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-6">
                    <Tabs defaultValue="video" className="w-full">
                        <div className="flex justify-between items-center mb-4">
                            <TabsList className="h-auto flex-wrap justify-center">
                                <TabsTrigger value="video" asChild><Link href="/socialive"><Video className="h-4 w-4 mr-1 sm:hidden"/>Social Video</Link></TabsTrigger>
                                <TabsTrigger value="live" asChild><Link href="/live"><Clapperboard className="h-4 w-4 mr-1 sm:hidden"/>Live</Link></TabsTrigger>
                                <TabsTrigger value="friends" asChild><Link href="/friends"><UserPlus className="h-4 w-4 mr-1 sm:hidden"/>Friends</Link></TabsTrigger>
                                <TabsTrigger value="followers" asChild><Link href="/followers"><Rss className="h-4 w-4 mr-1 sm:hidden"/>Followers</Link></TabsTrigger>
                            </TabsList>
                             <Button variant="outline"><LayoutGrid className="mr-2 h-4 w-4"/> Grid View</Button>
                        </div>
                        <TabsContent value="video">
                             <div className="space-y-8 max-w-md mx-auto">
                                <VideoPlayerCard post={videoPost} />
                            </div>
                        </TabsContent>
                    </Tabs>
                </main>
                
                 {/* Right Sidebar */}
                <aside className="lg:col-span-3 space-y-6">
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
                           <CardTitle className="text-lg">Featured Promotion</CardTitle>
                           <p className="text-muted-foreground text-sm mt-1">Discover the new 'Chrono Blade' in the marketplace!</p>
                           <Button className="w-full mt-3">Watch Trailer</Button>
                        </CardContent>
                    </Card>
                     <Card className="bg-card/50 border-dashed border-border hover:border-primary/50 transition-colors">
                        <CardContent className="p-4 h-32 flex flex-col items-center justify-center text-center">
                           <p className="text-sm font-semibold">UPLOAD</p>
                           <p className="text-xs text-muted-foreground">PICTURE / VIDEO</p>
                           <p className="text-xs text-muted-foreground mt-2">ADD LINK / URL</p>
                        </CardContent>
                    </Card>
                     <Card className="bg-card/50 border-dashed border-border hover:border-primary/50 transition-colors">
                        <CardContent className="p-4 h-32 flex flex-col items-center justify-center text-center">
                           <p className="text-sm font-semibold">UPLOAD</p>
                           <p className="text-xs text-muted-foreground">PICTURE / VIDEO</p>
                           <p className="text-xs text-muted-foreground mt-2">ADD LINK / URL</p>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    </div>
  );
}
