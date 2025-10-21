import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import placeholderImages from '@/lib/placeholder-images.json';
import { ClapperboardIcon, Gem, ShoppingCartIcon, StarIcon, UsersIcon } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="#" className="flex items-center font-headline text-xl font-bold" prefetch={false}>
            <Gem className="w-6 h-6 mr-2 text-primary" />
            Mesy
          </Link>
          <nav className="ml-auto flex items-center gap-4">
            <Link
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center">
          <Image
            src={placeholderImages.hero.src}
            alt="Fantasy world"
            fill
            className="absolute inset-0 object-cover w-full h-full -z-10 opacity-30"
            data-ai-hint={placeholderImages.hero["data-ai-hint"]}
          />
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w3xl mx-auto">
              <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl lg:text-7xl text-primary">
                Enter the Mesy Universe
              </h1>
              <p className="mt-4 text-lg md:text-xl lg:text-2xl text-foreground/80">
                A new dimension of social, entertainment, and commerce awaits.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href="/signup"
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-lg font-bold text-primary-foreground shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Join the Universe
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background/80">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {placeholderImages.features.map((feature) => (
                <Card key={feature.title} className="bg-card/60 border-border/40 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{feature.title}</CardTitle>
                    {feature.title === 'Socialive' && <UsersIcon className="w-4 h-4 text-muted-foreground" />}
                    {feature.title === 'Entertainment' && <ClapperboardIcon className="w-4 h-4 text-muted-foreground" />}
                    {feature.title === 'Shopping' && <ShoppingCartIcon className="w-4 h-4 text-muted-foreground" />}
                    {feature.title === 'Member Zones' && <StarIcon className="w-4 h-4 text-muted-foreground" />}
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-video rounded-md overflow-hidden">
                       <Image
                          src={feature.src}
                          alt={feature.title}
                          fill
                          className="object-cover"
                          data-ai-hint={feature["data-ai-hint"]}
                        />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border/40 bg-background/95">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2024 Mesy Entertainment Universe. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
