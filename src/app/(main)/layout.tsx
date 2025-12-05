'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Gem,
  PanelLeft,
  Search,
  Settings,
  User,
  LogOut,
  Bell,
  Home,
  Users as UsersIcon,
  ShoppingBag,
  Gamepad2,
  Brush
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useAuth, useUser } from '@/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase/client-provider';
import './globals.css';

const navLinks = [
  { href: '/home', icon: Home, text: 'Home' },
  { href: '/social', icon: UsersIcon, text: 'Social' },
  { href: '/entertainment', icon: Gamepad2, text: 'Entertainment' },
  { href: '/shopping-hub', icon: ShoppingBag, text: 'Shopping' },
  { href: '/ai-hub', icon: Brush, text: 'AI Hub' },
];

function AppHeader() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find((i) => i.id === 'default-avatar');

  const handleSignOut = async () => {
    if (auth) {
      await auth.signOut();
      router.push('/welcome');
    }
  };
  
  return (
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/40 bg-card/80 backdrop-blur-lg px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Gem className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg hidden sm:inline-block">MESY</span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center justify-center gap-2">
          {navLinks.map((link) => (
            <Link key={link.text} href={link.href}>
              <Button
                variant={pathname.startsWith(link.href) ? 'secondary' : 'ghost'}
                className="flex flex-col h-auto p-2"
              >
                <link.icon className="h-5 w-5" />
                <span className="text-xs mt-1">{link.text}</span>
              </Button>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 md:gap-4 ml-auto">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[200px] md:w-[200px] lg:w-[300px]"
            />
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer border-2 border-primary/50">
                  <AvatarImage src={user.photoURL || userAvatar?.imageUrl} />
                  <AvatarFallback>{user.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.displayName || user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard')}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </header>
  );
}

function AppFooter() {
    return (
        <footer className="border-t border-border/40 bg-card/50">
            <div className="container py-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <Gem className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">MESY UNIVERSE</span>
                </div>
                <nav className="flex flex-wrap gap-4 md:gap-6 justify-center">
                    <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link>
                    <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link>
                    <Link href="/member-plan" className="text-sm text-muted-foreground hover:text-foreground">Plan</Link>
                    <Link href="/developers" className="text-sm text-muted-foreground hover:text-foreground">Developers</Link>
                    <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
                    <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
                </nav>
                <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} MESY. All rights reserved.</p>
            </div>
        </footer>
    );
}

function InnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noHeaderFooterRoutes = [
    '/login', 
    '/signup', 
    '/confirm-form', 
    '/superadmin-login', 
    '/the-gate',
    '/loading'
  ];
  // Check if current path starts with any of the routes that should not have header/footer
  const showHeaderFooter = !noHeaderFooterRoutes.some(route => pathname.startsWith(route));

  return (
    <div className="flex min-h-screen flex-col">
      {showHeaderFooter && <AppHeader />}
      <main className="flex-1">{children}</main>
      {showHeaderFooter && <AppFooter />}
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID" crossOrigin="anonymous"></script>
      </head>
      <body className="font-body">
        <FirebaseClientProvider>
          <InnerLayout>{children}</InnerLayout>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}