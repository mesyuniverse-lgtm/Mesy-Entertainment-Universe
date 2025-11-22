'use client';

import React from 'react';
import Link from 'next/link';
import {
  Bell,
  Gem,
  Home,
  MessageSquare,
  Search,
  Settings,
  User
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useAuth, useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Mail } from 'lucide-react';

const mainNavItems = [
    {name: 'MEMBERS', href: '/members'},
    {name: 'SOCIAL', href: '/social'},
    {name: 'ENTERTAINMENT', href: '/entertainment'},
    {name: 'CONNECTIONS', href: '/connections'},
    {name: 'AI HUB', href: '/ai-hub'},
    {name: 'SHOPPING-HUB', href: '/shopping-hub'},
];


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    if (auth) {
      await auth.signOut();
      router.push('/welcome');
    }
  };
  
  const userAvatar = PlaceHolderImages.find((i) => i.id === 'default-avatar');

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/40 bg-card/80 backdrop-blur-lg px-4 md:px-6">
        
        <div className='flex items-center gap-2'>
           <Link href="/home" className="flex items-center gap-2 font-semibold">
              <Gem className="h-6 w-6 text-primary" />
              <span className='font-bold text-lg'>MESY</span>
            </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 ml-8">
            {mainNavItems.map(item => {
                const isActive = pathname.startsWith(item.href);
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                            isActive && "text-primary font-semibold"
                        )}
                    >
                        {item.name}
                    </Link>
                )
            })}
        </nav>
        
        <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full"><Search className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full"><Mail className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative">
                <Bell className="h-5 w-5"/>
                <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full"><MessageSquare className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full"><Settings className="h-5 w-5"/></Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <button className="h-9 w-9 rounded-full border-2 border-primary/50 overflow-hidden">
                    <Avatar className='h-full w-full'>
                        {userAvatar && <AvatarImage src={userAvatar.imageUrl} />}
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.displayName || user?.email || 'My Account'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                    Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 bg-muted/40">{children}</main>
    </div>
  );
}
