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
    characterImage: PlaceHolderImages.find((i) => i.id === 'fighter-character')!,
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
].sort((a, b) => parseInt(a.year) - parseInt(b.year)); // Sort years in ascending order

export default function ChroniclePage() {
  const [selectedYear, setSelectedYear] = useState(chronicleData[0].year);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

  const selectedData = chronicleData.find((d) => d.year === selectedYear) || chronicleData[0];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const bgImage = PlaceHolderImages.find((i) => i.id === 'fighter-silhouette');

  return (
    <div className="relative min-h-screen w-full bg-background text-white overflow-hidden">
      
      {/* Background Image and Overlays */}
      <div className="absolute inset-0 z-0">
        {bgImage && (
           <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            data-ai-hint={bgImage.imageHint}
            fill
            className="object-cover object-center opacity-20"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-widest text-white uppercase" style={{textShadow: '2px 2px 8px rgba(0,0,0, 0.5)'}}>Chronicle</h1>
        </header>

        <div className="flex flex-col lg:flex-row items-start gap-12">

            {/* Timeline Selector */}
            <aside className="w-full lg:w-1/3 lg:sticky top-24">
              <div className="flex gap-8 items-start">
                  {/* Year Selector */}
                  <div className="flex flex-col items-center gap-4">
                      {chronicleData.map((item) => (
                          <button 
                              key={item.year}
                              onClick={() => {
                                setSelectedYear(item.year)
                                setSelectedChapterIndex(0);
                              }}
                              className={cn(
                                  "font-headline font-bold text-2xl transition-colors duration-300",
                                  selectedYear === item.year ? 'text-primary' : 'text-white/60 hover:text-white'
                              )}
                          >
                              {item.year}
                          </button>
                      ))}
                  </div>

                  {/* Chapter Selector */}
                  {selectedData.milestones.length > 0 && (
                    <div className="relative pl-8 pt-2">
                        <div className="absolute left-[3px] top-0 bottom-0 w-px bg-white/20"></div>

                        {selectedData.milestones.map((milestone, index) => (
                            <button 
                                key={index}
                                onClick={() => setSelectedChapterIndex(index)}
                                className="relative w-full text-left mb-6 transition-all duration-300 group"
                            >
                                <div className="absolute left-0 top-1.5 -translate-y-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-white/30 group-hover:bg-primary transition-colors duration-300 z-10">
                                    {selectedChapterIndex === index && (
                                        <div className="absolute inset-0 rounded-full bg-primary ring-4 ring-primary/30"></div>
                                    )}
                                </div>
                                
                                <p className={cn(
                                    "text-sm font-semibold transition-colors duration-300",
                                    selectedChapterIndex === index ? "text-white/90" : "text-muted-foreground group-hover:text-white/80"
                                )}>
                                    Chapter {index + 1}
                                </p>
                                <p className={cn(
                                    "text-sm transition-colors duration-300",
                                    selectedChapterIndex === index ? "text-white/80" : "text-muted-foreground/80 group-hover:text-white/70"
                                )}>
                                    {milestone.title}
                                </p>
                            </button>
                        ))}
                    </div>
                  )}
              </div>
            </aside>

            {/* Content Details */}
            <main className="w-full lg:w-2/3">
                <Card className="bg-card/70 backdrop-blur-sm border-primary/20 shadow-2xl shadow-primary/10">
                    <CardHeader>
                        <p className="text-primary font-semibold">{selectedData.chapter}</p>
                        <CardTitle className="text-4xl !mt-0 font-bold tracking-wider" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
                          {selectedData.title}
                        </CardTitle>
                        <blockquote className="mt-2 text-lg font-semibold italic text-muted-foreground border-l-4 border-primary/50 pl-4">
                          {selectedData.quote}
                        </blockquote>
                    </CardHeader>
                    <CardContent>
                        <p className="mt-4 text-foreground/90">
                          {selectedData.description}
                        </p>
                      
                        {selectedData.milestones && selectedData.milestones.length > 0 && (
                          <div className='mt-8 pt-6 border-t border-white/10 space-y-4'>
                            {selectedData.milestones.map((milestone, index) => (
                              <div key={index} className={cn("p-4 rounded-md bg-background/50 border border-border", selectedChapterIndex === index ? "block" : "hidden")}>
                                <h4 className='font-bold text-lg text-primary'>{milestone.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{milestone.details}</p>
                              </div>
                            ))}
                          </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
      </div>
      
       {/* Scroll to top button */}
       <div className="fixed bottom-4 right-4 z-20">
        <Button variant="outline" size="icon" onClick={handleScrollToTop} className="bg-background/50 backdrop-blur-sm">
          <ArrowUp />
        </Button>
      </div>
    </div>
  );
}
