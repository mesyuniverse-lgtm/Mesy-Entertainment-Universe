
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Cpu, SlidersHorizontal, Shield, BrainCircuit } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const aiAgents = [
    { id: 'agent-01', name: 'Warden', task: 'Content Moderation', model: 'Gemini 2.5 Flash', status: 'Active' },
    { id: 'agent-02', name: 'Chronicler', task: 'Quest Generation', model: 'Gemini 1.5 Pro', status: 'Active' },
    { id: 'agent-03', name: 'Artisan', task: 'Image Generation', model: 'Imagen 4.0', status: 'Inactive' },
    { id: 'agent-04', name: 'Oracle', task: 'Data Analysis', model: 'Gemini 1.5 Pro', status: 'Active' },
];

export default function AISystemPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3"><Bot className="h-8 w-8"/> AI System Configuration</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card className="bg-card/50 backdrop-blur-sm border-white/10 text-white">
                        <CardHeader>
                            <CardTitle>AI Agent Management (NPCs)</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Activate, deactivate, and configure AI agents responsible for various tasks.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>NPC Name</TableHead>
                                        <TableHead>Assigned Task</TableHead>
                                        <TableHead>Model</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {aiAgents.map(agent => (
                                        <TableRow key={agent.id}>
                                            <TableCell className="font-semibold">{agent.name}</TableCell>
                                            <TableCell>{agent.task}</TableCell>
                                            <TableCell><Badge variant="outline">{agent.model}</Badge></TableCell>
                                            <TableCell>
                                                <Badge variant={agent.status === 'Active' ? 'default' : 'destructive'} className={agent.status === 'Active' ? 'bg-green-500/80' : ''}>
                                                    {agent.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right flex items-center justify-end gap-2">
                                                <Switch checked={agent.status === 'Active'} />
                                                <Button variant="ghost" size="sm">Configure</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
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
