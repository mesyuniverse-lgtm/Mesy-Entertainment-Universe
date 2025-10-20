
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Store, Wallet, Handshake, CreditCard } from "lucide-react";

export default function ShoppingPage() {

  const futureFeatures = [
    {
      title: "Mesy Shop",
      description: "ร้านค้าอย่างเป็นทางการจาก MESY Universe ที่คุณสามารถซื้อไอเท็มพิเศษ, แพ็คเกจเริ่มต้น, และสินค้า Limited Edition ได้ด้วย Mesy Coin หรือสกุลเงิน USD",
      icon: <ShoppingCart className="h-8 w-8 text-primary" />
    },
    {
      title: "Mesy Market",
      description: "ตลาดกลางสำหรับสมาชิก ที่คุณสามารถนำไอเท็มมาลงขาย, ตั้งราคา, และแลกเปลี่ยนกับผู้เล่นอื่นได้อย่างอิสระ พร้อมระบบค่าธรรมเนียมเพื่อความสมดุลของเศรษฐกิจ",
      icon: <Store className="h-8 w-8 text-primary" />
    },
    {
      title: "Open Shop",
      description: "เปิดร้านค้าของคุณเอง! สมาชิกสามารถเปิดร้าน, ลงขายสินค้า, และสร้างแบรนด์ของตัวเองได้ มีแพ็กเกจหลากหลายให้เลือกเพื่อรองรับการเติบโต",
      icon: <Handshake className="h-8 w-8 text-primary" />
    },
    {
      title: "Wallet & Currencies",
      description: "กระเป๋าเงินดิจิทัลส่วนตัวสำหรับจัดการ Mesy Coin, Point, และ Star เพื่อใช้จ่ายและแลกเปลี่ยนในจักรวาล MESY",
      icon: <Wallet className="h-8 w-8 text-primary" />
    },
    {
      title: "Mesy Pay",
      description: "ระบบชำระเงินที่เชื่อมต่อกับโลกจริง ช่วยให้การฝาก-ถอน และการใช้จ่ายผ่านบัตรเครดิตและธนาคารเป็นไปได้อย่างสะดวกและปลอดภัย",
      icon: <CreditCard className="h-8 w-8 text-primary" />
    }
  ]

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Shopping Hub</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          ศูนย์กลางเศรษฐกิจแห่งจักรวาล MESY ที่ซึ่งการค้าขาย, การแลกเปลี่ยน, และการสร้างความมั่งคั่งเริ่มต้นขึ้น
        </p>
      </div>
      
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-3xl">จักรวาลแห่งการค้าที่กำลังจะเปิดตัว</CardTitle>
          <p className="text-muted-foreground">เตรียมพบกับระบบเศรษฐกิจเต็มรูปแบบของ MESY Universe ที่กำลังจะมาถึง:</p>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {futureFeatures.map((feature) => (
              <div key={feature.title} className="flex gap-4 items-start">
                  <div className="p-3 bg-secondary rounded-lg">
                      {feature.icon}
                  </div>
                  <div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground mt-1">{feature.description}</p>
                  </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
