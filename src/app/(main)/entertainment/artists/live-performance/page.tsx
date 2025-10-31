
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Search, Clapperboard, Video, UserPlus, Rss, UsersRound, Home, Crown, Gift, Users, UserCheck, Mic, Star, Send, Heart, Share2, Save, BadgeCent, Sparkles, Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function LivePerformancePage() {
    const topStreamers = [
        { name: 'Aria', level: 15, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl, viewers: 1200 },
        { name: 'Kael', level: 12, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl, viewers: 950 },
    ];
    const topGifters = [
        { name: 'Zane', level: 20, avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl, amount: 5000 },
    ];
    const friendsLive = [
        { name: 'Lyra', level: 10, avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl },
    ];

    const liveStreamImage = PlaceHolderImages.find(i => i.id === 'socialive-preview');
    const liveStreamerAvatar = PlaceHolderImages.find(i => i.id === 'female-archer-1');
    const videoAdImage = PlaceHolderImages.find(i => i.id === 'fantasy-landscape-2');
    
    return (
        <div className="min-h-screen bg-background text-foreground p-4 lg:p-6">
             <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 text-sm mb-6">
                <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                    <span className="mx-4">Aria just started a live stream! 🔴</span>
                    <span className="mx-4">Zane sent Kael a Dragon Gift! 🐲</span>
                    <span className="mx-4">Lyra reached 10,000 followers! 🎉</span>
                </div>
                <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                   <span className="mx-4">Aria just started a live stream! 🔴</span>
                    <span className="mx-4">Zane sent Kael a Dragon Gift! 🐲</span>
                    <span className="mx-4">Lyra reached 10,000 followers! 🎉</span>
                </div>
            </div>
             <style jsx>{`
                @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
                @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
                .animate-marquee { animation: marquee 30s linear infinite; }
                .animate-marquee2 { animation: marquee2 30s linear infinite; }
            `}</style>
            
            <Tabs defaultValue="live" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto">
                    <TabsTrigger value="showcase" asChild><Link href="/entertainment/showcase"><Sparkles className="h-4 w-4 mr-1"/>Showcase</Link></TabsTrigger>
                    <TabsTrigger value="live" asChild><Link href="/entertainment/artists/live-performance"><Mic className="h-4 w-4 mr-1"/>Live performance</Link></TabsTrigger>
                    <TabsTrigger value="artists" asChild><Link href="/entertainment/artists"><Users className="h-4 w-4 mr-1"/> Artists</Link></TabsTrigger>
                    <TabsTrigger value="songs"><Music className="h-4 w-4 mr-1"/> Songs</TabsTrigger>
                    <TabsTrigger value="videos"><Video className="h-4 w-4 mr-1"/> Videos</TabsTrigger>
                    <TabsTrigger value="talent-hub" asChild><Link href="/entertainment/artists/talent-hub"><Star className="h-4 w-4 mr-1"/> Talent Hub</Link></TabsTrigger>
                </TabsList>
                <TabsContent value="live" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* Left Sidebar */}
                        <aside className="lg:col-span-3 space-y-6">
                            <Card className="bg-card/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Clapperboard /> Now Live</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl font-bold">1,234</p>
                                    <p className="text-sm text-muted-foreground">Members streaming now</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50">
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center gap-2"><Crown className="text-yellow-400" />Top Streamers</CardTitle>
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
                                    <CardTitle className="text-base flex items-center gap-2"><Gift className="text-primary"/>Top Gifters</CardTitle>
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
                                    <CardTitle className="text-base flex items-center gap-2"><UsersRound />Friends Live</CardTitle>
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
                            <Card className="aspect-[9/16] max-h-[80vh] w-full max-w-md mx-auto relative overflow-hidden shadow-2xl shadow-primary/20">
                                {liveStreamImage && (
                                    <Image src={liveStreamImage.imageUrl} alt={liveStreamImage.description} data-ai-hint={liveStreamImage.imageHint} layout="fill" objectFit="cover" className="z-0" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-10"></div>
                                
                                <div className="absolute top-0 left-0 right-0 p-4 z-20">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2 bg-black/50 p-2 rounded-full">
                                            <Avatar className="h-10 w-10 border-2 border-primary">
                                                <AvatarImage src={liveStreamerAvatar?.imageUrl} />
                                                <AvatarFallback>A</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold text-white">Aria's Adventure</p>
                                                <p className="text-xs text-white/80">1.2k Viewers</p>
                                            </div>
                                        </div>
                                        <Button variant="destructive" size="sm">LIVE</Button>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                                    <div className="flex items-end">
                                        <div className="flex-grow space-y-2 max-h-48 overflow-y-auto pr-2">
                                            {/* Mock Comments */}
                                            <p className="text-sm"><span className="font-bold text-yellow-300">Zane:</span> Awesome stream! 🔥</p>
                                            <p className="text-sm"><span className="font-bold text-cyan-300">Kael:</span> What game is this?</p>
                                            <p className="text-sm"><span className="font-bold text-pink-300">Lyra:</span> ❤️❤️❤️</p>
                                            <p className="text-sm"><span className="font-bold text-green-300">Echo:</span> Sent a Dragon! 🐲</p>
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
                            <p className="text-center text-muted-foreground mt-4 text-sm">Scroll up/down to switch streams (mock)</p>
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
                                    <CardTitle className="text-base flex items-center gap-2"><Mic />Live Studio</CardTitle>
                                    <CardDescription>Configure your stream before going live.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                   <Button className="w-full">
                                        Go Live
                                   </Button>
                                </CardContent>
                            </Card>
                        </aside>

                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
