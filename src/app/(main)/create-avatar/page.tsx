'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Body,
  Eye,
  Hand,
  PersonStanding,
  ScanFace,
  Shirt,
  Smile,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const mainCategories = [
  { icon: ScanFace, label: 'Face' },
  { icon: Hand, label: 'Hands' },
  { icon: Eye, label: 'Eyes' },
  { icon: Smile, label: 'Mouth' },
  { icon: PersonStanding, label: 'Body' },
  { icon: Shirt, label: 'Clothing' },
];

const presets = [
  { id: 'jeanne', name: 'Jeanne', imageId: 'female-archer-1' },
  { id: 'jenna', name: 'Jenna', imageId: 'default-avatar' },
  { id: 'kate', name: 'Kate', imageId: 'explorer-1', inUse: true },
  { id: 'katherine', name: 'Katherine', imageId: 'fighter-character' },
  { id: 'brooke', name: 'Brooke', imageId: 'knight-1' },
  { id: 'zane', name: 'Zane', imageId: 'default-avatar' },

];

export default function CreateAvatarPage() {
  const avatarPreview = PlaceHolderImages.find((i) => i.id === 'female-archer-1');
  
  return (
    <div className="flex h-screen w-full flex-col bg-[#383838] text-white">
      <header className="flex h-12 items-center justify-between border-b border-gray-600 px-4">
        <Button variant="ghost" size="icon" asChild>
            <Link href="/create-member-id">
              <ChevronLeft />
            </Link>
        </Button>
        <h1 className="text-lg font-semibold">Create Avatar</h1>
        <div className="w-8"></div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main Category Sidebar */}
        <aside className="w-16 border-r border-gray-600 p-2">
          <div className="flex flex-col items-center space-y-2">
            {mainCategories.map((cat) => (
              <Button
                key={cat.label}
                variant={cat.label === 'Face' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-12 w-12 bg-gray-700/50 hover:bg-gray-600 data-[state=active]:bg-blue-500"
              >
                <cat.icon className="h-6 w-6" />
              </Button>
            ))}
          </div>
        </aside>

        {/* 3D Preview */}
        <main className="flex-1 bg-gray-800/20 relative flex items-center justify-center p-4">
             {avatarPreview && (
                <Image 
                    src={avatarPreview.imageUrl} 
                    alt="Avatar Preview"
                    width={400}
                    height={400}
                    className="object-contain"
                />
             )}
            <div className="absolute top-4 left-4 flex gap-2">
                <Button variant="ghost" size="icon" className="bg-black/30 hover:bg-black/50">
                    <ChevronLeft/>
                </Button>
                 <Button variant="ghost" size="icon" className="bg-black/30 hover:bg-black/50">
                    <ChevronRight/>
                </Button>
            </div>
             <div className="absolute bottom-4 left-4">
                <Button variant="outline" className="bg-black/30 border-gray-500">Face</Button>
            </div>
        </main>

        {/* Customization Panel */}
        <aside className="w-[400px] border-l border-r border-gray-600 bg-[#424242]">
            <div className="p-4 space-y-6">
                {[...Array(8)].map((_, i) => (
                     <div key={i} className="flex items-center space-x-4">
                        <ScanFace className="h-6 w-6 text-gray-400" />
                        <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
                        <div className="flex space-x-1">
                            <div className="h-8 w-8 rounded bg-gray-500"></div>
                            <div className="h-8 w-8 rounded bg-gray-500"></div>
                        </div>
                    </div>
                ))}
            </div>
             <div className="p-4 border-t border-gray-600">
                <div className="flex items-center space-x-2">
                    <p>Recent:</p>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Avatar className="h-12 w-12 border-2 border-transparent">
                                <AvatarImage src={PlaceHolderImages.find(p=>p.id==='explorer-1')?.imageUrl} />
                                <AvatarFallback>K</AvatarFallback>
                            </Avatar>
                             <span className="absolute bottom-0 -right-1 text-xs bg-gray-800 px-1 rounded-sm">Kate</span>
                             <Button variant="ghost" size="icon" className="absolute -top-2 -right-2 h-5 w-5 bg-black/50 rounded-full">x</Button>
                        </div>
                         <div className="relative">
                            <Avatar className="h-12 w-12 border-2 border-transparent">
                                <AvatarImage src={PlaceHolderImages.find(p=>p.id==='knight-1')?.imageUrl} />
                                <AvatarFallback>B</AvatarFallback>
                            </Avatar>
                             <span className="absolute bottom-0 -right-1 text-xs bg-gray-800 px-1 rounded-sm">Brooke</span>
                             <Button variant="ghost" size="icon" className="absolute -top-2 -right-2 h-5 w-5 bg-black/50 rounded-full">x</Button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

        {/* Presets Panel */}
        <aside className="w-64 bg-[#212121] p-2">
           <Tabs defaultValue="female">
                <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                    <TabsTrigger value="female">Female</TabsTrigger>
                    <TabsTrigger value="male">Male</TabsTrigger>
                </TabsList>
                <TabsContent value="female">
                    <div className="mt-4 space-y-2 h-[calc(100vh-160px)] overflow-y-auto">
                        {presets.map(preset => {
                             const presetImage = PlaceHolderImages.find(p => p.id === preset.imageId);
                             return (
                                <Card key={preset.id} className={`bg-gray-700/50 border-2 ${preset.inUse ? 'border-blue-500' : 'border-transparent'}`}>
                                    <CardContent className="p-2 flex items-center space-x-3">
                                        {presetImage && <Image src={presetImage.imageUrl} alt={preset.name} width={56} height={56} className="rounded" />}
                                        <div className="flex-1">
                                            <p className="font-semibold">{preset.name}</p>
                                            {preset.inUse && <p className="text-xs text-blue-400">In Use</p>}
                                        </div>
                                    </CardContent>
                                </Card>
                             )
                        })}
                    </div>
                </TabsContent>
                <TabsContent value="male">
                    {/* Male presets here */}
                </TabsContent>
           </Tabs>
        </aside>
      </div>

       <footer className="flex h-16 items-center justify-end border-t border-gray-600 px-4 bg-[#2a2a2a] space-x-2">
        <Button variant="secondary" className="bg-gray-600 hover:bg-gray-500" asChild><Link href="/create-member-id">Finish</Link></Button>
        <Button variant="ghost" asChild><Link href="/create-member-id">Cancel</Link></Button>
      </footer>
    </div>
  );
}
