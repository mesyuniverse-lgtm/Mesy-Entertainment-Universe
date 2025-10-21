"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { membershipData } from "@/lib/data";
import type { MembershipLevel } from "@/lib/data";

export function IncomeCalculator() {
  const [members, setMembers] = useState(1000);
  
  const calculateLevel = (memberCount: number): MembershipLevel | null => {
    if (isNaN(memberCount) || memberCount < 0) {
      return null;
    }

    if (memberCount >= 50000) {
      const maxLevel = membershipData.find(level => level.members === 50000);
      if (maxLevel) {
        return { ...maxLevel, members: memberCount };
      }
    }

    const baseLevel = [...membershipData]
      .reverse()
      .find(level => memberCount >= level.members);
      
    const targetLevel = baseLevel || membershipData.find(l => l.level === 0) || membershipData[0];

    if (targetLevel) {
      const grossIncome = memberCount;
      const fee = grossIncome * 0.03;
      const netIncome = grossIncome - fee;

      return {
        ...targetLevel,
        members: memberCount,
        totalIncome: grossIncome,
        serviceFee: fee,
        netIncome: netIncome,
      };
    }
    return null;
  }

  const [result, setResult] = useState<MembershipLevel | null>(() => calculateLevel(1000));

  const handleCalculate = () => {
    setResult(calculateLevel(members));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Calculate Your Potential</CardTitle>
        <CardDescription>Enter the number of downline members to estimate your income.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="downline-members">Downline Members</Label>
          <Input 
            id="downline-members" 
            type="number" 
            value={members}
            onChange={(e) => setMembers(Number(e.target.value))}
            placeholder="e.g., 1000"
          />
        </div>
        <Button onClick={handleCalculate} className="w-full">Calculate</Button>

        {result && (
          <div className="pt-6 text-center">
            <h3 className="text-lg font-semibold text-muted-foreground">Estimated Monthly Results</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Card className="p-4 bg-secondary/30">
                <p className="text-sm text-muted-foreground">Your Level</p>
                <p className="text-3xl font-bold">{result.level}</p>
              </Card>
              <Card className="p-4 bg-secondary/30">
                <p className="text-sm text-muted-foreground">Net Income</p>
                <p className="text-3xl font-bold">${result.netIncome.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
              </Card>
            </div>
             <p className="text-sm text-muted-foreground mt-4">
                Gross: ${result.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 0 })} | Fee (3%): ${result.serviceFee.toLocaleString('en-US', { minimumFractionDigits: 0 })}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}