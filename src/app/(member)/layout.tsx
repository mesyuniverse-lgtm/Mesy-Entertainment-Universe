'use client';
import Link from 'next/link';
import {
  Bell,
  Home,
  Star,
  Wallet,
  Calendar,
  Shield,
  LogOut,
  Gem,
  User,
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Loader } from 'lucide-react';

const authorizedTestEmails = [
  'tipyatida@gmail.com',
  'divindnft@gmail.com',
  'divaparadises@gmail.com',
  'mayacity2011@gmail.com',
  'g.divaparadise@gmail.com',
  'mesy.universe@gmail.com'
];

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarNav = [
    { title: 'Dashboard', href: '/dashboard', icon: Home },
    { title: 'Profile', href: '/profile', icon: User },
    { title: 'Memberships', href: '/memberships', icon: Star },
    { title: 'Payment', href: '/payment', icon: Wallet },
    { title: 'Daily Rewards', href: '/daily-rewards', icon: Calendar },
    { title: 'Notifications', href: '/notifications', icon: Bell },
  ];
  
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/welcome');
  };

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        router.replace('/login');
        return;
      }
      
      // Re-enable authorization check
      if (!user.email || !authorizedTestEmails.includes(user.email)) {
        router.replace('/member-zones/access-denied');
      }
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user || (user.email && !authorizedTestEmails.includes(user.email))) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background text-white">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Verifying access...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0" asChild>
                    <Link href="/home">
                        <Gem className="h-6 w-6 text-primary" />
                    </Link>
                </Button>
                <div className="flex flex-col text-left">
                    <p className="text-sm font-semibold text-sidebar-foreground font-headline">MESY Universe</p>
                </div>
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {sidebarNav.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton tooltip={item.title} asChild>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          <SidebarMenu className="mt-auto">
             <SidebarMenuItem>
                <SidebarMenuButton tooltip="Admin Panel" asChild variant="outline">
                    <Link href="/admin">
                        <Shield />
                        <span>Admin Panel</span>
                    </Link>
                </SidebarMenuButton>
             </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Logout" onClick={handleLogout}>
                  <LogOut />
                  <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-secondary/20">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="sm:hidden"/>
            <div className="flex-1" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.photoURL || undefined} alt="User Avatar" />
                    <AvatarFallback>{user?.email?.[0].toUpperCase() || 'A'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.displayName || 'Admin'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem disabled>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                 <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
