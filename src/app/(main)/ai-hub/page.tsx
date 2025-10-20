import { GeneratorDemo } from "@/components/ai-hub/generator-demo";
import { AiPlatforms } from "@/components/ai-hub/ai-platforms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Cpu, Bot, Star, PlayCircle, Image as ImageIcon, Video, GalleryHorizontal, Film, Mic, AudioLines, Code } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function AiHubPage() {

    const popularModels = [
        { name: "Aria's Dream Weaver", creator: "Aria", avatarId: "female-archer-1" },
        { name: "Kael's Titan-Former", creator: "Kael", avatarId: "fighter-character" },
        { name: "Chrono-Writer v3", creator: "Chronicler", avatarId: "knight-1" },
        { name: "Seraphina's Vision", creator: "Seraphina", avatarId: "explorer-1" },
    ];
    
    const sponsoredAds = [
        { title: "Stable Diffusion XL", imageId: "glowing-gem-1" },
        { title: "Llama 3 on Mobile", imageId: "fantasy-landscape-3" }
    ];

    const aiTools = [
        { title: "Text to Image", icon: <ImageIcon className="h-6 w-6 text-primary" />, href: "#" },
        { title: "Text to Video", icon: <Video className="h-6 w-6 text-primary" />, href: "#" },
        { title: "Image to Image", icon: <GalleryHorizontal className="h-6 w-6 text-primary" />, href: "#" },
        { title: "Image to Video", icon: <Film className="h-6 w-6 text-primary" />, href: "#" },
        { title: "Speech to Text", icon: <Mic className="h-6 w-6 text-primary" />, href: "#" },
        { title: "Text to Speech", icon: <AudioLines className="h-6 w-6 text-primary" />, href: "#" },
        { title: "AI Coder", icon: <Code className="h-6 w-6 text-primary" />, href: "#" },
        { title: "AI Assistant", icon: <Bot className="h-6 w-6 text-primary" />, href: "#" },
    ];

    return (
        <div className="container py-12 md:py-20">
             <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">AI Hub</h1>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    A creative nexus where imagination meets intelligence. Explore, generate, and collaborate with a universe of AI models.
                </p>
            </div>

            {/* --- Main Marketing Section --- */}
            <section className="mb-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Sidebar - Popular Models */}
                <aside className="hidden lg:block lg:col-span-1">
                    <Card className="h-full bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl"><Bot className="text-primary"/> Popular AI Models</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        {popularModels.map(model => (
                            <div key={model.name} className="flex items-center gap-3 hover:bg-secondary/50 p-2 rounded-md transition-colors">
                            <Avatar>
                                <AvatarImage src={PlaceHolderImages.find(i => i.id === model.avatarId)?.imageUrl} />
                                <AvatarFallback>{model.creator.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-sm">{model.name}</p>
                                <p className="text-xs text-muted-foreground">by {model.creator}</p>
                            </div>
                            </div>
                        ))}
                        </CardContent>
                    </Card>
                </aside>

                {/* Center - Video Feed */}
                <main className="lg:col-span-2">
                    <Card className="aspect-video relative overflow-hidden shadow-2xl shadow-primary/20 group">
                        <Image 
                            src={PlaceHolderImages.find(i => i.id === 'feature-2')?.imageUrl || ''}
                            alt="Promotional AI Video"
                            data-ai-hint="ai product video"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"/>
                        <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                            <div className="flex justify-end">
                                <Badge variant="secondary" className="flex items-center gap-1 bg-black/50 border-white/20">
                                    <Cpu className="h-3 w-3 text-primary"/> AI PRODUCT
                                </Badge>
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold" style={{textShadow: '1px 1px 4px #000'}}>Gemini 2.5: The Future is Now</h2>
                                <p className="text-sm max-w-md" style={{textShadow: '1px 1px 3px #000'}}>Experience the next generation of AI with unparalleled speed and multimodal capabilities.</p>
                                <div className="flex gap-2 pt-2">
                                    <Button size="sm" asChild>
                                        <Link href="#">
                                            <PlayCircle className="mr-2 h-4 w-4"/> Watch Demo
                                        </Link>
                                    </Button>
                                    <Button size="sm" variant="secondary">Learn More</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </main>
                
                {/* Right Sidebar - Ads */}
                <aside className="hidden lg:block lg:col-span-1">
                <Card className="h-full bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                    <CardTitle className="text-xl">Sponsored</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    {sponsoredAds.map(ad => (
                        <div key={ad.title} className="relative aspect-video rounded-md overflow-hidden group">
                        <Image 
                            src={PlaceHolderImages.find(i => i.id === ad.imageId)?.imageUrl || ''}
                            alt={ad.title}
                            data-ai-hint="ai technology"
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-end p-2">
                            <p className="text-white text-xs font-bold w-full text-center" style={{textShadow: '1px 1px 2px #000'}}>{ad.title}</p>
                        </div>
                        </div>
                    ))}
                    </CardContent>
                </Card>
                </aside>
            </section>
            
            {/* AI Tools Section */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Explore AI Tools</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    {aiTools.map((tool) => (
                        <Link key={tool.title} href={tool.href}>
                            <Card className="h-full flex flex-col items-center justify-center p-4 text-center hover:bg-secondary/50 hover:shadow-primary/10 hover:shadow-lg transition-all transform hover:-translate-y-1">
                                {tool.icon}
                                <p className="mt-2 text-xs font-semibold">{tool.title}</p>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            <div className="my-16">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold">Try Our Native Generator</h2>
                    <p className="text-muted-foreground mt-2">Get a glimpse of our integrated AI capabilities. Full access is granted to members.</p>
                </div>
                <GeneratorDemo />
            </div>

            <AiPlatforms />

            <Card className="mt-16 bg-card/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-3xl">
                        <Store className="h-8 w-8 text-primary"/>
                        AI Market (Coming Soon)
                    </CardTitle>
                    <CardDescription className="text-lg">The marketplace for innovation.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground max-w-4xl">
                        A revolutionary marketplace where members can buy, sell, rent, or even offer free trials for their custom-trained AI models. Whether you're a developer looking to monetize your creations or a user searching for the perfect AI tool, the AI Market will be your central hub for exchange and collaboration.
                    </p>
                </CardContent>
            </Card>

        </div>
    )
}
