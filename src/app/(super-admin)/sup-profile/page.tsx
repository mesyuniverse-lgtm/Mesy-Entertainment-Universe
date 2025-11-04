
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserCircle } from "lucide-react";

export default function SuperAdminProfilePage() {
    return (
        <Card className="bg-card/50 backdrop-blur-sm border-white/10 text-white">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <UserCircle /> Super Admin Profile
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                    Manage your Super Admin profile information.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="p-12 border-2 border-dashed border-muted-foreground/30 rounded-lg text-center text-muted-foreground">
                    Profile settings for the Super Admin will be configured here.
                </div>
            </CardContent>
        </Card>
    );
}
