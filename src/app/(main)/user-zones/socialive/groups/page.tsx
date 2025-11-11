
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PlusCircle, Search, Users, Shield, Video, Clapperboard, UserPlus, Rss, UsersRound, Home, Globe, Lock, Mic, Send, Heart, Gift, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function GroupsPage() {
    const publicGroups = [
        { name: 'Wanderers of the Wild', members: 534, avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl},
        { name: 'Sky Citadel Architects', members: 89, avatar: PlaceHolderImages.find(i => i.id === 'fantasy-castle-1')?.imageUrl },
    ];
    const privateGroups = [
        { name: 'The Bardic College', members: 211, avatar: PlaceHolderImages.find(i => i.id === 'entertainment-preview')?.imageUrl },
    ];

    const liveStreamImage = PlaceHolderImages.find(i => i.id === 'socialive-preview');
    const liveStreamerAvatar = PlaceHolderImages.find(i => i.id === 'dragon-1');
    const videoAdImage = PlaceHolderImages.find(i => i.id === 'fantasy-landscape-2');
    
    return (
        <div className="min-h-screen bg-background text-foreground p-4 lg:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                 {/* Left Sidebar */}
                <aside className="lg:col-span-3 space-y-6">
                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><PlusCircle />Create Group</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">Start your own community and bring people together.</p>
                            <Button className="w-full">Create a Group</Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2"><Globe /> Discover Public Groups</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {publicGroups.map((group, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={group.avatar} />
                                        <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-sm">{group.name}</p>
                                        <p className="text-xs text-muted-foreground">{group.members.toLocaleString()} members</p>
                                    </div>
                                    <Button variant="secondary" size="sm">Join</Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2"><Lock />Request to Join</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {privateGroups.map((group, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={group.avatar} />
                                        <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-sm">{group.name}</p>
                                        <p className="text-xs text-muted-foreground">{group.members.toLocaleString()} members</p>
                                    </div>
                                    <Button variant="outline" size="sm">Request</Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </aside>


                {/* Main Content */}
                <main className="lg:col-span-6 space-y-4">
                     {/* Marquee */}
                    <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 text-sm">
                        <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                            <span className="mx-4">Dragon Knights Guild is now live! 🐲</span>
                            <span className="mx-4">Mystic Crafters just unlocked a new perk! ✨</span>
                            <span className="mx-4">Wanderers of the Wild are hosting a special event! 🗺️</span>
                        </div>
                        <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                           <span className="mx-4">Dragon Knights Guild is now live! 🐲</span>
                            <span className="mx-4">Mystic Crafters just unlocked a new perk! ✨</span>
                            <span className="mx-4">Wanderers of the Wild are hosting a special event! 🗺️</span>
                        </div>
                    </div>
                     <style jsx>{`
                        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
                        @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
                        .animate-marquee { animation: marquee 30s linear infinite; }
                        .animate-marquee2 { animation: marquee2 30s linear infinite; }
                    `}</style>
                    
                    {/* Content Tabs */}
                     <Tabs defaultValue="groups" className="w-full">
                         <TabsList className="h-auto flex-wrap justify-center">
                            <TabsTrigger value="video" asChild><Link href="/socialive"><Video className="h-4 w-4 mr-1 sm:hidden" />Social Video</Link></TabsTrigger>
                            <TabsTrigger value="live" asChild><Link href="/socialive/live"><Clapperboard className="h-4 w-4 mr-1 sm:hidden"/>Live</Link></TabsTrigger>
                            <TabsTrigger value="friends" asChild>
                                <Link href="/socialive/friends"><UserPlus className="h-4 w-4 mr-1 sm:hidden"/>Friends</Link>
                            </TabsTrigger>
                            <TabsTrigger value="followers" asChild>
                                <Link href="/socialive/followers"><Rss className="h-4 w-4 mr-1 sm:hidden"/>Followers</Link>
                            </TabsTrigger>
                            <TabsTrigger value="groups" asChild>
                                <Link href="/socialive/groups"><UsersRound className="h-4 w-4 mr-1 sm:hidden"/>Groups</Link>
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="groups" className="mt-4">
                            <Card className="aspect-[9/16] max-h-[80vh] w-full max-w-md mx-auto relative overflow-hidden shadow-2xl shadow-primary/20">
                                {liveStreamImage && (
                                    <Image src={liveStreamImage.imageUrl} alt={liveStreamImage.description} data-ai-hint={liveStreamImage.imageHint} layout="fill" objectFit="cover" className="z-0" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-10"></div>
                                
                                <div className="absolute top-0 left-0 right-0 p-4 z-20">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2 bg-black/50 p-2 rounded-full">
                                            <Avatar className="h-10 w-10 border-2 border-primary">
                                                <AvatarImage src={liveStreamerAvatar?.imageUrl} />
                                                <AvatarFallback>DK</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold text-white">Dragon Knights Guild</p>
                                                <p className="text-xs text-white/80">35 Members Live</p>
                                            </div>
                                        </div>
                                        <Button variant="destructive" size="sm">LIVE</Button>
                                    </div>
                                    <div className="flex -space-x-2 overflow-hidden mt-2 pl-2">
                                        <Avatar className="inline-block h-6 w-6 rounded-full ring-2 ring-background"><AvatarImage src={PlaceHolderImages.find(i=>i.id==='female-archer-1')?.imageUrl}/></Avatar>
                                        <Avatar className="inline-block h-6 w-6 rounded-full ring-2 ring-background"><AvatarImage src={PlaceHolderImages.find(i=>i.id==='knight-1')?.imageUrl}/></Avatar>
                                        <Avatar className="inline-block h-6 w-6 rounded-full ring-2 ring-background"><AvatarImage src={PlaceHolderImages.find(i=>i.id==='explorer-1')?.imageUrl}/></Avatar>
                                        <Avatar className="inline-block h-6 w-6 rounded-full ring-2 ring-background"><AvatarFallback>+32</AvatarFallback></Avatar>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                                    <div className="flex items-end">
                                        <div className="flex-grow space-y-2 max-h-48 overflow-y-auto pr-2">
                                            <p className="text-sm"><span className="font-bold text-yellow-300">Zane:</span> Great guild event! 🔥</p>
                                            <p className="text-sm"><span className="font-bold text-cyan-300">Kael:</span> Welcome new members!</p>
                                            <p className="text-sm"><span className="font-bold text-pink-300">Lyra:</span> ❤️❤️❤️</p>
                                        </div>
                                        <div className="flex flex-col gap-3 pl-3">
                                            <Button variant="ghost" size="icon" className="bg-white/10 rounded-full h-12 w-12 hover:bg-white/20"><Heart className="text-red-500" /></Button>
                                            <Button variant="ghost" size="icon" className="bg-white/10 rounded-full h-12 w-12 hover:bg-white/20"><Gift className="text-yellow-400" /></Button>
                                            <Button variant="ghost" size="icon" className="bg-white/10 rounded-full h-12 w-12 hover:bg-white/20"><Share2 /></Button>
                                        </div>
                                    </div>
                                     <div className="flex items-center gap-2 mt-3">
                                        <Input placeholder="Add a comment..." className="bg-black/50 border-white/20 h-10"/>
                                        <Button size="icon" className="h-10 w-10"><Send /></Button>
                                    </div>
                                </div>
                            </Card>
                            <p className="text-center text-muted-foreground mt-4 text-sm">Scroll up/down to switch group streams (mock)</p>
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
                    
                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2"><Mic />Group Live Studio</CardTitle>
                            <CardDescription>Configure your group's stream before going live.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm">Stream Title</h4>
                                <p className="text-xs text-muted-foreground">Set a title for your group live.</p>
                            </div>
                             <div>
                                <h4 className="font-semibold text-sm">Filters & Effects</h4>
                                <p className="text-xs text-muted-foreground">Apply effects for all participants.</p>
                            </div>
                             <div>
                                <h4 className="font-semibold text-sm">Host Controls</h4>
                                <p className="text-xs text-muted-foreground">Manage participants and audio.</p>
                            </div>
                           <Button className="w-full" asChild>
                               <Link href="/studio">Go to Studio</Link>
                           </Button>
                        </CardContent>
                    </Card>
                </aside>

            </div>
        </div>
    );
}
