'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Heart,
  MessageSquare,
  MoreHorizontal,
  Search,
  Share2,
  ThumbsUp,
  Users,
  Video,
  Calendar,
  Clock,
  ChevronDown,
  Camera,
  Tag,
  Smile,
  Circle,
  Plus,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const leftNavItems = [
  { icon: <Video className="w-5 h-5 text-blue-500" />, label: 'Watch' },
  { icon: <Calendar className="w-5 h-5 text-red-500" />, label: 'Events' },
  { icon: <Users className="w-5 h-5 text-green-500" />, label: 'Friends' },
  { icon: <Clock className="w-5 h-5 text-purple-500" />, label: 'Memories' },
];

const shortcuts = [
    { avatarId: 'fantasy-castle-1', label: 'Save the Pomeroy Theatre' },
    { avatarId: 'fantasy-landscape-2', label: 'Weekend Trips' },
    { avatarId: 'shopping-preview', label: "Jasper's Market" },
    { avatarId: 'glowing-gem-1', label: 'Red Table Talk Group' },
    { avatarId: 'enchanted-forest-1', label: 'Best Hidden Hiking Trails' },
];

const stories = [
  { name: 'Add to Story', isAdd: true, avatarId: 'female-warrior-1', bgId: 'glowing-gem-1' },
  { name: 'Tom Russo', avatarId: 'default-avatar', bgId: 'fantasy-landscape-1' },
  { name: 'Betty Chen', avatarId: 'female-archer-1', bgId: 'fantasy-landscape-2' },
  { name: 'Dennis Han', avatarId: 'knight-1', bgId: 'fantasy-landscape-3' },
  { name: 'Cynthia Lopez', avatarId: 'explorer-1', bgId: 'fantasy-landscape-4' },
];

const contacts = [
    {name: "Eric Jones", online: true, avatarId: "default-avatar"},
    {name: "Cynthia Lopez", online: false, avatarId: "explorer-1"},
    {name: "Betty Chen", online: true, avatarId: "female-archer-1"},
    {name: "Tina Lim", online: false, avatarId: "knight-1"},
    {name: "Molly Carter", online: true, avatarId: "female-warrior-1"},
]

const post = {
  author: 'Fiona Ozeri',
  time: '5 hrs',
  text: "Best fireworks show I've ever seen!",
  authorAvatarId: 'female-archer-1',
  postImageId: 'celebration-2026',
  likes: 240,
  comments: 16,
};


export default function SocialPage() {
  const currentUser = {
    name: 'Josephine Williams',
    avatarId: 'female-warrior-1',
  };

  const fireworksImage = PlaceHolderImages.find(p=> p.id === post.postImageId);
  const authorAvatar = PlaceHolderImages.find(p=> p.id === post.authorAvatarId);
  const currentUserAvatar = PlaceHolderImages.find(p=> p.id === currentUser.avatarId);

  return (
    <div className="grid grid-cols-12 h-full bg-background">
      {/* Left Sidebar */}
      <aside className="col-span-3 p-4 space-y-4 hidden lg:block overflow-y-auto">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50">
            {currentUserAvatar && <Avatar>
                <AvatarImage src={currentUserAvatar.imageUrl} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>}
            <p className="font-semibold">{currentUser.name}</p>
        </div>
        {leftNavItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50">
            {item.icon}
            <p className="font-semibold">{item.label}</p>
          </div>
        ))}
        <Button variant="ghost" className="w-full justify-start p-2">
            <ChevronDown className="w-5 h-5 mr-3"/> See More
        </Button>
        <Separator className="my-4"/>
        <p className="font-semibold text-muted-foreground px-2">Shortcuts</p>
        {shortcuts.map((shortcut) => {
            const shortcutAvatar = PlaceHolderImages.find(p=> p.id === shortcut.avatarId)
            return (
                <div key={shortcut.label} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50">
                    {shortcutAvatar && <Image src={shortcutAvatar.imageUrl} alt={shortcut.label} width={28} height={28} className="rounded-lg object-cover" />}
                    <p className="font-semibold text-sm">{shortcut.label}</p>
                </div>
            )
        })}
         <Button variant="ghost" className="w-full justify-start p-2">
            <ChevronDown className="w-5 h-5 mr-3"/> See More
        </Button>
      </aside>

      {/* Main Content */}
      <main className="col-span-12 lg:col-span-6 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Stories */}
            <div className="grid grid-cols-5 gap-2">
                {stories.map((story) => {
                    const storyBg = PlaceHolderImages.find(p=> p.id === story.bgId);
                    const storyAvatar = PlaceHolderImages.find(p=> p.id === story.avatarId);
                    return (
                        <Card key={story.name} className="relative aspect-[3/4] overflow-hidden rounded-xl border-none group">
                            {storyBg && <Image src={storyBg.imageUrl} alt={story.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300"/>}
                            <div className="absolute inset-0 bg-black/40"></div>
                            {storyAvatar && <Avatar className="absolute top-3 left-3 h-9 w-9 border-2 border-primary">
                                <AvatarImage src={storyAvatar.imageUrl} alt={story.name} />
                                <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                            </Avatar>}
                            {story.isAdd && (
                                <div className="absolute bottom-0 inset-x-0 bg-card h-1/4 flex flex-col justify-end items-center p-1">
                                    <Button size="icon" className="absolute -top-4 w-9 h-9 border-4 border-card rounded-full bg-primary text-primary-foreground"><Plus className="w-5 h-5"/></Button>
                                </div>
                            )}
                            <p className="absolute bottom-2 inset-x-0 text-center text-xs font-semibold text-white truncate px-1">{story.name}</p>
                        </Card>
                    )
                })}
            </div>

            {/* Create Post */}
            <Card className="bg-card/50">
                <CardHeader className="p-3">
                    <div className="flex items-center gap-3">
                        {currentUserAvatar && <Avatar>
                            <AvatarImage src={currentUserAvatar.imageUrl} alt={currentUser.name} />
                            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>}
                        <Input placeholder={`What's on your mind, ${currentUser.name.split(' ')[0]}?`} className="h-10 bg-secondary border-none rounded-full"/>
                    </div>
                </CardHeader>
                <Separator/>
                <CardContent className="p-2 grid grid-cols-3">
                     <Button variant="ghost" className="flex-1"><Camera className="w-5 h-5 mr-2 text-red-500"/>Photo/Video</Button>
                     <Button variant="ghost" className="flex-1"><Tag className="w-5 h-5 mr-2 text-blue-500"/>Tag Friends</Button>
                     <Button variant="ghost" className="flex-1"><Smile className="w-5 h-5 mr-2 text-yellow-500"/>Feeling/Activity</Button>
                </CardContent>
            </Card>

            {/* Feed Post */}
            <Card className="bg-card/50">
                <CardHeader className="p-4">
                    <div className="flex items-center gap-3">
                        {authorAvatar && <Avatar>
                            <AvatarImage src={authorAvatar.imageUrl} alt={post.author}/>
                            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>}
                        <div className="flex-1">
                            <p className="font-semibold">{post.author}</p>
                            <p className="text-xs text-muted-foreground">{post.time}</p>
                        </div>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="w-5 h-5"/></Button>
                    </div>
                </CardHeader>
                <CardContent className="px-4 pt-0 pb-2">
                    <p className="mb-4">{post.text}</p>
                </CardContent>
                {fireworksImage && <div className="relative aspect-video">
                     <Image src={fireworksImage.imageUrl} alt="Fireworks" fill className="object-cover"/>
                </div>}
                <div className="flex justify-between items-center p-2 text-muted-foreground text-sm">
                    <div className="flex items-center gap-1">
                        <div className="p-1 bg-blue-500 rounded-full">
                            <ThumbsUp className="w-3 h-3 text-white"/>
                        </div>
                        <span>{post.likes}</span>
                    </div>
                    <span>{post.comments} Comments</span>
                </div>
                <Separator/>
                <div className="grid grid-cols-3 p-1">
                     <Button variant="ghost"><ThumbsUp className="w-5 h-5 mr-2"/>Like</Button>
                     <Button variant="ghost"><MessageSquare className="w-5 h-5 mr-2"/>Comment</Button>
                     <Button variant="ghost"><Share2 className="w-5 h-5 mr-2"/>Share</Button>
                </div>
            </Card>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="col-span-3 p-4 space-y-4 hidden lg:block overflow-y-auto">
        <div className="flex justify-between items-center text-muted-foreground">
            <p className="font-semibold">Contacts</p>
            <div className="flex gap-2">
                <Search className="w-4 h-4"/>
                <MoreHorizontal className="w-4 h-4"/>
            </div>
        </div>
        {contacts.map((contact) => {
             const contactAvatar = PlaceHolderImages.find(p=> p.id === contact.avatarId)
             return (
                <div key={contact.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 relative">
                    {contactAvatar && <Avatar>
                        <AvatarImage src={contactAvatar.imageUrl} alt={contact.name} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>}
                    <p className="font-semibold">{contact.name}</p>
                    {contact.online && <div className="absolute left-10 bottom-2 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card"/>}
                </div>
             )
        })}
      </aside>
    </div>
  );
}
