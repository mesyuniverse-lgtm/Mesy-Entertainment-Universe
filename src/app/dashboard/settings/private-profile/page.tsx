
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
import { UploadCloud, Cloud, Save, Link, Trash2 } from "lucide-react";
import { useState } from "react";

const presetAvatars = [
    PlaceHolderImages.find(i => i.id === 'female-archer-1'),
    PlaceHolderImages.find(i => i.id === 'knight-1'),
    PlaceHolderImages.find(i => i.id === 'fighter-character'),
];

export default function PrivateProfilePage() {
    const [selectedAvatar, setSelectedAvatar] = useState(presetAvatars[0]?.imageUrl || '');
    const [socialLinks, setSocialLinks] = useState([{ id: 1, value: '' }]);

    const addSocialLink = () => {
        setSocialLinks([...socialLinks, { id: Date.now(), value: '' }]);
    };

    const removeSocialLink = (id: number) => {
        setSocialLinks(socialLinks.filter(link => link.id !== id));
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Private Profile</h1>
                <p className="text-muted-foreground">This information is private and not visible to other members.</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
                {/* --- Left Column: Avatar Management --- */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-20">
                         <CardHeader>
                            <CardTitle>Profile Picture</CardTitle>
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
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>This information is kept confidential and is used for account management purposes.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="user-id">User ID</Label>
                                    <Input id="user-id" defaultValue="USR-1A2B3C" readOnly disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue="user@example.com" />
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstname">Firstname</Label>
                                    <Input id="firstname" placeholder="Your first name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastname">Lastname</Label>
                                    <Input id="lastname" placeholder="Your last name" />
                                </div>
                            </div>
                             <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" type="tel" placeholder="Your phone number" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="age">Age</Label>
                                    <Input id="age" type="number" placeholder="Your age" />
                                </div>
                            </div>
                             <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="religion">Religion</Label>
                                    <Input id="religion" placeholder="e.g., Buddhism, Christianity" />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="nationality">Nationality</Label>
                                    <Input id="nationality" placeholder="e.g., Thai, American" />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Textarea id="address" placeholder="Your mailing address" />
                            </div>
                             <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="workplace">Workplace (Optional)</Label>
                                    <Input id="workplace" placeholder="Your company name" />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="shop-link">Shop / Website (Optional)</Label>
                                    <Input id="shop-link" placeholder="https://your-shop.com" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <Label>Social Links (Optional)</Label>
                                {socialLinks.map((link, index) => (
                                    <div key={link.id} className="flex items-center gap-2">
                                        <Link className="h-9 w-9 p-2 border rounded-md flex-shrink-0" />
                                        <Input
                                            value={link.value}
                                            onChange={(e) => {
                                                const newLinks = [...socialLinks];
                                                newLinks[index].value = e.target.value;
                                                setSocialLinks(newLinks);
                                            }}
                                            placeholder="https://social-media.com/your-profile"
                                        />
                                        <Button variant="ghost" size="icon" onClick={() => removeSocialLink(link.id)} disabled={socialLinks.length <= 1}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                ))}
                                <Button variant="outline" size="sm" onClick={addSocialLink}>Add another link</Button>
                            </div>
                            
                            <Button><Save className="mr-2"/>Save Private Information</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
