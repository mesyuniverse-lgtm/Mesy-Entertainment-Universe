
'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, Milestone, Rocket, Flag, Calendar } from "lucide-react";

const roadmapPhases = [
  {
    phase: "Phase 1: Foundation (Q1-Q2 2024)",
    status: "Completed",
    icon: <CheckCircle className="h-8 w-8 text-green-500" />,
    items: [
      { text: "Core Platform Development & Infrastructure Setup", completed: true },
      { text: "Launch of Public & Authentication Zones", completed: true },
      { text: "Initial Membership System Design (Levels 0-50)", completed: true },
      { text: "Implementation of Developer & AI Hubs (Beta)", completed: true },
    ],
  },
  {
    phase: "Phase 2: Community & Content (Q3 2024)",
    status: "In Progress",
    icon: <Rocket className="h-8 w-8 text-primary" />,
    items: [
      { text: "Socialive Platform Launch (Live, Friends, Groups)", completed: true },
      { text: "Entertainment Hub Unveiling (Movies, Music)", completed: false },
      { text: "Full AI Generator Integration (Video, Image, Avatar)", completed: false },
      { text: "Developer Zone Expansion (Quests, Academy)", completed: false },
    ],
  },
  {
    phase: "Phase 3: Economy & Monetization (Q4 2024)",
    status: "Planned",
    icon: <Milestone className="h-8 w-8 text-blue-500" />,
    items: [
      { text: "Shopping Hub & Marketplace Rollout", completed: false },
      { text: "MESY Wallet & Payment Gateway Integration", completed: false },
      { text: "Advanced Downline Income & Analytics Tools", completed: false },
      { text: "Partnership Program Launch", completed: false },
    ],
  },
    {
    phase: "Phase 4: The Metaverse (2025)",
    status: "Planned",
    icon: <Flag className="h-8 w-8 text-purple-500" />,
    items: [
      { text: "3D Avatar System & Customization", completed: false },
      { text: "Integration with Unreal Engine 5", completed: false },
      { text: "Launch of the first Virtual Social Rooms", completed: false },
      { text: "Cross-Platform Asset Compatibility", completed: false },
    ],
  },
];

export default function ChroniclePage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">MESY Universe Chronicle</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Follow our journey as we build the future of entertainment. This is our commitment to transparency and progress.
        </p>
      </div>

      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-9 top-0 bottom-0 w-1 bg-border/50 rounded-full"></div>

        {roadmapPhases.map((phase, phaseIndex) => (
          <div key={phase.phase} className="relative flex items-start gap-8 mb-16">
            <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background border-2 border-primary shadow-lg shadow-primary/20">
                {phase.icon}
            </div>
            <div className="flex-1 pt-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold">{phase.phase}</h2>
                    <span className="text-lg font-semibold text-primary">{phase.status}</span>
                </div>
              
              <div className="bg-card/50 border border-border/50 rounded-lg p-6 space-y-4">
                {phase.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-4">
                    <CheckCircle className={item.completed ? "h-5 w-5 text-green-500" : "h-5 w-5 text-muted-foreground/50"} />
                    <span className={item.completed ? "text-foreground" : "text-muted-foreground"}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
         <div className="relative flex items-start gap-8">
             <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background border-2 border-border/50">
                <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1 pt-3">
                 <h2 className="text-2xl font-bold text-muted-foreground">To be continued...</h2>
            </div>
         </div>
      </div>
    </div>
  );
}
