
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, DollarSign, Gift, Star, Users, History } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const timelineEvents = [
    {
        icon: <Star className="h-6 w-6 text-yellow-400" />,
        title: "Leveled Up!",
        description: "You've reached a new milestone. The journey continues!",
        timestamp: "2 days ago",
        image: PlaceHolderImages.find(i => i.id === 'glowing-gem-1'),
    },
    {
        icon: <Users className="h-6 w-6 text-blue-400" />,
        title: "New Follower: Aria",
        description: "Your community grows! 'Aria' is now following you.",
        timestamp: "5 days ago",
        image: PlaceHolderImages.find(i => i.id === 'female-archer-1'),
    },
     {
        icon: <Gift className="h-6 w-6 text-pink-400" />,
        title: "Received a Gift",
        description: "Kael sent you a 'Dragon's Breath' potion!",
        timestamp: "1 week ago",
        image: null,
    },
    {
        icon: <Check className="h-6 w-6 text-primary" />,
        title: "Joined the MESY Universe",
        description: "Your journey began. Welcome to a new era of entertainment and community.",
        timestamp: "1 month ago",
        image: PlaceHolderImages.find(i => i.id === 'member-zone-preview'),
    }
];

export default function UserTimelinePage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Timeline</h1>
            <p className="text-muted-foreground">A record of your journey and significant achievements in the MESY Universe.</p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Timeline</CardTitle>
                <CardDescription>Your recent activities and milestones.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
                <div className="relative pl-8">
                    <div className="absolute left-4 top-4 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
                    {timelineEvents.map((event, index) => (
                         <div key={index} className="flex items-start gap-6 pb-12">
                            <div className="flex flex-col items-center">
                                <div className="z-10 bg-background border-2 border-border p-2 rounded-full">
                                    {event.icon}
                                </div>
                            </div>
                            <div className="flex-1 pt-1.5">
                                <p className="text-sm text-muted-foreground">{event.timestamp}</p>
                                <h3 className="font-bold text-lg text-foreground mt-1">{event.title}</h3>
                                <p className="text-muted-foreground mt-1">{event.description}</p>
                                {event.image && (
                                     <div className="mt-4 relative aspect-video max-w-sm rounded-lg overflow-hidden border">
                                        <Image src={event.image.imageUrl} alt={event.image.description} layout="fill" objectFit="cover" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
