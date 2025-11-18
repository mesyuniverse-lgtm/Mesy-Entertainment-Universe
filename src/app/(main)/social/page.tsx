'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Heart,
  MessageCircle,
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
  Bookmark,
  Music,
  Home,
  Play,
  History,
  Clapperboard,
  Tv,
  Radio,
  UserPlus,
  Users2,
  HandCoins,
  Shield,
  User
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const leftNavItems = [
  { icon: <Video className="w-5 h-5 text-blue-500" />, label: 'Watch' },
  { icon: <Calendar className="w-5 h-5 text-red-500" />, label: 'Events' },
  { icon: <Users className="w-5 h-5 text-green-500" />, label: 'Friends' },
  { icon: <Clock className="w-5 h-5 text-purple-500" />, label: 'Memories' },
];

const leftNavItemsExtra = [
    { icon: <Play className="w-5 h-5 text-gray-400" />, label: 'Library' },
    { icon: <History className="w-5 h-5 text-gray-400" />, label: 'History' },
    { icon: <Clapperboard className="w-5 h-5 text-gray-400" />, label: 'Your videos' },
    { icon: <Tv className="w-5 h-5 text-gray-400" />, label: 'Watch later' },
    { icon: <ThumbsUp className="w-5 h-5 text-gray-400" />, label: 'Liked videos' },
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
];

const post = {
  author: 'Fiona Ozeri',
  time: '5 hrs',
  text: "Best fireworks show I've ever seen!",
  authorAvatarId: 'female-archer-1',
  postImageId: 'celebration-2026',
  likes: 240,
  comments: 16,
};

const subscriptions = [
    { name: 'MARWAN PABLO', avatarId: 'fighter-character'},
    { name: 'Mamdouh NasrAllah', avatarId: 'default-avatar'},
    { name: 'Elzero Web School', avatarId: 'glowing-gem-1'},
    { name: 'Mahmoud Abo EL Ro...', avatarId: 'knight-1'},
    { name: 'MNEU', avatarId: 'explorer-1'},
]

const initialStats = {
  online: 137861,
  friends: 139798,
  followed: 127901,
  follower: 127976,
  group: 127897,
};

const statsCardsConfig = [
  {
    title: 'Friends',
    key: 'friends' as keyof typeof initialStats,
    change: '+12.5% from last month',
    icon: <Users className="h-6 w-6 text-muted-foreground" />,
  },
  {
    title: 'Followed',
    key: 'followed' as keyof typeof initialStats,
    change: '+3 since last hour',
    icon: <UserPlus className="h-6 w-6 text-muted-foreground" />,
  },
  {
    title: 'Follower',
    key: 'follower' as keyof typeof initialStats,
    change: '+3 since last hour',
    icon: <UserPlus className="h-6 w-6 text-muted-foreground" />,
  },
  {
    title: 'Group',
    key: 'group' as keyof typeof initialStats,
    change: '+3 since last hour',
    icon: <Users2 className="h-6 w-6 text-muted-foreground" />,
  },
];

const centerNavItems = [
    { label: "Trading", icon: <HandCoins /> },
    { label: "Live", icon: <Radio /> },
    { label: "Friends", icon: <Users /> },
    { label: "Follow", icon: <UserPlus /> },
    { label: "Groups", icon: <Shield /> },
    { label: "Profile", icon: <User /> }
];


export default function SocialPage() {
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => ({
        online: prevStats.online + Math.floor(Math.random() * 50 - 10),
        friends: prevStats.friends + Math.floor(Math.random() * 5),
        followed: prevStats.followed + Math.floor(Math.random() * 3),
        follower: prevStats.follower + Math.floor(Math.random() * 3),
        group: prevStats.group + Math.floor(Math.random() * 2),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentUser = {
    name: 'Josephine Williams',
    avatarId: 'female-warrior-1',
  };

  const fireworksImage = PlaceHolderImages.find(p=> p.id === post.postImageId);
  const authorAvatar = PlaceHolderImages.find(p=> p.id === post.authorAvatarId);
  const currentUserAvatar = PlaceHolderImages.find(p=> p.id === currentUser.avatarId);
  const mainVideoBg = PlaceHolderImages.find(p => p.id === 'rose-background');
  const adImage = PlaceHolderImages.find(p => p.id === 'fantasy-landscape-5');


  return (
     <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Header Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="lg:col-span-1 bg-card/50 border-primary/20 flex flex-col items-center justify-center text-center p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
                <Radio className="w-5 h-5"/>
                <span className="font-semibold">Online</span>
            </div>
            <p className="text-5xl font-bold tracking-tighter text-red-500" style={{textShadow: '0 0 10px #ef4444'}}>
                {(stats.online || 0).toLocaleString()}
            </p>
        </Card>
        {statsCardsConfig.map((stat, index) => (
          <Card key={index} className="bg-card/50 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(stats[stat.key] || 0).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

       {/* Ticker */}
      <div className="relative flex overflow-hidden whitespace-nowrap py-2">
        <div className="animate-marquee flex gap-8 text-sm text-muted-foreground items-center">
            <p>Aria has received a Legendary Item: Shadowfire Bow! 🏹</p>
            <p>PixelPioneer reached Level 45! 💎</p>
            <p>CyberNinja acquired the legendary 'Blade of Echoes'. ⚔️</p>
            <p>Kael reached Level 15! ✨</p>
        </div>
        <div className="animate-marquee2 absolute top-2 left-0 flex gap-8 text-sm text-muted-foreground items-center">
            <p>Aria has received a Legendary Item: Shadowfire Bow! 🏹</p>
            <p>PixelPioneer reached Level 45! 💎</p>
            <p>CyberNinja acquired the legendary 'Blade of Echoes'. ⚔️</p>
            <p>Kael reached Level 15! ✨</p>
        </div>
      </div>
      
      {/* Center Nav */}
      <nav className="my-4">
        <div className="bg-card/50 rounded-lg p-1 max-w-2xl mx-auto">
            <ul className="flex justify-around items-center">
                {centerNavItems.map(item => (
                    <li key={item.label}>
                        <Button variant="ghost" className="text-foreground/80 font-bold hover:text-primary hover:bg-primary/10 transition-colors text-base p-3">
                           {React.cloneElement(item.icon, { className: "w-5 h-5 mr-2" })}
                            {item.label}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
      </nav>

    <div className="grid grid-cols-12 h-full bg-background">
      {/* Left Sidebar */}
      <aside className="col-span-3 p-4 space-y-2 hidden lg:block overflow-y-auto">
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
        <Separator className="my-2"/>
        {leftNavItemsExtra.map((item) => (
          <div key={item.label} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50">
            {item.icon}
            <p className="font-semibold">{item.label}</p>
          </div>
        ))}
        <Button variant="ghost" className="w-full justify-start p-2">
            <ChevronDown className="w-5 h-5 mr-3"/> Show more
        </Button>
        <Separator className="my-2"/>
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
      <main className="col-span-12 lg:col-span-6 p-4 md:px-6 md:py-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* TikTok-style Video */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-card/50 flex items-center justify-center">
            {mainVideoBg && (
              <Image src={mainVideoBg.imageUrl} alt="Main Video" layout="fill" objectFit="cover" className="opacity-80"/>
            )}
            <div className="absolute inset-0 bg-black/30"></div>
            
            <div className="absolute top-4 left-4 flex gap-2">
              <Button size="icon" variant="ghost" className="bg-black/30 rounded-full text-white"><ChevronDown /></Button>
            </div>
            <div className="absolute top-4 right-4 text-white font-semibold text-sm py-1 px-3 bg-black/50 rounded-lg">VIDEO</div>

            {/* Right Action Bar */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-5 text-white">
                <div className='flex flex-col items-center gap-1'>
                    <Avatar className='h-12 w-12 border-2 border-white'>
                        {currentUserAvatar && <AvatarImage src={currentUserAvatar.imageUrl} />}
                        <AvatarFallback>J</AvatarFallback>
                    </Avatar>
                    <div className='h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center -mt-3 text-xs border-2 border-card'>+</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Button size="icon" variant="ghost" className="rounded-full bg-black/30 h-12 w-12"><Heart className="h-7 w-7" /></Button>
                    <span className="text-xs font-semibold">250.5K</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Button size="icon" variant="ghost" className="rounded-full bg-black/30 h-12 w-12"><MessageCircle className="h-7 w-7" /></Button>
                    <span className="text-xs font-semibold">100K</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Button size="icon" variant="ghost" className="rounded-full bg-black/30 h-12 w-12"><Bookmark className="h-7 w-7" /></Button>
                    <span className="text-xs font-semibold">89K</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Button size="icon" variant="ghost" className="rounded-full bg-black/30 h-12 w-12"><Share2 className="h-7 w-7" /></Button>
                    <span className="text-xs font-semibold">132.5K</span>
                </div>
            </div>

            {/* Bottom Info & Nav */}
            <div className="absolute bottom-0 inset-x-0 p-4 text-white" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}>
              <div className="mb-2">
                <h3 className="font-bold">Name and Last name <span className="font-normal text-sm">#fyp</span></h3>
                <p className="text-sm">Caption of the post</p>
                <p className="text-sm flex items-center gap-2"><Music className="w-4 h-4"/> Song name - song artist</p>
              </div>
              <div className="flex justify-between items-center text-center text-xs font-semibold bg-black/30 backdrop-blur-sm rounded-lg p-2">
                  <div className="flex flex-col items-center w-full"><Home className="w-5 h-5"/><span>Home</span></div>
                  <div className="flex flex-col items-center w-full"><Play className="w-5 h-5"/><span>Now</span></div>
                  <div className="flex flex-col items-center w-full"><div className='w-10 h-7 bg-primary rounded-lg flex items-center justify-center'><Plus className="w-5 h-5"/></div></div>
                  <div className="flex flex-col items-center w-full relative"><MessageCircle className="w-5 h-5"/><span className='absolute -top-1 -right-3 text-[10px] bg-red-500 rounded-full px-1.5 py-0.5'>12</span><span>Inbox</span></div>
                  <div className="flex flex-col items-center w-full"><Users className="w-5 h-5"/><span>Profile</span></div>
              </div>
            </div>
          </div>

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
              {fireworksImage && <div className="relative aspect-[4/3]">
                    <Image src={fireworksImage.imageUrl} alt="Fireworks" fill className="object-cover"/>
              </div>}
              <div className="flex justify-between items-center p-2 text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                      <div className="p-1 bg-primary rounded-full">
                          <ThumbsUp className="w-3 h-3 text-primary-foreground"/>
                      </div>
                      <span>{post.likes}</span>
                  </div>
                  <span>{post.comments} Comments</span>
              </div>
              <Separator/>
              <div className="grid grid-cols-3 p-1">
                    <Button variant="ghost"><ThumbsUp className="w-5 h-5 mr-2"/>Like</Button>
                    <Button variant="ghost"><MessageCircle className="w-5 h-5 mr-2"/>Comment</Button>
                    <Button variant="ghost"><Share2 className="w-5 h-5 mr-2"/>Share</Button>
              </div>
          </Card>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="col-span-3 p-4 space-y-4 hidden lg:block overflow-y-auto">
        <Card className="bg-card/50 p-2">
            {adImage && <div className='relative w-full aspect-video rounded-md overflow-hidden'>
                <Image src={adImage.imageUrl} layout="fill" objectFit="cover" alt="Ad"/>
            </div>}
            <div className='p-2'>
                <p className='text-xs text-muted-foreground'>Orange Egypt</p>
                <p className='text-sm font-semibold'>Call #012# and Get Free Mcdonald's Meal</p>
            </div>
        </Card>

        <div>
            <p className="font-semibold text-muted-foreground px-2 mb-2">Subscriptions</p>
            {subscriptions.map((sub) => {
                const subAvatar = PlaceHolderImages.find(p=> p.id === sub.avatarId)
                return (
                    <div key={sub.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 relative">
                        {subAvatar && <Avatar className='w-8 h-8'>
                            <AvatarImage src={subAvatar.imageUrl} alt={sub.name} />
                            <AvatarFallback>{sub.name.charAt(0)}</AvatarFallback>
                        </Avatar>}
                        <p className="font-semibold text-sm">{sub.name}</p>
                    </div>
                )
            })}
             <Button variant="ghost" className="w-full justify-start p-2 text-sm">
                <ChevronDown className="w-5 h-5 mr-3"/> Show 70 more
            </Button>
        </div>
        <Separator />
        <div>
            <div className="flex justify-between items-center text-muted-foreground px-2 mb-2">
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
        </div>
      </aside>
    </div>
    </div>
  );
}
