
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Shield, Code } from "lucide-react";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function TheGatePage() {

  const zones = [
    {
      title: "User Zone",
      description: "Explore the universe, connect with others, and enjoy content as a general user.",
      icon: <User className="w-10 h-10 text-primary" />,
      href: "/login",
      image: PlaceHolderImages.find(i => i.id === 'socialive-preview'),
      buttonText: "Enter User Zone"
    },
    {
      title: "Member Zone",
      description: "Unlock your potential. Access exclusive features, monetization, and your personal dashboard.",
      icon: <Shield className="w-10 h-10 text-primary" />,
      href: "/member-zones/member-portal",
      image: PlaceHolderImages.find(i => i.id === 'member-zone-preview'),
      buttonText: "Access Member Zone"
    },
    {
      title: "Developer Zone",
      description: "Build the future. Access SDKs, contribute to projects, and earn through the developer ecosystem.",
      icon: <Code className="w-10 h-10 text-primary" />,
      href: "/developer-zone",
      image: PlaceHolderImages.find(i => i.id === 'auth-background'),
      buttonText: "Enter Developer Zone"
    }
  ];

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold tracking-wider font-headline" style={{ textShadow: '0 0 15px hsl(var(--primary))' }}>
            THE GATE
        </h1>
        <p className="max-w-xl mx-auto mt-4 text-muted-foreground text-lg">
          Choose Your Destiny. Your journey into the MESY Universe starts here.
        </p>
      </div>

       <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
        {zones.map((zone) => (
          <Card key={zone.title} className="flex flex-col bg-card/70 border-border/50 hover:border-primary/50 hover:bg-card transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-primary/20 overflow-hidden">
            <CardHeader className="p-0">
                 {zone.image && (
                    <div className="relative aspect-video">
                        <Image
                            src={zone.image.imageUrl}
                            alt={zone.image.description}
                            data-ai-hint={zone.image.imageHint}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                 )}
            </CardHeader>
            <CardContent className="p-6 flex-grow flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    {zone.icon}
                  </div>
                  <CardTitle className="text-2xl">{zone.title}</CardTitle>
              </div>
              <CardDescription className="flex-grow">{zone.description}</CardDescription>
              <div className="mt-6">
                <Button asChild className="w-full">
                    <Link href={zone.href}>
                        {zone.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}
