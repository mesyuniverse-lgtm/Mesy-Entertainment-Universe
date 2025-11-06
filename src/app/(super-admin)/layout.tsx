
'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser, useAuth } from '@/firebase';
import { Loader, Gem, LayoutDashboard, UserCircle, Bell, Settings, LogOut, Menu, BarChart, FileText, Bot, Brush, Monitor, Calculator, Home, Shield, Code, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { signOut } from 'firebase/auth';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import styles from './super-admin.module.css';

const sidebarNavItems = [
  { name: 'Dashboard', href: '/sup-dashboard', icon: LayoutDashboard },
  { name: 'Monitor', href: '/monitor', icon: Monitor },
  { name: 'Analysis', href: '/analysis', icon: BarChart },
  { name: 'Accounting', href: '/accounting', icon: Calculator },
  { name: 'Reports', href: '/report', icon: FileText },
  { name: 'Notifications', href: '/notification', icon: Bell },
  { name: 'AI System', href: '/ai-system', icon: Bot },
  { name: 'UI/UX Studio', href: '/sup-studo', icon: Brush },
  { name: 'Settings', href: '/sup-setting', icon: Settings },
  { name: 'Profile', href: '/sup-profile', icon: UserCircle },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth();
  const userProfileImage = PlaceHolderImages.find(i => i.id === 'dragon-1');
  const SUPER_ADMIN_EMAIL = 'mesy.universe@gmail.com';

  useEffect(() => {
    if (!isUserLoading && (!user || user.email !== SUPER_ADMIN_EMAIL)) {
      router.replace('/member-login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
    router.push('/welcome');
  };

  if (isUserLoading || !user || user.email !== SUPER_ADMIN_EMAIL) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <Loader className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className={cn("grid min-h-screen w-full md:grid-cols-[280px_1fr]", styles.supAdminLayout)}>
      <aside className="hidden border-r bg-black/30 backdrop-blur-sm md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b border-primary/20 px-4 lg:h-[60px] lg:px-6">
            <Link href="/sup-dashboard" className="flex items-center gap-2 font-semibold text-white">
              <Gem className="h-6 w-6 text-primary" />
              <span className="font-headline">SUPER ADMIN</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {sidebarNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10",
                    pathname === item.href && "bg-primary/10 text-primary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </aside>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-black/30 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-transparent border-primary/50 text-white">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className={cn("flex flex-col bg-black/80 border-r-primary/30 text-white", styles.supAdminLayout)}>
              <nav className="grid gap-2 text-lg font-medium">
                <Link href="/sup-dashboard" className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <Gem className="h-6 w-6 text-primary" />
                  <span className="font-headline">SUPER ADMIN</span>
                </Link>
                {sidebarNavItems.map((item) => (
                  <Link key={item.name} href={item.href} className="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-primary">
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full bg-black/50">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL || userProfileImage?.imageUrl} />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Super Admin</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
               <DropdownMenuItem asChild><Link href="/home"><Home className="mr-2 h-4 w-4"/>Home</Link></DropdownMenuItem>
               <DropdownMenuItem asChild><Link href="#"><Shield className="mr-2 h-4 w-4"/>MESY Members</Link></DropdownMenuItem>
               <DropdownMenuItem asChild><Link href="/developer-zone"><Code className="mr-2 h-4 w-4"/>Developers</Link></DropdownMenuItem>
               <DropdownMenuItem asChild><Link href="#"><Users className="mr-2 h-4 w-4"/>Teams</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
