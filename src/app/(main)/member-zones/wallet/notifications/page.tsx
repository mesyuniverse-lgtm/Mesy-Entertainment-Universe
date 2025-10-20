
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check, CircleDollarSign, AlertCircle } from "lucide-react";

export default function WalletNotificationsPage() {

    const notifications = [
        {
            title: "Income Received",
            description: "Your monthly income of $4,850.00 has been credited to your USD Wallet.",
            time: "2 days ago",
            icon: <CircleDollarSign className="h-5 w-5 text-green-500" />,
            isRead: false,
        },
        {
            title: "Withdrawal Processed",
            description: "Your withdrawal of $500.00 has been successfully processed.",
            time: "5 days ago",
            icon: <CircleDollarSign className="h-5 w-5 text-blue-500" />,
            isRead: true,
        },
        {
            title: "Deposit Failed",
            description: "Your deposit of $100.00 failed. Please check your payment method.",
            time: "1 week ago",
            icon: <AlertCircle className="h-5 w-5 text-red-500" />,
            isRead: true,
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bell className="text-primary"/>
                    Financial Notifications
                </CardTitle>
                <CardDescription>Updates and alerts related to your wallet activities.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {notifications.map((notification, index) => (
                    <div key={index} className={`flex items-start gap-4 p-4 border rounded-lg ${notification.isRead ? 'bg-card' : 'bg-secondary/30'}`}>
                        <div className="p-2 bg-secondary/50 rounded-full mt-1">
                           {notification.icon}
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">{notification.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                        {!notification.isRead && (
                            <Button variant="ghost" size="icon" title="Mark as read">
                                <Check className="h-4 w-4"/>
                            </Button>
                        )}
                    </div>
                ))}
                 <div className="text-center pt-4">
                    <Button variant="outline">Load More</Button>
                 </div>
            </CardContent>
        </Card>
    );
}
