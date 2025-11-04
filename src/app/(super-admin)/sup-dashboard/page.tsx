
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Code, Wallet, Gem, BarChart, HandCoins } from "lucide-react";
import React from 'react';

const StatCard = ({ title, value, icon, description }: { title: string, value: string, icon: React.ReactNode, description: string }) => (
    <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-4xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);

export default function SuperAdminDashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Super Admin Dashboard</h1>
                <p className="text-muted-foreground">Universe-wide overview and management.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Users" value="15,203" icon={<Users className="text-muted-foreground h-5 w-5"/>} description="+20.1% from last month" />
                <StatCard title="MESY Members" value="5,123" icon={<Shield className="text-muted-foreground h-5 w-5"/>} description="+180 since last month" />
                <StatCard title="Developers" value="48" icon={<Code className="text-muted-foreground h-5 w-5"/>} description="+5 this week" />
                <StatCard title="Team Members" value="12" icon={<Users className="text-muted-foreground h-5 w-5"/>} description="Internal Staff" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                 <StatCard title="Total Wallets" value="20,326" icon={<Wallet className="text-muted-foreground h-5 w-5"/>} description="Total wallets created" />
                 <StatCard title="Total Revenue" value="$45,231.89" icon={<BarChart className="text-muted-foreground h-5 w-5"/>} description="+19% from last month" />
                 <StatCard title="Total Expenses" value="$12,876.50" icon={<HandCoins className="text-muted-foreground h-5 w-5"/>} description="Operational costs" />
                 <StatCard title="Products Listed" value="1,289" icon={<Gem className="text-muted-foreground h-5 w-5"/>} description="In MESY Market" />
            </div>
            
            <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardHeader>
                    <CardTitle>Dashboard Customization</CardTitle>
                    <CardDescription>Drag and drop widgets to rearrange your dashboard view. This feature is under development.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-12 border-2 border-dashed border-muted-foreground/30 rounded-lg text-center text-muted-foreground">
                        Drag & Drop Area - Coming Soon
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
