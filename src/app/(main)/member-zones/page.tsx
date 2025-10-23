
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MemberZonesPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Member Zones</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          A glimpse into the exclusive areas and content reserved for our dedicated members.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="text-primary"/> 
              Enter the Member Zone
            </CardTitle>
            <CardDescription>
              Unlock special zones, content, and features by becoming a member.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">This is just a preview of what awaits inside. Join our universe to get full access.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                  <Link href="/member-zones/member-login">
                      Login to Member Zone
                  </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                  <Link href="/member-zones/member-register">
                      Register Now
                  </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
