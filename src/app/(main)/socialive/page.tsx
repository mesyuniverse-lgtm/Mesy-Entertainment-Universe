import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function SocialivePage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Socialive</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Connect, share, and engage with the community in real-time.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users className="text-primary"/> Public & Private Rooms Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">The Socialive Hub is currently under construction. Soon, you'll be able to join public rooms, create private sessions, and interact with creators and friends. Please check back later!</p>
        </CardContent>
      </Card>
    </div>
  );
}
