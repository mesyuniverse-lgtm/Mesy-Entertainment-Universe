
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Palette, Bell } from "lucide-react";

export default function SettingsPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>
            
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Palette className="text-primary"/> Appearance</CardTitle>
                        <CardDescription>Customize the look and feel of the application.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <Label>Theme</Label>
                                <p className="text-sm text-muted-foreground">Select your preferred color theme.</p>
                            </div>
                            <div className="flex space-x-2">
                                <Button variant="outline" className="flex-1">Light</Button>
                                <Button variant="default" className="flex-1">Dark</Button>
                                <Button variant="outline" className="flex-1">System</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Bell className="text-primary"/> Notifications</CardTitle>
                        <CardDescription>Choose how you want to be notified.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <Label htmlFor="downline-notifications">Downline Activity</Label>
                                <p className="text-sm text-muted-foreground">Get notified when someone joins your downline.</p>
                            </div>
                            <Switch id="downline-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <Label htmlFor="income-notifications">Income Reports</Label>
                                <p className="text-sm text-muted-foreground">Receive summaries of your monthly income.</p>
                            </div>
                            <Switch id="income-notifications" defaultChecked />
                        </div>
                         <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <Label htmlFor="quest-notifications">New Quests</Label>
                                <p className="text-sm text-muted-foreground">Get alerts when new quests are available.</p>
                            </div>
                            <Switch id="quest-notifications" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
