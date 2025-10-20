
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Radio, Video, Mic, MicOff, VideoOff, Settings, Sparkles, Palette, Type, Music, Users, Lock, Globe, ShoppingBasket, PlusCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Separator } from '@/components/ui/separator';

export default function LiveStudioPage() {
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [destination, setDestination] = useState("socialive");

    useEffect(() => {
        const getCameraPermission = async () => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                console.error('Media Devices API not supported.');
                setHasCameraPermission(false);
                return;
            }
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setHasCameraPermission(true);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing camera:', error);
                setHasCameraPermission(false);
                toast({
                    variant: 'destructive',
                    title: 'Camera Access Denied',
                    description: 'Please enable camera permissions in your browser settings to use the Live Studio.',
                });
            }
        };
        getCameraPermission();
    }, [toast]);

    const toggleCamera = () => setIsCameraOn(!isCameraOn);
    const toggleMic = () => setIsMicOn(!isMicOn);


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* --- Main Section: Preview and Details --- */}
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Radio className="text-primary"/> Live Studio
                        </CardTitle>
                        <CardDescription>Prepare your broadcast to the MESY Universe.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-video bg-secondary/30 rounded-lg flex items-center justify-center relative border">
                           <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
                            {hasCameraPermission === false && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                     <VideoOff className="h-16 w-16 text-muted-foreground" />
                                     <p className="mt-4 font-semibold">Camera Not Available</p>
                                     <p className="text-sm text-muted-foreground">Please grant camera and microphone access to begin.</p>
                                </div>
                            )}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                                <Button variant="secondary" size="icon" onClick={toggleMic}>
                                    {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5 text-destructive" />}
                                </Button>
                                 <Button variant="destructive" size="lg" className="px-8">
                                    <Radio className="mr-2 h-5 w-5 animate-pulse"/> Go Live
                                </Button>
                                <Button variant="secondary" size="icon" onClick={toggleCamera}>
                                    {isCameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5 text-destructive" />}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                         <CardTitle>Stream Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="e.g., My First Live Stream!" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="What is your stream about?" />
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            {/* --- Sidebar: Settings and Customization --- */}
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5"/>Broadcast Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Audience</Label>
                            <Select defaultValue="public">
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="public"><div className="flex items-center gap-2"><Globe className="h-4 w-4"/>Public</div></SelectItem>
                                    <SelectItem value="friends"><div className="flex items-center gap-2"><Users className="h-4 w-4"/>Friends Only</div></SelectItem>
                                    <SelectItem value="group"><div className="flex items-center gap-2"><Users className="h-4 w-4"/>Group</div></SelectItem>
                                    <SelectItem value="private"><div className="flex items-center gap-2"><Lock className="h-4 w-4"/>Private</div></SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                             <Label>Destination Channel</Label>
                             <Select value={destination} onValueChange={setDestination}>
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="socialive">Socialive</SelectItem>
                                    <SelectItem value="entertainment">Entertainment</SelectItem>
                                    <SelectItem value="music">Music</SelectItem>
                                    <SelectItem value="movies">Movies</SelectItem>
                                    <SelectItem value="games">Games</SelectItem>
                                    <SelectItem value="shopping">Shopping Zone</SelectItem>
                                    <SelectItem value="ai">AI Zone</SelectItem>
                                    <SelectItem value="member">Member Zone</SelectItem>
                                    <SelectItem value="timeline">Private Timeline</SelectItem>
                                    <SelectItem value="kids">For Kids</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {destination === 'shopping' && (
                             <Card className="bg-secondary/40 border-primary/30">
                                <CardHeader className="pb-2">
                                     <CardTitle className="text-base flex items-center gap-2"><ShoppingBasket className="text-primary"/> Shopping Tools</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="outline" className="w-full">
                                        <PlusCircle className="mr-2 h-4 w-4"/> Add Product to Basket
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5"/>Customization</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="flex-col h-20"><Palette className="h-6 w-6 mb-1"/>Themes</Button>
                        <Button variant="outline" className="flex-col h-20"><Sparkles className="h-6 w-6 mb-1"/>Filters</Button>
                        <Button variant="outline" className="flex-col h-20"><Type className="h-6 w-6 mb-1"/>Text</Button>
                        <Button variant="outline" className="flex-col h-20"><Music className="h-6 w-6 mb-1"/>Audio</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
