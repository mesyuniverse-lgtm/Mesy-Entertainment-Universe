
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ShoppingCart, User, MessageSquare } from 'lucide-react';
import { useUser } from '@/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function UserHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { user } = useUser();
  const userImage = PlaceHolderImages.find(p => p.id === 'female-archer-1');

  return (
    <div className="flex flex-col h-full">
      <header className="flex-shrink-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary">
                        <AvatarImage src={userImage?.imageUrl} alt="User Avatar" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-lg font-semibold text-white flex items-center gap-2">
                            User Hub
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </h1>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Link href="#" className="hover:text-white transition-colors px-3 py-2 rounded-md">Profile</Link>
                    <Link href="#" className="hover:text-white transition-colors px-3 py-2 rounded-md">Live</Link>
                    <Link href="#" className="hover:text-white transition-colors px-3 py-2 rounded-md">Friend</Link>
                    <Link href="#" className="hover:text-white transition-colors px-3 py-2 rounded-md">Follower</Link>
                    <Link href="#" className="hover:text-white transition-colors px-3 py-2 rounded-md">Following</Link>
                    <Link href="#" className="flex items-center gap-1 hover:text-white transition-colors px-3 py-2 rounded-md">
                        <ShoppingCart className="h-4 w-4" /> Shopping
                    </Link>
                </div>
                <div>
                     <Button asChild variant="destructive" className="bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg">
                        <Link href="/member-signup">UPGRADE</Link>
                    </Button>
                </div>
            </div>
        </div>

        <div className="bg-black/20 text-xs text-muted-foreground py-1.5 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap">
                <span className="mx-4">Aria has received a Legendary Item: Shadowfire Bow! ✨</span>
                <span className="mx-4">Kael reached Level 15! 🚀</span>
                <span className="mx-4">New items available in the shop!</span>
                <span className="mx-4">Live event starting in 1 hour!</span>
                 <span className="mx-4">Aria has received a Legendary Item: Shadowfire Bow! ✨</span>
                <span className="mx-4">Kael reached Level 15! 🚀</span>
            </div>
        </div>
         <style jsx>{`
            @keyframes marquee {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
            }
            .animate-marquee {
                display: inline-block;
                animation: marquee 20s linear infinite;
            }
        `}</style>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
