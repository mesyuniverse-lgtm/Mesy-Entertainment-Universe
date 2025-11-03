
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/firebase";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Lock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
    const { user } = useUser();
    const specialUsers = ['tipyatida@gmail.com', 'mesy.universe@gmail.com', 'admin@mesy.io'];
    const isMember = user && user.email && specialUsers.includes(user.email);

    const complexSections = [
        {
            title: "Socialive",
            description: "Public live rooms preview. Login to like, share, and comment.",
            href: "/socialive",
            image: PlaceHolderImages.find((i) => i.id === "socialive-preview"),
            locked: false,
        },
        {
            title: "Entertainment",
            description: "Music, Video, and Artist showcases. Login to save and interact.",
            href: "/entertainment",
            image: PlaceHolderImages.find((i) => i.id === "entertainment-preview"),
            locked: false,
        },
        {
            title: "The Connection",
            description: "Find friends, companions, personal assistants, and professional services.",
            href: "/connections",
            image: PlaceHolderImages.find((i) => i.id === "fantasy-landscape-1"),
            locked: false,
        },
        {
            title: "AI Hub",
            description: "Demo our AI generators. Login to save your creations.",
            href: "/ai-hub",
            image: PlaceHolderImages.find((i) => i.id === "feature-2"),
            locked: false,
        },
        {
            title: "Shopping Hub",
            description: "Browse products and add to cart. Login to checkout.",
            href: "/shopping",
            image: PlaceHolderImages.find((i) => i.id === "shopping-preview"),
            locked: false,
        },
        {
            title: "Member Zones",
            description: "Exclusive member-only content, dashboard, and creation tools.",
            href: "/dashboard",
            image: PlaceHolderImages.find((i) => i.id === "member-zone-preview"),
            locked: !isMember,
        },
        {
            title: "Developer Zone",
            description: "Ranking, Sponsor, Vote, Join Team, Forum, Roadmap.",
            href: "/developer-zone",
            image: PlaceHolderImages.find((i) => i.id === "auth-background"),
            locked: !isMember,
        },
    ];

    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">MESY ENTERTAINMENT COMPLEX</h1>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    Your portal to a universe of social, creative, and commercial experiences. Explore what awaits.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {complexSections.map((section) => (
                    <Card key={section.title} className="flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1">
                        <CardHeader className="p-0">
                            {section.image && (
                                <Image
                                    src={section.image.imageUrl}
                                    alt={section.image.description}
                                    data-ai-hint={section.image.imageHint}
                                    width={600}
                                    height={400}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                        </CardHeader>
                        <CardContent className="p-6 flex-grow flex flex-col">
                            <CardTitle>{section.title}</CardTitle>
                            <CardDescription className="mt-2 flex-grow">{section.description}</CardDescription>
                            <Button asChild className="mt-4 w-full" variant={section.locked ? "secondary" : "default"}>
                                <Link href={section.locked ? (user ? "/member-plan" : "/member-login") : section.href}>
                                    {section.locked ? <Lock className="mr-2 h-4 w-4" /> : null}
                                    {section.locked ? "Access Locked" : "Enter"}
                                    {!section.locked ? <ArrowRight className="ml-2 h-4 w-4" /> : null}
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
