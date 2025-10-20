
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { DollarSign, Gem, Award, Star, History, Bell } from 'lucide-react';

export default function WalletLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { href: '/member-zones/wallet/usd', label: 'USD Wallet', icon: DollarSign },
        { href: '/member-zones/wallet/mesy-coin', label: 'MESY Coin', icon: Gem },
        { href: '/member-zones/wallet/point', label: 'Point', icon: Award },
        { href: '/member-zones/wallet/star', label: 'Star', icon: Star },
        { href: '/member-zones/wallet/history', label: 'History', icon: History },
        { href: '/member-zones/wallet/notifications', label: 'Notifications', icon: Bell },
        { href: '/member-zones/wallet/favorites', label: 'Favorites', icon: Star },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Wallet</h1>
                <p className="text-muted-foreground">ขุมทรัพย์แห่งการเติบโต: จัดการยอดเงิน, รายได้, และรายจ่ายของคุณ</p>
            </div>
             <div className="border-b">
                <nav className="-mb-px flex gap-6 overflow-x-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-2 shrink-0 border-b-2 px-1 pb-4 text-sm font-medium',
                                pathname.startsWith(item.href)
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}
