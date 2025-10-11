import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Platform Features</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          A deep dive into the tools and experiences that make the MESY Universe unique.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Zap className="text-primary"/> More Features Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This section is under development. We are crafting more exciting features like the Developer Zone, advanced gamification, and immersive 3D experiences. Stay tuned!</p>
        </CardContent>
      </Card>
    </div>
  );
}
