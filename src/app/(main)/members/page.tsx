'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Gem, Users, Star, Search, UserPlus, Trophy, Radio, Gift, Play } from 'lucide-react';
import { membershipData } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

const initialStats = {
  totalApplicants: 156214,
  totalMembers: 141493,
  newMembers: 128499,
  questComplete: 139554,
  awardRecipients: 112456,
};

const statsCardsConfig = [
  {
    title: 'Total Members',
    key: 'totalMembers' as keyof typeof initialStats,
    icon: <Users className="h-8 w-8" />,
    gradient: 'from-blue-500/80 to-blue-800/80',
  },
  {
    title: 'New Members (Today)',
    key: 'newMembers' as keyof typeof initialStats,
    icon: <UserPlus className="h-8 w-8" />,
    gradient: 'from-green-500/80 to-green-800/80',
  },
  {
    title: 'Quest Complete',
    key: 'questComplete' as keyof typeof initialStats,
    icon: <Trophy className="h-8 w-8" />,
    gradient: 'from-purple-500/80 to-purple-800/80',
  },
];

const downlineData = [
  {
    id: 'usr1',
    username: 'Aetheria',
    avatarId: 'female-archer-1',
    level: 15,
    joinDate: '2024-05-10',
    stars: 5,
    income: 150.5,
  },
  {
    id: 'usr2',
    username: 'Zephyr',
    avatarId: 'fighter-character',
    level: 12,
    joinDate: '2024-04-22',
    stars: 4,
    income: 120.0,
  },
  {
    id: 'usr3',
    username: 'Seraphina',
    avatarId: 'female-warrior-1',
    level: 18,
    joinDate: '2024-06-01',
    stars: 5,
    income: 185.75,
  },
  {
    id: 'usr4',
    username: 'Kael',
    avatarId: 'knight-1',
    level: 10,
    joinDate: '2024-03-15',
    stars: 3,
    income: 95.2,
  },
   {
    id: 'usr5',
    username: 'Lyra',
    avatarId: 'explorer-1',
    level: 14,
    joinDate: '2024-05-18',
    stars: 4,
    income: 140.0,
  },
    {
    id: 'usr6',
    username: 'Orion',
    avatarId: 'default-avatar',
    level: 9,
    joinDate: '2024-02-28',
    stars: 2,
    income: 88.0,
  },
];

const leaderboard = [
    { rank: 55, name: 'Dean Malcom', score: '59,365', avatarId: 'default-avatar'},
    { rank: 56, name: 'Boyd Rusty', score: '57,063', avatarId: 'fighter-character'},
    { rank: 57, name: 'Loreen Romy', score: '56,125', avatarId: 'female-archer-1'},
    { rank: 58, name: 'You', score: '55,365', avatarId: 'female-warrior-1', isCurrentUser: true},
    { rank: 59, name: 'Caitlyn Liana', score: '52,305', avatarId: 'knight-1'},
    { rank: 60, name: 'Philip Hall', score: '49,333', avatarId: 'explorer-1'},
];

const newsFeed = [
    { icon: <Gem/>, text: "PixelPioneer reached Level 45!", time: "2h ago" },
    { icon: <Gem/>, text: "CyberNinja acquired the legendary 'Blade of Echoes'.", time: "5h ago" },
    { icon: <Gem/>, text: "QuantumQueen unlocked 'Master of Dimensions' achievement.", time: "1d ago" },
    { icon: <Gem/>, text: "GalacticGamer reached Level 49!", time: "2d ago" },
];

const promotions = [
    {
        title: "Summer Quest Festival",
        description: "Join the special summer event for exclusive rewards and items!",
        imageId: 'fantasy-landscape-1'
    },
    {
        title: "Sponsored: Neon Nights Gear",
        description: "Get the latest cyber-enhanced gear from our sponsors. Limited time only.",
        imageId: 'enchanted-forest-1'
    }
];

function formatCurrency(value: number) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function MembershipsPage() {
  const [memberCount, setMemberCount] = useState(18000);
  const [stats, setStats] = useState(initialStats);
  const promoVideoImage = PlaceHolderImages.find(i => i.id === 'rose-background');


  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => ({
        totalApplicants: prevStats.totalApplicants + Math.floor(Math.random() * 5) + 1,
        totalMembers: prevStats.totalMembers + Math.floor(Math.random() * 5) + 1,
        newMembers: prevStats.newMembers + Math.floor(Math.random() * 3),
        questComplete: prevStats.questComplete + Math.floor(Math.random() * 2),
        awardRecipients: prevStats.awardRecipients + Math.floor(Math.random() * 4),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const calculatedIncome = useMemo(() => {
    const grossIncome = memberCount;
    const serviceFee = grossIncome * 0.03;
    const netIncome = grossIncome - serviceFee;
    return { grossIncome, serviceFee, netIncome };
  }, [memberCount]);

  const currentLevel = useMemo(() => {
    const levelData = membershipData.find(l => memberCount < l.members);
    return levelData ? levelData.level -1 : 50;
  }, [memberCount]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Header Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="lg:col-span-1 bg-gradient-to-br from-pink-500/80 to-red-600/80 flex flex-col items-center justify-center text-center p-4 text-white border-none">
            <div className="flex items-center gap-2">
                <Users className="w-5 h-5"/>
                <span className="font-semibold">จำนวนผู้สมัคร</span>
            </div>
            <p className="text-5xl font-bold tracking-tighter">
                {(stats.totalApplicants || 0).toLocaleString()}
            </p>
        </Card>
        {statsCardsConfig.map((stat, index) => (
            <Card key={index} className={`relative overflow-hidden text-white border-none bg-gradient-to-br ${stat.gradient}`}>
                <div className="p-6 flex flex-row items-center justify-between space-y-0">
                    <div className="flex flex-col space-y-1">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <div className="text-4xl font-bold">{(stats[stat.key] || 0).toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-white/20 rounded-full">
                        {stat.icon}
                    </div>
                </div>
            </Card>
        ))}
         <Card className="lg:col-span-1 bg-card/50 border-primary/20 flex flex-col items-center justify-center text-center p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
                <Gift className="w-5 h-5"/>
                <span className="font-semibold">ผู้รับรางวัล</span>
            </div>
            <p className="text-5xl font-bold tracking-tighter text-amber-400">
                {(stats.awardRecipients || 0).toLocaleString()}
            </p>
        </Card>
      </div>

       {/* Ticker */}
      <div className="relative flex overflow-hidden whitespace-nowrap py-2">
        <div className="animate-marquee flex gap-8 text-sm text-muted-foreground items-center">
            <p>PixelPioneer reached Level 45! 💎</p>
            <p>CyberNinja acquired the legendary 'Blade of Echoes'. ⚔️</p>
            <p>Kael reached Level 15! ✨</p>
            <p>Aria has received a Legendary Item: Shadowfire Bow! 🏹</p>
        </div>
        <div className="animate-marquee2 absolute top-2 left-0 flex gap-8 text-sm text-muted-foreground items-center">
             <p>PixelPioneer reached Level 45! 💎</p>
            <p>CyberNinja acquired the legendary 'Blade of Echoes'. ⚔️</p>
            <p>Kael reached Level 15! ✨</p>
            <p>Aria has received a Legendary Item: Shadowfire Bow! 🏹</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <aside className="lg:col-span-3 space-y-6">
            <Card className="bg-card/50 border-primary/20 p-6 text-center">
                <h3 className="font-semibold text-muted-foreground">สำหรับสมาชิกผู้ยืนยันตนแล้ว</h3>
                <div className="my-4 p-4 bg-black/30 rounded-lg">
                    <h4 className="text-2xl font-bold text-primary">Members Login Now</h4>
                </div>
                <Button asChild className="w-full">
                    <Link href="/dashboard">Now</Link>
                </Button>
                <p className="text-xs text-muted-foreground mt-4">หากยังไม่ยืนยันตัวตน กรุณายืนยันตน เพื่อจะได้ไม่พลาดโอกาสสร้างรายได้</p>
            </Card>
            <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-primary text-md">MESY Weekly Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {leaderboard.map(member => (
                            <div key={member.rank} className={`flex items-center gap-3 p-2 rounded-md ${member.isCurrentUser ? 'bg-primary/20' : ''}`}>
                                <span className="text-sm font-bold text-muted-foreground w-6">{member.rank}</span>
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={PlaceHolderImages.find(p=>p.id === member.avatarId)?.imageUrl} alt={member.name} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <p className="font-semibold flex-1">{member.name}</p>
                                <p className="text-sm font-mono text-primary">{member.score}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

             <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-md">News Feed</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {newsFeed.map((item, index) => (
                             <div key={index} className="flex gap-3">
                                <div className="text-primary mt-1">{item.icon}</div>
                                <div>
                                    <p className="text-sm">{item.text}</p>
                                    <p className="text-xs text-muted-foreground">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </aside>

        {/* Center Column */}
        <main className="lg:col-span-6 space-y-6">
            <Card className="bg-card/50 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-primary font-headline tracking-widest">MESY MEMBERS</CardTitle>
                <p className="text-3xl font-bold">Downline Network</p>
                <CardDescription>
                  Manage your downline members and track your income potential.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <Card className="bg-secondary/40 border-border">
                    <CardHeader>
                      <CardTitle>Income Calculator</CardTitle>
                      <CardDescription>
                        Estimate your potential monthly earnings.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="member-count-input"
                          className="text-sm font-medium"
                        >
                          Number of Members
                        </label>
                        <Input
                          id="member-count-input"
                          type="number"
                          placeholder="e.g., 18000"
                          value={memberCount}
                          onChange={(e) =>
                            setMemberCount(
                              Math.min(50000, Math.max(0, parseInt(e.target.value) || 0))
                            )
                          }
                        />
                      </div>

                      <div className="space-y-4 rounded-lg bg-background/50 p-4">
                        <div className="flex justify-between items-baseline">
                           <div>
                            <span className="text-muted-foreground">Gross Income</span>
                            <p className="text-xs text-muted-foreground">(USD)</p>
                           </div>
                          <span className='font-mono'>${formatCurrency(calculatedIncome.grossIncome)}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-muted-foreground">Service Fee (3%)</span>
                          <span className="text-red-400 font-mono">-${formatCurrency(calculatedIncome.serviceFee)}</span>
                        </div>
                        <div className="flex justify-between items-baseline text-lg font-bold">
                          <div>
                            <span className="text-primary">Net Income</span>
                            <p className="text-xs text-primary/80 font-normal">(USD)</p>
                          </div>
                          <span className="text-primary font-mono">${formatCurrency(calculatedIncome.netIncome)}</span>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Your estimated level</p>
                        <p className="text-4xl font-bold text-primary">{currentLevel}</p>
                      </div>

                    </CardContent>
                  </Card>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2">Downline Members</h3>
                    <p className="text-sm text-muted-foreground mb-4">Your direct and indirect network members.</p>
                     <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search by username or level..." className="pl-9" />
                    </div>
                  </div>
                 
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead className="text-center">Stars</TableHead>
                        <TableHead className="text-right">Income (USD)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {downlineData.map((member) => {
                        const avatar = PlaceHolderImages.find(
                          (p) => p.id === member.avatarId
                        );
                        return (
                          <TableRow key={member.id} className="hover:bg-primary/10">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={avatar?.imageUrl} />
                                  <AvatarFallback>
                                    {member.username.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                  {member.username}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary">Lv. {member.level}</Badge>
                            </TableCell>
                            <TableCell>{member.joinDate}</TableCell>
                            <TableCell className="text-center">
                               <div className='flex justify-center items-center gap-1 text-yellow-400'>
                                {Array.from({ length: member.stars }).map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                               </div>
                            </TableCell>
                            <TableCell className="text-right font-mono">
                              ${formatCurrency(member.income)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
              </CardContent>
            </Card>
        </main>

        {/* Right Column */}
        <aside className="lg:col-span-3 space-y-6">
            <Card className="bg-card/50 border-primary/20 overflow-hidden">
                {promoVideoImage && 
                    <div className="relative aspect-video">
                        <Image src={promoVideoImage.imageUrl} alt="Featured Promotion" fill className="object-cover"/>
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Button variant="ghost" size="icon" className="w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm">
                                <Play className="w-8 h-8 text-white fill-white"/>
                            </Button>
                        </div>
                    </div>
                }
                <CardContent className="p-4">
                    <CardTitle className="text-lg">Featured Promotion</CardTitle>
                    <CardDescription className="text-sm mb-4">Discover the new 'Chrono Blade' in the marketplace!</CardDescription>
                    <Button className="w-full" variant="secondary">Watch Trailer</Button>
                </CardContent>
            </Card>

            <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-md">Featured Promotions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   {promotions.map(promo => {
                       const promoImage = PlaceHolderImages.find(i => i.id === promo.imageId)
                       return (
                            <div key={promo.title} className="rounded-lg overflow-hidden relative border border-primary/20">
                                {promoImage && <Image src={promoImage.imageUrl} alt={promo.title} width={400} height={200} className="w-full h-auto" />}
                                <div className="p-3 bg-black/50 backdrop-blur-sm absolute bottom-0 inset-x-0">
                                    <p className="font-semibold text-sm">{promo.title}</p>
                                    <p className="text-xs text-muted-foreground">{promo.description}</p>
                                </div>
                            </div>
                       )
                   })}
                </CardContent>
            </Card>
        </aside>
      </div>
    </div>
  );
}
