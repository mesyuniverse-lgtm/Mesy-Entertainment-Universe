

'use client';

import Link from 'next/link';
import {
  Bell,
  Home,
  Users,
  Star,
  Wallet,
  Calendar,
  Shield,
  Code,
  LogOut,
  Gem,
  User,
  UserPlus,
  Settings,
  FileLock,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
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
  SidebarSeparator,
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/welcome');
    }
  };

  const sidebarNav = [
    { title: 'Dashboard', href: '/dashboard', icon: Home },
    { title: 'Public Profile', href: '/dashboard/profile', icon: User },
    { title: 'Private Profile', href: '/dashboard/settings/private-profile', icon: FileLock },
    { title: 'Payment', href: '/dashboard/payment', icon: Wallet },
    { title: 'Daily Rewards', href: '/dashboard/daily-rewards', icon: Calendar },
    { title: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    { title: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const adminNav = [
    { title: 'Overview', href: '/dashboard/admin', icon: Shield },
    { title: 'Users', href: '/dashboard/admin/users', icon: Users },
    { title: 'Members', href: '/dashboard/admin/members', icon: UserPlus },
  ]

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
          
          <SidebarSeparator />

          <SidebarMenu>
             <p className="px-4 text-xs text-muted-foreground uppercase tracking-wider mb-2">Admin</p>
            {adminNav.map((item) => (
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

        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Logout" asChild onClick={handleLogout}>
                <button>
                  <LogOut />
                  <span>Logout</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-secondary/20">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="sm:hidden"/>
            <div className="flex-1" />
            {loading ? (
                 <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
            ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User Avatar'} />
                    <AvatarFallback>{user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || 'Admin'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/member-zones/profile">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem disabled>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                 <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            ) : null}
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
