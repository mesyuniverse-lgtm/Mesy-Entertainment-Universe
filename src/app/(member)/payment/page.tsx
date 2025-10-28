'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, QrCode, CheckCircle2, XCircle, ShoppingBag, RadioTower, Film, Wallet, Settings, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const PayPalIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="#003087" d="M20.55 5.51a1.27 1.27 0 0 0-1.25-1.07h-5.59c-.28 0-.54.1-.73.28L8.1 8.78c-.19.17-.45.27-.72.27H4.32a1.27 1.27 0 0 0-1.25 1.07L1 20.49a.62.62 0 0 0 .61.76h6.12c.28 0 .54-.1.73-.28l4.88-4.06c.19-.17.45-.27.72-.27h3.33a1.27 1.27 0 0 0 1.25-1.07l2.1-9.06Z" />
        <path fill="#009cde" d="m22.66 4.34-2.1 9.06a1.27 1.27 0 0 1-1.25 1.07h-3.33c-.28 0-.54.1-.72.27L10.38 19c-.19.17-.45.27-.73.27H3.53a.62.62 0 0 1-.6-.76L5.1 4.34a1.27 1.27 0 0 1 1.25-1.07h5.59c.28 0 .54.1.73.28l4.88 4.06c.19.17.45-.27.72.27h3.06c.7 0 1.23.63 1.13 1.23Z" />
        <path fill="#002f86" d="m14.28 8.89.06-2.61a1.18 1.18 0 0 0-1.16-1.28h-5.6a.44.44 0 0 0-.43.48l1.72 7.42c.07.28.32.48.6.48h2.32c.7 0 1.23-.63 1.13-1.23L12 8.52c-.1-.6.3-1.15.89-1.15h1.39Z" />
    </svg>
);

const TrueMoneyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" fill="#F08F1A"/>
        <path d="M12 6v12" stroke="#fff" strokeWidth="2.5"/>
        <path d="M15.5 9.5a3.5 3.5 0 1 0 0 5" stroke="#fff" strokeWidth="2.5"/>
    </svg>
);

const GooglePayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 52 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.745 8.653h-2.274v2.546h2.153a2.71 2.71 0 0 1-.03 5.42H39.47v2.54h2.29a5.257 5.257 0 0 0 .046-10.506z" fill="#4285F4"></path>
        <path d="M47.385 11.2h2.274v2.54h-2.274zM32.33 8.653v10.51h2.274V8.653z" fill="#34A853"></path>
        <path d="M51.93 11.2h-2.275v7.96h2.275zM47.385 8.653h2.274v2.54h-2.274z" fill="#FBBC04"></path>
        <path d="M37.195 8.653h2.274v10.51h-2.274z" fill="#EA4335"></path>
        <path d="M34.604 11.2v-2.54h-2.274v10.51h2.274V13.75h2.274v-2.54h-2.274z" fill="#4285F4"></path>
        <path d="M49.66 8.653h2.274v2.54h-2.274z" fill="#EA4335"></path>
        <path d="M9.476 11.168h2.392l-3.05 4.88-3.06-4.88h2.393v-2.2h-3.83v-.002L.003 4.14v-.002h2.51l2.053 3.655 2.05-3.655h2.513l-4.32 7.727v.002h4.38v2.203h-6.95v-2.203zM21.285 4.138h2.46c2.05 0 3.326.96 3.326 2.396 0 1.05-.623 1.76-1.57 2.004l1.83 3.592h-2.73l-1.58-3.21h-1.737v3.21h-2.46V4.138zm2.46 3.61c1.23 0 1.95-.56 1.95-1.42 0-.82-.69-1.39-1.89-1.39h-1.92v2.81h1.86zM15.435 4.138h6.77v2.202h-4.25v1.28h3.9v2.13h-3.9v1.28h4.31v2.204h-6.83V4.138z" fill="#5F6368"></path>
    </svg>
);


export default function PaymentPage() {
    const verificationStatus = {
        email: true,
        phone: false,
        payment: false,
    };

    const subscriptions = [
        { name: 'Lazada', icon: <ShoppingBag className="h-6 w-6 text-orange-500" />, linked: true },
        { name: 'Shopee', icon: <ShoppingBag className="h-6 w-6 text-orange-600" />, linked: true },
        { name: 'TikTok', icon: <svg className="h-6 w-6" viewBox="0 0 24 24"><path fill="currentColor" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 0 .15.02.22.06c.07.04.13.09.18.15c.05.06.09.13.12.21c.03.08.05.16.05.24v1.36c-.01.32-.15.63-.38.84c-.23.21-.54.33-.86.33c-.11 0-.21-.02-.32-.05c-1.38-.33-2.65-.82-3.8-1.45v5.3c.1.03.2.06.3.09c.39.12.75.31 1.07.57c.32.26.59.58.8.94c.21.36.36.76.45 1.18c.09.42.12.85.09 1.28c-.03.43-.12.85-.26 1.26c-.14.41-.34.8-.59 1.15c-.25.35-.55.66-.9.91c-.35.25-.74.45-1.15.59c-.41.14-.83.23-1.26.26c-.43.03-.86 0-1.28-.09c-.42-.09-.82-.24-1.18-.45c-.36-.21-.68-.48-.94-.8c-.26-.32-.45-.68-.57-1.07c-.12-.39-.19-.8-.21-1.21V10.7c0-3.34 2.81-6.05 6.16-6.05c.16 0 .32.01.47.03c.15.02.3.05.44.09c.14.04.28.09.41.15c.13.06.26.13.38.22c.12.09.23.2.33.31c.1.11.19.23.27.36c.08.13.14.26.2.4c.06.14.11.29.15.44c.04.15.07.3.08.45c.01.15.02.3.02.46v-1.9c-.49.25-.97.46-1.47.63c-1.46.49-2.96.75-4.47.75c-3.34 0-6.05-2.81-6.05-6.16c0-.85.18-1.68.5-2.44c.32-.76.77-1.45 1.34-2.02c.57-.57 1.26-1.02 2.02-1.34c.76-.32 1.59-.5 2.44-.5c.04 0 .09 0 .13.01Z"/></svg>, linked: false },
        { name: 'Facebook', icon: <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.04c-5.52 0-10 4.48-10 10s4.48 10 10 10s10-4.48 10-10S17.52 2.04 12 2.04zM16.5 8.25h-1.5v-1.5c0-.41.34-.75.75-.75h.75V3.75h-1.5c-1.66 0-3 1.34-3 3v1.5H10.5v2.25h1.5V18h3v-7.5h1.5l.75-2.25h-2.25v-1.5c0-.41.34-.75.75-.75h.75v-1.5h-.75c-.41 0-.75-.34-.75-.75v0z"/></svg>, linked: true },
        { name: 'YouTube', icon: <svg className="h-6 w-6 text-red-600" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.04c-5.52 0-10 4.48-10 10s4.48 10 10 10s10-4.48 10-10S17.52 2.04 12 2.04zM9.75 15.5V8.5l6 3.5-6 3.5z"/></svg>, linked: false },
        { name: 'Netflix', icon: <Film className="h-6 w-6 text-red-700" />, linked: false },
    ];


    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Verification Status</CardTitle>
                    <CardDescription>Complete verification to unlock all financial features.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                        <span className="font-medium">Email Verification</span>
                        {verificationStatus.email ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <XCircle className="h-6 w-6 text-destructive" />}
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                        <span className="font-medium">Phone Number</span>
                        {verificationStatus.phone ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <XCircle className="h-6 w-6 text-destructive" />}
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                        <span className="font-medium">Payment Method</span>
                        {verificationStatus.payment ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <XCircle className="h-6 w-6 text-destructive" />}
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>MESY Wallet Management</CardTitle>
                    <CardDescription>Manage your primary MESY Wallet and spending controls.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg space-y-4">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Wallet className="h-6 w-6 text-primary"/>
                                <span className="font-semibold">MESY Wallet</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Label htmlFor="switch-mesy-wallet" className="text-sm text-muted-foreground">
                                    Linked
                                </Label>
                                <Switch id="switch-mesy-wallet" checked={true} />
                            </div>
                        </div>
                        <div className="text-center pt-2">
                            <p className="text-sm text-muted-foreground">Current Balance</p>
                            <p className="text-4xl font-bold tracking-tighter">1,250.75 <span className="text-primary text-xl font-normal">MC</span></p>
                        </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <Label htmlFor="daily-limit" className="flex items-center gap-2 mb-2"><Settings className="h-4 w-4"/> Daily Spending Limit</Label>
                        <div className="flex items-center flex-wrap gap-4">
                            <Input id="daily-limit" type="number" placeholder="e.g., 1000" className="max-w-xs" />
                            <div className="flex gap-2">
                                <Button>Set Limit</Button>
                                <Button variant="secondary"><Plus className="mr-2 h-4 w-4"/> Top up</Button>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Set a limit of 0 for unlimited spending.</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Connect Payment Methods</CardTitle>
                    <CardDescription>Link your accounts to enable transactions and withdrawals.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-16 flex justify-start items-center gap-3 text-base p-4"><CreditCard className="h-6 w-6 text-primary"/> Credit / Debit Card</Button>
                    <Button variant="outline" className="h-16 flex justify-start items-center gap-3 text-base p-4"><PayPalIcon className="h-6 w-6"/> PayPal</Button>
                    <Button variant="outline" className="h-16 flex justify-start items-center gap-3 text-base p-4"><TrueMoneyIcon className="h-6 w-6"/> TrueMoney</Button>
                    <Button variant="outline" className="h-16 flex justify-start items-center gap-3 text-base p-4"><QrCode className="h-6 w-6 text-primary"/> QR Code Payment</Button>
                    <Button variant="outline" className="h-16 flex justify-start items-center gap-3 text-base p-4 sm:col-span-2"><GooglePayIcon className="h-8"/> </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Linked Services & Subscriptions</CardTitle>
                    <CardDescription>Manage your connections to external services and subscription packages.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {subscriptions.map(sub => (
                        <div key={sub.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                            <div className="flex items-center gap-4">
                                {sub.icon}
                                <span className="font-semibold">{sub.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Label htmlFor={`switch-${sub.name.toLowerCase()}`} className="text-sm text-muted-foreground">
                                    {sub.linked ? 'Linked' : 'Not Linked'}
                                </Label>
                                <Switch id={`switch-${sub.name.toLowerCase()}`} checked={sub.linked} />
                            </div>
                        </div>
                    ))}
                    <div className="pt-4 flex justify-end">
                        <Button variant="outline">Manage Subscriptions</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
