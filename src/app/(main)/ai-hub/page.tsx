'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Image as ImageIcon, Music, Type, Loader2, Save, Workflow, Video, UploadCloud, SquarePen, MoreHorizontal, Sparkles } from 'lucide-react';
import { generateContent, ContentGenerationInput } from '@/ai/flows/content-generation-demo';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type GeneratorType = 'content' | 'avatar' | 'playlist';

const generators = [
  { value: 'content' as GeneratorType, label: 'Content Generator', icon: <Type className="w-5 h-5 mr-2" /> },
  { value: 'avatar' as GeneratorType, label: 'Avatar Generator', icon: <ImageIcon className="w-5 h-5 mr-2" /> },
  { value: 'playlist' as GeneratorType, label: 'Playlist Builder', icon: <Music className="w-5 h-5 mr-2" /> },
];

const toolShortcuts = [
    { label: 'Realtime Canvas', icon: <Sparkles /> },
    { label: 'Flow State', icon: <Workflow /> },
    { label: 'Video', icon: <Video /> },
    { label: 'Image', icon: <ImageIcon /> },
    { label: 'Upscaler', icon: <UploadCloud /> },
    { label: 'Canvas Editor', icon: <SquarePen /> },
    { label: 'More', icon: <MoreHorizontal /> },
]

const communityCreations = [
    { id: 'creation-1', imageId: 'auth-background', hint: 'cyberpunk city' },
    { id: 'creation-2', imageId: 'female-warrior-1', hint: 'fantasy warrior' },
    { id: 'creation-3', imageId: 'enchanted-forest-1', hint: 'enchanted forest' },
    { id: 'creation-4', imageId: 'fantasy-landscape-1', hint: 'fantasy landscape' },
]

export default function AiHubPage() {
  const { toast } = useToast();
  const [generatorType, setGeneratorType] = useState<GeneratorType>('content');
  const [prompt, setPrompt] = useState('A short story about a dragon who loves to cook...');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const heroImage = PlaceHolderImages.find(p => p.id === 'glowing-gem-1');

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        variant: 'destructive',
        title: 'Prompt is required',
        description: 'Please enter a prompt to generate content.',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const input: ContentGenerationInput = {
        type: generatorType,
        prompt: prompt,
      };
      const response = await generateContent(input);
      setResult(response.result);
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    toast({
        title: 'Login Required',
        description: 'Please log in or sign up as a member to save your creations.',
        variant: 'destructive'
    });
  }

  const getPromptPlaceholder = () => {
    switch (generatorType) {
      case 'content':
        return 'e.g., A short story about a dragon who loves to cook...';
      case 'avatar':
        return 'e.g., A futuristic knight with glowing blue armor...';
      case 'playlist':
        return 'e.g., A workout playlist with high-energy electronic music...';
      default:
        return 'Enter your prompt...';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Hero Banner */}
      {heroImage && (
        <div className="relative h-48 rounded-lg overflow-hidden flex flex-col justify-center items-center text-center p-4 text-white">
            <Image src={heroImage.imageUrl} alt="AI Hub Banner" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10">
                <h2 className="text-2xl font-bold">Discover 50+ ready-made workflows for effortless AI creation.</h2>
                <p className="text-sm text-white/80">All Blueprints 75% off for a limited time!</p>
                <Button variant="secondary" className="mt-4">Explore Blueprints</Button>
            </div>
        </div>
      )}

      {/* Tool Shortcuts */}
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {toolShortcuts.map((tool) => (
          <Button key={tool.label} variant="ghost" className="flex flex-col h-auto p-3 gap-1 text-muted-foreground">
            <div className="w-12 h-12 bg-card/50 rounded-lg flex items-center justify-center border border-border">
                {tool.icon}
            </div>
            <span className="text-xs">{tool.label}</span>
          </Button>
        ))}
      </div>
      
       <div className="text-center">
         <h1 className="text-5xl font-bold font-headline tracking-widest text-primary uppercase" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}>
            AI HUB
          </h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Unleash your creativity. Experiment with our powerful AI tools to generate content, avatars, and more.
          </p>
       </div>

      {/* Community Creations */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-primary">Community Creations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-64">
          {communityCreations.map((creation) => {
            const image = PlaceHolderImages.find(p => p.id === creation.imageId);
            return (
              <div key={creation.id} className="relative rounded-lg overflow-hidden group">
                {image && <Image src={image.imageUrl} alt={creation.hint} fill className="object-cover" />}
                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <p className="text-white text-center text-sm">{creation.hint}</p>
                 </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generator Controls */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>AI Content Generation Demo</CardTitle>
            <CardDescription>Select a tool, provide a prompt, and see the magic happen.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Generator</label>
              <Select value={generatorType} onValueChange={(value) => setGeneratorType(value as GeneratorType)}>
                <SelectTrigger className="w-full h-11 text-base">
                  <SelectValue placeholder="Select a generator" />
                </SelectTrigger>
                <SelectContent>
                  {generators.map((gen) => (
                    <SelectItem key={gen.value} value={gen.value} className="text-base">
                      <div className="flex items-center">
                        {gen.icon} {gen.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Enter Your Prompt</label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={getPromptPlaceholder()}
                className="min-h-[120px] text-base"
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerate} disabled={isLoading} className="w-full h-11 text-lg">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Bot className="mr-2 h-5 w-5" />
                  Generate
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Result Display */}
        <Card className="bg-card/50 flex flex-col">
          <CardHeader>
            <CardTitle>Generated Result</CardTitle>
            <CardDescription>The output from the AI will appear here. Saving is for members only.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center">
            {isLoading && (
              <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p>The AI is thinking...</p>
              </div>
            )}
            {!isLoading && !result && (
              <div className="text-center text-muted-foreground">
                <Bot className="w-16 h-16 mx-auto mb-4" />
                <p>Your creation will be displayed here.</p>
              </div>
            )}
            {!isLoading && result && (
              <div className="w-full">
                {generatorType === 'avatar' ? (
                  <Image
                    src={result}
                    alt="Generated Avatar"
                    width={512}
                    height={512}
                    className="rounded-lg object-cover w-full aspect-square"
                  />
                ) : (
                  <div className="p-4 bg-secondary/50 rounded-lg max-h-[300px] overflow-y-auto">
                    <p className="whitespace-pre-wrap">{result}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={!result || isLoading} variant="outline" className="w-full h-11 text-lg">
              <Save className="mr-2 h-5 w-5" />
              Save Result
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
