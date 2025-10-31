
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Briefcase, Camera, Check, Clock, Coins, Edit, FileText, Filter, MapPin, Search, Star, MessageSquare, Sparkles, Clapperboard, Users, Music, Video, Mic } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const availableGigs = [
    {
        title: 'Acoustic Night at The Dragon\'s Flagon',
        client: 'The Dragon\'s Flagon Inn',
        avatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl,
        budget: '2,000 MC + Food',
        location: 'Pattaya',
        type: 'Live Music',
        isNew: true,
    },
    {
        title: 'Lead Vocalist for Charity Stream',
        client: 'Gamers for Good',
        avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl,
        budget: '5,000 MC',
        location: 'Remote/Online',
        type: 'Streaming',
        isNew: false,
    },
     {
        title: 'Resort Lobby Pianist',
        client: 'Siam Bayshore Resort',
        avatar: PlaceHolderImages.find(i => i.id === 'fantasy-landscape-2')?.imageUrl,
        budget: '3,500 MC / Night',
        location: 'Pattaya',
        type: 'Background Music',
        isNew: false,
    }
];

const selectedGig = availableGigs[0];

const artistProfile = {
    name: 'Sonya G.',
    avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl,
    tagline: 'Versatile vocalist & guitarist for any occasion.',
    rating: 4.9,
    reviews: 88,
    baseRate: '1,500 MC / hour',
    location: 'Pattaya, Chonburi',
    videoUrl: 'https://cdn.pixabay.com/video/2023/07/29/173359-849539322_large.mp4',
};

const workingStatus = {
    notApplied: { text: "Apply Now", buttonVariant: "default" as "default", icon: <FileText className="mr-2 h-4 w-4"/> },
    pending: { text: "Check-in at Venue", buttonVariant: "secondary" as "secondary", icon: <Camera className="mr-2 h-4 w-4"/> },
    working: { text: "Mark as Completed", buttonVariant: "default" as "default", icon: <Check className="mr-2 h-4 w-4"/> },
}

const currentWorkStatus = workingStatus.pending;


export default function FindGigsPage() {
    
    return (
    <div className="min-h-screen bg-background/90 text-foreground p-4 lg:p-6">
        <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 text-sm mb-6">
            <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                <span className="mx-4">The Dragon's Flagon Inn is looking for an acoustic performer! 🎸</span>
                <span className="mx-4">New remote streaming opportunity available with Gamers for Good. 🎮</span>
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                <span className="mx-4">The Dragon's Flagon Inn is looking for an acoustic performer! 🎸</span>
                <span className="mx-4">New remote streaming opportunity available with Gamers for Good. 🎮</span>
            </div>
        </div>
        <style jsx>{`
            @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
            @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
            .animate-marquee { animation: marquee 30s linear infinite; }
            .animate-marquee2 { animation: marquee2 30s linear infinite; }
        `}</style>
       
        <Tabs defaultValue="talent-hub" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto">
                <TabsTrigger value="showcase" asChild><Link href="/entertainment/showcase"><Sparkles className="h-4 w-4 mr-1"/>Showcase</Link></TabsTrigger>
                <TabsTrigger value="live" asChild><Link href="/entertainment/artists/live-performance"><Mic className="h-4 w-4 mr-1"/>Live performance</Link></TabsTrigger>
                <TabsTrigger value="artists" asChild><Link href="/entertainment/artists"><Users className="h-4 w-4 mr-1"/> Artists</Link></TabsTrigger>
                <TabsTrigger value="songs" asChild><Link href="/entertainment/songs"><Music className="h-4 w-4 mr-1"/> Songs</Link></TabsTrigger>
                <TabsTrigger value="videos"><Video className="h-4 w-4 mr-1"/> Videos</TabsTrigger>
                <TabsTrigger value="talent-hub" asChild><Link href="/entertainment/artists/talent-hub"><Star className="h-4 w-4 mr-1"/> Talent Hub</Link></TabsTrigger>
            </TabsList>
            <TabsContent value="talent-hub" className="mt-6">
                <div className="container mx-auto px-0">
                    <header className="text-center mb-12">
                        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                            <Briefcase className="w-12 h-12 text-primary"/>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Find Gigs</h1>
                        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                            Discover paid opportunities from across the MESY Universe. Your next stage awaits.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Left: Job Listings */}
                        <aside className="lg:col-span-4 space-y-4">
                            <div className="flex gap-2">
                                <div className="relative flex-grow">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input placeholder="Search gigs..." className="pl-10" />
                                </div>
                                <Button variant="outline" size="icon"><Filter /></Button>
                            </div>
                            {availableGigs.map((gig, index) => (
                                <Card key={index} className="bg-card/50 hover:bg-card/80 transition-colors cursor-pointer border-2 border-transparent hover:border-primary/50">
                                    <CardContent className="p-4 flex gap-4">
                                        <Avatar className="h-12 w-12 hidden sm:block">
                                            <AvatarImage src={gig.avatar} />
                                            <AvatarFallback>{gig.client.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-grow">
                                            {gig.isNew && <Badge className="mb-1">New</Badge>}
                                            <p className="font-bold">{gig.title}</p>
                                            <p className="text-sm text-muted-foreground">{gig.client}</p>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                                                <span className="flex items-center gap-1"><MapPin className="h-3 w-3"/>{gig.location}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </aside>

                        {/* Center: Gig Details */}
                        <main className="lg:col-span-5">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl">{selectedGig.title}</CardTitle>
                                    <CardDescription className="flex items-center gap-2 mt-1">
                                        By {selectedGig.client}
                                    </CardDescription>
                                </CardHeader>
                                <Separator />
                                <CardContent className="p-6 space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-lg">Details</h3>
                                        <p className="text-muted-foreground">Seeking a talented solo musician for a 3-hour acoustic set. We're looking for a mix of popular covers and fantasy-themed instrumentals to create a magical atmosphere for our guests.</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary"/> <div><p className="text-xs text-muted-foreground">Location</p><p className="font-semibold">{selectedGig.location}</p></div></div>
                                        <div className="flex items-center gap-2"><Coins className="h-4 w-4 text-primary"/> <div><p className="text-xs text-muted-foreground">Budget</p><p className="font-semibold">{selectedGig.budget}</p></div></div>
                                    </div>
                                    
                                    <Alert>
                                        <Briefcase className="h-4 w-4"/>
                                        <AlertTitle>Your Next Step</AlertTitle>
                                        <AlertDescription>Apply now with your MESY Artist Profile. The client will review your videos and rates before making a decision.</AlertDescription>
                                    </Alert>
                                </CardContent>
                                <Separator />
                                <CardContent className="p-6">
                                    <Button size="lg" className="w-full">
                                        <FileText className="mr-2 h-4 w-4"/> Apply with Your Profile
                                    </Button>
                                </CardContent>
                            </Card>
                        </main>

                        {/* Right: Artist Profile & Status */}
                        <aside className="lg:col-span-3 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center">
                                        <span>Artist Profile</span>
                                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                                    </CardTitle>
                                    <CardDescription>This is how clients see you.</CardDescription>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-primary">
                                        <AvatarImage src={artistProfile.avatar} />
                                        <AvatarFallback>S</AvatarFallback>
                                    </Avatar>
                                    <h3 className="text-xl font-bold">{artistProfile.name}</h3>
                                    <p className="text-sm text-muted-foreground">{artistProfile.tagline}</p>
                                    <div className="flex justify-center items-center gap-2 mt-2">
                                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400"/>
                                        <span className="font-bold">{artistProfile.rating}</span>
                                        <span className="text-sm text-muted-foreground">({artistProfile.reviews} reviews)</span>
                                    </div>
                                </CardContent>
                                <Separator/>
                                <CardContent className="p-4 space-y-2">
                                    <Button variant="outline" className="w-full justify-between"><span>Base Rate</span><span className="font-semibold">{artistProfile.baseRate}</span></Button>
                                    <Button variant="outline" className="w-full justify-between"><span>Location</span><span className="font-semibold">{artistProfile.location}</span></Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Current Job Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Alert variant="default" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-200">
                                        <Clock className="h-4 w-4"/>
                                        <AlertTitle>You've been hired!</AlertTitle>
                                        <AlertDescription>You are scheduled to perform at The Dragon's Flagon. Please check in upon arrival.</AlertDescription>
                                    </Alert>
                                    <Button size="lg" className="w-full mt-4" variant={currentWorkStatus.buttonVariant}>
                                        {currentWorkStatus.icon} {currentWorkStatus.text}
                                    </Button>
                                    <div className="flex gap-2 mt-2">
                                        <Button variant="secondary" className="flex-1"><MessageSquare className="mr-2 h-4 w-4"/> Contact Client</Button>
                                        <Button variant="destructive" className="flex-1">Cancel Job</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </aside>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    </div>
    );
}
