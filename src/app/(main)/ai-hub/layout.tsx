'use client';

import React from 'react';
import Link from 'next/link';
import {
  Home,
  Library,
  ImageIcon,
  Video,
  DraftingCompass,
  Workflow,
  Sparkles,
  Layers,
  Wand,
  Cpu,
  RefreshCcw,
  Star,
  Terminal,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const aiToolsNav = [
  { href: '#', icon: <ImageIcon />, label: 'Image' },
  { href: '#', icon: <Video />, label: 'Video' },
  { href: '#', icon: <DraftingCompass />, label: 'Blueprints' },
  { href: '#', icon: <Workflow />, label: 'Flow State' },
];

const advancedNav = [
  { href: '#', icon: <Cpu />, label: 'Models & Training' },
  { href: '#', icon: <Layers />, label: 'Texture Generation' },
];

const otherNav = [
  { href: '#', icon: <Star />, label: 'What\'s New' },
  { href: '#', icon: <RefreshCcw />, label: 'Premium Plans', external: true },
  { href: '#', icon: <Terminal />, label: 'API Access', external: true },
  { href: '#', icon: <BookOpen />, label: 'Learn', external: true },
  { href: '#', icon: <HelpCircle />, label: 'FAQ & Help', external: true },
];

export default function AiHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <aside className="w-60 flex-shrink-0 border-r border-border/40 bg-card/80 p-4 flex flex-col justify-between">
        <nav className="space-y-4">
          <div>
            <Button variant="ghost" className="w-full justify-start gap-3 text-base font-semibold">
              <Home /> Home
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-base font-semibold">
              <Library /> Library
            </Button>
          </div>
          <Separator />
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground px-3 mb-2">AI Tools</h3>
            <ul className="space-y-1">
              {aiToolsNav.map(item => (
                <li key={item.label}>
                  <Link href={item.href} className={cn('flex items-center gap-3 p-3 rounded-md text-sm font-medium hover:bg-secondary', isActive(item.href) ? 'bg-secondary' : '')}>
                    {item.icon} {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Separator />
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground px-3 mb-2">Advanced</h3>
             <ul className="space-y-1">
              {advancedNav.map(item => (
                <li key={item.label}>
                  <Link href={item.href} className={cn('flex items-center gap-3 p-3 rounded-md text-sm font-medium hover:bg-secondary', isActive(item.href) ? 'bg-secondary' : '')}>
                    {item.icon} {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className='space-y-2'>
           <Separator />
           <nav className='space-y-1'>
            {otherNav.map(item => (
                 <li key={item.label} className="list-none">
                  <Link href={item.href} className={cn('flex items-center justify-between gap-3 p-3 rounded-md text-sm font-medium hover:bg-secondary', isActive(item.href) ? 'bg-secondary' : '')} target={item.external ? '_blank' : undefined}>
                    <div className='flex items-center gap-3'>{item.icon} {item.label}</div>
                    {item.external && <span className="text-muted-foreground">↗</span>}
                  </Link>
                </li>
            ))}
           </nav>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
