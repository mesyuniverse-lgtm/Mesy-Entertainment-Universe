
'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/firebase';
import { Loader, Gem, LayoutDashboard, UserCircle, Wallet, Bell, Gift, Settings, Shield, LogOut, Menu, Home, Star, Camera, History, MessageCircle, Store, ShoppingBasket, Hammer, Cloud, Package, Orbit, Shirt } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const MemberIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 text-purple-400 bg-background/80 rounded-full p-0.5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#8A2BE2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8.5" cy="7" r="4" stroke="#8A2BE2" strokeWidth="2"/>
        <path d="M18 8a2 2 0 0 1 2-2" stroke="#8A2BE2" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 6a6 6 0 0 1 0 12" stroke="#8A2BE2" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const sidebarNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'MESY Universe', href: '/universe', icon: Orbit },
  { name: 'Profile', href: '/profile', icon: UserCircle },
  { name: 'Timeline', href: '/timeline', icon: History },
  { name: 'Community', href: '/community', icon: MessageCircle },
  { name: 'Customize', href: '/customize', icon: Shirt },
  { name: 'Bag', href: '/bag', icon: ShoppingBasket },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Cloud', href: '/cloud', icon: Cloud },
  { name: 'Build', href: '/build', icon: Hammer },
  { name: 'Shop', href: '/shop', icon: Store },
  { name: 'Market', href: '/market', icon: Wallet },
  { name: 'Member System', href: '/member-zones/member-inside/member-dashboard/member-system', icon: Shield },
  { name: 'Daily Rewards', href: '/daily-rewards', icon: Gift },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Admin', href: '/admin', icon: Shield, adminOnly: true },
];

const MemberLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth();
  const userProfileImage = PlaceHolderImages.find(i => i.id === 'female-archer-1');


  useEffect(() => {
    // If not loading and no user, redirect to login page.
    if (!isUserLoading && !user) {
      router.replace('/member-login');
    }
    
    // This is a simple role-based access control for demonstration.
    // In a real application, you would fetch the user's role from your database (e.g., Firestore).
    const mockUserRole = user?.email === 'admin@mesy.io' ? 'Admin' : 'Member';
    
    if (!isUserLoading && user) {
        if (pathname.startsWith('/admin') && mockUserRole !== 'Admin') {
            router.replace('/access-denied');
        }
    }

  }, [user, isUserLoading, router, pathname]);

  const handleLogout = async () => {
    if(auth) {
        await signOut(auth);
    }
    router.push('/welcome');
  };

  // Render a loading state while checking for user authentication
  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const userRole = user?.email === 'admin@mesy.io' ? 'Admin' : 'Member';
  const isMember = user && (userRole === 'Admin' || userRole === 'Member');


  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/home" className="flex items-center gap-2 font-semibold">
              <Gem className="h-6 w-6 text-primary" />
              <span className="font-headline">MESY MEMBER</span>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {sidebarNavItems.map((item) => {
                if (item.adminOnly && userRole !== 'Admin') return null;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      pathname.startsWith(item.href) && item.href !== '/dashboard' ? 'bg-muted text-primary' : pathname === item.href ? 'bg-muted text-primary' : '',
                      pathname === '/dashboard' && item.href === '/dashboard' ? 'bg-muted text-primary' : ''
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
           <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium overflow-y-auto">
                <Link
                  href="/home"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <Gem className="h-6 w-6 text-primary" />
                  <span className="font-headline">MESY MEMBER</span>
                </Link>
                 {sidebarNavItems.map((item) => {
                    if (item.adminOnly && userRole !== 'Admin') return null;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                            "flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                             pathname.startsWith(item.href) && item.href !== '/dashboard' ? 'bg-muted text-foreground' : pathname === item.href ? 'bg-muted text-foreground' : '',
                             pathname === '/dashboard' && item.href === '/dashboard' ? 'bg-muted text-foreground' : ''
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    )
                 })}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
             {/* Can add a search bar here if needed */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL || userProfileImage?.imageUrl} alt="@shadcn" />
                  <AvatarFallback>{user?.email?.[0].toUpperCase() ?? 'M'}</AvatarFallback>
                </Avatar>
                 {isMember ? (
                    <>
                    <MemberIcon />
                    <div className="absolute bottom-0 right-0 bg-background/80 rounded-full p-0.5">
                        <Camera className="h-3 w-3 text-white" />
                    </div>
                    </>
                ) : null}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.displayName || 'mesy.universe@gmail.com'}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                <Link href="/home">
                  <Home className="mr-2 h-4 w-4" />
                  <span>MESY Home</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={"/profile"}>
                  <UserCircle className="mr-2 h-4 w-4"/>Profile
                </Link>
              </DropdownMenuItem>
               <DropdownMenuItem asChild>
                <Link href="/member-plan">
                  <Star className="mr-2 h-4 w-4" />
                  <span>Member Plan</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MemberLayout;
