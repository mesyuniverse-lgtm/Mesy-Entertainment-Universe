
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FilePlus2, Users, HandCoins } from "lucide-react";

export default function PostQuestPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center gap-4 mb-4">
            <FilePlus2 className="w-10 h-10 text-primary" />
            <Users className="w-10 h-10 text-primary" />
            <HandCoins className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Post a Quest</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Hire talented members of the MESY community for your personal or professional needs. Create a quest and find the perfect person for the job.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>The ability to create and post new quests is under construction. Soon, you'll be able to define your needs, set a budget, and attract the right talent from our community.</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-b-lg">
          <p className="text-muted-foreground">The Quest Creation Form will be available here shortly.</p>
        </CardContent>
      </Card>
    </div>
  );
}
