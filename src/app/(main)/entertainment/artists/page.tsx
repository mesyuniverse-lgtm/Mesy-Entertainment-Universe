
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Music, Video, Mic, Tv, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ArtistsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center gap-4 mb-4">
            <Music className="w-10 h-10 text-primary" />
            <Video className="w-10 h-10 text-primary" />
            <Mic className="w-10 h-10 text-primary" />
            <Tv className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Artists & Music Hub</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Discover new artists, listen to their music, and watch exclusive content.
        </p>
      </div>

       <Card className="mb-8">
            <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <div className="relative w-full sm:max-w-lg">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search for artists, songs, or albums..." className="pl-10 h-12 text-lg" />
                    </div>
                    <Button size="lg" className="h-12 text-lg">Search</Button>
                </div>
            </CardContent>
        </Card>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This section is under construction. Stay tuned for a full-featured music and artist discovery platform!</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-b-lg">
          <p className="text-muted-foreground">Artist profiles, music players, and video showcases will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
