'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/member-zones/member-inside' },
  { name: 'Profiles', href: '/member-zones/member-inside/member-profiles' },
  { name: 'System', href: '/member-zones/member-inside/member-system' },
  { name: 'Notifications 🔔', href: '/member-zones/member-inside/member-notifications' },
  { name: 'Log In Reward 🎁', href: '/member-zones/member-inside/member-reward' },
];

// รายชื่ออีเมลของสมาชิกที่มีสิทธิ์ทดลองระบบ
const authorizedTestEmails = [
  'testuser@mesy.io',
  'member@mesy.io',
  'admin@mesy.io',
  'developer@mesy.io'
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
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader className="h-12 w-12 animate-spin mx-auto mb-4" />
            <p>Verifying access...</p>
          </div>
        </div>
      </div>
    );
  }
  
  // หากผู้ใช้มีสิทธิ์ ให้แสดงเนื้อหาของโซนสมาชิก
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      <Navbar items={navItems} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
