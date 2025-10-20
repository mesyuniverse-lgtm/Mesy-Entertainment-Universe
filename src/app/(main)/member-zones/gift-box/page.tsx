
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gift, Coins, Gem, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export default function GiftBoxPage() {

    const dailyRewards = [
        { day: 1, reward: "100 Points", icon: <Coins className="h-10 w-10 text-yellow-400" />, status: "claimed" },
        { day: 2, reward: "200 Points", icon: <Coins className="h-10 w-10 text-yellow-400" />, status: "claimed" },
        { day: 3, reward: "50 MESY Coins", icon: <Gem className="h-10 w-10 text-primary" />, status: "claimed" },
        { day: 4, reward: "300 Points", icon: <Coins className="h-10 w-10 text-yellow-400" />, status: "claimed" },
        { day: 5, reward: "Small Gift Box", icon: <Gift className="h-10 w-10 text-pink-400" />, status: "claimable" },
        { day: 6, reward: "500 Points", icon: <Coins className="h-10 w-10 text-yellow-400" />, status: "locked" },
        { day: 7, reward: "Rare Avatar Chest", icon: <Image src={PlaceHolderImages.find(i => i.id === 'default-avatar')?.imageUrl || ''} alt="avatar chest" width={60} height={60} className="rounded-full border-2 border-purple-400" />, status: "locked" },
    ];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Gift Box</h1>
                <p className="text-muted-foreground">พิธีแห่งการให้: รับรางวัลจากการเข้าสู่ระบบและกิจกรรมต่างๆ</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Gift className="text-primary"/>Daily Login Rewards</CardTitle>
                    <CardDescription>Claim your reward for logging in each day. Complete a 7-day streak for a special prize!</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <div className="w-full overflow-x-auto pb-4">
                        <div className="flex gap-4">
                            {dailyRewards.map((item) => (
                                <div key={item.day} className={cn("min-w-[150px] relative rounded-lg border p-4 flex flex-col items-center justify-between text-center transition-all", 
                                    item.status === 'claimed' && 'bg-secondary/30 opacity-60',
                                    item.status === 'claimable' && 'border-primary ring-2 ring-primary/50 shadow-lg shadow-primary/20',
                                    item.status === 'locked' && 'bg-secondary/20'
                                )}>
                                    {item.status === 'claimed' && (
                                        <div className="absolute top-2 right-2 p-1 bg-green-500/20 text-green-400 rounded-full">
                                            <CheckCircle2 className="h-5 w-5" />
                                        </div>
                                    )}
                                     {item.status === 'locked' && (
                                        <div className="absolute top-2 right-2 p-1.5 bg-muted/50 text-muted-foreground rounded-full">
                                            <Lock className="h-4 w-4" />
                                        </div>
                                    )}
                                    <p className="font-bold text-sm mb-2">Day {item.day}</p>
                                    <div className="h-16 flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <p className="text-xs font-semibold mt-2 h-8">{item.reward}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                     <Button className="w-full mt-4" size="lg" disabled={dailyRewards.find(r => r.status === 'claimable') === undefined}>
                        {dailyRewards.find(r => r.status === 'claimable') ? `Claim Day ${dailyRewards.find(r => r.status === 'claimable')?.day} Reward` : 'Reward Claimed for Today'}
                    </Button>
                </CardContent>
            </Card>
             <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Gift className="text-primary"/>Event & Quest Rewards</CardTitle>
                    <CardDescription>Rewards from special events and completed quests will appear here.</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground">No other rewards to claim at this time.</p>
                </CardContent>
            </Card>
        </div>
    );
}
