'use client';

import React from 'react';
import Link from 'next/link';
import {
  Bell,
  Gem,
  Home,
  LayoutGrid,
  Users,
  Calculator,
  CreditCard,
  Wallet,
  ArrowRightLeft,
  History,
  Send,
  PanelLeft,
  Search,
  Settings,
  User,
  LogOut,
  Mail,
  MessageSquare,
  Landmark,
  FileClock
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useAuth, useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';


const mainNavItems = [
    {name: 'Dashboard', href: '/dashboard', icon: <Home />},
    {name: 'Schedule Posts', href: '#', icon: <LayoutGrid />},
    {name: 'Downline', href: '/members', icon: <Users />},
    {name: 'Income', href: '#', icon: <Calculator />},
    {name: 'Billing', href: '#', icon: <CreditCard />},
];

const walletNavItems = [
    {name: 'My Wallet', href: '#', icon: <Wallet />},
]

export default function MemberLayout({
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
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/40 bg-card px-4 md:px-6">
        
        <div className='flex items-center gap-2'>
           <Link href="/home" className="flex items-center gap-2 font-semibold">
              <Gem className="h-6 w-6 text-primary" />
              <span className='font-bold text-lg'>MESY</span>
            </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1.5">
            {mainNavItems.map(item => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground",
                            isActive && "bg-primary/20 text-primary-foreground shadow-inner shadow-primary/20"
                        )}
                    >
                        {React.cloneElement(item.icon, { className: "h-4 w-4"})}
                        {item.name}
                    </Link>
                )
            })}
        </nav>
        
        {walletNavItems.length > 0 && <div className="hidden h-8 w-px bg-border/50 md:block mx-4"></div>}

        <nav className="hidden md:flex items-center gap-1.5">
             {walletNavItems.map(item => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground",
                             isActive && "text-foreground"
                        )}
                    >
                        {React.cloneElement(item.icon, { className: "h-4 w-4"})}
                        {item.name}
                    </Link>
                )
            })}
        </nav>


        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
             <nav className="grid gap-2 text-base font-medium">
                {[...mainNavItems, ...walletNavItems].map(item => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname === item.href && "bg-muted text-primary"
                        )}
                    >
                         {React.cloneElement(item.icon, { className: "h-5 w-5"})}
                        {item.name}
                    </Link>
                ))}
             </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full"><FileClock className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative">
                <Bell className="h-5 w-5"/>
                <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
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
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
             <Button variant="ghost" className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Settings className="h-5 w-5"/>
                Settings
             </Button>
        </div>
      </header>
      <main className="flex-1 bg-muted/40">{children}</main>
    </div>
  );
}
