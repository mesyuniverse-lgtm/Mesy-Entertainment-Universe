
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, FilePlus2, Heart, Search, Sparkles, Users } from "lucide-react";
import Link from "next/link";

export default function ConnectionsPage() {

  const connectionZones = [
    {
      icon: <Heart className="w-10 h-10 text-primary" />,
      title: "Dating Zone",
      description: "Discover meaningful connections and find your partner in the MESY Universe.",
      href: "/connections/dating",
      buttonText: "Enter Dating Zone"
    },
    {
      icon: <FilePlus2 className="w-10 h-10 text-primary" />,
      title: "Post a Quest (For Hirers)",
      description: "Need help? Post a job quest to find personal assistants, bodyguards, chefs, and other skilled individuals.",
      href: "/connections/post-quest/create-new-quest",
      buttonText: "Post Your Quest"
    },
    {
      icon: <Search className="w-10 h-10 text-primary" />,
      title: "Find a Quest (For Talents)",
      description: "Offer your skills. Browse and accept quests for part-time work, from personal services to entertainment gigs.",
      href: "/connections/find-quest",
      buttonText: "Find a Quest"
    }
  ];

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center gap-4 mb-4">
            <Users className="w-10 h-10 text-primary" />
            <Briefcase className="w-10 h-10 text-primary" />
            <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">The Connection Hub</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Your center for building all types of relationships—from personal connections to professional services.
        </p>
      </div>

       <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
        {connectionZones.map((zone) => (
          <Card key={zone.title} className="flex flex-col bg-card/70 border-border/50 hover:border-primary/50 hover:bg-card transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
            <CardHeader className="items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-2">
                {zone.icon}
              </div>
              <CardTitle className="text-2xl">{zone.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-center">
              <CardDescription>{zone.description}</CardDescription>
            </CardContent>
             <CardContent>
                <Button asChild className="w-full">
                    <Link href={zone.href}>
                        {zone.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}
