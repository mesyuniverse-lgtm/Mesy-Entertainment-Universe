
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function MomentsPage() {
  return (
    <Card className="flex items-center justify-center min-h-[400px] bg-secondary/20 border-dashed">
        <CardContent className="text-center p-6">
            <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Moment's</h3>
            <p className="mt-1 text-sm text-muted-foreground">This is where your captured moments will appear. Coming soon!</p>
        </CardContent>
    </Card>
  );
}
