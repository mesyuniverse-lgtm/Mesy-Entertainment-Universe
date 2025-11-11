'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Users, Star, Gift, CheckCircle, BarChart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Mock data for stats - in a real app this would come from an API
const userStats = [
    { label: "ผู้ล็อกอิน", value: "25 คน", icon: <Users className="w-5 h-5 text-muted-foreground" /> },
    { label: "เควสสำเร็จ", value: "8 เควส", icon: <CheckCircle className="w-5 h-5 text-muted-foreground" /> },
    { label: "ผู้รับรางวัล", value: "12 คน", icon: <Gift className="w-5 h-5 text-muted-foreground" /> },
    { label: "สถิติ", value: "N/A", icon: <BarChart className="w-5 h-5 text-muted-foreground" /> },
];

export default function UserZonePage() {

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <p className="text-sm text-muted-foreground">ยินดีต้อนรับสู่โซนสำหรับคุณ</p>
                    <h1 className="text-3xl font-bold font-headline tracking-tight text-white">USER ZONE</h1>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm w-full sm:w-auto">
                    {userStats.map(stat => (
                        <div key={stat.label} className="flex items-center gap-2 p-2 rounded-md bg-secondary/50">
                            {stat.icon}
                            <div>
                                <p className="text-muted-foreground">{stat.label}</p>
                                <p className="font-semibold">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Main Action Cards */}
                <Card className="md:col-span-2 lg:col-span-1 bg-card/50 border-primary/20 hover:border-primary/40 transition-all shadow-lg hover:shadow-primary/20">
                     <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                        <Users className="w-16 h-16 text-primary mb-4" />
                        <h3 className="text-2xl font-bold font-headline mb-2">Member News</h3>
                        <p className="text-muted-foreground mb-6">ติดตามข่าวสาร อัปเดต และประกาศสำคัญสำหรับสมาชิก</p>
                        <Button className="w-full">
                           ดูข่าวสารทั้งหมด <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                     </CardContent>
                </Card>

                 <Card className="md:col-span-2 lg:col-span-1 bg-card/50 border-primary/20 hover:border-primary/40 transition-all shadow-lg hover:shadow-primary/20">
                     <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                        <AreaChart className="w-16 h-16 text-primary mb-4" />
                        <h3 className="text-2xl font-bold font-headline mb-2">User Dashboard</h3>
                        <p className="text-muted-foreground mb-6">ดูสถิติส่วนตัว ความคืบหน้า และรางวัลของคุณ</p>
                         <Button className="w-full" asChild>
                           <Link href="/dashboard">
                                ไปที่แดชบอร์ด <ArrowRight className="ml-2 w-4 h-4" />
                           </Link>
                        </Button>
                     </CardContent>
                </Card>

                 <Card className="md:col-span-2 lg:col-span-1 bg-card/50 border-primary/20 hover:border-primary/40 transition-all shadow-lg hover:shadow-primary/20">
                     <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                        <Star className="w-16 h-16 text-primary mb-4" />
                        <h3 className="text-2xl font-bold font-headline mb-2">Rewards & Quests</h3>
                        <p className="text-muted-foreground mb-6">สำรวจภารกิจพิเศษและรับรางวัลเพื่อปลดล็อกศักยภาพของคุณ</p>
                        <Button className="w-full">
                           สำรวจรางวัล <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                     </CardContent>
                </Card>
            </main>
        </div>
    );
}