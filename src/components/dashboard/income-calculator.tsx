"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { membershipData } from "@/lib/data"

export function IncomeCalculator() {
  const [level, setLevel] = useState(10);

  const data = useMemo(() => {
    return membershipData.find(d => d.level === level)
  }, [level]);

  const handleSliderChange = (value: number[]) => {
    setLevel(value[0])
  }

  return (
    <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Income Calculator</CardTitle>
        <CardDescription>Estimate your potential monthly net income based on your membership level.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <div className="flex justify-between items-baseline">
                <Label htmlFor="level-slider" className="text-sm font-medium">Membership Level</Label>
                <span className="font-bold text-3xl text-primary font-headline">{level}</span>
            </div>
            <Slider
                id="level-slider"
                min={0}
                max={50}
                step={1}
                value={[level]}
                onValueChange={handleSliderChange}
            />
        </div>
        <div className="grid grid-cols-2 gap-4 text-center pt-4 border-t border-border/60">
            <div>
                <p className="text-sm text-muted-foreground">Members</p>
                <p className="text-2xl font-bold">{data?.members.toLocaleString()}</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Est. Net Income</p>
                <p className="text-2xl font-bold text-primary">${data?.netIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">This is an estimate. Actual income may vary. At Level 50, income becomes a fixed lifetime position.</p>
      </CardFooter>
    </Card>
  )
}
