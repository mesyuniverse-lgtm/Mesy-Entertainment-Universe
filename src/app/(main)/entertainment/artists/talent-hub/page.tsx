
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Search, Star, Sparkles, Clapperboard, Users, Music, Video } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function TalentHubPage() {
    return (
        <div className="container py-12">
             <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 text-sm mb-6">
                <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                    <span className="mx-4">Need a project done? Hire top-tier talent from the MESY Freelance Market! 🧑‍💻</span>
                    <span className="mx-4">Top artist 'Elara' is now available for custom 3D model commissions. ✨</span>
                </div>
                <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                    <span className="mx-4">Need a project done? Hire top-tier talent from the MESY Freelance Market! 🧑‍💻</span>
                    <span className="mx-4">Top artist 'Elara' is now available for custom 3D model commissions. ✨</span>
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
                    <TabsTrigger value="live"><Clapperboard className="h-4 w-4 mr-1"/>Live</TabsTrigger>
                    <TabsTrigger value="artists" asChild><Link href="/entertainment/artists"><Users className="h-4 w-4 mr-1"/> Artists</Link></TabsTrigger>
                    <TabsTrigger value="songs"><Music className="h-4 w-4 mr-1"/> Songs</TabsTrigger>
                    <TabsTrigger value="videos"><Video className="h-4 w-4 mr-1"/> Videos</TabsTrigger>
                    <TabsTrigger value="talent-hub" asChild><Link href="/entertainment/artists/talent-hub"><Star className="h-4 w-4 mr-1"/> Talent Hub</Link></TabsTrigger>
                </TabsList>
                <TabsContent value="talent-hub" className="mt-6">
                    <header className="text-center mb-12">
                        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                            <Star className="w-12 h-12 text-primary"/>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Talent Hub</h1>
                        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                            The premier marketplace for artists and event organizers to connect and create opportunities.
                        </p>
                    </header>
                    <Tabs defaultValue="find-talent" className="w-full max-w-4xl mx-auto">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="find-talent" asChild>
                                <Link href="/entertainment/artists/find-talent">
                                    <Search className="mr-2 h-4 w-4"/> Find Talent
                                </Link>
                            </TabsTrigger>
                            <TabsTrigger value="find-gigs" asChild>
                                <Link href="/entertainment/artists/find-gigs">
                                    <Briefcase className="mr-2 h-4 w-4"/> Find Gigs
                                </Link>
                            </TabsTrigger>
                        </TabsList>
                         {/* The content for these tabs is handled by their respective pages */}
                    </Tabs>
                </TabsContent>
            </Tabs>
        </div>
    );
}
