import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

export default function DailyRewardsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Daily Rewards</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Login Calendar</CardTitle>
                    <CardDescription>Track your login streak and claim your daily rewards.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={new Date()}
                        className="rounded-md border"
                    />
                </CardContent>
            </Card>
        </div>
    );
}
