
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, User, ArrowDown, ArrowUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";


export default function NetworkPage() {
    const upline = { name: 'The Chronicler', avatarId: 'knight-1' };
    const downline = [
        { name: 'Aria', avatarId: 'female-archer-1' },
        { name: 'Kael', avatarId: 'fighter-character' },
        { name: 'Seraphina', avatarId: 'explorer-1' },
    ]
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">สมาชิกที่เชื่อมโยง</h1>
        <p className="text-muted-foreground">เครือข่ายแห่งการสนับสนุน: ดูข้อมูล Upline และ Downline ของคุณ</p>
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
    </div>
  );
}
