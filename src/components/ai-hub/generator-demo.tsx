"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateContent, ContentGenerationInput } from '@/ai/flows/content-generation-demo';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { Lock, Wand2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const formSchema = z.object({
    type: z.enum(['content', 'avatar', 'playlist']),
    prompt: z.string().min(10, { message: 'Prompt must be at least 10 characters.' }),
});

export function GeneratorDemo() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [generatedType, setGeneratedType] = useState<'content' | 'avatar' | 'playlist' | null>(null);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: 'content',
            prompt: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setResult(null);

        try {
            const output = await generateContent(values as ContentGenerationInput);
            setResult(output.result);
            setGeneratedType(values.type);
        } catch (error) {
            console.error('AI generation failed:', error);
            toast({
                variant: "destructive",
                title: "Generation Failed",
                description: "The AI failed to generate content. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleSave = () => {
        toast({
            title: "Feature Locked",
            description: "Please sign in or register to save your generations.",
            action: <Button size="sm" onClick={() => window.location.href = '/login'}>Login</Button>,
        });
    };

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>AI Generator Demo</CardTitle>
                    <CardDescription>Try our AI tools. Full features are available for members.</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a content type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="content">Blog Post</SelectItem>
                                                <SelectItem value="avatar">Fantasy Avatar</SelectItem>
                                                <SelectItem value="playlist">Music Playlist</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Prompt</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="e.g., 'A heroic knight with a glowing sword' for an avatar, or 'An article about the future of AI in gaming'"
                                                className="resize-none h-28"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                ) : <Wand2 className="mr-2 h-4 w-4" />}
                                Generate
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>

            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Generated Output</CardTitle>
                    <CardDescription>Your AI-generated result will appear here.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center p-4 min-h-[300px]">
                    {isLoading ? (
                        <div className="text-center space-y-2">
                             <svg className="animate-spin mx-auto h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                             <p className="text-muted-foreground">Generating...</p>
                        </div>
                    ) : result ? (
                        <div className="w-full h-full">
                            {generatedType === 'avatar' ? (
                                <Image src={result} alt="Generated Avatar" width={512} height={512} className="rounded-lg object-contain mx-auto max-h-full w-auto" />
                            ) : (
                                <Textarea readOnly value={result} className="h-full w-full text-sm resize-none" />
                            )}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground">
                             <Image
                                src={PlaceHolderImages.find((img) => img.id === 'glowing-gem-1')?.imageUrl || ''}
                                alt="Placeholder"
                                data-ai-hint="glowing orb"
                                width={200}
                                height={200}
                                className="rounded-lg object-cover mx-auto opacity-20"
                            />
                            <p className="mt-4">Your result will be shown here.</p>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSave} className="w-full" variant="outline" disabled={!result}>
                        <Lock className="mr-2 h-4 w-4" /> Save Generation
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
