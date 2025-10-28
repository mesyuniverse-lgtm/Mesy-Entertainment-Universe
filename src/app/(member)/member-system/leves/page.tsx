
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MembershipTable } from "@/components/dashboard/membership-table";
import { BarChart } from "lucide-react";

export default function LevelsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart className="text-primary" />
                    Levels & Benefits
                </CardTitle>
                <CardDescription>
                    Explore the membership levels and the income potential at each stage of your journey.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <MembershipTable />
            </CardContent>
        </Card>
    );
}
