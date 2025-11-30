
'use client';

import React from 'react';
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
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Crown, CheckCircle, ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- Data Simulation ---

const level50Data = {
    memberId: 50000,
    displayName: 'Level 50 Member',
    email: 'fixed.income@mesy.io',
    level: 50,
    downlineCount: 50000,
    income: 50000,
    fee: 1500.00,
    netIncome: 48500.00,
    isActived: true
};

const hallOfFame = [
  {
    rank: 1,
    displayName: 'mesy.universe',
    memberId: '001',
    dateAchieved: '2025-01-01',
    avatarId: 'fighter-character',
  },
  // Add more members as they reach Level 50
];

const formatCurrency = (value: number) => value.toFixed(2);


// --- Component ---
export default function MemberSystemLevel50Page() {
  const defaultAvatar = PlaceHolderImages.find(p => p.id === 'default-avatar');
    
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <Card className="bg-card/50 border-amber-400/30">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-amber-400 tracking-wider flex items-center gap-2">
                <Crown className="w-8 h-8" />
                Level 50: The Hall of Fame
              </CardTitle>
              <CardDescription>
                A tribute to the members who have reached the pinnacle of the MESY Universe.
              </CardDescription>
            </div>
            <Button asChild variant="outline">
              <Link href="/members/systems">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Levels
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Congratulations Section */}
          <Card className="bg-gradient-to-r from-amber-500/10 to-primary/10 border-amber-500/50">
            <CardHeader className="text-center items-center">
              <Crown className="w-16 h-16 text-amber-400" />
              <CardTitle className="text-3xl text-white">Congratulations!</CardTitle>
              <CardDescription className="max-w-2xl mx-auto text-lg">
                You have ascended to Level 50. Your income is now fixed for life according to the plan, and you have unlocked exclusive benefits as a pillar of the MESY community.
              </CardDescription>
            </CardHeader>
             <CardContent className="flex flex-col items-center gap-4">
                 <div className="flex flex-wrap justify-center gap-4">
                    <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="font-semibold">Lifetime Fixed Income</span>
                    </div>
                     <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="font-semibold">Exclusive Avatar Badge</span>
                    </div>
                     <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="font-semibold">Priority Support</span>
                    </div>
                 </div>
            </CardContent>
          </Card>

          {/* Level 50 Database Table */}
          <Card>
            <CardHeader>
                <CardTitle>Level 50 Database</CardTitle>
                <CardDescription>Fixed income structure for all members who achieve Level 50.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Member ID</TableHead>
                            <TableHead>Level</TableHead>
                            <TableHead className='text-center'>Downline</TableHead>
                            <TableHead>Income</TableHead>
                            <TableHead>Fee (3%)</TableHead>
                            <TableHead>Net-Income</TableHead>
                            <TableHead className='text-center'>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className='bg-green-900/20'>
                            <TableCell className="font-mono">{level50Data.memberId}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={defaultAvatar?.imageUrl} />
                                    <AvatarFallback>
                                    L50
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className='font-semibold'>{level50Data.displayName}</p>
                                    <p className='text-xs text-muted-foreground'>{level50Data.email}</p>
                                </div>
                                </div>
                            </TableCell>
                            <TableCell className='font-mono'>{level50Data.memberId}</TableCell>
                            <TableCell>Level.{level50Data.level}</TableCell>
                            <TableCell className='text-center'>{level50Data.downlineCount.toLocaleString()}</TableCell>
                            <TableCell className='font-mono'>${formatCurrency(level50Data.income)}</TableCell>
                            <TableCell className='font-mono text-red-400'>-${formatCurrency(level50Data.fee)}</TableCell>
                            <TableCell className='font-mono text-green-400'>${formatCurrency(level50Data.netIncome)}</TableCell>
                            <TableCell>
                                <div className="flex justify-center">
                                    <div className="w-5 h-5 rounded-full bg-green-500" title="Active"></div>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
          </Card>

          {/* Hall of Fame Table */}
          <Card>
            <CardHeader>
              <CardTitle>Level 50 Achievers (Hall of Fame)</CardTitle>
              <CardDescription>Members who have successfully reached the final level.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Member ID</TableHead>
                    <TableHead>Date Achieved</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hallOfFame.map((member) => {
                    const avatar = PlaceHolderImages.find(p => p.id === member.avatarId);
                    return (
                      <TableRow key={member.rank} className="hover:bg-amber-500/5">
                        <TableCell className="font-bold text-lg">{member.rank}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={avatar?.imageUrl} />
                              <AvatarFallback>
                                {member.displayName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-semibold">{member.displayName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono">{member.memberId}</TableCell>
                        <TableCell>{member.dateAchieved}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
