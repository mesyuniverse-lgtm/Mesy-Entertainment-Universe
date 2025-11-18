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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

export default function MemberSystemPage() {
  const { firestore, user } = useFirebase();

  const downlineQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, `users/${user.uid}/downline`));
  }, [firestore, user]);

  const { data: downlineData, isLoading, error } = useCollection(downlineQuery);

  const calculateIncome = (downlines: number) => downlines * 1;
  const calculateFee = (income: number) => income * 0.03;

  const renderContent = () => {
    if (isLoading) {
      return (
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-4 w-6" /></TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </TableCell>
              <TableCell><Skeleton className="h-4 w-16" /></TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              <TableCell><Skeleton className="h-4 w-12" /></TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      );
    }
    
    if (error) {
       return (
        <TableBody>
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              <div className="flex flex-col items-center gap-2 py-8 text-red-500">
                <AlertCircle className="h-8 w-8" />
                <p>Error loading downline members.</p>
                <p className="text-xs text-muted-foreground">{error.message}</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    if (!downlineData || downlineData.length === 0) {
      return (
        <TableBody>
          <TableRow>
            <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
              You do not have any downline members yet.
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    return (
      <TableBody>
        {downlineData.map((member, index) => {
          const avatar = PlaceHolderImages.find((p) => p.id === 'default-avatar');
          // Assuming each downline document *is* one member, so downlines count is 1
          // This might need adjustment based on your data structure.
          const downlinesCount = member.downlines || 0; 
          const income = calculateIncome(downlinesCount);
          const fee = calculateFee(income);

          return (
            <TableRow key={member.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar || avatar?.imageUrl} />
                    <AvatarFallback>
                      {member.username ? member.username.charAt(0) : '?'}
                    </AvatarFallback>
                  </Avatar>
                  <span>{member.username}</span>
                </div>
              </TableCell>
              <TableCell>Level.{member.level}</TableCell>
              <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
              <TableCell>{downlinesCount > 0 ? downlinesCount : "ยังไม่มีผู้ติดตาม"}</TableCell>
              <TableCell>
                {downlinesCount > 0 ? `$${income.toFixed(2)}` : "ยังไม่มีรายได้"}
              </TableCell>
              <TableCell>
                {downlinesCount > 0 ? `$${fee.toFixed(2)}` : "Free"}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    );
  };

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
            {renderContent()}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
