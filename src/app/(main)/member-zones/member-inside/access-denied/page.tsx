import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="flex items-center justify-center min-h-full">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-destructive">
        <CardHeader className="text-center">
          <div className="mx-auto bg-destructive/20 p-3 rounded-full w-fit">
            <ShieldAlert className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl mt-4">Access Denied</CardTitle>
          <CardDescription>
            Your account does not have permission to access this area during the trial period.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            Only authorized test members can access the Member Zone at this time. Please contact the administrator if you believe this is an error.
          </p>
          <Button asChild>
            <Link href="/home">Return to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
