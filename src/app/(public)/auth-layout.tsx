import Link from "next/link";
import Image from "next/image";
import { Gem } from "@/components/icons";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const bgImage = PlaceHolderImages.find(i => i.id === 'auth-background');
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
         {bgImage && (
             <Image
                src={bgImage.imageUrl}
                alt={bgImage.description}
                data-ai-hint={bgImage.imageHint}
                fill
                className="object-cover"
                priority
            />
          )}
          <div className="absolute inset-0 bg-zinc-900/70" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/welcome" className="flex items-center space-x-2">
              <Gem className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl font-headline sm:inline-block">MESY</span>
            </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.9)'}}>
            <p className="text-lg">
                “Every great journey begins with a single step. Welcome to a universe of infinite possibilities, crafted by creators like you.”
            </p>
            <footer className="text-sm">The Architect</footer>
          </blockquote>
        </div>
      </div>
       <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            {children}
          </div>
       </div>
    </div>
  );
}
