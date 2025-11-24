'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Music,
  PlusCircle,
  Users,
  Search,
  Lock,
  Globe,
  Settings2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Share2,
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const activeRooms = [
    { name: "Lyra's Lo-fi Beats", participants: 12, isPrivate: false, coverId: 'explorer-1' },
    { name: "Kael's Rock Ballads", participants: 8, isPrivate: false, coverId: 'knight-1' },
    { name: "Zephyr's Synthwave", participants: 5, isPrivate: true, coverId: 'fighter-character' },
    { name: "Aetheria's Acoustic", participants: 23, isPrivate: false, coverId: 'female-archer-1' },
]

export default function KaraokeHubPage() {
  const { toast } = useToast();
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

   useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(mediaStream);
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
            variant: "destructive",
            title: "Camera Access Denied",
            description: "Please enable camera and microphone permissions to use this feature.",
        });
      }
    };
    getCameraPermission();

    return () => {
      // Clean up stream when component unmounts
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, []);

  const handleCreateRoom = () => {
     toast({
        title: "Room Created!",
        description: "Your new karaoke room is live.",
      });
  }

  const toggleMic = () => {
    if (stream) {
        stream.getAudioTracks().forEach(track => {
            track.enabled = !isMicOn;
        });
        setIsMicOn(!isMicOn);
    }
  }

  const toggleVideo = () => {
    if (stream) {
        stream.getVideoTracks().forEach(track => {
            track.enabled = !isVideoOn;
        });
        setIsVideoOn(!isVideoOn);
    }
  }

  return (
    <div className="min-h-screen container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-widest text-primary uppercase" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}>
          Karaoke Hub
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Sing your heart out. Create a room, invite your friends, and share your voice with the universe.
        </p>
      </header>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search for rooms or friends..." className="pl-10 h-11 text-base md:w-80" />
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" className="h-11 text-base">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Room
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Create a New Karaoke Room</DialogTitle>
                <DialogDescription>
                    Set up your room and start singing. Choose who can join and what you'll be singing.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="room-name" className="text-right">
                        Room Name
                        </Label>
                        <Input id="room-name" placeholder="My Awesome Karaoke Room" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                         <Label className="text-right col-span-1">Visibility</Label>
                         <RadioGroup defaultValue="public" className="col-span-3 flex gap-4">
                            <Label className="flex items-center gap-2 p-2 border rounded-md flex-1 justify-center cursor-pointer has-[:checked]:bg-secondary has-[:checked]:border-primary">
                                <RadioGroupItem value="public" id="public" />
                                <Globe className='w-4 h-4 mr-1' /> Public
                            </Label>
                            <Label className="flex items-center gap-2 p-2 border rounded-md flex-1 justify-center cursor-pointer has-[:checked]:bg-secondary has-[:checked]:border-primary">
                                <RadioGroupItem value="private" id="private" />
                                <Lock className='w-4 h-4 mr-1' /> Private
                            </Label>
                         </RadioGroup>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleCreateRoom} className='w-full'>Create and Start Singing</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeRooms.map(room => {
            const cover = PlaceHolderImages.find(p => p.id === room.coverId);
            return (
                 <Card key={room.name} className="group bg-card/50 border-border/50 overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-primary/10 hover:border-primary/40">
                    <CardHeader className="p-0 relative">
                        <div className="aspect-video relative">
                            {cover && <Image src={cover.imageUrl} alt={room.name} fill className="object-cover transition-transform group-hover:scale-105"/>}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute top-2 right-2 flex gap-2">
                                {room.isPrivate && <Lock className="w-4 h-4 text-white" />}
                                <div className="flex items-center gap-1 text-white text-xs bg-black/50 px-2 py-1 rounded-full">
                                    <Users className="w-3 h-3" /> {room.participants}
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-3">
                        <p className="font-bold truncate">{room.name}</p>
                        <Button variant="secondary" className="w-full mt-2 h-9">Join Room</Button>
                    </CardContent>
                </Card>
            )
        })}
       </div>

      {/* Karaoke Studio UI */}
      <Card className="bg-card/70 backdrop-blur-sm border-primary/20 shadow-xl mt-8">
        <CardHeader>
            <CardTitle>Karaoke Live Studio</CardTitle>
            <CardDescription>This is your stage. Adjust your settings and get ready to perform.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 relative aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
                 <video ref={videoRef} className={cn("w-full h-full object-cover transition-opacity", isVideoOn ? "opacity-100" : "opacity-0")} autoPlay muted playsInline />
                 {!isVideoOn && (
                    <div className="absolute flex flex-col items-center text-muted-foreground">
                        <VideoOff className="w-16 h-16"/>
                        <p>Camera is off</p>
                    </div>
                 )}
                {!hasCameraPermission && (
                    <Alert variant="destructive" className="absolute w-auto m-4">
                        <AlertTitle>Camera Access Required</AlertTitle>
                        <AlertDescription>
                        Please allow camera and microphone access to use this feature.
                        </AlertDescription>
                    </Alert>
                )}
                 <div className="absolute top-4 left-4 flex gap-2">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                     <Avatar>
                        <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                        <AvatarFallback>F</AvatarFallback>
                    </Avatar>
                </div>
                <div className="absolute bottom-4 inset-x-4 flex justify-center items-center gap-3">
                    <Button variant="secondary" size="icon" className="rounded-full h-12 w-12" onClick={toggleMic}>
                        {isMicOn ? <Mic /> : <MicOff className="text-red-500" />}
                    </Button>
                     <Button variant="secondary" size="icon" className="rounded-full h-12 w-12" onClick={toggleVideo}>
                        {isVideoOn ? <Video /> : <VideoOff className="text-red-500" />}
                    </Button>
                     <Button variant="destructive" size="lg" className="rounded-full h-12 px-6">End Live</Button>
                     <Button variant="secondary" size="icon" className="rounded-full h-12 w-12"><Music /></Button>
                     <Button variant="secondary" size="icon" className="rounded-full h-12 w-12"><Share2 /></Button>
                </div>
            </div>
            <div className="lg:col-span-1">
                <Tabs defaultValue="audio" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="audio"><Settings2 className="mr-2 h-4 w-4"/> Audio Effects</TabsTrigger>
                        <TabsTrigger value="video"><Sparkles className="mr-2 h-4 w-4"/> Video Filters</TabsTrigger>
                    </TabsList>
                    <TabsContent value="audio" className="p-4 bg-secondary/30 rounded-b-md">
                       <div className="space-y-6">
                            <div>
                                <Label>Reverb</Label>
                                <Slider defaultValue={[30]} max={100} step={1} />
                            </div>
                             <div>
                                <Label>Echo</Label>
                                <Slider defaultValue={[10]} max={100} step={1} />
                            </div>
                             <div>
                                <Label>Pitch Correction (Auto-Tune)</Label>
                                <Slider defaultValue={[50]} max={100} step={1} />
                            </div>
                       </div>
                    </TabsContent>
                    <TabsContent value="video" className="p-4 bg-secondary/30 rounded-b-md">
                        <div className="grid grid-cols-3 gap-2">
                            {['None', 'Starlight', 'Retro', 'Bloom', 'Noir', 'Dreamy'].map(filter => (
                                <div key={filter} className={cn(
                                    "aspect-square rounded-md flex items-center justify-center text-xs font-semibold cursor-pointer border-2 border-transparent",
                                    filter === 'Starlight' ? 'bg-indigo-500 text-white border-primary' : 'bg-gray-600'
                                    )}>
                                    {filter}
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
