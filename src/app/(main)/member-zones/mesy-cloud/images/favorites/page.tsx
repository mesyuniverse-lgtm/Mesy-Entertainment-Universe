
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  return (
    <Card className="flex items-center justify-center min-h-[400px] bg-secondary/20 border-dashed">
        <CardContent className="text-center p-6">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Favorites</h3>
            <p className="mt-1 text-sm text-muted-foreground">Your favorite images will be collected here. Coming soon!</p>
        </CardContent>
    </Card>
  );
}
