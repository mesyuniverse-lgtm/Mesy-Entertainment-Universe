
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Shield, Code, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function TheGatePage() {

    const userZoneImage = {
        src: 'https://picsum.photos/seed/101/600/400',
        alt: 'A couple playing video games together.',
        hint: 'couple gaming'
    };
    const memberZoneImage = {
        src: 'https://picsum.photos/seed/102/600/400',
        alt: 'An ancient stone doorway covered in vines in a forest.',
        hint: 'ancient doorway'
    };
    const developerZoneImage = {
        src: 'https://picsum.photos/seed/103/600/400',
        alt: 'Sunlight shining through a dense forest.',
        hint: 'forest sunlight'
    };

    return (
        <div className="container py-16 md:py-24 text-center">
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-widest text-white uppercase" style={{textShadow: '0 0 15px hsl(var(--primary))'}}>
                THE GATE
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose Your Destiny. Your journey into the MESY Universe starts here.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* User Zone Card */}
                <Card className="bg-card/50 border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20 flex flex-col">
                    <CardHeader>
                        <div className="relative aspect-[16/9] rounded-md overflow-hidden mb-4">
                            <Image
                                src={userZoneImage.src}
                                alt={userZoneImage.alt}
                                data-ai-hint={userZoneImage.hint}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <CardTitle className="flex items-center gap-3 text-left">
                            <User className="w-7 h-7 text-primary" />
                            <span className="text-2xl">User Zone</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-left flex-grow">
                        <CardDescription>
                            Explore the universe, connect with others, and enjoy content as a general user.
                        </CardDescription>
                    </CardContent>
                    <div className="p-6 pt-0">
                         <Button asChild className="w-full">
                            <Link href="/user-Zones">
                                Enter User Zone <ArrowRight className="ml-2" />
                            </Link>
                        </Button>
                    </div>
                </Card>

                {/* Member Zone Card */}
                <Card className="bg-card/50 border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20 flex flex-col">
                    <CardHeader>
                        <div className="relative aspect-[16/9] rounded-md overflow-hidden mb-4">
                            <Image
                                src={memberZoneImage.src}
                                alt={memberZoneImage.alt}
                                data-ai-hint={memberZoneImage.hint}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <CardTitle className="flex items-center gap-3 text-left">
                            <Shield className="w-7 h-7 text-primary" />
                            <span className="text-2xl">Member Zone</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-left flex-grow">
                        <CardDescription>
                           Unlock your potential. Access exclusive features, monetization, and your personal dashboard.
                        </CardDescription>
                    </CardContent>
                    <div className="p-6 pt-0">
                         <Button asChild className="w-full">
                            <Link href="/member-login">
                                Access Member Zone <ArrowRight className="ml-2" />
                            </Link>
                        </Button>
                    </div>
                </Card>

                {/* Developer Zone Card */}
                <Card className="bg-card/50 border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20 flex flex-col">
                    <CardHeader>
                        <div className="relative aspect-[16/9] rounded-md overflow-hidden mb-4">
                            <Image
                                src={developerZoneImage.src}
                                alt={developerZoneImage.alt}
                                data-ai-hint={developerZoneImage.hint}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <CardTitle className="flex items-center gap-3 text-left">
                            <Code className="w-7 h-7 text-primary" />
                           <span className="text-2xl">Developer Zone</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-left flex-grow">
                        <CardDescription>
                            Build the future. Access SDKs, contribute to projects, and earn through the developer ecosystem.
                        </CardDescription>
                    </CardContent>
                     <div className="p-6 pt-0">
                         <Button asChild className="w-full">
                            <Link href="/join-developer">
                                Enter Developer Zone <ArrowRight className="ml-2" />
                            </Link>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
