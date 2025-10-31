
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PlusCircle, Search, Star, HandCoins, Users, MapPin, BadgeCent, CheckCircle2, Clock, FileText, Send, XCircle, Sparkles, Clapperboard, Music, Video, Mic, Palette, Drama, Brush, Film } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const jobQuests = [
    {
        title: 'Graphic Designer for Guild Logo',
        postedBy: 'The Golden Neko Cafe',
        avatar: PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl,
        budget: '800 MC',
        location: 'Remote',
        applicants: 12,
        status: 'Open'
    },
    {
        title: 'Seeking Dancers for Music Video',
        postedBy: 'Starlight Productions',
        avatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl,
        budget: 'Project-based',
        location: 'Pattaya',
        applicants: 5,
        status: 'Open'
    },
     {
        title: 'DJ for New Year\'s Eve Countdown Party',
        postedBy: 'Skyfall Rooftop Bar',
        avatar: PlaceHolderImages.find(i => i.id === 'fantasy-landscape-1')?.imageUrl,
        budget: '5,000 MC',
        location: 'Bangkok',
        applicants: 28,
        status: 'Closed'
    }
];

const selectedQuest = jobQuests[0];

const applicantStatuses = {
    notApplied: {
        text: 'Submit Your Portfolio',
        buttonVariant: 'default' as 'default',
        icon: <Send className="mr-2 h-4 w-4"/>,
        alert: null
    },
    pending: {
        text: 'Application Sent - Pending Review',
        buttonVariant: 'secondary' as 'secondary',
        icon: <Clock className="mr-2 h-4 w-4"/>,
        alert: <Alert variant="default" className="mt-4 bg-blue-500/10 border-blue-500/30">
                <AlertTitle className="text-blue-400">Application Submitted</AlertTitle>
                <AlertDescription>Your portfolio has been sent to the client. You will be notified once a decision has been made.</AlertDescription>
            </Alert>
    },
    approved: {
        text: 'Approved - Contact Client',
        buttonVariant: 'default' as 'default',
        icon: <CheckCircle2 className="mr-2 h-4 w-4"/>,
        alert: <Alert variant="default" className="mt-4 bg-green-500/10 border-green-500/30">
                <AlertTitle className="text-green-400">Congratulations!</AlertTitle>
                <AlertDescription>You have been selected for this project. Please contact the client to discuss the final details.</AlertDescription>
            </Alert>
    },
    rejected: {
        text: 'Position Filled',
        buttonVariant: 'destructive' as 'destructive',
        icon: <XCircle className="mr-2 h-4 w-4"/>,
        alert: <Alert variant="destructive" className="mt-4">
                <AlertTitle>Position Filled</AlertTitle>
                <AlertDescription>Thank you for your interest. The client has selected another creator. We encourage you to apply for other opportunities!</AlertDescription>
            </Alert>
    }
};

const categories = [
    { name: 'Performing Arts', icon: <Drama className="h-5 w-5 text-red-400"/>, sub: 'Actors, Dancers' },
    { name: 'Music & Audio', icon: <Music className="h-5 w-5 text-blue-400"/>, sub: 'Singers, DJs, Producers' },
    { name: 'Visual Arts', icon: <Brush className="h-5 w-5 text-yellow-400"/>, sub: 'Painters, Illustrators' },
    { name: 'Film & Video', icon: <Film className="h-5 w-5 text-purple-400"/>, sub: 'Directors, Editors' },
    { name: 'Design', icon: <Palette className="h-5 w-5 text-green-400"/>, sub: 'Graphic, 3D Modeler' },
];

// You can change this to test different states
const currentApplicantStatus = applicantStatuses.notApplied;


export default function PostJobPage() {
    
    return (
    <div className="min-h-screen bg-background/90 text-foreground p-4 lg:p-6">
        <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 text-sm mb-6">
            <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                <span className="mx-4">Need a project done? Hire top-tier talent from the MESY Freelance Market! 🧑‍💻</span>
                <span className="mx-4">Top artist 'Elara' is now available for custom 3D model commissions. ✨</span>
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                <span className="mx-4">Need a project done? Hire top-tier talent from the MESY Freelance Market! 🧑‍💻</span>
                <span className="mx-4">Top artist 'Elara' is now available for custom 3D model commissions. ✨</span>
            </div>
        </div>
        <style jsx>{`
            @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
            @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
            .animate-marquee { animation: marquee 30s linear infinite; }
            .animate-marquee2 { animation: marquee2 30s linear infinite; }
        `}</style>
        
        <Tabs defaultValue="talent-hub" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto">
                <TabsTrigger value="showcase" asChild><Link href="/entertainment/showcase"><Sparkles className="h-4 w-4 mr-1"/>Showcase</Link></TabsTrigger>
                <TabsTrigger value="live" asChild><Link href="/entertainment/artists/live-performance"><Mic className="h-4 w-4 mr-1"/>Live performance</Link></TabsTrigger>
                <TabsTrigger value="artists" asChild><Link href="/entertainment/artists"><Users className="h-4 w-4 mr-1"/> Artists</Link></TabsTrigger>
                <TabsTrigger value="songs" asChild><Link href="/entertainment/songs"><Music className="h-4 w-4 mr-1"/> Songs</Link></TabsTrigger>
                <TabsTrigger value="videos" asChild><Link href="/entertainment/videos"><Video className="h-4 w-4 mr-1"/> Videos</Link></TabsTrigger>
                <TabsTrigger value="talent-hub" asChild><Link href="/entertainment/artists/talent-hub"><Star className="h-4 w-4 mr-1"/> Talent Hub</Link></TabsTrigger>
            </TabsList>
            <TabsContent value="talent-hub" className="mt-6">
                <div className="container mx-auto">
                    <header className="text-center mb-12">
                        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                            <Search className="w-12 h-12 text-primary"/>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Post a Job & Find Talent</h1>
                        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                            Post job quests to find the perfect person for your event, project, or personal needs.
                        </p>
                        <Button size="lg" className="mt-6">
                            <PlusCircle className="mr-2 h-5 w-5"/> Create a New Job Quest
                            <Badge variant="secondary" className="ml-3">Members Only</Badge>
                        </Button>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Left: Quest List */}
                        <aside className="lg:col-span-4 space-y-4">
                             <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="Search talent by skills, genres..." className="pl-10" />
                            </div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Categories</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {categories.map((cat, index) => (
                                        <Button key={index} variant="ghost" className="w-full justify-start h-auto">
                                            <div className="p-2 bg-secondary rounded-md mr-3">{cat.icon}</div>
                                            <div>
                                                <p className="font-semibold text-base text-left">{cat.name}</p>
                                                <p className="text-xs text-muted-foreground text-left">{cat.sub}</p>
                                            </div>
                                        </Button>
                                    ))}
                                </CardContent>
                            </Card>
                            {jobQuests.map((quest, index) => (
                                <Card key={index} className="bg-card/50 hover:bg-card/80 transition-colors cursor-pointer border-2 border-transparent hover:border-primary/50">
                                    <CardContent className="p-4 flex gap-4">
                                        <Avatar className="h-12 w-12 hidden sm:block">
                                            <AvatarImage src={quest.avatar} />
                                            <AvatarFallback>{quest.postedBy.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-grow">
                                            <p className="font-bold">{quest.title}</p>
                                            <p className="text-sm text-muted-foreground">{quest.postedBy}</p>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                                                <span className="flex items-center gap-1"><MapPin className="h-3 w-3"/>{quest.location}</span>
                                                <span className="flex items-center gap-1"><Users className="h-3 w-3"/>{quest.applicants} applicants</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </aside>

                        {/* Right: Quest Details */}
                        <main className="lg:col-span-8">
                            <Card>
                                <CardHeader>
                                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                                        <div>
                                            <CardTitle className="text-2xl">{selectedQuest.title}</CardTitle>
                                            <CardDescription className="flex items-center gap-2 mt-1">
                                                Posted by 
                                                <Avatar className="h-6 w-6"><AvatarImage src={selectedQuest.avatar} /></Avatar>
                                                {selectedQuest.postedBy}
                                            </CardDescription>
                                        </div>
                                        <div className="text-left sm:text-right shrink-0">
                                            <p className="text-sm text-muted-foreground">Budget</p>
                                            <p className="text-2xl font-bold text-primary">{selectedQuest.budget}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <Separator />
                                <CardContent className="p-6 grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg">Project Details</h3>
                                        <p className="text-muted-foreground">We're opening a new fantasy-themed cafe and need a unique, charming logo. We're looking for a design that is modern yet captures a sense of magic and coziness. The main element should be a "Golden Neko" (lucky cat).</p>
                                        <div className="space-y-2">
                                            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary"/> <strong>Location:</strong> {selectedQuest.location}</p>
                                            <p className="flex items-center gap-2"><BadgeCent className="h-4 w-4 text-primary"/> <strong>Compensation:</strong> {selectedQuest.budget}</p>
                                            <p className="flex items-center gap-2"><Palette className="h-4 w-4 text-primary"/> <strong>Category:</strong> Graphic Design</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg">Requirements</h3>
                                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                            <li>Proven experience in logo design & branding.</li>
                                            <li>Portfolio showcasing relevant styles.</li>
                                            <li>Ability to provide files in vector format (AI, SVG).</li>
                                            <li>Good communication and ability to iterate on feedback.</li>
                                        </ul>

                                        <h3 className="font-semibold text-lg pt-4">How to Apply</h3>
                                        <p className="text-muted-foreground">Please submit your MESY Profile along with a link to your online portfolio (e.g., Behance, Dribbble, ArtStation). We will review all applications and contact selected artists.</p>
                                    </div>
                                </CardContent>
                                <Separator />
                                <CardContent className="p-6">
                                    <Button size="lg" className="w-full" variant={currentApplicantStatus.buttonVariant} disabled={currentApplicantStatus.buttonVariant !== 'default'}>
                                        {currentApplicantStatus.icon}
                                        {currentApplicantStatus.text}
                                    </Button>
                                    {currentApplicantStatus.alert}
                                </CardContent>
                            </Card>
                        </main>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    </div>
    );
}
