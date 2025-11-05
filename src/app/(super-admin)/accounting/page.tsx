
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowUp, ArrowDown, DollarSign, Wallet, FileText, Book, FileBarChart2 } from "lucide-react";
import React from 'react';

const StatCard = ({ title, value, icon, change, changeType }: { title: string, value: string, icon: React.ReactNode, change: string, changeType: 'increase' | 'decrease' }) => (
    <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-4xl font-bold">{value}</div>
            <p className={`text-xs ${changeType === 'increase' ? 'text-green-400' : 'text-red-400'} flex items-center`}>
                {changeType === 'increase' ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                {change} from last month
            </p>
        </CardContent>
    </Card>
);

const recentTransactions = [
    { id: 'TRN001', date: '2024-10-28', description: 'Service Fee Batch (Oct)', amount: 1258.50, type: 'Revenue' },
    { id: 'TRN002', date: '2024-10-27', description: 'Cloud Service Payment', amount: -450.00, type: 'Expense' },
    { id: 'TRN003', date: '2024-10-26', description: 'Member Payout: Zane', amount: -970.00, type: 'Payout' },
    { id: 'TRN004', date: '2024-10-25', description: 'Marketplace Fee (W4)', amount: 234.75, type: 'Revenue' },
];

export default function AccountingPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3"><Calculator className="h-8 w-8"/> Management Accounting</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Revenue" value="$4,850.32" icon={<DollarSign className="text-muted-foreground h-5 w-5"/>} change="+20.1%" changeType="increase" />
                <StatCard title="Total Expenses" value="$1,820.75" icon={<Wallet className="text-muted-foreground h-5 w-5"/>} change="+5.2%" changeType="increase" />
                <StatCard title="Net Income" value="$3,029.57" icon={<FileBarChart2 className="text-muted-foreground h-5 w-5"/>} change="+28.4%" changeType="increase" />
                <StatCard title="Cash Flow" value="$8,950.00" icon={<Book className="text-muted-foreground h-5 w-5"/>} change="-2.1%" changeType="decrease" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card className="bg-card/50 backdrop-blur-sm border-white/10 text-white">
                        <CardHeader>
                            <CardTitle>Recent Transactions (General Ledger)</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                A log of all financial activities across the platform.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Transaction ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead className="text-right">Amount (USD)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentTransactions.map(tx => (
                                        <TableRow key={tx.id}>
                                            <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                                            <TableCell>{tx.date}</TableCell>
                                            <TableCell>{tx.description}</TableCell>
                                            <TableCell>
                                                <Badge variant={tx.type === 'Revenue' ? 'default' : tx.type === 'Expense' ? 'destructive' : 'secondary'} className={tx.type === 'Revenue' ? 'bg-green-500/80 hover:bg-green-500/70 border-none' : ''}>
                                                    {tx.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className={`text-right font-medium ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {tx.amount > 0 ? '+' : ''}${tx.amount.toFixed(2)}
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
                            <CardTitle>Financial Reports</CardTitle>
                             <CardDescription className="text-muted-foreground">Generate and download financial statements.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button variant="outline" className="w-full justify-start gap-2"><FileText className="h-4 w-4"/> Income Statement</Button>
                            <Button variant="outline" className="w-full justify-start gap-2"><FileText className="h-4 w-4"/> Balance Sheet</Button>
                            <Button variant="outline" className="w-full justify-start gap-2"><FileText className="h-4 w-4"/> Cash Flow Statement</Button>
                        </CardContent>
                    </Card>
                     <Card className="bg-card/50 backdrop-blur-sm border-white/10 text-white">
                        <CardHeader>
                            <CardTitle>Bookkeeping & Audit</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                             <Button variant="outline" className="w-full justify-start gap-2"><Book className="h-4 w-4"/> View General Ledger</Button>
                             <Button variant="outline" className="w-full justify-start gap-2"><FileBarChart2 className="h-4 w-4"/> Start New Audit</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
