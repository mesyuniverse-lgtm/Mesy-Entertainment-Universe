'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Loader } from 'lucide-react';
import { Gem } from '@/components/icons';
import Link from 'next/link';

// รายชื่ออีเมลของสมาชิกที่มีสิทธิ์ทดลองระบบ
// Here are the roles based on our backend.json for testing purposes:
// - testuser@mesy.io: A regular user.
// - member@mesy.io: A paying or verified member.
// - admin@mesy.io: An administrator with content management privileges.
// - developer@mesy.io: A developer with access to special tools.
const authorizedTestEmails = [
  'testuser@mesy.io',
  'member@mesy.io',
  'admin@mesy.io',
  'developer@mesy.io'
];


const navItems = [
  { name: 'Dashboard', href: '/member-zones/member-inside/member-dashboard' },
  { name: 'Profiles', href: '/member-zones/member-inside/member-profiles' },
  { name: 'System', href: '/member-zones/member-inside/member-system' },
  { name: 'Notifications 🔔', href: '/member-zones/member-inside/member-notifications' },
  { name: 'Log In Reward 🎁', href: '/member-zones/member-inside/member-rewards' },
];


const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // รอจนกว่าการโหลดข้อมูลผู้ใช้จะเสร็จสิ้น
    if (!isUserLoading) {
      // หากไม่มีผู้ใช้ล็อกอินอยู่ ให้กลับไปหน้าล็อกอิน
      if (!user) {
        router.replace('/member-zones/member-login');
        return;
      }
      
      // ตรวจสอบว่าอีเมลของผู้ใช้มีอยู่ในรายชื่อที่ได้รับอนุญาตหรือไม่
      if (!user.email || !authorizedTestEmails.includes(user.email)) {
        router.replace('/member-zones/member-inside/access-denied');
      }
    }
  }, [user, isUserLoading, router]);

  // แสดงหน้าจอ loading ขณะกำลังตรวจสอบสิทธิ์
  if (isUserLoading || !user || (user.email && !authorizedTestEmails.includes(user.email))) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background text-white">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Verifying access...</p>
          </div>
        </div>
      </div>
    );
  }
  
  // หากผู้ใช้มีสิทธิ์ ให้แสดงเนื้อหาของโซนสมาชิก
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center">
                <Link href="/home" className="mr-6 flex items-center space-x-2">
                    <Gem className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline sm:inline-block">
                        MESY Member Zone
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
        </header>
        <main className="flex-grow container mx-auto px-4 py-8">
            {children}
        </main>
        <footer className="py-6 md:px-8 md:py-0 bg-secondary/20">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                © {new Date().getFullYear()} MESY Entertainment Universe. Member Exclusive Access.
            </p>
            </div>
      </footer>
    </div>
  );
};

export default Layout;
