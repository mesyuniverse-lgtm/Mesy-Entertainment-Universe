import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Code, ImageIcon, Mic, VideoIcon, FileText, Clapperboard } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AiHubPage() {

    const aiTools = [
        {
            title: "Text Generation",
            description: "Craft articles, stories, and scripts.",
            icon: <FileText className="h-8 w-8 text-primary" />,
            href: "/ai-hub/generator",
            ready: true,
        },
        {
            title: "Text to Image",
            description: "Turn your words into stunning visuals.",
            icon: <ImageIcon className="h-8 w-8 text-primary" />,
            href: "/ai-hub/generator",
            ready: true,
        },
        {
            title: "Text to Speech",
            description: "Convert text into natural-sounding audio.",
            icon: <Mic className="h-8 w-8 text-primary" />,
            href: "/ai-hub/generator",
            ready: true,
        },
        {
            title: "Text to Video",
            description: "Create dynamic videos from text prompts.",
            icon: <VideoIcon className="h-8 w-8 text-primary" />,
            href: "/ai-hub/generator",
            ready: true,
        },
        {
            title: "Speech to Text",
            description: "Transcribe audio into editable text.",
            icon: <Mic className="h-8 w-8 text-primary" />,
            href: "/ai-hub/generator",
            ready: true,
        },
        {
            title: "Speech to Image",
            description: "Generate images directly from your voice.",
            icon: <ImageIcon className="h-8 w-8 text-primary" />,
            href: "/ai-hub/generator",
            ready: true,
        },
        {
            title: "Speech to Video",
            description: "Produce videos using voice commands.",
            icon: <Clapperboard className="h-8 w-8 text-primary" />,
            href: "/ai-hub/generator",
            ready: true,
        },
        {
            title: "Image to Image",
            description: "Transform and edit existing images.",
            icon: <ImageIcon className="h-8 w-8 text-primary" />,
            href: "/ai-hub/generator",
            ready: true,
        },
        {
            title: "Image to Video",
            description: "Animate static images into video clips.",
            icon: <VideoIcon className="h-8 w-8 text-primary" />,
            href: "/ai-hub/generator",
            ready: true,
        },
        {
            title: "Code Generation",
            description: "Generate code snippets in various languages.",
            icon: <Code className="h-8 w-8 text-primary" />,
            href: "/ai-hub/generator",
            ready: true,
        },
        {
            title: "Avatar Generation",
            description: "Create unique, stylized fantasy avatars.",
            icon: <Bot className="h-8 w-8 text-primary" />,
            href: "/ai-hub/generator",
            ready: true,
        },
        {
            title: "Playlist Generation",
            description: "Curate music playlists for any mood.",
            icon: <FileText className="h-8 w-8 text-primary" />,
            href: "/ai-hub/generator",
            ready: true,
        },
    ];

    return (
        <div className="container py-12 md:py-20">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
                    MESY AI Universe
                </h1>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    A suite of powerful generative tools to unleash your creativity. From stunning visuals to dynamic code, bring your ideas to life.
                </p>
                <Button asChild size="lg" className="mt-8">
                    <Link href="/ai-hub/generator">
                        Launch AI Playground <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {aiTools.map((tool) => (
                    <Card key={tool.title} className="flex flex-col hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 bg-card/50">
                        <CardHeader className="flex-row items-start gap-4 space-y-0">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                {tool.icon}
                            </div>
                            <div className="flex-1">
                                <CardTitle className="text-lg">{tool.title}</CardTitle>
                                {!tool.ready && <Badge variant="secondary" className="mt-1">Coming Soon</Badge>}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <CardDescription>{tool.description}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="text-center mt-20 p-8 bg-secondary/30 rounded-lg">
                <h2 className="text-3xl font-bold">Ready to Create?</h2>
                <p className="max-w-xl mx-auto mt-2 text-muted-foreground">
                    Sign up for a member account to unlock full access, unlimited generations, and save your creations.
                </p>
                <Button size="lg" className="mt-6" asChild>
                    <Link href="/signup">Become a Member</Link>
                </Button>
            </div>
        </div>
    );
}
