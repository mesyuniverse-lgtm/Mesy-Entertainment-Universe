
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gift } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

export default function GiftBoxPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Gift Box</h1>
                <p className="text-muted-foreground">พิธีแห่งการให้: รับรางวัลจากการเข้าสู่ระบบและกิจกรรมต่างๆ</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Gift className="text-primary"/>Daily Login Reward</CardTitle>
                        <CardDescription>Claim your reward for logging in today. Streaks give better rewards!</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        <Calendar
                            mode="single"
                            selected={new Date()}
                            className="rounded-md border"
                        />
                        <Button className="w-full">Claim Today's Reward</Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Gift className="text-primary"/>Event Rewards</CardTitle>
                        <CardDescription>Rewards from special events and completed quests will appear here.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-muted-foreground">No event rewards to claim at this time.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
