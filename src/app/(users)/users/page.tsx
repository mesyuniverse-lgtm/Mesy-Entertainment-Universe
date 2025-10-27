
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

// Custom components for payment provider icons
const PayPalIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="#003087" d="M20.55 5.51a1.27 1.27 0 0 0-1.25-1.07h-5.59c-.28 0-.54.1-.73.28L8.1 8.78c-.19.17-.45.27-.72.27H4.32a1.27 1.27 0 0 0-1.25 1.07L1 20.49a.62.62 0 0 0 .61.76h6.12c.28 0 .54-.1.73-.28l4.88-4.06c.19-.17.45-.27.72-.27h3.33a1.27 1.27 0 0 0 1.25-1.07l2.1-9.06Z" />
        <path fill="#009cde" d="m22.66 4.34-2.1 9.06a1.27 1.27 0 0 1-1.25 1.07h-3.33c-.28 0-.54.1-.72.27L10.38 19c-.19.17-.45.27-.73.27H3.53a.62.62 0 0 1-.6-.76L5.1 4.34a1.27 1.27 0 0 1 1.25-1.07h5.59c.28 0 .54.1.73.28l4.88 4.06c.19.17.45.27.72.27h3.06c.7 0 1.23.63 1.13 1.23Z" />
        <path fill="#002f86" d="m14.28 8.89.06-2.61a1.18 1.18 0 0 0-1.16-1.28h-5.6a.44.44 0 0 0-.43.48l1.72 7.42c.07.28.32.48.6.48h2.32c.7 0 1.23-.63 1.13-1.23L12 8.52c-.1-.6.3-1.15.89-1.15h1.39Z" />
    </svg>
);

const TrueMoneyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" fill="#F08F1A"/>
        <path d="M12 6v12" stroke="#fff" strokeWidth="2.5"/>
        <path d="M15.5 9.5a3.5 3.5 0 1 0 0 5" stroke="#fff" strokeWidth="2.5"/>
    </svg>
);

const GooglePayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 52 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.745 8.653h-2.274v2.546h2.153a2.71 2.71 0 0 1-.03 5.42H39.47v2.54h2.29a5.257 5.257 0 0 0 .046-10.506z" fill="#4285F4"></path>
        <path d="M47.385 11.2h2.274v2.54h-2.274zM32.33 8.653v10.51h2.274V8.653z" fill="#34A853"></path>
        <path d="M51.93 11.2h-2.275v7.96h2.275zM47.385 8.653h2.274v2.54h-2.274z" fill="#FBBC04"></path>
        <path d="M37.195 8.653h2.274v10.51h-2.274z" fill="#EA4335"></path>
        <path d="M34.604 11.2v-2.54h-2.274v10.51h2.274V13.75h2.274v-2.54h-2.274z" fill="#4285F4"></path>
        <path d="M49.66 8.653h2.274v2.54h-2.274z" fill="#EA4335"></path>
        <path d="M9.476 11.168h2.392l-3.05 4.88-3.06-4.88h2.393v-2.2h-3.83v-.002L.003 4.14v-.002h2.51l2.053 3.655 2.05-3.655h2.513l-4.32 7.727v.002h4.38v2.203h-6.95v-2.203zM21.285 4.138h2.46c2.05 0 3.326.96 3.326 2.396 0 1.05-.623 1.76-1.57 2.004l1.83 3.592h-2.73l-1.58-3.21h-1.737v3.21h-2.46V4.138zm2.46 3.61c1.23 0 1.95-.56 1.95-1.42 0-.82-.69-1.39-1.89-1.39h-1.92v2.81h1.86zM15.435 4.138h6.77v2.202h-4.25v1.28h3.9v2.13h-3.9v1.28h4.31v2.204h-6.83V4.138z" fill="#5F6368"></path>
    </svg>
);


export default function UsersPage() {
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
        user: { name: 'Sonya\'z G Divaparadise\'s', avatar: profileImage?.imageUrl },
        time: '5 days ago',
        text: 'เทศกาลกินเจเมืองพัทยาเริ่มแล้ว วันนี้ถึง 30 ตุลาคม 68 ณ โรงเจสว่างบริบูรณ์ นาเกลือ #Kinteawpattaya',
        media: PlaceHolderImages.find(i => i.id === 'shopping-preview'),
        likes: 128,
        comments: 32,
    }];
    
    const verificationStatus = {
        email: true,
        phone: false,
        payment: false,
    };


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
                                    <AvatarFallback>S</AvatarFallback>
                                </Avatar>
                                <Button size="icon" variant="secondary" className="absolute bottom-2 right-2 h-8 w-8 rounded-full"><Camera className="h-4 w-4"/></Button>
                            </div>
                            <div className="flex-grow pt-4 text-center sm:text-left">
                                <h1 className="text-2xl md:text-3xl font-bold">Sonya'z G Divaparadise's (ซอนญ่า)</h1>
                                <p className="text-muted-foreground">5.1K followers • 2.1K following</p>
                            </div>
                            <div className="flex gap-2 mt-4 sm:mt-0">
                                <Button><Shield className="mr-2 h-4 w-4"/> Professional Dashboard</Button>
                                <Button variant="secondary"><Edit className="mr-2 h-4 w-4"/> Edit</Button>
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
                                <p>ทิพย์หงษ์ชชญา พัสวีรุ่งจิรา กลับมายืนที่เดิมที่เคยคุ้นตา ชะตานำพามาให้พบเจอ</p>
                                <Button variant="secondary" className="w-full">Edit Bio</Button>
                                <div className="space-y-3 text-left pt-4">
                                    <div className="flex items-center gap-3"><UsersIcon className="h-5 w-5 text-muted-foreground"/><p>Profile: Digital Creator</p></div>
                                    <div className="flex items-center gap-3"><Music className="h-5 w-5 text-muted-foreground"/><p>Singer at Past times</p></div>
                                    <div className="flex items-center gap-3"><Briefcase className="h-5 w-5 text-muted-foreground"/><p>Owner at Divaparadise's Shop</p></div>
                                    <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-muted-foreground"/><p>Was lead vocalist at Siam Bayshore Resort & Spa, Pattaya</p></div>
                                </div>
                                <Button variant="secondary" className="w-full">Edit Details</Button>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Verification Status</CardTitle></CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                                    <span className="font-medium">Email Verification</span>
                                    {verificationStatus.email ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <XCircle className="h-6 w-6 text-red-500" />}
                                </div>
                                <div className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                                    <span className="font-medium">Phone Number</span>
                                    {verificationStatus.phone ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <XCircle className="h-6 w-6 text-red-500" />}
                                </div>
                                <div className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                                    <span className="font-medium">Payment Method</span>
                                    {verificationStatus.payment ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <XCircle className="h-6 w-6 text-red-500" />}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Connect Payment for Verification</CardTitle>
                                <CardDescription>คุณยังทำธุรกรรมไม่ได้ กรุณาเชื่อมต่อ Payment เพื่อยืนยันตน</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="h-16 flex justify-start items-center gap-3"><CreditCard className="h-6 w-6 text-primary"/> Credit Card</Button>
                                <Button variant="outline" className="h-16 flex justify-start items-center gap-3"><PayPalIcon className="h-6 w-6"/> PayPal</Button>
                                <Button variant="outline" className="h-16 flex justify-start items-center gap-3"><TrueMoneyIcon className="h-6 w-6"/> TrueMoney</Button>
                                <Button variant="outline" className="h-16 flex justify-start items-center gap-3"><QrCode className="h-6 w-6 text-primary"/> QR Code</Button>
                                <Button variant="outline" className="h-16 flex justify-start items-center gap-3 col-span-2"><GooglePayIcon className="h-6"/> Google Pay</Button>
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
                                    <Textarea placeholder="What's on your mind, Sonya'z?" className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary flex-grow rounded-full px-4 py-2 h-10 resize-none" />
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

