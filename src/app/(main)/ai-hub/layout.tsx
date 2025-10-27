'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Gem } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Home, Compass, Folder, Video, ImageIcon, Bot, Film, Sparkles, Wand2, Star, Settings, LifeBuoy, UserCircle, Plus, Zap, Code, Shield, Award, Lightbulb, LayoutDashboard, LogOut, Camera } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth, useUser } from '@/firebase';
import { Card, CardContent } from '@/components/ui/card';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const MemberIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 text-purple-400 bg-background/80 rounded-full p-0.5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#8A2BE2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8.5" cy="7" r="4" stroke="#8A2BE2" strokeWidth="2"/>
        <path d="M18 8a2 2 0 0 1 2-2" stroke="#8A2BE2" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 6a6 6 0 0 1 0 12" stroke="#8A2BE2" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);


export default function AiHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const userProfileImage = PlaceHolderImages.find(i => i.id === 'female-archer-1');


  const handleLogout = async () => {
    await signOut(auth);
    router.push('/welcome');
  };

  const isMember = user?.email === 'admin@mesy.io';

  const sidebarNav = {
    main: [
      { name: 'Home', href: '/ai-hub', icon: Home },
      { name: 'Explore', href: '#', icon: Compass },
      { name: 'Projects', href: '#', icon: Folder },
    ],
    creation: [
      { name: 'AI Video', href: '/ai-hub/generator', icon: Video },
      { name: 'AI Image', href: '/ai-hub/generator', icon: ImageIcon },
      { name: 'AI Avatar', href: '/ai-hub/generator', icon: Bot },
      { name: 'AI Shorts', href: '#', icon: Film, badge: 'BETA' },
      { name: 'Pro Effects', href: '#', icon: Sparkles },
    ],
    entertainment: [
        { name: 'Fun Effects', href: '#', icon: Wand2 },
        { name: 'Photo Effects', href: '#', icon: ImageIcon },
    ],
    tools: [
        { name: 'AI Tools', href: '#', icon: Star },
        { name: 'My Creations', href: '#', icon: Sparkles },
    ],
    app: [
        { name: 'App', href: '#', icon: Settings },
        { name: 'API', href: '#', icon: Code },
    ]
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="w-64 flex-col border-r border-border/60 p-2 space-y-2 hidden lg:flex">
        <Link href="/home" className="flex items-center gap-2 p-2 mb-2">
            <Gem className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-headline">MESY.ai</span>
        </Link>

        <Button className="w-full"><Plus className="mr-2 h-4 w-4"/>Create New</Button>

        <nav className="flex-grow space-y-1">
            {sidebarNav.main.map(item => (
                <Link key={item.name} href={item.href} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                </Link>
            ))}
             <div className="space-y-2 pt-4">
                <p className="px-3 text-xs font-semibold uppercase text-muted-foreground/80">Creation</p>
                {sidebarNav.creation.map(item => (
                    <Link key={item.name} href={item.href} className="flex items-center justify-between gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
                        <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                        </div>
                        {item.badge && <Badge variant="secondary">{item.badge}</Badge>}
                    </Link>
                ))}
            </div>
        </nav>

        <Card className="bg-gradient-to-br from-accent/20 to-primary/10 border-primary/20">
            <CardContent className="p-3 text-center">
                <h3 className="font-bold text-base text-foreground">Reimagine your creations</h3>
                <p className="text-xs text-muted-foreground mt-1 mb-3">Future-proof your skills with our Personal Plan.</p>
                <div className="space-y-2 text-left text-xs">
                    <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary"/><span>Learn AI and more</span></div>
                    <div className="flex items-center gap-2"><Award className="h-4 w-4 text-primary"/><span>Prep for a certification</span></div>
                    <div className="flex items-center gap-2"><Wand2 className="h-4 w-4 text-primary"/><span>Practice with AI coaching</span></div>
                    <div className="flex items-center gap-2"><Lightbulb className="h-4 w-4 text-primary"/><span>Advance your career</span></div>
                </div>
                 <Button size="sm" className="w-full mt-4">Learn more</Button>
            </CardContent>
        </Card>

        
        <div className="space-y-2">
            <p className="px-3 text-xs font-semibold uppercase text-muted-foreground/80">Entertainment</p>
            {sidebarNav.entertainment.map(item => (
                <Link key={item.name} href={item.href} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                </Link>
            ))}
        </div>

        <div className="space-y-2">
            <p className="px-3 text-xs font-semibold uppercase text-muted-foreground/80">Tools</p>
            {sidebarNav.tools.map(item => (
                <Link key={item.name} href={item.href} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                </Link>
            ))}
        </div>
        
        <div className="mt-auto space-y-2">
             <div className="space-y-2">
                <p className="px-3 text-xs font-semibold uppercase text-muted-foreground/80">App</p>
                 {sidebarNav.app.map(item => (
                    <Link key={item.name} href={item.href} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                    </Link>
                ))}
             </div>
            <Button variant="default" className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600">
                <Zap className="mr-2 h-4 w-4"/> Upgrade Now
            </Button>
        </div>

      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border/60 px-6">
            <div className="flex-1">
                {/* Search bar can go here */}
            </div>
             <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon"><LifeBuoy className="h-5 w-5"/></Button>
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                        <Avatar className="h-9 w-9 border-2 border-primary/50">
                          <AvatarImage src={user?.photoURL || userProfileImage?.imageUrl} alt="User Avatar" />
                          <AvatarFallback>{user?.email?.[0].toUpperCase() || 'A'}</AvatarFallback>
                        </Avatar>
                       {isMember && (
                          <>
                            <MemberIcon />
                            <div className="absolute bottom-0 right-0 bg-background/80 rounded-full p-0.5">
                                <Camera className="h-3 w-3 text-white" />
                            </div>
                          </>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.displayName || "User"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={isMember ? "/dashboard" : "/users"}>
                        <LayoutDashboard className="mr-2 h-4 w-4"/>Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={isMember ? "/profile" : "/users"}>
                        <UserCircle className="mr-2 h-4 w-4"/>Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}><LogOut className="mr-2 h-4 w-4"/>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
            {children}
        </main>
      </div>
    </div>
  );
}
