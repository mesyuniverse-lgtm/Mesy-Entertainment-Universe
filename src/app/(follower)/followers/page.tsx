
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Search } from "lucide-react";

export default function FollowersPage() {
    const followers = [
        { name: 'Zane', level: 20, avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl },
        { name: 'Aria', level: 15, avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
    ];
    const following = [
        { name: 'Kael', level: 12, avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl, online: true },
        { name: 'Lyra', level: 10, avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl, online: false },
    ];

    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Followers Hub</h1>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    Manage your followers and the creators you follow.
                </p>
            </div>

            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search for users..." className="pl-10" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="followers">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="followers">Followers ({followers.length})</TabsTrigger>
                            <TabsTrigger value="following">Following ({following.length})</TabsTrigger>
                        </TabsList>
                        <TabsContent value="followers" className="mt-6 space-y-4">
                            {followers.length > 0 ? followers.map((follower, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 bg-card-foreground/5 rounded-lg">
                                    <Avatar className="h-14 w-14 border-2 border-primary/50">
                                        <AvatarImage src={follower.avatar} />
                                        <AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-bold text-lg">{follower.name}</p>
                                        <p className="text-sm text-muted-foreground">Level {follower.level}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">View Profile</Button>
                                        <Button variant="secondary" size="sm">Remove</Button>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-center text-muted-foreground py-8">You have no followers yet.</p>
                            )}
                        </TabsContent>
                        <TabsContent value="following" className="mt-6 space-y-4">
                             {following.length > 0 ? following.map((person, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 bg-card-foreground/5 rounded-lg">
                                    <div className="relative">
                                        <Avatar className="h-14 w-14">
                                            <AvatarImage src={person.avatar} />
                                            <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                         {person.online && <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-500 ring-2 ring-background"></span>}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-lg">{person.name}</p>
                                        <p className="text-sm text-muted-foreground">Level {person.level}</p>
                                    </div>
                                    <div className="flex gap-2">
                                       <Button variant="secondary" size="sm">Unfollow</Button>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-center text-muted-foreground py-8">You are not following anyone yet.</p>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
