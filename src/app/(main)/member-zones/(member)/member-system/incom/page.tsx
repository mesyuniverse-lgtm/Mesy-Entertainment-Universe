import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DownlineTable } from "@/components/dashboard/downline-table";
import { IncomeCalculator } from "@/components/dashboard/income-chart";
import { HandCoins } from "lucide-react";

export default function IncomePage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <HandCoins className="text-primary" />
                        Income & Downline
                    </CardTitle>
                    <CardDescription>
                        Track your downline members and estimate your potential earnings.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <DownlineTable />
                    <IncomeCalculator />
                </CardContent>
            </Card>
        </div>
    );
}
