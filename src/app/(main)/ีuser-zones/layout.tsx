'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Gem } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogOut, LayoutDashboard, UserCircle, Settings, Star } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import React, { useEffect } from 'react';
import { Loader } from 'lucide-react';

export default function UsersDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  
  const userProfileImage = PlaceHolderImages.find(i => i.id === 'female-archer-1');

  const mainNavItems = [
    { name: 'Users Zone', href: '/user-zones' },
    { name: 'Socialive', href: '/socialive' },
    { name: 'Entertainment', href: '/entertainment' },
    { name: 'AI Hub', href: '/ai-hub' },
    { name: 'Shopping Hub', href: '/shopping' },
    { name: 'Member Zones', href: '/member-zones/member-portal' },
    { name: 'Developer Zone', href: '/developer-zone' },
  ];

  const adminEmail = 'admin@mesy.io';
  const superAdminEmail = 'mesy.universe@gmail.com';
  const memberEmails = [adminEmail, 'tipyatida@gmail.com', superAdminEmail];

  useEffect(() => {
    if (isUserLoading) return;

    if (!user) {
        router.replace('/login');
    } else if (memberEmails.includes(user.email || '')) {
        router.replace('/the-door');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    if (auth) {
        await signOut(auth);
    }
    router.push('/welcome');
  };
  
  if (isUserLoading || !user || memberEmails.includes(user.email ?? '')) {
      return (
          <div className="flex h-screen items-center justify-center bg-background">
              <Loader className="h-12 w-12 animate-spin text-primary" />
          </div>
      );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <div className="mr-4 flex items-center">
            <Link href="/home" className="mr-6 flex items-center space-x-2">
              <Gem className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline sm:inline-block">
                MESY
              </span>
            </Link>
             <nav className="hidden items-center gap-6 text-sm md:flex">
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9 border-2 border-primary/50">
                    <AvatarImage src={user.photoURL || userProfileImage?.imageUrl} alt="User Avatar" />
                    <AvatarFallback>{user.email?.[0].toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/users"><LayoutDashboard className="mr-2 h-4 w-4"/>Dashboard</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/users/profile"><UserCircle className="mr-2 h-4 w-4"/>Profile</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/member-signup" className="text-primary focus:text-primary"><Star className="mr-2 h-4 w-4"/>Upgrade to Member</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/users/settings"><Settings className="mr-2 h-4 w-4"/>Setting</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}><LogOut className="mr-2 h-4 w-4"/>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <Menu className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                   <nav className="grid gap-4 text-lg font-medium mt-8">
                       {user && (
                         <div className="flex flex-col items-start gap-2 px-4 mb-4">
                            <p className="text-lg font-semibold">{user.displayName || 'User'}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                            {mainNavItems.map((item) => (
                                <Link key={item.name} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-auto flex flex-col gap-4 pt-4">
                            <Button variant="outline" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4"/> Logout</Button>
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6 lg:py-8">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
}
