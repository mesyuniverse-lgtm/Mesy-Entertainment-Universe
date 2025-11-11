import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Lock, HandCoins } from "lucide-react";

export default function MemberSystemPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Member System Overview</CardTitle>
                <CardDescription>
                    จุดประสงค์ของระบบนี้คือเพื่อปกป้องและรักษาสิทธิ์ของสมาชิก สร้างพื้นที่ที่ปลอดภัยในการสร้างรายได้และทำธุรกรรม
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                    <ShieldCheck className="h-8 w-8 text-primary mt-1" />
                    <div>
                        <h3 className="font-semibold">การปกป้องสิทธิ์ของสมาชิก</h3>
                        <p className="text-muted-foreground">
                            ระบบสมาชิกของเราถูกออกแบบมาเพื่อรับรองว่าสมาชิกทุกคนจะได้รับผลประโยชน์ตามระดับและโครงสร้างสายงานอย่างโปร่งใสและยุติธรรม
                        </p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <Lock className="h-8 w-8 text-primary mt-1" />
                    <div>
                        <h3 className="font-semibold">พื้นที่ปลอดภัย</h3>
                        <p className="text-muted-foreground">
                            เราให้ความสำคัญกับความปลอดภัยของข้อมูลและการทำธุรกรรมทางการเงินของสมาชิกทุกคน ข้อมูลส่วนตัวและข้อมูลรายได้ของคุณจะถูกเก็บรักษาเป็นความลับสูงสุด
                        </p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <HandCoins className="h-8 w-8 text-primary mt-1" />
                    <div>
                        <h3 className="font-semibold">การสร้างรายได้และธุรกรรม</h3>
                        <p className="text-muted-foreground">
                            เรามีเครื่องมือและระบบที่ชัดเจนในการติดตามรายได้, จัดการสายงาน (Downline), และทำธุรกรรมถอนรายได้ เพื่อให้คุณสามารถสร้างรายได้ได้อย่างมั่นคงและยั่งยืน
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
