
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clapperboard, Radio, Users, UserPlus, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function SocialiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Timeline', href: '/socialive/timeline', icon: Home, description: 'Your personal feed and updates.' },
    { name: 'Social Video', href: '/socialive/video', icon: Clapperboard, description: 'Discover short videos from the community.' },
    { name: 'Live', href: '/socialive/live', icon: Radio, description: 'Watch or start live broadcasts.' },
    { name: 'Friends', href: '/socialive/friends', icon: Users, description: 'Connect with your friends.' },
    { name: 'Followers', href: '/socialive/followers', icon: UserPlus, description: 'See who follows you.' },
    { name: 'Groups', href: '/socialive/groups', icon: Shield, description: 'Join and create community groups.' },
  ];

  return (
    <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr] gap-8">
            <aside className="-mx-4 md:mx-0">
                <nav className="flex flex-row md:flex-col gap-1 px-2">
                {navItems.map((item) => (
                    <Button
                        key={item.name}
                        asChild
                        variant={pathname === item.href ? 'default' : 'ghost'}
                        className="justify-start"
                    >
                        <Link href={item.href}>
                            <item.icon className="mr-2 h-4 w-4" />
                            <span className="hidden md:inline">{item.name}</span>
                        </Link>
                    </Button>
                ))}
                </nav>
            </aside>
            <main>
                {children}
            </main>
        </div>
    </div>
  );
}
