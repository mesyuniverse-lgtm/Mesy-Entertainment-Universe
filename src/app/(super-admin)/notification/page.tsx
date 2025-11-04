
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bell, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function NotificationPage() {
    return (
        <Card className="bg-card/50 backdrop-blur-sm border-white/10 text-white">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bell /> Global Notifications
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                    Send announcements and alerts to all users or specific groups.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="space-y-4">
                    <Textarea placeholder="Compose your global notification..." className="bg-background/50 h-32" />
                    <div className="flex justify-end">
                        <Button><Send className="mr-2 h-4 w-4"/> Send Notification</Button>
                    </div>
                 </div>
            </CardContent>
        </Card>
    );
}
