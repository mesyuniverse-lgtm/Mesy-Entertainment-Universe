'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, DollarSign, Gift, Star, Users } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const chronicleEvents = [
    {
        icon: <Star className="h-6 w-6 text-yellow-400" />,
        title: "Leveled Up to 5",
        description: "You crushed your goals and reached a new milestone. The journey continues!",
        timestamp: "2 days ago",
        image: PlaceHolderImages.find(i => i.id === 'glowing-gem-1'),
    },
    {
        icon: <Users className="h-6 w-6 text-blue-400" />,
        title: "New Downline Member: Aria",
        description: "Your community grows! 'Aria' has joined your downline, bringing you closer to the next level.",
        timestamp: "5 days ago",
        image: PlaceHolderImages.find(i => i.id === 'female-archer-1'),
    },
     {
        icon: <Gift className="h-6 w-6 text-pink-400" />,
        title: "Claimed Daily Reward: 3 Reward Chests",
        description: "Your loyalty is rewarded. You've claimed your 6th-day login streak reward.",
        timestamp: "1 week ago",
        image: null,
    },
    {
        icon: <DollarSign className="h-6 w-6 text-green-500" />,
        title: "First Income Earned!",
        description: "A major milestone! You've received your first income from your growing downline.",
        timestamp: "2 weeks ago",
        image: null,
    },
    {
        icon: <Check className="h-6 w-6 text-primary" />,
        title: "Joined the MESY Universe",
        description: "Your ceremonial journey began. Welcome to a new era of entertainment and community.",
        timestamp: "1 month ago",
        image: PlaceHolderImages.find(i => i.id === 'member-zone-preview'),
    }
]

export default function MemberChroniclePage() {
  const userAvatar = PlaceHolderImages.find(i => i.id === 'default-avatar');
  
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Chronicle</h1>
            <p className="text-muted-foreground">A record of your journey and significant achievements in the MESY Universe.</p>
        </div>
        <Card>
            <CardContent className="p-6">
                <div className="relative pl-8">
                    {/* Vertical line */}
                    <div className="absolute left-4 top-4 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>

                    {chronicleEvents.map((event, index) => (
                         <div key={index} className="flex items-start gap-6 pb-12">
                             {/* Icon and Connector */}
                            <div className="flex flex-col items-center">
                                <div className="z-10 bg-background border-2 border-border p-2 rounded-full">
                                    {event.icon}
                                </div>
                            </div>

                            {/* Event Details */}
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
