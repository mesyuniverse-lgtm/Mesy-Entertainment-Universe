
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box, ScrollText, Heart, Shield, Wand2, Trash2 } from "lucide-react";
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from "@/components/ui/badge";

export default function InventoriesPage() {

    const items = [
        { name: "Health Potion", quantity: 5, icon: <Heart className="h-8 w-8 text-red-500" />, type: "Consumable", description: "Restores a small amount of health." },
        { name: "Scroll of Wisdom", quantity: 1, icon: <ScrollText className="h-8 w-8 text-yellow-500" />, type: "Special", description: "Grants a temporary EXP boost." },
        { name: "Aegis of Valor", quantity: 1, icon: <Shield className="h-8 w-8 text-blue-500" />, type: "Equipment", description: "A shield that can block one fatal blow." },
        { name: "Minor Wand of Sparking", quantity: 3, icon: <Wand2 className="h-8 w-8 text-purple-500" />, type: "Consumable", description: "Creates a small burst of harmless sparks." },
        { name: "Rare Avatar Chest", quantity: 1, image: PlaceHolderImages.find(i => i.id === 'default-avatar')?.imageUrl || '', type: "Container", description: "Contains a rare avatar." },
        { name: "Common Chest Key", quantity: 2, icon: <Image src="https://picsum.photos/seed/keyicon/64/64" alt="key" width={32} height={32}/>, type: "Key", description: "Unlocks a common chest." },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Box className="text-primary"/>Your General Inventory</CardTitle>
                <CardDescription>Consumables, special items, and keys you've collected.</CardDescription>
            </CardHeader>
            <CardContent>
                {items.length === 0 ? (
                     <div className="flex flex-col items-center justify-center min-h-[200px] text-center p-6 border-2 border-dashed rounded-lg">
                        <Box className="h-16 w-16 text-muted-foreground" />
                        <p className="mt-4 font-semibold">Your inventory is empty.</p>
                        <p className="text-sm text-muted-foreground">Complete quests and claim rewards to collect items!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {items.map((item, index) => (
                            <Card key={index} className="flex items-start gap-4 p-4 hover:bg-secondary/30 transition-colors">
                                <div className="p-3 bg-secondary/50 rounded-lg flex items-center justify-center w-16 h-16">
                                    {item.image ? (
                                        <Image src={item.image} alt={item.name} width={40} height={40} className="object-contain rounded-md" />
                                    ) : (
                                        item.icon
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">{item.description}</p>
                                        </div>
                                        <Badge variant="outline" className="ml-2 whitespace-nowrap">{item.type}</Badge>
                                    </div>
                                    <div className="flex justify-between items-end mt-2">
                                        <p className="text-lg font-semibold text-primary">x{item.quantity}</p>
                                        <div className="flex gap-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Wand2 className="h-4 w-4" />
                                            </Button>
                                             <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
