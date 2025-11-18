'use client';

import React from 'react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const downlineData = [
  {
    rank: 1,
    username: 'casey_jones',
    avatarId: 'female-archer-1',
    level: 'Level.0',
    joinDate: '2023-11-05',
    downlines: 5,
  },
  {
    rank: 2,
    username: 'april_oneil',
    avatarId: 'fighter-character',
    level: 'Level.0',
    joinDate: '2023-10-15',
    downlines: 4,
  },
  {
    rank: 3,
    username: 'donatello',
    avatarId: 'default-avatar',
    level: 'Level.0',
    joinDate: '2023-09-20',
    downlines: 3,
  },
  {
    rank: 4,
    username: 'michelangelo',
    avatarId: 'knight-1',
    level: 'Level.0',
    joinDate: '2023-09-01',
    downlines: 2,
  },
  {
    rank: 6,
    username: 'leonardo',
    avatarId: 'explorer-1',
    level: 'Level.0',
    joinDate: '2023-08-12',
    downlines: 1,
  },
  {
    rank: 7,
    username: 'raphael',
    avatarId: 'female-warrior-1',
    level: 'Level.0',
    joinDate: '2023-08-11',
    downlines: 0,
  },
];

export default function MemberSystemPage() {
  const calculateIncome = (downlines: number) => downlines * 1;
  const calculateFee = (income: number) => income * 0.03;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
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
              {downlineData.map((member) => {
                const avatar = PlaceHolderImages.find(
                  (p) => p.id === member.avatarId
                );
                const income = calculateIncome(member.downlines);
                const fee = calculateFee(income);

                return (
                  <TableRow key={member.rank}>
                    <TableCell>{member.rank}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={avatar?.imageUrl} />
                          <AvatarFallback>
                            {member.username.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{member.username}</span>
                      </div>
                    </TableCell>
                    <TableCell>{member.level}</TableCell>
                    <TableCell>{member.joinDate}</TableCell>
                    <TableCell>{member.downlines > 0 ? member.downlines : "ยังไม่มีผู้ติดตาม"}</TableCell>
                    <TableCell>
                      {member.downlines > 0 ? `$${income.toFixed(2)}` : "ยังไม่มีรายได้"}
                    </TableCell>
                    <TableCell>
                      {member.downlines > 0 ? `$${fee.toFixed(2)}` : "Free"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
