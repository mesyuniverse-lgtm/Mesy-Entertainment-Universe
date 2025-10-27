import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { History } from "lucide-react";

export default function UserHistoryPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">History</h1>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <History className="text-primary" />
                        Activity History
                    </CardTitle>
                    <CardDescription>
                        A record of your recent activities across the MESY Universe.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-6 bg-secondary/30 rounded-lg text-center">
                        <p className="text-muted-foreground">Your activity history will be displayed here.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
