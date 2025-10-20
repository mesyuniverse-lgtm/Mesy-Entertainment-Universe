
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clapperboard } from "lucide-react";

export default function SocialVideoPage() {
  return (
    <div>
        <Card className="flex items-center justify-center min-h-[600px] bg-secondary/20">
            <CardContent className="text-center p-6">
                <Clapperboard className="mx-auto h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-medium">Social Video Feed Coming Soon</h3>
                <p className="mt-1 text-sm text-muted-foreground">Get ready for a TikTok-style video experience. This is where the main video feed will be.</p>
            </CardContent>
        </Card>
    </div>
  );
}
