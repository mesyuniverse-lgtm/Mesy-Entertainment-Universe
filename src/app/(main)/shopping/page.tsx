
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Store, Wallet, Handshake, CreditCard, Flame, Star, PlayCircle, Crown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
      icon: <Handshake className="h-8 w-8 text-primary" />,
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
  ];

  const popularShops = [
    { name: "Aria's Alchemy", rating: 5, avatarId: "female-archer-1" },
    { name: "Kael's Forge", rating: 5, avatarId: "fighter-character" },
    { name: "Seraphina's Scriptorium", rating: 4, avatarId: "explorer-1" },
    { name: "Chronicler's Curios", rating: 4, avatarId: "knight-1" }
  ];
  
  const sponsoredAds = [
    { title: "Legendary Sword", imageId: "glowing-gem-1" },
    { title: "Crystal Staff", imageId: "fantasy-landscape-3" }
  ];

  const popularProducts = [
    { name: "Health Potion", imageId: "glowing-gem-1", price: "50 MC" },
    { name: "Enchanted Scroll", imageId: "member-zone-preview", price: "120 MC" },
    { name: "Phoenix Feather", imageId: "feature-2", price: "500 MC" }
  ];

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Shopping Hub</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          ศูนย์กลางเศรษฐกิจแห่งจักรวาล MESY ที่ซึ่งการค้าขาย, การแลกเปลี่ยน, และการสร้างความมั่งคั่งเริ่มต้นขึ้น
        </p>
      </div>

      {/* --- Main Marketing Section --- */}
      <section className="mb-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Popular Shops */}
        <aside className="hidden lg:block lg:col-span-1">
          <Card className="h-full bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Crown className="text-primary"/> Popular Shops</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {popularShops.map(shop => (
                <div key={shop.name} className="flex items-center gap-3 hover:bg-secondary/50 p-2 rounded-md transition-colors">
                  <Avatar>
                    <AvatarImage src={PlaceHolderImages.find(i => i.id === shop.avatarId)?.imageUrl} />
                    <AvatarFallback>{shop.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{shop.name}</p>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < shop.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}/>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Center - Video Feed */}
        <main className="lg:col-span-2">
            <Card className="aspect-video relative overflow-hidden shadow-2xl shadow-primary/20 group">
                <Image 
                    src={PlaceHolderImages.find(i => i.id === 'member-plan-video')?.imageUrl || ''}
                    alt="Promotional Video"
                    data-ai-hint="promotional video"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"/>
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                    <div className="flex justify-end">
                        <Badge variant="destructive" className="flex items-center gap-1">
                            <PlayCircle className="h-3 w-3"/> LIVE
                        </Badge>
                    </div>
                    <div className="space-y-2">
                         <h2 className="text-2xl font-bold" style={{textShadow: '1px 1px 4px #000'}}>Aria's Live Alchemy Sale!</h2>
                         <p className="text-sm max-w-md" style={{textShadow: '1px 1px 3px #000'}}>Join now for exclusive deals on rare potions and ingredients.</p>
                         <div className="flex gap-2 pt-2">
                            <Button size="sm" asChild>
                                <Link href="#">
                                    <ShoppingCart className="mr-2 h-4 w-4"/> Visit Shop
                                </Link>
                            </Button>
                            <Button size="sm" variant="secondary">View Item</Button>
                         </div>
                    </div>
                </div>
            </Card>
        </main>
        
        {/* Right Sidebar - Ads */}
        <aside className="hidden lg:block lg:col-span-1">
           <Card className="h-full bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Sponsored</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sponsoredAds.map(ad => (
                <div key={ad.title} className="relative aspect-video rounded-md overflow-hidden group">
                  <Image 
                    src={PlaceHolderImages.find(i => i.id === ad.imageId)?.imageUrl || ''}
                    alt={ad.title}
                    data-ai-hint="fantasy item"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-end p-2">
                    <p className="text-white text-xs font-bold w-full text-center" style={{textShadow: '1px 1px 2px #000'}}>{ad.title}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </section>

      {/* --- Popular Products Section --- */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-6 flex items-center gap-3"><Flame className="text-primary"/> Popular Items</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularProducts.map(product => (
                 <Card key={product.name} className="overflow-hidden group">
                     <CardHeader className="p-0 aspect-square relative">
                        <Image 
                             src={PlaceHolderImages.find(i => i.id === product.imageId)?.imageUrl || ''}
                             alt={product.name}
                             data-ai-hint="fantasy item"
                             fill
                             className="object-cover transition-transform duration-300 group-hover:scale-105"
                         />
                     </CardHeader>
                     <CardContent className="p-4">
                         <h3 className="font-semibold truncate">{product.name}</h3>
                         <div className="flex justify-between items-center mt-2">
                            <p className="text-primary font-bold">{product.price}</p>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ShoppingCart className="h-4 w-4"/>
                            </Button>
                         </div>
                     </CardContent>
                 </Card>
            ))}
        </div>
      </section>

      {/* --- Coming Soon Section --- */}
      <Card className="bg-card/50 mt-16">
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
