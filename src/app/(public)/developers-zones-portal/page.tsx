import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, BookOpen, LogIn, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Gem, Users } from "lucide-react";

export default function DevelopersZonePortalPage() {
    const bgImage = PlaceHolderImages.find((i) => i.id === 'developer-portal-bg');

    return (
        <div className="relative min-h-screen bg-background text-foreground">
            {bgImage && (
                <Image
                    src={bgImage.imageUrl}
                    alt={bgImage.description}
                    data-ai-hint={bgImage.imageHint}
                    fill
                    className="absolute inset-0 object-cover opacity-10"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background" />

            <div className="relative container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-headline">The Crucible of Creation</h1>
                <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg">
                    This is where the architects of the MESY Universe are forged. Prove your worth, hone your skills, and build the future.
                </p>

                <div className="mt-8 flex justify-center gap-4 md:gap-8 text-sm md:text-base">
                    <div className="flex items-center gap-2">
                        <Users className="text-primary"/>
                        <span><span className="font-bold">214</span> Active Developers</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Gem className="text-primary"/>
                        <span><span className="font-bold">489</span> Projects Forged</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Code className="text-primary"/>
                        <span><span className="font-bold">1.2M</span> Lines Committed</span>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-6 max-w-6xl mx-auto">
                    
                    <Card className="lg:col-span-3 bg-card/70 backdrop-blur-sm border-primary/20 flex flex-col justify-between text-left p-6">
                        <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="text-primary"/> The Architect's Ledger</h2>
                            <p className="text-muted-foreground">Study the roadmap, documentation, and the laws of this universe.</p>
                        </div>
                        <Button asChild className="mt-4 w-full" variant="outline">
                            <Link href="/chronicle">Read the Chronicle</Link>
                        </Button>
                    </Card>

                    <Card className="lg:col-span-4 bg-card/70 backdrop-blur-sm border-primary/20 flex flex-col justify-between text-left p-6">
                         <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2"><LogIn className="text-primary"/> Enter the Forge</h2>
                            <p className="text-muted-foreground">For certified developers. Access your dashboard and ongoing projects.</p>
                        </div>
                        <Button asChild className="mt-4 w-full">
                           <Link href="/login">Developer Login <ArrowRight className="ml-2"/></Link>
                        </Button>
                    </Card>

                     <Card className="lg:col-span-3 bg-card/70 backdrop-blur-sm border-primary/20 flex flex-col justify-between text-left p-6">
                        <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2"><ArrowRight className="text-primary"/> Begin the Trial</h2>
                            <p className="text-muted-foreground">Your journey starts here. Are you worthy? (Level 1 Member Required)</p>
                        </div>
                        <Button asChild className="mt-4 w-full" variant="secondary">
                           <Link href="/developers">View the Path</Link>
                        </Button>
                    </Card>
                    
                </div>
            </div>
        </div>
    );
}
