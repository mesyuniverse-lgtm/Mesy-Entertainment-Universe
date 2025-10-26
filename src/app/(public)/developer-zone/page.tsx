
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, BookOpen, Code, Search, Star, Users, ShoppingCart, KeyRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const apiSelection = {
    'generative-ai': [
        { title: 'AI Content Generation', author: 'MESY Core Team', rating: 4.9, reviews: 1345, image: PlaceHolderImages.find(i => i.id === 'feature-2'), tag: 'Popular' },
        { title: 'AI Content Moderation', author: 'MESY Core Team', rating: 4.8, reviews: 982, image: PlaceHolderImages.find(i => i.id === 'glowing-gem-1'), tag: 'Popular' },
        { title: 'Avatar Generation API', author: 'MESY AI Division', rating: 4.7, reviews: 756, image: PlaceHolderImages.find(i => i.id === 'default-avatar'), tag: 'New' },
        { title: 'Text-to-Speech Service', author: 'MESY AI Division', rating: 4.6, reviews: 432, image: PlaceHolderImages.find(i => i.id === 'socialive-preview'), tag: null },
    ],
    'social': [
        { title: 'Friends & Followers API', author: 'MESY Core Team', rating: 4.8, reviews: 1024, image: PlaceHolderImages.find(i => i.id === 'feature-1'), tag: 'Popular' },
        { title: 'Live Streaming SDK', author: 'MESY Social Team', rating: 4.9, reviews: 876, image: PlaceHolderImages.find(i => i.id === 'live/live/page.tsx'), tag: 'New' },
    ],
    'e-commerce': [
        { title: 'Shopping Hub API', author: 'MESY Commerce Team', rating: 4.7, reviews: 1120, image: PlaceHolderImages.find(i => i.id === 'shopping-preview'), tag: 'Popular' },
    ],
    'authentication': [
        { title: 'MESY Auth Service', author: 'MESY Core Team', rating: 5.0, reviews: 2500, image: PlaceHolderImages.find(i => i.id === 'auth-background'), tag: 'Core' },
    ]
}

const topicsByCategory = [
    {
        category: 'Development',
        topics: ['Python', 'React', 'Next.js', 'Firebase', 'Unreal Engine', 'Unity', 'Genkit']
    },
    {
        category: 'Design',
        topics: ['3D Modeling', 'UI/UX Design', 'Character Design', 'Game Design', 'Photoshop']
    },
     {
        category: 'Community',
        topics: ['Community Management', 'Event Hosting', 'Monetization', 'Content Strategy']
    },
    {
        category: 'Business',
        topics: ['E-commerce', 'Digital Marketing', 'Customer Engagement', 'Analytics']
    }
]


export default function DeveloperZonePage() {
  const heroImage = PlaceHolderImages.find(i => i.id === 'auth-background');
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center text-white">
          {heroImage && (
            <Image src={heroImage.imageUrl} alt={heroImage.description} fill className="object-cover" />
          )}
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 text-center p-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Build the Future of the MESY Universe</h1>
            <p className="mt-4 text-lg md:text-xl text-white/80">
              Harness the power of our APIs and SDKs to create groundbreaking experiences for millions of users.
            </p>
            <div className="mt-8 relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search documentation, tutorials, and more..." className="h-14 pl-12 text-lg bg-white/90 text-black placeholder:text-muted-foreground/80"/>
              <Button size="lg" className="absolute right-2.5 top-1/2 -translate-y-1/2 h-10">Search</Button>
            </div>
          </div>
        </section>

        {/* Trust Banner */}
        <section className="bg-secondary/20">
            <div className="container py-4 text-center text-muted-foreground">
                <p>Trusted by creators and developers from leading guilds across the universe</p>
                {/* Placeholder for partner logos */}
            </div>
        </section>

        {/* API Selection Section */}
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold">A Broad Selection of APIs & SDKs</h2>
                    <p className="mt-3 text-lg text-muted-foreground">
                        Choose from a vast array of tools to power your creations. Our documentation is designed to get you building, fast.
                    </p>
                </div>

                <Tabs defaultValue="generative-ai" className="mt-8">
                    <TabsList className="h-auto flex-wrap justify-start">
                        <TabsTrigger value="generative-ai">Generative AI</TabsTrigger>
                        <TabsTrigger value="social">Social & Community</TabsTrigger>
                        <TabsTrigger value="e-commerce">E-commerce</TabsTrigger>
                        <TabsTrigger value="authentication">Authentication</TabsTrigger>
                        <TabsTrigger value="gaming">Gaming</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="generative-ai" className="mt-6">
                       <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                         {apiSelection['generative-ai'].map(api => (
                            <Link href="#" key={api.title} className="group">
                                <Card className="h-full flex flex-col overflow-hidden hover:border-primary/50 transition-all duration-300">
                                    {api.image && <Image src={api.image.imageUrl} alt={api.title} width={400} height={225} className="w-full h-40 object-cover group-hover:scale-105 transition-transform"/>}
                                    <CardHeader>
                                        <CardTitle className="text-lg">{api.title}</CardTitle>
                                        <CardDescription className="text-xs">{api.author}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span className="font-bold text-amber-400">{api.rating}</span>
                                        <div className="flex">
                                          {[...Array(5)].map((_, i) => <Star key={i} className={cn("h-4 w-4", i < Math.floor(api.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30')} />)}
                                        </div>
                                        <span>({api.reviews.toLocaleString()})</span>
                                    </CardContent>
                                    {api.tag && <Badge variant="secondary" className="m-4 mt-0 w-fit">{api.tag}</Badge>}
                                </Card>
                            </Link>
                         ))}
                       </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>

        {/* Topics by Category */}
        <section className="py-16 md:py-24 bg-secondary/20">
            <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold text-center">Featured Topics by Category</h2>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {topicsByCategory.map(category => (
                        <div key={category.category}>
                            <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                            <div className="space-y-3">
                                {category.topics.map(topic => (
                                    <Link key={topic} href="#" className="block">
                                        <p className="font-semibold text-primary underline-offset-4 hover:underline">{topic}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24">
             <div className="container grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold">Become an Instructor</h2>
                    <p className="mt-2 text-lg text-muted-foreground">Share your knowledge and earn income by teaching other creators in the MESY Universe.</p>
                    <Button size="lg" className="mt-4">Start Teaching Today</Button>
                </div>
                 <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold">MESY for Business</h2>
                    <p className="mt-2 text-lg text-muted-foreground">Supercharge your guild or business with our powerful suite of development and management tools.</p>
                    <Button size="lg" variant="outline" className="mt-4">Get MESY Business</Button>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}

    