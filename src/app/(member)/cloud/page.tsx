'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Cloud, Database, HardDrive, Plus, Server, Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const storagePlans = [
    {
        tier: 'Basic',
        size: '10 GB',
        price: '50 MC / mo',
        priceYear: '550 MC / yr',
        buyout: '1,500 MC',
        features: ['Standard speed', 'Basic support'],
        popular: false
    },
    {
        tier: 'Pro',
        size: '50 GB',
        price: '200 MC / mo',
        priceYear: '2,200 MC / yr',
        buyout: '6,000 MC',
        features: ['Faster speeds', 'Priority support', 'Early access to features'],
        popular: true
    },
    {
        tier: 'Titan',
        size: '200 GB',
        price: '600 MC / mo',
        priceYear: '6,600 MC / yr',
        buyout: '18,000 MC',
        features: ['Blazing speeds', 'Dedicated support', 'Custom domain'],
        popular: false
    }
]

export default function MesyCloudPage() {
    const currentUsage = 1.2;
    const totalStorage = 5;
    const usagePercentage = (currentUsage / totalStorage) * 100;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">MESY Cloud</h1>
                <p className="text-muted-foreground">Your personal cloud storage for the MESY Universe.</p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Storage Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Progress value={usagePercentage} />
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Used: {currentUsage} GB</span>
                            <span>Total: {totalStorage} GB (Free Tier)</span>
                        </div>
                    </div>
                     <div className="flex flex-wrap gap-2">
                        <Button><Upload className="mr-2"/> Upload Files</Button>
                        <Button variant="outline"><Plus className="mr-2"/> Create Folder</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Upgrade Your Storage</CardTitle>
                    <CardDescription>Need more space? Choose a plan that fits your needs.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue={storagePlans.find(p => p.popular)?.tier.toLowerCase() || 'pro'}>
                        <TabsList className="grid w-full grid-cols-3">
                            {storagePlans.map(plan => (
                                <TabsTrigger key={plan.tier} value={plan.tier.toLowerCase()}>{plan.tier}</TabsTrigger>
                            ))}
                        </TabsList>
                        
                        {storagePlans.map(plan => (
                             <TabsContent key={plan.tier} value={plan.tier.toLowerCase()} className="mt-6">
                                <div className="grid md:grid-cols-3 gap-6 text-center">
                                    <Card className="bg-card/50 flex flex-col">
                                        <CardHeader>
                                            <CardTitle>Monthly Plan</CardTitle>
                                            <p className="text-3xl font-bold text-primary">{plan.price}</p>
                                        </CardHeader>
                                        <CardContent className="flex-grow"/>
                                        <CardContent>
                                            <Button className="w-full">Choose Monthly</Button>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-card/50 flex flex-col">
                                        <CardHeader>
                                            <CardTitle>Yearly Plan</CardTitle>
                                            <p className="text-3xl font-bold text-primary">{plan.priceYear}</p>
                                            <CardDescription>Save ~10%</CardDescription>
                                        </CardHeader>
                                       <CardContent className="flex-grow"/>
                                        <CardContent>
                                            <Button className="w-full">Choose Yearly</Button>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-card/50 flex flex-col">
                                        <CardHeader>
                                            <CardTitle>Buyout</CardTitle>
                                            <p className="text-3xl font-bold text-primary">{plan.buyout}</p>
                                            <CardDescription>Own it forever</CardDescription>
                                        </CardHeader>
                                       <CardContent className="flex-grow"/>
                                        <CardContent>
                                            <Button className="w-full">Buy Now</Button>
                                        </CardContent>
                                    </Card>
                                </div>
                             </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>

        </div>
    );
}