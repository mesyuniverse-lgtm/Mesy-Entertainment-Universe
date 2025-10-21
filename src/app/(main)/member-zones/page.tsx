
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, AlertCircle, Mail, CreditCard, XCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function MemberZonesPage() {
  // Mock user verification status. In a real app, this would come from user data.
  const isVerified = false; // Set to `true` to see the verified state
  const isLoggedIn = false; // Mock login status

  const verificationSteps = [
    {
      name: "Email/Phone Number Verification",
      verified: false,
      icon: Mail,
    },
    {
      name: "Payment Connection",
      verified: false,
      icon: CreditCard,
    },
  ];

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Member Zones</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          A glimpse into the exclusive areas and content reserved for our dedicated members.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Verification Status Card */}
        <Card className={cn("border-2", isVerified ? "border-green-500/50" : "border-destructive/50")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {isVerified ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <AlertCircle className="h-6 w-6 text-destructive" />
              )}
              Membership Eligibility
            </CardTitle>
            <CardDescription>
              {isVerified
                ? "Your account is verified and ready."
                : "Please complete the following steps before joining."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {verificationSteps.map((step) => (
                <li key={step.name} className="flex items-center gap-3 text-sm">
                  {isVerified || step.verified ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                  <span className={cn(!isVerified && !step.verified && "text-muted-foreground")}>{step.name}</span>
                </li>
              ))}
            </ul>
            
            {!isVerified && (
               <div className="mt-6 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
                  <p className="text-destructive font-semibold text-sm">
                    กรุณายืนยันตัวตน
                  </p>
                  <p className="text-xs text-destructive/80 mt-1">
                    This is a trial phase. Access is currently limited to authorized test accounts.
                  </p>
               </div>
            )}
             {isVerified && (
               <div className="mt-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                  <p className="text-green-500 font-semibold text-sm">
                    Account Verified
                  </p>
               </div>
            )}
          </CardContent>
        </Card>

        {/* Action Card */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="text-primary"/> 
              Enter the Member Zone
            </CardTitle>
            <CardDescription>
              Once your account is verified, you can log in or register to become a member.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">Unlock special zones, content, and features. This is just a preview of what awaits inside!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" disabled={!isVerified && !isLoggedIn}>
                  <Link href="/member-zones/member-login">
                      Login to Member Zone
                  </Link>
              </Button>
              <Button asChild size="lg" variant="outline" disabled={!isVerified}>
                  <Link href="/member-zones/member-register">
                      Register Now
                  </Link>
              </Button>
            </div>
             <p className="text-xs text-muted-foreground mt-4">
              Registration is disabled until your account is verified.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
