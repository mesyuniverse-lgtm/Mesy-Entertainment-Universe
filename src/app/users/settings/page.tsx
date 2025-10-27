'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, Lock, MapPin, Badge, Pen, Shield } from "lucide-react";

export default function UserSettingsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account and personal information.</p>
            </div>

            {/* Account Information Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><User className="text-primary"/> Account Information</CardTitle>
                    <CardDescription>Manage your login and contact information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-end gap-4 p-4 border rounded-lg">
                        <div className="flex-grow space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2"><Mail className="h-4 w-4"/> Email Address</Label>
                            <Input id="email" type="email" defaultValue="user@mesy.io" />
                        </div>
                        <Button variant="outline">Update</Button>
                        <Button>Verify</Button>
                    </div>
                    <div className="flex items-end gap-4 p-4 border rounded-lg">
                        <div className="flex-grow space-y-2">
                            <Label htmlFor="phone" className="flex items-center gap-2"><Phone className="h-4 w-4"/> Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="Add your phone number" />
                        </div>
                        <Button variant="outline">Add</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Personal Details Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Badge className="text-primary"/> Personal Details</CardTitle>
                    <CardDescription>This information will be displayed on your public profile.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="firstname">Firstname</Label>
                        <Input id="firstname" placeholder="Your firstname" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastname">Lastname</Label>
                        <Input id="lastname" placeholder="Your lastname" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="nickname">Nickname (ฉายา)</Label>
                        <Input id="nickname" placeholder="Your display name" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">Personal Info (ข้อมูลส่วนตัว)</Label>
                        <Textarea id="bio" placeholder="Tell everyone a little about yourself" />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                         <Button>Save Personal Details</Button>
                    </div>
                </CardContent>
            </Card>

             {/* Address Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><MapPin className="text-primary"/> Address</CardTitle>
                    <CardDescription>Manage your shipping and billing address.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <Textarea placeholder="123 Fantasy Lane, Aethelgard, 90210" />
                     <div className="flex justify-end">
                        <Button>Update Address</Button>
                     </div>
                </CardContent>
            </Card>

            {/* Security Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Shield className="text-primary"/> Security</CardTitle>
                    <CardDescription>Manage your password and other security settings.</CardDescription>
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
                     <div className="border-t pt-6 space-y-2">
                        <Label htmlFor="pin-code" className="flex items-center gap-2"><Pen className="h-4 w-4"/> Transaction PIN Code</Label>
                        <p className="text-sm text-muted-foreground">Set a 6-digit PIN for confirming important transactions.</p>
                        <div className="flex items-center gap-4">
                            <Input id="pin-code" type="password" placeholder="Enter 6-digit PIN" maxLength={6} className="w-48"/>
                            <Button variant="outline">Set/Change PIN</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}