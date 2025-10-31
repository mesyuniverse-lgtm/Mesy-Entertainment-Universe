
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, ArrowLeft, KeyRound } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const artistRoles = [
    "Musician",
    "Singer",
    "Actor",
    "Dancer",
    "Director",
    "Painter",
    "DJ",
    "Sound Engineer",
    "Producer",
    "Graphic Designer",
    "3D Modeler",
    "VFX Artist"
];

export default function CreateArtistProfilePage() {
    const defaultAvatar = PlaceHolderImages.find(i => i.id === 'default-avatar');

    return (
        <div className="container py-12">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Button asChild variant="outline">
                        <Link href="/entertainment/artists">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Artists
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <UserPlus className="h-8 w-8 text-primary" />
                            Create Your Artist Profile
                        </CardTitle>
                        <CardDescription>
                            Establish your identity in the MESY Universe. Link your Member ID to verify your status and start connecting.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-6">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={defaultAvatar?.imageUrl} />
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                            <div className="space-y-2">
                                <Label>Profile Image</Label>
                                <Input type="file" className="max-w-xs"/>
                                <p className="text-xs text-muted-foreground">Upload a high-quality image (JPG, PNG). 400x400px recommended.</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="member-id" className="flex items-center"><KeyRound className="mr-2 h-4 w-4 text-primary"/>MESY Member ID</Label>
                            <Input id="member-id" placeholder="Enter your MESY Member ID to connect" />
                            <p className="text-xs text-muted-foreground">Only verified members can create an Artist Profile. This ensures a safe and trusted community.</p>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="artist-name">Artist / Band Name</Label>
                            <Input id="artist-name" placeholder="e.g., Aria, The Dragon Knights" />
                        </div>

                        <div className="space-y-2">
                             <Label htmlFor="artist-role">Select Your Role</Label>
                             <Select>
                                <SelectTrigger id="artist-role">
                                    <SelectValue placeholder="Choose your primary talent..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {artistRoles.map(role => (
                                        <SelectItem key={role} value={role.toLowerCase().replace(' ', '-')}>{role}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="artist-bio">Bio / Description</Label>
                            <Textarea id="artist-bio" placeholder="Tell the universe about yourself and your art..." rows={5} />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button size="lg">Create Profile</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
