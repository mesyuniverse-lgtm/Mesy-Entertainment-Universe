'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Video, Mic, Music, Wand2, Sparkles, Tv, Users, ShoppingBag, Baby, Heart, Shield, RadioTower, Settings, UserCircle, UsersRound, VideoIcon, Volume2, Monitor, Sun, Moon, Camera, CameraOff, Circle, Check, Trash2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(true);

    const [recordingLimit, setRecordingLimit] = useState(10);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordedMedia, setRecordedMedia] = useState<{ url: string, type: 'image' | 'video' } | null>(null);
    
    const getCameraStream = useCallback(async () => {
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
    }, [toast]);

    useEffect(() => {
        getCameraStream();
        return () => {
            mediaStream?.getTracks().forEach(track => track.stop());
        }
    }, [getCameraStream]);

    const toggleCamera = () => {
        if (isCameraOn && mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            setIsCameraOn(false);
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        } else {
            getCameraStream();
        }
    };
    
    const handleStartRecording = () => {
        if (!mediaStream) {
            toast({ variant: 'destructive', title: 'Media stream not available' });
            return;
        }

        setIsRecording(true);
        setRecordingTime(0);
        const recordedChunks: Blob[] = [];
        mediaRecorderRef.current = new MediaRecorder(mediaStream, { mimeType: 'video/webm' });

        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            setRecordedMedia({ url, type: 'video' });
            setIsRecording(false);
        };

        mediaRecorderRef.current.start();
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording) {
            interval = setInterval(() => {
                setRecordingTime(prev => {
                    const newTime = prev + 1;
                    if (newTime >= recordingLimit) {
                        mediaRecorderRef.current?.stop();
                        clearInterval(interval);
                    }
                    return newTime;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRecording, recordingLimit]);
    
     const handleSnapshot = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg');
                setRecordedMedia({ url: dataUrl, type: 'image' });
            }
        }
    };

    const handleDiscard = () => {
        if (recordedMedia) {
            URL.revokeObjectURL(recordedMedia.url);
            setRecordedMedia(null);
        }
    };
    
    const handlePost = () => {
        toast({
            title: "Post Submitted (Mock)",
            description: "Your content would be uploaded and posted now."
        });
        handleDiscard();
    }
    
    const recordingDurations = [10, 15, 30, 60];

    return (
        <div className="min-h-screen bg-background text-foreground p-4 lg:p-6">
            <header className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Live Studio</h1>
                <p className="text-muted-foreground">Prepare your stream and go live to the MESY Universe.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                <main className="lg:col-span-8">
                    <Card className="h-full">
                        <CardContent className="p-2 h-full">
                            <AspectRatio ratio={16 / 9} className="bg-muted rounded-md h-full">
                                <div className="w-full h-full relative flex items-center justify-center">
                                    {recordedMedia ? (
                                        <>
                                            {recordedMedia.type === 'image' ? (
                                                <Image src={recordedMedia.url} alt="Captured Snapshot" layout="fill" objectFit="contain" />
                                            ) : (
                                                <video src={recordedMedia.url} className="w-full h-full object-contain" controls autoPlay loop />
                                            )}
                                            <div className="absolute top-4 right-4 flex flex-col gap-2">
                                                <Button onClick={handlePost}><Upload className="mr-2 h-4 w-4"/>Post</Button>
                                                <Button onClick={handleDiscard} variant="destructive"><Trash2 className="mr-2 h-4 w-4"/>Discard</Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <video ref={videoRef} className="w-full h-full object-cover rounded-md" autoPlay muted playsInline />
                                            {!hasCameraPermission && (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                                    <VideoIcon className="h-16 w-16 text-muted-foreground mb-4" />
                                                    <h3 className="text-xl font-semibold">Camera Not Found</h3>
                                                    <p className="text-muted-foreground">Please grant camera and microphone permissions to begin.</p>
                                                </div>
                                            )}
                                            <div className="absolute bottom-4 left-4 flex gap-2">
                                                <Button onClick={toggleCamera} size="icon" variant={isCameraOn ? "default" : "destructive"} className="rounded-full h-12 w-12">
                                                    {isCameraOn ? <Camera className="h-6 w-6" /> : <CameraOff className="h-6 w-6" />}
                                                </Button>
                                                 <Button onClick={handleSnapshot} size="icon" variant="outline" className="rounded-full h-12 w-12" disabled={!isCameraOn || isRecording}>
                                                    <Camera className="h-6 w-6" />
                                                </Button>
                                            </div>
                                            <div className="absolute bottom-4 right-4 flex items-center gap-2">
                                                {recordingDurations.map(dur => (
                                                    <Button key={dur} variant={recordingLimit === dur ? 'default' : 'secondary'} size="sm" onClick={() => setRecordingLimit(dur)} disabled={isRecording}>
                                                        {dur}s
                                                    </Button>
                                                ))}
                                                <Button onClick={handleStartRecording} size="icon" variant="destructive" className="rounded-full h-14 w-14" disabled={!isCameraOn || isRecording}>
                                                    <Circle className="h-6 w-6 fill-white"/>
                                                </Button>
                                            </div>
                                             {isRecording && (
                                                <div className="absolute top-4 right-4 flex items-center gap-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-md">
                                                    <Circle className="h-3 w-3 fill-current animate-pulse"/>
                                                    <span>REC {recordingTime}s / {recordingLimit}s</span>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </AspectRatio>
                        </CardContent>
                    </Card>
                </main>

                <aside className="lg:col-span-4 space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Stream Information</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                             <div><Label htmlFor="stream-title">Stream Title</Label><Input id="stream-title" placeholder="e.g., My Awesome Live Stream" /></div>
                             <div><Label htmlFor="stream-destination">Destination</Label>
                                <Select><SelectTrigger id="stream-destination"><SelectValue placeholder="Select a channel..." /></SelectTrigger>
                                    <SelectContent>{streamDestinations.map(dest => (<SelectItem key={dest.value} value={dest.value}><div className="flex items-center gap-2">{dest.icon}<span>{dest.label}</span></div></SelectItem>))}</SelectContent>
                                </Select>
                            </div>
                             <div><Label htmlFor="audience-select">Audience</Label>
                                <Select><SelectTrigger id="audience-select"><SelectValue placeholder="Select target audience..." /></SelectTrigger>
                                    <SelectContent>{audienceOptions.map(opt => (<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>))}</SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card><CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-3 gap-2">
                            <Button variant="outline" className="h-16 flex-col gap-1"><Sparkles /><span className="text-xs">Filters</span></Button>
                            <Button variant="outline" className="h-16 flex-col gap-1"><Wand2 /><span className="text-xs">Effects</span></Button>
                            <Button variant="outline" className="h-16 flex-col gap-1"><Monitor /><span className="text-xs">Background</span></Button>
                            <Button variant="outline" className="h-16 flex-col gap-1"><Sun /><span className="text-xs">Makeup</span></Button>
                            <Button variant="outline" className="h-16 flex-col gap-1"><Moon /><span className="text-xs">Outfit</span></Button>
                            <Button variant="outline" className="h-16 flex-col gap-1"><Settings /><span className="text-xs">Advanced</span></Button>
                        </CardContent>
                    </Card>
                    
                    <Card><CardHeader><CardTitle>Audio Mixer</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2"><Label className="flex items-center gap-2"><Mic /> Microphone Volume</Label><Slider defaultValue={[80]} max={100} step={1} /></div>
                            <div className="space-y-2"><Label className="flex items-center gap-2"><Music /> Music Volume</Label><Slider defaultValue={[20]} max={100} step={1} /></div>
                            <div className="space-y-2"><Label className="flex items-center gap-2"><Volume2 /> Voice Effects</Label>
                                <Select><SelectTrigger><SelectValue placeholder="No Effect"/></SelectTrigger><SelectContent><SelectItem value="echo">Echo</SelectItem><SelectItem value="reverb">Reverb</SelectItem><SelectItem value="robot">Robot</SelectItem></SelectContent></Select>
                            </div>
                        </CardContent>
                    </Card>
                    
                     <Button size="lg" className="w-full h-16 text-xl"><RadioTower className="mr-2 h-6 w-6"/> Go Live</Button>
                </aside>
            </div>
        </div>
    );
}