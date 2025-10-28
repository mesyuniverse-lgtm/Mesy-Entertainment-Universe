
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Music, Video, Mic, Tv, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ArtistsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center gap-4 mb-4">
            <Music className="w-10 h-10 text-primary" />
            <Video className="w-10 h-10 text-primary" />
            <Mic className="w-10 h-10 text-primary" />
            <Tv className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Artists & Music Hub</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Discover new artists, listen to their music, and watch exclusive content.
        </p>
      </div>
      
       <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 text-sm mb-8">
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

       <Card className="mb-8">
            <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <div className="relative w-full sm:max-w-lg">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search for artists, songs, or albums..." className="pl-10 h-12 text-lg" />
                    </div>
                    <Button size="lg" className="h-12 text-lg">Search</Button>
                </div>
            </CardContent>
        </Card>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This section is under construction. Stay tuned for a full-featured music and artist discovery platform!</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-b-lg">
          <p className="text-muted-foreground">Artist profiles, music players, and video showcases will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
