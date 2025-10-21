
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, LogIn } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Icons } from '@/components/icons';

const features = [
    {
        title: "Socialive",
        description: "Connect and interact in a vibrant social space.",
        icon: "Users",
        imageId: "socialive-preview",
        imageHint: "virtual hangout",
        href: "#"
    },
    {
        title: "Entertainment",
        description: "Discover music, videos, and live events.",
        icon: "Music",
        imageId: "entertainment-preview",
        imageHint: "concert stage",
        href: "#"
    },
    {
        title: "Shopping",
        description: "Explore unique items in our magical marketplace.",
        icon: "Store",
        imageId: "shopping-preview",
        imageHint: "fantasy market",
        href: "#"
    },
    {
        title: "Member Zones",
        description: "Unlock exclusive content and special privileges.",
        icon: "Gem",
        imageId: "member-zone-preview",
        imageHint: "magic door",
        href: "/login"
    }
];


export default function WelcomePage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'fantasy-castle-1');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-30 p-4 sm:p-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
            <Icons.Gem className="h-8 w-8 text-primary" />
            <span className="text-xl font-headline font-bold tracking-wider">MESY</span>
        </Link>
        <Button asChild variant="outline">
          <Link href="/login">
            <LogIn className="mr-2 h-4 w-4" />
            Login / Sign Up
          </Link>
        </Button>
      </header>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white px-4">
          <div className="absolute inset-0 bg-black/60 z-10" />
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              data-ai-hint={heroImage.imageHint}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="relative z-20 max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-wider text-shadow-lg">
              Welcome to the <span className="text-primary">MESY</span> Universe
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 text-shadow">
              A new dimension of entertainment, social connection, and opportunity awaits.
            </p>
            <Button size="lg" asChild className="group">
              <Link href="/login">
                Join the Universe <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline text-primary">Explore Our Worlds</h2>
                    <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">Each realm offers a unique experience, tailored to your journey.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => {
                        const featureImage = PlaceHolderImages.find(img => img.id === feature.imageId);
                        return (
                             <Card key={feature.title} className="bg-card/50 border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all transform hover:-translate-y-1 flex flex-col">
                                {featureImage && (
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={featureImage.imageUrl}
                                            alt={feature.title}
                                            data-ai-hint={featureImage.imageHint}
                                            fill
                                            className="object-cover rounded-t-lg"
                                        />
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardContent>
                                <div className="p-6 pt-0">
                                     <Button variant="outline" asChild className="w-full group">
                                        <Link href={feature.href}>
                                            Enter <ArrowRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1"/>
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/20 border-t border-secondary/30">
          <div className="container mx-auto py-6 px-4 text-center text-muted-foreground">
              <div className="flex justify-center gap-6 mb-4">
                  <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
                  <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
              </div>
              <p>&copy; {new Date().getFullYear()} Mesy Entertainment Universe. All Rights Reserved.</p>
          </div>
      </footer>
    </div>
  );
}
