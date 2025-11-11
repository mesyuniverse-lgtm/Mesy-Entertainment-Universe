'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Orbit, Home, Swords, ScrollText, HandCoins, Users, Compass, ShoppingBasket, MessageCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './page.module.css';

const features = [
    { icon: <Compass className="w-8 h-8" />, name: "Worlds", angle: 0 },
    { icon: <Home className="w-8 h-8" />, name: "Real Estate", angle: 40 },
    { icon: <Swords className="w-8 h-8" />, name: "Quests", angle: 80 },
    { icon: <ShoppingBasket className="w-8 h-8" />, name: "Marketplace", angle: 120 },
    { icon: <MessageCircle className="w-8 h-8" />, name: "Social", angle: 160 },
    { icon: <Sparkles className="w-8 h-8" />, name: "Items", angle: 200 },
    { icon: <Users className="w-8 h-8" />, name: "Friends", angle: 240 },
    { icon: <HandCoins className="w-8 w-8" />, name: "Trade", angle: 280 },
    { icon: <ScrollText className="w-8 h-8" />, name: "Create Quests", angle: 320 },
];

export default function MesyUniversePage() {
    const bgImage = PlaceHolderImages.find((i) => i.id === 'fantasy-landscape-5');

    return (
        <div className={cn("relative flex items-center justify-center min-h-[calc(100vh-100px)] w-full overflow-hidden p-4", styles.universePage)}>
            {/* Background Image */}
            {bgImage && (
                <Image
                    src={bgImage.imageUrl}
                    alt="MESY Universe Background"
                    data-ai-hint={bgImage.imageHint}
                    layout="fill"
                    objectFit="cover"
                    className="z-0 opacity-30"
                />
            )}
            <div className="absolute inset-0 bg-background/70 z-10" />

            {/* Stargate */}
            <div className="relative z-20 flex items-center justify-center w-[600px] h-[600px]">
                {/* Outer Ring */}
                <div className={cn("absolute inset-0 border-4 border-primary/30 rounded-full", styles.rotateSlow)}></div>
                {/* Inner Ring */}
                <div className={cn("absolute inset-10 border-2 border-accent/50 rounded-full", styles.rotateFast)}></div>
                
                {/* Event Horizon */}
                <div className={cn("absolute inset-20 rounded-full overflow-hidden", styles.eventHorizon)}>
                    <div className="absolute inset-0 bg-blue-900/50 opacity-50" />
                    <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-40">
                         <source src="https://cdn.pixabay.com/video/2023/07/29/173359-849539322_large.mp4" type="video/mp4" />
                    </video>
                </div>
                
                <div className="relative z-30 text-center">
                    <h1 className="text-5xl font-headline font-bold text-white tracking-widest" style={{ textShadow: '0 0 15px hsl(var(--primary))' }}>MESY UNIVERSE</h1>
                    <p className="text-primary mt-2">The Gateway is Open</p>
                    <Button size="lg" className="mt-8">
                        Enter World <ArrowRight className="ml-2" />
                    </Button>
                </div>

                {/* Feature Icons */}
                {features.map((feature, index) => {
                    const angleRad = (feature.angle * Math.PI) / 180;
                    const x = Math.cos(angleRad) * 280; // 280 is the radius
                    const y = Math.sin(angleRad) * 280;

                    return (
                        <div
                            key={index}
                            className="absolute group flex flex-col items-center"
                            style={{
                                transform: `translate(${x}px, ${y}px)`,
                                transition: 'transform 0.3s ease'
                            }}
                        >
                            <div className="p-3 bg-card/80 border border-primary/30 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all cursor-pointer">
                                {feature.icon}
                            </div>
                            <span className="mt-2 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">{feature.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
