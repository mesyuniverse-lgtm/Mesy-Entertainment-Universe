import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import React from 'react';

const navItems = [
  { name: 'Dashboard', href: '/member-zones/member-inside' },
  { name: 'Profiles', href: '/member-zones/member-inside/member-profiles' },
  { name: 'System', href: '/member-zones/member-inside/member-system' },
  { name: 'Notifications 🔔', href: '/member-zones/member-inside/member-notifications' },
  { name: 'Log In Reward 🎁', href: '/member-zones/member-inside/member-reward' },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
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
