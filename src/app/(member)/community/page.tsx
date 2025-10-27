'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Send, Users, Image as ImageIcon, Video, Music, Mic, MoreHorizontal, Heart, MessageCircle, Share2, Star, Gift, Gem } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const onlineMembers = [
    { name: 'Admin', avatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl },
    { name: 'Aria', avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
    { name: 'Kael', avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
    { name: 'Zane', avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl },
    { name: 'Lyra', avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl },
];

const timelinePosts = [
    { 
        user: onlineMembers[1],
        time: '2 hours ago',
        text: 'Just found this breathtaking view on my last quest! The Floating Islands are even more magical at sunset. ✨ #AethelgardAdventures #MESYUniverse',
        media: PlaceHolderImages.find(i => i.id === 'fantasy-landscape-1'),
        mediaType: 'image',
        likes: 128,
        comments: 32,
    },
    { 
        user: onlineMembers[2],
        time: '5 hours ago',
        text: 'Working on a new ballad inspired by the tales of the ancient dragons. Here\'s a sneak peek! 🎶',
        media: null,
        mediaType: 'music',
        likes: 89,
        comments: 15,
    },
    {
        user: onlineMembers[0],
        time: '1 day ago',
        text: 'A great live stream from the "Dragon Knights Guild"! They just defeated the Crimson Wyvern. A must watch for all aspiring adventurers. Shared from #Live.',
        media: PlaceHolderImages.find(i => i.id === 'socialive-preview'),
        mediaType: 'video',
        likes: 256,
        comments: 64,
    }
];

export default function CommunityPage() {
    const userAvatar = PlaceHolderImages.find(i => i.id === 'default-avatar');
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-100px)]">
            <main className="lg:col-span-3 flex flex-col h-full gap-4">
                 {/* Marquee */}
                 <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 text-sm shadow-inner shadow-primary/10">
                    <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                        <span className="mx-4">Welcome to the Member's Lounge! ✨</span>
                        <span className="mx-4">Weekly developer AMA happening this Friday! 🎙️</span>
                        <span className="mx-4">New 'Chrono Blade' available in the marketplace! ⚔️</span>
                    </div>
                    <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                       <span className="mx-4">Welcome to the Member's Lounge! ✨</span>
                        <span className="mx-4">Weekly developer AMA happening this Friday! 🎙️</span>
                        <span className="mx-4">New 'Chrono Blade' available in the marketplace! ⚔️</span>
                    </div>
                </div>
                 <style jsx>{`
                    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
                    @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
                    .animate-marquee { animation: marquee 30s linear infinite; }
                    .animate-marquee2 { animation: marquee2 30s linear infinite; }
                `}</style>
                
                 <ScrollArea className="flex-grow h-0 pr-4 -mr-4">
                    <div className="space-y-6">
                        {/* Create Post Card */}
                        <Card className="bg-card/70">
                            <CardContent className="p-3">
                                <div className="flex gap-3">
                                    <Avatar><AvatarImage src={userAvatar?.imageUrl} /><AvatarFallback>M</AvatarFallback></Avatar>
                                    <Textarea placeholder="What's happening in your universe?" className="bg-background/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"/>
                                </div>
                                <Separator className="my-3"/>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-1 text-muted-foreground">
                                        <Button variant="ghost" size="sm"><ImageIcon className="mr-2 h-4 w-4"/>Image</Button>
                                        <Button variant="ghost" size="sm"><Video className="mr-2 h-4 w-4"/>Video</Button>
                                        <Button variant="ghost" size="sm"><Music className="mr-2 h-4 w-4"/>Music</Button>
                                        <Button variant="ghost" size="sm"><Mic className="mr-2 h-4 w-4"/>Live</Button>
                                    </div>
                                    <Button>Post</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timeline Posts */}
                        {timelinePosts.map((post, index) => (
                             <Card key={index} className="overflow-hidden bg-card/70 border border-border/50">
                                <CardHeader className="p-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar><AvatarImage src={post.user.avatar} /><AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback></Avatar>
                                        <div className="flex-grow"><p className="font-semibold">{post.user.name}</p><p className="text-xs text-muted-foreground">{post.time}</p></div>
                                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5"/></Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-4 pb-4 space-y-4">
                                    <p className="whitespace-pre-wrap text-sm">{post.text}</p>
                                    {post.media && (
                                        <div className="relative aspect-video rounded-lg overflow-hidden border">
                                            <Image src={post.media.imageUrl} alt={post.media.description} data-ai-hint={post.media.imageHint} fill objectFit="cover" />
                                            {post.mediaType === 'video' && (
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                    <Button variant="ghost" size="icon" className="h-16 w-16 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm"><Video className="h-8 w-8 text-white"/></Button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-muted-foreground pt-2 border-t border-border">
                                        <div className="flex">
                                            <Button variant="ghost" size="sm" className="flex items-center gap-2"><Heart className="h-5 w-5"/>{post.likes}</Button>
                                            <Button variant="ghost" size="sm" className="flex items-center gap-2"><MessageCircle className="h-5 w-5"/>{post.comments}</Button>
                                            <Button variant="ghost" size="sm" className="flex items-center gap-2"><Share2 className="h-5 w-5"/></Button>
                                        </div>
                                        <div className="flex gap-1">
                                            <Button variant="ghost" size="sm" className="flex items-center gap-2"><Star className="h-5 w-5 text-yellow-400"/>Give Star</Button>
                                            <Button variant="ghost" size="sm" className="flex items-center gap-2"><Gift className="h-5 w-5 text-pink-400"/>Gift</Button>
                                            <Button variant="ghost" size="sm" className="flex items-center gap-2"><Gem className="h-5 w-5 text-cyan-400"/>Coin</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </main>
            <aside className="hidden lg:block">
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-3">
                        <Users className="h-5 w-5"/>
                        <CardTitle>Online Members ({onlineMembers.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {onlineMembers.map((member) => (
                            <div key={member.name} className="flex items-center gap-3">
                                <div className="relative">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background"></span>
                                </div>
                                <p className="font-semibold">{member.name}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </aside>
        </div>
    );
}
