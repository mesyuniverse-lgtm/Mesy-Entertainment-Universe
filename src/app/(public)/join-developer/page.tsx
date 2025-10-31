import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Bot, Code, HandCoins, Share2, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function JoinDeveloperPage() {

    const heroImage = PlaceHolderImages.find((i) => i.id === 'auth-background');
    const topics = [
        {
            icon: <Bot className="w-8 h-8 text-primary" />,
            title: "Generative AI SDK",
            description: "Integrate powerful Gemini and Imagen models into your creations. Generate text, images, and more with Genkit.",
        },
        {
            icon: <Share2 className="w-8 h-8 text-primary" />,
            title: "Social & Community API",
            description: "Build tools for guilds, friends, and live streaming. Foster connections within the universe.",
        },
        {
            icon: <HandCoins className="w-8 h-8 text-primary" />,
            title: "E-commerce & Monetization",
            description: "Create shops, list products, and tap into the MESY economy. Earn from your digital assets.",
        },
        {
            icon: <Code className="w-8 h-8 text-primary" />,
            title: "Unreal Engine SDK",
            description: "Bring your worlds to life with our comprehensive SDK for Unreal Engine 5.",
        },
    ];

    const benefits = [
        {
            icon: <Users className="w-10 h-10 text-accent" />,
            title: "Reach a Growing Community",
            description: "Connect with a passionate audience of gamers, creators, and enthusiasts ready to explore your work."
        },
        {
            icon: <Star className="w-10 h-10 text-accent" />,
            title: "Monetize Your Creations",
            description: "Sell your assets on the marketplace, get hired for quests, or earn from your popular courses and tools."
        },
        {
            icon: <Bot className="w-10 h-10 text-accent" />,
            title: "Access Powerful Tools",
            description: "Leverage our cutting-edge AI, social, and game development SDKs to build next-generation experiences."
        }
    ]

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
                {heroImage && (
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        data-ai-hint={heroImage.imageHint}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative z-10 p-4">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight mb-4" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>
                        Build the Future of the MESY Universe
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/90 mb-8" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>
                        Join a community of innovators, creators, and pioneers. Your next great project starts here.
                    </p>
                    <Button size="lg" asChild>
                        <Link href="/signup">
                            Get Started <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Topics Section */}
            <section className="py-16 md:py-24 bg-background">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold">What Will You Create?</h2>
                        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground">
                            Our platform provides the tools and APIs to bring any vision to life.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {topics.map((topic) => (
                            <Card key={topic.title} className="bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card transition-all">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    {topic.icon}
                                    <CardTitle className="text-xl !mt-0">{topic.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{topic.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Benefits Section */}
             <section className="py-16 md:py-24 bg-secondary/30">
                <div className="container">
                     <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold">A Universe of Opportunity</h2>
                        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground">
                           More than just a platform—it's an ecosystem for growth and success.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {benefits.map((benefit) => (
                             <div key={benefit.title} className="flex flex-col items-center">
                                <div className="p-4 bg-accent/10 rounded-full mb-4">
                                   {benefit.icon}
                                </div>
                                <h3 className="text-2xl font-bold">{benefit.title}</h3>
                                <p className="text-muted-foreground mt-2">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Final CTA */}
            <section className="py-20 md:py-32">
                 <div className="container text-center">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to Join the Vanguard?</h2>
                    <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg mb-8">
                        Create your account, explore the Developer Zone, and start contributing to the MESY Universe today.
                    </p>
                     <Button size="lg" className="text-lg py-7 px-8" asChild>
                        <Link href="/signup">
                            Create Your Developer Account
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
