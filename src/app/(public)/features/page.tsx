import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Code, Gamepad2, HandCoins, Users, Mic, Star, Store, Palette, Wallet, Shield } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Socialive Platform",
      description: "A complete social ecosystem with live streaming, friends, followers, groups, and a dynamic timeline for member interaction.",
      tags: ["Live", "Community"]
    },
    {
      icon: <Mic className="w-8 h-8 text-primary" />,
      title: "Entertainment Hub",
      description: "Discover and promote music, movies, and games. A central hub for all forms of entertainment and artist showcases.",
      tags: ["Music", "Movies", "Games"]
    },
    {
      icon: <Bot className="w-8 h-8 text-primary" />,
      title: "AI Hub & Creation Tools",
      description: "Leverage powerful generative AI to create avatars, images, video content, and even code with our integrated Genkit SDK.",
      tags: ["AI Powered", "Genkit"]
    },
    {
      icon: <Store className="w-8 h-8 text-primary" />,
      title: "Shopping Hub & Marketplace",
      description: "A decentralized marketplace where members can create shops, sell digital goods, and earn MESY Coins with cashback rewards.",
      tags: ["E-commerce", "Web3"]
    },
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      title: "Membership & Downline System",
      description: "A ceremonial journey through 50 levels of membership, designed to reward growth, dedication, and community building.",
      tags: ["Monetization", "Growth"]
    },
    {
      icon: <Code className="w-8 h-8 text-primary" />,
      title: "Developer Zone & SDKs",
      description: "A vibrant hub for developers to contribute, learn, and earn. Features forums, quests (bounties), an academy, and a freelance market.",
      tags: ["SDK", "API", "Community"]
    },
     {
      icon: <Wallet className="w-8 h-8 text-primary" />,
      title: "MESY Wallet & Payments",
      description: "A secure digital wallet to manage MESY Coins, track earnings from the downline system, and handle transactions within the universe.",
      tags: ["Coming Soon", "Finance"]
    },
    {
      icon: <Palette className="w-8 h-8 text-primary" />,
      title: "3D Avatar System",
      description: "Create and customize your unique 3D avatar to represent you across the entire MESY Universe, from social rooms to games.",
      tags: ["Identity", "3D"]
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Role-Based Permissions",
      description: "A robust access control system with roles like User, Member, Admin, and Developer, ensuring a secure and well-managed platform.",
      tags: ["Security", "Admin"]
    }
  ];

  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Explore the Core of the Universe</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          MESY is more than a platform—it's an interconnected ecosystem of powerful features designed for creativity, community, and commerce.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="flex flex-col bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div className="p-3 bg-primary/10 rounded-lg">
                      {feature.icon}
                  </div>
                  <div className="flex gap-2">
                      {feature.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

       <div className="text-center mt-20 p-8 bg-secondary/40 rounded-lg">
        <h2 className="text-3xl font-bold">Your Journey Awaits</h2>
        <p className="max-w-xl mx-auto mt-2 text-muted-foreground">Become a citizen of the MESY Universe and unlock a new dimension of digital experience.</p>
        <Button size="lg" className="mt-6 text-lg h-12 px-8" asChild>
          <Link href="/signup">
            Begin Your Ceremonial Journey <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>

    </div>
  );
}
