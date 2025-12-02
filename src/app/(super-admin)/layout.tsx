'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Home,
  Users,
  LineChart,
  Package,
  Settings,
  Shield,
  Bot,
  Palette,
  CreditCard,
  LogOut,
  Gem,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useUser, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const navItems = [
  { href: '/sup-dashboard', icon: <Home className="h-4 w-4" />, label: 'Dashboard' },
  { href: '/monitor', icon: <Eye className="h-4 w-4" />, label: 'Universe Monitor' },
  { href: '/accounting', icon: <CreditCard className="h-4 w-4" />, label: 'Accounting' },
  { href: '/ai-system', icon: <Bot className="h-4 w-4" />, label: 'AI System' },
  { href: '/sup-studo', icon: <Palette className="h-4 w-4" />, label: 'UI/UX Studio' },
];

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    if (auth) {
      await auth.signOut();
      router.push('/welcome');
    }
  };
  
  const userAvatar = PlaceHolderImages.find((i) => i.id === 'default-avatar');

  // A simple role check - in a real app, this would be more robust
  if (user && user.email !== 'mesy.universe@gmail.com') {
      // Redirect non-admin users
      if(typeof window !== 'undefined') router.push('/dashboard');
      return null;
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Gem className="h-6 w-6 text-primary" />
              <span className="font-bold">MESY (SA)</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    pathname === item.href && 'bg-muted text-primary'
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
             <Card>
                <CardHeader className="p-2 pt-0 md:p-4">
                  <Avatar className="w-12 h-12 border-2 border-primary">
                    <AvatarImage src={userAvatar?.imageUrl} />
                    <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'A'}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{user?.email}</CardTitle>
                  <CardDescription>Super-admin</CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button size="sm" className="w-full" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4"/>
                    Sign Out
                  </Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {/* Mobile Header would go here if needed */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
