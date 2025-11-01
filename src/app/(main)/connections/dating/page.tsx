'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart, Users, Sparkles, Search, Filter, UserCheck, KeyRound, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const singles = [
    { name: 'Kael', age: 28, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl, location: 'Bangkok' },
    { name: 'Aria', age: 25, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl, location: 'Chiang Mai' },
    { name: 'Zane', age: 30, avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl, location: 'Pattaya' },
];

const newBeginnings = [
    { name: 'Valerius', age: 42, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl, location: 'Phuket' },
    { name: 'Lyra', age: 38, avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl, location: 'Remote' },
];

export default function ConnectionsDatingPage() {
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

      <Tabs defaultValue="singles" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="singles" asChild>
                <Link href="/connections/dating/for-singles">For Singles (คนโสด)</Link>
            </TabsTrigger>
            <TabsTrigger value="new-beginnings">New Beginnings (พ่อหม้าย/แม่หม้าย)</TabsTrigger>
            <TabsTrigger value="conditions">My Profile / Conditions (โปรไฟล์/เงื่อนไข)</TabsTrigger>
        </TabsList>

        <TabsContent value="singles" className="mt-6">
            {/* Content for this tab is now handled by the /for-singles page */}
            <p className="text-center text-muted-foreground">Redirecting to the singles zone...</p>
        </TabsContent>

        <TabsContent value="new-beginnings" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>New Beginnings</CardTitle>
                    <CardDescription>A respectful and understanding space for those who are legally single again (divorced/widowed) and ready to find a new partner.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     {newBeginnings.map((person, index) => (
                        <Card key={index} className="overflow-hidden group">
                             <div className="relative aspect-square">
                                <Image src={person.avatar || ''} alt={person.name} fill objectFit="cover" />
                             </div>
                            <CardContent className="p-4">
                                <h3 className="font-bold text-lg">{person.name}, {person.age}</h3>
                                <p className="text-sm text-muted-foreground">{person.location}</p>
                                <Button className="w-full mt-3">View Profile</Button>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="conditions" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><UserCheck /> Create Your Dating Profile</CardTitle>
                    <CardDescription>Set your conditions and preferences. This feature is exclusively for verified MESY Members to ensure a safe community.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2 p-4 border border-dashed rounded-lg">
                        <Label htmlFor="member-id" className="flex items-center text-base"><KeyRound className="mr-2 h-5 w-5 text-primary"/>Enter MESY Member ID</Label>
                        <p className="text-sm text-muted-foreground">Please enter your Member ID to verify your status and create your dating profile.</p>
                        <div className="flex gap-2">
                           <Input id="member-id" placeholder="Your unique MESY Member ID..." />
                           <Button>Verify ID</Button>
                        </div>
                    </div>

                    <div className="relative p-8 rounded-lg bg-muted/30 overflow-hidden text-center blur-sm pointer-events-none">
                         <h3 className="font-bold text-lg">Set Your Preferences</h3>
                        <Textarea placeholder="Describe your ideal partner and relationship..." className="mt-2" />
                        <Button className="mt-4">Save Conditions</Button>
                    </div>

                     <div className="absolute inset-0 bg-background/50 flex flex-col items-center justify-center rounded-lg">
                        <Lock className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-2xl font-bold">Feature Locked</h3>
                        <p className="text-muted-foreground max-w-sm">You must be a verified MESY Member to create a dating profile and set conditions.</p>
                        <Button asChild className="mt-6">
                            <Link href="/member-signup">
                                Become a Member
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
