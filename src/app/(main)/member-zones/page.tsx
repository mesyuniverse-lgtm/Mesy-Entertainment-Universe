import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, DollarSign, Users, Star } from "lucide-react";

export default function MemberZoneHomePage() {
  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight font-headline">หน้าแรกสมาชิก</h1>
            <p className="text-muted-foreground">สรุปข้อมูลภาพรวมและสถิติสำคัญของคุณในจักรวาล MESY</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                    <CardTitle className="text-sm font-medium">Net Income</CardTitle>
                    <DollarSign className="text-muted-foreground h-4 w-4"/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$4,850.00</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Downline</CardTitle>
                    <Users className="text-muted-foreground h-4 w-4"/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">5,000</div>
                    <p className="text-xs text-muted-foreground">+180 since last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upline</CardTitle>
                    <User className="text-muted-foreground h-4 w-4"/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">The Chronicler</div>
                    <p className="text-xs text-muted-foreground">Your direct sponsor</p>
                </CardContent>
            </Card>
        </div>
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Welcome to the Member Zone</CardTitle>
                <CardDescription>This is your personal hub within the MESY Universe. From here, you can track your progress, manage your network, and access exclusive features. Your ceremonial journey continues here.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Use the navigation on the left to explore different sections.</p>
            </CardContent>
        </Card>
    </div>
  );
}
