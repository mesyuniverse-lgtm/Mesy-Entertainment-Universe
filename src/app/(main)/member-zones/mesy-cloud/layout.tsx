
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { File, Image as ImageIcon } from "lucide-react";
import { cn } from '@/lib/utils';

export default function MesyCloudLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { href: '/member-zones/mesy-cloud/files', label: 'All Scrolls', icon: File },
        { href: '/member-zones/mesy-cloud/images', label: 'Gallery', icon: ImageIcon },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="flex-shrink-0 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight font-headline">Mesy Cloud</h1>
                        <p className="text-muted-foreground">ห้องสมุดแห่งความทรงจำ: พื้นที่จัดเก็บข้อมูลส่วนตัวของคุณ</p>
                    </div>
                </div>
                 <div className="border-b">
                    <nav className="flex gap-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center px-3 py-2 border-b-2 font-medium text-sm",
                                    pathname.startsWith(item.href)
                                        ? "border-primary text-primary"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
}
