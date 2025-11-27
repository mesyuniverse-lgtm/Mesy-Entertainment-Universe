
'use client';

import { Suspense, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Wand2,
  Volume2,
  Loader2
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

const customizationCategories = [
  { icon: ScanFace, label: 'Presets' },
  { icon: PersonStanding, label: 'Body' },
  { icon: Shirt, label: 'Clothing' },
  { icon: Eye, label: 'Eyes' },
  { icon: Smile, label: 'Mouth' },
  { icon: Hand, label: 'Hands' },
];

const freeAvatars = [
    { id: 'free-1', name: 'Acolyte', level: 1, imageId: 'knight-1' },
    { id: 'free-2', name: 'Scout', level: 1, imageId: 'explorer-1' },
    { id: 'free-3', name: 'Mage', level: 1, imageId: 'female-warrior-1' },
    { id: 'free-4', name: 'Archer', level: 1, imageId: 'female-archer-1', inUse: true },
    { id: 'free-5', name: 'Brawler', level: 1, imageId: 'fighter-character' }
];

function Model() {
  // In a real application, you would load a GLB/GLTF model here
  // For example: const { scene } = useGLTF('/avatar.glb');
  // return <primitive object={scene} />;
  return (
    <mesh>
      <boxGeometry args={[1, 1.8, 1]} />
      <meshStandardMaterial color="mediumpurple" />
    </mesh>
  );
}


export default function CreateAvatarPage() {
  const [selectedFreeAvatar, setSelectedFreeAvatar] = useState<string | null>(freeAvatars[3].id);

  return (
    <div className="flex h-screen w-full flex-col bg-[#383838] text-white">
      <header className="flex h-12 items-center justify-between border-b border-gray-600 px-4">
        <Button variant="ghost" size="icon" asChild>
            <Link href="/get-member-id">
              <ChevronLeft />
            </Link>
        </Button>
        <h1 className="text-lg font-semibold">Create Avatar</h1>
        <Button variant="secondary" asChild><Link href="/get-member-id">Finish</Link></Button>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Customization Category Sidebar */}
        <aside className="w-16 border-r border-gray-600 p-2">
          <div className="flex flex-col items-center space-y-2">
            {customizationCategories.map((cat, index) => (
              <Button
                key={cat.label}
                variant={index === 0 ? 'secondary' : 'ghost'}
                size="icon"
                className="h-12 w-12 bg-gray-700/50 hover:bg-gray-600 data-[state=active]:bg-blue-500"
                title={cat.label}
              >
                <cat.icon className="h-6 w-6" />
              </Button>
            ))}
          </div>
        </aside>

        {/* Customization Panel */}
        <aside className="w-[350px] border-r border-gray-600 bg-[#424242]">
           <Tabs defaultValue="presets" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-1 bg-[#212121] rounded-none h-12">
                    <TabsTrigger value="presets" className="h-full rounded-none text-base"><Wand2 className='mr-2'/> Presets</TabsTrigger>
                </TabsList>
                <TabsContent value="presets" className="p-4 space-y-4 flex-grow overflow-y-auto">
                    <Card className="bg-black/20 border-primary/30">
                        <CardHeader>
                            <CardTitle className='text-lg'>Avatar Voice</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                             <Button variant="outline" className="w-full justify-between bg-gray-800/50 border-gray-600">
                                <span>Voice Profile: Serene</span>
                                <Volume2/>
                            </Button>
                            <p className='text-xs text-muted-foreground text-center'>Full voice library available for members.</p>
                        </CardContent>
                    </Card>

                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex flex-col space-y-2">
                            <Label className='text-sm text-muted-foreground'>Feature {i+1}</Label>
                            <Slider defaultValue={[Math.random() * 100]} max={100} step={1} className="w-full" />
                        </div>
                    ))}
                </TabsContent>
           </Tabs>
        </aside>


        {/* 3D Preview */}
        <main className="flex-1 bg-gray-800/20 relative flex items-center justify-center p-4">
             <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                <Suspense fallback={<Loader2 className="w-16 h-16 animate-spin" />}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <Model />
                    <OrbitControls />
                    <Environment preset="sunset" />
                </Suspense>
             </Canvas>
        </main>

        {/* Free Presets Panel */}
        <aside className="w-72 bg-[#212121] p-2 flex flex-col">
           <h3 className='p-2 text-lg font-semibold'>Choose a Basic Avatar</h3>
            <div className="mt-2 space-y-2 flex-grow overflow-y-auto pr-1">
                {freeAvatars.map(preset => {
                    const presetImage = PlaceHolderImages.find(p => p.id === preset.imageId);
                    const isSelected = selectedFreeAvatar === preset.id;
                    return (
                        <button key={preset.id} onClick={() => setSelectedFreeAvatar(preset.id)}>
                             <Card className={cn(
                                'bg-gray-700/50 border-2 transition-all',
                                isSelected ? 'border-primary shadow-lg shadow-primary/30' : 'border-transparent hover:border-primary/50'
                             )}>
                                <CardContent className="p-2 flex items-center space-x-3">
                                    {presetImage && <Image src={presetImage.imageUrl} alt={preset.name} width={56} height={56} className="rounded" />}
                                    <div className="flex-1 text-left">
                                        <p className="font-semibold">{preset.name}</p>
                                        <p className="text-xs text-muted-foreground">Level {preset.level}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </button>
                    )
                })}
            </div>
        </aside>
      </div>
    </div>
  );
}