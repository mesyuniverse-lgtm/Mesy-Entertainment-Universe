import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export default function PaymentPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Payment Methods</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Wallets & Payment</CardTitle>
                    <CardDescription>Manage your connected payment methods for withdrawals.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <p className="font-semibold">Main Wallet</p>
                            <p className="text-muted-foreground text-sm">Balance: $4,850.00</p>
                        </div>
                        <Button variant="outline">Withdraw</Button>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg"><Wallet className="h-5 w-5"/>Connect a Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">This feature is coming soon. You will be able to connect Google Pay, TrueMoney, PayPal, and more.</p>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
}
