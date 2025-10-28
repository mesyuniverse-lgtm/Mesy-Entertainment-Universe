'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Camera, Edit, MoreHorizontal, Package, Shield, MessageCircle, Heart, Share2, Star, Gift, Gem, User, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function MemberProfilePage() {
    const coverImage = PlaceHolderImages.find(i => i.id === 'fantasy-castle-1');
    const profileImage = { imageUrl: "https://picsum.photos/seed/thisaya/400/400" }; 
    const timelinePosts = [
    { 
        type: 'image',
        user: { name: 'Thisaya', avatar: profileImage?.imageUrl },
        time: '5 mins ago',
        text: 'Hello , my friens 😁',
        media: null,
        likes: 128,
        comments: 32,
    }];
    const friends = [
        { name: 'Kael', avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
        { name: 'Zane', avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl },
        { name: 'Echo', avatar: PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl },
        { name: 'Silas', avatar: PlaceHolderImages.find(i => i.id === 'fighter-silhouette')?.imageUrl },
        { name: 'Draconis', avatar: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl },
        { name: 'Valerius', avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
    ];

    const currentDownline = 1250;
    const nextLevelGoal = 2000;
    const progressPercentage = (currentDownline / nextLevelGoal) * 100;
    
    return (
        <div className="bg-background/90 text-foreground">
            {/* Profile Header */}
            <header className="bg-card shadow-sm rounded-lg">
                <div className="container px-0 lg:px-4">
                    <div className="relative h-48 md:h-64 rounded-t-lg overflow-hidden">
                        {coverImage && <Image src={coverImage.imageUrl} alt="Cover Photo" layout="fill" objectFit="cover" />}
                        <div className="absolute inset-0 bg-black/20"></div>
                        <Button variant="secondary" className="absolute bottom-4 right-4">
                            <Camera className="mr-2 h-4 w-4" />
                            Edit Cover Photo
                        </Button>
                    </div>
                    <div className="px-4 -mt-16 sm:-mt-20">
                        <div className="flex flex-col sm:flex-row items-start sm:gap-6">
                            <div className="relative shrink-0">
                                <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-card shadow-lg">
                                    <AvatarImage src={profileImage?.imageUrl} />
                                    <AvatarFallback>T</AvatarFallback>
                                </Avatar>
                                <Button size="icon" variant="secondary" className="absolute bottom-2 right-2 h-8 w-8 rounded-full"><Camera className="h-4 w-4"/></Button>
                            </div>
                            <div className="w-full pt-4">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-end">
                                    <div className="text-center sm:text-left">
                                        <p className="text-sm text-muted-foreground">Member ID:001  Level.1</p>
                                        <h1 className="text-2xl md:text-3xl font-bold">Membername : Thisaya</h1>
                                        <p className="text-sm text-muted-foreground">Income: $1,213 | Fee (3%): $37.5</p>
                                    </div>
                                    <div className="flex gap-2 mt-4 sm:mt-0 justify-center">
                                        <Button variant="secondary"><Package className="mr-2 h-4 w-4"/> Bag</Button>
                                        <Button asChild><Link href="/customize"><Shield className="mr-2 h-4 w-4"/> Customize</Link></Button>
                                        <Button variant="secondary"><Edit className="mr-2 h-4 w-4"/> Edit Profile</Button>
                                        <Button variant="secondary" size="icon"><MoreHorizontal /></Button>
                                    </div>
                                </div>
                                 <div className="mt-3 relative w-full bg-white/20 rounded-full h-6 overflow-hidden border border-border">
                                    <div 
                                        className="bg-destructive h-full rounded-full flex items-center justify-center"
                                        style={{ width: `${progressPercentage}%` }}
                                    >
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <p className="font-bold text-white text-sm" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Downline: {currentDownline.toLocaleString()} / {nextLevelGoal.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-4 border-border"/>
                    <Tabs defaultValue="posts" className="px-4">
                        <TabsList>
                            <TabsTrigger value="posts">Posts</TabsTrigger>
                            <TabsTrigger value="about">About</TabsTrigger>
                            <TabsTrigger value="friends">Friends</TabsTrigger>
                            <TabsTrigger value="photos">Photos</TabsTrigger>
                            <TabsTrigger value="groups">Groups</TabsTrigger>
                            <TabsTrigger value="more">More</TabsTrigger>
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
                            <CardContent className="space-y-3">
                                <Button variant="secondary" className="w-full">Add Bio</Button>
                                <Button variant="secondary" className="w-full">Edit Details</Button>
                                <Button variant="secondary" className="w-full">Add Hobbies</Button>
                                <Button variant="secondary" className="w-full">Add Featured</Button>
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
