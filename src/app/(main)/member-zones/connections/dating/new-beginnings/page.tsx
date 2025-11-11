
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Filter, Users, UserPlus, Sparkles, Video, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const newBeginningsProfiles = [
    { name: 'Valerius', age: 42, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl, location: 'Bangkok', online: true },
    { name: 'Seraphina', age: 38, avatar: 'https://picsum.photos/seed/seraphina/200', location: 'Chiang Mai', online: true },
    { name: 'Cassian', age: 45, avatar: 'https://picsum.photos/seed/cassian/200', location: 'Pattaya', online: false },
    { name: 'Isolde', age: 41, avatar: 'https://picsum.photos/seed/isolde/200', location: 'Phuket', online: true },
];

const newestMembers = [
    { name: 'Orion', avatar: 'https://picsum.photos/seed/orion/200', time: '1h ago' },
    { name: 'Lyra', avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl, time: '3h ago' },
];

const aiRecommendations = [
     { name: 'Helena', age: 39, avatar: 'https://picsum.photos/seed/helena/200', location: 'Ayutthaya', match: 91 },
     { name: 'Gideon', age: 44, avatar: 'https://picsum.photos/seed/gideon/200', location: 'Bangkok', match: 87 },
]


export default function NewBeginningsPage() {
    const videoAdImage = PlaceHolderImages.find(i => i.id === 'fantasy-landscape-2');
    const adImage = PlaceHolderImages.find(i => i.id === 'glowing-gem-1');
  
  return (
    <div className="container py-12">
        <div className="mb-8">
            <Button asChild variant="outline">
                <Link href="/connections/dating">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dating Zone
                </Link>
            </Button>
        </div>
        
        <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 text-sm mb-6">
            <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                <span className="mx-4">Valerius and Seraphina just connected! ❤️</span>
                <span className="mx-4">New member 'Orion' is looking for a fresh start. ✨</span>
                <span className="mx-4">It's never too late to find a companion for your next chapter.</span>
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                <span className="mx-4">Valerius and Seraphina just connected! ❤️</span>
                <span className="mx-4">New member 'Orion' is looking for a fresh start. ✨</span>
                <span className="mx-4">It's never too late to find a companion for your next chapter.</span>
            </div>
        </div>
         <style jsx>{`
            @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
            @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
            .animate-marquee { animation: marquee 30s linear infinite; }
            .animate-marquee2 { animation: marquee2 30s linear infinite; }
        `}</style>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left Sidebar */}
            <aside className="lg:col-span-3 space-y-6">
                <Card>
                    <CardHeader className="flex-row items-center gap-3">
                        <Users className="h-6 w-6 text-primary"/>
                        <CardTitle>Users Online</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">312</p>
                        <p className="text-sm text-muted-foreground">seeking a new beginning</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><UserPlus /> Find Your New Beginning</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Create your profile to start connecting with other understanding members.</p>
                        <Button className="w-full" asChild>
                            <Link href="/connections/dating/for-singles/create-profile">Create Profile</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Newest Members</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {newestMembers.map((member, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <Avatar><AvatarImage src={member.avatar} /><AvatarFallback>{member.name.charAt(0)}</AvatarFallback></Avatar>
                                <div>
                                    <p className="font-semibold text-sm">{member.name}</p>
                                    <p className="text-xs text-muted-foreground">{member.time}</p>
                                </div>
                                <Button variant="outline" size="sm" className="ml-auto">View</Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary"/> Just For You</CardTitle>
                        <CardDescription>AI Recommendations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {aiRecommendations.map((rec, index) => (
                             <div key={index} className="flex items-center gap-3">
                                <Avatar><AvatarImage src={rec.avatar} /><AvatarFallback>{rec.name.charAt(0)}</AvatarFallback></Avatar>
                                <div>
                                    <p className="font-semibold text-sm">{rec.name}, {rec.age}</p>
                                    <p className="text-xs text-muted-foreground">Match: {rec.match}%</p>
                                </div>
                                <Badge className="ml-auto">AI</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Discover New Beginnings</CardTitle>
                        <CardDescription>Find other members who are widowed or divorced and ready for a new chapter.</CardDescription>
                        <div className="flex gap-2 pt-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="Search by name, interest, or location..." className="pl-10" />
                            </div>
                            <Button variant="outline" size="icon"><Filter /></Button>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                         {newBeginningsProfiles.map((person, index) => (
                            <Card key={index} className="overflow-hidden group text-center">
                                <div className="relative aspect-[3/4]">
                                    <Image src={person.avatar || ''} alt={person.name} fill objectFit="cover" className="group-hover:scale-105 transition-transform" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-0 p-3 text-white w-full">
                                        <h3 className="text-lg font-bold truncate">{person.name}, {person.age}</h3>
                                        <p className="text-xs truncate">{person.location}</p>
                                    </div>
                                    {person.online && <Badge className="absolute top-2 right-2 bg-green-500 border-none">Online</Badge>}
                                </div>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
                 <div className="text-center mt-6">
                    <p className="text-muted-foreground">Inbox for communication will be displayed here for registered users.</p>
                </div>
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
                        <CardTitle className="text-lg">Become a Member</CardTitle>
                        <p className="text-muted-foreground text-sm mt-1">Unlock exclusive dating features and more!</p>
                        <Button className="w-full mt-3" asChild>
                            <Link href="/member-plan">Learn More</Link>
                        </Button>
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
                                <p className="font-semibold text-sm">Genesis Gem Dating</p>
                                <p className="text-xs text-muted-foreground">Find your soulmate in the stars!</p>
                            </div>
                            <Button variant="secondary" size="sm">Visit</Button>
                        </div>
                    </CardContent>
                </Card>
            </aside>
        </div>
    </div>
  );
}
