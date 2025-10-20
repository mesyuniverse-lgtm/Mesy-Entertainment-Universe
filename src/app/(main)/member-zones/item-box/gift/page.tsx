
import { Card, CardContent } from "@/components/ui/card";
import { Gift } from "lucide-react";

export default function GiftPage() {
  return (
    <Card className="flex items-center justify-center min-h-[400px] bg-secondary/20 border-dashed">
        <CardContent className="text-center p-6">
            <Gift className="mx-auto h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-medium font-headline">My Gifts</h3>
            <p className="mt-2 text-sm text-muted-foreground">Items you can send as gifts to other members will appear here. Coming soon!</p>
        </CardContent>
    </Card>
  );
}
