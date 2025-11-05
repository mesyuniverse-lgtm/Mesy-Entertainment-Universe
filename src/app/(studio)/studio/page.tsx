
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Video, Mic, Music, Wand2, Sparkles, Tv, Users, ShoppingBag, Baby, Heart, Shield, RadioTower, Settings, UserCircle, UsersRound, VideoIcon, Volume2, Monitor, Sun, Moon, Camera, CameraOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const streamDestinations = [
    { value: "socialive", label: "Socialive", icon: <RadioTower className="h-4 w-4" /> },
    { value: "members", label: "Member Zone", icon: <Shield className="h-4 w-4" /> },
    { value: "shopping", label: "Shopping Hub", icon: <ShoppingBag className="h-4 w-4" /> },
    { value: "entertainment", label: "Entertainment", icon: <Tv className="h-4 w-4" /> },
    { value: "music", label: "Music Channel", icon: <Music className="h-4 w-4" /> },
    { value: "tutorial", label: "Tutorial Channel", icon: <UsersRound className="h-4 w-4" /> },
    { value: "kids", label: "Kids Zone", icon: <Baby className="h-4 w-4" /> },
    { value: "pets", label: "Pets Channel", icon: <Heart className="h-4 w-4" /> },
    { value: "group", label: "Private Group", icon: <Users className="h-4 w-4" /> },
    { value: "private", label: "Private Room", icon: <UserCircle className="h-4 w-4" /> },
];

const audienceOptions = [
    { value: "general", label: "General Audience" },
    { value: "kids", label: "For Kids" },
    { value: "adults", label: "Mature (18+)" },
    { value: "women", label: "Women's Group" },
    { value: "men", label: "Men's Group" },
];

export default function StudioPage() {
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(true);

    const getCameraStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setMediaStream(stream);
            setHasCameraPermission(true);
            setIsCameraOn(true);
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            toast({
              variant: 'destructive',
              title: 'Camera Access Denied',
              description: 'Please enable camera permissions in your browser settings to use the studio.',
            });
          }
    }

    useEffect(() => {
        getCameraStream();

        return () => {
            mediaStream?.getTracks().forEach(track => track.stop());
        }
    }, []);

    const toggleCamera = () => {
        if (isCameraOn && mediaStream) {
            mediaStream.getVideoTracks().forEach(track => track.stop());
            setIsCameraOn(false);
        } else {
            getCameraStream();
        }
    };


    return (
        <div className="min-h-screen bg-background text-foreground p-4 lg:p-6">
            <header className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Live Studio</h1>
                <p className="text-muted-foreground">Prepare your stream and go live to the MESY Universe.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Main Content: Video Preview */}
                <main className="lg:col-span-8">
                    <Card className="h-full">
                        <CardContent className="p-2 h-full">
                            <AspectRatio ratio={16 / 9} className="bg-muted rounded-md h-full">
                                <div className="w-full h-full relative flex items-center justify-center">
                                     <video ref={videoRef} className="w-full h-full object-cover rounded-md" autoPlay muted playsInline />
                                     {!hasCameraPermission && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                            <VideoIcon className="h-16 w-16 text-muted-foreground mb-4" />
                                            <h3 className="text-xl font-semibold">Camera Not Found</h3>
                                            <p className="text-muted-foreground">Please grant camera and microphone permissions to begin.</p>
                                        </div>
                                     )}
                                     <div className="absolute bottom-4 left-4">
                                        <Button onClick={toggleCamera} size="icon" variant={isCameraOn ? "default" : "destructive"} className="rounded-full h-12 w-12">
                                            {isCameraOn ? <Camera className="h-6 w-6" /> : <CameraOff className="h-6 w-6" />}
                                        </Button>
                                    </div>
                                </div>
                            </AspectRatio>
                        </CardContent>
                    </Card>
                </main>

                {/* Right Sidebar: Controls */}
                <aside className="lg:col-span-4 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Stream Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div>
                                <Label htmlFor="stream-title">Stream Title</Label>
                                <Input id="stream-title" placeholder="e.g., My Awesome Live Stream" />
                            </div>
                            <div>
                                <Label htmlFor="stream-destination">Destination</Label>
                                <Select>
                                    <SelectTrigger id="stream-destination">
                                        <SelectValue placeholder="Select a channel..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {streamDestinations.map(dest => (
                                            <SelectItem key={dest.value} value={dest.value}>
                                                <div className="flex items-center gap-2">
                                                    {dest.icon}
                                                    <span>{dest.label}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                             <div>
                                <Label htmlFor="audience-select">Audience</Label>
                                <Select>
                                    <SelectTrigger id="audience-select">
                                        <SelectValue placeholder="Select target audience..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {audienceOptions.map(opt => (
                                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-3 gap-2">
                            <Button variant="outline" className="h-16 flex-col gap-1"><Sparkles /><span className="text-xs">Filters</span></Button>
                            <Button variant="outline" className="h-16 flex-col gap-1"><Wand2 /><span className="text-xs">Effects</span></Button>
                            <Button variant="outline" className="h-16 flex-col gap-1"><Monitor /><span className="text-xs">Background</span></Button>
                            <Button variant="outline" className="h-16 flex-col gap-1"><Sun /><span className="text-xs">Makeup</span></Button>
                            <Button variant="outline" className="h-16 flex-col gap-1"><Moon /><span className="text-xs">Outfit</span></Button>
                            <Button variant="outline" className="h-16 flex-col gap-1"><Settings /><span className="text-xs">Advanced</span></Button>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader><CardTitle>Audio Mixer</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2"><Mic /> Microphone Volume</Label>
                                <Slider defaultValue={[80]} max={100} step={1} />
                            </div>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2"><Music /> Music Volume</Label>
                                <Slider defaultValue={[20]} max={100} step={1} />
                            </div>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2"><Volume2 /> Voice Effects</Label>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="No Effect"/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="echo">Echo</SelectItem>
                                        <SelectItem value="reverb">Reverb</SelectItem>
                                        <SelectItem value="robot">Robot</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                    
                     <Button size="lg" className="w-full h-16 text-xl">
                        <RadioTower className="mr-2 h-6 w-6"/> Go Live
                    </Button>
                </aside>
            </div>
        </div>
    );
}
