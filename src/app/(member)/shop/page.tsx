'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCent, Gem, Package, Palette, Sparkles, Star, Wifi, Smartphone, ShoppingBag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const coinPacks = [
    { name: '120 + 120 MESY Coins', price: 2.99, image: 'https://picsum.photos/seed/coins1/300/200', hot: true, bonus: 'Once per account' },
    { name: '405 + 405 MESY Coins', price: 9.99, image: 'https://picsum.photos/seed/coins2/300/200', hot: true, bonus: 'Once per account' },
    { name: '2,040 + 2,040 MESY Coins', price: 49.99, image: 'https://picsum.photos/seed/coins3/300/200', hot: true, bonus: 'Once per account' },
    { name: '120 MESY Coins', price: 2.99, image: 'https://picsum.photos/seed/coins4/300/200' },
    { name: '200 + 200 MESY Coins', price: 4.99, image: 'https://picsum.photos/seed/coins5/300/200', hot: true, bonus: 'Once per account' },
    { name: '1,220 + 1,220 MESY Coins', price: 29.99, image: 'https://picsum.photos/seed/coins6/300/200', hot: true, bonus: 'Once per account' },
    { name: '4,100 + 4,100 MESY Coins', price: 99.99, image: 'https://picsum.photos/seed/coins7/300/200', hot: true, bonus: 'Once per account' },
    { name: '200 MESY Coins', price: 4.99, image: 'https://picsum.photos/seed/coins8/300/200' },
];

const specialItems = [
    { name: 'Genesis Gem', price: 199.99, image: PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl, description: 'A gem holding the power of creation.' },
    { name: 'Chrono Blade', price: 249.99, image: PlaceHolderImages.find(i => i.id === 'entertainment-preview')?.imageUrl, description: 'A sword that can bend time itself.' },
    { name: 'Dragon\'s Heart', price: 399.99, image: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl, description: 'Grants immense power and fortitude.' },
];

const ProductCard = ({ product }: { product: any }) => (
    <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all flex flex-col group overflow-hidden">
        <div className="relative aspect-video bg-muted/30">
            <Image src={product.image || 'https://picsum.photos/seed/default/300/200'} alt={product.name} layout="fill" objectFit="contain" className="p-4 group-hover:scale-105 transition-transform" />
            {product.hot && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-0.5 text-xs font-bold rounded-full shadow-lg">HOT</div>
            )}
        </div>
        <CardHeader className="pb-2">
            <CardTitle className="text-base leading-tight h-10">{product.name}</CardTitle>
            {product.bonus && <CardDescription className="text-xs text-primary">{product.bonus}</CardDescription>}
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-end">
            <Button className="w-full">
                {`$${product.price.toFixed(2)}`}
            </Button>
        </CardContent>
    </Card>
);

export default function MesyShopPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2"><ShoppingBag className="h-8 w-8 text-primary"/> MESY Official Shop</h1>
                    <p className="text-muted-foreground">Your one-stop shop for digital goods, top-ups, and exclusive items.</p>
                </div>
            </div>
            
            <Tabs defaultValue="coins">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-auto">
                    <TabsTrigger value="coins"><Gem className="mr-2"/> Coin Top-up</TabsTrigger>
                    <TabsTrigger value="items"><Star className="mr-2"/> Special Items</TabsTrigger>
                    <TabsTrigger value="avatars"><Palette className="mr-2"/> Avatars & Wearables</TabsTrigger>
                    <TabsTrigger value="effects"><Sparkles className="mr-2"/> Effects</TabsTrigger>
                    <TabsTrigger value="partners-games"><BadgeCent className="mr-2"/> Partner Services</TabsTrigger>
                    <TabsTrigger value="packages"><Package className="mr-2"/> Daily Packages</TabsTrigger>
                </TabsList>
                
                <TabsContent value="coins" className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {coinPacks.map((pack, index) => (
                           <ProductCard key={index} product={pack} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="items" className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                         {specialItems.map((item, index) => (
                           <Card key={index} className="bg-card/50 border-border/50 hover:border-primary/50 transition-all flex flex-col group overflow-hidden">
                                <div className="relative aspect-video bg-muted/30">
                                    <Image src={item.image || 'https://picsum.photos/seed/default/300/200'} alt={item.name} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform" />
                                </div>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">{item.name}</CardTitle>
                                    <CardDescription>{item.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow flex items-end">
                                    <Button className="w-full text-lg">
                                        <Gem className="mr-2 h-4 w-4"/> {item.price.toLocaleString()} MC
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                
                <TabsContent value="avatars" className="mt-6 text-center">
                    <div className="p-12 bg-card/40 rounded-lg">
                        <Palette className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">Avatar & Wearables Shop</h3>
                        <p className="mt-2 text-sm text-muted-foreground">Customize your digital identity. Coming soon.</p>
                    </div>
                </TabsContent>

                 <TabsContent value="effects" className="mt-6 text-center">
                    <div className="p-12 bg-card/40 rounded-lg">
                        <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">Visual & Audio Effects</h3>
                        <p className="mt-2 text-sm text-muted-foreground">Enhance your content with unique effects. Coming soon.</p>
                    </div>
                </TabsContent>

                 <TabsContent value="partners-games" className="mt-6 text-center">
                    <div className="p-12 bg-card/40 rounded-lg">
                        <div className="flex justify-center gap-4 text-muted-foreground">
                            <Smartphone className="h-12 w-12" />
                            <Wifi className="h-12 w-12" />
                            <BadgeCent className="h-12 w-12" />
                        </div>
                        <h3 className="mt-4 text-lg font-medium">Partner Services</h3>
                        <p className="mt-2 text-sm text-muted-foreground">Top-up mobile, internet, and partner wallets. Coming soon.</p>
                    </div>
                </TabsContent>

                 <TabsContent value="packages" className="mt-6 text-center">
                    <div className="p-12 bg-card/40 rounded-lg">
                        <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">Daily & Limited Packages</h3>
                        <p className="mt-2 text-sm text-muted-foreground">Check back for special deals. Coming soon.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
