import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Profile</h1>
            <Card>
                <CardHeader>
                    <CardTitle>User Profile</CardTitle>
                    <CardDescription>Manage your public and private information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nickname">Nickname</Label>
                        <Input id="nickname" defaultValue="User" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" placeholder="Tell us about yourself" />
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
