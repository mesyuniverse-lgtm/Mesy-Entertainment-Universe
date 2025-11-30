'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Database } from 'lucide-react';
import Link from 'next/link';

const levelSections = [
    {
        level: 0,
        title: "Level 0 Database",
        description: "View and manage member slots from 1 to 999.",
        href: "/members/systems/level0",
        status: "Active"
    },
    {
        level: 1,
        title: "Level 1 Database",
        description: "View and manage member slots from 1,000 to 1,999.",
        href: "/members/systems/level1",
        status: "Active"
    },
    {
        level: 2,
        title: "Level 2 Database",
        description: "View and manage member slots from 2,000 to 2,999.",
        href: "/members/systems/level2",
        status: "Active"
    },
    {
        level: 3,
        title: "Level 3 Database",
        description: "View and manage member slots from 3,000 to 3,999.",
        href: "/members/systems/level3",
        status: "Active"
    },
    {
        level: 4,
        title: "Level 4 Database",
        description: "View and manage member slots from 4,000 to 4,999.",
        href: "/members/systems/level4",
        status: "Active"
    },
    // Future levels will be added here
];

export default function MemberSystemPage() {

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary tracking-wider">
            Members Database
          </CardTitle>
          <CardDescription>
            Select a level to view the corresponding member database and activation status.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {levelSections.map((section) => (
                    <Card key={section.level} className="group bg-secondary/50 border-border/50 hover:border-primary/40 transition-all">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Database className="w-6 h-6 text-primary" />
                                        {section.title}
                                    </CardTitle>
                                    <CardDescription className="mt-2">{section.description}</CardDescription>
                                </div>
                                <div className="text-xs font-semibold text-green-400">{section.status}</div>
                            </div>
                        </CardHeader>
                        <CardContent>
                             <Button asChild className="w-full">
                                <Link href={section.href}>
                                    View Database <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
                 <Card className="group bg-secondary/30 border-border/50 border-dashed flex flex-col items-center justify-center text-center p-6">
                    <CardTitle className="text-muted-foreground">Level 5 Database</CardTitle>
                    <CardDescription className="mt-2">Coming Soon</CardDescription>
                </Card>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
