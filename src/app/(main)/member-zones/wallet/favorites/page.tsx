
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function FavoritesPage() {
  return (
    <Card className="flex items-center justify-center min-h-[400px] bg-secondary/20 border-dashed">
        <CardContent className="text-center p-6">
            <Star className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Favorite Transactions</h3>
            <p className="mt-1 text-sm text-muted-foreground">Important or recurring transactions can be marked as favorite for easy access. This feature is coming soon!</p>
        </CardContent>
    </Card>
  );
}
