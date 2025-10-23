
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PlusCircle, Search, Users, Shield } from "lucide-react";

export default function GroupsPage() {
    const myGroups = [
        { name: 'Dragon Knights Guild', members: 128, avatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl, type: 'Public' },
        { name: 'Mystic Crafters', members: 42, avatar: PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl, type: 'Private' },
    ];
    const discoverGroups = [
        { name: 'Wanderers of the Wild', members: 534, avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl, type: 'Public' },
        { name: 'Sky Citadel Architects', members: 89, avatar: PlaceHolderImages.find(i => i.id === 'fantasy-castle-1')?.imageUrl, type: 'Public' },
        { name: 'The Bardic College', members: 211, avatar: PlaceHolderImages.find(i => i.id === 'entertainment-preview')?.imageUrl, type: 'Public' },
    ];

    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Groups Hub</h1>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    Find and create communities, guilds, and teams within the MESY Universe.
                </p>
            </div>

            <Card className="max-w-4xl mx-auto">
                 <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="relative w-full sm:w-auto sm:flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="Search for groups..." className="pl-10" />
                        </div>
                        <Button className="w-full sm:w-auto">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Create a Group
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="discover">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="discover">Discover</TabsTrigger>
                            <TabsTrigger value="my-groups">My Groups ({myGroups.length})</TabsTrigger>
                        </TabsList>
                        <TabsContent value="discover" className="mt-6 space-y-4">
                            {discoverGroups.map((group, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 bg-card-foreground/5 rounded-lg">
                                    <Avatar className="h-16 w-16 rounded-lg">
                                        <AvatarImage src={group.avatar} />
                                        <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-bold text-lg">{group.name}</p>
                                        <p className="text-sm text-muted-foreground flex items-center gap-2"><Users className="h-4 w-4"/> {group.members.toLocaleString()} members</p>
                                    </div>
                                    <Button>Join</Button>
                                </div>
                            ))}
                        </TabsContent>
                        <TabsContent value="my-groups" className="mt-6 space-y-4">
                             {myGroups.length > 0 ? myGroups.map((group, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 bg-card-foreground/5 rounded-lg">
                                    <Avatar className="h-16 w-16 rounded-lg">
                                        <AvatarImage src={group.avatar} />
                                        <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-lg">{group.name}</p>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1"><Users className="h-4 w-4"/> {group.members.toLocaleString()} members</span>
                                            <span className="flex items-center gap-1">{group.type === 'Private' && <Shield className="h-4 w-4"/>} {group.type}</span>
                                        </div>
                                    </div>
                                    <Button variant="outline">Enter</Button>
                                </div>
                            )) : (
                                <p className="text-center text-muted-foreground py-8">You haven't joined any groups yet.</p>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
