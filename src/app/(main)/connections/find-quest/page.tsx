
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Briefcase, Star } from "lucide-react";

export default function FindQuestPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center gap-4 mb-4">
            <Search className="w-10 h-10 text-primary" />
            <Briefcase className="w-10 h-10 text-primary" />
            <Star className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Find a Quest</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Offer your skills and find part-time work. Browse through quests posted by other members and start earning.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>The Quest Board is being forged. Soon, you'll be able to browse a list of available jobs, filter by category, and apply with your MESY Profile.</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-b-lg">
          <p className="text-muted-foreground">The Quest Board for Talents will be available here shortly.</p>
        </CardContent>
      </Card>
    </div>
  );
}
