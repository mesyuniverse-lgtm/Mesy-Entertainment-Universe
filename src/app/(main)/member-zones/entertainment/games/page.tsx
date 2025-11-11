import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gamepad2, Clapperboard, Ticket } from "lucide-react";

export default function GamesPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center gap-4 mb-4">
            <Gamepad2 className="w-10 h-10 text-primary" />
            <Clapperboard className="w-10 h-10 text-primary" />
            <Ticket className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Games & eSports</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Dive into new worlds, watch epic tournaments, and connect with fellow gamers.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This realm is still under construction by the architects of the universe. Prepare for a new dimension of gaming!</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-b-lg">
          <p className="text-muted-foreground">Game libraries, live stream integrations, and eSports arenas will materialize here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
