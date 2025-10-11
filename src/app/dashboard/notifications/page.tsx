import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bell, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Notifications</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Notification Center</CardTitle>
                    <CardDescription>All your updates and alerts in one place.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-4 p-4 border rounded-lg bg-card">
                        <div className="p-2 bg-primary/20 rounded-full">
                           <Bell className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold">Welcome to MESY!</p>
                            <p className="text-sm text-muted-foreground">Your ceremonial journey has just begun. Explore the dashboard to get started.</p>
                            <p className="text-xs text-muted-foreground mt-1">1 minute ago</p>
                        </div>
                        <Button variant="ghost" size="icon"><Check className="h-4 w-4"/></Button>
                    </div>
                     <div className="flex items-start gap-4 p-4 border rounded-lg bg-card">
                        <div className="p-2 bg-accent/20 rounded-full">
                           <Bell className="h-5 w-5 text-accent" />
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold">New Downline Member</p>
                            <p className="text-sm text-muted-foreground">User 'Aria' has joined your downline.</p>
                            <p className="text-xs text-muted-foreground mt-1">5 minutes ago</p>
                        </div>
                        <Button variant="ghost" size="icon"><Check className="h-4 w-4"/></Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
