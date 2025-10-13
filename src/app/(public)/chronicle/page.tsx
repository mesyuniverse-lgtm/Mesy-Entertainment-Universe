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
].sort((a, b) => parseInt(a.year) - parseInt(b.year)); // Sort years in ascending order

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
        {bgImage && (
           <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            data-ai-hint={bgImage.imageHint}
            fill
            className="object-cover object-center opacity-10"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background" />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-widest text-white uppercase" style={{textShadow: '2px 2px 8px rgba(var(--primary), 0.5)'}}>Chronicle</h1>
          <p className="text-lg text-muted-foreground mt-2">The history and future of the MESY Universe.</p>
        </header>

        <div className="flex flex-col lg:flex-row items-start gap-12">

            {/* Timeline Selector */}
            <aside className="w-full lg:w-1/4 lg:sticky top-24">
                <div className="space-y-2">
                    {chronicleData.map((item) => (
                        <button 
                            key={item.year}
                            onClick={() => setSelectedYear(item.year)}
                            className={cn(
                                "w-full text-left p-4 rounded-lg transition-all duration-300 border-l-4",
                                selectedYear === item.year 
                                    ? 'bg-primary/10 border-primary shadow-lg' 
                                    : 'bg-card/50 border-transparent hover:bg-card/80'
                            )}
                        >
                            <p className={cn(
                                "text-2xl font-bold font-headline",
                                selectedYear === item.year ? 'text-primary' : 'text-white/80'
                            )}>
                                {item.year}
                            </p>
                            {item.title && item.title !== 'Coming Soon' && (
                                <p className={cn(
                                    "text-sm",
                                    selectedYear === item.year ? "text-primary-foreground/90" : "text-muted-foreground"
                                )}>
                                    {item.chapter || "Update"}
                                </p>
                            )}
                        </button>
                    ))}
                </div>
            </aside>

            {/* Content Details */}
            <main className="w-full lg:w-3/4">
                <Card className="bg-card/70 backdrop-blur-sm border-primary/20 shadow-2xl shadow-primary/10">
                    <CardHeader>
                        <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
                             {selectedData.characterImage && (
                                <Image
                                  src={selectedData.characterImage.imageUrl}
                                  alt={selectedData.characterImage.description}
                                  data-ai-hint={selectedData.characterImage.imageHint}
                                  fill
                                  className="object-cover"
                                />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
                        </div>

                        <p className="text-primary font-semibold">{selectedData.chapter}</p>
                        <CardTitle className="text-4xl !mt-0 font-bold tracking-wider" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
                          {selectedData.title}
                        </CardTitle>
                        <blockquote className="mt-2 text-lg font-semibold italic text-muted-foreground border-l-4 border-primary/50 pl-4">
                          "{selectedData.quote}"
                        </blockquote>
                    </CardHeader>
                    <CardContent>
                        <p className="mt-4 text-foreground/90">
                          {selectedData.description}
                        </p>
                      
                        {selectedData.milestones && selectedData.milestones.length > 0 && (
                          <div className='mt-8 pt-6 border-t border-white/10 space-y-4'>
                            {selectedData.milestones.map((milestone, index) => (
                              <div key={index} className="p-4 rounded-md bg-background/50 border border-border">
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
