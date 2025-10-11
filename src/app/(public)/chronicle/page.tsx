import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function ChroniclePage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">The Chronicle</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          A record of our journey, from creation to the latest system updates, and a glimpse into our future roadmap.
        </p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BookOpen className="text-primary"/> Chronicle In Development</CardTitle>
          <CardDescription>Phase 1: Public Pages, Auth, and Member Dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">You are currently viewing the first phase of our deployment. The chronicle will be updated as we progress through our roadmap, detailing each new feature and milestone.</p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-muted-foreground">
            <li><span className="font-semibold text-foreground">Phase 1 (Complete):</span> Public pages, Authentication Flow, Member Dashboard.</li>
            <li><span className="font-semibold text-foreground">Phase 2 (Next):</span> Membership Logic, Downline System, Rewards.</li>
            <li><span className="font-semibold text-foreground">Phase 3:</span> AI Hub, Entertainment, Shopping.</li>
            <li><span className="font-semibold text-foreground">Phase 4:</span> Developer Zone, Gamification, 3D UX.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
