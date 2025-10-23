
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Search, Clapperboard, Video, UserPlus, Rss, UsersRound, CalendarClock, Crown, Gift, Users, UserCheck } from "lucide-react";
import Link from "next/link";


export default function FollowersPage() {
    const followers = [
        { name: 'Zane', level: 20, avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl, online: true, supportTier: 'Gold' },
        { name: 'Aria', level: 15, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl, online: false, supportTier: 'Silver' },
    ];
    const following = [
        { name: 'Kael', level: 12, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl, online: true },
        { name: 'Lyra', level: 10, avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl, online: false },
    ];
    const topSupporters = [
        { name: 'Zane', level: 20, avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl, amount: 500 },
        { name: 'Echo', level: 18, avatar: PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl, amount: 350 },
    ];

    const popularToFollow = [
        { name: 'Silas', level: 22, avatar: PlaceHolderImages.find(i => i.id === 'fighter-silhouette')?.imageUrl },
        { name: 'Nia', level: 19, avatar: PlaceHolderImages.find(i => i.id === 'default-avatar')?.imageUrl },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground p-4 lg:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                 {/* Left Sidebar */}
                <aside className="lg:col-span-3 space-y-6">
                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Rss />Followers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">{followers.length}</p>
                            <p className="text-sm text-muted-foreground">People following you</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><UserCheck />Following</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">{following.length}</p>
                            <p className="text-sm text-muted-foreground">People you follow</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2"><Crown className="text-yellow-400" />Top Supporters</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {topSupporters.map((supporter, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={supporter.avatar} />
                                        <AvatarFallback>{supporter.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-sm">{supporter.name}</p>
                                        <p className="text-xs text-primary flex items-center gap-1"><Gift className="h-3 w-3"/> Gave ${supporter.amount}</p>
                                    </div>
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
                            <span className="mx-4">Zane just followed you! 👋</span>
                            <span className="mx-4">Aria has logged in.</span>
                            <span className="mx-4">Lyra sent you a gift! 🎁</span>
                            <span className="mx-4">It's Kael's birthday today! 🎂</span>
                        </div>
                        <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                           <span className="mx-4">Zane just followed you! 👋</span>
                            <span className="mx-4">Aria has logged in.</span>
                            <span className="mx-4">Lyra sent you a gift! 🎁</span>
                            <span className="mx-4">It's Kael's birthday today! 🎂</span>
                        </div>
                    </div>
                     <style jsx>{`
                        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
                        @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
                        .animate-marquee { animation: marquee 30s linear infinite; }
                        .animate-marquee2 { animation: marquee2 30s linear infinite; }
                    `}</style>
                    
                    {/* Content Tabs */}
                    <Tabs defaultValue="followers" className="w-full">
                        <TabsList className="h-auto flex-wrap justify-center">
                            <TabsTrigger value="video" asChild><Link href="/socialive"><Video className="h-4 w-4 mr-1 sm:hidden" />Social Video</Link></TabsTrigger>
                            <TabsTrigger value="live" asChild><Link href="/socialive"><Clapperboard className="h-4 w-4 mr-1 sm:hidden"/>Live</Link></TabsTrigger>
                            <TabsTrigger value="friends" asChild>
                                <Link href="/friends"><UserPlus className="h-4 w-4 mr-1 sm:hidden"/>Friends</Link>
                            </TabsTrigger>
                            <TabsTrigger value="followers" asChild>
                                <Link href="/followers"><Rss className="h-4 w-4 mr-1 sm:hidden"/>Followers</Link>
                            </TabsTrigger>
                            <TabsTrigger value="groups" asChild>
                                <Link href="/groups"><UsersRound className="h-4 w-4 mr-1 sm:hidden"/>Groups</Link>
                            </TabsTrigger>
                            <TabsTrigger value="timeline"><CalendarClock className="h-4 w-4 mr-1 sm:hidden"/>Timeline</TabsTrigger>
                        </TabsList>

                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle>Follower & Following Hub</CardTitle>
                                <CardDescription>Manage your followers and the creators you follow.</CardDescription>
                                <div className="relative pt-2">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input placeholder="Search for users..." className="pl-10" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="followers">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="followers">Followers ({followers.length})</TabsTrigger>
                                        <TabsTrigger value="following">Following ({following.length})</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="followers" className="mt-6 space-y-4">
                                        {followers.length > 0 ? followers.map((follower, index) => (
                                            <div key={index} className="flex items-center gap-4 p-3 bg-card-foreground/5 rounded-lg">
                                                <Avatar className="h-14 w-14 border-2 border-primary/50">
                                                    <AvatarImage src={follower.avatar} />
                                                    <AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-grow">
                                                    <p className="font-bold text-lg">{follower.name}</p>
                                                    <p className="text-sm text-muted-foreground">Level {follower.level}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm">View Profile</Button>
                                                    <Button variant="secondary" size="sm">Remove</Button>
                                                </div>
                                            </div>
                                        )) : (
                                            <p className="text-center text-muted-foreground py-8">You have no followers yet.</p>
                                        )}
                                    </TabsContent>
                                    <TabsContent value="following" className="mt-6 space-y-4">
                                        {following.length > 0 ? following.map((person, index) => (
                                            <div key={index} className="flex items-center gap-4 p-3 bg-card-foreground/5 rounded-lg">
                                                <div className="relative">
                                                    <Avatar className="h-14 w-14">
                                                        <AvatarImage src={person.avatar} />
                                                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    {person.online && <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-500 ring-2 ring-background"></span>}
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-semibold text-lg">{person.name}</p>
                                                    <p className="text-sm text-muted-foreground">Level {person.level}</p>
                                                </div>
                                                <Button variant="secondary" size="sm">Unfollow</Button>
                                            </div>
                                        )) : (
                                            <p className="text-center text-muted-foreground py-8">You are not following anyone yet.</p>
                                        )}
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </Tabs>

                </main>

                {/* Right Sidebar */}
                <aside className="lg:col-span-3 space-y-6">
                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-base">Follow Requests</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground p-6">
                           <p className="text-sm">This feature is for private accounts. Currently all accounts are public.</p>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-base">Popular to Follow</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {popularToFollow.map((person, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={person.avatar} />
                                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-sm">{person.name}</p>
                                        <p className="text-xs text-muted-foreground">Level {person.level}</p>
                                    </div>
                                    <Button variant="outline" size="sm"><UserPlus className="h-4 w-4 mr-1"/> Follow</Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-base">People You May Know</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                             {/* Mock data for people you may know */}
                        </CardContent>
                    </Card>
                </aside>

            </div>
        </div>
    );
}
