'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Gem } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogOut, LayoutDashboard, UserCircle, LogIn, Camera } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const MemberIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 text-purple-400 bg-background/80 rounded-full p-0.5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#8A2BE2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8.5" cy="7" r="4" stroke="#8A2BE2" strokeWidth="2"/>
        <path d="M18 8a2 2 0 0 1 2-2" stroke="#8A2BE2" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 6a6 6 0 0 1 0 12" stroke="#8A2BE2" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);


export default function TimelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { name: 'Socialive', href: '/socialive' },
    { name: 'Entertainment', href: '/entertainment' },
    { name: 'AI Hub', href: '/ai-hub' },
    { name: 'Shopping Hub', href: '/shopping' },
    { name: 'Member Zones', href: '/dashboard' },
    { name: 'Developer Zone', href: '/developer-zone' },
  ];

  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const userProfileImage = PlaceHolderImages.find(i => i.id === 'female-archer-1');


  const handleLogout = async () => {
    if (auth) {
        await signOut(auth);
    }
    router.push('/welcome');
  };

  const isMember = user?.email === 'admin@mesy.io';

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <div className="mr-4 flex items-center">
            <Link href="/home" className="mr-6 flex items-center space-x-2">
              <Gem className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline sm:inline-block">
                MESY
              </span>
            </Link>
            <nav className="hidden items-center gap-6 text-sm md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {item.name}
                </Link>
              ))}
                 <Button asChild variant="link" className="text-lg">
                    <Link href="/welcome">Back🎉</Link>
                </Button>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
             {!isUserLoading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                        <Avatar className="h-9 w-9 border-2 border-primary/50">
                          <AvatarImage src={user.photoURL || userProfileImage?.imageUrl} alt="User Avatar" />
                          <AvatarFallback>{user.email?.[0].toUpperCase() || 'U'}</AvatarFallback>
                        </Avatar>
                       {isMember ? (
                          <>
                            <MemberIcon />
                            <div className="absolute bottom-0 right-0 bg-background/80 rounded-full p-0.5">
                                <Camera className="h-3 w-3 text-white" />
                            </div>
                          </>
                      ) : null}
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
                     <DropdownMenuItem asChild>
                      <Link href={isMember ? "/dashboard" : "/users"}>
                        <LayoutDashboard className="mr-2 h-4 w-4"/>Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={isMember ? "/profile" : "/users"}>
                        <UserCircle className="mr-2 h-4 w-4"/>Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                     <DropdownMenuItem onClick={handleLogout}><LogOut className="mr-2 h-4 w-4"/>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button asChild variant="ghost">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Register</Link>
                  </Button>
                </>
              )
            )}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                        <Menu className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <nav className="grid gap-6 text-lg font-medium mt-16">
                        {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="hover:text-foreground/80 text-foreground/60"
                        >
                          {item.name}
                        </Link>
                      ))}
                      <Button asChild variant="link" className="text-lg">
                        <Link href="/welcome">Back🎉</Link>
                      </Button>
                    </nav>
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="py-6 md:px-8 md:py-0 bg-secondary/20">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} MESY Entertainment Universe. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
