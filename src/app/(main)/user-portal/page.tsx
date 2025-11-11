
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useUser } from "@/firebase";
import { BookOpen, CheckCircle, LogIn, Trophy, UserPlus, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";

const StatCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) => (
    <Card className="bg-card/70 backdrop-blur-sm border-white/10">
        <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
                {icon}
            </div>
            <div>
                <p className="text-muted-foreground text-sm">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </CardContent>
    </Card>
);

export default function UserPortalPage() {
    const { user } = useUser();
    const displayName = user?.displayName?.split(' ')[0] || 'User';
    
    const [stats, setStats] = useState({
        loggedIn: 1346,
        questSuccess: 87677,
        prizeWinners: 2454,
        totalRegistered: 137800,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prevStats => ({
                loggedIn: prevStats.loggedIn + Math.floor(Math.random() * 3) -1,
                questSuccess: prevStats.questSuccess + Math.floor(Math.random() * 5),
                prizeWinners: prevStats.prizeWinners + (Math.random() > 0.8 ? 1 : 0),
                totalRegistered: prevStats.totalRegistered + Math.floor(Math.random() * 2) + 1,
            }));
        }, 2500);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="container mx-auto py-12">
             <div className="mb-8">
                <Button asChild variant="outline">
                    <Link href="/the-gate">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to The Gate
                    </Link>
                </Button>
            </div>
            <div className="text-center mb-12">
                <h1 className="text-5xl font-headline font-bold tracking-wider text-white" style={{ textShadow: '0 0 10px hsl(var(--primary))' }}>
                    USERS ZONE
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    สวัสดีค่ะ คุณ {displayName}, ยินดีต้อนรับสู่พื้นที่สำหรับสมาชิก
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <StatCard icon={<Users className="h-6 w-6 text-primary"/>} title="ผู้ที่ล็อกอินอยู่" value={stats.loggedIn.toLocaleString()} />
                <StatCard icon={<CheckCircle className="h-6 w-6 text-primary"/>} title="เควสที่สำเร็จ" value={stats.questSuccess.toLocaleString()} />
                <StatCard icon={<Trophy className="h-6 w-6 text-primary"/>} title="ผู้รับรางวัล" value={stats.prizeWinners.toLocaleString()} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-card/70 backdrop-blur-sm border-white/10 text-white hover:border-primary/50 transition-all">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><BookOpen className="text-primary"/> NEWS</CardTitle>
                        <CardDescription className="text-muted-foreground">ข้อมูลข่าวสาร</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant="secondary" className="w-full bg-primary/80 text-primary-foreground hover:bg-primary">
                             <Link href="/socialive">เพิ่มเติม</Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card className="bg-card/70 backdrop-blur-sm border-white/10 text-white hover:border-primary/50 transition-all">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><LogIn className="text-primary"/> LOGIN NOW</CardTitle>
                        <CardDescription className="text-muted-foreground">เข้าสู่ระบบสำหรับผู้ใช้</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full bg-primary/80 text-primary-foreground hover:bg-primary">
                            <Link href="/login">เข้าสู่ระบบ</Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card className="bg-card/70 backdrop-blur-sm border-white/10 text-white hover:border-primary/50 transition-all">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><UserPlus className="text-primary"/> ลงทะเบียน Sign up</CardTitle>
                        <CardDescription className="text-muted-foreground">คำเชิญชวน</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full bg-primary/80 text-primary-foreground hover:bg-primary">
                           <Link href="/signup">ลงทะเบียน</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-12 bg-card/70 backdrop-blur-sm border-white/10 text-white text-center">
                <CardContent className="p-8">
                    <div className="flex justify-center items-center gap-2">
                        <Users className="h-8 w-8 text-muted-foreground"/>
                        <div>
                             <p className="text-lg text-muted-foreground">จำนวนผู้สมัคร</p>
                            <p className="text-sm text-muted-foreground/80">Total register</p>
                        </div>
                    </div>
                    <p className="text-6xl font-bold text-red-500 my-4 tracking-wider tabular-nums">
                        {stats.totalRegistered.toLocaleString()}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
