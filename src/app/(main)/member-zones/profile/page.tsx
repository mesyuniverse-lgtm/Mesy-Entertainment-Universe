
'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Image as ImageIcon, Save, Wand2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { moderateContent } from "@/ai/flows/ai-content-moderation";
import { useToast } from "@/hooks/use-toast";

const presetAvatars = [
    PlaceHolderImages.find(i => i.id === 'female-archer-1'),
    PlaceHolderImages.find(i => i.id === 'knight-1'),
    PlaceHolderImages.find(i => i.id === 'fighter-character'),
    PlaceHolderImages.find(i => i.id === 'explorer-1'),
    { id: 'custom-5', imageUrl: 'https://picsum.photos/seed/pavatar1/200/200', description: 'Preset Avatar 5', imageHint: 'fantasy character' },
    { id: 'custom-6', imageUrl: 'https://picsum.photos/seed/pavatar2/200/200', description: 'Preset Avatar 6', imageHint: 'fantasy character' },
    { id: 'custom-7', imageUrl: 'https://picsum.photos/seed/pavatar3/200/200', description: 'Preset Avatar 7', imageHint: 'fantasy character' },
    { id: 'custom-8', imageUrl: 'https://picsum.photos/seed/pavatar4/200/200', description: 'Preset Avatar 8', imageHint: 'fantasy character' },
];

export default function ProfilePage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [nickname, setNickname] = useState("User");
    const [bio, setBio] = useState("The journey of a thousand miles begins with a single step.");
    const [avatarUrl, setAvatarUrl] = useState(PlaceHolderImages.find(i => i.id === 'default-avatar')?.imageUrl || '');

    const handleSaveChanges = async () => {
        setIsLoading(true);
        try {
            // Step 1: Moderate the bio content
            const moderationResult = await moderateContent({ text: bio });

            // Step 2: Check if the content is compliant
            if (!moderationResult.isCompliant) {
                toast({
                    variant: "destructive",
                    title: "Inappropriate Content Detected",
                    description: `Your bio could not be saved. Reason: ${moderationResult.reason}`,
                });
                setIsLoading(false);
                return; // Stop the save process
            }

            // Step 3: If compliant, proceed with saving (simulated for now)
            console.log("Profile changes are compliant and being saved.");
            // TODO: Implement actual saving logic here
            
            toast({
                title: "Profile Saved!",
                description: "Your changes have been successfully saved.",
            });

        } catch (error) {
            console.error("Error saving profile:", error);
            toast({
                variant: "destructive",
                title: "An Error Occurred",
                description: "Failed to save profile. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight font-headline">โปรไฟล์ของฉัน</h1>
                <p className="text-muted-foreground">สะท้อนตัวตน: จัดการข้อมูลส่วนตัวและสาธารณะของคุณ</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Avatar Preview */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-20">
                        <CardContent className="p-6 text-center">
                            <div className="relative w-48 h-48 mx-auto mb-4 group">
                                <Avatar className="w-full h-full text-5xl">
                                    <AvatarImage src={avatarUrl} alt={nickname} className="object-cover"/>
                                    <AvatarFallback>{nickname.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ImageIcon className="text-white h-12 w-12"/>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold font-headline">{nickname}</h2>
                            <p className="text-muted-foreground text-sm">Level 5</p>
                            <p className="mt-4 text-sm italic">"{bio}"</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Profile Editor */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="text-primary"/>
                                Edit Your Profile
                            </CardTitle>
                            <CardDescription>This information may be displayed publicly. Be mindful of what you share.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="nickname">Nickname</Label>
                                <Input id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea id="bio" placeholder="Tell us about your journey..." value={bio} onChange={(e) => setBio(e.target.value)} />
                            </div>
                            
                            <div>
                                <Label>Choose Your Avatar</Label>
                                <div className="mt-2 p-4 border rounded-lg bg-secondary/20">
                                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                                        {presetAvatars.map((preset) => (
                                            preset && (
                                                <button key={preset.id} onClick={() => setAvatarUrl(preset.imageUrl)} className={cn("relative aspect-square rounded-md overflow-hidden ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", avatarUrl === preset.imageUrl ? "ring-2 ring-primary" : "ring-1 ring-border")}>
                                                    <Image
                                                        src={preset.imageUrl}
                                                        alt={preset.description}
                                                        data-ai-hint={preset.imageHint}
                                                        fill
                                                        className="object-cover transition-transform hover:scale-110"
                                                    />
                                                </button>
                                            )
                                        ))}
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <Label htmlFor="avatar-url">Or use an external URL</Label>
                                         <div className="flex items-center gap-2">
                                            <Input id="avatar-url" placeholder="https://..." value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
                                            <Button variant="outline" size="icon" disabled>
                                                <Wand2 className="h-4 w-4"/>
                                                <span className="sr-only">Generate with AI</span>
                                            </Button>
                                        </div>
                                        <p className="text-xs text-muted-foreground">AI Avatar generation coming soon.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-start">
                                <Button onClick={handleSaveChanges} disabled={isLoading}>
                                     {isLoading ? (
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    ) : (
                                        <Save className="mr-2 h-4 w-4"/>
                                    )}
                                    Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
