
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DownlineTable } from "@/components/dashboard/downline-table";
import { IncomeCalculator } from "@/components/dashboard/income-chart";
import { MembershipTable } from "@/components/dashboard/membership-table";

export default function MembershipsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Memberships & Income</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Membership Levels</CardTitle>
                    <CardDescription>
                        Explore the membership levels and the income potential at each stage of your journey.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <MembershipTable />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Income & Downline</CardTitle>
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
