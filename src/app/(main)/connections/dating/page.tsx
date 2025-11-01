
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart, Users, Sparkles, UserCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

export default function ConnectionsDatingPage() {
  const pathname = usePathname();

  // Determine the active tab based on the current path
  const getActiveTab = () => {
    if (pathname.startsWith('/connections/dating/new-beginnings')) {
      return 'new-beginnings';
    }
    if (pathname.startsWith('/connections/dating/for-singles/create-profile')) {
      return 'conditions';
    }
    if (pathname.startsWith('/connections/dating/for-singles')) {
      return 'singles';
    }
    return 'singles'; // Default tab
  };

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center gap-4 mb-4">
            <Heart className="w-10 h-10 text-primary" />
            <Users className="w-10 h-10 text-primary" />
            <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Dating Zone</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Discover meaningful connections and build relationships within the MESY Universe. Your next adventure could be a shared one.
        </p>
      </div>

      <Tabs defaultValue={getActiveTab()} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="singles" asChild>
                <Link href="/connections/dating/for-singles">For Singles (คนโสด)</Link>
            </TabsTrigger>
            <TabsTrigger value="new-beginnings" asChild>
                <Link href="/connections/dating/new-beginnings">New Beginnings (พ่อหม้าย/แม่หม้าย)</Link>
            </TabsTrigger>
             <TabsTrigger value="conditions" asChild>
                <Link href="/connections/dating/for-singles/create-profile">My Profile / Conditions (โปรไฟล์/เงื่อนไข)</Link>
            </TabsTrigger>
        </TabsList>
        {/* Content for these tabs is now handled by their respective pages */}
      </Tabs>
    </div>
  );
}
