'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LogIn, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const newMembers = [
  { name: 'Claudia Maudi', message: 'Typing...', time: '4:30 PM', avatarId: 'female-archer-1', online: true },
  { name: 'Novita', message: 'yah, nice design', time: '4:30 PM', avatarId: 'knight-1' , count: 2, online: true},
  { name: 'Milie Nose', message: 'Awesome', time: '8:20 PM', avatarId: 'explorer-1', status: 'fire' },
  { name: 'Ikhsan SD', message: 'UX/UI Designer', time: 'yesterday', avatarId: 'default-avatar' },
  { name: 'Aditya', message: '@dityaa', time: 'yesterday', avatarId: 'fighter-character', online: true },
  { name: 'Ahmed Medi', message: 'Let\'s Rock N Roll...', time: '1:15 AM', avatarId: 'knight-1', status: 'fire' },
];


export default function TheGatePage() {
    const [totalMembers, setTotalMembers] = useState(137800);
    const gateImage = PlaceHolderImages.find((i) => i.id === 'fantasy-landscape-5');
    const celebrationImage = PlaceHolderImages.find((i) => i.id === 'celebration-2026');

    useEffect(() => {
        const interval = setInterval(() => {
        setTotalMembers((prev) => prev + Math.floor(Math.random() * 5) + 1);
        }, 2500);
        return () => clearInterval(interval);
    }, []);


  return (
    <div className="relative min-h-screen w-full bg-background text-white overflow-hidden flex items-center justify-center p-4">
        
        {gateImage && (
             <Image
                src={gateImage.imageUrl}
                alt={gateImage.description}
                data-ai-hint={gateImage.imageHint}
                fill
                className="object-cover"
                priority
            />
        )}
        <div className="absolute inset-0 bg-black/60" />

        <Card className="relative z-10 w-full max-w-7xl bg-black/50 backdrop-blur-lg border-primary/20 grid grid-cols-1 md:grid-cols-12 rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
            {/* Left Column */}
            <div className="md:col-span-3 p-6 bg-black/30 border-r border-white/10 flex flex-col gap-6">
                <div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-5 h-5" />
                        <h2 className="font-semibold">จำนวนผู้สมัคร</h2>
                    </div>
                    <p className="text-5xl font-bold tracking-tighter text-red-500" style={{textShadow: '0 0 10px #ef4444'}}>
                        {totalMembers.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Members</p>
                </div>
                
                <div className="flex-grow">
                    <h3 className="font-semibold text-red-400 mb-2">New Members</h3>
                    <div className="space-y-3">
                        {newMembers.map((member, index) => {
                            const avatar = PlaceHolderImages.find(p => p.id === member.avatarId)
                            return (
                                 <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                                    <Avatar className='h-10 w-10 border-2 border-transparent relative'>
                                        {avatar && <AvatarImage src={avatar.imageUrl} alt={member.name} />}
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                        {member.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card" />}
                                    </Avatar>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="font-semibold truncate text-sm">{member.name}</p>
                                        <p className="text-xs text-muted-foreground truncate">{member.message}</p>
                                    </div>
                                    <div className="text-right text-xs text-muted-foreground">
                                        <p>{member.time}</p>
                                        {member.count && <div className="mt-1 flex justify-end"><div className="w-4 h-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">{member.count}</div></div>}
                                        {member.status === 'fire' && <div className="mt-1 flex justify-end">🔥</div>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Center Column */}
            <div className="md:col-span-6 flex flex-col items-center justify-center text-center p-8">
                 <h1 className="text-6xl md:text-8xl font-black tracking-widest uppercase font-headline" style={{textShadow: '0 0 15px hsl(var(--primary)), 0 0 25px hsl(var(--primary))'}}>
                    THE GATE
                </h1>
                <p className="text-lg text-primary-foreground/80 mt-2">
                    Choose Your Destiny. Your journey into the MESY Universe starts now.
                </p>
                <div className='w-full max-w-xs space-y-4 mt-8'>
                    <Button
                        size="lg"
                        className="w-full text-lg h-14 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold border-2 border-transparent hover:border-white transition-all duration-300 shadow-lg hover:shadow-primary/50"
                        asChild
                    >
                       <Link href="/signup">Create Member ID</Link>
                    </Button>
                     <Button variant="outline" size="lg" className="w-full text-lg h-14 bg-black/30 border-white/30 hover:bg-white/10 hover:border-white" asChild>
                         <Link href="/login">
                            <LogIn className="mr-2 h-5 w-5" />
                            Sign In
                        </Link>
                     </Button>
                </div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-3 p-6 flex flex-col justify-end text-center bg-black/30 border-l border-white/10">
                {celebrationImage && (
                    <div className="relative aspect-[9/12] w-full rounded-lg overflow-hidden">
                        <Image
                            src={celebrationImage.imageUrl}
                            alt={celebrationImage.description}
                            data-ai-hint={celebrationImage.imageHint}
                            fill
                            className="object-cover"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                         <div className='absolute bottom-4 left-4 right-4 text-white' style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
                            <h3 className="font-bold text-xl">Joy Member Now</h3>
                            <p className='text-sm'>สมัครสมาชิก จะได้ไม่พลาด โอกาสสร้างรายได้</p>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    </div>
  );
}
