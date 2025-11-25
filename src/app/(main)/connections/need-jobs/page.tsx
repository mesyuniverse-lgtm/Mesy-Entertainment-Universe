
'use client';

import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Briefcase,
  PlusCircle,
  Search,
  Star,
  User,
  DollarSign,
  GraduationCap,
  Award,
  Sparkles
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const sampleTalents = [
    {
        name: 'Aetheria',
        title: 'Vocalist & Music Composer',
        rate: '$75/hr',
        skills: ['Singing', 'Songwriting', 'Piano'],
        avatarId: 'female-warrior-1',
        rating: 5,
    },
    {
        name: 'Zephyr',
        title: '3D Artist & VFX Specialist',
        rate: '$90/hr',
        skills: ['Blender', 'After Effects', 'Unreal Engine'],
        avatarId: 'fighter-character',
        rating: 5,
    },
    {
        name: 'Lyra',
        title: 'Community Manager & Event Organizer',
        rate: '$50/hr',
        skills: ['Moderation', 'Event Planning', 'Social Media'],
        avatarId: 'female-archer-1',
        rating: 4,
    },
    {
        name: 'Kael',
        title: 'Security Consultant & Bodyguard',
        rate: '$120/hr',
        skills: ['Close Protection', 'Risk Assessment'],
        avatarId: 'knight-1',
        rating: 5,
    }
]

export default function NeedJobsPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-widest text-primary uppercase" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}>
          Talent Marketplace
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Offer your skills, find your next gig, and grow your career within the MESY Universe.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        <div className="relative w-full md:w-auto md:flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search for talent by skill (e.g., '3D Artist', 'Vocalist')..." className="pl-10 h-11 text-base" />
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" className="h-11 text-base w-full md:w-auto">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Your Talent Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Showcase Your Skills</DialogTitle>
                    <DialogDescription>
                        Create your profile to let others find and hire you for quests.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="talent-title" className="text-right">Profile Title</Label>
                        <Input id="talent-title" placeholder="e.g., 'Vocalist & Music Composer'" className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2 flex flex-col items-end gap-1">
                            <span>Abilities / Expertise</span>
                            <span className='font-normal text-muted-foreground text-xs'>(จุดแข็งเฉพาะด้าน)</span>
                        </Label>
                        <Textarea id="talent-expertise" placeholder="Describe your unique strengths and what makes you the right person for the job." className="col-span-3 min-h-[100px]" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="talent-skills" className="text-right">Skills / Competencies</Label>
                        <Input id="talent-skills" placeholder="Enter skills, separated by commas (e.g., Singing, Piano)" className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2 flex flex-col items-end gap-1">
                           <span>Qualifications</span>
                           <span className='font-normal text-muted-foreground text-xs'>(วุฒิการศึกษา/ใบรับรอง)</span>
                        </Label>
                        <Textarea id="talent-qualifications" placeholder="List your degrees, certifications, or relevant formal qualifications." className="col-span-3 min-h-[80px]" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="talent-rate" className="text-right">Expected Rate</Label>
                        <div className="col-span-3 relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input id="talent-rate" type="number" placeholder="e.g., 75" className="pl-10" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">/ hour (USD)</span>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="w-full sm:w-auto" size="lg">Publish Profile</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleTalents.map((talent, index) => {
                const avatar = PlaceHolderImages.find(p => p.id === talent.avatarId);
                return (
                    <Card key={index} className="bg-card/50 border-border/50 hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-1 group">
                        <CardHeader className="items-center text-center">
                            <Avatar className="w-24 h-24 mb-4 border-4 border-secondary group-hover:border-primary/50 transition-colors">
                                <AvatarImage src={avatar?.imageUrl} alt={talent.name} />
                                <AvatarFallback>{talent.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <CardTitle>{talent.name}</CardTitle>
                            <CardDescription className="text-primary font-semibold">{talent.title}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-center items-center gap-1 mb-4 text-yellow-400">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={cn("w-5 h-5", i < talent.rating ? 'fill-current' : 'fill-muted stroke-muted-foreground')} />
                                ))}
                            </div>
                            <div className="flex justify-center gap-2 flex-wrap mb-4">
                                {talent.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                            </div>
                            <div className="text-center text-lg font-bold">
                                {talent.rate}
                            </div>
                            <Button variant="outline" className="w-full mt-4">View Profile</Button>
                        </CardContent>
                    </Card>
                )
            })}
       </div>

    </div>
  );
}
