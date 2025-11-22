'use client';

import React from 'react';
import Image from 'next/image';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Camera, Edit, PlusCircle, Globe, Briefcase, GraduationCap, Home, Heart, MoreHorizontal } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const { user, isUserLoading, firestore } = useFirebase();
  
  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, `members/${user.uid}/profile`, user.uid);
  }, [user, firestore]);

  const { data: userProfileData, isLoading: isProfileLoading } = useDoc(userProfileRef);

  const isLoading = isUserLoading || isProfileLoading;

  const coverImage = PlaceHolderImages.find(p => p.id === 'fantasy-landscape-1');

  const renderSkeleton = () => (
    <div className="w-full max-w-7xl mx-auto">
      <Skeleton className="h-[250px] md:h-[400px] w-full rounded-b-lg" />
      <div className="px-4 md:px-8">
        <div className="flex -mt-12 md:-mt-20">
          <Skeleton className="h-32 w-32 md:h-44 md:w-44 rounded-full border-4 border-background" />
        </div>
        <Skeleton className="h-8 w-64 mt-4" />
        <Skeleton className="h-4 w-48 mt-2" />
        <div className="h-px bg-border my-4" />
      </div>
    </div>
  );

  if (isLoading) {
    return <div className="p-4">{renderSkeleton()}</div>;
  }
  
  const lifeEvents = [
      { year: '2022', text: 'ได้เริ่มงานใหม่ที่ Past times' },
      { year: '2020', text: 'ได้เริ่มงานใหม่ที่ Sonya\'z Divaparadises' },
      { year: '2020', text: 'ได้เริ่มงานใหม่ที่ ทำงานอิสระ' },
      { year: '2020', text: 'ออกจากงานที่ Siam Bayshore Resort & Spa, Pattaya' },
  ];

  const aboutSections = [
      { label: 'ภาพรวม', active: false },
      { label: 'ที่ทำงานและการศึกษา', active: false },
      { label: 'สถานที่ที่เคยอาศัยอยู่', active: false },
      { label: 'ข้อมูลติดต่อและข้อมูลพื้นฐาน', active: false },
      { label: 'ครอบครัวและการคบหา', active: false },
      { label: 'รายละเอียดเกี่ยวกับตัวคุณ', active: false },
      { label: 'เหตุการณ์ในชีวิต', active: true },
  ];
  
  const profileData = userProfileData as any;

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-card/80 border-0 rounded-none md:rounded-b-lg shadow-none">
          <CardContent className="p-0">
            {/* Cover photo */}
            <div className="relative h-[250px] md:h-[400px]">
              {coverImage && (
                <Image
                  src={coverImage.imageUrl}
                  alt="Cover photo"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-b-lg"
                />
              )}
              <div className="absolute inset-0 bg-black/10 rounded-b-lg" />
              <div className="absolute bottom-4 right-4">
                <Button variant="secondary">
                  <Camera className="mr-2 h-4 w-4" />
                  แก้ไขรูปภาพหน้าปก
                </Button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="px-4 md:px-8">
              <div className="flex flex-col md:flex-row gap-4 -mt-12 md:-mt-20">
                <Avatar className="h-32 w-32 md:h-44 md:w-44 rounded-full border-4 border-background bg-background">
                  <AvatarImage src={user?.photoURL || ''} />
                  <AvatarFallback className="text-5xl">
                    {profileData?.nickname?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 pt-4 md:pt-24">
                  <h1 className="text-3xl font-bold">{profileData?.nickname || 'Tipyatida (Grace)'}</h1>
                  <p className="text-muted-foreground">
                    ผู้ติดตาม 5.1 พัน คน • กำลังติดตาม 2.1 พัน คน
                  </p>
                  {/* Follower avatars would go here */}
                </div>
                <div className="flex items-end gap-2 pb-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">แดชบอร์ดมืออาชีพ</Button>
                  <Button variant="secondary"><Edit className="mr-2 h-4 w-4"/>แก้ไข</Button>
                  <Button variant="secondary">ลงโฆษณา</Button>
                </div>
              </div>
              
              <hr className="my-4 border-border" />
              
              {/* Profile Navigation */}
              <div className="flex justify-between items-center">
                 <div className="flex gap-1">
                    <Button variant="ghost" className="text-foreground font-semibold">โพสต์</Button>
                    <Button variant="ghost" className="bg-primary/10 text-primary font-semibold">เกี่ยวกับ</Button>
                    <Button variant="ghost" className="text-muted-foreground font-semibold">Reels</Button>
                    <Button variant="ghost" className="text-muted-foreground font-semibold">รูปภาพ</Button>
                    <Button variant="ghost" className="text-muted-foreground font-semibold">กลุ่ม</Button>
                    <Button variant="ghost" className="text-muted-foreground font-semibold">เพิ่มเติม</Button>
                 </div>
                 <Button variant="secondary" size="icon"><MoreHorizontal /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* About Section Content */}
        <div className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <Card className="bg-card/80">
                    <CardContent className="p-4">
                        <h2 className="text-xl font-bold mb-4">เกี่ยวกับ</h2>
                        <nav>
                            <ul>
                                {aboutSections.map(section => (
                                    <li key={section.label}>
                                        <a href="#" className={cn(
                                            "block p-2 rounded-md font-semibold",
                                            section.active ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                                        )}>
                                            {section.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card className="bg-card/80">
                    <CardContent className="p-4">
                        <h2 className="text-xl font-bold mb-4">เหตุการณ์ในชีวิต</h2>
                         <Button variant="secondary" className="w-full mb-6">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            เพิ่มเหตุการณ์ในชีวิต
                         </Button>
                         <div className="space-y-6">
                            {lifeEvents.map((event, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="text-sm font-semibold text-muted-foreground">{event.year}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-secondary rounded-full">
                                                <Briefcase className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                            <p>{event.text}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                </div>
                            ))}
                         </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
