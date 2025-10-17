
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clapperboard } from "lucide-react";

export default function SocialVideoPage() {
  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Social Video</h1>
            <p className="text-muted-foreground">A vertical feed of short, engaging videos from across the MESY Universe.</p>
        </div>
        <Card className="flex items-center justify-center min-h-[400px]">
            <CardContent className="text-center p-6">
                <Clapperboard className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Social Video Feed Coming Soon</h3>
                <p className="mt-1 text-sm text-muted-foreground">Get ready for a TikTok-style video experience.</p>
            </CardContent>
        </Card>
    </div>
  );
}
