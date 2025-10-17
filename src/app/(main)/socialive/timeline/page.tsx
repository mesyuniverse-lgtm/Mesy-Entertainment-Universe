
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";

export default function TimelinePage() {
  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Timeline</h1>
            <p className="text-muted-foreground">Your personal feed. See updates from friends and groups you follow.</p>
        </div>
        <Card className="flex items-center justify-center min-h-[400px]">
            <CardContent className="text-center p-6">
                <Home className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Timeline Coming Soon</h3>
                <p className="mt-1 text-sm text-muted-foreground">This is where your personal feed of posts and updates will appear.</p>
            </CardContent>
        </Card>
    </div>
  );
}
