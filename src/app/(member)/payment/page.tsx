
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, QrCode, CheckCircle2, XCircle } from "lucide-react";

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

export default function PaymentPage() {
    const verificationStatus = {
        email: true,
        phone: false,
        payment: false,
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Verification Status</CardTitle>
                    <CardDescription>Complete verification to enable withdrawals and other financial features.</CardDescription>
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
                    <CardTitle>Connect Payment Methods</CardTitle>
                    <CardDescription>Link your accounts to enable transactions and withdrawals.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-16 flex justify-start items-center gap-3 text-base p-4"><CreditCard className="h-6 w-6 text-primary"/> Credit / Debit Card</Button>
                    <Button variant="outline" className="h-16 flex justify-start items-center gap-3 text-base p-4"><PayPalIcon className="h-6 w-6"/> PayPal</Button>
                    <Button variant="outline" className="h-16 flex justify-start items-center gap-3 text-base p-4"><TrueMoneyIcon className="h-6 w-6"/> TrueMoney</Button>
                    <Button variant="outline" className="h-16 flex justify-start items-center gap-3 text-base p-4"><QrCode className="h-6 w-6 text-primary"/> QR Code Payment</Button>
                </CardContent>
            </Card>
        </div>
    );
}
