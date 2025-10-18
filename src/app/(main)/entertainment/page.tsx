
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Video, Gamepad2, Mic, Clapperboard, MapPin, Handshake } from "lucide-react";

export default function EntertainmentPage() {
  const sections = [
    {
      title: "Artist Hub",
      description: "A space for music labels and members to promote their work, build their brand, and connect with fans.",
      icon: <Mic className="h-8 w-8 text-primary" />,
    },
    {
      title: "Music",
      description: "Discover new tracks from established artists and emerging talent within the MESY community.",
      icon: <Music className="h-8 w-8 text-primary" />,
    },
    {
      title: "Movies & Series",
      description: "Access curated movie packages from top providers using MESY Coins. Your next binge-watch awaits.",
      icon: <Clapperboard className="h-8 w-8 text-primary" />,
    },
    {
      title: "Games",
      description: "Explore a universe of games. Subscribe to game packages from various publishers with your MESY Coins.",
      icon: <Gamepad2 className="h-8 w-8 text-primary" />,
    },
    {
      title: "Places & Events",
      description: "Connect with real-world venues. Promote your business, create quests, and offer exclusive rewards to members.",
      icon: <MapPin className="h-8 w-8 text-primary" />,
    },
    {
      title: "Talent Hub",
      description: "Find companions, guides, tutors, or bodyguards. Offer your skills and services to the community.",
      icon: <Handshake className="h-8 w-8 text-primary" />,
    }
  ];

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Entertainment Hub</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Your portal to a universe of music, film, games, and real-world experiences. The future of entertainment is being built.
        </p>
      </div>
      
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-3xl">Launching Soon!</CardTitle>
          <p className="text-muted-foreground">The MESY Entertainment Universe is expanding. Here's a glimpse of what's to come:</p>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section) => (
              <div key={section.title} className="flex gap-4 items-start">
                  <div className="p-3 bg-secondary rounded-lg">
                      {section.icon}
                  </div>
                  <div>
                      <h3 className="text-xl font-semibold">{section.title}</h3>
                      <p className="text-muted-foreground mt-1">{section.description}</p>
                  </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
