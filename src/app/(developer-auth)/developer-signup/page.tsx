
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, User, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const StepItem = ({ stepNumber, title, description, completed, children }: { stepNumber: number, title: string, description: string, completed: boolean, children?: React.ReactNode }) => (
    <div className="flex items-start gap-4">
        <div className="flex flex-col items-center">
             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-primary font-bold">{stepNumber}</div>
             {completed && <CheckCircle2 className="h-5 w-5 text-green-500 mt-2"/>}
        </div>
        <div className="flex-grow p-4 rounded-lg bg-secondary/50 border border-border">
            <h3 className="font-semibold flex items-center">{title}
                 <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground cursor-pointer"/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{description}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </h3>
            <div className="mt-2">
                {children}
            </div>
        </div>
    </div>
);

export default function DeveloperSignupPage() {

    const steps = [
        {
            title: "MESY MEMBER ID",
            description: "You must be a verified MESY Member to become a developer.",
            completed: true,
            content: <div className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground"/><Input placeholder="PUT ID HERE" className="bg-background/50" defaultValue="tipyatida@gmail.com"/></div>
        },
        {
            title: "QUEST BY AI TESTING 3 CASES",
            description: "Complete AI-driven test cases to prove your analytical skills.",
            completed: true,
            content: <p className="text-sm text-muted-foreground">Successfully completed all AI test quests.</p>
        },
        {
            title: "QUEST. งานทดสอบ",
            description: "รับงานจากสมาชิก ทำงานสำเร็จ 10 งาน (Complete 10 quests posted by other members.)",
            completed: true,
            content: <p className="text-sm text-muted-foreground">10/10 member quests completed.</p>
        },
        {
            title: "ได้รับคะแนน ถึง 3 ดาว",
            description: "Maintain an average rating of 3 stars or higher from completed quests.",
            completed: true,
            content: <p className="text-sm text-muted-foreground flex items-center gap-1">Average rating: 4.8 <Star className="h-4 w-4 text-yellow-400 fill-yellow-400"/></p>
        },
    ];

    const allStepsCompleted = steps.every(step => step.completed);

    return (
        <div className="w-full">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-primary">BECOME A DEVELOPER</h1>
                <p className="text-sm text-muted-foreground">
                    Complete the steps below to unlock your ceremonial journey.
                </p>
            </div>

            <div className="space-y-4">
                {steps.map((step, index) => (
                    <StepItem key={index} stepNumber={index+1} title={step.title} description={step.description} completed={step.completed}>
                        {step.content}
                    </StepItem>
                ))}
            </div>

            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                    <span className="font-medium">Pay Registration Fee ($9.99)</span>
                    <Button size="sm" disabled={!allStepsCompleted}>Pay Now</Button>
                </div>
                <Button className="w-full text-lg h-12" disabled={!allStepsCompleted}>
                    CREATE DEVELOPER ID
                </Button>
            </div>

            <p className="mt-6 px-8 text-center text-xs text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                    Privacy Policy
                </Link>
                .
            </p>
        </div>
    );
}
