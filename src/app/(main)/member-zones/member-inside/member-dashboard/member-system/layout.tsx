
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Shield, BarChart, HandCoins, Percent, History } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';


const systemNavItems = [
  { name: 'System Overview', href: '/member-zones/member-inside/member-dashboard/member-system', icon: Shield },
  { name: 'Levels & Benefits', href: '/member-zones/member-inside/member-dashboard/member-system/leves', icon: BarChart },
  { name: 'Income & Downline', href: '/member-zones/member-inside/member-dashboard/member-system/incom', icon: HandCoins },
  { name: 'Service Fee', href: '/member-zones/member-inside/member-dashboard/member-system/fee', icon: Percent },
  { name: 'Transactions', href: '/transaction', icon: History },
];


export default function MemberSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="grid md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
            <Card>
                <CardContent className="p-2">
                    <nav className="flex flex-col gap-1">
                         {systemNavItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                                pathname === item.href && "bg-muted text-primary"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </CardContent>
            </Card>
        </aside>
        <main className="md:col-span-3">
            {children}
        </main>
    </div>
  );
}
