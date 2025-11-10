'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Gem } from '@/components/icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();

  const navItems = [
    { name: 'Member Plan', href: '/member-plan' },
    { name: 'Features', href: '/features' },
    { name: 'Chronicle', href: '/chronicle' },
    { name: 'Join Developer', href: '/join-developer' },
  ];

  return (
    <div className={cn("flex min-h-screen flex-col")}>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex items-center">
            <Link href="/welcome" className="mr-6 flex items-center space-x-2">
              <Gem className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline sm:inline-block">
                MESY
              </span>
            </Link>
            <nav className="hidden items-center gap-6 text-sm md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
             {!isUserLoading && !user && (
                <>
                    <Button asChild variant="ghost" className='hidden sm:inline-flex'>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/signup">Register</Link>
                    </Button>
                </>
             )}
             {!isUserLoading && user && (
                <Button asChild>
                    <Link href="/the-gate">Enter App</Link>
                </Button>
             )}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                        <Menu className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <nav className="grid gap-6 text-lg font-medium mt-16">
                        {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="hover:text-foreground/80 text-foreground/60"
                        >
                          {item.name}
                        </Link>
                      ))}
                      {!user && (
                        <Link
                            href="/login"
                            className="hover:text-foreground/80 text-foreground/60"
                            >
                            Login
                        </Link>
                      )}
                    </nav>
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="py-6 md:px-8 md:py-0 bg-secondary/20">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} MESY Entertainment Universe. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
