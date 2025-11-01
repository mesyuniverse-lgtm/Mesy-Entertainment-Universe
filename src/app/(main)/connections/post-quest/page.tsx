
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PlusCircle, Search, Star, HandCoins, Users, MapPin, BadgeCent, CheckCircle2, Clock, FileText, Send, XCircle, Sparkles, Briefcase, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";

const availableTalent = [
    { name: 'Kael', profession: 'Personal Chef', rating: 4.9, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
    { name: 'Aria', profession: 'Personal Assistant', rating: 4.8, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
    { name: 'Zane', profession: 'Bodyguard', rating: 5.0, avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl },
];

const postedQuests = [
    { title: 'Seeking Personal Chef for Private Event', applicants: 5, status: 'Open' },
    { title: 'Bodyguard for VIP Escort', applicants: 12, status: 'Open' },
    { title: 'Part-time Personal Assistant', applicants: 8, status: 'Closed' },
];

const topHirers = [
    { name: 'Celestial Events', rating: 5.0, avatar: PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl },
    { name: 'Lord Valerius', rating: 4.9, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
];


export default function PostQuestPage() {
    const videoAdImage = PlaceHolderImages.find(i => i.id === 'fantasy-landscape-2');
    const adImage = PlaceHolderImages.find(i => i.id === 'glowing-gem-1');
  
  return (
    <div className="container py-12">
        {/* Marquee Text */}
        <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 text-sm mb-6">
            <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                <span className="mx-4">Need talent? Post a quest and find the perfect match from thousands of skilled members! ✨</span>
                <span className="mx-4">Top-rated bodyguard 'Zane' is now available for hire.</span>
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                <span className="mx-4">Need talent? Post a quest and find the perfect match from thousands of skilled members! ✨</span>
                <span className="mx-4">Top-rated bodyguard 'Zane' is now available for hire.</span>
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
                        <CardTitle>Available Talent</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">3,456</p>
                        <p className="text-sm text-muted-foreground">skilled members ready for quests</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><PlusCircle /> Create New Quest</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Post a job to find personal assistants, bodyguards, chefs, and more.</p>
                        <Button className="w-full" asChild>
                            <Link href="/connections/post-quest/create-new-quest">Create Quest</Link>
                        </Button>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader><CardTitle>Your Posted Quests</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {postedQuests.map((quest, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div>
                                    <p className="font-semibold text-sm leading-tight">{quest.title}</p>
                                    <p className="text-xs text-muted-foreground">{quest.applicants} Applicants</p>
                                </div>
                                <Badge variant={quest.status === 'Open' ? 'default' : 'secondary'} className="ml-auto">{quest.status}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary"/> Just For You</CardTitle>
                        <CardDescription>AI Recommended Talent</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {availableTalent.slice(0, 2).map((rec, index) => (
                             <div key={index} className="flex items-center gap-3">
                                <Avatar><AvatarImage src={rec.avatar} /><AvatarFallback>{rec.name.charAt(0)}</AvatarFallback></Avatar>
                                <div>
                                    <p className="font-semibold text-sm">{rec.name}</p>
                                    <p className="text-xs text-muted-foreground">{rec.profession}</p>
                                </div>
                                <Button size="sm" variant="outline" className="ml-auto">View</Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Manage Quest: Seeking Personal Chef</CardTitle>
                        <CardDescription>Review applicants for your private event.</CardDescription>
                        <div className="flex gap-2 pt-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="Search applicants..." className="pl-10" />
                            </div>
                            <Button variant="outline" size="icon"><Filter /></Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert>
                            <Briefcase className="h-4 w-4" />
                            <AlertTitle>5 Applicants</AlertTitle>
                            <AlertDescription>Review profiles and portfolios to find the best fit for your quest.</AlertDescription>
                        </Alert>

                         {availableTalent.map((person, index) => (
                            <Card key={index} className="overflow-hidden group text-left flex flex-col sm:flex-row items-center gap-4 p-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={person.avatar || ''} />
                                    <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-bold">{person.name}</h3>
                                    <p className="text-sm text-primary font-semibold">{person.profession}</p>
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <Star className="h-4 w-4 fill-current"/>
                                        <span className="font-bold">{person.rating}</span>
                                        <span className="text-xs text-muted-foreground">(15 successful quests)</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 shrink-0">
                                    <Button>Hire Now</Button>
                                    <Button variant="secondary">Send Message</Button>
                                </div>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </main>

            {/* Right Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
                <Card className="bg-card/50 border-primary/50 shadow-lg shadow-primary/10">
                    <CardHeader className="p-0">
                        {videoAdImage && (
                        <div className="relative aspect-video">
                            <Image src={videoAdImage.imageUrl} alt={videoAdImage.description} data-ai-hint={videoAdImage.imageHint} fill className="object-cover rounded-t-lg"/>
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center"></div>
                        </div>
                        )}
                    </CardHeader>
                    <CardContent className="p-4">
                        <CardTitle className="text-lg">Find Professionals Instantly</CardTitle>
                        <p className="text-muted-foreground text-sm mt-1">Upgrade to a Member account for advanced filtering and priority support.</p>
                        <Button className="w-full mt-3" asChild>
                            <Link href="/member-plan">Learn More</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="bg-card/50">
                    <CardHeader>
                        <CardTitle>Popular Quests</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">Seeking bodyguard for event</p>
                        <p className="text-sm text-muted-foreground">Part-time chef for family</p>
                        <p className="text-sm text-muted-foreground">Personal assistant for shopping</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Rated Hirers</CardTitle>
                        <CardDescription>Trusted members of the community.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {topHirers.map((hirer, index) => (
                             <div key={index} className="flex items-center gap-3">
                                <Avatar><AvatarImage src={hirer.avatar} /><AvatarFallback>{hirer.name.charAt(0)}</AvatarFallback></Avatar>
                                <div className="flex-grow">
                                    <p className="font-semibold text-sm">{hirer.name}</p>
                                    <div className="flex items-center text-xs text-yellow-400"><Star className="h-4 w-4 fill-current mr-1"/>{hirer.rating}</div>
                                </div>
                               <Badge variant="outline">Verified Hirer</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

            </aside>
        </div>
    </div>
  );
}
