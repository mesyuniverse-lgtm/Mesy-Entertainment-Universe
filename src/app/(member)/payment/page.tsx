import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus } from "lucide-react";

export default function PaymentPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Payment Methods</h1>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="text-primary" />
                        Manage Payments
                    </CardTitle>
                    <CardDescription>
                        Add or remove payment methods for your MESY account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-6 bg-secondary/30 rounded-lg text-center">
                        <p className="text-muted-foreground">You have no saved payment methods.</p>
                    </div>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Payment Method
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
