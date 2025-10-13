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
  const [result, setResult] = useState<MembershipLevel | null>(() => {
    const initialLevel = membershipData.find(level => level.members >= 1000);
    return initialLevel || membershipData[0];
  });

  const handleCalculate = () => {
    const memberCount = Number(members);
    let calculatedLevel: MembershipLevel | null = null;
    
    // Find the highest level that the member count qualifies for.
    for (let i = membershipData.length - 1; i >= 0; i--) {
      if (memberCount >= membershipData[i].members && membershipData[i].level !== 0) {
        calculatedLevel = { ...membershipData[i] };
        break;
      }
    }
    
    // Handle level 0 case
    if (memberCount < 1000) {
      calculatedLevel = {...membershipData[0]};
    }
    
    // If a level is found, calculate the income based on actual members.
    if (calculatedLevel) {
        const grossIncome = memberCount;
        const fee = grossIncome * 0.03;
        const netIncome = grossIncome - fee;
        
        calculatedLevel.totalIncome = grossIncome;
        calculatedLevel.serviceFee = fee;
        calculatedLevel.netIncome = netIncome;
    } else if (memberCount > 0) {
      // Fallback for counts above the max defined level but not hitting a specific tier
       const topLevel = membershipData[membershipData.length - 1];
       const grossIncome = memberCount;
       const fee = grossIncome * 0.03;
       const netIncome = grossIncome - fee;

       calculatedLevel = {
           level: topLevel.level,
           members: memberCount,
           totalIncome: grossIncome,
           serviceFee: fee,
           netIncome: netIncome,
       };
    }


    setResult(calculatedLevel);
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
