'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, QrCode, CheckCircle2, XCircle, Star } from "lucide-react";

// Custom components for payment provider icons
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


export default function UserPaymentPage() {
     const verificationStatus = {
        email: true,
        phone: false,
        payment: false,
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Upgrade to MESY Member</CardTitle>
                    <CardDescription>To unlock member benefits, please complete your verification and pay the one-time registration fee.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>1. Verification Status</CardTitle>
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
                            <CardTitle>2. Connect Payment for Verification</CardTitle>
                            <CardDescription>คุณยังทำธุรกรรมไม่ได้ กรุณาเชื่อมต่อ Payment เพื่อยืนยันตน</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button variant="outline" className="h-16 flex justify-start items-center gap-3 text-base p-4"><CreditCard className="h-6 w-6 text-primary"/> Credit / Debit Card</Button>
                            <Button variant="outline" className="h-16 flex justify-start items-center gap-3 text-base p-4"><PayPalIcon className="h-6 w-6"/> PayPal</Button>
                            <Button variant="outline" className="h-16 flex justify-start items-center gap-3 text-base p-4"><TrueMoneyIcon className="h-6 w-6"/> TrueMoney</Button>
                            <Button variant="outline" className="h-16 flex justify-start items-center gap-3 text-base p-4"><QrCode className="h-6 w-6 text-primary"/> QR Code Payment</Button>
                            <Button variant="outline" className="h-16 flex justify-start items-center gap-3 text-base p-4 sm:col-span-2"><GooglePayIcon className="h-8"/> </Button>
                        </CardContent>
                    </Card>
                     <Card className="border-primary/50 bg-primary/10">
                        <CardHeader>
                            <CardTitle>3. Registration Fee</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <p className="text-4xl font-bold">$9.99 <span className="text-lg text-muted-foreground font-normal">USD</span></p>
                                <p className="text-muted-foreground">One-time payment for lifetime membership.</p>
                            </div>
                            <Button size="lg" disabled={!verificationStatus.email || !verificationStatus.phone || !verificationStatus.payment}>
                                <Star className="mr-2 h-5 w-5"/> Upgrade & Pay
                            </Button>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
}
