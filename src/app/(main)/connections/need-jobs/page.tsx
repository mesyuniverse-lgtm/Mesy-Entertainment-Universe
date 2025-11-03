
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Search, Star, HandCoins, Users, MapPin, Briefcase, Filter, CheckCircle, Clock, Hourglass, CircleDollarSign, CheckCircle2, Plane, Bed, Utensils, DollarSign, PlusCircle, ArrowLeft, Building, User, FileText, Send, MessageSquare, Hand, ChefHat, Dumbbell, GraduationCap, Landmark, ShieldCheck, Calculator, Home, Stethoscope, HeartPulse, Boxes, Car, Camera, Wrench, Baby, HeartHandshake, Accessibility, ClipboardList, BrainCircuit, HandHeart, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


const talents = [
    { 
        title: 'Personal Assistant & Shopping Guide',
        talentName: 'Sonya',
        talentAvatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl,
        talentSkill: 'Personal Assistant',
        availability: 'Weekends, Bangkok',
        rate: '1,500 MC / Day',
        tags: ['Shopping', 'Personal Assistant', 'Stylist'],
        status: 'available',
        image: PlaceHolderImages.find(i => i.id === 'shopping-preview')?.imageUrl,
    },
    { 
        title: 'Experienced VIP Bodyguard', 
        talentName: 'Valerius',
        talentAvatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl,
        talentSkill: 'Security Specialist',
        availability: 'Pattaya, Chonburi',
        rate: 'Negotiable',
        tags: ['Security', 'VIP Protection', 'Events'],
        status: 'available',
        image: 'https://picsum.photos/seed/bodyguard/400/225',
    },
    { 
        title: 'Private Chef for hire', 
        talentName: 'Elara',
        talentAvatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl,
        talentSkill: 'Gourmet Chef',
        availability: 'Chiang Mai, available for travel',
        rate: '10,000 MC / Week',
        tags: ['Cooking', 'Private Dining', 'Western & Thai'],
        status: 'busy',
        image: 'https://picsum.photos/seed/private-chef/400/225',
    },
];

const statusConfig = {
    available: { text: "Hire Now", buttonVariant: "default" as "default", className: "", icon: <HandCoins className="mr-2 h-4 w-4"/> },
    busy: { text: "Currently on Quest", buttonVariant: "secondary" as "secondary", className: "bg-yellow-500/80 hover:bg-yellow-500/90 text-white", icon: <Hourglass className="mr-2 h-4 w-4"/>, disabled: true },
};

const categoryGroups = [
    {
        groupName: "Personal & Lifestyle",
        categories: [
            { name: 'จ้างผู้ช่วย', icon: <Hand /> },
            { name: 'เพื่อนพาเที่ยว', icon: <Users /> },
            { name: 'ไกด์นำเที่ยว', icon: <Landmark /> },
            { name: 'แม่ครัว', icon: <ChefHat /> },
            { name: 'แม่บ้าน', icon: <Home /> },
            { name: 'คนขับรถ', icon: <Car /> },
        ]
    },
    {
        groupName: "Care & Wellness",
        categories: [
            { name: 'หมอ', icon: <Stethoscope /> },
            { name: 'พยาบาล', icon: <HeartPulse /> },
            { name: 'พี่เลี้ยงดูแลเด็ก', icon: <Baby /> },
            { name: 'ผู้ดูแลผู้สูงอายุ', icon: <HeartHandshake /> },
            { name: 'ผู้ดูแลผู้พิการ', icon: <Accessibility /> },
        ]
    },
    {
        groupName: "Professional Services",
        categories: [
            { name: 'ผู้จัดการส่วนตัว', icon: <Briefcase /> },
            { name: 'บอดี้การ์ด', icon: <ShieldCheck /> },
            { name: 'นักสืบ', icon: <Search /> },
            { name: 'ทนายความ', icon: <Dumbbell /> },
            { name: 'ครูสอนพิเศษ', icon: <GraduationCap /> },
            { name: 'นักบัญชี', icon: <Calculator /> },
            { name: 'ที่ปรึกษา', icon: <BrainCircuit /> },
            { name: 'เลขา', icon: <ClipboardList /> },
        ]
    },
    {
        groupName: "Technical & Creative",
        categories: [
             { name: 'คนช่วยขนของ', icon: <Boxes /> },
            { name: 'ช่างภาพ', icon: <Camera /> },
            { name: 'ช่างซ่อม', icon: <Wrench /> },
            { name: 'อาสาสมัคร', icon: <HandHeart /> },
        ]
    }
];

const TalentCard = ({ talent }: { talent: typeof talents[0] }) => {
    const currentStatus = statusConfig[talent.status as keyof typeof statusConfig];
    
    return (
        <Card className="overflow-hidden bg-card/60 border-border/50 hover:border-primary/50 transition-all shadow-lg flex flex-col">
            <div className="relative aspect-video">
                <Image src={talent.image} alt={talent.title} fill objectFit="cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute top-2 right-2">
                    <Badge className="bg-primary/80 backdrop-blur-sm text-base">{talent.rate}</Badge>
                </div>
                 <div className="absolute bottom-2 left-4 text-white">
                    <CardTitle className="text-lg leading-tight" style={{textShadow: '1px 1px 3px #000'}}>{talent.title}</CardTitle>
                </div>
            </div>
            <CardContent className="p-4 flex-grow flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={talent.talentAvatar} />
                        <AvatarFallback>{talent.talentName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{talent.talentName}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400"/>
                            {talent.talentSkill}
                        </p>
                    </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground flex-grow mb-4">
                    <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0"/> {talent.availability}</p>
                    <div className="flex flex-wrap gap-1 pt-2">
                         {talent.tags.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                         ))}
                    </div>
                </div>
                
                <div className="mt-auto">
                     <Button 
                        className={cn("w-full font-bold", currentStatus.className)} 
                        variant={currentStatus.buttonVariant}
                        disabled={currentStatus.disabled}
                    >
                        {currentStatus.icon}
                        {currentStatus.text}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

const TalentGrid = ({ status }: { status?: string }) => {
    const filteredTalents = status ? talents.filter(q => q.status === status) : talents;
    if (filteredTalents.length === 0) {
        return (
            <div className="text-center col-span-full py-12">
                <p className="text-muted-foreground">No talents found for this status.</p>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTalents.map((talent, index) => (
                <TalentCard key={index} talent={talent} />
            ))}
        </div>
    );
};


export default function NeedJobsPage() {
  return (
    <div className="container py-12">
      <div className="mb-8">
          <Button asChild variant="outline">
              <Link href="/connections">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to The Connection Hub
              </Link>
          </Button>
      </div>
      <header className="text-center mb-12">
        <div className="flex justify-center gap-4 mb-4">
            <Search className="w-10 h-10 text-primary" />
            <Briefcase className="w-10 h-10 text-primary" />
            <Star className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Need Jobs (Partime)</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Offer your skills and find part-time work. Browse through quests posted by other members and start earning.
        </p>
      </header>
       <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 text-sm mb-6">
            <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                <span className="mx-4">Lord Valerius is hiring a Personal Assistant for a shopping spree! 🛍️</span>
                <span className="mx-4">New Quest: Private Chef needed in Chiang Mai for one week. 🍲</span>
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                <span className="mx-4">Lord Valerius is hiring a Personal Assistant for a shopping spree! 🛍️</span>
                <span className="mx-4">New Quest: Private Chef needed in Chiang Mai for one week. 🍲</span>
            </div>
        </div>
        <style jsx>{`
            @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
            @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
            .animate-marquee { animation: marquee 30s linear infinite; }
            .animate-marquee2 { animation: marquee2 30s linear infinite; }
        `}</style>
      
       <div className="my-8">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-auto w-full md:w-auto">
                        Browse Categories
                        <ChevronDown className="ml-2 h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-screen max-w-sm md:max-w-md lg:max-w-lg" align="start">
                   {categoryGroups.map((group, index) => (
                       <React.Fragment key={group.groupName}>
                           <DropdownMenuLabel>{group.groupName}</DropdownMenuLabel>
                           <DropdownMenuGroup>
                            {group.categories.map(category => (
                                <DropdownMenuItem key={category.name}>
                                    {category.icon}
                                    <span className="ml-2">{category.name}</span>
                                </DropdownMenuItem>
                            ))}
                           </DropdownMenuGroup>
                           {index < categoryGroups.length - 1 && <DropdownMenuSeparator />}
                       </React.Fragment>
                   ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        <aside className="lg:col-span-3 space-y-6">
            <Card>
                <CardHeader className="flex-row items-center gap-3">
                    <Users className="h-6 w-6 text-primary"/>
                    <CardTitle>Talent Pool</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">2,458</p>
                    <p className="text-sm text-muted-foreground">talents available</p>
                </CardContent>
            </Card>

            <Card className="bg-card/70 border-primary/30">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><PlusCircle/> Need A Job</CardTitle>
                    <CardDescription>Let hirers know you're available. Post your skills and desired work.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                        <Link href="/connections/post-quest/create-new-request">Post Your Availability</Link>
                    </Button>
                </CardContent>
            </Card>
        </aside>

        <main className="lg:col-span-9">
            <div className="flex gap-2 mb-8">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search talents by skill or name..." className="pl-10 h-12 text-base" />
                </div>
                <Button variant="outline" size="lg"><Filter className="mr-2"/> Filters</Button>
            </div>

            <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 h-auto">
                    <TabsTrigger value="all">All Talents</TabsTrigger>
                    <TabsTrigger value="available">Available Now</TabsTrigger>
                    <TabsTrigger value="busy">On a Quest</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-6">
                    <TalentGrid />
                </TabsContent>
                <TabsContent value="available" className="mt-6">
                   <TalentGrid status="available" />
                </TabsContent>
                <TabsContent value="busy" className="mt-6">
                    <TalentGrid status="busy" />
                </TabsContent>
            </Tabs>
            
            <div className="text-center mt-12">
                <Button variant="outline" size="lg">Load More Talents</Button>
            </div>
        </main>
      </div>
    </div>
  );
}
