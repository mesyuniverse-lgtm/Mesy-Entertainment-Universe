
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Gem, LogOut, Menu, Shield, ShoppingCart, User, MessageSquare } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function UserHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const auth = useAuth();
  const { user } = useUser(auth);
  const router = useRouter();
  const userImage = PlaceHolderImages.find(p => p.id === 'female-archer-1');
  const userRole = user?.email === 'mesy.universe@gmail.com' ? 'Super-admin' : user?.email === 'member@mesy.io' ? 'Member' : 'User';

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
    router.push('/welcome');
  };

  const navLinks = [
    { href: '/user-hub', label: 'User Hub' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/socialive', label: 'Socialive' },
    { href: '/memberships', label: 'Membership' },
    { href: '/shop', label: 'Shop' },
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex h-14 items-center gap-4 border-b border-border/20 bg-background/50 px-4 lg:h-[60px] lg:px-6">
          <Link href="/welcome" className="flex items-center gap-2 font-semibold">
              <Gem className="h-6 w-6 text-primary" />
              <span className="font-headline">MESY</span>
          </Link>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="shrink-0">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle navigation menu</span>
                  </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col bg-background/80 backdrop-blur-sm">
                   <nav className="grid gap-2 text-lg font-medium">
                      <Link href="/welcome" className="flex items-center gap-2 text-lg font-semibold mb-4">
                          <Gem className="h-6 w-6 text-primary" />
                          <span>MESY</span>
                      </Link>
                      {navLinks.map(link => (
                           <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-primary">{link.label}</Link>
                      ))}
                   </nav>
              </SheetContent>
          </Sheet>
          </div>
          
          <div className="w-full flex-1" />

          <Button asChild variant="destructive" className="bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg hidden sm:flex">
              <Link href="/member-signup">UPGRADE</Link>
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
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
