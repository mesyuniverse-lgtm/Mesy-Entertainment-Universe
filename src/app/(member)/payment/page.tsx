import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { History } from "lucide-react";

export default function PaymentPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Transaction History</h1>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <History className="text-primary" />
                        Transactions
                    </CardTitle>
                    <CardDescription>
                        View your transaction history and manage payment settings.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-6 bg-secondary/30 rounded-lg text-center">
                        <p className="text-muted-foreground">Transaction history will be displayed here.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
