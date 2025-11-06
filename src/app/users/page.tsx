
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Shield, Star, Users } from "lucide-react";
import { useUser } from "@/firebase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function UsersPage() {
    const { user } = useUser();
    const { toast } = useToast();

    // This email is designated as a verified user who needs to complete registration.
    const editorEmail = 'tipyatida@gmail.com';
    const isPendingMember = user?.email === editorEmail;

    const handleRegistration = () => {
        // In a real application, this would trigger an update in Firestore
        // to change the user's role to 'Member'.
        toast({
            title: "Congratulations!",
            description: "You have unlocked Level 0 membership. You can now earn from $1-$50,000 across levels 0-50 with 1-50,000 downline members.",
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
            
            {isPendingMember && (
                <Card className="bg-primary/10 border-primary/50">
                    <CardHeader>
                        <CardTitle>Complete Your Membership</CardTitle>
                        <CardDescription>
                            Your account is verified. Complete the final step to unlock all MESY Member benefits and start your journey.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button size="lg" onClick={handleRegistration}>
                            Register to become a full member
                        </Button>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Followers</CardTitle>
                        <Users className="text-muted-foreground h-4 w-4"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5,100</div>
                        <p className="text-xs text-muted-foreground">+201 since last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Following</CardTitle>
                        <Users className="text-muted-foreground h-4 w-4"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2,100</div>
                        <p className="text-xs text-muted-foreground">+18 since last month</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Account Status</CardTitle>
                        <Shield className="text-muted-foreground h-4 w-4"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">User</div>
                        <p className="text-xs text-muted-foreground">Not a Member</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">MESY Coins</CardTitle>
                        <DollarSign className="text-muted-foreground h-4 w-4"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0.00</div>
                        <p className="text-xs text-muted-foreground">Verify payment to earn</p>
                    </CardContent>
                </Card>
            </div>
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Welcome!</CardTitle>
                    <CardDescription>This is your personal dashboard. Explore the MESY universe and consider becoming a member to unlock more features!</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                   <p>Your journey begins here. Connect with others, explore content, and build your presence.</p>
                </CardContent>
            </Card>
        </div>
    );
}
