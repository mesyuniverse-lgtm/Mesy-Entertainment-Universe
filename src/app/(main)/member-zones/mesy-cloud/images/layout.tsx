
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sparkles, LayoutGrid, FolderHeart, Heart, Search, Filter, UploadCloud } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function ImageCloudLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { href: '/member-zones/mesy-cloud/images/moments', label: "Moment's", icon: Sparkles },
        { href: '/member-zones/mesy-cloud/images/gallery', label: "Gallery", icon: LayoutGrid },
        { href: '/member-zones/mesy-cloud/images/albums', label: "Albums", icon: FolderHeart },
        { href: '/member-zones/mesy-cloud/images/favorites', label: "Favorites", icon: Heart },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-grow">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search images by name, tag, or date..." className="pl-10" />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" />
                                Sort & Filter
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Date Created</DropdownMenuItem>
                            <DropdownMenuItem>File Size</DropdownMenuItem>
                            <DropdownMenuItem>Name</DropdownMenuItem>
                             <DropdownMenuSeparator />
                            <DropdownMenuLabel>Filter by Tag</DropdownMenuLabel>
                             <DropdownMenuSeparator />
                            <DropdownMenuItem>Character</DropdownMenuItem>
                            <DropdownMenuItem>Landscape</DropdownMenuItem>
                            <DropdownMenuItem>Item</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                 <Button>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Upload Image
                </Button>
            </div>
             <div className="border-b">
                <nav className="-mb-px flex gap-6">
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
