import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const mockUsers = [
    { id: 'usr_1', email: 'user@mesy.io', role: 'User', status: 'Active' },
    { id: 'usr_2', email: 'member@mesy.io', role: 'Member', status: 'Active' },
    { id: 'usr_3', email: 'dev@mesy.io', role: 'Developer', status: 'Active' },
    { id: 'usr_4', email: 'admin@mesy.io', role: 'Admin', status: 'Active' },
    { id: 'usr_5', email: 'suspended@mesy.io', role: 'User', status: 'Suspended' },
  ];

    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Admin Panel</h1>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="text-primary"/> 
                        Member Management
                    </CardTitle>
                    <CardDescription>View, manage, and assign roles to users.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockUsers.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell><Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>{user.role}</Badge></TableCell>
                                    <TableCell><Badge variant={user.status === 'Active' ? 'outline' : 'destructive'}>{user.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Manage</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="mt-6">
                <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                        Super-admin Tools
                    </CardTitle>
                    <CardDescription>System configuration and feature toggles.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Super-admin controls for UI/UX configuration and transaction approval will be available here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
