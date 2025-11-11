'use client';

import React from 'react';
import Link from 'next/link';
import { Gem } from '@/components/icons';

export default function TheGateLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
             <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 flex items-center">
                    <Link href="/welcome" className="mr-6 flex items-center space-x-2">
                    <Gem className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline sm:inline-block">
                        MESY
                    </span>
                    </Link>
                </div>
                </div>
            </header>
            <main className="flex-1">
                {children}
            </main>
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