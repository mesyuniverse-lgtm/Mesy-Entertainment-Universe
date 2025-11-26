
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
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, getCountFromServer, where, getDocs, limit } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, DollarSign, Users } from 'lucide-react';

// Interfaces based on Firestore data structure
interface Account {
  id: string;
  email: string;
  role: string;
  verificationStatus: 'unverified' | 'pending' | 'verified';
  createdAt: { seconds: number; nanoseconds: number };
}

interface MemberData {
    username: string;
    nickname: string;
    level: number;
    avatar?: string;
}

// Combined type for the table
interface EnrichedMember extends Account {
    memberData: MemberData | null;
    downlineCount: number;
}

export default function MemberSystemPage() {
  const { firestore } = useFirebase();

  // 1. Fetch all accounts from the top-level 'accounts' collection
  const allAccountsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    // We only want to show Level 0 members, but level is in a subcollection.
    // For now, we fetch all accounts and then filter.
    return query(collection(firestore, 'accounts'), orderBy('createdAt', 'asc'));
  }, [firestore]);

  const { data: allAccountsData, isLoading: isAccountsLoading, error } = useCollection<Account>(allAccountsQuery);

  const [enrichedMembers, setEnrichedMembers] = useState<EnrichedMember[]>([]);
  const [isEnriching, setIsEnriching] = useState(true);

  // 2. "Enrich" account data with member details and downline count from subcollections
  useEffect(() => {
    if (!allAccountsData || !firestore) return;

    const enrichData = async () => {
      setIsEnriching(true);
      try {
        const enrichedPromises = allAccountsData.map(async (account) => {
          let downlineCount = 0;
          let memberData: MemberData | null = null;
          
          try {
            // Get the first member document for this account
            const membersColRef = collection(firestore, `accounts/${account.id}/members`);
            const memberQuery = query(membersColRef, limit(1));
            const memberSnapshot = await getDocs(memberQuery);
            
            if (!memberSnapshot.empty) {
                const memberDoc = memberSnapshot.docs[0];
                memberData = memberDoc.data() as MemberData;

                // Get the count of downline members for that specific member
                if (memberData.level === 0) { // Only count for level 0
                    const downlineCollRef = collection(firestore, memberDoc.ref.path, 'downline');
                    const snapshot = await getCountFromServer(downlineCollRef);
                    downlineCount = snapshot.data().count;
                }
            }
          } catch(e) {
            console.error(`Could not fetch member/downline data for account ${account.id}:`, e);
          }

          return {
            ...account,
            memberData,
            downlineCount,
          };
        });
        
        const enrichedResults = await Promise.all(enrichedPromises);
        // Filter to only include Level 0 members for this specific page's purpose
        const level0Members = enrichedResults.filter(m => m.memberData?.level === 0);
        setEnrichedMembers(level0Members);

      } catch (enrichError) {
        console.error("Error enriching member data:", enrichError);
      } finally {
        setIsEnriching(false);
      }
    };

    enrichData();
  }, [allAccountsData, firestore]);

  const isLoading = isAccountsLoading || isEnriching;

  // 3. Memoized calculation for the summary statistics
  const stats = useMemo(() => {
    const totalMembers = enrichedMembers.length;
    const totalDownlines = enrichedMembers.reduce((acc, member) => acc + (member.downlineCount || 0), 0);
    return { totalMembers, totalDownlines };
  }, [enrichedMembers]);

  // Helper functions for calculations
  const calculateIncome = (downlines: number) => downlines >= 1 ? downlines * 1 : 0;
  const calculateFee = (income: number) => income * 0.03;

  // Render function for the table body to handle loading, error, and data states
  const renderTableContent = () => {
    if (isLoading) {
      return (
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-4 w-6" /></TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              <TableCell><Skeleton className="h-4 w-12" /></TableCell>
              <TableCell><Skeleton className="h-4 w-12" /></TableCell>
              <TableCell><Skeleton className="h-4 w-16" /></TableCell>
              <TableCell><Skeleton className="h-4 w-16" /></TableCell>
              <TableCell><Skeleton className="h-4 w-16" /></TableCell>
              <TableCell><Skeleton className="h-6 w-6 rounded-full" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      );
    }
    
    if (error) {
       return (
        <TableBody>
          <TableRow>
            <TableCell colSpan={9} className="text-center">
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

    if (enrichedMembers.length === 0) {
      return (
        <TableBody>
          <TableRow>
            <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
              No Level 0 members found to display.
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
          const netIncome = income - fee;
          const displayName = member.memberData?.nickname || member.memberData?.username || 'N/A';
          const isVerified = member.verificationStatus === 'verified';

          return (
            <TableRow key={member.id} className={isVerified ? 'bg-green-900/10' : 'bg-red-900/10'}>
              <TableCell className="font-mono">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={avatar?.imageUrl} />
                    <AvatarFallback>
                      {displayName ? displayName.charAt(0) : '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-semibold'>{displayName}</p>
                    <p className='text-xs text-muted-foreground'>{member.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className='font-mono'>{member.id.substring(0, 8)}</TableCell>
              <TableCell>Level.{member.memberData?.level ?? '0'}</TableCell>
              <TableCell className='text-center'>{downlinesCount > 0 ? downlinesCount.toLocaleString() : "0"}</TableCell>
              <TableCell className='font-mono'>${income.toFixed(2)}</TableCell>
              <TableCell className='font-mono text-red-400'>-${fee.toFixed(2)}</TableCell>
              <TableCell className='font-mono text-green-400'>${netIncome.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex justify-center">
                    <div className={`w-5 h-5 rounded-full ${isVerified ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} title={isVerified ? 'Actived' : 'Active (Not Verified)'}></div>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
       <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-primary tracking-wider">
                Member's Database Calculator System - Level 0
              </CardTitle>
              <CardDescription>
                Overview of all Level 0 members, their downlines, and potential income.
              </CardDescription>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className='p-4 rounded-lg bg-secondary'>
                    <p className="text-sm text-muted-foreground">Total Members (Level 0)</p>
                    <p className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
                        <Users className="w-6 h-6" />
                        {isLoading ? <Skeleton className="h-8 w-24" /> : stats.totalMembers.toLocaleString()}
                    </p>
                </div>
                <div className='p-4 rounded-lg bg-secondary'>
                    <p className="text-sm text-muted-foreground">Total Downlines (from Level 0)</p>
                     <p className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
                        <DollarSign className="w-6 h-6" />
                         {isLoading ? <Skeleton className="h-8 w-24" /> : stats.totalDownlines.toLocaleString()}
                    </p>
                </div>
            </div>
          </div>
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
            {renderTableContent()}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
