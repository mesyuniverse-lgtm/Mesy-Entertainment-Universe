
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Search, Star, HandCoins, Users, MapPin, Briefcase, Filter, CheckCircle, Clock, Hourglass, CircleDollarSign, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";


const quests = [
    { 
        title: 'Personal Assistant for Shopping Spree', 
        hirer: 'Lord Valerius',
        hirerAvatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl,
        hirerType: 'Personal',
        location: 'Siam Paragon, Bangkok',
        price: '3,000 MC',
        allowances: ['Advance Payment', 'Food Allowance'],
        status: 'accept',
        image: PlaceHolderImages.find(i => i.id === 'shopping-preview')?.imageUrl,
    },
    { 
        title: 'Bodyguard for VIP Event', 
        hirer: 'Celestial Events',
        hirerAvatar: PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl,
        hirerType: 'Company',
        location: 'Pattaya',
        price: '5,000 MC',
        allowances: ['Travel Expenses', 'Accommodation', 'Food Allowance'],
        status: 'pending',
        image: 'https://picsum.photos/seed/vip-event/400/225',
    },
    { 
        title: 'Private Chef for a Week', 
        hirer: 'Lady Elara',
        hirerAvatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl,
        hirerType: 'Personal',
        location: 'Chiang Mai',
        price: '10,000 MC',
        allowances: ['Accommodation', 'Food Allowance'],
        status: 'approved',
        image: 'https://picsum.photos/seed/private-chef/400/225',
    },
    { 
        title: 'Complete Quest & Claim Payment', 
        hirer: 'Dragon Guild',
        hirerAvatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl,
        hirerType: 'Company',
        location: 'Remote (Online)',
        price: '1,500 MC',
        allowances: [],
        status: 'working',
        image: 'https://picsum.photos/seed/dragon-guild/400/225',
    },
     { 
        title: 'Payment Received for Translation Job', 
        hirer: 'Scholar\'s Guild',
        hirerAvatar: 'https://picsum.photos/seed/scholar-guild/100',
        hirerType: 'Company',
        location: 'Remote (Online)',
        price: '500 MC',
        allowances: [],
        status: 'paid',
        image: 'https://picsum.photos/seed/translation-job/400/225',
    },
];

const statusConfig = {
    accept: { text: "Accept Quest", variant: "destructive" as "destructive", icon: <HandCoins/> },
    pending: { text: "Pending Approval", variant: "warning" as "default", icon: <Hourglass/> },
    approved: { text: "Approved", variant: "success" as "default", icon: <CheckCircle/> },
    working: { text: "Mark as Complete & Get Paid", variant: "default" as "default", icon: <CircleDollarSign/> },
    paid: { text: "Payment Received", variant: "violet" as "default", icon: <CheckCircle2/> }
};

const QuestCard = ({ quest }: { quest: typeof quests[0] }) => {
    const currentStatus = statusConfig[quest.status as keyof typeof statusConfig];
    
    return (
        <Card className="overflow-hidden bg-card/60 border-border/50 hover:border-primary/50 transition-all shadow-lg flex flex-col">
            <div className="relative aspect-video">
                <Image src={quest.image} alt={quest.title} fill objectFit="cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute top-2 right-2">
                    <Badge className="bg-primary/80 backdrop-blur-sm">{quest.price}</Badge>
                </div>
                 <div className="absolute bottom-2 left-4 text-white">
                    <CardTitle className="text-lg leading-tight" style={{textShadow: '1px 1px 3px #000'}}>{quest.title}</CardTitle>
                </div>
            </div>
            <CardContent className="p-4 flex-grow flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={quest.hirerAvatar} />
                        <AvatarFallback>{quest.hirer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{quest.hirer}</p>
                        <p className="text-xs text-muted-foreground">{quest.hirerType}</p>
                    </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground flex-grow">
                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {quest.location}</p>
                    {quest.allowances.length > 0 && (
                        <div>
                             <p className="font-medium text-foreground/80">Allowances:</p>
                             <ul className="list-disc list-inside pl-2">
                                {quest.allowances.map(allowance => <li key={allowance}>{allowance}</li>)}
                             </ul>
                        </div>
                    )}
                </div>
                
                <div className="mt-4">
                     <Button 
                        className={cn(
                            "w-full font-bold",
                            currentStatus.variant === 'warning' && 'bg-yellow-500 hover:bg-yellow-600 text-black',
                            currentStatus.variant === 'success' && 'bg-green-500 hover:bg-green-600 text-white',
                            currentStatus.variant === 'violet' && 'bg-violet-600 hover:bg-violet-700 text-white',
                        )} 
                        variant={currentStatus.variant}
                    >
                        {currentStatus.icon}
                        {currentStatus.text}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default function FindQuestPage() {
  return (
    <div className="container py-12">
      <header className="text-center mb-12">
        <div className="flex justify-center gap-4 mb-4">
            <Search className="w-10 h-10 text-primary" />
            <Briefcase className="w-10 h-10 text-primary" />
            <Star className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Find a Quest</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Offer your skills and find part-time work. Browse through quests posted by other members and start earning.
        </p>
      </header>

      <div className="flex gap-2 mb-8">
        <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search quests by title, skill, or location..." className="pl-10 h-12 text-base" />
        </div>
        <Button variant="outline" size="lg"><Filter className="mr-2"/> Filters</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quests.map((quest, index) => (
            <QuestCard key={index} quest={quest} />
        ))}
      </div>
       <div className="text-center mt-12">
        <Button variant="outline" size="lg">Load More Quests</Button>
      </div>
    </div>
  );
}

