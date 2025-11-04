
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Monitor as MonitorIcon, Bot, Users, Shield, Code, Drama } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Label } from "@/components/ui/label";

const mockUsers = [
    { id: 'usr_001', email: 'user@mesy.io', role: 'User', status: 'Active', avatar: PlaceHolderImages.find(i => i.id === 'explorer-1')?.imageUrl },
    { id: 'usr_002', email: 'member@mesy.io', role: 'Member', status: 'Active', avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl },
    { id: 'usr_003', email: 'dev@mesy.io', role: 'Developer', status: 'Active', avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl },
    { id: 'usr_004', email: 'admin@mesy.io', role: 'Admin', status: 'Active', avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl },
    { id: 'usr_005', email: 'team_lead@mesy.io', role: 'Team', status: 'Active', avatar: PlaceHolderImages.find(i => i.id === 'glowing-gem-1')?.imageUrl },
    { id: 'usr_006', email: 'suspended@mesy.io', role: 'User', status: 'Suspended', avatar: PlaceHolderImages.find(i => i.id === 'fighter-silhouette')?.imageUrl },
];

const UserTable = ({ filterRole }: { filterRole?: string }) => {
    const users = filterRole ? mockUsers.filter(u => u.role === filterRole) : mockUsers;
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map(user => (
                    <TableRow key={user.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>{user.email.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{user.email}</div>
                            </div>
                        </TableCell>
                        <TableCell><Badge variant="secondary">{user.role}</Badge></TableCell>
                        <TableCell><Badge variant={user.status === 'Active' ? 'outline' : 'destructive'}>{user.status}</Badge></TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Manage</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default function MonitorPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3"><MonitorIcon className="h-8 w-8"/> Universe Monitor</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card className="bg-card/50 backdrop-blur-sm border-white/10 text-white">
                        <CardHeader>
                            <CardTitle>User Monitoring</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Oversee and manage all users across different zones.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="all">
                                <TabsList className="grid w-full grid-cols-5">
                                    <TabsTrigger value="all"><Users className="mr-2"/> All</TabsTrigger>
                                    <TabsTrigger value="members"><Shield className="mr-2"/> Members</TabsTrigger>
                                    <TabsTrigger value="developers"><Code className="mr-2"/> Developers</TabsTrigger>
                                    <TabsTrigger value="teams"><Drama className="mr-2"/> Teams</TabsTrigger>
                                    <TabsTrigger value="suspended">Suspended</TabsTrigger>
                                </TabsList>
                                <TabsContent value="all" className="mt-4"><UserTable /></TabsContent>
                                <TabsContent value="members" className="mt-4"><UserTable filterRole="Member" /></TabsContent>
                                <TabsContent value="developers" className="mt-4"><UserTable filterRole="Developer" /></TabsContent>
                                <TabsContent value="teams" className="mt-4"><UserTable filterRole="Team" /></TabsContent>
                                <TabsContent value="suspended" className="mt-4"><UserTable filterRole="Suspended" /></TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                     <Card className="bg-card/50 backdrop-blur-sm border-white/10 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Bot /> AI Zone Controller</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Use AI to generate quests, rules, and conditions for different zones.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="zone-select">Target Zone</Label>
                                <Select>
                                    <SelectTrigger id="zone-select">
                                        <SelectValue placeholder="Select a zone..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="developer">Developer Zone</SelectItem>
                                        <SelectItem value="member">Member Zone</SelectItem>
                                        <SelectItem value="public">Public Zone</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="ai-prompt">Prompt</Label>
                                <Textarea id="ai-prompt" placeholder="e.g., 'Create a quest for new developers to verify their skills by building a simple Genkit flow...'" className="h-36 bg-background/50" />
                            </div>
                            <Button className="w-full">Generate with AI</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
