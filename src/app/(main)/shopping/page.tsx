
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Flame, Percent, ShoppingCart, Sparkles, Star, Store, Trophy, Users, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function ShoppingHubPage() {

    const slideshowImages = [
        PlaceHolderImages.find(i => i.id === 'shopping-preview'),
        PlaceHolderImages.find(i => i.id === 'fantasy-landscape-1'),
        PlaceHolderImages.find(i => i.id === 'fantasy-landscape-2'),
        PlaceHolderImages.find(i => i.id === 'fantasy-landscape-3'),
    ];

    const categories = [
        { name: 'Fashion', icon: <Sparkles /> },
        { name: 'Electronics', icon: <ShoppingCart /> },
        { name: 'Gaming Gear', icon: <Star /> },
        { name: 'Magic Items', icon: <Flame /> },
        { name: 'Home & Decor', icon: <Store /> },
        { name: 'Potions & Elixirs', icon: <Percent /> },
    ];
    
    const justForYouItems = [
        { name: 'Chrono Blade', price: '1500 MC', image: PlaceHolderImages.find(i => i.id === 'entertainment-preview') },
        { name: 'Elven Cloak', price: '800 MC', image: PlaceHolderImages.find(i => i.id === 'female-archer-1') },
        { name: 'Dragon Scale Shield', price: '2500 MC', image: PlaceHolderImages.find(i => i.id === 'dragon-1') },
        { name: 'Scroll of Knowledge', price: '300 MC', image: PlaceHolderImages.find(i => i.id === 'auth-background') },
    ];
    
    const videoAdImage = PlaceHolderImages.find(i => i.id === 'fantasy-landscape-2');
    
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            const difference = tomorrow.getTime() - now.getTime();

            let timeLeft = {
                hours: 0,
                minutes: 0,
                seconds: 0
            };

            if (difference > 0) {
                timeLeft = {
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }

            return timeLeft;
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (time: number) => {
        return time.toString().padStart(2, '0');
    };


    return (
        <div className="min-h-screen bg-background/90 text-foreground p-4 lg:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Sidebar */}
                <aside className="lg:col-span-3 hidden lg:block space-y-6">
                    <Card className="bg-card/50">
                        <CardHeader className="flex-row items-center gap-3 space-y-0">
                            <Users className="h-6 w-6 text-primary" />
                            <CardTitle>Shoppers Online</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">8,123</p>
                            <p className="text-sm text-muted-foreground">Active in the last hour</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle>Mall Leaderboards</CardTitle>
                            <CardDescription>Top rated & popular stores</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="popular">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="popular">Popular</TabsTrigger>
                                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                                    <TabsTrigger value="sales">Sales</TabsTrigger>
                                </TabsList>
                                <TabsContent value="popular" className="mt-4 space-y-3">
                                    {/* Mock Data */}
                                    <div className="flex items-center gap-3"><Avatar className="h-8 w-8"><AvatarImage src={PlaceHolderImages.find(i=>i.id==='knight-1')?.imageUrl}/></Avatar><span>The Armory</span><Badge variant="secondary" className="ml-auto">Lv.5</Badge></div>
                                    <div className="flex items-center gap-3"><Avatar className="h-8 w-8"><AvatarImage src={PlaceHolderImages.find(i=>i.id==='explorer-1')?.imageUrl}/></Avatar><span>Wanderer's Wares</span><Badge variant="secondary" className="ml-auto">Lv.4</Badge></div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                    
                     <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle>Partner Stores</CardTitle>
                            <CardDescription>Exclusive deals from our allies</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <p className="text-sm text-center text-muted-foreground py-4">Partner rankings coming soon.</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50">
                        <CardHeader className="flex-row items-center gap-3 space-y-0">
                           <Trophy className="h-6 w-6 text-yellow-400" />
                           <CardTitle>Top Reward Earners</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 pt-4">
                            {/* Mock Data */}
                             <div className="flex items-center gap-3"><span className="font-bold text-lg">1.</span><Avatar className="h-8 w-8"><AvatarImage src={PlaceHolderImages.find(i=>i.id==='fighter-character')?.imageUrl}/></Avatar><span>Zane</span><span className="ml-auto font-semibold text-primary">1,200 pts</span></div>
                             <div className="flex items-center gap-3"><span className="font-bold text-lg">2.</span><Avatar className="h-8 w-8"><AvatarImage src={PlaceHolderImages.find(i=>i.id==='female-archer-1')?.imageUrl}/></Avatar><span>Aria</span><span className="ml-auto font-semibold text-primary">980 pts</span></div>
                        </CardContent>
                    </Card>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-6 space-y-4">
                    <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 text-sm">
                        <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                            <span className="mx-4">Flash Sale on Magic Potions - Up to 50% OFF! ✨</span>
                            <span className="mx-4">MESY Mall Anniversary: Double Reward Points on all purchases! 🎉</span>
                        </div>
                        <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                            <span className="mx-4">Flash Sale on Magic Potions - Up to 50% OFF! ✨</span>
                            <span className="mx-4">MESY Mall Anniversary: Double Reward Points on all purchases! 🎉</span>
                        </div>
                    </div>
                    <style jsx>{`
                        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
                        @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
                        .animate-marquee { animation: marquee 20s linear infinite; }
                        .animate-marquee2 { animation: marquee2 20s linear infinite; }
                    `}</style>

                    <Tabs defaultValue="mall">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="mall">MESY Mall</TabsTrigger>
                            <TabsTrigger value="create-shop">Create Your Shop</TabsTrigger>
                            <TabsTrigger value="mesy-shop">MESY Official</TabsTrigger>
                        </TabsList>
                        <TabsContent value="mall" className="mt-4 space-y-6">
                            <Carousel opts={{ loop: true }}>
                                <CarouselContent>
                                    {slideshowImages.map((img, index) => img && (
                                        <CarouselItem key={index}>
                                            <div className="relative aspect-video rounded-lg overflow-hidden">
                                                <Image src={img.imageUrl} alt={img.description} data-ai-hint={img.imageHint} fill objectFit="cover"/>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-4" />
                                <CarouselNext className="right-4"/>
                            </Carousel>
                            
                             {/* Flash Sale */}
                            <div>
                                <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2"><Flame className="text-red-500"/> Flash Sale</h2>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-muted-foreground">Ending in</span>
                                            <span className="bg-destructive text-destructive-foreground font-bold p-2 rounded-md tabular-nums">{formatTime(timeLeft.hours)}</span>
                                            <span className="font-bold text-destructive">:</span>
                                            <span className="bg-destructive text-destructive-foreground font-bold p-2 rounded-md tabular-nums">{formatTime(timeLeft.minutes)}</span>
                                            <span className="font-bold text-destructive">:</span>
                                            <span className="bg-destructive text-destructive-foreground font-bold p-2 rounded-md tabular-nums">{formatTime(timeLeft.seconds)}</span>
                                        </div>
                                    </div>
                                    <Button variant="link" asChild><Link href="#">View All <ArrowRight className="h-4 w-4 ml-1"/></Link></Button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                     {/* Mock data */}
                                     {justForYouItems.slice(0,4).map((item, index) => item && (
                                        <Card key={index} className="overflow-hidden group">
                                            {item.image && <Image src={item.image.imageUrl} alt={item.name} width={200} height={200} className="w-full h-32 object-cover group-hover:scale-105 transition-transform" />}
                                            <div className="p-3">
                                                <h3 className="font-semibold truncate">{item.name}</h3>
                                                <p className="text-sm text-primary">{item.price}</p>
                                            </div>
                                        </Card>
                                     ))}
                                </div>
                            </div>
                            
                            {/* Categories */}
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight mb-3">Shop by Category</h2>
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                                    {categories.map((cat) => (
                                        <Button key={cat.name} variant="outline" className="flex-col h-24 gap-2">
                                            {cat.icon}
                                            <span className="text-sm">{cat.name}</span>
                                        </Button>
                                    ))}
                                </div>
                            </div>

                             {/* Just for you */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-2xl font-bold tracking-tight">Just For You</h2>
                                    <Button variant="link" asChild><Link href="#">More <ArrowRight className="h-4 w-4 ml-1"/></Link></Button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                     {justForYouItems.map((item, index) => item && (
                                        <Card key={index} className="overflow-hidden group">
                                            {item.image && <Image src={item.image.imageUrl} alt={item.name} width={200} height={200} className="w-full h-32 object-cover group-hover:scale-105 transition-transform" />}
                                            <div className="p-3">
                                                <h3 className="font-semibold truncate">{item.name}</h3>
                                                <p className="text-sm text-primary">{item.price}</p>
                                            </div>
                                        </Card>
                                     ))}
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </main>

                {/* Right Sidebar */}
                <aside className="lg:col-span-3 hidden lg:block space-y-6">
                    <Card className="bg-card/50 border-primary/50 shadow-lg shadow-primary/10">
                        <CardHeader className="p-0">
                            {videoAdImage && (
                            <div className="relative aspect-video">
                                <Image src={videoAdImage.imageUrl} alt={videoAdImage.description} data-ai-hint={videoAdImage.imageHint} fill className="object-cover rounded-t-lg"/>
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <Button variant="ghost" size="icon" className="h-16 w-16 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm">
                                        <Video className="h-8 w-8 text-white"/>
                                    </Button>
                                </div>
                            </div>
                            )}
                        </CardHeader>
                        <CardContent className="p-4">
                           <CardTitle className="text-base">Featured Promotion</CardTitle>
                           <p className="text-muted-foreground text-xs mt-1">Discover the new 'Chrono Blade' in the marketplace!</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50">
                        <CardHeader><CardTitle>Popular Products</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            {/* Mock Data */}
                            <div className="flex items-center gap-3">
                                {justForYouItems[0]?.image && <Image src={justForYouItems[0].image.imageUrl} width={40} height={40} className="rounded-md" alt="product"/>}
                                <p className="text-sm font-medium">Chrono Blade</p>
                            </div>
                             <div className="flex items-center gap-3">
                                {justForYouItems[1]?.image && <Image src={justForYouItems[1].image.imageUrl} width={40} height={40} className="rounded-md" alt="product"/>}
                                <p className="text-sm font-medium">Elven Cloak</p>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-card/50">
                        <CardHeader><CardTitle>Recommended For You</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                             {/* Mock Data */}
                             <div className="flex items-center gap-3">
                                {justForYouItems[2]?.image && <Image src={justForYouItems[2].image.imageUrl} width={40} height={40} className="rounded-md" alt="product"/>}
                                <p className="text-sm font-medium">Dragon Scale Shield</p>
                            </div>
                        </CardContent>
                    </Card>
                    
                     <Card className="bg-card/50">
                        <CardHeader><CardTitle>Featured Stores</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            {/* Mock Data */}
                             <div className="flex items-center gap-3">
                               <Avatar className="h-10 w-10"><AvatarImage src={PlaceHolderImages.find(i=>i.id==='knight-1')?.imageUrl}/></Avatar>
                               <div>
                                   <p className="text-sm font-semibold">The Armory</p>
                                   <p className="text-xs text-muted-foreground">Weapons & Armor</p>
                               </div>
                            </div>
                             <div className="flex items-center gap-3">
                               <Avatar className="h-10 w-10"><AvatarImage src={PlaceHolderImages.find(i=>i.id==='explorer-1')?.imageUrl}/></Avatar>
                               <div>
                                   <p className="text-sm font-semibold">Wanderer's Wares</p>
                                   <p className="text-xs text-muted-foreground">Adventuring Supplies</p>
                               </div>
                            </div>
                        </CardContent>
                    </Card>

                </aside>
            </div>
        </div>
    );

    
