import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gem, Users, Newspaper, LogIn, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function DevelopersZonesPortalPage() {
    const bgImage = PlaceHolderImages.find((i) => i.id === 'auth-background');

    return (
        <div className="relative min-h-screen bg-background text-foreground">
            {bgImage && (
                <Image
                    src={bgImage.imageUrl}
                    alt={bgImage.description}
                    data-ai-hint={bgImage.imageHint}
                    fill
                    className="absolute inset-0 object-cover opacity-10"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background" />

            <div className="relative container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-headline">Developers Zone</h1>
                <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg">
                    สวัสดีค่ะ คุณ Member1, ยินดีต้อนรับสู่พื้นที่สำหรับ developers
                </p>

                <div className="mt-8 flex justify-center gap-4 md:gap-8 text-sm md:text-base">
                    <div className="flex items-center gap-2">
                        <Users className="text-primary"/>
                        <span><span className="font-bold">1,234</span> ผู้เข้า Login</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Gem className="text-primary"/>
                        <span><span className="font-bold">56</span> ผู้สำเร็จ Quest</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="text-primary"/>
                        <span><span className="font-bold">78</span> Successful </span>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-6 max-w-6xl mx-auto">
                    
                    <Card className="lg:col-span-3 bg-card/70 backdrop-blur-sm border-primary/20 flex flex-col justify-between text-left p-6">
                        <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2"><Newspaper className="text-primary"/> Developers News</h2>
                            <p className="text-muted-foreground">ข้อมูลข่าวสารสมาชิก Developer's </p>
                        </div>
                        <Button asChild className="mt-4 bg-purple-600 hover:bg-purple-700 text-white w-full">
                            <Link href="/chronicle">เพิ่มเติม</Link>
                        </Button>
                    </Card>

                    <Card className="lg:col-span-4 bg-card/70 backdrop-blur-sm border-primary/20 flex flex-col justify-between text-left p-6">
                         <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2"><LogIn className="text-primary"/> Members Login Now</h2>
                            <p className="text-muted-foreground">เข้าสู่ระบบสำหรับสมาชิก Developer's </p>
                        </div>
                        <Button asChild className="mt-4 bg-purple-600 hover:bg-purple-700 text-white w-full">
                           <Link href="/member-zones">เข้าสู่ระบบ</Link>
                        </Button>
                    </Card>

                     <Card className="lg:col-span-3 bg-card/70 backdrop-blur-sm border-primary/20 flex flex-col justify-between text-left p-6">
                        <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2"><UserPlus className="text-primary"/> ลงทะเบียน Developer's</h2>
                            <p className="text-muted-foreground">คำเชิญชวน</p>
                        </div>
                        <Button asChild className="mt-4 bg-purple-600 hover:bg-purple-700 text-white w-full">
                           <Link href="/signup">ลงทะเบียน</Link>
                        </Button>
                    </Card>
                    
                    <Card className="lg:col-span-10 bg-card/70 backdrop-blur-sm border-primary/20 p-6 flex flex-col items-center justify-center">
                        <Users className="w-12 h-12 text-primary" />
                        <h3 className="text-xl font-bold mt-4">จำนวนผู้สมัคร</h3>
                        <p className="text-sm text-muted-foreground">Total register</p>
                        <p className="text-5xl font-mono font-bold mt-2 text-primary">137,794</p>
                         <Button asChild className="mt-6 bg-purple-600 hover:bg-purple-700 text-white">
                           <Link href="/member-plan">Join Now</Link>
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
