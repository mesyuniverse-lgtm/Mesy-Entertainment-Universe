import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-destructive">
        <CardHeader className="text-center">
          <div className="mx-auto bg-destructive/20 p-3 rounded-full w-fit">
            <ShieldAlert className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl mt-4">Access Denied</CardTitle>
          <CardDescription>
            Your account does not have permission to access this area.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            Only authorized members can access the Member Zone. Please contact support if you believe this is an error.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/home">Return to Home</Link>
            </Button>
             <Button asChild variant="outline">
              <Link href="/member-plan">View Plans</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
