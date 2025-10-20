
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Gift } from "lucide-react";

export default function PointPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Point Wallet</CardTitle>
                <CardDescription>Points are earned from specific activities and can be redeemed for special rewards.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <div className="flex items-center gap-2">
                         <Award className="h-8 w-8 text-yellow-400" />
                        <p className="text-4xl font-bold">3,200</p>
                    </div>
                </div>
                <Button className="w-full" size="lg" disabled>
                    <Gift className="mr-2"/> Redeem Rewards (Coming Soon)
                </Button>
                 <Card className="bg-secondary/30">
                    <CardHeader>
                        <CardTitle className="text-lg">How to Earn Points?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="text-muted-foreground text-sm list-disc pl-5 space-y-1">
                            <li>Completing daily, weekly, and special quests.</li>
                            <li>Participating in community events.</li>
                            <li>Winning contests and challenges.</li>
                            <li>Receiving gifts from other members.</li>
                        </ul>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
