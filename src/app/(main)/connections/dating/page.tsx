

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart, Users, Sparkles, UserCheck, Video, PlayCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const aiRecommendations = [
     { name: 'Seraphina', age: 26, avatar: 'https://picsum.photos/seed/seraphina/200', location: 'Ayutthaya', match: 92 },
     { name: 'Jax', age: 31, avatar: 'https://picsum.photos/seed/jax/200', location: 'Bangkok', match: 88 },
     { name: 'Kael', age: 28, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl, location: 'Bangkok', match: 85 },
     { name: 'Lyra', age: 27, avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl, location: 'Phuket', match: 82 },
];


export default function ConnectionsDatingPage() {
  const pathname = usePathname();
  const videoAdImage = PlaceHolderImages.find(i => i.id === 'fantasy-landscape-2');


  // Determine the active tab based on the current path
  const getActiveTab = () => {
    if (pathname.startsWith('/connections/dating/new-beginnings')) {
      return 'new-beginnings';
    }
    if (pathname.startsWith('/connections/dating/for-singles/create-profile')) {
      return 'conditions';
    }
    if (pathname.startsWith('/connections/dating/for-singles')) {
      return 'singles';
    }
    return 'singles'; // Default tab
  };

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center gap-4 mb-4">
            <Heart className="w-10 h-10 text-primary" />
            <Users className="w-10 h-10 text-primary" />
            <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Dating Zone</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Discover meaningful connections and build relationships within the MESY Universe. Your next adventure could be a shared one.
        </p>
      </div>

      <Tabs defaultValue={getActiveTab()} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="singles" asChild>
                <Link href="/connections/dating/for-singles">For Singles (คนโสด)</Link>
            </TabsTrigger>
            <TabsTrigger value="new-beginnings" asChild>
                <Link href="/connections/dating/new-beginnings">New Beginnings (พ่อหม้าย/แม่หม้าย)</Link>
            </TabsTrigger>
             <TabsTrigger value="conditions" asChild>
                <Link href="/connections/dating/for-singles/create-profile">My Profile / Conditions (โปรไฟล์/เงื่อนไข)</Link>
            </TabsTrigger>
        </TabsList>
        {/* Content for these tabs is now handled by their respective pages */}
      </Tabs>
      
      <div className="mt-12 space-y-12">
        {/* Featured Video Section */}
        <Card className="overflow-hidden shadow-2xl shadow-primary/10">
            <div className="relative aspect-video">
                 {videoAdImage && (
                    <Image 
                        src={videoAdImage.imageUrl} 
                        alt="Featured Video" 
                        data-ai-hint={videoAdImage.imageHint}
                        fill
                        objectFit="cover"
                        className="transition-transform duration-500 hover:scale-105"
                    />
                 )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                     <Button variant="ghost" size="icon" className="h-20 w-20 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm mb-4">
                        <PlayCircle className="h-12 w-12 text-white"/>
                    </Button>
                    <h2 className="text-3xl md:text-4xl font-bold" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>Find Your Soulmate</h2>
                    <p className="max-w-xl mx-auto mt-2" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}>Watch our guide on how to make meaningful connections in the MESY Universe.</p>
                </div>
            </div>
        </Card>

        {/* AI Recommendations Section */}
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Sparkles className="text-primary"/>
                    Just For You
                </h2>
                <Button variant="link">See More</Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {aiRecommendations.map((person, index) => (
                    <Card key={index} className="overflow-hidden group text-center border-border/50 hover:border-primary/50 hover:shadow-lg transition-all">
                        <div className="relative aspect-[3/4]">
                            <Image src={person.avatar || ''} alt={person.name} fill objectFit="cover" className="group-hover:scale-105 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                             <div className="absolute top-2 right-2">
                                <Badge>{person.match}% Match</Badge>
                            </div>
                            <div className="absolute bottom-0 p-3 text-white w-full">
                                <h3 className="text-lg font-bold truncate">{person.name}, {person.age}</h3>
                                <p className="text-xs truncate">{person.location}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
