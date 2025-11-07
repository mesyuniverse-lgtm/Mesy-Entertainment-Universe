'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useUser } from "@/firebase";
import { BookOpen, Diamond, LogIn, UserPlus, Users } from "lucide-react";
import Link from "next/link";

export default function MembershipsLandingPage() {
    const { user } = useUser();
    const displayName = user?.displayName?.split(' ')[0] || 'Member';


    return (
        <div className="container mx-auto py-12">
            <div className="text-center">
                <h1 className="text-5xl font-headline font-bold tracking-wider text-white" style={{ textShadow: '0 0 10px hsl(var(--primary))' }}>
                    MEMBERS ZONE
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    สวัสดีค่ะ คุณ {displayName}, ยินดีต้อนรับสู่พื้นที่สำหรับสมาชิก
                </p>
                <div className="mt-4 flex justify-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2"><Users className="h-4 w-4 text-primary"/> 1,234 ผู้เข้า Login</span>
                    <span className="flex items-center gap-2"><Diamond className="h-4 w-4 text-primary"/> 56 ผู้สำเร็จ Quest</span>
                    <span className="flex items-center gap-2"><Users className="h-4 w-4 text-primary"/> 78 ผู้รับรางวัล</span>
                </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-card/70 backdrop-blur-sm border-white/10 text-white hover:border-primary/50 transition-all">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><BookOpen className="text-primary"/> MEMBERS NEWS</CardTitle>
                        <CardDescription className="text-muted-foreground">ข้อมูลข่าวสารสมาชิก</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="secondary" className="w-full bg-primary/80 text-primary-foreground hover:bg-primary">เพิ่มเติม</Button>
                    </CardContent>
                </Card>
                 <Card className="bg-card/70 backdrop-blur-sm border-white/10 text-white hover:border-primary/50 transition-all">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><LogIn className="text-primary"/> MEMBERS LOGIN NOW</CardTitle>
                        <CardDescription className="text-muted-foreground">เข้าสู่ระบบสำหรับสมาชิก</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full bg-primary/80 text-primary-foreground hover:bg-primary">
                            <Link href="/the-door">เข้าสู่ระบบ</Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card className="bg-card/70 backdrop-blur-sm border-white/10 text-white hover:border-primary/50 transition-all">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><UserPlus className="text-primary"/> ลงทะเบียน MEMBER</CardTitle>
                        <CardDescription className="text-muted-foreground">คำเชิญชวน</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full bg-primary/80 text-primary-foreground hover:bg-primary">
                           <Link href="/member-signup">ลงทะเบียน</Link>
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
                    <p className="text-6xl font-bold text-red-500 my-4 tracking-wider">137,794</p>
                    <Button variant="secondary" className="bg-primary/80 text-primary-foreground hover:bg-primary">Stake Now</Button>
                </CardContent>
            </Card>
        </div>
    );
}
