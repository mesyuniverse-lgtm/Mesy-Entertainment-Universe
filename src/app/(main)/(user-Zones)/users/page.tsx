'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Newspaper, LogIn, UserPlus, Users, CheckCircle, Trophy, UserCheck } from "lucide-react";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import styles from './users-page.module.css';

const StatCard = ({ title, value, icon, colorClass }: { title: string, value: string, icon: React.ReactNode, colorClass?: string }) => {
    // A simple counter animation
    const [count, setCount] = useState(0);

    useEffect(() => {
        const numValue = parseInt(value.replace(/,/g, ''));
        if (isNaN(numValue)) return;
        let start = 0;
        const duration = 1500;
        const increment = numValue / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= numValue) {
                setCount(numValue);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value]);


    return (
        <Card className={cn("bg-card/50 border-white/10 backdrop-blur-sm", styles.statCard)}>
            <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-full">
                    {icon}
                </div>
                <div>
                    <div className="text-muted-foreground text-sm">{title}</div>
                    <div className={cn("text-3xl font-bold", colorClass)}>
                        {count.toLocaleString()}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
};


export default function UsersZonePage() {

    const [totalRegistered, setTotalRegistered] = useState(0);

    useEffect(() => {
        let start = 137000;
        const end = 137800;
        const timer = setInterval(() => {
            start += Math.ceil(Math.random() * 20);
            if (start >= end) {
                setTotalRegistered(end);
                clearInterval(timer);
            } else {
                setTotalRegistered(start);
            }
        }, 50);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={cn("min-h-screen p-4 md:p-8", styles.pageContainer)}>
             <Link href="/the-gate" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
                <ArrowLeft className="w-4 h-4" />
                Back to The Gate
            </Link>

            <div className="text-center mb-10">
                <h1 className={cn("font-headline uppercase font-bold tracking-widest", styles.mainTitle)}>Users Zone</h1>
                <p className="text-muted-foreground mt-2">สวัสดีค่ะ คุณ Tipyatida, ยินดีต้อนรับสู่พื้นที่สำหรับสมาชิก</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="ผู้ที่ล็อกอินอยู่" value="1346" icon={<Users className="w-6 h-6 text-pink-400" />} />
                <StatCard title="เควสที่สำเร็จ" value="87677" icon={<CheckCircle className="w-6 h-6 text-pink-400" />} />
                <StatCard title="ผู้รับรางวัล" value="2454" icon={<Trophy className="w-6 h-6 text-pink-400" />} />
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                 <Card className={cn("bg-card/50 border-white/10 text-center flex flex-col justify-between", styles.actionCard)}>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2 text-xl"><Newspaper className="w-5 h-5" /> NEWS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button className={cn("w-full", styles.actionButton)}>เพิ่มเติม</Button>
                    </CardContent>
                </Card>
                 <Card className={cn("bg-card/50 border-white/10 text-center flex flex-col justify-between", styles.actionCard)}>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2 text-xl"><LogIn className="w-5 h-5"/> LOGIN NOW</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className={cn("w-full", styles.actionButton)}>
                            <Link href="/login">เข้าสู่ระบบ</Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card className={cn("bg-card/50 border-white/10 text-center flex flex-col justify-between", styles.actionCard)}>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2 text-xl"><UserPlus className="w-5 h-5"/> ลงทะเบียน <span className="font-sans font-light opacity-80">Sign up</span></CardTitle>
                        <CardDescription>คำเชิญชวน</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button asChild className={cn("w-full", styles.actionButton)}>
                            <Link href="/signup">ลงทะเบียน</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
            
            {/* Total Registered Users */}
            <Card className={cn("bg-card/50 border-white/10 text-center py-8", styles.totalCard)}>
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-3 text-muted-foreground font-normal">
                       <UserCheck className="w-7 h-7"/> 
                       <div>
                            <p>จำนวนผู้สมัคร</p>
                            <p className="text-sm font-light">Total register</p>
                       </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className={cn("font-bold tracking-tighter", styles.totalNumber)}>
                        {totalRegistered.toLocaleString()}
                    </p>
                </CardContent>
            </Card>

        </div>
    );
}
