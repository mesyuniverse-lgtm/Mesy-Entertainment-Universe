'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const chronicleData = [
  {
    year: '2022',
    chapter: 'Chapter 20',
    title: 'ขุนศึก',
    quote: '"ในตอนจบของการต่อสู้อันดุเดือด จะมอบความหวังให้แก่พันธมิตร และจะมอบฝันร้ายให้แก่ศัตรู"',
    description: 'หมัดของเขาคือความรอดที่ยกพันธมิตรขึ้น และเป็นการพิพากษาที่น่าความสิ้นหวังมาสู่ศัตรู',
    classTitle: 'คลาสใหม่, "ขุนศึก"',
    classDescription: 'แสวงหาศิลปะการต่อสู้ที่แท้จริง นักรบจากดินแดนตะวันตกที่ละทิ้งดาบ เขาเชี่ยวชาญในศิลปะการต่อสู้และเวทมนตร์ ควบคุมการไหลของสนามรบด้วยการโจมตีที่ดุดัน, การรักษาพันธมิตร และการทำให้ศัตรูไร้ความสามารถ',
    characterImage: PlaceHolderImages.find((i) => i.id === 'fighter-character')!,
  },
  {
    year: '2023',
    chapter: 'Chapter 21',
    title: 'Coming Soon',
    quote: 'อนาคตที่ยังมาไม่ถึง',
    description: 'การอัปเดตครั้งใหญ่กำลังจะมา โปรดติดตาม!',
    classTitle: '',
    classDescription: '',
    characterImage: PlaceHolderImages.find((i) => i.id === 'glowing-gem-1')!,
  },
  // Add other years here, ensuring selectedYear default is in the data
   {
    year: '2021',
    chapter: '',
    title: '',
    quote: '',
    description: '',
    classTitle: '',
    classDescription: '',
    characterImage: PlaceHolderImages.find((i) => i.id === 'knight-1')!,
  },
  {
    year: '2024',
    chapter: '',
    title: '',
    quote: '',
    description: '',
    classTitle: '',
    classDescription: '',
    characterImage: PlaceHolderImages.find((i) => i.id === 'glowing-gem-1')!,
  },
   {
    year: '2025',
    chapter: '',
    title: '',
    quote: '',
    description: '',
    classTitle: '',
    classDescription: '',
    characterImage: PlaceHolderImages.find((i) => i.id === 'glowing-gem-1')!,
  },
].sort((a, b) => parseInt(a.year) - parseInt(b.year)); // Sort years chronologically

export default function ChroniclePage() {
  const [selectedYear, setSelectedYear] = useState(chronicleData.find(d => d.title)?.year || chronicleData[0].year);

  const selectedData = chronicleData.find((d) => d.year === selectedYear) || chronicleData[0];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const bgImage = selectedData.characterImage;
  const characterSilhouette = PlaceHolderImages.find((i) => i.id === 'fighter-silhouette');

  return (
    <div className="relative min-h-screen w-full bg-background text-white overflow-hidden">
      
      {/* Background Image and Overlays */}
      <div className="absolute inset-0 z-0">
        {characterSilhouette && (
           <Image
            src={characterSilhouette.imageUrl}
            alt={characterSilhouette.description}
            data-ai-hint={characterSilhouette.imageHint}
            fill
            className="object-cover object-center opacity-20"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      
      {/* Red accent shape */}
      <div className="absolute bottom-0 right-0 h-full w-1/3 bg-primary/80 clip-path-trapezoid hidden lg:block" />

      {/* Main Content */}
      <div className="container relative z-10 flex min-h-screen flex-col justify-center py-16 md:py-24">
        
        <div className="absolute top-16 left-4 md:left-10">
          <h2 className="text-2xl font-bold tracking-widest text-white/80">CHRONICLE</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Timeline */}
            <div className="lg:col-span-3">
              <div className="relative flex lg:flex-col items-start justify-center lg:space-y-6">
                 <div className="absolute left-1/2 lg:left-14 lg:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-white/10" />
                  {chronicleData.map((item) => (
                    <div 
                      key={item.year}
                      className="relative z-10 w-full flex justify-center lg:justify-start items-center mb-6 lg:mb-0 cursor-pointer group"
                      onClick={() => setSelectedYear(item.year)}
                    >
                        <div className='w-16 text-right pr-4'>
                          <p className={cn("text-lg font-semibold transition-colors", selectedYear === item.year ? 'text-white' : 'text-white/50 group-hover:text-white')}>
                            {item.year}
                          </p>
                        </div>
                        
                        <div className="flex-shrink-0 w-3 h-3 rounded-full bg-background border-2 border-white/20 relative">
                            {item.title && <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-white"/>}
                             {selectedYear === item.year && <div className="absolute inset-[-4px] m-auto w-4 h-4 rounded-full border-2 border-primary"/>}
                        </div>

                        {item.title && (
                          <div className={cn("pl-4 transition-opacity", selectedYear === item.year ? "opacity-100" : "opacity-50 group-hover:opacity-100")}>
                            <p className="text-xs text-primary">{item.chapter}</p>
                            <p className={cn("font-semibold text-sm", selectedYear === item.year ? "text-primary" : "text-white")}>{item.title}</p>
                          </div>
                        )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Character Image */}
            <div className="lg:col-span-4 relative h-96 lg:h-[60vh] -mt-8 lg:mt-0">
               {bgImage && (
                <Image
                  src={bgImage.imageUrl}
                  alt={bgImage.description}
                  data-ai-hint={bgImage.imageHint}
                  fill
                  className="object-contain object-bottom drop-shadow-[0_20px_20px_rgba(0,0,0,0.7)]"
                />
              )}
            </div>

            {/* Content Details */}
            <div className="lg:col-span-5 text-center lg:text-left">
                <h1 className="text-4xl font-bold text-primary tracking-wider" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
                  {selectedData.title}
                </h1>
                <blockquote className="mt-4 text-xl font-semibold italic">
                  "{selectedData.quote}"
                </blockquote>
                <p className="mt-4 text-muted-foreground">
                  {selectedData.description}
                </p>

                {selectedData.classTitle && (
                  <div className='mt-12 pt-8 border-t border-white/10'>
                      <h3 className="text-lg font-bold">{selectedData.classTitle}</h3>
                      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto lg:mx-0">
                         {selectedData.classDescription}
                      </p>
                  </div>
                )}
            </div>
        </div>
      </div>
      
       {/* Scroll to top button */}
       <div className="absolute bottom-4 right-4 z-20">
        <Button variant="outline" size="icon" onClick={handleScrollToTop} className="bg-background/50 backdrop-blur-sm">
          <ArrowUp />
        </Button>
      </div>

       {/* Scroll down indicator */}
       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <div className="animate-bounce">
          <div className="w-5 h-5 border-b-2 border-r-2 border-white/50 transform rotate-45 -mb-2" />
          <div className="w-5 h-5 border-b-2 border-r-2 border-white/50 transform rotate-45" />
        </div>
      </div>
    </div>
  );
}
