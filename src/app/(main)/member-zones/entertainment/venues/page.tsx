
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Map, Store, Video, Mic } from "lucide-react";

export default function VenuesPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center gap-4 mb-4">
            <Map className="w-10 h-10 text-primary" />
            <Store className="w-10 h-10 text-primary" />
            <Video className="w-10 h-10 text-primary" />
            <Mic className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Lifestyle & Venues</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Discover local attractions, promote your business, and connect with your community.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This area is being developed. Soon you'll be able to discover amazing places and create a page for your own venue!</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-b-lg">
          <p className="text-muted-foreground">Venue listings, maps, and promotional tools will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
