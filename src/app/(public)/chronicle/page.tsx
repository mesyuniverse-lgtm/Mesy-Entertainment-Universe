'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const chronicleData = [
  {
    year: '2025',
    chapter: 'Chapter 1: The Foundation',
    title: 'แผนพัฒนาระบบตัวอย่าง',
    quote: '"ช่วงเวลาทองในการทดลอง พิสูจน์ และวางรากฐานสำหรับ MESY UNIVERSE"',
    description: 'การวางแผนพัฒนา “ระบบตัวอย่าง” ภายใน 3 เดือนสุดท้ายของปี 2025 คือช่วงเวลาทองในการทดลอง พิสูจน์ และวางรากฐานสำหรับ MESY UNIVERSE ก่อนเข้าสู่ปีแห่งการขยายตัวใน 2026',
    milestones: [
      {
        title: 'เดือนตุลาคม: “พิธีเปิดจักรวาล”',
        details: 'สร้างโครงสร้างพื้นฐาน, ระบบสมาชิกลงทะเบียน (Email/Google), หน้า Welcome Page, และตาราง Member Plan Level 0-5',
      },
      {
        title: 'เดือนพฤศจิกายน: “การปลุกพลังสมาชิก”',
        details: 'พัฒนาระบบ Level (0-10), Dashboard, หน้า CHRONICLE, และระบบ Daily Rewards เพื่อให้สมาชิกเห็นสถานะและติดตามการพัฒนาได้',
      },
      {
        title: 'เดือนธันวาคม: “การเฉลิมฉลองแห่งการเชื่อมโยง”',
        details: 'เชื่อมต่อ AI Hub (Prompt Generator), Wallet Mockup, Shopping Hub ตัวอย่าง, และระบบสิทธิ์ Guest/Member เพื่อสาธิตและทดสอบ',
      }
    ],
    characterImage: PlaceHolderImages.find((i) => i.id === 'glowing-gem-1')!,
  },
  {
    year: '2026',
    chapter: '',
    title: 'Coming Soon',
    quote: 'อนาคตที่ยังมาไม่ถึง',
    description: 'การอัปเดตครั้งใหญ่กำลังจะมา โปรดติดตาม!',
    milestones: [],
    characterImage: PlaceHolderImages.find((i) => i.id === 'glowing-gem-1')!,
  },
  {
    year: '2027',
    chapter: '',
    title: 'Coming Soon',
    quote: '',
    description: '',
    milestones: [],
    characterImage: PlaceHolderImages.find((i) => i.id === 'glowing-gem-1')!,
  },
  {
    year: '2028',
    chapter: '',
    title: 'Coming Soon',
    quote: '',
    description: '',
    milestones: [],
    characterImage: PlaceHolderImages.find((i) => i.id === 'glowing-gem-1')!,
  },
   {
    year: '2029',
    chapter: '',
    title: 'Coming Soon',
    quote: '',
    description: '',
    milestones: [],
    characterImage: PlaceHolderImages.find((i) => i.id === 'glowing-gem-1')!,
  },
].sort((a, b) => parseInt(a.year) - parseInt(b.year)); // Sort years chronologically

export default function ChroniclePage() {
  const [selectedYear, setSelectedYear] = useState(chronicleData.find(d => d.title && d.title !== 'Coming Soon')?.year || chronicleData[0].year);

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
                 <div className="absolute left-14 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-white/10 hidden lg:block" />
                  {chronicleData.map((item) => (
                    <div 
                      key={item.year}
                      className="relative z-10 w-full flex justify-start items-center mb-6 lg:mb-0 cursor-pointer group"
                      onClick={() => setSelectedYear(item.year)}
                    >
                        <div className='w-16 text-right pr-4'>
                          <p className={cn("text-lg font-semibold transition-colors", selectedYear === item.year ? 'text-white' : 'text-white/50 group-hover:text-white')}>
                            {item.year}
                          </p>
                        </div>
                        
                        <div className="flex-shrink-0 w-3 h-3 rounded-full bg-background border-2 border-white/20 relative">
                            {item.title && item.title !== 'Coming Soon' && <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-white"/>}
                             {selectedYear === item.year && <div className="absolute inset-[-4px] m-auto w-4 h-4 rounded-full border-2 border-primary"/>}
                        </div>

                        {item.title && item.title !== 'Coming Soon' && (
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
              
                {selectedData.milestones && selectedData.milestones.length > 0 && (
                  <div className='mt-12 space-y-4 pt-8 border-t border-white/10'>
                    {selectedData.milestones.map((milestone, index) => (
                      <Card key={index} className="bg-card/50 backdrop-blur-sm">
                        <CardHeader className='p-4'>
                          <CardTitle className='text-base text-primary'>{milestone.title}</CardTitle>
                        </CardHeader>
                        <CardContent className='p-4 pt-0'>
                          <p className="text-sm text-muted-foreground">{milestone.details}</p>
                        </CardContent>
                      </Card>
                    ))}
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
