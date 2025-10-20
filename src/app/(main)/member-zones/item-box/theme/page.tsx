
import { Card, CardContent } from "@/components/ui/card";
import { Palette } from "lucide-react";

export default function ThemePage() {
  return (
    <Card className="flex items-center justify-center min-h-[400px] bg-secondary/20 border-dashed">
        <CardContent className="text-center p-6">
            <Palette className="mx-auto h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-medium font-headline">My Themes</h3>
            <p className="mt-2 text-sm text-muted-foreground">Your collection of profile and UI themes will appear here. Coming soon!</p>
        </CardContent>
    </Card>
  );
}
