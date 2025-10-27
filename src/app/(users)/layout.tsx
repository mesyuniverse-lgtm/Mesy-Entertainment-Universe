'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Gem } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogOut, LayoutDashboard, UserCircle, LogIn, Bell, Wallet, History, Settings, Calendar, Home, Star } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const MemberIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 text-purple-400 bg-background/80 rounded-full p-0.5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#8A2BE2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8.5" cy="7" r="4" stroke="#8A2BE2" strokeWidth="2"/>
        <path d="M18 8a2 2 0 0 1 2-2" stroke="#8A2BE2" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 6a6 6 0 0 1 0 12" stroke="#8A2BE2" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export default function UsersDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  
  const userProfileImage = PlaceHolderImages.find(i => i.id === 'female-archer-1');

  const sidebarNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile', href: '/users', icon: UserCircle },
    { name: 'My Timeline', href: '/timeline', icon: Calendar },
    { name: 'Payment', href: '/payment', icon: Wallet },
    { name: 'Notification', href: '/notifications', icon: Bell },
    { name: 'History', href: '/history', icon: History },
    { name: 'Setting', href: '/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    if (auth) {
        await signOut(auth);
    }
    router.push('/welcome');
  };

  const isMember = user && !user.isAnonymous; // Example logic: any signed-in user is a "member"

  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <div className="mr-4 flex items-center">
            <Link href="/home" className="mr-6 flex items-center space-x-2">
              <Gem className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline sm:inline-block">
                MESY
              </span>
            </Link>
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
                      {isMember && <MemberIcon />}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.displayName || 'Sonya\'z G'}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild><Link href="/home"><Home className="mr-2 h-4 w-4"/>MESY Home</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/users"><UserCircle className="mr-2 h-4 w-4"/>Profile</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/member-plan"><Star className="mr-2 h-4 w-4"/>Member Plan</Link></DropdownMenuItem>
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
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <Menu className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-4 text-lg font-medium mt-16">
                        {sidebarNavItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                              pathname === item.href && "text-primary bg-muted"
                            )}
                          >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                          </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      {/* Dashboard Layout */}
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {/* Sidebar */}
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block">
            <div className="h-full py-6 pr-6 lg:py-8">
                <nav className="relative flex flex-col gap-2">
                    {sidebarNavItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50",
                          pathname === item.href && "text-primary bg-muted"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    ))}
                </nav>
            </div>
        </aside>

        {/* Main Content */}
        <main className="relative py-6 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
