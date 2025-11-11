import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Film, Clapperboard, Ticket } from "lucide-react";

export default function MoviesPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center gap-4 mb-4">
            <Film className="w-10 h-10 text-primary" />
            <Clapperboard className="w-10 h-10 text-primary" />
            <Ticket className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Movies & Streaming</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Your personal cinema. Browse movies, subscribe to packages, and enjoy endless entertainment.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This section is under construction. Get ready for a seamless movie streaming experience, powered by MESY Coins!</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-b-lg">
          <p className="text-muted-foreground">Movie listings, subscription packages, and a streaming player will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
