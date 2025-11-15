'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/firebase'; 
import { useUser } from '@/firebase/auth/use-user';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Gem, LogOut, Menu, User, Shield } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import './main-module.global.css';


export default function MainLayout({ children }: { children: React.ReactNode }) {
    const auth = useAuth();
    const { user, isUserLoading } = useUser(auth);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/login');
        }
    }, [isUserLoading, user, router]);

    const handleLogout = async () => {
        if(auth) {
            await signOut(auth);
        }
        router.push('/welcome');
    };

    const navLinks = [
        { href: '/user-hub', label: 'User Hub', roles: ['User', 'Member', 'Super-admin'] },
        { href: '/dashboard', label: 'Dashboard', roles: ['Member', 'Super-admin'] },
        { href: '/socialive', label: 'Socialive', roles: ['User', 'Member', 'Super-admin'] },
        { href: '/memberships', label: 'Membership', roles: ['Member', 'Super-admin'] },
        { href: '/shop', label: 'Shop', roles: ['User', 'Member', 'Super-admin'] },
    ];
    
    // Mock user role - in a real app, this would come from your user data
    const userRole = user?.email === 'mesy.universe@gmail.com' ? 'Super-admin' : user?.email === 'member@mesy.io' ? 'Member' : 'User';

    const accessibleLinks = navLinks.filter(link => link.roles.includes(userRole));


    if (isUserLoading || !user) {
        return <div className="flex h-screen items-center justify-center bg-background"><Gem className="h-12 w-12 animate-spin text-primary" /></div>;
    }

    return (
        <div className="main-layout grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            {/* Sidebar for Desktop */}
            <aside className="main-sidebar hidden md:block border-r border-border/20">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b border-border/20 px-4 lg:h-[60px] lg:px-6">
                        <Link href="/welcome" className="flex items-center gap-2 font-semibold">
                            <Gem className="h-6 w-6 text-primary" />
                            <span className="font-headline">MESY</span>
                        </Link>
                    </div>
                    <nav className="flex-1 overflow-auto py-4 px-2 text-sm font-medium lg:px-4">
                        {accessibleLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                    pathname === link.href && "text-primary bg-primary/10"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b border-border/20 bg-background/50 px-4 lg:h-[60px] lg:px-6">
                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
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
                                {accessibleLinks.map(link => (
                                     <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-primary">{link.label}</Link>
                                ))}
                             </nav>
                        </SheetContent>
                    </Sheet>
                    
                    <div className="w-full flex-1" />

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
                <main className="flex-1 p-4 lg:p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
