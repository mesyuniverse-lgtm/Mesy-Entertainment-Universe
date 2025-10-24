import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AvatarCanvas } from "@/components/profile/avatar-canvas";

export default function ProfilePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">User Profile</h1>
            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 h-[500px]">
                    <CardHeader>
                        <CardTitle>3D Avatar</CardTitle>
                        <CardDescription>Interact with your 3D avatar. This is just a placeholder.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[calc(100%-80px)]">
                        <AvatarCanvas />
                    </CardContent>
                </Card>

                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Edit Profile</CardTitle>
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
                            <Label htmlFor="avatar">Avatar Model URL</Label>
                            <Input id="avatar" placeholder="https://..." disabled />
                        </div>
                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
