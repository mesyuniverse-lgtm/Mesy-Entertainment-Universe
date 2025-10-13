
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Award,
  DollarSign,
  Users,
  ChevronUp,
  User,
  Gift,
  Wallet,
  Cloud,
  Map,
  LogOut,
  Gem,
  History,
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function MemberZoneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const sidebarNav = [
    { title: 'หน้าแรกสมาชิก', href: '/member-zones', icon: Home, description: 'จุดเริ่มต้นแห่งการเดินทาง' },
    { title: 'ลำดับสมาชิก', href: '/member-zones/member-ranking', icon: Award, description: 'สายใยแห่งการเชื่อมโยง' },
    { title: 'รายได้ของฉัน', href: '/member-zones/my-income', icon: DollarSign, description: 'ผลแห่งการเติบโต' },
    { title: 'สมาชิกที่เชื่อมโยง', href: '/member-zones/network', icon: Users, description: 'เครือข่ายแห่งการสนับสนุน' },
    { title: 'อัปเกรดระดับ', href: '/member-zones/upgrade', icon: ChevronUp, description: 'พิธีการเปลี่ยนผ่าน' },
    { title: 'โปรไฟล์ของฉัน', href: '/member-zones/profile', icon: User, description: 'สะท้อนตัวตน' },
    { title: 'Gift Box', href: '/member-zones/gift-box', icon: Gift, description: 'พิธีแห่งการให้' },
    { title: 'Wallet', href: '/member-zones/wallet', icon: Wallet, description: 'ขุมทรัพย์แห่งการเติบโต' },
    { title: 'Mesy Cloud', href: '/member-zones/mesy-cloud', icon: Cloud, description: 'ห้องสมุดแห่งความทรงจำ' },
    { title: 'Quest', href: '/member-zones/quests', icon: Map, description: 'ภารกิจแห่งการเติบโต' },
    { title: 'ประวัติ', href: '/member-zones/history', icon: History, description: 'บันทึกการเดินทางของคุณ' },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0" asChild>
                    <Link href="/home">
                        <Gem className="h-6 w-6 text-primary" />
                    </Link>
                </Button>
                <div className="flex flex-col text-left">
                    <p className="text-base font-semibold text-sidebar-foreground font-headline">Member Zone</p>
                </div>
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {sidebarNav.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton tooltip={item.title} asChild isActive={pathname === item.href}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="ออกจากระบบ" asChild>
                <Link href="/welcome">
                  <LogOut />
                  <span>ออกจากระบบ</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-secondary/20">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="sm:hidden"/>
            <div className="flex-1" />
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-6 space-y-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
