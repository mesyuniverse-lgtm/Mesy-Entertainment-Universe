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
     {
        level: 5,
        title: "Level 5 Database",
        description: "View and manage member slots from 5,000 to 5,999.",
        href: "/members/systems/level5",
        status: "Active"
    },
    {
        level: 6,
        title: "Level 6 Database",
        description: "View and manage member slots from 6,000 to 6,999.",
        href: "/members/systems/level6",
        status: "Active"
    },
    {
        level: 7,
        title: "Level 7 Database",
        description: "View and manage member slots from 7,000 to 7,999.",
        href: "/members/systems/level7",
        status: "Active"
    },
    {
        level: 8,
        title: "Level 8 Database",
        description: "View and manage member slots from 8,000 to 8,999.",
        href: "/members/systems/level8",
        status: "Active"
    },
    {
        level: 9,
        title: "Level 9 Database",
        description: "View and manage member slots from 9,000 to 9,999.",
        href: "/members/systems/level9",
        status: "Active"
    },
    {
        level: 10,
        title: "Level 10 Database",
        description: "View and manage member slots from 10,000 to 10,999.",
        href: "/members/systems/level10",
        status: "Active"
    },
    {
        level: 11,
        title: "Level 11 Database",
        description: "View and manage member slots from 11,000 to 11,999.",
        href: "/members/systems/level11",
        status: "Active"
    },
    {
        level: 12,
        title: "Level 12 Database",
        description: "View and manage member slots from 12,000 to 12,999.",
        href: "/members/systems/level12",
        status: "Active"
    },
    {
        level: 13,
        title: "Level 13 Database",
        description: "View and manage member slots from 13,000 to 13,999.",
        href: "/members/systems/level13",
        status: "Active"
    },
    {
        level: 14,
        title: "Level 14 Database",
        description: "View and manage member slots from 14,000 to 14,999.",
        href: "/members/systems/level14",
        status: "Active"
    },
    {
        level: 15,
        title: "Level 15 Database",
        description: "View and manage member slots from 15,000 to 15,999.",
        href: "/members/systems/level15",
        status: "Active"
    },
    {
        level: 16,
        title: "Level 16 Database",
        description: "View and manage member slots from 16,000 to 16,999.",
        href: "/members/systems/level16",
        status: "Active"
    },
    {
        level: 17,
        title: "Level 17 Database",
        description: "View and manage member slots from 17,000 to 17,999.",
        href: "/members/systems/level17",
        status: "Active"
    },
    {
        level: 18,
        title: "Level 18 Database",
        description: "View and manage member slots from 18,000 to 18,999.",
        href: "/members/systems/level18",
        status: "Active"
    },
    {
        level: 19,
        title: "Level 19 Database",
        description: "View and manage member slots from 19,000 to 19,999.",
        href: "/members/systems/level19",
        status: "Active"
    },
    {
        level: 20,
        title: "Level 20 Database",
        description: "View and manage member slots from 20,000 to 20,999.",
        href: "/members/systems/level20",
        status: "Active"
    },
    {
        level: 21,
        title: "Level 21 Database",
        description: "View and manage member slots from 21,000 to 21,999.",
        href: "/members/systems/level21",
        status: "Active"
    },
    {
        level: 22,
        title: "Level 22 Database",
        description: "View and manage member slots from 22,000 to 22,999.",
        href: "/members/systems/level22",
        status: "Active"
    },
    {
        level: 23,
        title: "Level 23 Database",
        description: "View and manage member slots from 23,000 to 23,999.",
        href: "/members/systems/level23",
        status: "Active"
    },
     {
        level: 24,
        title: "Level 24 Database",
        description: "View and manage member slots from 24,000 to 24,999.",
        href: "/members/systems/level24",
        status: "Active"
    },
    {
        level: 25,
        title: "Level 25 Database",
        description: "View and manage member slots from 25,000 to 25,999.",
        href: "/members/systems/level25",
        status: "Active"
    },
    {
        level: 26,
        title: "Level 26 Database",
        description: "View and manage member slots from 26,000 to 26,999.",
        href: "/members/systems/level26",
        status: "Active"
    },
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
                    <CardTitle className="text-muted-foreground">Level 27 Database</CardTitle>
                    <CardDescription className="mt-2">Coming Soon</CardDescription>
                </Card>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
