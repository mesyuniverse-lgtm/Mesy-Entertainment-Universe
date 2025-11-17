'use client';

import { useState, useMemo } from 'react';
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
import { Gem, Users, TrendingUp, Star, Search } from 'lucide-react';
import { membershipData } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

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
    stars: 3,
    income: 88.0,
  },
];

function formatCurrency(value: number) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function MembershipsPage() {
  const [memberCount, setMemberCount] = useState(18530);

  const calculatedIncome = useMemo(() => {
    const grossIncome = memberCount;
    const serviceFee = grossIncome * 0.03;
    const netIncome = grossIncome - serviceFee;
    return { grossIncome, serviceFee, netIncome };
  }, [memberCount]);

  const currentLevel = useMemo(() => {
    for (let i = membershipData.length - 1; i >= 0; i--) {
        if (memberCount >= membershipData[i-1]?.members) {
            return membershipData[i-1]?.level ?? 0;
        }
    }
    return 0;
  }, [memberCount]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Downline Network</h1>
        <p className="text-muted-foreground">
          Manage your downline members and track your income potential.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="text-primary"/> Total Members</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">{memberCount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">+12 since last hour</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp className="text-primary"/> Net Income</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">${formatCurrency(calculatedIncome.netIncome)}</p>
                <p className="text-sm text-muted-foreground">Monthly Estimate</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Gem className="text-primary"/> Current Level</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">{currentLevel}</p>
                 <p className="text-sm text-muted-foreground">Next level at {membershipData.find(l => l.level === currentLevel + 1)?.members.toLocaleString()} members</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Downline Members</CardTitle>
              <CardDescription>
                Your direct and indirect network members.
              </CardDescription>
               <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by username or level..." className="pl-9" />
              </div>
            </CardHeader>
            <CardContent>
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
                      <TableRow key={member.id}>
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
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Income Calculator</CardTitle>
              <CardDescription>
                Estimate your potential monthly earnings based on network size.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <label
                  htmlFor="member-count-input"
                  className="text-sm font-medium mb-2 block"
                >
                  Number of Members in Your Downline
                </label>
                <Input
                  id="member-count-input"
                  type="number"
                  placeholder="e.g., 5000"
                  value={memberCount}
                  onChange={(e) =>
                    setMemberCount(
                      Math.min(50000, Math.max(0, parseInt(e.target.value) || 0))
                    )
                  }
                  className="w-full h-12 text-lg"
                />
              </div>

              <div className="space-y-4 rounded-lg bg-secondary/50 p-4 border border-border">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Gross Income</span>
                  <span>${formatCurrency(calculatedIncome.grossIncome)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Service Fee (3%)</span>
                  <span className="text-red-400">
                    -${formatCurrency(calculatedIncome.serviceFee)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-border">
                  <span className="text-primary">Net Income (USD)</span>
                  <span className="text-primary">
                    ${formatCurrency(calculatedIncome.netIncome)}
                  </span>
                </div>
              </div>
                 <Button className="w-full h-12 text-lg">Invite Members</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
