
'use client';

import React, { useMemo, useState, useEffect } from 'react';
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
import { collection, query, orderBy, doc, getCountFromServer, where, getDocs, limit } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ArrowDown, ArrowUp, DollarSign, Users, CheckCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Account {
  id: string;
  email: string;
  role: string;
  createdAt: { seconds: number; nanoseconds: number };
}

interface MemberData {
    username: string;
    nickname: string;
    level: number;
    avatar?: string;
}

interface EnrichedMember extends Account {
    memberData: MemberData | null;
    downlineCount: number;
}

export default function MemberSystemPage() {
  const { firestore, user } = useFirebase();

  const userProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, `accounts/${user.uid}/profile`, user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userProfileRef);

  const allAccountsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'accounts'), orderBy('createdAt', 'asc'));
  }, [firestore]);

  const { data: allAccountsData, isLoading: isAccountsLoading, error } = useCollection<Account>(allAccountsQuery);

  const [enrichedMembers, setEnrichedMembers] = useState<EnrichedMember[]>([]);
  const [isEnriching, setIsEnriching] = useState(true);

  useEffect(() => {
    if (!allAccountsData || !firestore) return;

    const enrichData = async () => {
      setIsEnriching(true);
      try {
        const enriched = await Promise.all(
          allAccountsData.map(async (account) => {
            let downlineCount = 0;
            let memberData: MemberData | null = null;
            
            try {
              const membersColRef = collection(firestore, `accounts/${account.id}/members`);
              const memberQuery = query(membersColRef, limit(1));
              const memberSnapshot = await getDocs(memberQuery);
              
              if (!memberSnapshot.empty) {
                  const memberDoc = memberSnapshot.docs[0];
                  memberData = memberDoc.data() as MemberData;

                  const downlineCollRef = collection(firestore, memberDoc.ref.path, 'downline');
                  const snapshot = await getCountFromServer(downlineCollRef);
                  downlineCount = snapshot.data().count;
              }
            } catch(e) {
              console.error(`Could not fetch member/downline data for account ${account.id}:`, e);
            }

            return {
              ...account,
              memberData,
              downlineCount,
            };
          })
        );
        setEnrichedMembers(enriched);
      } catch (enrichError) {
        console.error("Error enriching member data:", enrichError);
      } finally {
        setIsEnriching(false);
      }
    };

    enrichData();
  }, [allAccountsData, firestore]);

  const isLoading = isProfileLoading || isAccountsLoading || isEnriching;

  const calculateIncome = (downlines: number) => downlines * 1;
  const calculateFee = (income: number) => income * 0.03;

  const stats = useMemo(() => {
    if (!enrichedMembers) {
      return { totalMembers: 0, totalIncome: 0, totalFees: 0, netIncome: 0 };
    }
    const totalMembers = enrichedMembers.reduce((acc, member) => acc + (member.downlineCount || 0), 0);
    const totalIncome = calculateIncome(totalMembers);
    const totalFees = calculateFee(totalIncome);
    const netIncome = totalIncome - totalFees;
    return { totalMembers, totalIncome, totalFees, netIncome };
  }, [enrichedMembers]);
  
  const averageSpend = 0;

  const avatarImage = PlaceHolderImages.find((i) => i.id === 'yoga-pose-1');
  const mainUserAvatar = (userProfile as any)?.avatar ? PlaceHolderImages.find(i => i.id === (userProfile as any).avatar) : PlaceHolderImages.find(i => i.id === 'default-avatar');

  const renderTableContent = () => {
    if (isLoading) {
      return (
        <TableBody>
          {[...Array(3)].map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
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
                <p>Error loading members data.</p>
                <p className="text-xs text-muted-foreground">{error.message}</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    if (!enrichedMembers || enrichedMembers.length === 0) {
      return (
        <TableBody>
          <TableRow>
            <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
              No members found in the system yet.
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    return (
      <TableBody>
        {enrichedMembers.map((member, index) => {
          const avatar = member.memberData?.avatar ? PlaceHolderImages.find((p) => p.id === member.memberData.avatar) : PlaceHolderImages.find(p => p.id === 'default-avatar');
          const downlinesCount = member.downlineCount || 0; 
          const income = calculateIncome(downlinesCount);
          const fee = calculateFee(income);
          const joinDate = member.createdAt ? new Date(member.createdAt.seconds * 1000).toLocaleDateString() : 'N/A';
          const memberLevel = member.memberData?.level !== undefined ? member.memberData.level : 0;
          const displayName = member.memberData?.nickname || member.memberData?.username || 'N/A';

          return (
            <TableRow key={member.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{member.id.substring(0, 6)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatar?.imageUrl} />
                    <AvatarFallback>
                      {displayName ? displayName.charAt(0) : '?'}
                    </AvatarFallback>
                  </Avatar>
                  <span>{displayName}</span>
                </div>
              </TableCell>
              <TableCell>Level.{memberLevel}</TableCell>
              <TableCell>{joinDate}</TableCell>
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
            <div className="lg:col-span-3 flex flex-col justify-center space-y-2">
                <h2 className="text-xl font-semibold text-primary/80">My Financial Overview</h2>
                {isProfileLoading ? (
                    <>
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-5 w-52" />
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2 text-lg"><span className='text-muted-foreground'>Username:</span> {(userProfile as any)?.firstname || 'N/A'} <CheckCircle className='w-5 h-5 text-green-500' /></div>
                        <div className="flex items-center gap-2 text-lg"><span className='text-muted-foreground'>Account ID:</span> {user?.uid.substring(0, 6) || 'N/A'} <CheckCircle className='w-5 h-5 text-green-500' /></div>
                        <div className="flex items-center gap-2 text-lg"><span className='text-muted-foreground'>Levels:</span> {(userProfile as any)?.level || 0}</div>
                        <div className="flex items-center gap-2 text-lg"><span className='text-muted-foreground'>Tel:</span> ***-***-**{(userProfile as any)?.phoneNumber?.number?.slice(-2) || 'XX'} <CheckCircle className='w-5 h-5 text-green-500' /></div>
                        <div className="flex items-center gap-2 text-lg"><span className='text-muted-foreground'>Email:</span> {user?.email} <CheckCircle className='w-5 h-5 text-green-500' /></div>
                    </>
                )}
            </div>
            <div className="lg:col-span-3 flex items-center justify-center">
                <Card className='bg-card/50 w-full max-w-sm'>
                    <CardContent className='p-6 text-center'>
                         <div className="relative w-48 h-48 mx-auto">
                            <svg viewBox="0 0 100 100" className='-rotate-90'>
                                <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--border))" strokeWidth="10"></circle>
                                <circle cx="50" cy="50" r="45" fill="none" stroke="url(#balanceGradient)" strokeWidth="10" strokeDasharray="283" strokeDashoffset="70" strokeLinecap='round'></circle>
                                <defs>
                                    <linearGradient id="balanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                                        <stop offset="100%" stopColor="hsl(var(--accent))" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className='absolute inset-0 flex flex-col items-center justify-center'>
                                <p className='text-muted-foreground text-sm'>Total Balance</p>
                                <p className='text-3xl font-bold'>$0.00</p>
                            </div>
                            <div className='absolute top-2 left-10 w-10 h-10 bg-yellow-500/80 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md'>$</div>
                            <div className='absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-green-500/80 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md'>€</div>
                             <div className='absolute bottom-2 left-10 w-10 h-10 bg-red-500/80 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md'>£</div>
                        </div>

                        <Button className='mt-6 w-full h-12 text-lg bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold hover:opacity-90'>
                            CHARGE WALLET
                        </Button>
                        <div className='mt-4 flex justify-between text-sm text-muted-foreground'>
                            <span>Last Top-Up: N/A</span>
                            <span className='flex items-center gap-2'>Wallet Status: <span className='text-green-500 animate-pulse font-bold'>Active</span></span>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-3 space-y-4">
                <Card className='bg-card/50'>
                    <CardHeader className='pb-2'>
                        <div className='flex justify-between items-center'>
                            <CardTitle className="text-lg">Payments</CardTitle>
                            <Settings className='w-5 h-5 text-muted-foreground' />
                        </div>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                        <div className='p-3 rounded-lg bg-indigo-900/40 border border-indigo-500/50 flex items-center gap-4'>
                            <Progress value={isLoading ? 0 : 100} className='w-12 h-12 rounded-full bg-indigo-500/30 [&>div]:bg-indigo-400' type="radial" />
                            <div>
                                <p className='text-sm text-muted-foreground'>Average Income</p>
                                <p className='text-xl font-bold'>${isLoading ? '0.00' : stats.totalIncome.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className='p-3 rounded-lg bg-green-900/40 border border-green-500/50 flex items-center gap-4'>
                            <Progress value={isLoading ? 0 : averageSpend > 0 ? (averageSpend / (stats.totalIncome || 1)) * 100 : 0} className='w-12 h-12 rounded-full bg-green-500/30 [&>div]:bg-green-400' type="radial" />
                            <div>
                                <p className='text-sm text-muted-foreground'>Average Spend</p>
                                <p className='text-xl font-bold'>${isLoading ? '0.00' : averageSpend.toFixed(2)}</p>
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
              Total members in the entire network
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
            This table shows all MESY Members in the universe, ordered by their join date.
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>AccountID</TableHead>
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
