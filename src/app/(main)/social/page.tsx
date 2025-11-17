'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Heart, MessageCircle, Share2, Music, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const videoPost = {
  creator: {
    name: 'Seraphina',
    avatarId: 'female-warrior-1',
    handle: '@seraphina_sings',
    isVerified: true,
  },
  description: 'Singing a classic from the Crystal Chronicles soundtrack! ✨ #fantasy #singing #mesy',
  song: 'Melodies of Life - Final Fantasy IX',
  videoUrl: 'https://cdn.pixabay.com/video/2024/02/09/198881-912061556_large.mp4',
  stats: {
    likes: '1.2M',
    comments: '4,812',
    shares: '25.6K',
  },
};

export default function SocialPage() {
  const creatorAvatar = PlaceHolderImages.find(p => p.id === videoPost.creator.avatarId);
  const songCover = PlaceHolderImages.find(p => p.id === 'glowing-gem-1');

  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-900">
      <div className="relative aspect-[9/16] w-full max-w-[420px] overflow-hidden rounded-2xl bg-black shadow-2xl shadow-primary/20 border-2 border-primary/20">
        {/* Video Player */}
        <video
          src={videoPost.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
          <div className="flex items-end">
            {/* Left Side: Info */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold">{videoPost.creator.handle}</h3>
                {videoPost.creator.isVerified && (
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                )}
              </div>
              <p className="text-sm">{videoPost.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <Music className="h-4 w-4" />
                <span>{videoPost.song}</span>
              </div>
            </div>

            {/* Right Side: Actions & Song */}
            <div className="flex flex-col items-center space-y-5">
              <div className="relative">
                <Avatar className="h-14 w-14 border-2 border-white">
                  {creatorAvatar && <AvatarImage src={creatorAvatar.imageUrl} alt={videoPost.creator.name} />}
                  <AvatarFallback>{videoPost.creator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button size="icon" className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-primary text-primary-foreground">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
                    <Heart className="h-8 w-8 text-white" />
                </Button>
                <span className="text-xs font-bold">{videoPost.stats.likes}</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                 <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
                    <MessageCircle className="h-8 w-8 text-white" />
                </Button>
                <span className="text-xs font-bold">{videoPost.stats.comments}</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                 <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
                    <Share2 className="h-8 w-8 text-white" />
                 </Button>
                <span className="text-xs font-bold">{videoPost.stats.shares}</span>
              </div>
              
              <div className="mt-4 h-12 w-12 rounded-full border-2 border-zinc-700 bg-zinc-800 p-1 animate-spin-slow">
                 {songCover && <Image src={songCover.imageUrl} alt="Song cover" width={48} height={48} className="rounded-full" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add slow spin animation to tailwind config if not present
// in tailwind.config.ts > theme > extend > keyframes
// spin-slow: {
//   'from': { transform: 'rotate(0deg)' },
//   'to': { transform: 'rotate(360deg)' },
// },
// in tailwind.config.ts > theme > extend > animation
// 'spin-slow': 'spin-slow 10s linear infinite',
