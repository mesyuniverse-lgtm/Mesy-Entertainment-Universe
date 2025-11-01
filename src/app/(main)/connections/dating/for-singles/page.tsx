'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const singles = [
    { name: 'Kael', age: 28, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl, location: 'Bangkok' },
    { name: 'Aria', age: 25, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl, location: 'Chiang Mai' },
    { name: 'Zane', age: 30, avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl, location: 'Pattaya' },
    { name: 'Lyra', age: 27, avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl, location: 'Phuket' },
    { name: 'Draconis', age: 32, avatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl, location: 'Remote' },
    { name: 'Silas', age: 29, avatar: PlaceHolderImages.find(i => i.id === 'fighter-silhouette')?.imageUrl, location: 'Khon Kaen' },
];


export default function ForSinglesPage() {
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

        <Card>
            <CardHeader>
                <CardTitle>Discover Singles</CardTitle>
                <CardDescription>Find other single members looking for a connection. Filter by gender, age, and location to find your match.</CardDescription>
                    <div className="flex gap-2 pt-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search by name or interest..." className="pl-10" />
                    </div>
                    <Button variant="outline" size="icon"><Filter /></Button>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {singles.map((person, index) => (
                    <Card key={index} className="overflow-hidden group">
                            <div className="relative aspect-square">
                            <Image src={person.avatar || ''} alt={person.name} fill objectFit="cover" className="group-hover:scale-105 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-0 p-4 text-white">
                                <h3 className="text-xl font-bold">{person.name}, {person.age}</h3>
                                <p className="text-sm">{person.location}</p>
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <Button className="w-full">View Profile</Button>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    </div>
  );
}
