'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, Image as ImageIcon, Music, Type, Loader2, Save } from 'lucide-react';
import { generateContent, ContentGenerationInput } from '@/ai/flows/content-generation-demo';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

type GeneratorType = 'content' | 'avatar' | 'playlist';

const generators = [
  { value: 'content' as GeneratorType, label: 'Content Generator', icon: <Type className="w-5 h-5 mr-2" /> },
  { value: 'avatar' as GeneratorType, label: 'Avatar Generator', icon: <ImageIcon className="w-5 h-5 mr-2" /> },
  { value: 'playlist' as GeneratorType, label: 'Playlist Builder', icon: <Music className="w-5 h-5 mr-2" /> },
];

export default function AiHubPage() {
  const { toast } = useToast();
  const [generatorType, setGeneratorType] = useState<GeneratorType>('content');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-widest text-primary uppercase" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}>
          AI Hub
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Unleash your creativity. Experiment with our powerful AI tools to generate content, avatars, and more.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generator Controls */}
        <Card className="bg-card/50 border-primary/20">
          <CardHeader>
            <CardTitle>AI Content Generation Demo</CardTitle>
            <CardDescription>Select a tool, provide a prompt, and see the magic happen.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Generator</label>
              <Select value={generatorType} onValueChange={(value) => setGeneratorType(value as GeneratorType)}>
                <SelectTrigger className="w-full h-12 text-base">
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
                className="min-h-[150px] text-base"
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerate} disabled={isLoading} className="w-full h-12 text-lg">
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
        <Card className="bg-card/50 border-primary/20 flex flex-col">
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
                  <div className="p-4 bg-secondary/50 rounded-lg max-h-[400px] overflow-y-auto">
                    <p className="whitespace-pre-wrap">{result}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={!result || isLoading} variant="outline" className="w-full h-12 text-lg">
              <Save className="mr-2 h-5 w-5" />
              Save Result
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
