'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Gem } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogOut, Star, ShoppingBag, Bot, Users, Home, User, Video, Clapperboard, Rss } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
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
    { name: 'Social', href: '/socialive', icon: <Video/> },
    { name: 'Friends', href: '/friends', icon: <UserPlus/> },
    { name: 'Followers', href: '/followers', icon: <Rss/> },
    { name: 'Shopping', href: '/shopping', icon: <ShoppingBag/> },
    { name: 'AI', href: '/ai-hub', icon: <Bot/> },
  ];

  const memberEmails = ['admin@mesy.io', 'tipyatida@gmail.com', 'mesy.universe@gmail.com'];
  const isMember = user && user.email && memberEmails.includes(user.email);

  useEffect(() => {
    if (isUserLoading) return; // Wait until user status is resolved

    if (!user) {
      router.replace('/login');
    } else if (isMember) {
      // If user is a member, redirect them to the member dashboard
      router.replace('/dashboard');
    }
  }, [user, isUserLoading, isMember, router]);

  const handleLogout = async () => {
    if (auth) {
        await signOut(auth);
    }
    router.push('/welcome');
  };
  
  // Display a loading spinner while checking auth state or if user is not a regular user
  if (isUserLoading || !user || isMember) {
      return (
          <div className="flex h-screen items-center justify-center bg-background">
              <Loader className="h-12 w-12 animate-spin text-primary" />
          </div>
      );
  }

  // Render the layout for regular users
  return (
    <div className="flex min-h-screen flex-col bg-background/95">
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <div className="mr-4 flex items-center">
            <Link href="/home" className="mr-6 flex items-center space-x-2">
              <Gem className="h-6 w-6 text-primary" />
            </Link>
             <nav className="hidden items-center gap-6 text-sm md:flex">
                <Link
                  href="/users"
                  className="flex items-center gap-2 transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  <Avatar className="h-6 w-6 border-2 border-primary/50">
                    <AvatarImage src={user.photoURL || userProfileImage?.imageUrl} alt="User Avatar" />
                    <AvatarFallback>{user.email?.[0].toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                  USER
                </Link>

              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {item.icon} {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button asChild>
                <Link href="/member-signup"><Star className="mr-2 h-4 w-4"/>Become a Member</Link>
            </Button>
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
                             <Link href="/users/profile" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">USER</Link>
                            {mainNavItems.map((item) => (
                                <Link key={item.name} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                    {item.icon} {item.name}
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
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
