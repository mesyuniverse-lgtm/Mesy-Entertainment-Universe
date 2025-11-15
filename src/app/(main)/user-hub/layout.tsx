'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, LogOut, Menu, Shield, ShoppingCart, User, Users, Video, UserPlus, Rss } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function UserHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const auth = useAuth();
  const { user } = useUser(auth);
  const router = useRouter();
  const pathname = usePathname();
  const userRole = user?.email === 'mesy.universe@gmail.com' ? 'Super-admin' : user?.email === 'member@mesy.io' ? 'Member' : 'User';

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
    router.push('/welcome');
  };

  const userHubNavLinks = [
    { href: '/user-hub', label: 'User Hub', icon: <Users /> },
    { href: '/profile', label: 'Profile', icon: <User /> },
    { href: '/live', label: 'Live', icon: <Video /> },
    { href: '/friends', label: 'Friend', icon: <Users /> },
    { href: '/followers', label: 'Follower', icon: <UserPlus /> },
    { href: '/following', label: 'Following', icon: <Rss /> },
    { href: '/shopping', label: 'Shopping', icon: <ShoppingCart /> },
  ];


  return (
    <div className="flex flex-col h-screen bg-background">
      <header 
        className="relative flex h-16 items-center gap-4 border-b border-primary/10 bg-black/30 px-4 lg:px-6 shadow-lg shadow-primary/5"
        style={{
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(var(--primary)/0.15), transparent)'
        }}
      >
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="shrink-0 bg-transparent border-primary/20">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle navigation menu</span>
                  </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col bg-background/80 backdrop-blur-sm border-r-primary/20">
                   <nav className="grid gap-2 text-lg font-medium">
                      {userHubNavLinks.map(link => (
                           <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-primary flex items-center gap-3 py-2">
                            {link.icon}
                            {link.label}
                           </Link>
                      ))}
                   </nav>
              </SheetContent>
          </Sheet>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:gap-6 text-sm z-10">
             {userHubNavLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={cn("flex items-center gap-1.5 transition-colors hover:text-primary", pathname === link.href ? "text-primary font-semibold" : "text-muted-foreground")}>
                      {link.icon}
                      {link.label}
                  </Link>
              ))}
          </div>
          
          <div className="w-full flex-1" />

          {/* Right side actions */}
          <div className="flex items-center gap-2 z-10">
              <Button asChild variant="destructive" className="bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg hidden sm:flex">
                  <Link href="/member-signup">UPGRADE</Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Welcome to the User Hub!</DropdownMenuItem>
                    <DropdownMenuItem>3D crystal effect will be back soon!</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="rounded-full bg-background/50 hover:bg-secondary">
                          <Avatar className="h-8 w-8">
                              <AvatarImage src={user?.photoURL || undefined} />
                              <AvatarFallback>
                                  {user?.email?.[0].toUpperCase()}
                              </AvatarFallback>
                          </Avatar>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                          {userRole === 'Member' ? <Shield className="mr-2 h-4 w-4" /> : <User className="mr-2 h-4 w-4" />}
                          {userRole} Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                      </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
          </div>
      </header>

      <div className="bg-black/20 text-xs text-muted-foreground py-1.5 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
              <span className="mx-4">Aria has received a Legendary Item: Shadowfire Bow! ✨</span>
              <span className="mx-4">Kael reached Level 15! 🚀</span>
              <span className="mx-4">New items available in the shop!</span>
              <span className="mx-4">Live event starting in 1 hour!</span>
               <span className="mx-4">Aria has received a Legendary Item: Shadowfire Bow! ✨</span>
              <span className="mx-4">Kael reached Level 15! 🚀</span>
          </div>
      </div>
       <style jsx>{`
          @keyframes marquee {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
          }
          .animate-marquee {
              display: inline-block;
              animation: marquee 20s linear infinite;
          }
      `}</style>
      
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
