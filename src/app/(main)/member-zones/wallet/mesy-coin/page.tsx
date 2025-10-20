
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gem, ShoppingCart, Repeat } from "lucide-react";
import Link from "next/link";

export default function MesyCoinPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>MESY Coin Wallet</CardTitle>
                <CardDescription>The primary currency of the MESY Universe. Earned from quests, events, and can be used in the shop.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <div className="flex items-center gap-2">
                        <Gem className="h-8 w-8 text-primary" />
                        <p className="text-4xl font-bold">12,500</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button className="flex-1" size="lg" asChild>
                        <Link href="/shopping">
                            <ShoppingCart className="mr-2"/> Go to Shop
                        </Link>
                    </Button>
                    <Button className="flex-1" size="lg" variant="secondary">
                        <Repeat className="mr-2"/> Convert (Soon)
                    </Button>
                </div>
                <Card className="bg-secondary/30">
                    <CardHeader>
                        <CardTitle className="text-lg">What are MESY Coins?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm">
                            MESY Coins are the lifeblood of our economy. Use them to purchase exclusive items in the Mesy Shop, trade with other members in the Mesy Market, or subscribe to premium content and services.
                        </p>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
