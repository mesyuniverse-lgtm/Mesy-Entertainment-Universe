import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Percent, Info, Store } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function FeePage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Percent className="text-primary" />
                    % Service Fee
                </CardTitle>
                <CardDescription>
                    Information about the service fees within the MESY Universe.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Income System Fee (3%)</AlertTitle>
                    <AlertDescription>
                        <p>The 3% service fee is deducted from the total monthly income generated from your downline. This fee is crucial for the maintenance and continuous development of the MESY platform.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>System Maintenance:</strong> Ensuring the platform runs smoothly and securely 24/7.</li>
                            <li><strong>Feature Development:</strong> Funding for new tools, features, and improvements for all members.</li>
                            <li><strong>Support & Operations:</strong> Maintaining our support team and operational costs.</li>
                        </ul>
                    </AlertDescription>
                </Alert>
                <Alert>
                    <Store className="h-4 w-4" />
                    <AlertTitle>MESY Market Fee (1%)</AlertTitle>
                    <AlertDescription>
                        <p>A 1% transaction fee is applied to each successful sale on the MESY Market. This fee is charged to the seller upon completion of the transaction.</p>
                         <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Marketplace Upkeep:</strong> Covers the costs of maintaining and securing the peer-to-peer marketplace.</li>
                            <li><strong>Transaction Security:</strong> Ensures safe and reliable transactions between members.</li>
                        </ul>
                        <p className="mt-2">This nominal fee helps sustain a vibrant and secure player-driven economy.</p>
                    </AlertDescription>
                </Alert>
                 <div className="p-6 bg-secondary/30 rounded-lg text-center">
                    <p className="text-muted-foreground">Detailed fee breakdown and transaction history will be available in the 'Transactions' section.</p>
                </div>
            </CardContent>
        </Card>
    );
}
