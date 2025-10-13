
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, User, ArrowDown, ArrowUp, Link as LinkIcon, Share2, Copy, Gift } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function NetworkPage() {
    const upline = { name: 'The Chronicler', avatarId: 'knight-1' };
    const downline = [
        { name: 'Aria', avatarId: 'female-archer-1' },
        { name: 'Kael', avatarId: 'fighter-character' },
        { name: 'Seraphina', avatarId: 'explorer-1' },
    ]
    const referralCode = "MESY-USER123";
    const referralLink = `https://mesy.io/signup?ref=${referralCode}`;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">สมาชิกที่เชื่อมโยง</h1>
        <p className="text-muted-foreground">เครือข่ายแห่งการสนับสนุน: ดูข้อมูล Upline, Downline และเชิญเพื่อนของคุณ</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ArrowUp className="text-primary"/> Upline
                </CardTitle>
                <CardDescription>ผู้ที่นำทางคุณเข้าสู่จักรวาลนี้</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <Avatar>
                        <AvatarImage src={PlaceHolderImages.find(i => i.id === upline.avatarId)?.imageUrl} />
                        <AvatarFallback>{upline.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">{upline.name}</p>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ArrowDown className="text-primary"/> Downline
                </CardTitle>
                <CardDescription>ผู้ที่คุณได้นำทางเข้ามา (3 คนล่าสุด)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                 {downline.map(member => (
                    <div key={member.name} className="flex items-center gap-4 p-2 border rounded-lg">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={PlaceHolderImages.find(i => i.id === member.avatarId)?.imageUrl} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="font-medium text-sm">{member.name}</p>
                    </div>
                 ))}
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="text-primary" />
            Invite Friends & Earn Rewards
          </CardTitle>
          <CardDescription>
            Share your unique referral link. When a friend signs up, you both receive a special reward in your Gift Box!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="referral-link">Your Referral Link</Label>
                <div className="flex items-center gap-2">
                    <Input id="referral-link" type="text" readOnly value={referralLink} />
                    <Button variant="outline" size="icon" onClick={() => navigator.clipboard.writeText(referralLink)}>
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy link</span>
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full">
                    <Share2 className="mr-2 h-4 w-4"/> Share
                </Button>
                {/* Add specific social share buttons if needed */}
            </div>
            <Card className="bg-secondary/30">
                <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                        <span className="font-bold text-foreground">Referrer's Reward:</span> 1x Rare Loot Box.
                        <br />
                        <span className="font-bold text-foreground">New Member's Reward:</span> 1x Starter Pack containing essential items.
                    </p>
                </CardContent>
            </Card>
        </CardContent>
      </Card>
    </div>
  );
}
