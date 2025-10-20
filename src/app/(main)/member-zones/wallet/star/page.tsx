
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShieldCheck } from "lucide-react";

export default function StarPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Star Wallet</CardTitle>
                <CardDescription>Stars are a premium currency, representing your status and granting unique privileges.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <div className="flex items-center gap-2">
                        <Star className="h-8 w-8 text-purple-400 fill-purple-400" />
                        <p className="text-4xl font-bold">75</p>
                    </div>
                </div>
                <Button className="w-full" size="lg" disabled>
                    <ShieldCheck className="mr-2"/> Access VIP Area (Coming Soon)
                </Button>
                 <Card className="bg-secondary/30">
                    <CardHeader>
                        <CardTitle className="text-lg">The Power of Stars</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-muted-foreground text-sm">
                           Stars are rare and valuable. They are primarily acquired through level-up rewards or by purchasing special packages. Holding Stars grants access to VIP-only shops, exclusive live events, and provides a status symbol recognized throughout the MESY Universe.
                       </p>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
