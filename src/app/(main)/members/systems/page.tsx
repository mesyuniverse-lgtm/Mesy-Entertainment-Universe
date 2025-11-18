'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
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
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useFirebase, useCollection, useMemoFirebase, useDoc } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ArrowDown, ArrowUp, DollarSign, Users, CheckCircle, Settings, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function MemberSystemPage() {
  const { firestore, user } = useFirebase();

  const userProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, `users/${user.uid}/profile`, user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userProfileRef);

  const downlineQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, `users/${user.uid}/downline`), orderBy('level', 'desc'));
  }, [firestore, user]);

  const { data: downlineData, isLoading: isDownlineLoading, error } = useCollection(downlineQuery);
  
  const isLoading = isProfileLoading || isDownlineLoading;

  const calculateIncome = (downlines: number) => downlines * 1;
  const calculateFee = (income: number) => income * 0.03;

  const stats = useMemo(() => {
    if (!downlineData) {
      return {
        totalMembers: 0,
        totalIncome: 0,
        totalFees: 0,
        netIncome: 0,
      };
    }
    const totalMembers = downlineData.reduce((acc, member) => acc + (member.downlines || 0), downlineData.length);
    const totalIncome = calculateIncome(totalMembers);
    const totalFees = calculateFee(totalIncome);
    const netIncome = totalIncome - totalFees;
    return { totalMembers, totalIncome, totalFees, netIncome };
  }, [downlineData]);
  
  const avatarImage = PlaceHolderImages.find((i) => i.id === 'female-warrior-1');

  const renderTableContent = () => {
    if (isLoading) {
      return (
        <TableBody>
          {[...Array(3)].map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-4 w-6" /></TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
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
            <TableCell colSpan={8} className="text-center">
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

    const allMembers = [
        ...(user?.email === 'mesy.universe@gmail.com' ? [{
            id: '001',
            username: 'mesy.universe',
            level: 50,
            joinDate: '2023-01-01',
            downlines: 50000,
            isSuperAdmin: true,
        }] : []),
        ...(downlineData || [])
    ];


    if (allMembers.length === 0) {
      return (
        <TableBody>
          <TableRow>
            <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
              You do not have any downline members yet.
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    return (
      <TableBody>
        {allMembers.map((member, index) => {
          const avatar = PlaceHolderImages.find((p) => p.id === 'default-avatar');
          const downlinesCount = member.downlines || 0; 
          const income = calculateIncome(downlinesCount);
          const fee = calculateFee(income);

          return (
            <TableRow key={member.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{member.id.substring(0, 6)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={(member as any).avatar || avatar?.imageUrl} />
                    <AvatarFallback>
                      {member.username ? member.username.charAt(0) : '?'}
                    </AvatarFallback>
                  </Avatar>
                  <span>{member.username}</span>
                </div>
              </TableCell>
              <TableCell>Level.{member.level}</TableCell>
              <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
              <TableCell>{downlinesCount > 0 ? downlinesCount.toLocaleString() : "ยังไม่มีผู้ติดตาม"}</TableCell>
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
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top User Info Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3">
                {avatarImage && (
                    <Image 
                        src={avatarImage.imageUrl} 
                        alt="User Avatar"
                        width={300}
                        height={300}
                        className='rounded-lg shadow-lg shadow-primary/20 aspect-square object-cover'
                    />
                )}
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center space-y-2">
                <h2 className="text-xl font-semibold text-primary/80">My Financial Overview</h2>
                {isLoading ? (
                    <>
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-5 w-52" />
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2 text-lg"><span className='text-muted-foreground'>Username:</span> {userProfile?.username || 'N/A'} <CheckCircle className='w-5 h-5 text-green-500' /></div>
                        <div className="flex items-center gap-2 text-lg"><span className='text-muted-foreground'>Member ID:</span> {user?.uid.substring(0, 6) || 'N/A'} <CheckCircle className='w-5 h-5 text-green-500' /></div>
                        <div className="flex items-center gap-2 text-lg"><span className='text-muted-foreground'>Levels:</span> {userProfile?.level || 0}</div>
                        <div className="flex items-center gap-2 text-lg"><span className='text-muted-foreground'>Tel:</span> ***-***-**{userProfile?.phoneNumber?.number?.slice(-2) || 'XX'} <CheckCircle className='w-5 h-5 text-green-500' /></div>
                        <div className="flex items-center gap-2 text-lg"><span className='text-muted-foreground'>Email:</span> {user?.email} <CheckCircle className='w-5 h-5 text-green-500' /></div>
                    </>
                )}
            </div>
            <div className="lg:col-span-4 space-y-4">
                <Card className='bg-card/50'>
                    <CardHeader className='pb-2'>
                        <div className='flex justify-between items-center'>
                            <CardTitle className="text-lg">Payments</CardTitle>
                            <Settings className='w-5 h-5 text-muted-foreground' />
                        </div>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                        <div className='p-3 rounded-lg bg-indigo-900/40 border border-indigo-500/50 flex items-center gap-4'>
                            <Progress value={60} className='w-12 h-12 rounded-full bg-indigo-500/30 [&>div]:bg-indigo-400' type="radial" />
                            <div>
                                <p className='text-sm text-muted-foreground'>Average Income</p>
                                <p className='text-xl font-bold'>$5,230</p>
                            </div>
                        </div>
                        <div className='p-3 rounded-lg bg-green-900/40 border border-green-500/50 flex items-center gap-4'>
                            <Progress value={40} className='w-12 h-12 rounded-full bg-green-500/30 [&>div]:bg-green-400' type="radial" />
                            <div>
                                <p className='text-sm text-muted-foreground'>Average Spend</p>
                                <p className='text-xl font-bold'>$2,110</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className='bg-card/50'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downline</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMembers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total members in your network
            </p>
          </CardContent>
        </Card>
        <Card className='bg-card/50'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gross Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalIncome.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">
              Total potential monthly income
            </p>
          </CardContent>
        </Card>
        <Card className='bg-card/50'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Fees (3%)</CardTitle>
            <ArrowDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-${stats.totalFees.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">
              Total platform service fees
            </p>
          </CardContent>
        </Card>
        <Card className='bg-card/50'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <ArrowUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">${stats.netIncome.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">
              Your final estimated monthly income
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className='text-primary'>MESY UNIVERSE Financial & Membership Overview</CardTitle>
          <p className="text-muted-foreground">
            Here are the members in your direct downline, sorted by level.
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>MemberID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>จำนวนดาวน์ไลน์</TableHead>
                <TableHead>Monthly Income</TableHead>
                <TableHead>หัก3%จากรายได้</TableHead>
              </TableRow>
            </TableHeader>
            {renderTableContent()}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
