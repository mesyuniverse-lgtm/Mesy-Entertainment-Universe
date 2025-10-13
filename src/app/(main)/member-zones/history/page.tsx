
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { History, UserPlus, Gift, ShieldCheck, DollarSign, Map, Edit } from "lucide-react";

export default function HistoryPage() {
    const historyData = [
        {
            date: "2025-11-20",
            type: "Profile",
            description: "Updated your bio.",
            details: "",
            icon: <Edit className="h-4 w-4 text-blue-500" />,
        },
        {
            date: "2025-11-19",
            type: "Quest",
            description: "Completed quest: 'First Creation'",
            details: "+50 EXP",
            icon: <Map className="h-4 w-4 text-yellow-500" />,
        },
        {
            date: "2025-11-18",
            type: "Income",
            description: "Monthly income processed.",
            details: "+$4,850.00",
            icon: <DollarSign className="h-4 w-4 text-green-500" />,
        },
        {
            date: "2025-11-17",
            type: "Gift Box",
            description: "Claimed daily login reward.",
            details: "1x Common Chest",
            icon: <Gift className="h-4 w-4 text-pink-500" />,
        },
         {
            date: "2025-11-16",
            type: "Network",
            description: "New downline member: Seraphina",
            details: "",
            icon: <UserPlus className="h-4 w-4 text-teal-500" />,
        },
        {
            date: "2025-11-15",
            type: "System",
            description: "Account created successfully.",
            details: "Welcome to MESY Universe!",
            icon: <ShieldCheck className="h-4 w-4 text-primary" />,
        },
    ];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight font-headline">ประวัติ</h1>
                <p className="text-muted-foreground">บันทึกการเดินทางของคุณ: ตรวจสอบกิจกรรมทั้งหมดที่เกิดขึ้นในบัญชีของคุณ</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <History className="text-primary"/> 
                        Activity Log
                    </CardTitle>
                    <CardDescription>A record of all significant actions and events related to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Details / Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {historyData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-muted-foreground whitespace-nowrap">{item.date}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {item.icon}
                                            <Badge variant="outline">{item.type}</Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell className="text-right font-mono">{item.details}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
