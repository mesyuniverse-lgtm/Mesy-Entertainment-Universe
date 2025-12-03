'use client';

import React from 'react';
import {
  LayoutDashboard,
  User,
  Palette,
  Users2,
  Landmark,
  ShoppingCart,
  Store,
  Globe,
  Star,
  Users as TeamsIcon,
  Code,
  Bot,
  Eye,
  BarChart2,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';

const adminSystems = [
  { href: '/sup-dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
  { href: '/sup-profile', icon: <User />, label: 'Profile' },
  { href: '/sup-studo', icon: <Palette />, label: 'UI/UX Studio' },
  { href: '#', icon: <Users2 />, label: 'Accounts System' },
  { href: '/accounting', icon: <Landmark />, label: 'Finance System' },
  { href: '#', icon: <ShoppingCart />, label: 'Shop System' },
  { href: '#', icon: <Store />, label: 'Markets System' },
  { href: '#', icon: <Globe />, label: 'Web System' },
  { href: '/members/systems', icon: <Star />, label: 'Member System' },
  { href: '#', icon: <TeamsIcon />, label: 'Teams System' },
  { href: '/developers', icon: <Code />, label: 'Developers System' },
  { href: '/ai-system', icon: <Bot />, label: 'AI System' },
  { href: '/monitor', icon: <Eye />, label: 'Monitor' },
  { href: '#', icon: <BarChart2 />, label: 'Analysis' },
  { href: '#', icon: <Bell />, label: 'Notification' },
  { href: '#', icon: <Settings />, label: 'Sup-Setting' },
];

export default function SupProfilePage() {
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    if (auth) {
      await auth.signOut();
      router.push('/welcome');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Super Admin Control Center</h1>
        <p className="text-muted-foreground">Navigate to all management systems from here.</p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {adminSystems.map((system) => (
          <Link href={system.href} key={system.label}>
            <Card className="group h-full flex flex-col items-center justify-center text-center p-4 bg-card/50 hover:bg-primary/10 hover:border-primary/50 transition-all border">
              <div className="mb-3 text-primary group-hover:text-primary-foreground transition-colors">
                {React.cloneElement(system.icon, { className: 'w-8 h-8' })}
              </div>
              <CardTitle className="text-sm font-semibold group-hover:text-primary-foreground transition-colors">{system.label}</CardTitle>
            </Card>
          </Link>
        ))}
         <Card
            onClick={handleSignOut}
            className="group h-full flex flex-col items-center justify-center text-center p-4 bg-destructive/10 hover:bg-destructive/20 hover:border-destructive/50 transition-all border border-destructive/20 cursor-pointer"
          >
            <div className="mb-3 text-destructive transition-colors">
              <LogOut className="w-8 h-8" />
            </div>
            <CardTitle className="text-sm font-semibold text-destructive transition-colors">Logout</CardTitle>
          </Card>
      </div>
    </div>
  );
}
