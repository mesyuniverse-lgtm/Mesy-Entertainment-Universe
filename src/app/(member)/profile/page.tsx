
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Camera, Clapperboard, Edit, Ellipsis, HandCoins, Heart, Image as ImageIcon, MapPin, MessageCircle, MoreHorizontal, Music, Rss, Search, Share2, Shield, Video, Users as UsersIcon, Briefcase, CheckCircle2, XCircle, CreditCard, QrCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function MemberProfilePage() {
    const coverImage = PlaceHolderImages.find(i => i.id === 'fantasy-landscape-1');
    const profileImage = PlaceHolderImages.find(i => i.id === 'female-archer-1');
    const featuredImage = PlaceHolderImages.find(i => i.id === 'explorer-1');
    const galleryImages = PlaceHolderImages.slice(2, 8);
    const friends = [
        { name: 'Kael', avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
        { name: 'Zane', avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl },
        { name: 'Echo', avatar: PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl },
        { name: 'Silas', avatar: PlaceHolderImages.find(i => i.id === 'fighter-silhouette')?.imageUrl },
        { name: 'Draconis', avatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl },
        { name: 'Valerius', avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
    ];

    const timelinePosts = [
    { 
        type: 'image',
        user: { name: 'Aria\'s Adventures', avatar: profileImage?.imageUrl },
        time: '5 days ago',
        text: 'The view from the Sky Citadel was absolutely breathtaking today! #MESYUniverse #SkyCitadel',
        media: PlaceHolderImages.find(i => i.id === 'fantasy-castle-1'),
        likes: 128,
        comments: 32,
    }];
    
    return (
        <div className="bg-background/90 text-foreground">
            {/* Profile Header */}
            <header className="bg-card shadow-sm">
                <div className="container px-0 lg:px-8">
                    <div className="relative h-48 md:h-64 lg:h-80 rounded-b-lg overflow-hidden">
                        {coverImage && <Image src={coverImage.imageUrl} alt="Cover Photo" layout="fill" objectFit="cover" />}
                        <div className="absolute inset-0 bg-black/20"></div>
                        <Button variant="secondary" className="absolute bottom-4 right-4">
                            <Camera className="mr-2 h-4 w-4" />
                            Edit Cover Photo
                        </Button>
                    </div>
                    <div className="px-4 -mt-16 sm:-mt-20">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end sm:gap-6">
                            <div className="relative">
                                <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background shadow-lg">
                                    <AvatarImage src={profileImage?.imageUrl} />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                                <Button size="icon" variant="secondary" className="absolute bottom-2 right-2 h-8 w-8 rounded-full"><Camera className="h-4 w-4"/></Button>
                            </div>
                            <div className="flex-grow pt-4 text-center sm:text-left">
                                <h1 className="text-2xl md:text-3xl font-bold">Aria (Member)</h1>
                                <p className="text-muted-foreground">5.1K followers • 2.1K following</p>
                            </div>
                            <div className="flex gap-2 mt-4 sm:mt-0">
                                <Button><Shield className="mr-2 h-4 w-4"/> Member Dashboard</Button>
                                <Button variant="secondary"><Edit className="mr-2 h-4 w-4"/> Edit Profile</Button>
                                <Button variant="secondary" size="icon"><Ellipsis /></Button>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-4 border-border"/>
                    <Tabs defaultValue="posts" className="mt-1 px-4">
                        <TabsList>
                            <TabsTrigger value="posts">Posts</TabsTrigger>
                            <TabsTrigger value="about">About</TabsTrigger>
                            <TabsTrigger value="reels">Reels</TabsTrigger>
                            <TabsTrigger value="photos">Photos</TabsTrigger>
                            <TabsTrigger value="groups">Groups</TabsTrigger>
                            <TabsTrigger value="events">Events</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </header>

            {/* Main Content */}
            <main className="container py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Sidebar */}
                    <aside className="lg:col-span-5 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Intro</CardTitle></CardHeader>
                            <CardContent className="space-y-4 text-center">
                                <p>Explorer of Aethelgard and chronicler of its wonders. Join me on my adventures!</p>
                                <Button variant="secondary" className="w-full">Edit Bio</Button>
                                <div className="space-y-3 text-left pt-4">
                                    <div className="flex items-center gap-3"><UsersIcon className="h-5 w-5 text-muted-foreground"/><p>Profile: Digital Creator</p></div>
                                    <div className="flex items-center gap-3"><Briefcase className="h-5 w-5 text-muted-foreground"/><p>Member of the Wanderers Guild</p></div>
                                    <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-muted-foreground"/><p>Lives in the Sky Citadel</p></div>
                                </div>
                                <Button variant="secondary" className="w-full">Edit Details</Button>
                            </CardContent>
                        </Card>
                        <Card>
                             <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle>Photos</CardTitle>
                                <Button variant="link">See All Photos</Button>
                            </CardHeader>
                            <CardContent className="grid grid-cols-3 gap-2">
                                {galleryImages.map((img, idx) => img && (
                                    <div key={idx} className="aspect-square relative rounded-md overflow-hidden">
                                        <Image src={img.imageUrl} alt={img.description} fill objectFit="cover" className="hover:scale-110 transition-transform duration-300"/>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle>Friends</CardTitle>
                                <Button variant="link">See All Friends</Button>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">{friends.length} friends</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {friends.map((friend, idx) => (
                                        <div key={idx} className="text-center">
                                            <Avatar className="h-20 w-20 md:h-24 md:w-24 rounded-md mx-auto">
                                                <AvatarImage src={friend.avatar}/>
                                                <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <p className="text-xs font-semibold mt-1 truncate">{friend.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Right Content */}
                    <main className="lg:col-span-7 space-y-6">
                        <Card>
                            <CardContent className="p-3">
                                <div className='flex gap-3 items-center'>
                                    <Avatar>
                                        <AvatarImage src={profileImage?.imageUrl} />
                                    </Avatar>
                                    <Textarea placeholder="What's on your mind, Aria?" className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary flex-grow rounded-full px-4 py-2 h-10 resize-none" />
                                </div>
                                <hr className="my-3 border-border"/>
                                <div className='flex justify-around items-center'>
                                    <Button variant="ghost" className="flex-1"><Video className="mr-2 h-5 w-5 text-red-500"/> Live Video</Button>
                                    <Button variant="ghost" className="flex-1"><ImageIcon className="mr-2 h-5 w-5 text-green-500"/> Photo/Video</Button>
                                    <Button variant="ghost" className="flex-1"><Clapperboard className="mr-2 h-5 w-5 text-purple-500"/> Reel</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {timelinePosts.map((post, index) => (
                            <Card key={index} className="overflow-hidden">
                                <CardHeader className='p-4'>
                                    <div className='flex items-center gap-3'>
                                        <Avatar>
                                            <AvatarImage src={post.user.avatar} />
                                            <AvatarFallback>{post.user.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-grow">
                                            <p className="font-semibold">{post.user.name}</p>
                                            <p className="text-xs text-muted-foreground">{post.time}</p>
                                        </div>
                                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5"/></Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-4 pb-4 space-y-4">
                                    <p className='whitespace-pre-wrap text-sm'>{post.text}</p>
                                    {post.media && (
                                        <div className="relative aspect-[4/5] rounded-lg overflow-hidden border">
                                            <Image src={post.media.imageUrl} alt={post.media.description} data-ai-hint={post.media.imageHint} fill objectFit="cover" />
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-muted-foreground pt-2">
                                         <span className="text-xs">{post.likes} Likes</span>
                                         <span className="text-xs">{post.comments} Comments</span>
                                    </div>
                                    <hr className="border-border"/>
                                    <div className="flex justify-around">
                                        <Button variant="ghost" className="flex-1 flex items-center gap-2"><Heart className="h-5 w-5"/> Like</Button>
                                        <Button variant="ghost" className="flex-1 flex items-center gap-2"><MessageCircle className="h-5 w-5"/> Comment</Button>
                                        <Button variant="ghost" className="flex-1 flex items-center gap-2"><Share2 className="h-5 w-5"/> Share</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </main>
                </div>
            </main>
        </div>
    );
}

    