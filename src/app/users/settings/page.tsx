'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Shield, CreditCard, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function UserSettingsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your security and notification preferences.</p>
            </div>

            {/* Security Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Shield className="text-primary"/> Security</CardTitle>
                    <CardDescription>Manage your password and other security settings to keep your account safe.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="current-password" className="flex items-center gap-2"><Lock className="h-4 w-4"/> Change Password</Label>
                        <Input id="current-password" type="password" placeholder="Current Password" />
                        <Input id="new-password" type="password" placeholder="New Password" />
                        <Input id="confirm-password" type="password" placeholder="Confirm New Password" />
                         <div className="flex justify-end pt-2">
                            <Button>Change Password</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Payment Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><CreditCard className="text-primary"/> Payment Methods</CardTitle>
                    <CardDescription>Manage your connected payment methods for purchases.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">No payment methods connected.</p>
                    <Button variant="outline">Add Payment Method</Button>
                </CardContent>
            </Card>

             {/* Notifications Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Bell className="text-primary"/> Notifications</CardTitle>
                    <CardDescription>Choose how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive updates about your account and new features.</p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                   </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <Label htmlFor="push-notifications">Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">Get real-time alerts on your devices.</p>
                        </div>
                        <Switch id="push-notifications" />
                   </div>
                </CardContent>
            </Card>

        </div>
    );
}
