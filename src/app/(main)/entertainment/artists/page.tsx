'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Music, Video, Mic, Tv, Search, Users, Star, Clapperboard, BadgeInfo, PlayCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

const popularArtists = [
    { name: 'Aria', rating: 4.9, followers: '1.2M', avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
    { name: 'Kael', rating: 4.8, followers: '980K', avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
    { name: 'Zane', rating: 4.7, followers: '750K', avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl },
];

const recommendedArtists = [
    { name: 'Lyra', avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl },
    { name: 'Draconis', avatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl },
]

const recommendedVideos = [
    { title: 'Celestial Echoes - Aria', image: PlaceHolderImages.find(i => i.id === 'socialive-preview')?.imageUrl },
    { title: 'Knightfall - Kael', image: PlaceHolderImages.find(i => i.id === 'entertainment-preview')?.imageUrl },
]

export default function ArtistsPage() {
    const videoAdImage = PlaceHolderImages.find(i => i.id === 'fantasy-landscape-2');
    const adImage = PlaceHolderImages.find(i => i.id === 'glowing-gem-1');
    const talentHubImage = PlaceHolderImages.find(i => i.id === 'member-plan-video');

    return (
    <div className="min-h-screen bg-background/90 text-foreground p-4 lg:p-6" style={{background: 'radial-gradient(ellipse at bottom, hsl(var(--primary)/0.05), hsl(var(--background)) 70%)'}}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 hidden lg:block space-y-6">
            <Card className="bg-card/50">
                <CardHeader className="flex-row items-center gap-3 space-y-0">
                    <Users className="h-6 w-6 text-primary" />
                    <CardTitle>Users Online</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">12,503</p>
                    <p className="text-sm text-muted-foreground">Currently exploring</p>
                </CardContent>
            </Card>

            <Card className="bg-card/50">
                <CardHeader className="flex-row items-center gap-3 space-y-0">
                    <Mic className="h-6 w-6 text-red-500" />
                    <CardTitle>Artists Live</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">87</p>
                    <p className="text-sm text-muted-foreground">Streaming right now</p>
                </CardContent>
            </Card>

            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle>Popular Artists</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                {popularArtists.map((artist, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <span className="font-bold text-lg w-4">{index + 1}</span>
                        <Avatar className="h-12 w-12"><AvatarImage src={artist.avatar} /><AvatarFallback>{artist.name.charAt(0)}</AvatarFallback></Avatar>
                        <div className="flex-grow">
                            <p className="font-bold">{artist.name}</p>
                             <div className="flex items-center text-xs text-muted-foreground gap-2">
                                <span className="flex items-center gap-1 text-amber-400"><Star className="h-3 w-3 fill-current"/>{artist.rating}</span>
                                <span>{artist.followers} fans</span>
                            </div>
                        </div>
                    </div>
                ))}
                </CardContent>
            </Card>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-6 space-y-6">
            <div className="text-center">
                <div className="flex justify-center gap-4 mb-4">
                    <Music className="w-10 h-10 text-primary" />
                    <Video className="w-10 h-10 text-primary" />
                    <Mic className="w-10 h-10 text-primary" />
                    <Tv className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Artists &amp; Music Hub</h1>
                <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                Discover new artists, listen to their music, and watch exclusive content.
                </p>
            </div>

            <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 text-sm">
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
            
            <Tabs defaultValue="artists" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="artists"><Users className="h-4 w-4 mr-1"/> Artists</TabsTrigger>
                    <TabsTrigger value="songs"><Music className="h-4 w-4 mr-1"/> Songs</TabsTrigger>
                    <TabsTrigger value="music-videos"><Video className="h-4 w-4 mr-1"/> Videos</TabsTrigger>
                    <TabsTrigger value="live"><Clapperboard className="h-4 w-4 mr-1"/> Live</TabsTrigger>
                    <TabsTrigger value="talent-hub" asChild><Link href="/entertainment/artists/find-talent"><Star className="h-4 w-4 mr-1"/> Talent Hub</Link></TabsTrigger>
                </TabsList>
                <TabsContent value="artists" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Discover Artists</CardTitle>
                            <CardDescription>Browse featured and rising artists in the MESY Universe.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-b-lg">
                            <p className="text-muted-foreground">Artist discovery section coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>

        {/* Right Sidebar */}
        <aside className="lg:col-span-3 hidden lg:block space-y-6">
            <Card className="bg-card/50 border-primary/50 shadow-lg shadow-primary/10">
                <CardHeader className="p-0">
                    {videoAdImage && (
                    <div className="relative aspect-video"><Image src={videoAdImage.imageUrl} alt={videoAdImage.description} data-ai-hint={videoAdImage.imageHint} fill className="object-cover rounded-t-lg"/><div className="absolute inset-0 bg-black/50 flex items-center justify-center"><Button variant="ghost" size="icon" className="h-16 w-16 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm"><Video className="h-8 w-8 text-white"/></Button></div></div>
                    )}
                </CardHeader>
                <CardContent className="p-4"><CardTitle className="text-base">Featured Promotion</CardTitle><p className="text-muted-foreground text-xs mt-1">Join the MESY Music Festival - Live next week!</p></CardContent>
            </Card>
            <Card className="bg-card/50">
                <CardHeader><CardTitle>Recommended Artists</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {recommendedArtists.map((artist, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <Avatar className="h-10 w-10"><AvatarImage src={artist.avatar}/></Avatar>
                            <p className="font-semibold text-sm">{artist.name}</p>
                            <Button variant="outline" size="sm" className="ml-auto">Follow</Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card className="bg-card/50">
                <CardHeader><CardTitle>Recommended Videos</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                   {recommendedVideos.map((video, index) => (
                       <div key={index} className="flex items-center gap-3 group cursor-pointer">
                           <div className="relative w-24 h-14 rounded-md overflow-hidden shrink-0">
                               <Image src={video.image || ''} alt={video.title} layout="fill" objectFit="cover" />
                               <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                   <PlayCircle className="h-6 w-6 text-white"/>
                               </div>
                           </div>
                           <p className="font-semibold text-sm leading-tight">{video.title}</p>
                       </div>
                   ))}
                </CardContent>
            </Card>
        </aside>

        </div>
    </div>
    );
}
