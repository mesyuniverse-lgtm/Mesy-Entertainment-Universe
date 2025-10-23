'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Gem } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogOut, LayoutDashboard, UserCircle, LogIn } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { name: 'Socialive', href: '/socialive' },
    { name: 'Entertainment', href: '/entertainment' },
    { name: 'AI Hub', href: '/ai-hub' },
    { name: 'Shopping Hub', href: '/shopping' },
    { name: 'Member Zones', href: '/member-zones' },
    { name: 'Developer Zone', href: '/developer-zone' },
  ];

  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/welcome');
  };

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
                 <Button asChild variant="link">
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
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.photoURL || undefined} alt="User Avatar" />
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
                    <DropdownMenuItem asChild><Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4"/>Dashboard</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/dashboard/profile"><UserCircle className="mr-2 h-4 w-4"/>Profile</Link></DropdownMenuItem>
                    <DropdownMenuSeparator />
                     <DropdownMenuItem onClick={handleLogout}><LogOut className="mr-2 h-4 w-4"/>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild>
                  <Link href="/login"><LogIn className="mr-2 h-4 w-4" />Login</Link>
                </Button>
              )
            )}
            <Button asChild>
                            <Link href="/signup">Register</Link>
            </Button>
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
                      <Button asChild variant="link">
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
