
'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Shield, Star, Users, Loader2 } from "lucide-react";
import { useUser } from "@/firebase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import styles from './users.module.css';
import { cn } from "@/lib/utils";

const RegistrationAnimation = ({ onAnimationEnd }: { onAnimationEnd: () => void }) => {
    React.useEffect(() => {
        const timer = setTimeout(onAnimationEnd, 4000); // Animation duration + delay
        return () => clearTimeout(timer);
    }, [onAnimationEnd]);

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-in fade-in-50">
            {/* Flower Petals */}
            <div className={styles.petalContainer}>
                {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className={styles.petal}></div>
                ))}
            </div>

            {/* Door Animation */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <div className={cn(styles.door, styles.doorLeft)}></div>
                <div className={cn(styles.door, styles.doorRight)}></div>
                <div className="z-10 text-center text-white animate-in fade-in-0 delay-1000 duration-1000">
                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                    <p className="mt-4 text-xl font-semibold">Unlocking Membership...</p>
                </div>
            </div>
        </div>
    );
};


export default function UsersPage() {
    const { user } = useUser();
    const router = useRouter();
    const { toast } = useToast();
    const [isRegistering, setIsRegistering] = useState(false);

    const editorEmail = 'tipyatida@gmail.com';
    const isPendingMember = user?.email === editorEmail;

    const handleRegistration = () => {
        setIsRegistering(true);
    };

    const handleAnimationEnd = () => {
        toast({
            title: "Congratulations!",
            description: "You have unlocked Level 0 membership. You can now earn from $1-$50,000 across levels 0-50 with 1-50,000 downline members.",
        });
        router.push('/dashboard');
    };

    return (
        <>
            {isRegistering && <RegistrationAnimation onAnimationEnd={handleAnimationEnd} />}
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
                            <Button size="lg" onClick={handleRegistration} disabled={isRegistering}>
                                {isRegistering ? 'Processing...' : 'Register to become a full member'}
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
        </>
    );
}
