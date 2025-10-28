'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Package, Plus, Archive, MoveUp } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

const bagItems = [
    { name: "Health Potion", image: "https://picsum.photos/seed/potion/100/100", quantity: 5 },
    { name: "Mana Potion", image: "https://picsum.photos/seed/mana/100/100", quantity: 3 },
    { name: "Scroll of Teleport", image: "https://picsum.photos/seed/scroll/100/100", quantity: 1 },
    ...Array(22).fill({ name: "Empty", image: null }), // Fill with empty slots
];

export default function BagPage() {
    const totalSlots = 25;
    const usedSlots = bagItems.filter(item => item.image).length;
    const usagePercentage = (usedSlots / totalSlots) * 100;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2"><Package className="h-8 w-8 text-primary"/> Personal Bag</h1>
                <p className="text-muted-foreground">Items you are currently carrying. Limited space available.</p>
            </div>
            <Card className="bg-card/70 border-border/50">
                <CardHeader>
                    <CardTitle>My Bag</CardTitle>
                    <CardDescription>Drag and drop to rearrange items or move them to your main inventory.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-5 md:grid-cols-10 gap-2 p-4 border rounded-lg bg-background/50">
                       {bagItems.map((item, index) => (
                           <div key={index} className={cn(
                               "aspect-square rounded-md border-2 flex items-center justify-center relative group",
                               item.image ? "bg-secondary/30 border-border/50 cursor-pointer" : "bg-background/30 border-dashed border-border/30",
                           )}>
                               {item.image && <Image src={item.image} alt={item.name} width={64} height={64} className="p-1 group-hover:scale-110 transition-transform" />}
                               {item.quantity && item.quantity > 1 && <Badge variant="secondary" className="absolute bottom-1 right-1 text-xs">{item.quantity}</Badge>}
                           </div>
                       ))}
                    </div>
                </CardContent>
                 <CardContent>
                    <div className="space-y-2">
                         <div className="flex justify-between items-center text-sm">
                            <p className="text-muted-foreground">Storage Capacity</p>
                            <p className="font-semibold">{usedSlots} / {totalSlots} Slots</p>
                        </div>
                        <Progress value={usagePercentage} />
                    </div>
                     <div className="flex flex-wrap gap-4 mt-6">
                        <Button size="lg" variant="outline">
                            <Plus className="mr-2 h-4 w-4"/> Expand Storage
                        </Button>
                        <Button size="lg" asChild>
                            <Link href="/inventory">
                                <Archive className="mr-2 h-4 w-4"/> Move to Main Inventory
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
