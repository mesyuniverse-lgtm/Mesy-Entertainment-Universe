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
    {name: 'MEMBERS', href: '/members'},
    {name: 'SOCIAL', href: '/social'},
    {name: 'ENTERTAINMENT', href: '/entertainment'},
    {name: 'CONNECTIONS', href: '/connections'},
    {name: 'AI HUB', href: '/ai-hub'},
    {name: 'SHOPPING HUB', href: '/shopping-hub'},
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
      <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-primary/20 bg-gradient-to-r from-background to-primary/10 px-4 drop-shadow-[0_4px_15px_rgba(var(--primary-rgb),0.1)] sm:px-6">
        
        <div className='flex items-center gap-6'>
           <Link href="/home" className="flex items-center gap-2 font-semibold">
              <Gem className="h-8 w-8 text-primary drop-shadow-[0_0_5px_hsl(var(--primary))]" />
              <span className='text-xl'>MESY</span>
            </Link>
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                {memberNavItems.map(item => (
                    <Link
                        key={item.name}
                        href={item.href}
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
                        href={item.href}
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-1 ml-auto">
            <Button variant="ghost" size="icon" className="h-10 w-10 bg-black/20 hover:bg-black/40"><Search className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 bg-black/20 hover:bg-black/40"><Mail className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 bg-black/20 hover:bg-black/40"><Bell className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 bg-black/20 hover:bg-black/40"><MessageSquare className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 bg-black/20 hover:bg-black/40"><Settings className="h-5 w-5"/></Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
             <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full ml-2 h-12 w-12 border-2 border-primary/50 bg-black/20 hover:bg-black/40"
              >
                <User className="h-6 w-6" />
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
