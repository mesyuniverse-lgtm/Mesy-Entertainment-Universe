
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Gem, Gift, Shield, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const dailyRewards = [
  { day: 1, reward: "500 MESY Coins", icon: <Gem className="h-8 w-8" />, claimed: true, isToday: false },
  { day: 2, reward: "1 Reward Chest", icon: <Gift className="h-8 w-8" />, claimed: true, isToday: false },
  { day: 3, reward: "1-Hour EXP Boost", icon: <Zap className="h-8 w-8" />, claimed: false, isToday: true },
  { day: 4, reward: "1000 MESY Coins", icon: <Gem className="h-8 w-8" />, claimed: false, isToday: false },
  { day: 5, reward: "Rare Avatar Border", icon: <Star className="h-8 w-8" />, claimed: false, isToday: false },
  { day: 6, reward: "3 Reward Chests", icon: <Gift className="h-8 w-8" />, claimed: false, isToday: false },
  { day: 7, reward: "Epic Title: 'Loyal Adventurer'", icon: <Shield className="h-8 w-8" />, claimed: false, isToday: false },
];

export default function DailyRewardsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Daily Rewards</h1>
            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle>Login Streak Rewards</CardTitle>
                    <CardDescription>Claim a reward each day you log in. Don't break the streak!</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                        {dailyRewards.map((item, index) => (
                            <div key={item.day} className="flex items-center w-full sm:w-auto">
                                <div className={cn(
                                    "relative flex-1 sm:w-32 flex flex-col items-center justify-center p-4 text-center border-y-2 border-l-2 transition-all duration-300",
                                    item.claimed ? "bg-secondary/30 border-muted text-muted-foreground" : "bg-card hover:bg-muted/50",
                                    item.isToday ? "border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105" : "border-muted",
                                    index === 0 && "rounded-l-lg",
                                    index === dailyRewards.length -1 && "rounded-r-lg border-r-2"
                                )}>
                                    <p className={cn(
                                        "font-bold text-sm mb-2",
                                        item.isToday ? "text-primary" : item.claimed ? "text-muted-foreground/80" : "text-foreground"
                                    )}>Day {item.day}</p>
                                    <div className={cn("h-12 w-12 flex items-center justify-center my-2", item.claimed && "opacity-50")}>
                                      {item.icon}
                                    </div>
                                    <p className="text-xs font-semibold h-8">{item.reward}</p>
                                    
                                    {item.claimed && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-md">
                                            <Check className="h-10 w-10 text-white/80"/>
                                        </div>
                                    )}
                                </div>
                                {index < dailyRewards.length - 1 && (
                                    <div className={cn(
                                        "hidden sm:block h-12 w-4 border-y-2",
                                        item.isToday ? "border-primary" : "border-muted",
                                        "bg-gradient-to-r",
                                        item.claimed ? "from-secondary/30 to-card" : "from-card to-card"
                                        )}
                                        style={{clipPath: 'polygon(0 0, 100% 50%, 0 100%)'}}
                                    ></div>
                                )}
                            </div>
                        ))}
                    </div>
                     <div className="mt-8 flex justify-center">
                        <Button size="lg" disabled={!dailyRewards.some(r => r.isToday && !r.claimed)}>
                            Claim Today's Reward
                        </Button>
                    </div>
                    <p className="text-center text-xs text-muted-foreground mt-4">The reward list will reset after the final day's reward is taken.</p>
                </CardContent>
            </Card>
        </div>
    );
}
