import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart, Users, Sparkles } from "lucide-react";

export default function DatingPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center gap-4 mb-4">
            <Heart className="w-10 h-10 text-primary" />
            <Users className="w-10 h-10 text-primary" />
            <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Dating Zone</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Discover meaningful connections and build relationships within the MESY Universe. Your next adventure could be a shared one.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>The stars are aligning for new connections. We are crafting a dedicated space for members to find meaningful relationships. Profile matching, private chats, and icebreaker events are on the horizon!</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-b-lg">
          <p className="text-muted-foreground">The Dating Zone is being built with care and a touch of magic.</p>
        </CardContent>
      </Card>
    </div>
  );
}
