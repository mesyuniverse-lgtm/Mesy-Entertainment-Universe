
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MessageSquare, Search, UserPlus } from "lucide-react";

export default function UsersPage() {
    const allUsers = [
        { name: 'Kael', level: 12, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl, online: true },
        { name: 'Lyra', level: 10, avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl, online: false },
        { name: 'Zane', level: 20, avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl, online: true },
        { name: 'Aria', level: 15, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl, online: false },
        { name: 'Echo', level: 18, avatar: PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl, online: true },
        { name: 'Silas', level: 22, avatar: PlaceHolderImages.find(i => i.id === 'fighter-silhouette')?.imageUrl, online: false },
        { name: 'Draconis', skill: 'AI & Backend', level: 25, avatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl, online: true },
        { name: 'Valerius', skill: 'Game Logic & Unreal', level: 17, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl, online: false },
    ];


    return (
        <div className="min-h-screen bg-background text-foreground p-4 lg:p-6">
            <Card>
                <CardHeader>
                    <CardTitle>User Directory</CardTitle>
                    <CardDescription>Browse and find members of the MESY Universe.</CardDescription>
                    <div className="relative pt-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search for users by name or skill..." className="pl-10" />
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {allUsers.map((user, index) => (
                        <Card key={index} className="overflow-hidden text-center group relative bg-card/50 hover:bg-card/90 transition-colors duration-300">
                            <div className="relative h-40 w-full">
                                <Avatar className="h-24 w-24 mx-auto mt-6 border-4 border-primary shadow-lg">
                                    <AvatarImage src={user.avatar || ''} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {user.online && <span className="absolute top-6 right-10 block h-4 w-4 rounded-full bg-green-500 ring-2 ring-background" title="Online"></span>}
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold">{user.name}</h3>
                                <p className="text-sm text-muted-foreground">Level {user.level}</p>
                                {(user as any).skill && <p className="text-xs text-primary mt-1">{(user as any).skill}</p>}
                                <div className="flex justify-center gap-2 mt-4">
                                    <Button variant="outline" size="sm"><UserPlus className="h-4 w-4 mr-1"/> Friend</Button>
                                    <Button variant="secondary" size="sm"><MessageSquare className="h-4 w-4 mr-1"/> Message</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
