import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, BookOpen, Code } from "lucide-react";
import Link from "next/link";

export default function DeveloperZonePage() {
  const devFeatures = [
     {
      title: "Getting Started",
      description: "Your first steps into the MESY Universe. Learn the basics of our platform and start building right away.",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
    },
    {
      title: "API Reference",
      description: "Detailed documentation for all our available APIs. Integrate MESY features into your own applications.",
      icon: <Code className="h-8 w-8 text-primary" />,
    },
    {
      title: "AI Content Moderation",
      description: "Integrate our AI to automatically moderate user-generated text, ensuring a safe and compliant community environment.",
      icon: <Bot className="h-8 w-8 text-primary" />,
    },
    {
      title: "AI Content Generation",
      description: "Leverage generative AI to create engaging content, unique avatars, and personalized playlists for your users.",
      icon: <Bot className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Developer Zone</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Access tools, documentation, and guides to build upon the MESY platform.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {devFeatures.map((feature) => (
          <Card key={feature.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-lg text-muted-foreground">Explore our AI capabilities in the hub.</p>
        <Button asChild size="lg" className="mt-4">
          <Link href="/ai-hub">
            Visit AI Hub <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
