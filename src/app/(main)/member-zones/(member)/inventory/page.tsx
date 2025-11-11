'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Swords, Shield, Wand2, Gem, Package, Plus, Sparkles, Shirt, Wallet } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const inventoryItems = [
    { name: "Chrono Blade", tier: "V", image: PlaceHolderImages.find(i => i.id === 'entertainment-preview')?.imageUrl, equipped: false, level: 1 },
    { name: "Health Potion", tier: "I", image: "https://picsum.photos/seed/potion/100/100" },
    { name: "Mana Potion", tier: "I", image: "https://picsum.photos/seed/mana/100/100" },
    { name: "Royal Knight Armor", tier: "IV", image: PlaceHolderImages.find(i => i.id === 'socialive-preview')?.imageUrl, equipped: true },
    { name: "Fire Aura Effect", tier: "III", image: "https://picsum.photos/seed/fireaura/100/100" },
    ...Array(25).fill({ name: "Empty", tier: "", image: null }), // Fill with empty slots
];

export default function InventoryPage() {
    return (
        <div className="h-full p-4 bg-background/50 rounded-lg">
            <Card className="bg-card/70 border-border/50 h-full flex flex-col">
                <CardHeader>
                     <Tabs defaultValue="all" className="w-full">
                        <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="all"><Package /></TabsTrigger>
                            <TabsTrigger value="equipment"><Shield /></TabsTrigger>
                            <TabsTrigger value="cosmetics"><Shirt /></TabsTrigger>
                            <TabsTrigger value="effects"><Sparkles /></TabsTrigger>
                            <TabsTrigger value="gems"><Gem /></TabsTrigger>
                        </TabsList>
                    </Tabs>
                </CardHeader>
                <CardContent className="flex-grow grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
                   {inventoryItems.map((item, index) => (
                       <div key={index} className={cn(
                           "aspect-square rounded-md border-2 flex items-center justify-center relative group",
                           item.image ? "bg-secondary/30 border-border/50 cursor-pointer" : "bg-background/30 border-dashed border-border/30",
                           item.equipped && "border-primary shadow-inner shadow-primary/50"
                       )}>
                           {item.image && <Image src={item.image} alt={item.name} width={64} height={64} className="p-1 group-hover:scale-110 transition-transform" />}
                           {item.tier && <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs">{item.tier}</Badge>}
                           {item.level && <Badge className="absolute -top-2 -left-2 text-xs">+{item.level}</Badge>}
                           {item.equipped && <Badge variant="default" className="absolute bottom-1 text-xs">EQUIP</Badge>}
                       </div>
                   ))}
                </CardContent>
                <CardContent>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">Slots: 30 / 150</p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4"/> Expand</Button>
                            <Button asChild size="sm"><Link href="/market"><Wallet className="mr-2 h-4 w-4"/> List on Market</Link></Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
