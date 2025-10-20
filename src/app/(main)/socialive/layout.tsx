
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Users, Crown, Clapperboard, Radio, UserPlus, Shield, Home, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';

export default function SocialiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const popularMembers = [
    { name: 'Aria', avatarId: 'female-archer-1' },
    { name: 'Kael', avatarId: 'fighter-character' },
    { name: 'Chronicler', avatarId: 'knight-1' },
    { name: 'Seraphina', avatarId: 'explorer-1' },
  ];

  const navItems = [
    { name: 'Social Video', href: '/socialive/video', icon: Clapperboard },
    { name: 'Live', href: '/socialive/live', icon: Radio },
    { name: 'Friends', href: '/socialive/friends', icon: Users },
    { name: 'Followers', href: '/socialive/followers', icon: UserPlus },
    { name: 'Groups', href: '/socialive/groups', icon: Shield },
    { name: 'Timeline', href: '/socialive/timeline', icon: Home },
  ];

  return (
    <div className="container py-8">
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .marquee-text {
          animation: marquee 20s linear infinite;
        }
      `}</style>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <aside className="hidden lg:block lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Users className="text-primary"/> Online Now
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">1,234</p>
                        <p className="text-sm text-muted-foreground">Members currently active</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                           <Crown className="text-yellow-400"/> Popular Members
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {popularMembers.map((member, index) => (
                            <div key={member.name} className="flex items-center gap-3 hover:bg-secondary/50 p-2 rounded-md transition-colors">
                                <span className="font-bold text-lg w-6 text-center">{index + 1}</span>
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={PlaceHolderImages.find(i => i.id === member.avatarId)?.imageUrl} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-sm">{member.name}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-2 space-y-6">
                {/* Marquee */}
                <div className="bg-secondary/50 rounded-lg p-2 overflow-hidden whitespace-nowrap">
                    <div className="marquee-text inline-block">
                        <span className="text-primary font-semibold mx-4">Aria has found a Legendary Sword!</span>
                        <span className="text-yellow-400 font-semibold mx-4">Kael completed the 'Dragon Slayer' quest!</span>
                        <span className="text-pink-400 font-semibold mx-4">Seraphina just claimed a Rare Avatar Chest!</span>
                    </div>
                </div>
                
                {/* Horizontal Navbar */}
                <div className="border-b">
                    <nav className="-mb-px flex gap-4 overflow-x-auto">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-2 shrink-0 border-b-2 px-3 pb-3 text-sm font-medium',
                                    pathname.startsWith(item.href)
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Page Content */}
                <div>
                  {children}
                </div>
            </main>

            {/* Right Sidebar */}
             <aside className="hidden lg:block lg:col-span-1 space-y-6">
                <Card className="bg-card/50">
                    <CardHeader>
                        <CardTitle>Sponsored</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="relative aspect-video rounded-md overflow-hidden group">
                           <Image 
                                src={PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl || ''}
                                alt="Sponsored Ad"
                                data-ai-hint="fantasy item"
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4">
                                <h3 className="text-white text-lg font-bold" style={{textShadow: '1px 1px 3px #000'}}>Kael's Forge</h3>
                                <p className="text-white/80 text-xs mt-1" style={{textShadow: '1px 1px 2px #000'}}>Legendary weapons, crafted by a master.</p>
                                <Button size="sm" className="mt-3">
                                    <ShoppingCart className="mr-2 h-4 w-4"/> Visit Shop
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="border-dashed border-primary/50 bg-primary/10 text-center">
                    <CardContent className="p-6 flex flex-col items-center justify-center">
                        <Star className="h-8 w-8 text-primary mb-2"/>
                        <h3 className="font-semibold">Your Ad Here</h3>
                        <p className="text-sm text-muted-foreground mt-1">Reach thousands of MESY members. Purchase an ad spot now!</p>
                         <Button size="sm" variant="secondary" className="mt-4">Learn More</Button>
                    </CardContent>
                </Card>
            </aside>
        </div>
    </div>
  );
}
