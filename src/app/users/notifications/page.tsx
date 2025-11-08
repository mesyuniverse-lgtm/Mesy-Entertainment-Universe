
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bell, Gift, Zap, Star } from "lucide-react";

export default function UserNotificationsPage() {
    const notifications = [
        {
            icon: <Bell className="h-5 w-5 text-primary" />,
            title: "Welcome to MESY!",
            description: "Your journey into the universe has just begun. Explore the features available to you.",
            time: "1 minute ago"
        },
        {
            icon: <Star className="h-5 w-5 text-yellow-400" />,
            title: "Unlock Full Potential",
            description: "Become a member to not miss out on Daily Rewards and many benefits.",
            time: "30 minutes ago"
        },
        {
            icon: <Gift className="h-5 w-5 text-accent" />,
            title: "Daily Rewards are available",
            description: "Log in every day to claim exclusive rewards. Become a member to unlock even more!",
            time: "1 hour ago"
        },
        {
            icon: <Zap className="h-5 w-5 text-purple-400" />,
            title: "New Features in the AI Hub",
            description: "We've added new models to the AI Hub. Give them a try!",
            time: "3 hours ago"
        }
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Your Updates</CardTitle>
                    <CardDescription>Stay up to date with everything happening in your universe.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {notifications.map((notification, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 border rounded-lg bg-card/50">
                            <div className="p-2 bg-secondary/30 rounded-full">
                               {notification.icon}
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold">{notification.title}</p>
                                <p className="text-sm text-muted-foreground">{notification.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                        </div>
                    ))}
                     <div className="text-center text-muted-foreground pt-4">
                        <p>No more notifications.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
