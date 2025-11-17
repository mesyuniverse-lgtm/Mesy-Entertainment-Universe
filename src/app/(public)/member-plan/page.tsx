'use client';

import { useState, useMemo } from "react";
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { membershipData, MembershipLevel } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input";

function formatCurrency(value: number) {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function MemberPlanPage() {
  const [memberCount, setMemberCount] = useState(5000);

  const calculatedIncome = useMemo(() => {
    const grossIncome = memberCount;
    const serviceFee = grossIncome * 0.03;
    const netIncome = grossIncome - serviceFee;
    return { grossIncome, serviceFee, netIncome };
  }, [memberCount]);

  const currentLevel = useMemo(() => {
    for (let i = membershipData.length - 1; i >= 0; i--) {
      if (memberCount < membershipData[i].members) {
         if(i > 0 && memberCount >= (membershipData[i-1].members - (i > 1 ? 1: 0) ) ) return membershipData[i-1].level;
         if(i === 0) return 0;
      }
    }
    return membershipData[membershipData.length - 1].level;
  }, [memberCount]);


  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Membership & Income</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Understand the journey, the levels, and the potential rewards. Our structure is designed to reward growth and dedication.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
                <CardTitle>Membership Level & Income Structure</CardTitle>
                <CardDescription>Based on a 3% service fee. Income is calculated monthly.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Level</TableHead>
                        <TableHead>Members</TableHead>
                        <TableHead className="text-right">Net Income (USD)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {membershipData.map((level) => (
                        <TableRow key={level.level} className={currentLevel === level.level ? 'bg-primary/10' : ''}>
                            <TableCell className="font-medium">{level.level}</TableCell>
                            <TableCell>&lt; {level.members.toLocaleString()}</TableCell>
                            <TableCell className="text-right">${formatCurrency(level.netIncome)}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Income Calculator</CardTitle>
              <CardDescription>Estimate your potential monthly earnings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                <div>
                    <label htmlFor="member-count-input" className="text-sm font-medium mb-2 block">Number of Members</label>
                    <Input 
                        id="member-count-input"
                        type="number"
                        placeholder="e.g., 5000"
                        value={memberCount}
                        onChange={(e) => setMemberCount(Math.min(50000, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="w-full h-12 text-lg"
                    />
                </div>
                
                <div className="space-y-4 rounded-lg bg-secondary/50 p-4 border border-border">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Gross Income (USD)</span>
                        <span>${formatCurrency(calculatedIncome.grossIncome)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Service Fee (3%)</span>
                        <span className="text-red-400">-${formatCurrency(calculatedIncome.serviceFee)}</span>
                    </div>
                     <div className="flex justify-between items-center text-lg font-bold">
                        <span className="text-primary">Net Income (USD)</span>
                        <span className="text-primary">${formatCurrency(calculatedIncome.netIncome)}</span>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm text-muted-foreground">Your estimated level</p>
                    <p className="text-3xl font-bold text-accent">{currentLevel}</p>
                </div>
            </CardContent>
          </Card>
           <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image
                  src={PlaceHolderImages.find((img) => img.id === 'member-plan-video')?.imageUrl || ''}
                  alt="Member plan video"
                  data-ai-hint="presentation video"
                  fill
                  className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-center justify-center">
                  <h2 className="text-3xl font-bold text-white" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.9)'}}>The MESY Vision</h2>
              </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-16 p-8 bg-secondary/40 rounded-lg">
        <h2 className="text-3xl font-bold">Ready to Begin Your Journey?</h2>
        <p className="max-w-xl mx-auto mt-2 text-muted-foreground">Join the Mesy Universe and start building your legacy today.</p>
        <Button size="lg" className="mt-6" asChild>
          <Link href="/signup">Register Now</Link>
        </Button>
      </div>
    </div>
  )
}
