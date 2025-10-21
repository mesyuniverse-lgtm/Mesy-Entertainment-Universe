

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadCloud, Cloud, Save } from "lucide-react";
import { useState } from "react";

const presetAvatars = [
    PlaceHolderImages.find(i => i.id === 'female-archer-1'),
    PlaceHolderImages.find(i => i.id === 'knight-1'),
    PlaceHolderImages.find(i => i.id === 'fighter-character'),
];


export default function ProfilePage() {
    const [selectedAvatar, setSelectedAvatar] = useState(presetAvatars[0]?.imageUrl || '');

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Public Profile</h1>
                <p className="text-muted-foreground">This information will be displayed publicly on your profile.</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
                {/* --- Left Column: Avatar Management --- */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-20">
                         <CardHeader>
                            <CardTitle>Avatar</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center gap-6">
                            <Avatar className="w-40 h-40 text-6xl border-4 border-primary/20">
                                <AvatarImage src={selectedAvatar} alt="Current Avatar" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>

                            <div className="w-full space-y-4">
                                <div>
                                    <Label className="text-sm text-muted-foreground mb-2 block">Choose a Preset</Label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {presetAvatars.map((preset) => (
                                            preset && <button key={preset.id} onClick={() => setSelectedAvatar(preset.imageUrl)}>
                                                <Image 
                                                    src={preset.imageUrl} 
                                                    alt={preset.description}
                                                    width={100}
                                                    height={100}
                                                    className={cn("rounded-md aspect-square object-cover transition-all", selectedAvatar === preset.imageUrl ? 'ring-2 ring-primary' : 'ring-1 ring-border/50 hover:ring-primary/50')}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full"><UploadCloud className="mr-2"/> Upload from Device</Button>
                                <Button variant="outline" className="w-full"><Cloud className="mr-2"/> Select from Mesy Cloud</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                {/* --- Right Column: Profile Details --- */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Details</CardTitle>
                            <CardDescription>Tell the universe who you are.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" defaultValue="User" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nickname">Nickname</Label>
                                    <Input id="nickname" placeholder="e.g., The Wanderer" />
                                </div>
                            </div>
                             <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender (เพศ)</Label>
                                    <Select>
                                        <SelectTrigger id="gender"><SelectValue placeholder="Select gender" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                            <SelectItem value="not-specified">Prefer not to say</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="age-group">Age Group</Label>
                                    <Select>
                                        <SelectTrigger id="age-group"><SelectValue placeholder="Select age group" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="child">Child (เด็ก)</SelectItem>
                                            <SelectItem value="teen">Teen (วัยรุ่น)</SelectItem>
                                            <SelectItem value="adult">Adult (ผู้ใหญ่)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                             <div className="grid sm:grid-cols-2 gap-4">
                                 <div className="space-y-2">
                                    <Label htmlFor="marital-status">Marital Status (สถานะ)</Label>
                                    <Select>
                                        <SelectTrigger id="marital-status"><SelectValue placeholder="Select status" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="single">Single (โสด)</SelectItem>
                                            <SelectItem value="married">Married (สมรส)</SelectItem>
                                            <SelectItem value="divorced">Divorced (หย่าแล้ว)</SelectItem>
                                            <SelectItem value="separated">Separated (แยกกันอยู่)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="employment-status">Employment Status</Label>
                                    <Select>
                                        <SelectTrigger id="employment-status"><SelectValue placeholder="Select status" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="employed">Employed (ทำงาน)</SelectItem>
                                            <SelectItem value="unemployed">Unemployed (ว่างงาน)</SelectItem>
                                            <SelectItem value="retired">Retired (เกษียณ)</SelectItem>
                                            <SelectItem value="student">Student</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea id="bio" placeholder="Tell us about your journey in the MESY Universe..." />
                            </div>
                            <Button><Save className="mr-2"/>Save Changes</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
