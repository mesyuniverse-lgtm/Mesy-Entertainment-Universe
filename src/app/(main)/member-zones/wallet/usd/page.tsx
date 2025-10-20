
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default function UsdWalletPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>USD Wallet</CardTitle>
                <CardDescription>Manage your balance for withdrawals and deposits from external sources.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="text-4xl font-bold">$4,850.00</p>
                </div>
                <div className="flex gap-4">
                    <Button className="flex-1" size="lg"><ArrowDownLeft className="mr-2"/> Withdraw</Button>
                    <Button className="flex-1" size="lg" variant="secondary"><ArrowUpRight className="mr-2"/> Deposit</Button>
                </div>
                    <Card className="bg-secondary/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg"><Wallet className="h-5 w-5"/>Connect a Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm">This feature is coming soon. You will be able to connect Google Pay, TrueMoney, PayPal, and more for withdrawals and deposits.</p>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
