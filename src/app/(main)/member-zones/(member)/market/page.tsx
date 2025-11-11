'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Gem, Package, Palette, PlusCircle, Search, Sparkles, Star, Tag, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Input } from "@/components/ui/input";

const marketItems = [
    { name: 'Fire Aura Effect', type: 'Effect', price: 500, seller: 'Draconis', sellerAvatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl, image: 'https://picsum.photos/seed/fireaura/300/300' },
    { name: 'Royal Knight Armor', type: 'Avatar', price: 2500, seller: 'Valerius', sellerAvatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl, image: PlaceHolderImages.find(i => i.id === 'entertainment-preview')?.imageUrl },
    { name: 'Enchanted Forest Theme', type: 'Theme', price: 800, seller: 'Elara', sellerAvatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl, image: PlaceHolderImages.find(i => i.id === 'enchanted-forest-1')?.imageUrl },
    { name: 'Holographic Emoji Pack', type: 'Emoji', price: 250, seller: 'Zane', sellerAvatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl, image: 'https://picsum.photos/seed/holoemoji/300/300' },
];

export default function MesyMarketPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">MESY Market</h1>
                    <p className="text-muted-foreground">The official peer-to-peer marketplace for MESY members.</p>
                </div>
                 <Button size="lg"><PlusCircle className="mr-2"/> List Your Item</Button>
            </div>
            
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <CardTitle>Browse the Market</CardTitle>
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="Search for items..." className="pl-10" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                     <Tabs defaultValue="all">
                        <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto">
                            <TabsTrigger value="all"><Package className="mr-2"/> All</TabsTrigger>
                            <TabsTrigger value="avatars"><Palette className="mr-2"/> Avatars</TabsTrigger>
                            <TabsTrigger value="effects"><Sparkles className="mr-2"/> Effects</TabsTrigger>
                            <TabsTrigger value="themes"><Star className="mr-2"/> Themes</TabsTrigger>
                            <TabsTrigger value="others"><Tag className="mr-2"/> Others</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="all" className="mt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {marketItems.map((item, index) => (
                                <Card key={index} className="bg-card/50 border-border/50 hover:border-primary/50 hover:shadow-lg transition-all flex flex-col group overflow-hidden">
                                    <div className="relative aspect-video bg-muted/30">
                                        <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform" />
                                        <div className="absolute top-2 left-2 bg-secondary text-secondary-foreground px-2 py-0.5 text-xs font-bold rounded-full shadow-lg">{item.type}</div>
                                    </div>
                                    <CardContent className="p-4 flex-grow flex flex-col">
                                        <h3 className="font-semibold leading-tight flex-grow">{item.name}</h3>
                                        <div className="flex items-center gap-2 text-sm mt-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={item.sellerAvatar} />
                                                <AvatarFallback>{item.seller.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-muted-foreground">{item.seller}</span>
                                        </div>
                                    </CardContent>
                                    <CardContent className="p-4 pt-0">
                                         <Button className="w-full text-base">
                                            <Gem className="mr-2 h-4 w-4"/> {item.price.toLocaleString()}
                                        </Button>
                                    </CardContent>
                                </Card>
                                ))}
                            </div>
                        </TabsContent>
                         <TabsContent value="avatars" className="mt-6 text-center">
                            <div className="p-12 bg-card/40 rounded-lg">
                                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-4 text-lg font-medium">No Avatars Listed</h3>
                                <p className="mt-2 text-sm text-muted-foreground">Be the first to list an avatar for sale!</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

        </div>
    );
}
