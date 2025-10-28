
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Camera, Check, Download, Redo, Save, Undo, User, PersonStanding, ChevronLeft, SlidersHorizontal, Shirt } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import React from "react";

const presets = [
    { name: 'Model 1', image: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
    { name: 'Model 2', image: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
    { name: 'Model 3', image: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl },
    { name: 'Model 4', image: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl },
    { name: 'Model 5', image: PlaceHolderImages.find(i => i.id === 'dragon-1')?.imageUrl },
    { name: 'Model 6', image: PlaceHolderImages.find(i => i.id === 'fighter-silhouette')?.imageUrl },
];

const customizationOptions = [
    { name: 'Appearance', icon: <User className="h-8 w-8" /> },
    { name: 'View Outfit', icon: <Shirt className="h-8 w-8" /> },
];

export default function CustomizePage() {
    const [activePreset, setActivePreset] = React.useState(0);
    const avatar3d = PlaceHolderImages.find(i => i.id === 'female-archer-1');
    
    return (
        <div className="fixed inset-0 bg-background text-foreground flex flex-col p-4 md:p-6 z-50">
            {/* Header */}
            <header className="flex justify-between items-center w-full shrink-0">
                <Button variant="ghost">
                    <ChevronLeft className="h-6 w-6"/>
                    <span className="text-xl font-bold ml-2">Customize</span>
                </Button>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm"><Download className="h-5 w-5"/> <span className="ml-2 hidden sm:inline">Load</span></Button>
                    <Button variant="ghost" size="sm"><Save className="h-5 w-5"/> <span className="ml-2 hidden sm:inline">Save</span></Button>
                    <Button variant="ghost" size="sm"><Undo className="h-5 w-5"/> <span className="ml-2 hidden sm:inline">Cancel</span></Button>
                    <Button variant="ghost" size="sm"><Redo className="h-5 w-5"/> <span className="ml-2 hidden sm:inline">Redo</span></Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col md:flex-row gap-4 mt-4 overflow-hidden">

                {/* Left Panel */}
                <aside className="w-full md:w-64 lg:w-72 bg-card/50 rounded-lg p-4 space-y-4 overflow-y-auto">
                    <Button variant="secondary" className="w-full justify-start text-base">
                        <Camera className="mr-3 h-5 w-5"/>
                        Beauty Album
                    </Button>
                    <div className="space-y-2">
                        {presets.map((preset, index) => (
                            <button key={index} onClick={() => setActivePreset(index)} className={cn("w-full text-left p-2 rounded-md transition-colors flex items-center gap-4", activePreset === index ? 'bg-primary/20 ring-2 ring-primary' : 'hover:bg-secondary')}>
                                <Avatar className="h-16 w-16 rounded-md">
                                    <AvatarImage src={preset.image} />
                                    <AvatarFallback>{preset.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-semibold">{preset.name}</span>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Center/Right Combined Panel */}
                <div className="flex-1 flex flex-col md:flex-row gap-4">

                    {/* Customization Options */}
                    <div className="order-2 md:order-1 w-full md:w-60 flex md:flex-col gap-2">
                        {customizationOptions.map(opt => (
                             <Button key={opt.name} variant="secondary" className="h-auto p-4 flex-col gap-2 flex-1 md:flex-none">
                                {opt.icon}
                                <span className="text-sm">{opt.name}</span>
                             </Button>
                        ))}
                         <div className="p-4 bg-card/50 rounded-lg flex-1 md:flex-none">
                            <div className="flex justify-between items-center">
                                <label htmlFor="headpiece" className="text-sm font-medium">Headpiece</label>
                                <input type="checkbox" id="headpiece" className="h-5 w-5 rounded-sm border-primary text-primary focus:ring-primary" defaultChecked />
                            </div>
                        </div>
                    </div>

                    {/* 3D Avatar Preview & Right Side Info */}
                    <div className="order-1 md:order-2 flex-1 relative flex flex-col">
                        <div className="flex-grow flex items-center justify-center relative">
                            {avatar3d && <Image src={avatar3d.imageUrl} alt={avatar3d.description} data-ai-hint={avatar3d.imageHint} width={500} height={800} objectFit="contain" className="max-h-[80vh] md:max-h-full"/>}
                        </div>
                        <div className="absolute top-0 right-0 p-4 bg-card/50 rounded-lg text-sm text-right">
                            <p className="text-muted-foreground">Creator</p>
                            <p className="font-bold text-lg">FamilyName</p>
                            <Button className="mt-2 w-full">Add to Beauty Album</Button>
                        </div>

                         <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
                            <Button variant="secondary" className="rounded-full h-12 w-32 justify-start pl-5">UI</Button>
                            <Button variant="secondary" className="rounded-full h-12 w-36 justify-start pl-5 gap-2"><PersonStanding /> View Pose</Button>
                            <Button size="lg" className="rounded-full h-14 w-40 text-lg bg-blue-500 hover:bg-blue-600 text-white">Done</Button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}

    