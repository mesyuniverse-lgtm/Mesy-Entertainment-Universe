
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Code, ImageIcon, Mic, VideoIcon, Clapperboard, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AiHubPage() {

    const quickActions = [
        { title: "Generate AI Video", icon: VideoIcon, href: "/ai-hub/generator", badge: null },
        { title: "Generate AI Image", icon: ImageIcon, href: "/ai-hub/generator", badge: null },
        { title: "Generate AI Avatar", icon: Bot, href: "/ai-hub/generator", badge: null },
        { title: "Generate AI Shorts", icon: Clapperboard, href: "#", badge: "BETA" },
        { title: "Generate AI Effects", icon: Sparkles, href: "#", badge: "New" },
    ];
    
    const carouselItems = [
        { title: "SORA 2 is Here!", subtitle: "Sora 2-Realism at Every Frame", description: "+ ENJOY 50% OFF NOW +", image: PlaceHolderImages.find(i => i.id === 'socialive-preview') },
        { title: "WAN 2.5 COMMUNITY", subtitle: "UNLEASH VISUAL POWER", description: "See What Everyone's Creating!", image: PlaceHolderImages.find(i => i.id === 'fantasy-landscape-3') },
        { title: "AI VIDEO ENHANCER", subtitle: "NOW AVAILABLE", description: "Edit Videos by Prompts", image: PlaceHolderImages.find(i => i.id === 'shopping-preview') },
    ];

    const aiTools = [
        { title: "Lip Sync", description: "Create accurate, lifelike lip sync", image: "https://picsum.photos/seed/lipsync/100/100" },
        { title: "AI Video Upscaler", description: "Upscale videos to 4K", image: "https://picsum.photos/seed/upscale/100/100" },
        { title: "Video Subtitle Remover", description: "Remove subtitles from video", image: "https://picsum.photos/seed/subtitle/100/100" },
        { title: "Video Background Remover", description: "Remove BG from video", image: "https://picsum.photos/seed/vbg/100/100" },
        { title: "AI Image Enhancer", description: "Sharpen & upscale photos", image: "https://picsum.photos/seed/enhance/100/100" },
        { title: "Photo Restoration", description: "Restore old/damaged images", image: "https://picsum.photos/seed/restore/100/100" },
        { title: "Background Remover", description: "Remove image backgrounds", image: "https://picsum.photos/seed/ibg/100/100" },
        { title: "AI Image Extender", description: "Expand photos to new sizes", image: "https://picsum.photos/seed/extend/100/100" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-foreground/90">What would you like to create today?</h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {quickActions.map(action => (
                    <Link key={action.title} href={action.href}>
                        <Card className="bg-secondary/50 hover:bg-secondary/80 transition-colors h-full">
                            <CardContent className="p-4 flex flex-col items-start justify-between h-full">
                                <div className="flex justify-between items-start w-full">
                                    <action.icon className="h-6 w-6 text-muted-foreground mb-4" />
                                    {action.badge && <Badge variant={action.badge === 'New' ? 'default' : 'secondary'} className={action.badge === 'New' ? 'bg-green-500' : ''}>{action.badge}</Badge>}
                                </div>
                                <p className="font-semibold text-foreground/90">{action.title} <ArrowRight className="inline h-4 w-4" /></p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <Carousel opts={{ loop: true }} className="w-full">
                <CarouselContent>
                    {carouselItems.map((item, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card className="relative aspect-video overflow-hidden group">
                                    {item.image && <Image src={item.image.imageUrl} alt={item.image.description} data-ai-hint={item.image.imageHint} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="absolute bottom-0 left-0 p-4 text-white">
                                        <h2 className="text-2xl font-bold" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.7)'}}>{item.title}</h2>
                                        <p className="text-sm text-primary font-bold" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.7)'}}>{item.description}</p>
                                    </div>
                                </Card>
                                <p className="text-sm font-medium mt-2">{item.subtitle} <ArrowRight className="inline h-4 w-4"/></p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-1rem]" />
                <CarouselNext className="right-[-1rem]"/>
            </Carousel>
            
            <div>
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">AI Tools</h2>
                    <Button variant="link">View all <ArrowRight className="h-4 w-4 ml-1"/></Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {aiTools.map(tool => (
                        <Card key={tool.title} className="bg-secondary/50 hover:bg-secondary/80 transition-colors">
                            <CardContent className="p-4 flex items-center gap-4">
                                <Image src={tool.image} alt={tool.title} width={64} height={64} className="rounded-md" />
                                <div className="flex-grow">
                                    <p className="font-semibold">{tool.title}</p>
                                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
