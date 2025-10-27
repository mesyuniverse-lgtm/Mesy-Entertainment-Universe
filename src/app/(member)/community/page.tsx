'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Send, Users } from "lucide-react";

const onlineMembers = [
    { name: 'Admin', avatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl },
    { name: 'Aria', avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
    { name: 'Kael', avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
    { name: 'Zane', avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl },
    { name: 'Lyra', avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl },
];

const messages = [
    { user: onlineMembers[1], text: "Welcome to the new community hub, everyone!", time: "10:30 AM" },
    { user: onlineMembers[2], text: "This is awesome! Great to have a place just for members.", time: "10:31 AM" },
    { user: onlineMembers[0], text: "Feel free to share your thoughts, ideas, or just chat. Let's build a great community together. ✨", time: "10:32 AM" },
    { user: onlineMembers[3], text: "Anyone up for a quest later?", time: "10:35 AM" },
];

export default function CommunityPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-100px)]">
            <main className="lg:col-span-3 flex flex-col h-full gap-4">
                 {/* Marquee */}
                 <div className="relative flex overflow-x-hidden bg-primary/10 border border-primary/30 rounded-lg py-2 text-sm">
                    <div className="animate-marquee whitespace-nowrap text-primary font-semibold">
                        <span className="mx-4">Welcome to the Member's Lounge! ✨</span>
                        <span className="mx-4">Weekly developer AMA happening this Friday! 🎙️</span>
                        <span className="mx-4">New 'Chrono Blade' available in the marketplace! ⚔️</span>
                    </div>
                    <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary font-semibold">
                       <span className="mx-4">Welcome to the Member's Lounge! ✨</span>
                        <span className="mx-4">Weekly developer AMA happening this Friday! 🎙️</span>
                        <span className="mx-4">New 'Chrono Blade' available in the marketplace! ⚔️</span>
                    </div>
                </div>
                 <style jsx>{`
                    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
                    @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
                    .animate-marquee { animation: marquee 30s linear infinite; }
                    .animate-marquee2 { animation: marquee2 30s linear infinite; }
                `}</style>
                 <Card className="flex-grow flex flex-col">
                     <CardHeader>
                        <CardTitle>#general-chat</CardTitle>
                        <CardDescription>The main hub for all member conversations. Be respectful and have fun!</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                        <ScrollArea className="flex-grow h-0 pr-4 -mr-4">
                            <div className="space-y-6">
                                {messages.map((msg, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={msg.user.avatar} />
                                            <AvatarFallback>{msg.user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="flex items-baseline gap-2">
                                                <p className="font-bold text-primary">{msg.user.name}</p>
                                                <p className="text-xs text-muted-foreground">{msg.time}</p>
                                            </div>
                                            <div className="p-3 rounded-lg bg-secondary/50 mt-1">
                                                <p>{msg.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="mt-4 flex items-center gap-2">
                            <Input placeholder="Type your message..." className="h-12"/>
                            <Button size="icon" className="h-12 w-12"><Send /></Button>
                        </div>
                    </CardContent>
                 </Card>
            </main>
            <aside className="hidden lg:block">
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-3">
                        <Users className="h-5 w-5"/>
                        <CardTitle>Online Members ({onlineMembers.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {onlineMembers.map((member) => (
                            <div key={member.name} className="flex items-center gap-3">
                                <div className="relative">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background"></span>
                                </div>
                                <p className="font-semibold">{member.name}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </aside>
        </div>
    );
}
