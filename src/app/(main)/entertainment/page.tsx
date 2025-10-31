

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Music, Video, Gamepad2, Mic, Ticket, Map, Store, Tv, ArrowRight, Sparkles, ToyBrick, Smile, Film, PawPrint } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EntertainmentPage() {

  const entertainmentSections = [
    {
      title: "Artists & Music",
      description: "Discover new music, videos, and live streams. Promote your own brand, sound, and host events.",
      icon: <div className="flex gap-2"><Music className="text-primary"/><Video className="text-primary"/><Mic className="text-primary"/><Tv className="text-primary"/></div>,
      href: "/entertainment/showcase",
      comingSoon: false,
    },
    {
      title: "Artist Showcase",
      description: "Explore a feed of the latest posts, songs, and videos directly from your favorite artists. Like, comment, and support their work.",
      icon: <div className="flex gap-2"><Sparkles className="text-primary"/><Video className="text-primary"/><Music className="text-primary"/></div>,
      href: "/entertainment/showcase",
      comingSoon: false,
    },
    {
      title: "Movies & Streaming",
      description: "Browse movie packages from Netflix, WeTV, and more. Subscribe using MESY Coins.",
      icon: <div className="flex gap-2"><Video className="text-primary"/><Ticket className="text-primary"/><Mic className="text-primary"/></div>,
      href: "/entertainment/movies",
      comingSoon: false,
    },
    {
      title: "Games",
      description: "Explore games, watch live streams, and see behind-the-scenes content. Subscribe with MESY Coins.",
      icon: <div className="flex gap-2"><Gamepad2 className="text-primary"/><Video className="text-primary"/><Tv className="text-primary"/><Mic className="text-primary"/></div>,
      href: "/entertainment/games",
      comingSoon: false,
    },
    {
      title: "Karaoke",
      description: "Sing your heart out with a vast library of songs. Join public rooms or create private sessions with friends.",
      icon: <div className="flex gap-2"><Mic className="text-primary"/><Music className="text-primary"/><Tv className="text-primary"/></div>,
      href: "/entertainment/karaoke",
      comingSoon: false,
    },
    {
      title: "Kids Zone",
      description: "A safe and fun space for our youngest explorers with curated videos, games, and creative activities.",
      icon: <div className="flex gap-2"><ToyBrick className="text-primary"/><Smile className="text-primary"/><Film className="text-primary"/></div>,
      href: "/entertainment/kids",
      comingSoon: false,
    },
    {
      title: "Animals & Pets",
      description: "Share your furry friends' moments, find pet-friendly places, and connect with other animal lovers.",
      icon: <div className="flex gap-2"><PawPrint className="text-primary"/><Video className="text-primary"/><Store className="text-primary"/></div>,
      href: "/entertainment/animals",
      comingSoon: false,
    },
    {
      title: "Lifestyle & Venues",
      description: "Find local attractions, restaurants, and venues. Create your own page to promote your business.",
      icon: <div className="flex gap-2"><Map className="text-primary"/><Store className="text-primary"/><Video className="text-primary"/><Tv className="text-primary"/><Mic className="text-primary"/></div>,
      href: "/entertainment/venues",
      comingSoon: false,
    },
  ];

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Entertainment Hub</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Your portal to a universe of music, movies, games, and local experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {entertainmentSections.map((section) => (
          <Card key={section.title} className="flex flex-col hover:shadow-primary/20 transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <CardTitle>{section.title}</CardTitle>
                  {section.comingSoon && <span className="text-xs font-semibold text-primary/80">COMING SOON</span>}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{section.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" disabled={section.comingSoon}>
                <Link href={section.href}>
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

    </div>
  );
}
