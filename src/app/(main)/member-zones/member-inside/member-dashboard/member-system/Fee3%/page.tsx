import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Percent, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function FeePage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Percent className="text-primary" />
                    Service Fee (3%)
                </CardTitle>
                <CardDescription>
                    Information about the 3% service fee on monthly income.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Why is there a 3% service fee?</AlertTitle>
                    <AlertDescription>
                        <p>The 3% service fee is deducted from the total monthly income generated from your downline. This fee is crucial for the maintenance and continuous development of the MESY platform.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>System Maintenance:</strong> Ensuring the platform runs smoothly and securely 24/7.</li>
                            <li><strong>Feature Development:</strong> Funding for new tools, features, and improvements for all members.</li>
                            <li><strong>Support & Operations:</strong> Maintaining our support team and operational costs.</li>
                        </ul>
                        <p className="mt-2">This small fee allows us to sustain a healthy ecosystem where all members can thrive and earn income securely.</p>
                    </AlertDescription>
                </Alert>
                 <div className="p-6 bg-secondary/30 rounded-lg text-center">
                    <p className="text-muted-foreground">Detailed fee breakdown and history will be available here.</p>
                </div>
            </CardContent>
        </Card>
    );
}
