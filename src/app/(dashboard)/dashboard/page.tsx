'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
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
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell
} from 'recharts';
import {
  AlertCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  FileText,
  Mail,
  MoreHorizontal,
  Search,
  Settings,
  Users,
  Wallet,
  Users2,
  DollarSign,
  TrendingUp,
  CreditCard,
  Trophy,
  UserPlus
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { membershipData } from '@/lib/data';


const biddingChartData = [
  { month: 'Jan', value: 186 },
  { month: 'Feb', value: 305 },
  { month: 'Mar', value: 237 },
  { month: 'Apr', value: 273 },
  { month: 'May', value: 201 },
  { month: 'Jun', value: 333 },
  { month: 'Jul', value: 295 },
  { month: 'Aug', value: 341 },
];

const biddingRateData = [
    { name: 'A', value: 89, color: '#FF5733' },
    { name: 'B', value: 67, color: '#33FF57' },
    { name: 'C', value: 37, color: '#3357FF' },
    { name: 'D', value: 61, color: '#F333FF' },
];

const incomeSourcesData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: Math.floor(Math.random() * (2000 - 500 + 1) + 500),
}));

const downlineData = [
  {
    rank: 1,
    username: 'casey_jones',
    level: 'Level.0',
    joinDate: '2023-11-05',
    downlines: 5,
    monthlyIncome: -5,
    fee: 'pay3%',
  },
  {
    rank: 2,
    username: 'april_oneil',
    level: 'Level.0',
    joinDate: '2023-10-15',
    downlines: 4,
    monthlyIncome: -4,
    fee: 'pay3%',
  },
    {
    rank: 3,
    username: 'donatello',
    level: 'Level.0',
    joinDate: '2023-09-20',
    downlines: 3,
    monthlyIncome: -53,
    fee: 'pay3%',
  },
  {
    rank: 4,
    username: 'michelangelo',
    level: 'Level.0',
    joinDate: '2023-09-01',
    downlines: 2,
    monthlyIncome: -2,
    fee: 'pay3%',
  },
  {
    rank: 6,
    username: 'leonardo',
    level: 'Level.0',
    joinDate: '2023-08-12',
    downlines: 1,
    monthlyIncome: -1,
    fee: 'pay3%',
  },
    {
    rank: 7,
    username: 'raphael',
    level: 'Level.0',
    joinDate: '2023-08-11',
    downlines: 0,
    monthlyIncome: 0,
    fee: 'Free',
  },
];

const initialStats = {
  totalMembers: 141748,
  newMembers: 128581,
  questComplete: 139595,
  totalApplicants: 156448,
  awardRecipients: 112596,
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

function formatCurrency(value: number) {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


export default function DashboardPage() {
    const [stats, setStats] = useState(initialStats);
    const [memberCount, setMemberCount] = useState(18000);

    const calculatedIncome = useMemo(() => {
      const grossIncome = memberCount;
      const serviceFee = grossIncome * 0.03;
      const netIncome = grossIncome - serviceFee;
      return { grossIncome, serviceFee, netIncome };
    }, [memberCount]);

    const currentLevel = useMemo(() => {
      if (memberCount >= 50000) {
        return 50;
      }
      const levelData = membershipData.find(l => memberCount < l.members);
      return levelData ? levelData.level - 1 : 50;
    }, [memberCount]);


    useEffect(() => {
        const interval = setInterval(() => {
        setStats(prevStats => ({
            totalApplicants: prevStats.totalApplicants + Math.floor(Math.random() * 5) + 1,
            totalMembers: prevStats.totalMembers + Math.floor(Math.random() * 5) + 1,
            newMembers: prevStats.newMembers + Math.floor(Math.random() * 3),
            questComplete: prevStats.questComplete + Math.floor(Math.random() * 2),
            awardRecipients: prevStats.awardRecipients + Math.floor(Math.random() * 4),
        }));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const today = new Date();
    const days = Array.from({ length: 13 }, (_, i) => {
        const d = new Date();
        d.setDate(today.getDate() - (10 - i));
        return d;
    });

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      {/* Header Stats */}
      <header className="p-4 md:p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
         <Card className="bg-gradient-to-br from-pink-500/80 to-red-600/80 text-white border-none p-4 flex flex-col justify-center">
            <p className="text-sm font-medium">จำนวนผู้สมัคร</p>
            <p className="text-4xl font-bold tracking-tighter">{(stats.totalApplicants || 0).toLocaleString()}</p>
        </Card>
        {statsCardsConfig.map((stat) => (
            <Card key={stat.key} className={`relative overflow-hidden text-white border-none bg-gradient-to-br ${stat.gradient} p-4 flex justify-between items-center`}>
                <div>
                    <p className="text-sm font-medium">{stat.title}</p>
                    <p className="text-4xl font-bold">{(stats[stat.key] || 0).toLocaleString()}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">{stat.icon}</div>
            </Card>
        ))}
         <Card className="bg-gradient-to-br from-yellow-500/80 to-amber-700/80 text-white border-none p-4 flex justify-between items-center">
             <div>
                <p className="text-sm font-medium">Award Recipients</p>
                <p className="text-4xl font-bold">{(stats.awardRecipients || 0).toLocaleString()}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-full"><Trophy className="h-8 w-8"/></div>
        </Card>
      </header>

      {/* Ticker */}
      <div className="relative flex overflow-hidden whitespace-nowrap py-2 mx-4 md:mx-6 border-y border-border">
        <div className="animate-marquee flex gap-8 text-sm text-muted-foreground items-center">
            <p>Aria has received a Legendary Item: Shadowfire Bow! 🏹</p>
            <p>PixelPioneer reached Level 45! 💎</p>
            <p>CyberNinja acquired the legendary 'Blade of Echoes'. ⚔️</p>
            <p>Kael reached Level 15! ✨</p>
        </div>
        <div className="animate-marquee2 absolute top-2 left-0 flex gap-8 text-sm text-muted-foreground items-center">
            <p>Aria has received a Legendary Item: Shadowfire Bow! 🏹</p>
            <p>PixelPioneer reached Level 45! 💎</p>
            <p>CyberNinja acquired the legendary 'Blade of Echoes'. ⚔️</p>
            <p>Kael reached Level 15! ✨</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="flex-1 grid grid-cols-12 gap-6 p-4 md:p-6">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-2 space-y-6">
          <Card className="bg-card/50">
            <CardHeader>
                <CardTitle className="text-sm">Today, {today.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='p-2 rounded-lg bg-secondary/50 text-center'>
                    <div className="flex justify-between items-center text-sm mb-2">
                        <ChevronLeft className="w-4 h-4" />
                        <span>August</span>
                        <ChevronRight className="w-4 h-4" />
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-xs text-muted-foreground">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1 mt-1 text-xs">
                        {Array.from({ length: 31 }, (_, i) => (
                            <div key={i} className={cn("p-1 rounded", i+1 === 21 && "bg-primary text-primary-foreground")}>{i + 1}</div>
                        ))}
                    </div>
                </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Menu</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start gap-2"><Users2 className="text-muted-foreground" /> Leads</Button>
                <Button variant="ghost" className="w-full justify-start gap-2"><Mail className="text-muted-foreground" /> Emails</Button>
                <Button variant="secondary" className="w-full justify-start gap-2" asChild>
                  <Link href="/dashboard/member-system">
                    <Users className="text-muted-foreground" /> System's
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2"><FileText className="text-muted-foreground" /> Page Views</Button>
                <Button variant="ghost" className="w-full justify-start gap-2"><TrendingUp className="text-muted-foreground" /> Reports</Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Center Column */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <Card className="bg-card/50">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Login Rewards</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Button variant="ghost" size="sm" className="bg-secondary">Days</Button>
                        <Button variant="ghost" size="sm">Weeks</Button>
                        <Button variant="ghost" size="sm">Months</Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex gap-1 overflow-x-auto pb-4">
              {days.map((day, index) => (
                <div key={index} className={cn("rounded-lg p-2 text-center shrink-0 w-16", day.getDate() === 10 ? "bg-primary text-primary-foreground" : "bg-secondary")}>
                  <p className="text-lg font-bold">{String(day.getDate()).padStart(2, '0')}</p>
                  <p className="text-xs">{day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-card/50">
             <CardHeader>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {['All', 'Cash', 'Check', 'Wire Transfer', 'Mobile Payment', 'Cryptocurrency', 'Gift Card'].map((item, index) => (
                        <Button key={item} variant={index === 0 ? 'secondary' : 'ghost'} size="sm">{item}</Button>
                    ))}
                </div>
             </CardHeader>
             <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold mb-2">Bidding Chart</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={biddingChartData}>
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                   <p className="font-semibold mt-6 mb-2">Bidding Rate</p>
                   <div className="grid grid-cols-2 gap-4">
                     {biddingRateData.map((rate) => (
                         <div key={rate.name} className="bg-secondary/50 rounded-lg p-4 text-center">
                             <div className="relative w-24 h-24 mx-auto">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={[{value: rate.value}, {value: 100-rate.value}]} dataKey="value" innerRadius="80%" outerRadius="100%" startAngle={90} endAngle={450} cornerRadius={5}>
                                             <Cell fill={rate.color} />
                                             <Cell fill="hsl(var(--secondary))" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">{rate.value}%</div>
                             </div>
                         </div>
                     ))}
                   </div>
                </div>
                 <div>
                    <div className="flex justify-between items-center mb-2">
                        <p className="font-semibold">Income Sources</p>
                        <div className="flex items-center gap-2">
                            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                             <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="w-6 h-6"><div className="w-4 h-4 rounded-sm border border-muted-foreground">#</div></Button>
                                <Button variant="ghost" size="icon" className="w-6 h-6"><Users2 className="w-4 h-4 text-muted-foreground"/></Button>
                            </div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={150}>
                        <AreaChart data={incomeSourcesData} margin={{ top: 20 }}>
                            <defs>
                                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#colorIncome)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                    
                 </div>
             </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Income Calculator</CardTitle>
              <CardDescription>Estimate your potential monthly earnings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <label htmlFor="member-count-input" className="text-sm font-medium mb-2 block">Number of Members</label>
                    <Input 
                        id="member-count-input"
                        type="number"
                        placeholder="e.g., 18000"
                        value={memberCount}
                        onChange={(e) => setMemberCount(Math.min(50000, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="w-full"
                    />
                </div>
                
                <div className="space-y-2 rounded-lg bg-secondary/50 p-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Gross Income (USD)</span>
                        <span>${formatCurrency(calculatedIncome.grossIncome)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Service Fee (3%)</span>
                        <span className="text-red-400">-${formatCurrency(calculatedIncome.serviceFee)}</span>
                    </div>
                     <div className="flex justify-between items-center text-md font-bold pt-2 border-t border-border">
                        <span className="text-primary">Net Income (USD)</span>
                        <span className="text-primary">${formatCurrency(calculatedIncome.netIncome)}</span>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm text-muted-foreground">Your estimated level</p>
                    <p className="text-4xl font-bold text-primary">{currentLevel}</p>
                </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Budget usage</CardTitle>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="w-6 h-6"><CircleHelp className="w-4 h-4 text-muted-foreground"/></Button>
                        <Button variant="ghost" size="icon" className="w-6 h-6"><ArrowRight className="w-4 h-4 text-muted-foreground"/></Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">$50,734</p>
                <Progress value={80} className="my-2 h-2 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:via-pink-500 [&>div]:to-orange-500" />
                 <div className="flex justify-between text-xs text-muted-foreground">
                    <span>50%</span>
                    <span>30%</span>
                    <span>20%</span>
                </div>
                <div className="flex gap-4 text-xs mt-2">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-muted-foreground" />Unused</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500" />Used</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-pink-500" />Reserved</span>
                </div>
            </CardContent>
          </Card>
           <div className="grid grid-cols-2 gap-4">
                <Card className="bg-blue-900/50 border-blue-500/50 text-center p-3">
                    <p className="text-sm">Member Level</p>
                    <p className="text-3xl font-bold">{currentLevel}</p>
                </Card>
                 <Card className="bg-blue-900/50 border-blue-500/50 text-center p-3">
                    <p className="text-sm">Downlines</p>
                    <p className="text-3xl font-bold">{memberCount.toLocaleString()}</p>
                </Card>
                 <Card className="bg-blue-900/50 border-blue-500/50 text-center p-3">
                    <p className="text-sm">Members Services Fees</p>
                    <p className="text-3xl font-bold">3%</p>
                </Card>
                 <Card className="bg-blue-900/50 border-blue-500/50 text-center p-3">
                    <p className="text-sm">Market Services Fees</p>
                    <p className="text-3xl font-bold">1%</p>
                </Card>
           </div>
        </div>

        {/* Bottom Full-width table */}
        <div className="col-span-12">
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle>Downline Members</CardTitle>
                    <CardDescription>Here are the members in your direct downline.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead>Join Date</TableHead>
                                <TableHead>จำนวนดาวน์ไลน์</TableHead>
                                <TableHead>Monthly Income</TableHead>
                                <TableHead>หัก3%จากรายได้</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {downlineData.map((member) => (
                                <TableRow key={member.rank}>
                                    <TableCell>{member.rank}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={PlaceHolderImages.find(p=>p.id === 'default-avatar')?.imageUrl}/>
                                                <AvatarFallback>{member.username.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span>{member.username}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{member.level}</TableCell>
                                    <TableCell>{member.joinDate}</TableCell>
                                    <TableCell>{member.downlines}</TableCell>
                                    <TableCell>${member.monthlyIncome}</TableCell>
                                    <TableCell>{member.fee}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
