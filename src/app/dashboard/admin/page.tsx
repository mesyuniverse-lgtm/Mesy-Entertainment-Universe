
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Shield, Bell } from "lucide-react";
import Link from 'next/link';

export default function AdminPage() {
    const adminCards = [
        {
            title: "User Management",
            description: "View and manage all users in the system.",
            href: "/dashboard/admin/users",
            icon: <Users className="h-8 w-8 text-primary" />
        },
        {
            title: "System Settings",
            description: "Configure platform-wide settings and parameters.",
            href: "#",
            icon: <Shield className="h-8 w-8 text-primary" />
        },
        {
            title: "Broadcast Notifications",
            description: "Send announcements to all users.",
            href: "#",
            icon: <Bell className="h-8 w-8 text-primary" />
        }
    ];

    return (
        <div>
             <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground">
                    An overview of your system and management tools.
                </p>
            </div>
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {adminCards.map(card => (
                    <Link key={card.title} href={card.href}>
                        <Card className="hover:bg-secondary/50 hover:shadow-lg transition-all h-full">
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                {card.icon}
                                <div>
                                    <CardTitle>{card.title}</CardTitle>
                                    <CardDescription>{card.description}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
             </div>
        </div>
    );
}
