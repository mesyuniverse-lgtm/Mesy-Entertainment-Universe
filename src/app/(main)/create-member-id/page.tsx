'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Gem, PlusCircle, Settings, Signal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const memberSlots = [
  { level: 16, memberId: '001', inUse: true },
  { level: 1, memberId: '0011', inUse: false },
  { level: null, memberId: null, inUse: false },
  { level: null, memberId: null, inUse: false },
  { level: null, memberId: null, inUse: false },
];


export default function CreateMemberIdPage() {
  const bgImage = PlaceHolderImages.find((i) => i.id === 'fantasy-landscape-5');
  const avatarImage = PlaceHolderImages.find((i) => i.id === 'female-warrior-1');

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black text-white p-4">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt="Background"
          fill
          className="object-cover opacity-30"
        />
      )}
      
      <main className="relative z-10 grid h-full w-full max-w-7xl grid-cols-12 gap-6">
        {/* Left Panel */}
        <div className="col-span-3 flex flex-col justify-between py-8">
            <div>
                <Link href="/welcome" className="flex items-center space-x-2 mb-10">
                    <Gem className="h-6 w-6 text-primary" />
                    <span className="font-bold text-xl font-headline">MESY MEMBER</span>
                </Link>
                <Card className="border-none bg-black/30 backdrop-blur-sm p-4 text-sm">
                   <CardHeader className="p-2">
                        <div className="flex items-center gap-2 text-primary">
                          <div className='w-4 h-4 rounded-full bg-primary/50 flex items-center justify-center'><div className='w-2 h-2 rounded-full bg-primary animate-pulse'></div></div>
                          <span>Select MemberID</span>
                        </div>
                   </CardHeader>
                   <CardContent className="space-y-1 p-2">
                       <p><span className="text-muted-foreground">MemberName:</span> Happy</p>
                       <p><span className="text-muted-foreground">MemberID:</span> 001</p>
                       <p><span className="text-muted-foreground">Level:</span> 16</p>
                       <p><span className="text-muted-foreground">Downline:</span> 16,000</p>
                       <div className="pt-4 space-y-1">
                           <p><span className="text-muted-foreground">Gross Income (USD):</span> $16,000.00</p>
                           <p><span className="text-muted-foreground">Service Fee (3%):</span> -$480.00</p>
                           <p className="font-bold"><span className="text-muted-foreground">Net Income (USD):</span> $15,520.00</p>
                       </div>
                   </CardContent>
                </Card>
            </div>
            <div className="space-y-4">
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Signal className="h-4 w-4 text-green-400"/>
                    <span>337 ms</span>
                 </div>
                 <Button variant="ghost" className="justify-start p-0 h-auto hover:bg-transparent hover:text-primary">
                    <Settings className="h-4 w-4 mr-2"/>
                    Settings
                 </Button>
                  <Button variant="outline" className="w-full bg-black/30 border-primary/50" asChild>
                    <Link href="/create-avatar">CREATE AVATAR</Link>
                 </Button>
            </div>
        </div>

        {/* Center Panel */}
        <div className="col-span-6 flex items-center justify-center">
          {avatarImage && (
             <Image 
                src={avatarImage.imageUrl}
                alt="Avatar Preview"
                width={450}
                height={800}
                className="object-contain drop-shadow-[0_10px_35px_rgba(var(--primary-rgb),0.25)]"
                priority
             />
          )}
        </div>

        {/* Right Panel */}
        <div className="col-span-3 flex flex-col justify-center items-end">
            <div className="space-y-3 w-full max-w-xs">
                {memberSlots.map((slot, index) => (
                    <button key={index} className={`w-full p-2 rounded-lg border-2 transition-all duration-300 flex items-center ${slot.inUse ? 'bg-primary/20 border-primary' : 'bg-black/40 border-transparent hover:border-primary/50'}`}>
                        {slot.inUse || slot.level ? (
                             <>
                                <Avatar className="h-14 w-14 border-2 border-primary/50">
                                    <AvatarImage src={avatarImage?.imageUrl} alt={`Member ${slot.memberId}`} />
                                    <AvatarFallback>M</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 text-left">
                                    <p className={`font-bold ${slot.inUse ? 'text-primary' : ''}`}>Lv.{slot.level}</p>
                                    <p className="text-xs text-muted-foreground">MemberID: {slot.memberId}</p>
                                </div>
                             </>
                        ) : (
                            <>
                                <PlusCircle className="h-8 w-8 text-muted-foreground/50"/>
                                <p className="ml-4 text-muted-foreground">Create Member ID</p>
                            </>
                        )}
                    </button>
                ))}
            </div>
            <Button className="mt-8 w-full max-w-xs h-12 text-lg font-bold bg-gradient-to-r from-amber-400 to-yellow-600 text-black shadow-lg hover:shadow-yellow-400/50">
                Start
            </Button>
        </div>
      </main>
    </div>
  );
}
