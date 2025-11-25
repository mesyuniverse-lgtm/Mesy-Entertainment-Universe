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
  ShieldCheck,
  Building,
  User,
  DollarSign
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const sampleQuests = [
    {
        title: 'Personal Assistant for Event',
        type: 'Personal',
        budget: '$500',
        description: 'Need a reliable assistant for a 3-day virtual conference. Must be organized and proactive.',
        tags: ['Organization', 'Communication'],
    },
    {
        title: 'Bodyguard for VIP Transport',
        type: 'Company',
        budget: '$1,200',
        description: 'Seeking a certified security professional to escort a high-profile client.',
        tags: ['Security', 'Close Protection'],
    },
    {
        title: 'Private Chef for a Week',
        type: 'Personal',
        budget: '$800',
        description: 'Looking for a chef specializing in healthy, gourmet meals for a family.',
        tags: ['Cooking', 'Nutrition'],
    },
    {
        title: 'Community Moderator',
        type: 'Company',
        budget: 'Long-term',
        description: 'MESY Corp is hiring moderators for our official community forums. Requires experience.',
        tags: ['Moderation', 'Community Management'],
    }
]

export default function PostQuestPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-widest text-primary uppercase" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}>
          Post a Quest
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Hire trusted members of the MESY community for personal services and events.
        </p>
      </header>

      <Alert className="mb-8 border-yellow-500/50 text-yellow-200 bg-yellow-900/20">
        <ShieldCheck className="h-4 w-4 !text-yellow-400" />
        <AlertTitle>Safety First!</AlertTitle>
        <AlertDescription>
          To ensure the safety of both parties, only members who have completed identity verification can post or accept quests.
        </AlertDescription>
      </Alert>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        <div className="relative w-full md:w-auto md:flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search quests by title, skill, or category..." className="pl-10 h-11 text-base" />
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" className="h-11 text-base w-full md:w-auto">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create New Quest
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Create a New Quest</DialogTitle>
                    <DialogDescription>
                        Describe the job you need done. Your post will be visible to verified members looking for opportunities.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quest-title" className="text-right">Title</Label>
                        <Input id="quest-title" placeholder="e.g., Private Chef for a Week" className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="quest-description" className="text-right pt-2">Description</Label>
                        <Textarea id="quest-description" placeholder="Provide a detailed description of the tasks, requirements, and expectations." className="col-span-3 min-h-[100px]" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Job Type</Label>
                         <RadioGroup defaultValue="personal" className="col-span-3 flex gap-4">
                            <Label className="flex items-center gap-2 p-3 border rounded-md flex-1 justify-center cursor-pointer has-[:checked]:bg-secondary has-[:checked]:border-primary">
                                <RadioGroupItem value="personal" id="personal" />
                                <User className="w-4 h-4 mr-1" /> Personal
                            </Label>
                            <Label className="flex items-center gap-2 p-3 border rounded-md flex-1 justify-center cursor-pointer has-[:checked]:bg-secondary has-[:checked]:border-primary">
                                <RadioGroupItem value="company" id="company" />
                                <Building className="w-4 h-4 mr-1" /> Company
                            </Label>
                         </RadioGroup>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quest-budget" className="text-right">Budget (USD)</Label>
                        <Input id="quest-budget" type="number" placeholder="e.g., 500" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quest-tags" className="text-right">Tags / Skills</Label>
                        <Input id="quest-tags" placeholder="e.g., Cooking, Security, Communication" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="w-full sm:w-auto" size="lg">Post Quest</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleQuests.map((quest, index) => (
                <Card key={index} className="bg-card/50 border-border/50 hover:border-primary/40 transition-all duration-300">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle>{quest.title}</CardTitle>
                            <Badge variant={quest.type === 'Company' ? 'secondary' : 'outline'}>{quest.type}</Badge>
                        </div>
                        <CardDescription className="flex items-center gap-2 pt-1">
                            <DollarSign className='w-4 h-4 text-green-400' />
                            Budget: <span className="font-semibold text-foreground">{quest.budget}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{quest.description}</p>
                        <div className="flex gap-2">
                            {quest.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                        </div>
                    </CardContent>
                </Card>
            ))}
       </div>

    </div>
  );
}
