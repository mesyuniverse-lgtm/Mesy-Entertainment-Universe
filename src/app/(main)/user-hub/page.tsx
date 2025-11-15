
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, Users, Trophy, CheckCircle, MessageSquare, Gift, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useUser } from '@/firebase';

const StatCard = ({ title, value, icon, unit }: { title: string; value: string; icon: React.ReactNode, unit?:string }) => (
    <Card className="bg-card/50 text-white border-white/10 backdrop-blur-sm h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">{icon} {title}</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-3xl md:text-5xl font-bold text-red-500">{value}</div>
            {unit && <p className="text-xs text-muted-foreground">{unit}</p>}
        </CardContent>
    </Card>
);

const allUsers = [
    { name: 'Kael', verified: true, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
    { name: 'Lyra', verified: true, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
    { name: 'Kael', verified: true, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
    { name: 'Lyra', verified: true, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
    { name: 'Kael', verified: true, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
    { name: 'Lyra', verified: true, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
];

const contentGrid = [
    { type: 'Live', name: 'Kael', verified: true, image: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl },
    { type: 'Video', name: 'Lyra', verified: true, image: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
    { type: 'Photo', name: 'Zane', verified: false, image: 'https://picsum.photos/seed/121/400/600' },
];

export default function UserHubPage() {
    const { user } = useUser();
    const [totalRegistered, setTotalRegistered] = React.useState(137799);
    const [loggedInUsers, setLoggedInUsers] = React.useState(1349);
    const [shoppers, setShoppers] = React.useState(1234);
    const [verifiedUsers, setVerifiedUsers] = React.useState(2454);


    React.useEffect(() => {
        const intervals = [
            setInterval(() => setTotalRegistered(prev => prev + Math.floor(Math.random() * 3) + 1), 2500),
            setInterval(() => setLoggedInUsers(prev => prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2)), 3000),
            setInterval(() => setShoppers(prev => prev + (Math.random() > 0.6 ? 1 : 0)), 2000),
            setInterval(() => setVerifiedUsers(prev => prev + (Math.random() > 0.9 ? 1 : 0)), 5000),
        ];
        
        return () => intervals.forEach(clearInterval);
    }, []);


    const userDisplayName = user?.displayName || user?.email?.split('@')[0] || 'User';

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-5xl font-bold tracking-tight text-purple-300">USER HUB</h1>
                <p className="text-muted-foreground">สวัสดีค่ะ คุณ {userDisplayName}, ยินดีต้อนรับสู่พื้นที่สำหรับ users</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="จำนวนผู้สมัคร" value={totalRegistered.toLocaleString()} icon={<Users />} unit="Total register" />
                <StatCard title="ผู้ที่ล็อกอินอยู่" value={loggedInUsers.toLocaleString()} icon={<Users />} />
                <StatCard title="จำนวนผู้ช็อปปิ้ง" value={shoppers.toLocaleString()} icon={<ShoppingCart />} />
                <StatCard title="ผู้ยืนยันตนสำเร็จ" value={verifiedUsers.toLocaleString()} icon={<CheckCircle2 />} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-2 hidden lg:block">
                    <Card className="bg-card/50 p-4 border-white/10">
                        <h3 className="text-sm font-semibold text-purple-300 mb-4">ALL USERS TOTALLY</h3>
                        <div className="space-y-3">
                            {allUsers.map((u, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={u.avatar} />
                                            <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium flex items-center">
                                            {u.name}
                                            {u.verified ? <CheckCircle2 className="h-3 w-3 text-green-500 ml-1"/> : <AlertTriangle className="h-3 w-3 text-red-500 ml-1"/>}
                                        </span>
                                    </div>
                                    <MessageSquare className="h-4 w-4 text-muted-foreground hover:text-white cursor-pointer"/>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
                
                <div className="lg:col-span-7">
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {contentGrid.map((item, index) => (
                            <Card key={index} className="group relative overflow-hidden rounded-lg bg-card/50 border-white/10">
                                <Image src={item.image || ''} alt={item.name} width={400} height={600} className="object-cover w-full h-full aspect-[9/16] group-hover:scale-105 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                {item.type === 'Live' && <Badge variant="destructive" className="absolute top-2 left-2 bg-red-600">LIVE</Badge>}
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <p className="font-semibold flex items-center text-lg">
                                        {item.name}
                                        {item.verified ? <CheckCircle2 className="h-4 w-4 text-green-400 ml-1.5"/> : <AlertTriangle className="h-4 w-4 text-red-400 ml-1.5"/>}
                                    </p>
                                    <p className="text-sm text-white/80">{item.type}</p>
                                    <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Button size="sm" variant="secondary">Profile</Button>
                                        <Button size="sm" variant="secondary"><Gift className="h-4 w-4 mr-1.5"/> Gift</Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-3 space-y-6">
                    <Card className="bg-card/50 border-white/10">
                        <Image src={PlaceHolderImages.find(i => i.id === 'rose-background')?.imageUrl || ''} alt="Featured promotion" width={400} height={200} className="rounded-t-lg object-cover w-full h-32"/>
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-primary">Featured Promotion</h3>
                            <p className="text-sm text-muted-foreground mt-1 mb-3">Discover the new 'Chrono Blade' in the marketplace!</p>
                            <Button className="w-full bg-pink-600 hover:bg-pink-700">Watch Trailer</Button>
                        </CardContent>
                    </Card>
                     <Card className="bg-card/50 border-white/10 p-4">
                        <h3 className="font-semibold text-purple-300">Sponsored Ads</h3>
                        <p className="text-sm text-muted-foreground mt-1">Promotions from across the universe.</p>
                    </Card>
                </div>
            </div>

        </div>
    );
}

    