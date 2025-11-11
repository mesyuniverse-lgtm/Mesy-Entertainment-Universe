
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Music, Mic, Users, Star, Video, Sparkles, ListMusic, PlayCircle, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const topSongs = [
    { title: 'Celestial Echoes', artist: 'Aria', plays: '2.1M', duration: '3:45', image: PlaceHolderImages.find(i => i.id === 'socialive-preview')?.imageUrl },
    { title: 'Knightfall', artist: 'Kael', plays: '1.8M', duration: '4:15', image: PlaceHolderImages.find(i => i.id === 'entertainment-preview')?.imageUrl },
    { title: 'Wanderer\'s Lullaby', artist: 'Lyra', plays: '1.5M', duration: '3:20', image: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl },
    { title: 'Dragon\'s Breath', artist: 'Draconis', plays: '1.2M', duration: '5:02', image: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl },
];

const newReleases = [
    { title: 'Shadowfire', artist: 'Zane', image: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl },
    { title: 'Crystal Cave', artist: 'Echo', image: PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl },
    { title: 'The Old Forest', artist: 'Valerius', image: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
];

const topPlaylists = [
    { name: 'Epic Fantasy Battles', creator: 'MESY Official', image: PlaceHolderImages.find(i => i.id === 'fantasy-landscape-1')?.imageUrl },
    { name: 'Tavern Folk & Ballads', creator: 'BardicCollege', image: PlaceHolderImages.find(i => i.id === 'fantasy-landscape-2')?.imageUrl },
    { name: 'Celestial Ambience', creator: 'Aria', image: PlaceHolderImages.find(i => i.id === 'fantasy-landscape-3')?.imageUrl },
]


export default function SongsPage() {
    
    return (
    <div className="min-h-screen bg-background/90 text-foreground p-4 lg:p-6">
        <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 text-sm mb-6">
            <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                <span className="mx-4">New Album "Celestial" by Aria just dropped! 🎵</span>
                <span className="mx-4">Kael is hosting a live concert this Friday! 🎤</span>
                <span className="mx-4">Top 10 MESY Chart updated. See who's number one! 🏆</span>
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                 <span className="mx-4">New Album "Celestial" by Aria just dropped! 🎵</span>
                <span className="mx-4">Kael is hosting a live concert this Friday! 🎤</span>
                <span className="mx-4">Top 10 MESY Chart updated. See who's number one! 🏆</span>
            </div>
        </div>
        <style jsx>{`
            @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
            @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
            .animate-marquee { animation: marquee 30s linear infinite; }
            .animate-marquee2 { animation: marquee2 30s linear infinite; }
        `}</style>
       
        <Tabs defaultValue="songs" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto">
                <TabsTrigger value="showcase" asChild><Link href="/entertainment/showcase"><Sparkles className="h-4 w-4 mr-1"/>Showcase</Link></TabsTrigger>
                <TabsTrigger value="live" asChild><Link href="/entertainment/artists/live-performance"><Mic className="h-4 w-4 mr-1"/>Live performance</Link></TabsTrigger>
                <TabsTrigger value="artists" asChild><Link href="/entertainment/artists"><Users className="h-4 w-4 mr-1"/> Artists</Link></TabsTrigger>
                <TabsTrigger value="songs" asChild><Link href="/entertainment/songs"><Music className="h-4 w-4 mr-1"/> Songs</Link></TabsTrigger>
                <TabsTrigger value="videos" asChild><Link href="/entertainment/videos"><Video className="h-4 w-4 mr-1"/> Videos</Link></TabsTrigger>
                <TabsTrigger value="talent-hub" asChild><Link href="/entertainment/artists/talent-hub"><Star className="h-4 w-4 mr-1"/> Talent Hub</Link></TabsTrigger>
            </TabsList>
            <TabsContent value="songs" className="mt-6">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <main className="lg:col-span-8 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Top Chart</CardTitle>
                                <CardDescription>The most played songs in the MESY Universe this week.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                {topSongs.map((song, index) => (
                                    <div key={index} className="flex items-center gap-4 p-2 rounded-lg hover:bg-secondary/50">
                                        <span className="text-muted-foreground font-bold w-6 text-center">{index+1}</span>
                                        <div className="relative w-12 h-12 rounded-md overflow-hidden">
                                           <Image src={song.image || ''} alt={song.title} layout="fill" objectFit="cover" />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-semibold">{song.title}</p>
                                            <p className="text-sm text-muted-foreground">{song.artist}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground hidden md:block">{song.plays} plays</p>
                                        <p className="text-sm text-muted-foreground">{song.duration}</p>
                                        <Button variant="ghost" size="icon"><PlayCircle/></Button>
                                    </div>
                                ))}
                                </div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Discover Playlists</CardTitle>
                                <CardDescription>Hand-picked collections for every mood and moment.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {topPlaylists.map((playlist, index) => (
                                    <Card key={index} className="overflow-hidden group relative">
                                        <div className="relative aspect-video">
                                            <Image src={playlist.image || ''} alt={playlist.name} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform" />
                                             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                        </div>
                                        <div className="absolute bottom-0 p-3 text-white">
                                            <h3 className="font-bold">{playlist.name}</h3>
                                            <p className="text-xs">by {playlist.creator}</p>
                                        </div>
                                    </Card>
                                ))}
                            </CardContent>
                        </Card>
                    </main>

                     {/* Right Sidebar */}
                    <aside className="lg:col-span-4 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Upload Your Music</CardTitle>
                                <CardDescription>Share your creations with the universe and start earning.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full"><Plus className="mr-2 h-4 w-4"/> Upload Song</Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>New Releases</CardTitle>
                                <CardDescription>The freshest tracks from your favorite artists.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               {newReleases.map((song, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="relative w-16 h-16 rounded-md overflow-hidden">
                                            <Image src={song.image || ''} alt={song.title} layout="fill" objectFit="cover" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{song.title}</p>
                                            <p className="text-sm text-muted-foreground">{song.artist}</p>
                                        </div>
                                        <Button variant="outline" size="icon" className="ml-auto"><PlayCircle/></Button>
                                    </div>
                               ))}
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </TabsContent>
        </Tabs>
    </div>
    );
}
