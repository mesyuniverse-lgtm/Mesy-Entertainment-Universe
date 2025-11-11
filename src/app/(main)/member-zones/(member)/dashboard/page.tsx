
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Star, DollarSign, Zap } from 'lucide-react';

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                <DollarSign className="text-muted-foreground h-4 w-4"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$4,850.00</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Downline Members</CardTitle>
                <Users className="text-muted-foreground h-4 w-4"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">5,000</div>
                <p className="text-xs text-muted-foreground">+180 since last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Level</CardTitle>
                <Star className="text-muted-foreground h-4 w-4"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Next level at 6,000 members</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Quests</CardTitle>
                <Zap className="text-muted-foreground h-4 w-4"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">1 completed this week</p>
            </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
               <p>Chart component would be here.</p>
            </CardContent>
        </Card>
        <Card className="col-span-3">
             <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <p>A list of recent downline members or rewards.</p>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
