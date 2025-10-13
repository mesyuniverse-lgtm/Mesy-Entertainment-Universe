'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowUp, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const chronicleData = [
  {
    year: '2021',
    chapter: 'Chapter 1',
    title: 'หมอกแห่งสงคราม',
    subtitle: 'ห่าฝนธนูจะบดบังดวงอาทิตย์',
    description: 'พลังใหม่ที่จะพลิกกระแสสงคราม คลาสใหม่และระบบเปลี่ยนคลาส',
    characterName: 'นักธนู',
    characterDescription: 'จากเงามืดมือสังหารจอมฉกาจ ‘พลหน้าไม้’ ห่าฝนธนูพุ่งทะลวงอากาศ',
    characterImage: PlaceHolderImages.find((i) => i.id === 'female-archer-1')!,
  },
  {
    year: '2022',
    chapter: 'Chapter 2',
    title: 'การยึดปราสาท',
    subtitle: 'กำแพงเมืองไม่อาจขวางกั้น',
    description: 'แนะนำระบบสงครามกิลด์และการยึดครองปราสาทเพื่อชิงความเป็นใหญ่',
    characterName: 'อัศวิน',
    characterDescription: 'ผู้นำทัพในชุดเกราะหนักทะลวงทุกแนวป้องกัน',
    characterImage: PlaceHolderImages.find((i) => i.id === 'knight-1')!,
  },
  {
    year: '2023',
    chapter: 'Chapter 3',
    title: 'สำรวจ',
    subtitle: 'ดินแดนใหม่รอการค้นพบ',
    description: 'ขยายโลกของ MESY เพิ่มทวีปใหม่ มอนสเตอร์ และภารกิจอันท้าทาย',
    characterName: 'นักสำรวจ',
    characterDescription: 'ผู้บุกเบิกดินแดนที่ไม่เคยมีใครไปถึง พร้อมแผนที่และเข็มทิศคู่ใจ',
    characterImage: PlaceHolderImages.find((i) => i.id === 'explorer-1')!,
  },
  {
    year: '2024',
    chapter: 'Chapter 4',
    title: ' Coming Soon',
    subtitle: 'อนาคตที่ยังมาไม่ถึง',
    description: 'การอัปเดตครั้งใหญ่กำลังจะมา โปรดติดตาม!',
    characterName: '???',
    characterDescription: 'ความลับที่ยังคงถูกเก็บซ่อนไว้ในเงามืด',
    characterImage: PlaceHolderImages.find((i) => i.id === 'glowing-gem-1')!,
  },
   {
    year: '2025',
    chapter: 'Chapter 5',
    title: 'Coming Soon',
    subtitle: 'ตำนานบทใหม่กำลังจะเริ่ม',
    description: 'เตรียมพบกับประสบการณ์ที่ไม่เคยมีมาก่อนในจักรวาล MESY',
    characterName: '???',
    characterDescription: 'ประวัติศาสตร์หน้าใหม่กำลังจะถูกเขียนขึ้น',
    characterImage: PlaceHolderImages.find((i) => i.id === 'glowing-gem-1')!,
  },
];

export default function ChroniclePage() {
  const [selectedYear, setSelectedYear] = useState(chronicleData[0].year);

  const selectedData = chronicleData.find((d) => d.year === selectedYear) || chronicleData[0];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full bg-background text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={selectedData.characterImage.imageUrl}
          alt={selectedData.characterImage.description}
          data-ai-hint={selectedData.characterImage.imageHint}
          fill
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
         <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container relative z-10 flex min-h-screen items-center py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-16 items-center">
          {/* Timeline */}
          <div className="md:col-span-1">
            <div className="relative pl-24 md:pl-28">
              <div className="absolute left-[5.5rem] md:left-[6.5rem] top-0 bottom-0 w-0.5 bg-white/20" />
              {chronicleData.map((item, index) => (
                <div key={item.year} className="relative mb-8 last:mb-0">
                  <div
                    className={cn(
                      'absolute left-0 top-1/2 -translate-y-1/2 text-lg font-bold transition-colors duration-300 cursor-pointer',
                      selectedYear === item.year ? 'text-primary' : 'text-white/50 hover:text-white'
                    )}
                    onClick={() => setSelectedYear(item.year)}
                  >
                    {item.year}
                  </div>
                   <div className="absolute left-[5.25rem] md:left-[6.25rem] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 border-white/20">
                     {selectedYear === item.year && <div className="w-full h-full rounded-full bg-primary ring-4 ring-primary/30"/>}
                   </div>
                  <div
                    className={cn(
                      'transition-all duration-300 cursor-pointer pl-8',
                      selectedYear === item.year ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                    )}
                     onClick={() => setSelectedYear(item.year)}
                  >
                    <p className="text-sm text-primary">{item.chapter}</p>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary tracking-wider" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
              {selectedData.title}
            </h1>
            <p className="mt-2 text-xl md:text-2xl font-semibold" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
              "{selectedData.subtitle}"
            </p>
            <p className="mt-4 max-w-lg mx-auto md:mx-0 text-muted-foreground">
              {selectedData.description}
            </p>

            <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-xl font-bold">{selectedData.characterName}</h4>
                <p className="mt-2 max-w-lg mx-auto md:mx-0 text-muted-foreground">
                    {selectedData.characterDescription}
                </p>
                <Button className="mt-6" size="lg">
                    <Play className="mr-2"/>
                    Play
                </Button>
            </div>
          </div>
        </div>
      </div>
      
       <div className="absolute bottom-4 right-4 z-20">
        <Button variant="outline" size="icon" onClick={handleScrollToTop} className="bg-background/50 backdrop-blur-sm">
          <ArrowUp />
        </Button>
      </div>

       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <div className="animate-bounce">
          <div className="w-5 h-5 border-b-2 border-r-2 border-white/50 transform rotate-45 -mb-2" />
          <div className="w-5 h-5 border-b-2 border-r-2 border-white/50 transform rotate-45" />
        </div>
      </div>
    </div>
  );
}
