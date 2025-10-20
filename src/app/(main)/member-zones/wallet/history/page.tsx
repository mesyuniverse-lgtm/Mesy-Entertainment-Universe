
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { History, ArrowUpRight, ArrowDownLeft, PiggyBank, CircleAlert, CircleCheck, CircleHelp } from "lucide-react";

export default function WalletHistoryPage() {
    const transactionHistory = [
        {
            date: "2025-11-20 14:30",
            type: "Income",
            description: "Monthly member income",
            amount: "+$4,850.00",
            status: "Completed",
            icon: <PiggyBank className="h-5 w-5 text-green-500" />,
        },
        {
            date: "2025-11-18 10:00",
            type: "Withdrawal",
            description: "Withdraw to connected bank",
            amount: "-$1,000.00",
            status: "Pending",
            icon: <ArrowUpRight className="h-5 w-5 text-orange-500" />,
        },
        {
            date: "2025-11-15 09:12",
            type: "Deposit",
            description: "Deposit from external source",
            amount: "+$500.00",
            status: "Completed",
            icon: <ArrowDownLeft className="h-5 w-5 text-blue-500" />,
        },
        {
            date: "2025-11-10 18:05",
            type: "Fee",
            description: "Marketplace transaction fee",
            amount: "-$2.50",
            status: "Completed",
            icon: <CircleCheck className="h-5 w-5 text-muted-foreground" />,
        },
        {
            date: "2025-11-08 12:00",
            type: "Withdrawal",
            description: "Withdraw to external wallet",
            amount: "-$250.00",
            status: "Failed",
            icon: <CircleAlert className="h-5 w-5 text-red-500" />,
        }
    ];

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'Completed':
                return 'default';
            case 'Pending':
                return 'secondary';
            case 'Failed':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <History className="text-primary"/>
                    Transaction History
                </CardTitle>
                <CardDescription>A complete log of all your financial activities within the MESY Universe.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[180px]">Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactionHistory.map((tx, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-mono text-xs text-muted-foreground">{tx.date}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {tx.icon}
                                        <span className="font-medium">{tx.type}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{tx.description}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusBadgeVariant(tx.status)}>{tx.status}</Badge>
                                </TableCell>
                                <TableCell className={`text-right font-semibold ${tx.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                    {tx.amount}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
