
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Briefcase, Sparkles } from "lucide-react";

export default function ConnectionsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center gap-4 mb-4">
            <Users className="w-10 h-10 text-primary" />
            <Briefcase className="w-10 h-10 text-primary" />
            <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">The Connection & Personal Services</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Find friends, companions, personal assistants, bodyguards, and other professional services to enhance your lifestyle in the MESY Universe.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This hub for personal and professional connections is under construction. Soon you'll be able to find the right people for any task or companionship, from personal chefs and bodyguards to travel buddies and personal managers.</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-b-lg">
          <p className="text-muted-foreground">The Connection Hub is being forged in the heart of the universe.</p>
        </CardContent>
      </Card>
    </div>
  );
}
