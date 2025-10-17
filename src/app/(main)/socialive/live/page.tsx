
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radio } from "lucide-react";

export default function LivePage() {
  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Live Streaming</h1>
            <p className="text-muted-foreground">Broadcast yourself or watch live events from the community.</p>
        </div>
        <Card className="flex items-center justify-center min-h-[400px]">
            <CardContent className="text-center p-6">
                <Radio className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Live Streaming Hub Coming Soon</h3>
                <p className="mt-1 text-sm text-muted-foreground">You'll be able to start solo/group streams and watch others here.</p>
            </CardContent>
        </Card>
    </div>
  );
}
