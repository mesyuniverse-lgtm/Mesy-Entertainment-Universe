import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mic, Music, Users } from "lucide-react";

export default function KaraokePage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center gap-4 mb-4">
            <Mic className="w-10 h-10 text-primary" />
            <Music className="w-10 h-10 text-primary" />
            <Users className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Karaoke</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Sing your heart out with a vast library of songs. Join public rooms or create private sessions with friends.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>The stage is being set! Get ready to grab the mic and shine. Karaoke rooms, song libraries, and duet features will debut here.</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-b-lg">
          <p className="text-muted-foreground">The Karaoke Zone is currently under construction.</p>
        </CardContent>
      </Card>
    </div>
  );
}
