'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Gem } from '@/components/icons';

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const bgImage = PlaceHolderImages.find((i) => i.id === 'enchanted-forest-1');
  const unrealLogo = 'https://www.unrealengine.com/content/dam/unreal-engine/common/images/unreal-engine-logo-rev-b-191x24-4f81c81525f69c6767664e1c8b36879c.svg';

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        router.push('/create-member-id');
      }, 500);
    }
  }, [progress, router]);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-black text-white">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt="Loading Background"
          fill
          className="object-cover opacity-50"
        />
      )}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex flex-col items-center drop-shadow-[0_5px_15px_rgba(255,255,255,0.2)]">
            <Gem className="h-24 w-24 text-primary" />
            <h1 className="text-4xl font-bold font-headline mt-4">MESY UNIVERSE</h1>
        </div>
        <div className="mt-8 w-40 h-40">
           <div className="relative w-full h-full">
                <Progress value={progress} type="radial" className='text-primary'/>
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                    {Math.round(progress)}%
                </div>
            </div>
        </div>
        <p className="mt-4 text-lg tracking-widest">Loading...</p>
      </div>
      <div className="absolute bottom-4 left-4 z-10">
        <Image src={unrealLogo} alt="Unreal Engine" width={95} height={12} />
      </div>
      <div className="absolute bottom-4 right-4 z-10 text-xs text-muted-foreground">
        <p>© WEMADE. ALL RIGHTS RESERVED.</p>
        <p className="text-right">[D3D11] 1.111.1.467557</p>
      </div>
    </div>
  );
}
