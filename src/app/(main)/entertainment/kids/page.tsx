import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ToyBrick, Smile, Film } from "lucide-react";

export default function KidsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center gap-4 mb-4">
            <ToyBrick className="w-10 h-10 text-primary" />
            <Smile className="w-10 h-10 text-primary" />
            <Film className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Kids Zone</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          A safe and fun space for our youngest explorers.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This area is under development. We're creating a magical place for kids with fun games, educational videos, and creative activities!</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-b-lg">
          <p className="text-muted-foreground">The Kids Zone is currently being built by our magic engineers.</p>
        </CardContent>
      </Card>
    </div>
  );
}
