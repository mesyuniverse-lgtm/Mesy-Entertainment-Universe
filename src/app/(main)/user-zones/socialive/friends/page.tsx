
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Check, Gift, Search, UserPlus, Users, X, MessageSquare, Video, Clapperboard, Rss, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function FriendsPage() {
    const frequentlyContacted = [
        { name: 'Kael', level: 12, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl, online: true },
        { name: 'Lyra', level: 10, avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl, online: false },
    ];
    const friendRequests = [
        { name: 'Zane', level: 20, avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl },
    ];
    const suggestedFriends = [
        { name: 'Aria', level: 15, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
        { name: 'Echo', level: 18, avatar: PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl },
    ]

    const allFriends = [
        ...frequentlyContacted,
        { name: 'Zane', level: 20, avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl, online: true },
        { name: 'Aria', level: 15, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl, online: false },
        { name: 'Echo', level: 18, avatar: PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl, online: true },
        { name: 'Silas', level: 22, avatar: PlaceHolderImages.find(i => i.id === 'fighter-silhouette')?.imageUrl, online: false },
    ];

    const adImage = PlaceHolderImages.find(i => i.id === 'glowing-gem-1');
    const videoAdImage = PlaceHolderImages.find(i => i.id === 'fantasy-landscape-2');


    return (
        <div className="min-h-screen bg-background text-foreground p-4 lg:p-6">
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
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Users /> Friends</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">{allFriends.length}</p>
                            <p className="text-sm text-muted-foreground">Total Friends</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-base">Frequently Contacted</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {frequentlyContacted.map((friend, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={friend.avatar} />
                                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-sm">{friend.name}</p>
                                        <p className="text-xs text-muted-foreground">Level {friend.level}</p>
                                    </div>
                                    <Button variant="ghost" size="icon"><MessageSquare className="h-4 w-4" /></Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-base">Friend Requests</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {friendRequests.map((request, index) => (
                                <div key={index} className="flex items-center gap-3">
                                     <Avatar className="h-10 w-10">
                                        <AvatarImage src={request.avatar} />
                                        <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                       <p className="text-sm font-medium">{request.name}</p>
                                       <p className="text-xs text-muted-foreground">Wants to be your friend</p>
                                    </div>
                                    <div className="flex gap-1 ml-auto">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-500"><Check className="h-4 w-4" /></Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive"><X className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                     <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-base">Suggested Friends</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {suggestedFriends.map((friend, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={friend.avatar} />
                                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-sm">{friend.name}</p>
                                        <p className="text-xs text-muted-foreground">Level {friend.level}</p>
                                    </div>
                                    <Button variant="outline" size="sm"><UserPlus className="h-4 w-4 mr-1"/> Add</Button>
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
                            <span className="mx-4">Aria is now friends with Kael! 🎉</span>
                            <span className="mx-4">Zane has logged in.</span>
                            <span className="mx-4">Lyra sent you a gift! 🎁</span>
                            <span className="mx-4">It's Echo's birthday today! 🎂</span>
                        </div>
                        <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                            <span className="mx-4">Aria is now friends with Kael! 🎉</span>
                            <span className="mx-4">Zane has logged in.</span>
                            <span className="mx-4">Lyra sent you a gift! 🎁</span>
                            <span className="mx-4">It's Echo's birthday today! 🎂</span>
                        </div>
                    </div>
                     <style jsx>{`
                        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
                        @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
                        .animate-marquee { animation: marquee 30s linear infinite; }
                        .animate-marquee2 { animation: marquee2 30s linear infinite; }
                    `}</style>
                    
                    {/* Content Tabs */}
                    <Tabs defaultValue="friends" className="w-full">
                        <TabsList className="h-auto flex-wrap justify-center">
                            <TabsTrigger value="video" asChild><Link href="/socialive"><Video className="h-4 w-4 mr-1 sm:hidden" />Social Video</Link></TabsTrigger>
                            <TabsTrigger value="live" asChild><Link href="/socialive/live"><Clapperboard className="h-4 w-4 mr-1 sm:hidden"/>Live</Link></TabsTrigger>
                            <TabsTrigger value="friends" asChild>
                                <Link href="/socialive/friends"><UserPlus className="h-4 w-4 mr-1 sm:hidden"/>Friends</Link>
                            </TabsTrigger>
                            <TabsTrigger value="followers" asChild>
                                <Link href="/socialive/followers"><Rss className="h-4 w-4 mr-1 sm:hidden"/>Followers</Link>
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="friends" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Friends Hub</CardTitle>
                                    <CardDescription>Your connections in the MESY Universe.</CardDescription>
                                    <div className="relative pt-2">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input placeholder="Search friends..." className="pl-10" />
                                    </div>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {allFriends.map((friend, index) => (
                                        <Card key={index} className="overflow-hidden text-center group relative">
                                            <div className="relative">
                                            <Image src={friend.avatar || ''} alt={friend.name} width={200} height={200} className="aspect-square w-full object-cover"/>
                                            {friend.online && <span className="absolute top-2 right-2 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" title="Online"></span>}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                            <p className="absolute bottom-2 left-2 text-white font-bold text-lg">{friend.name}</p>
                                            </div>
                                            <div className="p-3 bg-card-foreground/5">
                                                <p className="text-xs text-muted-foreground">Level {friend.level}</p>
                                                <div className="flex gap-2 mt-2">
                                                    <Button variant="outline" size="sm" className="flex-1">Profile</Button>
                                                    <Button variant="secondary" size="sm" className="flex-1"><Gift className="h-4 w-4 mr-1"/> Gift</Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </CardContent>
                            </Card>
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
                            <CardTitle>Sponsored Ads</CardTitle>
                            <CardDescription>Promotions from across the universe.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex items-center gap-4 p-3 rounded-lg bg-card-foreground/5">
                                {adImage && <Image src={adImage.imageUrl} alt={adImage.description} data-ai-hint={adImage.imageHint} width={50} height={50} className="rounded-md"/>}
                                <div className="flex-grow">
                                    <p className="font-semibold text-sm">Genesis Gem</p>
                                    <p className="text-xs text-muted-foreground">Claim your exclusive gem now!</p>
                                </div>
                                <Button variant="secondary" size="sm">Claim</Button>
                           </div>
                           <div className="flex items-center gap-4 p-3 rounded-lg bg-card-foreground/5">
                                <Avatar className="h-12 w-12 rounded-md">
                                    <AvatarImage src={PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl}/>
                                    <AvatarFallback>DG</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <p className="font-semibold text-sm">Dragon Knights Guild</p>
                                    <p className="text-xs text-muted-foreground">Now recruiting brave adventurers!</p>
                                </div>
                                <Button variant="secondary" size="sm">Join</Button>
                           </div>
                        </CardContent>
                    </Card>
                </aside>

            </div>
        </div>
    );
}
