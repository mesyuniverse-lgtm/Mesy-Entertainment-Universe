'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Swords, Shield, Wand2, Gem, Package, Plus, Sparkles, Shirt } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const characterStats = {
    name: "Aria",
    level: 25,
    power: 25690,
    hp: 20151,
    mp: 2080,
    attack: 1124,
    defense: 566,
    magicDefense: 540,
};

const equippedItems = {
    weapon: { name: "Shadowfire Bow", image: PlaceHolderImages.find(i => i.id === 'entertainment-preview')?.imageUrl, tier: 'IV', level: 4 },
    chest: { name: "Elven Tunic", image: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl, tier: 'II' },
    legs: { name: "Leather Leggings", image: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl, tier: 'II' },
};

const inventoryItems = [
    { name: "Health Potion", tier: "I", image: "https://picsum.photos/seed/potion/100/100" },
    { name: "Mana Potion", tier: "I", image: "https://picsum.photos/seed/mana/100/100" },
    { name: "Chrono Blade", tier: "V", image: PlaceHolderImages.find(i => i.id === 'entertainment-preview')?.imageUrl, equipped: false, level: 1 },
    { name: "Royal Knight Armor", tier: "IV", image: PlaceHolderImages.find(i => i.id === 'socialive-preview')?.imageUrl, equipped: true },
    { name: "Fire Aura Effect", tier: "III", image: "https://picsum.photos/seed/fireaura/100/100" },
    ...Array(25).fill({ name: "Empty", tier: "", image: null }), // Fill with empty slots
];

export default function InventoryPage() {
    const avatarImage = PlaceHolderImages.find(i => i.id === 'female-archer-1');

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 h-full p-4 bg-background/50 rounded-lg">

            {/* Left: Character Stats & Equipment */}
            <aside className="xl:col-span-3 space-y-4">
                <Card className="bg-card/70 border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Swords className="text-primary"/> Character Info
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between text-2xl font-bold">
                            <span>{characterStats.name}</span>
                            <Badge>Lv. {characterStats.level}</Badge>
                        </div>
                        <div className="p-3 bg-secondary/30 rounded-md text-center">
                            <p className="text-sm text-muted-foreground">Power</p>
                            <p className="text-3xl font-bold tracking-wider">{characterStats.power.toLocaleString()}</p>
                        </div>
                        <div className="space-y-1 text-sm">
                           <div className="flex justify-between"><span>HP</span><span>{characterStats.hp}</span></div>
                           <div className="flex justify-between"><span>MP</span><span>{characterStats.mp}</span></div>
                           <Separator className="my-2"/>
                           <div className="flex justify-between"><span>Attack</span><span>{characterStats.attack}</span></div>
                           <div className="flex justify-between"><span>Defense</span><span>{characterStats.defense}</span></div>
                           <div className="flex justify-between"><span>Magic Defense</span><span>{characterStats.magicDefense}</span></div>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="bg-card/70 border-border/50">
                    <CardHeader><CardTitle>Equipment</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {Object.entries(equippedItems).map(([key, item]) => (
                             <div key={key} className="flex items-center gap-3">
                                 <div className="relative w-12 h-12 bg-secondary/30 rounded-md flex items-center justify-center">
                                    {item.image && <Image src={item.image} alt={item.name} width={48} height={48} className="p-1"/>}
                                    <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs">{item.tier}</Badge>
                                    {item.level && <Badge className="absolute -top-2 -left-2 text-xs">+{item.level}</Badge>}
                                </div>
                                <p className="font-semibold">{item.name}</p>
                             </div>
                        ))}
                    </CardContent>
                </Card>
            </aside>

            {/* Center: Avatar */}
            <main className="xl:col-span-5 flex items-center justify-center">
                <Card className="w-full h-[600px] bg-card/70 border-border/50 flex flex-col items-center justify-center">
                    {avatarImage && <Image src={avatarImage.imageUrl} alt="Avatar" width={300} height={500} objectFit="contain"/>}
                    <p className="text-muted-foreground mt-4">3D Avatar Preview</p>
                </Card>
            </main>

            {/* Right: Inventory */}
            <aside className="xl:col-span-4">
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
                    <CardContent className="flex-grow grid grid-cols-5 gap-2">
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
                        <div className="flex justify-between items-center text-sm">
                            <p>Slots: 30 / 150</p>
                            <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4"/> Expand</Button>
                        </div>
                    </CardContent>
                </Card>
            </aside>
        </div>
    );
}
