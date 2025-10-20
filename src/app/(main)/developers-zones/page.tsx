import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Crown, Code, PlayCircle, Star, Briefcase, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function DevelopersPage() {
    const popularDevs = [
        { name: "Chronicler", avatarId: "knight-1", rating: 5, specialties: ["React", "Next.js"] },
        { name: "Aria", avatarId: "female-archer-1", rating: 5, specialties: ["UI/UX", "Tailwind"] },
        { name: "Kael", avatarId: "fighter-character", rating: 4, specialties: ["Genkit", "AI Flows"] },
    ];

    const devRoadmap = [
        { title: "Complete the Quest", icon: <FileText className="h-6 w-6 text-primary" />, description: "Pass the developer admission test to prove your skills." },
        { title: "Build Your Profile", icon: <Briefcase className="h-6 w-6 text-primary" />, description: "Showcase your portfolio, skills, and set your service rates." },
        { title: "Enter the Market", icon: <Star className="h-6 w-6 text-primary" />, description: "Get hired by members, earn reviews, and build your reputation." },
    ];


    return (
        <div className="container py-12 md:py-20">
             <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">DEVELOPERS ZONE</h1>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    The heart of innovation in the MESY Universe. Collaborate, create, and earn by shaping the future of the platform.
                </p>
            </div>

            {/* --- Main Marketing Section --- */}
            <section className="mb-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Sidebar - Popular Devs */}
                <aside className="hidden lg:block lg:col-span-1">
                    <Card className="h-full bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl"><Crown className="text-primary"/> Top Developers</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        {popularDevs.map(dev => (
                            <div key={dev.name} className="flex items-center gap-3 hover:bg-secondary/50 p-2 rounded-md transition-colors">
                                <Avatar>
                                    <AvatarImage src={PlaceHolderImages.find(i => i.id === dev.avatarId)?.imageUrl} />
                                    <AvatarFallback>{dev.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-sm">{dev.name}</p>
                                    <div className="flex items-center gap-0.5">
                                      {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-3 w-3 ${i < dev.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}/>
                                      ))}
                                    </div>
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
                            alt="Developer Zone promotion"
                            data-ai-hint="coding development abstract"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"/>
                        <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                            <div className="flex justify-end">
                                <Badge variant="secondary" className="flex items-center gap-1 bg-black/50 border-white/20">
                                    <Code className="h-3 w-3 text-primary"/> INVITATION
                                </Badge>
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold" style={{textShadow: '1px 1px 4px #000'}}>BECOME A MESY DEVELOPER</h2>
                                <p className="text-sm max-w-md" style={{textShadow: '1px 1px 3px #000'}}>Join our team of creators. Take the quest, prove your skills, and start earning by building the universe.</p>
                                <div className="flex gap-2 pt-2">
                                    <Button size="sm" asChild>
                                        <Link href="#">
                                            <PlayCircle className="mr-2 h-4 w-4"/> Watch Intro
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </main>

                {/* Right Sidebar - Ads / Quests */}
                <aside className="hidden lg:block lg:col-span-1">
                <Card className="h-full bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                    <CardTitle className="text-xl">Developer Quest</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center text-center">
                        <div className="relative w-full aspect-square rounded-md overflow-hidden group mb-4">
                            <Image
                                src={PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl || ''}
                                alt="Quest item"
                                data-ai-hint="glowing orb"
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">Complete the 'Hello, Universe!' coding challenge to unlock developer privileges.</p>
                        <Button variant="outline">Start Quest</Button>
                    </CardContent>
                </Card>
                </aside>
            </section>

             {/* --- Roadmap Section --- */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Your Path to Becoming a Developer</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {devRoadmap.map((step) => (
                        <Card key={step.title} className="bg-card/50 p-6">
                           <div className="flex justify-center mb-4">
                                <div className="p-3 bg-secondary rounded-lg">
                                    {step.icon}
                                </div>
                           </div>
                           <h3 className="text-xl font-semibold">{step.title}</h3>
                           <p className="text-muted-foreground mt-2">{step.description}</p>
                        </Card>
                    ))}
                </div>
            </section>


            {/* --- Market Section --- */}
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-3xl">
                        <Briefcase className="h-8 w-8 text-primary"/>
                        Developer Market (Coming Soon)
                    </CardTitle>
                    <CardDescription className="text-lg">The hub for talent and opportunity.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground max-w-4xl">
                        A dedicated marketplace where certified MESY Developers can offer their services. Members will be able to hire skilled developers to build custom pages, integrate features, or create unique experiences within their personal space. Developers can set their own rates, package their services, and build a reputation based on community reviews.
                    </p>
                </CardContent>
            </Card>

        </div>
    );
}
