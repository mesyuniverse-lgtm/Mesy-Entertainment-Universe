'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Gem, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/member-plan', label: 'Member Plan' },
  { href: '/features', label: 'Features' },
  { href: '/chronicle', label: 'Chronicle' },
  { href: '/developers', label: 'Developers' },
];

export default function Header() {
    const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/welcome" className="mr-6 flex items-center space-x-2">
          <Gem className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">MESY</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === link.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild>
            <Link href="/the-gate">Get Started</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <Link href="/welcome" className="flex items-center space-x-2 mb-6">
                    <Gem className="h-6 w-6 text-primary" />
                    <span className="font-bold">MESY</span>
                </Link>
                <div className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-lg text-foreground/80 hover:text-foreground"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
