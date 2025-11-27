
'use client';

import { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  ChevronRight,
  Sparkles,
  Upload,
  Bot,
  Loader2,
  Wand2,
  Volume2
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateContent, ContentGenerationInput } from '@/ai/flows/content-generation-demo';
import { cn } from '@/lib/utils';


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

const freeAvatars = [
    { id: 'free-1', name: 'Acolyte', level: 1, imageId: 'knight-1' },
    { id: 'free-2', name: 'Scout', level: 1, imageId: 'explorer-1' },
    { id: 'free-3', name: 'Mage', level: 1, imageId: 'female-warrior-1' },
    { id: 'free-4', name: 'Archer', level: 1, imageId: 'female-archer-1' },
    { id: 'free-5', name: 'Brawler', level: 1, imageId: 'fighter-character' }
];

export default function CreateAvatarPage() {
  const { toast } = useToast();
  const [avatarPreview, setAvatarPreview] = useState(PlaceHolderImages.find((i) => i.id === 'female-archer-1')?.imageUrl);
  const [prompt, setPrompt] = useState('A powerful female archer with glowing arrows and determined eyes, elven features');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFreeAvatar, setSelectedFreeAvatar] = useState<string | null>(freeAvatars[3].id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = async (type: 'avatar' | 'image-to-image') => {
    if (!prompt && type !== 'image-to-image') {
      toast({
        title: 'Prompt is required',
        description: 'Please enter a prompt to generate an avatar.',
        variant: 'destructive',
      });
      return;
    }
    
    // For image-to-image, we'd also check if a file is selected.
    if(type === 'image-to-image' && !fileInputRef.current?.files?.[0]) {
       toast({
        title: 'Image is required',
        description: 'Please select an image to generate from.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real scenario, for image-to-image, we would read the file as a data URI
      const input: ContentGenerationInput = {
        type: 'avatar', // Our flow currently handles this for text-to-image
        prompt: prompt,
      };
      const response = await generateContent(input);
      setAvatarPreview(response.result);
      toast({
        title: "Avatar Generated!",
        description: "Your new AI-powered avatar is ready."
      });
    } catch (error) {
      console.error("Error generating avatar:", error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'The AI is busy, please try again in a moment.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  }

  return (
    <div className="flex h-screen w-full flex-col bg-[#383838] text-white">
      <header className="flex h-12 items-center justify-between border-b border-gray-600 px-4">
        <Button variant="ghost" size="icon" asChild>
            <Link href="/get-member-id">
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
            {mainCategories.map((cat, index) => (
              <Button
                key={cat.label}
                variant={index === 0 ? 'secondary' : 'ghost'}
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
                    src={avatarPreview} 
                    alt="Avatar Preview"
                    width={400}
                    height={600}
                    className="object-contain h-full"
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

        {/* Customization & AI Panel */}
        <aside className="w-[400px] border-l border-r border-gray-600 bg-[#424242]">
           <Tabs defaultValue="ai" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-2 bg-[#212121] rounded-none h-12">
                    <TabsTrigger value="ai" className="h-full rounded-none text-base"><Sparkles className='mr-2'/> AI Creator</TabsTrigger>
                    <TabsTrigger value="manual" className="h-full rounded-none text-base"><Wand2 className='mr-2'/> Manual</TabsTrigger>
                </TabsList>
                <TabsContent value="ai" className="p-4 space-y-4 flex-grow overflow-y-auto">
                    <Card className="bg-black/20 border-primary/30">
                        <CardHeader>
                            <CardTitle className='text-lg'>Text to Avatar</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Textarea 
                                placeholder='A powerful female archer with glowing arrows...'
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className='bg-gray-800/50 border-gray-600 text-white min-h-[100px]'
                            />
                             <Button onClick={() => handleGenerate('avatar')} disabled={isLoading} className='w-full mt-4'>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Bot className='mr-2'/>}
                                Generate
                            </Button>
                        </CardContent>
                    </Card>
                     <Card className="bg-black/20 border-primary/30">
                        <CardHeader>
                            <CardTitle className='text-lg'>Image to Avatar</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <Button variant="outline" onClick={handleFileSelect} className="w-full border-dashed bg-gray-800/50 border-gray-600 hover:bg-gray-700/50 h-20">
                                <Upload className="mr-2"/>
                                Click to Upload Image
                            </Button>
                             <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
                             <Button onClick={() => handleGenerate('image-to-image')} disabled={isLoading} className='w-full mt-4'>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Bot className='mr-2'/>}
                                Generate from Image
                            </Button>
                        </CardContent>
                    </Card>
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

                </TabsContent>
                <TabsContent value="manual" className="p-4 space-y-6 flex-grow overflow-y-auto">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-4">
                            <ScanFace className="h-6 w-6 text-gray-400" />
                            <Slider defaultValue={[Math.random() * 100]} max={100} step={1} className="w-full" />
                            <div className="flex space-x-1">
                                <div className="h-8 w-8 rounded bg-gray-500"></div>
                                <div className="h-8 w-8 rounded bg-gray-500"></div>
                            </div>
                        </div>
                    ))}
                </TabsContent>
           </Tabs>
        </aside>

        {/* Free Presets Panel */}
        <aside className="w-72 bg-[#212121] p-2 flex flex-col">
           <h3 className='p-2 text-lg font-semibold'>Choose a Basic Avatar</h3>
            <div className="mt-2 space-y-2 flex-grow overflow-y-auto pr-1">
                {freeAvatars.map(preset => {
                    const presetImage = PlaceHolderImages.find(p => p.id === preset.imageId);
                    const isSelected = selectedFreeAvatar === preset.id;
                    return (
                        <button key={preset.id} onClick={() => {
                            setAvatarPreview(presetImage?.imageUrl);
                            setSelectedFreeAvatar(preset.id);
                        }}>
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

       <footer className="flex h-16 items-center justify-end border-t border-gray-600 px-4 bg-[#2a2a2a] space-x-2">
        <Button variant="secondary" className="bg-gray-600 hover:bg-gray-500" asChild><Link href="/get-member-id">Finish</Link></Button>
        <Button variant="ghost" asChild><Link href="/get-member-id">Cancel</Link></Button>
      </footer>
    </div>
  );
}

