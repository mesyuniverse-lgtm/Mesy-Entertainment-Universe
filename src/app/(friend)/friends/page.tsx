
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Check, Search, UserPlus, X } from "lucide-react";

export default function FriendsPage() {
    const friends = [
        { name: 'Kael', level: 12, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl, online: true },
        { name: 'Lyra', level: 10, avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl, online: false },
    ];
    const requests = [
        { name: 'Zane', level: 20, avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl },
    ];

    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Friends Hub</h1>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    Manage your connections and build your community within the MESY Universe.
                </p>
            </div>

            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search for friends or users..." className="pl-10" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="friends">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="friends">My Friends ({friends.length})</TabsTrigger>
                            <TabsTrigger value="requests">Friend Requests ({requests.length})</TabsTrigger>
                        </TabsList>
                        <TabsContent value="friends" className="mt-6 space-y-4">
                            {friends.length > 0 ? friends.map((friend, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 bg-card-foreground/5 rounded-lg">
                                    <div className="relative">
                                        <Avatar className="h-14 w-14 border-2 border-primary/50">
                                            <AvatarImage src={friend.avatar} />
                                            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        {friend.online && <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-500 ring-2 ring-background"></span>}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-bold text-lg">{friend.name}</p>
                                        <p className="text-sm text-muted-foreground">Level {friend.level}</p>
                                    </div>
                                    <Button variant="outline" size="sm">View Profile</Button>
                                </div>
                            )) : (
                                <p className="text-center text-muted-foreground py-8">You haven't added any friends yet.</p>
                            )}
                        </TabsContent>
                        <TabsContent value="requests" className="mt-6 space-y-4">
                             {requests.length > 0 ? requests.map((request, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 bg-card-foreground/5 rounded-lg">
                                    <Avatar className="h-14 w-14">
                                        <AvatarImage src={request.avatar} />
                                        <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-semibold">{request.name} wants to be your friend.</p>
                                        <p className="text-sm text-muted-foreground">Level {request.level}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-500">
                                            <Check className="h-5 w-5" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive">
                                            <X className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-center text-muted-foreground py-8">No new friend requests.</p>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
