
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
import { Separator } from '@/components/ui/separator';


const talents = [
    { 
        title: 'Personal Assistant & Shopping Guide',
        talentName: 'Sonya',
        talentAvatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl,
        talentSkill: 'Personal Assistant',
        experience: '5 years',
        rating: 4.8,
        reviews: 88,
        availability: 'Weekends, Bangkok',
        residence: 'Bangkok',
        workPreference: ['On-site', 'Online'],
        requestedAllowances: ['Food Allowance'],
        aiRate: '1,500 MC / Day',
        status: 'available',
    },
    { 
        title: 'Experienced VIP Bodyguard', 
        talentName: 'Valerius',
        talentAvatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl,
        talentSkill: 'Security Specialist',
        experience: '10 years',
        rating: 5.0,
        reviews: 42,
        availability: 'Pattaya, Chonburi',
        residence: 'Pattaya',
        workPreference: ['On-site'],
        requestedAllowances: ['Travel Expenses', 'Accommodation'],
        aiRate: '5,000 MC / Day',
        status: 'pending',
    },
    { 
        title: 'Private Chef for hire', 
        talentName: 'Elara',
        talentAvatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl,
        talentSkill: 'Gourmet Chef',
        experience: '8 years',
        rating: 4.9,
        reviews: 120,
        availability: 'Chiang Mai, available for travel',
        residence: 'Chiang Mai',
        workPreference: ['On-site'],
        requestedAllowances: ['Accommodation', 'Food Allowance'],
        aiRate: '10,000 MC / Week',
        status: 'approved',
    },
    {
        title: 'Genkit AI Developer',
        talentName: 'Draconis',
        talentAvatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl,
        talentSkill: 'AI Developer',
        experience: '7 years',
        rating: 4.9,
        reviews: 65,
        availability: 'Remote (Online)',
        residence: 'Digital Realm',
        workPreference: ['Online'],
        requestedAllowances: ['Advance Payment'],
        aiRate: '8,000 MC / Project',
        status: 'working',
    },
    {
        title: '3D Artist & Animator',
        talentName: 'Echo',
        talentAvatar: PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl,
        talentSkill: '3D Artist',
        experience: '4 years',
        rating: 4.7,
        reviews: 95,
        availability: 'Remote (Online)',
        residence: 'Bangkok',
        workPreference: ['Online'],
        requestedAllowances: [],
        aiRate: '3,500 MC / Model',
        status: 'paid',
    },
    {
        title: 'Community Manager',
        talentName: 'Lyra',
        talentAvatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl,
        talentSkill: 'Community Management',
        experience: '3 years',
        rating: 4.8,
        reviews: 72,
        availability: 'Remote (Online)',
        residence: 'Phuket',
        workPreference: ['Online'],
        requestedAllowances: [],
        aiRate: '2,000 MC / mo',
        status: 'completed',
    }
];

const statusConfig = {
    available: { text: "Hire Now", buttonVariant: "destructive" as "destructive", className: "", icon: <HandCoins className="mr-2 h-4 w-4"/> },
    pending: { text: "Waiting for Confirmation", buttonVariant: "secondary" as "secondary", className: "bg-yellow-500/80 hover:bg-yellow-500/90 text-white", icon: <Hourglass className="mr-2 h-4 w-4"/>, disabled: true },
    approved: { text: "Confirmed - Ready to Start", buttonVariant: "default" as "default", className: "bg-green-600 hover:bg-green-700", icon: <CheckCircle className="mr-2 h-4 w-4"/>, disabled: true },
    working: { text: "Mark as Complete & Get Paid", buttonVariant: "default" as "default", className: "bg-blue-600 hover:bg-blue-700", icon: <CircleDollarSign className="mr-2 h-4 w-4"/> },
    paid: { text: "Payment Received: Claim Now", buttonVariant: "default" as "default", className: "bg-pink-600 hover:bg-pink-700", icon: <CheckCircle2 className="mr-2 h-4 w-4"/> },
    completed: { text: "Completed", buttonVariant: "default" as "default", className: "bg-violet-600 hover:bg-violet-700", icon: <CheckCircle2 className="mr-2 h-4 w-4"/>, disabled: true }
};


const allowanceIcons = {
    'Advance Payment': <DollarSign className="h-4 w-4 text-green-400"/>,
    'Travel Expenses': <Plane className="h-4 w-4 text-blue-400"/>,
    'Accommodation': <Bed className="h-4 w-4 text-purple-400"/>,
    'Food Allowance': <Utensils className="h-4 w-4 text-orange-400"/>
} as const;


const TalentCard = ({ talent }: { talent: typeof talents[0] }) => {
    const currentStatus = statusConfig[talent.status as keyof typeof statusConfig];
    
    return (
        <Card className="overflow-hidden bg-card/60 border-border/50 hover:border-primary/50 transition-all shadow-lg flex flex-col">
            <CardHeader className="p-4">
                 <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14 border-2 border-primary/50">
                        <AvatarImage src={talent.talentAvatar} />
                        <AvatarFallback>{talent.talentName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold text-xl">{talent.talentName}</p>
                        <p className="text-sm text-primary font-semibold">{talent.talentSkill}</p>
                         <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-400 fill-current"/> {talent.rating} ({talent.reviews} reviews)</span>
                            <span>•</span>
                            <span>{talent.experience}</span>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow flex flex-col">
                <div className="space-y-2 text-sm text-muted-foreground flex-grow mb-4">
                    <p className="font-semibold text-foreground italic">"{talent.title}"</p>
                    <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0"/> <strong>Available in:</strong> {talent.availability}</p>
                    <p className="flex items-start gap-2"><Home className="h-4 w-4 mt-0.5 shrink-0"/> <strong>From:</strong> {talent.residence}</p>
                    
                    {talent.requestedAllowances.length > 0 && (
                        <div className="pt-2">
                             <h4 className="font-semibold text-foreground text-xs mb-1">Requested Allowances:</h4>
                             <div className="flex flex-wrap gap-x-4 gap-y-1">
                                {talent.requestedAllowances.map(allowance => (
                                    <p key={allowance} className="flex items-center gap-1.5">
                                        {allowanceIcons[allowance as keyof typeof allowanceIcons]}
                                        <span>{allowance}</span>
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <Separator className="my-4"/>
                
                <div className="text-center mb-3">
                    <p className="text-xs text-muted-foreground">AI Estimated Rate</p>
                    <p className="text-xl font-bold text-primary">{talent.aiRate}</p>
                </div>
                
                <div className="mt-auto">
                     <Button 
                        className={cn("w-full font-bold", currentStatus.className)} 
                        variant={currentStatus.buttonVariant}
                        disabled={!!currentStatus.disabled}
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
                <span className="mx-4">Sonya is now available for hire as a Personal Assistant! 🛍️</span>
                <span className="mx-4">New Talent: Valerius, a 10-year veteran bodyguard, has joined the market.🛡️</span>
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                <span className="mx-4">Sonya is now available for hire as a Personal Assistant! 🛍️</span>
                <span className="mx-4">New Talent: Valerius, a 10-year veteran bodyguard, has joined the market.🛡️</span>
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
                    <CardDescription>Post your availability and skills to let hirers find you.</CardDescription>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                         {talents.filter(q => q.status !== 'available').map((talent, index) => (
                            <TalentCard key={index} talent={talent} />
                        ))}
                    </div>
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



