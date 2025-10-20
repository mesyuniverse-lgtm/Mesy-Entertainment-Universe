
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Box, User, Palette, Sparkles, Smile, Gift, Shirt, Home, Bot } from 'lucide-react';

export default function ItemBoxLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { href: '/member-zones/item-box/inventories', label: 'Inventories', icon: Box },
        { href: '/member-zones/item-box/avatar', label: 'Avatars', icon: User },
        { href: '/member-zones/item-box/theme', label: 'Themes', icon: Palette },
        { href: '/member-zones/item-box/icon', label: 'Icons', icon: Sparkles },
        { href: '/member-zones/item-box/emoji', label: 'Emojis', icon: Smile },
        { href: '/member-zones/item-box/gift', label: 'Gifts', icon: Gift },
        { href: '/member-zones/item-box/wardrobe', label: 'Wardrobe', icon: Shirt },
        { href: '/member-zones/item-box/decorations', label: 'Decorations', icon: Home },
        { href: '/member-zones/item-box/ai-model', label: 'AI Models', icon: Bot },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Item Box</h1>
                <p className="text-muted-foreground">ช่องเก็บของ: จัดการไอเทมและของรางวัลที่คุณได้รับจากการเดินทาง</p>
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
