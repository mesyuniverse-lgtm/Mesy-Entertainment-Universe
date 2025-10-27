import Link from "next/link";
import { Gem } from "@/components/icons";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const bgImage = PlaceHolderImages.find(i => i.id === 'auth-background');
  return (
    <div className="min-h-screen antialiased">
      <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col p-10 text-white lg:flex">
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
          <div className="absolute inset-0 bg-zinc-900/60" />

          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link href="/welcome" className="flex items-center space-x-2">
              <Gem className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl font-headline sm:inline-block">MESY</span>
            </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.9)'}}>
              <p className="text-lg">
                “The journey of a thousand miles begins with a single step. Your ceremonial journey into the MESY Universe starts now.”
              </p>
              <footer className="text-sm">The Chronicler</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
