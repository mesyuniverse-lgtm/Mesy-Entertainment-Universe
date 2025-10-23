import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wallet } from "lucide-react";

export default function PaymentPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Payment</h1>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Wallet className="text-primary" />
                        MESY Wallet
                    </CardTitle>
                    <CardDescription>
                        Manage your MESY coins, view transaction history, and withdraw your earnings.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-6 bg-secondary/30 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Current Balance</p>
                        <p className="text-4xl font-bold tracking-tighter">1,250.75 <span className="text-primary text-xl">MESY</span></p>
                    </div>
                    <p className="text-muted-foreground text-center mt-4">Wallet functionality is coming soon.</p>
                </CardContent>
            </Card>
        </div>
    );
}
