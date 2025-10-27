'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Shield, Star, Users } from "lucide-react";

export default function UsersPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Followers</CardTitle>
                        <Users className="text-muted-foreground h-4 w-4"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5,100</div>
                        <p className="text-xs text-muted-foreground">+201 since last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Following</CardTitle>
                        <Users className="text-muted-foreground h-4 w-4"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2,100</div>
                        <p className="text-xs text-muted-foreground">+18 since last month</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Account Status</CardTitle>
                        <Shield className="text-muted-foreground h-4 w-4"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">User</div>
                        <p className="text-xs text-muted-foreground">Not a Member</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">MESY Coins</CardTitle>
                        <DollarSign className="text-muted-foreground h-4 w-4"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0.00</div>
                        <p className="text-xs text-muted-foreground">Verify payment to earn</p>
                    </CardContent>
                </Card>
            </div>
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Welcome!</CardTitle>
                    <CardDescription>This is your personal dashboard. Explore the MESY universe and consider becoming a member to unlock more features!</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                   <p>Your journey begins here. Connect with others, explore content, and build your presence.</p>
                </CardContent>
            </Card>
        </div>
    );
}
