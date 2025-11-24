'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Heart, Sparkles, User, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './dating-zone.module.css';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const featuredProfiles = [
    { name: 'Seraphina, 25', imageId: 'female-archer-1', location: 'Crystal Gardens', tags: ['Art', 'Music'] },
    { name: 'Kael, 28', imageId: 'knight-1', location: 'Obsidian Keep', tags: ['Adventure', 'Gaming'] },
    { name: 'Lyra, 26', imageId: 'explorer-1', location: 'Whispering Woods', tags: ['Nature', 'Books'] },
    { name: 'Zephyr, 29', imageId: 'fighter-character', location: 'Sky-High Citadel', tags: ['Tech', 'Movies'] },
    { name: 'Aetheria, 27', imageId: 'female-warrior-1', location: 'Sunstone City', tags: ['Fitness', 'Cooking'] },
];

export default function DatingZonePage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-white">
      <header className="text-center mb-16">
        <h1 className={`text-5xl md:text-7xl font-bold tracking-wider ${styles.title}`}>
          Dating Zone
        </h1>
        <p className={`mt-4 text-lg max-w-3xl mx-auto ${styles.subtitle}`}>
          Where fantasy meets romance. Discover your destined partner in the MESY Universe.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className={`p-8 rounded-2xl flex flex-col items-center text-center ${styles['zone-card']}`}>
          <div className="p-4 bg-pink-500/20 rounded-full mb-4">
            <Users className="w-12 h-12 text-pink-300" />
          </div>
          <h2 className="text-3xl font-bold mb-2">For Singles</h2>
          <p className="text-white/80 mb-6 flex-grow">
            For all members seeking a partner. Create your profile, browse others, and find your perfect match.
          </p>
          <Button variant="secondary" size="lg" className="bg-pink-500/50 border border-pink-400 hover:bg-pink-500/70 text-white">
            Explore Singles
          </Button>
        </div>
        <div className={`p-8 rounded-2xl flex flex-col items-center text-center ${styles['zone-card']}`}>
          <div className="p-4 bg-purple-500/20 rounded-full mb-4">
            <Heart className="w-12 h-12 text-purple-300" />
          </div>
          <h2 className="text-3xl font-bold mb-2">New Beginnings</h2>
          <p className="text-white/80 mb-6 flex-grow">
            A dedicated space for those who are widowed or divorced, ready to write their next chapter.
          </p>
          <Button variant="secondary" size="lg" className="bg-purple-500/50 border border-purple-400 hover:bg-purple-500/70 text-white">
            Find a New Start
          </Button>
        </div>
      </div>
      
      <section className="mb-16">
        <h2 className={`text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3 ${styles.title}`}>
          <Sparkles className="w-8 h-8"/> AI Matching
        </h2>
        <div className={`p-8 rounded-2xl text-center ${styles['zone-card']}`}>
            <p className="text-lg text-white/90">Our advanced AI helps you find the most compatible partners based on your personality, interests, and activity within the universe. Complete your profile to get your first matches!</p>
            <Button size="lg" className="mt-6 bg-blue-500/50 border border-blue-400 hover:bg-blue-500/70 text-white">
                <User className="mr-2 h-5 w-5" />
                Complete Your Profile
            </Button>
        </div>
      </section>

      <section>
        <h2 className={`text-3xl font-bold text-center mb-8 ${styles.title}`}>
          Featured Profiles
        </h2>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
                {featuredProfiles.map((profile) => {
                    const image = PlaceHolderImages.find(p => p.id === profile.imageId);
                    return (
                        <CarouselItem key={profile.name} className="md:basis-1/2 lg:basis-1/3 pl-4">
                            <div className={`w-full aspect-[3/4] ${styles['profile-card']}`}>
                                {image && <Image src={image.imageUrl} alt={profile.name} layout="fill" objectFit="cover" />}
                                <div className={styles.info}>
                                    <h3 className="text-xl font-bold">{profile.name}</h3>
                                    <p className="text-sm text-white/80">{profile.location}</p>
                                    <div className="flex gap-2 mt-2">
                                        {profile.tags.map(tag => <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-none">{tag}</Badge>)}
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
             <CarouselPrevious className="hidden lg:flex" />
             <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </section>
    </div>
  );
}
