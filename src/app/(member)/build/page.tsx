'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Brush, FileJson, Hammer, Palette, Sparkles, ToyBrick, Wand2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const creatorTools = [
    {
        icon: <Palette className="w-10 h-10 text-primary" />,
        title: "Avatar Studio",
        description: "Design and customize your unique 3D avatar from scratch or use our AI-powered templates.",
        href: "/ai-hub/generator",
        badge: "AI Powered"
    },
    {
        icon: <Wand2 className="w-10 h-10 text-primary" />,
        title: "Effect Forge",
        description: "Create stunning visual and audio effects for your streams, videos, or in-game presence.",
        href: "#",
        badge: "Coming Soon"
    },
    {
        icon: <Brush className="w-10 h-10 text-primary" />,
        title: "Theme Weaver",
        description: "Craft personalized UI themes and profile layouts to showcase your identity.",
        href: "#",
        badge: "Coming Soon"
    },
    {
        icon: <ToyBrick className="w-10 h-10 text-primary" />,
        title: "Asset Builder",
        description: "Model, texture, and build custom 3D assets like clothing, props, and environment pieces.",
        href: "#",
        badge: "SDK"
    },
    {
        icon: <Sparkles className="w-10 h-10 text-primary" />,
        title: "Asset Alchemist",
        description: "Combine existing items and materials to discover and craft new, rare, and powerful assets.",
        href: "#",
        badge: "Crafting"
    },
    {
        icon: <FileJson className="w-10 h-10 text-primary" />,
        title: "Genkit Playground",
        description: "Experiment with our powerful Genkit AI SDK to build your own custom generative features.",
        href: "/ai-hub",
        badge: "Advanced"
    }
];

export default function BuildPage() {
    const heroImage = PlaceHolderImages.find(i => i.id === 'fantasy-landscape-4');
    
    return (
        <div className="space-y-8">
            <Card className="relative overflow-hidden border-primary/20">
                 {heroImage && (
                    <Image 
                        src={heroImage.imageUrl}
                        alt="Creator Workshop"
                        layout="fill"
                        objectFit="cover"
                        className="opacity-20"
                    />
                 )}
                 <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                <div className="relative p-8 md:p-12 text-center">
                    <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                        <Hammer className="w-12 h-12 text-primary"/>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Creator's Workshop</h1>
                    <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg">
                        This is your sanctuary for creation. Use these powerful tools and your imagination to forge digital assets for the MESY Universe.
                    </p>
                </div>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creatorTools.map((tool) => (
                    <Card key={tool.title} className="flex flex-col bg-card/70 border-border/50 hover:border-primary/50 hover:bg-card transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                        <CardHeader className="flex-row items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                {tool.icon}
                            </div>
                            {tool.badge && <div className="ml-auto text-xs font-bold uppercase text-primary tracking-widest">{tool.badge}</div>}
                        </CardHeader>
                        <CardContent className="flex-grow space-y-2">
                             <CardTitle className="text-xl">{tool.title}</CardTitle>
                            <CardDescription>{tool.description}</CardDescription>
                        </CardContent>
                        <CardContent>
                            <Button asChild className="w-full" variant={tool.href === "#" ? "secondary" : "default"}>
                                <Link href={tool.href}>
                                    {tool.href === "#" ? "Coming Soon" : <>Launch Tool <ArrowRight className="ml-2 h-4 w-4" /></>}
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

             <Card className="text-center">
                <CardHeader>
                    <CardTitle>What will you create?</CardTitle>
                    <CardDescription>The assets you forge here can be sold on the MESY Market, gifted to friends, or used to enhance your own digital presence.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button size="lg" asChild>
                        <Link href="/market">
                            Go to MESY Market
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
