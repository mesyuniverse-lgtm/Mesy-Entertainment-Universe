'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Bot, Code, Gamepad2, HandCoins, Users, Mic, Star, Store, Palette, Wallet, Shield } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { membershipData } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Socialive Platform",
      description: "A complete social ecosystem with live streaming, friends, followers, groups, and a dynamic timeline for member interaction.",
    },
    {
      icon: <Mic className="w-8 h-8 text-primary" />,
      title: "Entertainment Hub",
      description: "Discover and promote music, movies, and games. A central hub for all forms of entertainment and artist showcases.",
    },
    {
      icon: <Bot className="w-8 h-8 text-primary" />,
      title: "AI Hub & Creation Tools",
      description: "Leverage powerful generative AI to create avatars, images, video content, and even code with our integrated Genkit SDK.",
    },
];

function formatCurrency(value: number) {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


export default function WelcomePage() {
  const slideshowImages = PlaceHolderImages.filter(i => i.id.startsWith('fantasy-landscape-'));

  return (
    <div>
      {/* Hero Section with Slideshow */}
      <section className="relative h-[70vh] w-full text-white">
        <Carousel
            className="w-full h-full"
            plugins={[ Autoplay({ delay: 5000, stopOnInteraction: false }) ]}
            opts={{ loop: true }}
        >
            <CarouselContent className="h-full">
                {slideshowImages.map((image) => (
                    <CarouselItem key={image.id} className="h-full">
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover"
                            priority
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight mb-4" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>
                Welcome to MESY Universe
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/90 mb-8" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>
                A new dimension of social entertainment, powered by creativity and community.
            </p>
            <Button size="lg" className="h-12 px-8 text-lg" asChild>
                <Link href="/the-gate">Let's Startup <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold">What is MESY?</h2>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground">
                    An interconnected ecosystem of powerful features designed for creativity, community, and commerce.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <Card key={index} className="flex flex-col text-center items-center bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                       <CardHeader className="items-center">
                          <div className="p-4 bg-primary/10 rounded-full mb-4">
                              {feature.icon}
                          </div>
                          <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="text-center mt-12">
                <Button variant="outline" asChild>
                    <Link href="/features">See All Features <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
        </div>
      </section>

      {/* Member Plan Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                      <h2 className="text-3xl md:text-5xl font-bold">The Member Plan</h2>
                      <p className="mt-4 text-muted-foreground text-lg">
                          A ceremonial journey through 50 levels of membership, designed to reward growth, dedication, and community building. Your income potential grows with your network.
                      </p>
                      <Table className="mt-6">
                          <TableHeader>
                              <TableRow>
                                  <TableHead>Level</TableHead>
                                  <TableHead>Members</TableHead>
                                  <TableHead className="text-right">Net Income (USD)</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              {membershipData.slice(0, 5).map((level) => (
                                  <TableRow key={level.level}>
                                      <TableCell className="font-medium">{level.level}</TableCell>
                                      <TableCell>&lt; {level.members.toLocaleString()}</TableCell>
                                      <TableCell className="text-right">${formatCurrency(level.netIncome)}</TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                      <Button className="mt-6" asChild>
                          <Link href="/member-plan">View Full Plan <ArrowRight className="ml-2 h-4 w-4"/></Link>
                      </Button>
                  </div>
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                      <Image
                          src={PlaceHolderImages.find((img) => img.id === 'member-plan-video')?.imageUrl || ''}
                          alt="Member plan video"
                          data-ai-hint="presentation video"
                          fill
                          className="object-cover"
                      />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-4">
                          <h3 className="text-2xl font-bold text-white" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.9)'}}>The MESY Vision</h3>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Chronicle Section */}
      <section className="py-16 md:py-24 bg-background">
          <div className="container text-center">
              <h2 className="text-3xl md:text-5xl font-bold">Chronicle: The Journey</h2>
              <p className="max-w-3xl mx-auto mt-4 text-muted-foreground">
                  Follow our development roadmap, see what we've accomplished, and get a glimpse of the future we're building together.
              </p>
              <Button className="mt-8" variant="outline" asChild>
                  <Link href="/chronicle">Explore the Roadmap <ArrowRight className="ml-2 h-4 w-4"/></Link>
              </Button>
          </div>
      </section>

    </div>
  );
}
