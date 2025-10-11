import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Video, Gamepad2 } from "lucide-react";

export default function EntertainmentPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Entertainment Hub</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Your destination for music, videos, artist showcases, and games.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <Music className="text-primary"/> 
            <Video className="text-primary"/> 
            <Gamepad2 className="text-primary"/> 
            Entertainment Content Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">We are curating an amazing collection of content from talented artists and creators. The Entertainment Hub will be your source for the best music, videos, and games in the MESY Universe. Stay tuned for launch!</p>
        </CardContent>
      </Card>
    </div>
  );
}
