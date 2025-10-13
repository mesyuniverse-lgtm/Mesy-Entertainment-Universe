
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";

export default function ProfilePage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight font-headline">โปรไฟล์ของฉัน</h1>
                <p className="text-muted-foreground">สะท้อนตัวตน: จัดการข้อมูลส่วนตัวและสาธารณะของคุณ</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="text-primary"/>
                        Your Profile
                    </CardTitle>
                    <CardDescription>This information may be displayed publicly. Be mindful of what you share.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nickname">Nickname</Label>
                        <Input id="nickname" defaultValue="User" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" placeholder="Tell us about your journey..." />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="avatar">Avatar URL</Label>
                        <Input id="avatar" placeholder="https://..." />
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    );
}
