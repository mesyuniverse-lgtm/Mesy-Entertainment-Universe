
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Plus, ArrowDownUp } from "lucide-react";

export default function WalletPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Wallet</h1>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Wallet className="text-primary" />
                        MESY Wallet
                    </CardTitle>
                    <CardDescription>
                        Manage your MESY coins, view your balance, and handle withdrawals.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Card className="bg-secondary/30">
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                            <p className="text-sm text-muted-foreground">Current Balance</p>
                            <p className="text-5xl font-bold tracking-tighter">1,250.75 <span className="text-primary text-2xl font-normal">MC</span></p>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" size="lg" className="h-auto py-4">
                            <div className="flex flex-col items-center gap-2">
                                <Plus className="h-6 w-6"/>
                                <span>Deposit</span>
                            </div>
                        </Button>
                         <Button variant="outline" size="lg" className="h-auto py-4">
                            <div className="flex flex-col items-center gap-2">
                                <ArrowDownUp className="h-6 w-6"/>
                                <span>Withdraw</span>
                            </div>
                        </Button>
                         <Button variant="outline" size="lg" className="h-auto py-4">
                            <div className="flex flex-col items-center gap-2">
                                <Wallet className="h-6 w-6"/>
                                <span>Connect Wallet</span>
                            </div>
                        </Button>
                    </div>
                    
                    <p className="text-muted-foreground text-center mt-4">Full wallet functionality is coming soon.</p>
                </CardContent>
            </Card>
        </div>
    );
}
