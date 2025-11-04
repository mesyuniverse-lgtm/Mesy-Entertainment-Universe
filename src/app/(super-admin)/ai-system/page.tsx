
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Cpu, SlidersHorizontal, Shield, BrainCircuit, PlusCircle, KeyRound, Gem, Upload, Link as LinkIcon, FileText, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import React from "react";


const aiAgents = [
    { id: 'agent-01', name: 'Warden', task: 'Content Moderation', model: 'Gemini 2.5 Flash', status: 'Active', credits: 150, maxCredits: 1000 },
    { id: 'agent-02', name: 'Chronicler', task: 'Quest Generation', model: 'Gemini 1.5 Pro', status: 'Active', credits: 950, maxCredits: 1000 },
    { id: 'agent-03', name: 'Artisan', task: 'Image Generation', model: 'Imagen 4.0', status: 'Inactive', credits: 0, maxCredits: 500 },
    { id: 'agent-04', name: 'Oracle', task: 'Data Analysis', model: 'Gemini 1.5 Pro', status: 'Active', credits: 850, maxCredits: 1000 },
    { id: 'agent-05', name: 'Lorekeeper', task: 'Local Knowledge Base', model: 'Local LLM (Free)', status: 'Active', credits: 0, maxCredits: 0 },
];

const modelOptions = [
    { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', isFree: false },
    { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', isFree: false },
    { value: 'imagen-4', label: 'Imagen 4.0', isFree: false },
    { value: 'local-llm', label: 'Local LLM (Free)', isFree: true },
];

export default function AISystemPage() {
    const [selectedModel, setSelectedModel] = React.useState<typeof modelOptions[0] | null>(null);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3"><Bot className="h-8 w-8"/> AI System Configuration</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card className="bg-card/50 backdrop-blur-sm border-white/10 text-white">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>AI Agent Management (NPCs)</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        Activate, deactivate, and configure AI agents responsible for various tasks.
                                    </CardDescription>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4"/> Create AI Agent</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-2xl bg-card/80 backdrop-blur-sm border-primary/20 text-white">
                                        <DialogHeader>
                                            <DialogTitle>Create New AI Agent</DialogTitle>
                                            <DialogDescription>
                                                Configure a new AI agent, assign its role, and provide it with a knowledge base.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid md:grid-cols-2 gap-6 py-4">
                                            {/* Left Column: Agent Configuration */}
                                            <div className="space-y-4">
                                                <h4 className="text-lg font-semibold text-primary">Agent Configuration</h4>
                                                <div className="space-y-2">
                                                    <Label htmlFor="agent-name">Agent Name</Label>
                                                    <Input id="agent-name" placeholder="e.g., 'Librarian'" className="bg-background/50" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="agent-model">AI Model</Label>
                                                    <Select onValueChange={(value) => {
                                                        const model = modelOptions.find(m => m.value === value);
                                                        setSelectedModel(model || null);
                                                    }}>
                                                        <SelectTrigger id="agent-model"><SelectValue placeholder="Select a base model" /></SelectTrigger>
                                                        <SelectContent>
                                                            {modelOptions.map(model => (
                                                                <SelectItem key={model.value} value={model.value}>{model.label}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="agent-task">Assigned Task</Label>
                                                    <Input id="agent-task" placeholder="e.g., 'Answers lore questions'" className="bg-background/50" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="agent-zone">Zone</Label>
                                                    <Select>
                                                        <SelectTrigger id="agent-zone"><SelectValue placeholder="Select a zone to manage" /></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="public">Public Zones</SelectItem>
                                                            <SelectItem value="member">Member Zones</SelectItem>
                                                            <SelectItem value="developer">Developer Zone</SelectItem>
                                                            <SelectItem value="all">All Zones</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                 <div className="space-y-2">
                                                    <Label htmlFor="api-key" className="flex items-center gap-2"><KeyRound className="h-4 w-4"/> API Key</Label>
                                                    <Input id="api-key" placeholder="Enter API Key (optional)" className="bg-background/50" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="mcp-budget" className={cn("flex items-center gap-2", selectedModel?.isFree && "text-muted-foreground")}>
                                                            <Gem className="h-4 w-4"/> MCP Budget
                                                        </Label>
                                                        <Input id="mcp-budget" type="number" placeholder={selectedModel?.isFree ? "No cost" : "e.g., 1000"} className="bg-background/50" disabled={selectedModel?.isFree} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="credit" className={cn("flex items-center gap-2", selectedModel?.isFree && "text-muted-foreground")}>
                                                            <Gem className="h-4 w-4"/> Credit
                                                        </Label>
                                                        <Input id="credit" type="number" placeholder={selectedModel?.isFree ? "No cost" : "e.g., 500"} className="bg-background/50" disabled={selectedModel?.isFree} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Column: Knowledge & Prompt */}
                                            <div className="space-y-4">
                                                <h4 className="text-lg font-semibold text-primary">Knowledge Base & Prompt</h4>
                                                <Tabs defaultValue="upload" className="w-full">
                                                    <TabsList className="grid w-full grid-cols-3">
                                                        <TabsTrigger value="upload"><Upload className="mr-2 h-4 w-4"/>Upload</TabsTrigger>
                                                        <TabsTrigger value="url"><LinkIcon className="mr-2 h-4 w-4"/>URL</TabsTrigger>
                                                        <TabsTrigger value="text"><FileText className="mr-2 h-4 w-4"/>Text</TabsTrigger>
                                                    </TabsList>
                                                    <TabsContent value="upload" className="mt-4">
                                                        <div className="h-48 border-2 border-dashed border-muted-foreground/50 rounded-lg flex flex-col items-center justify-center text-center">
                                                            <Upload className="h-8 w-8 text-muted-foreground"/>
                                                            <p className="mt-2 text-sm text-muted-foreground">Drag & drop files here or</p>
                                                            <Button variant="link" className="text-primary">browse files</Button>
                                                            <p className="text-xs text-muted-foreground/80">.txt, .md, .pdf</p>
                                                        </div>
                                                    </TabsContent>
                                                    <TabsContent value="url" className="mt-4 space-y-2">
                                                         <Label htmlFor="knowledge-url">Website URL</Label>
                                                        <Input id="knowledge-url" placeholder="https://example.com/info" className="bg-background/50" />
                                                        <Button className="w-full">Fetch Data</Button>
                                                    </TabsContent>
                                                    <TabsContent value="text" className="mt-4">
                                                        <Textarea placeholder="You are a helpful and wise librarian. Your goal is to guide new users through the lore of the MESY Universe..." className="h-48 bg-background/50" />
                                                    </TabsContent>
                                                </Tabs>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">Create Agent</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>NPC Name</TableHead>
                                        <TableHead>Assigned Task</TableHead>
                                        <TableHead>Credits</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {aiAgents.map(agent => {
                                        const creditPercentage = (agent.credits / agent.maxCredits) * 100;
                                        const isLowCredit = creditPercentage < 20;
                                        const isFree = agent.maxCredits === 0;

                                        return (
                                        <TableRow key={agent.id}>
                                            <TableCell className="font-semibold">{agent.name}</TableCell>
                                            <TableCell>{agent.task}</TableCell>
                                            <TableCell>
                                                {isFree ? (
                                                    <span className="text-muted-foreground text-xs italic">No cost for this model</span>
                                                ) : (
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <div className="w-40 cursor-pointer group flex items-center gap-2">
                                                                 <div
                                                                    className={cn(
                                                                        "h-2 w-2 rounded-full bg-red-500",
                                                                        isLowCredit && agent.status === 'Active' ? "animate-pulse-fast" : "opacity-0"
                                                                    )}
                                                                ></div>
                                                                <div className="flex-grow">
                                                                    <div className="flex justify-between text-xs mb-1">
                                                                        <span className={cn("font-semibold", isLowCredit ? "text-red-400" : "text-primary")}>{agent.credits.toLocaleString()}</span>
                                                                        <span className="text-muted-foreground">/ {agent.maxCredits.toLocaleString()}</span>
                                                                    </div>
                                                                    <Progress value={creditPercentage} className={cn("h-2", isLowCredit && "[&>div]:bg-red-500")} />
                                                                </div>
                                                            </div>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-md bg-card/80 backdrop-blur-sm border-primary/20 text-white">
                                                            <DialogHeader>
                                                                <DialogTitle>Top-up Credits for {agent.name}</DialogTitle>
                                                                <DialogDescription>
                                                                    Add more credits to this agent to ensure continuous operation.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="space-y-4 py-4">
                                                                <p>Current Credits: <span className="font-bold">{agent.credits.toLocaleString()}</span></p>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="top-up-amount">Amount to Add</Label>
                                                                    <Input id="top-up-amount" type="number" placeholder="e.g., 500" className="bg-background/50"/>
                                                                </div>
                                                            </div>
                                                            <DialogFooter>
                                                                <Button type="button" variant="secondary">Cancel</Button>
                                                                <Button type="submit"><Plus className="mr-2 h-4 w-4"/> Top-up</Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={agent.status === 'Active' ? 'default' : 'destructive'} className={cn(agent.status === 'Active' ? 'bg-green-500/80 hover:bg-green-500/70' : 'bg-red-500/80 hover:bg-red-500/70', "border-none")}>
                                                    {agent.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right flex items-center justify-end gap-2">
                                                <Switch checked={agent.status === 'Active'} />
                                                <Button variant="ghost" size="sm">Configure</Button>
                                            </TableCell>
                                        </TableRow>
                                    )})}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                 <div className="space-y-6">
                     <Card className="bg-card/50 backdrop-blur-sm border-white/10 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Cpu /> Model Configuration</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Assign specific models to core system functionalities.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div>
                                <Label>Default Text Generation</Label>
                                <Select defaultValue="gemini-2.5-flash">
                                    <SelectTrigger><SelectValue/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                                        <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Default Image Generation</Label>
                                <Select defaultValue="imagen-4">
                                    <SelectTrigger><SelectValue/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="imagen-4">Imagen 4.0</SelectItem>
                                        <SelectItem value="dall-e-3">DALL-E 3 (via API)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                     <Card className="bg-card/50 backdrop-blur-sm border-white/10 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Shield /> Safety Settings</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Adjust global content safety filters for AI generation.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div>
                                <Label>Hate Speech</Label>
                                <Select defaultValue="block-medium">
                                    <SelectTrigger><SelectValue/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="block-none">Block None</SelectItem>
                                        <SelectItem value="block-low">Block Low & Above</SelectItem>
                                        <SelectItem value="block-medium">Block Medium & Above</SelectItem>
                                        <SelectItem value="block-high">Block Only High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div>
                                <Label>Harassment</Label>
                                <Select defaultValue="block-medium">
                                    <SelectTrigger><SelectValue/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="block-none">Block None</SelectItem>
                                        <SelectItem value="block-low">Block Low & Above</SelectItem>
                                        <SelectItem value="block-medium">Block Medium & Above</SelectItem>
                                        <SelectItem value="block-high">Block Only High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
