
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SuperAdminSettingsPage() {
    return (
        <Card className="bg-card/50 backdrop-blur-sm border-white/10 text-white">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Settings /> System Settings
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                    Configure global platform settings, feature flags, and system parameters.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="p-12 border-2 border-dashed border-muted-foreground/30 rounded-lg text-center text-muted-foreground">
                    Global system configuration options will appear here.
                </div>
            </CardContent>
        </Card>
    );
}
