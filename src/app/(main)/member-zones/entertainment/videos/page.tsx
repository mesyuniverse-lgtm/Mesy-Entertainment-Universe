
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Music, Mic, Users, Star, Video, Sparkles, ListMusic, PlayCircle, Plus, Film, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const topVideos = [
    { title: 'Celestial Echoes - Official MV', artist: 'Aria', views: '5.2M', duration: '3:48', image: PlaceHolderImages.find(i => i.id === 'socialive-preview')?.imageUrl },
    { title: 'Knightfall - Epic Version', artist: 'Kael', views: '4.1M', duration: '4:20', image: PlaceHolderImages.find(i => i.id === 'entertainment-preview')?.imageUrl },
    { title: 'Wanderer\'s Lullaby - Live Acoustic', artist: 'Lyra', views: '3.8M', duration: '3:25', image: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl },
];

const genres = ['Pop', 'Rock', 'Jazz', 'Latin', 'R&B', 'Hip-Hop', 'Soul', 'Blues', 'Reggae', 'EDM', 'Folk'];
const featuredPlaylists = [
    { name: '90\'s Throwbacks', image: PlaceHolderImages.find(i => i.id === 'fantasy-landscape-4')?.imageUrl },
    { name: 'All-Time Rock Anthems', image: PlaceHolderImages.find(i => i.id === 'fantasy-landscape-1')?.imageUrl },
    { name: 'Modern Pop Hits', image: PlaceHolderImages.find(i => i.id === 'fantasy-landscape-3')?.imageUrl },
]


export default function VideosPage() {
    
    return (
    <div className="min-h-screen bg-background/90 text-foreground p-4 lg:p-6">
        <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 text-sm mb-6">
            <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                <span className="mx-4">Premiere: Aria's "Celestial Echoes" music video is now live! ✨</span>
                <span className="mx-4">Behind the scenes footage from Kael's latest shoot now available for members. 🎬</span>
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                 <span className="mx-4">Premiere: Aria's "Celestial Echoes" music video is now live! ✨</span>
                <span className="mx-4">Behind the scenes footage from Kael's latest shoot now available for members. 🎬</span>
            </div>
        </div>
        <style jsx>{`
            @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
            @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
            .animate-marquee { animation: marquee 30s linear infinite; }
            .animate-marquee2 { animation: marquee2 30s linear infinite; }
        `}</style>
       
        <Tabs defaultValue="videos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto">
                <TabsTrigger value="showcase" asChild><Link href="/entertainment/showcase"><Sparkles className="h-4 w-4 mr-1"/>Showcase</Link></TabsTrigger>
                <TabsTrigger value="live" asChild><Link href="/entertainment/artists/live-performance"><Mic className="h-4 w-4 mr-1"/>Live performance</Link></TabsTrigger>
                <TabsTrigger value="artists" asChild><Link href="/entertainment/artists"><Users className="h-4 w-4 mr-1"/> Artists</Link></TabsTrigger>
                <TabsTrigger value="songs" asChild><Link href="/entertainment/songs"><Music className="h-4 w-4 mr-1"/> Songs</Link></TabsTrigger>
                <TabsTrigger value="videos" asChild><Link href="/entertainment/videos"><Video className="h-4 w-4 mr-1"/> Videos</Link></TabsTrigger>
                <TabsTrigger value="talent-hub" asChild><Link href="/entertainment/artists/talent-hub"><Star className="h-4 w-4 mr-1"/> Talent Hub</Link></TabsTrigger>
            </TabsList>
            <TabsContent value="videos" className="mt-6">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <main className="lg:col-span-8 space-y-8">
                         <Card className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="relative aspect-video">
                                    <Image src={topVideos[0].image || ''} alt="Featured Video" layout="fill" objectFit="cover" />
                                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                                        <Badge>Featured Video</Badge>
                                        <h2 className="text-3xl font-bold text-white mt-2">{topVideos[0].title}</h2>
                                        <p className="text-white/80">{topVideos[0].artist}</p>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Button variant="ghost" size="icon" className="h-20 w-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full">
                                            <PlayCircle className="h-12 w-12 text-white" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Top Music Videos</CardTitle>
                                <CardDescription>Most watched videos this week.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                {topVideos.map((video, index) => (
                                    <div key={index} className="flex items-center gap-4 p-2 rounded-lg hover:bg-secondary/50">
                                        <span className="text-muted-foreground font-bold w-6 text-center">{index+1}</span>
                                        <div className="relative w-24 h-14 rounded-md overflow-hidden shrink-0">
                                           <Image src={video.image || ''} alt={video.title} layout="fill" objectFit="cover" />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-semibold">{video.title}</p>
                                            <p className="text-sm text-muted-foreground">{video.artist}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground hidden md:block">{video.views} views</p>
                                        <Button variant="ghost" size="icon"><PlayCircle/></Button>
                                    </div>
                                ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Featured Playlists</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {featuredPlaylists.map((playlist, index) => (
                                    <Card key={index} className="overflow-hidden group relative">
                                        <div className="relative aspect-video">
                                            <Image src={playlist.image || ''} alt={playlist.name} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform" />
                                             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                        </div>
                                        <div className="absolute bottom-0 p-3 text-white">
                                            <h3 className="font-bold">{playlist.name}</h3>
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
                                <CardTitle>Upload Your Video</CardTitle>
                                <CardDescription>Share your music videos with the universe.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full"><Plus className="mr-2 h-4 w-4"/> Upload Video</Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Browse by Genre</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                               {genres.map((genre) => (
                                   <Button key={genre} variant="secondary" size="sm">{genre}</Button>
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
