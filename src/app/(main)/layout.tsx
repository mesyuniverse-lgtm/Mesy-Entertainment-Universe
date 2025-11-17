'use client';

import React from 'react';
import Link from 'next/link';
import {
  Bell,
  Gem,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
  PanelLeft,
  Search,
  Settings,
  User,
  LogOut,
  Mail,
  MessageSquare
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useAuth, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';

const memberNavItems = [
    {name: 'MEMBERS'},
    {name: 'SOCIAL'},
    {name: 'ENTERTAINMENT'},
    {name: 'CONNECTIONS'},
    {name: 'AI HUB'},
    {name: 'SHOPPING HUB'},
]

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    if (auth) {
      await auth.signOut();
      router.push('/welcome');
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        
        <div className='flex items-center gap-4'>
           <Link href="/home" className="flex items-center gap-2 font-semibold">
              <Gem className="h-6 w-6 text-primary" />
              <span>MESY</span>
            </Link>
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                {memberNavItems.map(item => (
                    <Link
                        key={item.name}
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>


        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <Gem className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">MESY</span>
              </Link>
              {memberNavItems.map(item => (
                    <Link
                        key={item.name}
                        href="#"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon"><Search className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon"><Mail className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon"><MessageSquare className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon"><Settings className="h-5 w-5"/></Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
             <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full ml-2"
              >
                <User className="h-5 w-5" />
              </Button>
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
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
