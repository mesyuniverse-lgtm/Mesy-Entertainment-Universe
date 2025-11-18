'use client';

import React, { useMemo } from 'react';
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { ArrowRight, CircleHelp, DollarSign, Percent, Wallet, Banknote } from 'lucide-react';

const downlineData = [
  {
    rank: 1,
    username: 'casey_jones',
    level: 'Level.0',
    joinDate: '2023-11-05',
    downlines: 5,
    monthlyIncome: 5,
    fee: 'pay3%',
    avatarId: 'female-warrior-1',
  },
  {
    rank: 2,
    username: 'april_oneil',
    level: 'Level.0',
    joinDate: '2023-10-15',
    downlines: 4,
    monthlyIncome: 4,
    fee: 'pay3%',
    avatarId: 'female-archer-1',
  },
    {
    rank: 3,
    username: 'donatello',
    level: 'Level.0',
    joinDate: '2023-09-20',
    downlines: 3,
    monthlyIncome: 3,
    fee: 'pay3%',
    avatarId: 'knight-1',
  },
  {
    rank: 4,
    username: 'michelangelo',
    level: 'Level.0',
    joinDate: '2023-09-01',
    downlines: 2,
    monthlyIncome: 2,
    fee: 'pay3%',
    avatarId: 'fighter-character',
  },
  {
    rank: 6,
    username: 'leonardo',
    level: 'Level.0',
    joinDate: '2023-08-12',
    downlines: 1,
    monthlyIncome: 1,
    fee: 'pay3%',
    avatarId: 'explorer-1',
  },
    {
    rank: 7,
    username: 'raphael',
    level: 'Level.0',
    joinDate: '2023-08-11',
    downlines: 0,
    monthlyIncome: 0,
    fee: 'Free',
    avatarId: 'default-avatar',
  },
];

const chartData = Array.from({ length: 24 }, (_, i) => ({
  name: `Month ${i}`,
  value: Math.floor(Math.random() * 30000) + 5000,
}));


export default function MemberSystemPage() {
    const levelInfo = useMemo(() => {
        const income = 18000;
        const serviceFee = income * 0.03;
        const totalIncome = income - serviceFee;
        return {
            level: 18,
            downline: 18000,
            income: income,
            serviceFee: serviceFee,
            totalIncome: totalIncome,
        };
    }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
      
      {/* Left Column */}
      <div className="lg:col-span-3">
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>Downline Members</CardTitle>
            <CardDescription>
              Here are the members in your direct downline.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
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
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={PlaceHolderImages.find(p => p.id === member.avatarId)?.imageUrl} />
                          <AvatarFallback>{member.username.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{member.username}</span>
                      </div>
                    </TableCell>
                    <TableCell>{member.level}</TableCell>
                    <TableCell>{member.joinDate}</TableCell>
                    <TableCell>{member.downlines}</TableCell>
                    <TableCell>...${member.monthlyIncome}</TableCell>
                    <TableCell>{member.fee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-2">
        <Card className="bg-card/50 h-full">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">
                  <span className="text-pink-400 font-bold">Level {levelInfo.level}</span>
                </CardTitle>
                <CardDescription className="text-yellow-400">Downline {levelInfo.downline.toLocaleString()}</CardDescription>
              </div>
              <div className="text-right">
                <p className="font-bold text-accent">Service Fee (3%)</p>
                <div className="flex items-center gap-1 mt-1 justify-end">
                    <Button variant="ghost" size="icon" className="w-7 h-7 bg-secondary rounded-full"><CircleHelp className="w-4 h-4 text-muted-foreground"/></Button>
                    <Button variant="default" size="icon" className="w-7 h-7 rounded-full"><ArrowRight className="w-4 h-4"/></Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis hide={true} />
                  <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="hsl(var(--muted-foreground))" opacity={0.3} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-between text-xs text-muted-foreground mt-1 px-2">
                 <span>June, $30,732</span>
                 <span>July, $30,032</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Banknote className="text-blue-400" />
                  <span className="font-semibold">Income</span>
                </div>
                <span className="font-bold text-lg text-yellow-400">${levelInfo.income.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Percent className="text-pink-400" />
                  <span className="font-semibold">Service Fee</span>
                </div>
                <span className="font-bold text-lg text-pink-400">-${levelInfo.serviceFee.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                   <Wallet className="text-green-400" />
                  <span className="font-semibold">Total Income</span>
                </div>
                <span className="font-bold text-lg text-green-400">${levelInfo.totalIncome.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
