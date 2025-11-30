
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
import { KeyRound, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// --- Data Simulation for Level 49 ---

const generateLevel49Members = () => {
  const members = [];
  for (let i = 49000; i <= 49999; i++) {
    const downlines = i; // Downline count matches the ID for this level
    const income = downlines * 1;
    const fee = income * 0.03;
    const netIncome = income - fee;

    members.push({
      id: i.toString(),
      isClaimed: false, // All are initially unclaimed
      displayName: `Avatar No.${i}`,
      email: 'waiting for member...',
      memberId: i,
      level: 49,
      downlineCount: downlines,
      income,
      fee,
      netIncome,
    });
  }
  return members;
};

// --- Helper Functions ---
const formatCurrency = (value: number) => value.toFixed(2);

// --- Component ---

export default function MemberSystemLevel49Page() {
  const level49Members = React.useMemo(() => generateLevel49Members(), []);
  
  const defaultAvatar = PlaceHolderImages.find(p => p.id === 'default-avatar');

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-primary tracking-wider">
                Level 49 Members Database (49,000-49,999)
              </CardTitle>
              <CardDescription>
                This system displays all pre-defined Member ID slots for Level 49. Activate your purchased ID to claim your slot.
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
        <CardContent>
            {/* Activation Section */}
            <Card className="mb-6 bg-secondary/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <KeyRound className="w-6 h-6 text-amber-400"/>
                        Activate Your Member ID
                    </CardTitle>
                    <CardDescription>
                        Enter the code for your purchased Level 49 Member ID to activate your account and claim your income slot.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                        <Input 
                            placeholder="Enter Your Purchased Member ID Code..."
                            className="h-11 text-base"
                        />
                        <Button className="h-11 text-base w-full sm:w-auto">
                            <CheckCircle className="mr-2 h-5 w-5"/>
                            Activate ID
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Level 49 Table */}
            <Card>
              <CardHeader>
                <CardTitle>Level 49 Members Database</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto" style={{maxHeight: '80vh'}}>
                    <Table>
                        <TableHeader className="sticky top-0 bg-card z-10">
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
                            {level49Members.map((member) => {
                                // This part would be dynamic in a real app, checking against claimed IDs
                                const isActived = member.isClaimed; 

                                return (
                                    <TableRow key={member.id} className={isActived ? 'bg-green-900/10' : 'bg-red-900/10'}>
                                    <TableCell className="font-mono">{member.memberId}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={defaultAvatar?.imageUrl} />
                                            <AvatarFallback>
                                            {member.displayName.substring(0, 1)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className='font-semibold'>{member.displayName}</p>
                                            <p className='text-xs text-muted-foreground'>{member.email}</p>
                                        </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className='font-mono'>{member.memberId}</TableCell>
                                    <TableCell>Level.{member.level}</TableCell>
                                    <TableCell className='text-center'>{member.downlineCount.toLocaleString()}</TableCell>
                                    <TableCell className='font-mono'>${formatCurrency(member.income)}</TableCell>
                                    <TableCell className='font-mono text-red-400'>-${formatCurrency(member.fee)}</TableCell>
                                    <TableCell className='font-mono text-green-400'>${formatCurrency(member.netIncome)}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-center">
                                            <div className={`w-5 h-5 rounded-full ${isActived ? 'bg-green-500' : 'bg-red-500'}`} title={isActived ? 'Actived' : 'Not Active'}></div>
                                        </div>
                                    </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
              </CardContent>
            </Card>
        </CardContent>
      </Card>
    </div>
  );
}
