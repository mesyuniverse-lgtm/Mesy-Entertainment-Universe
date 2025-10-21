
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data simulating users from Firestore
const users = [
    { uid: "user-001", displayName: "The Chronicler", email: "chronicler@mesy.io", role: "Super-admin", level: 50, createdAt: "2025-10-01", avatarId: "knight-1" },
    { uid: "user-002", displayName: "Aria", email: "aria@mesy.io", role: "Admin", level: 48, createdAt: "2025-10-02", avatarId: "female-archer-1" },
    { uid: "user-003", displayName: "Kael", email: "kael@mesy.io", role: "Admin", level: 47, createdAt: "2025-10-03", avatarId: "fighter-character" },
    { uid: "user-004", displayName: "User", email: "user@mesy.io", role: "Member", level: 5, createdAt: "2025-11-15", avatarId: "default-avatar" },
    { uid: "user-005", displayName: "Seraphina", email: "seraphina@mesy.io", role: "User", level: 5, createdAt: "2025-11-16", avatarId: "explorer-1" },
];

export default function AdminUsersPage() {

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                <p className="text-muted-foreground">A list of all users in the MESY Universe.</p>
            </div>
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.uid}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={PlaceHolderImages.find(i => i.id === user.avatarId)?.imageUrl} alt={user.displayName} />
                                                <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{user.displayName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.role.includes("admin") ? "destructive" : "outline"}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{user.level}</TableCell>
                                    <TableCell className="text-muted-foreground">{user.createdAt}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Actions</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
