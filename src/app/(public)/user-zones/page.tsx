'use client';

import { ArrowLeft, CheckCircle, Newspaper, Trophy, UserPlus, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState, useEffect } from 'react';

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
    <Card className="bg-card/50 text-white border-white/10 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">{icon} {title}</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);

const ActionCard = ({ title, description, buttonText, icon, href }: { title: string; description?: string; buttonText: string; icon: React.ReactNode; href: string; }) => (
    <Card className="bg-card/50 text-white border-white/10 backdrop-blur-sm flex flex-col">
        <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">{icon}{title}</CardTitle>
            {description && <p className="text-muted-foreground text-sm pt-2">{description}</p>}
        </CardHeader>
        <CardContent className="flex-grow"></CardContent>
        <div className="p-6 pt-0">
            <Button asChild className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                <Link href={href}>{buttonText}</Link>
            </Button>
        </div>
    </Card>
);

export default function UserZonePage() {
    const [totalRegistered, setTotalRegistered] = useState(137800);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const interval = setInterval(() => {
            setTotalRegistered(prev => prev + Math.floor(Math.random() * 5) + 1);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    if (!isClient) {
        return null;
    }


    return (
        <div className="min-h-screen p-4 sm:p-8">
            <Link href="/the-gate" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                Back to The Gate
            </Link>

            <div className="text-center mb-10">
                <h1 className="text-5xl md:text-6xl font-headline font-bold tracking-widest uppercase" style={{ color: '#E0B0FF', textShadow: '0 0 10px #E0B0FF, 0 0 20px #C566FF' }}>
                    USERS ZONE
                </h1>
                <p className="mt-2 text-muted-foreground">สวัสดีค่ะ คุณ Tipyatida, ยินดีต้อนรับสู่พื้นที่สำหรับสมาชิก</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="ผู้ที่ล็อกอินอยู่" value="1,346" icon={<Users className="h-5 w-5" />} />
                <StatCard title="เควสที่สำเร็จ" value="87,677" icon={<CheckCircle className="h-5 w-5" />} />
                <StatCard title="ผู้รับรางวัล" value="2,454" icon={<Trophy className="h-5 w-5" />} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                 <ActionCard title="NEWS" buttonText="เพิ่มเติม" icon={<Newspaper />} href="/news" />
                 <ActionCard title="LOGIN NOW" buttonText="เข้าสู่ระบบ" icon={<ArrowLeft className='transform -rotate-180' />} href="/login" />
                 <ActionCard title="ลงทะเบียน Sign up" description="คำเชิญชวน" buttonText="ลงทะเบียน" icon={<UserPlus />} href="/signup" />
            </div>
            
            <div className="max-w-md mx-auto">
                 <Card className="bg-card/50 text-white border-white/10 backdrop-blur-sm text-center">
                    <CardHeader>
                        <CardTitle className="text-muted-foreground font-normal flex items-center justify-center gap-2">
                           <Users className="h-5 w-5" /> จำนวนผู้สมัคร
                        </CardTitle>
                        <p className="text-xs text-muted-foreground -mt-2">Total register</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-6xl font-bold font-mono" style={{ color: '#FF5C5C' }}>
                            {totalRegistered.toLocaleString()}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
