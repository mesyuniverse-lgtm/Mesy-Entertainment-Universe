
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
  SidebarSeparator,
} from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarNav = [
    { title: 'Dashboard', href: '/dashboard', icon: Home },
    { title: 'Profile', href: '/dashboard/profile', icon: User },
    { title: 'Memberships', href: '/dashboard/memberships', icon: Star },
    { title: 'Payment', href: '/dashboard/payment', icon: Wallet },
    { title: 'Daily Rewards', href: '/dashboard/daily-rewards', icon: Calendar },
    { title: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  ];

  const adminNav = [
    { title: 'Overview', href: '/dashboard/admin', icon: Shield },
    { title: 'Users', href: '/dashboard/admin/users', icon: Users },
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
              <SidebarMenuButton tooltip="Logout" asChild>
                <Link href="/welcome">
                  <LogOut />
                  <span>Logout</span>
                </Link>
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
                    <AvatarImage src={PlaceHolderImages.find(i => i.id === 'default-avatar')?.imageUrl} alt="User Avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Super-admin</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@mesy.io
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/dashboard/profile">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem disabled>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                 <DropdownMenuItem asChild><Link href="/welcome">Logout</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
