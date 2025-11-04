import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function WelcomePage() {
  const slideshowImages = PlaceHolderImages.filter((img) =>
    img.id.startsWith('fantasy-landscape')
  ).slice(0, 10);

  const featureCards = [
    {
      title: 'Social Live',
      description: 'Connect in public and private rooms. Share your moments.',
      image: PlaceHolderImages.find((img) => img.id === 'feature-1'),
    },
    {
      title: 'AI Hub',
      description: 'Unleash creativity with our powerful AI content generators.',
      image: PlaceHolderImages.find((img) => img.id === 'feature-2'),
    },
    {
      title: 'Shopping Hub',
      description: 'Discover unique products and enjoy exclusive cashback rewards.',
      image: PlaceHolderImages.find((img) => img.id === 'feature-3'),
    },
  ];
  
  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full h-[70vh] md:h-[85vh] flex items-center justify-center text-center text-white overflow-hidden">
        <Image
          src={PlaceHolderImages.find((img) => img.id === 'fantasy-landscape-5')?.imageUrl || ''}
          alt={PlaceHolderImages.find((img) => img.id === 'fantasy-landscape-5')?.description || ''}
          data-ai-hint={PlaceHolderImages.find((img) => img.id === 'fantasy-landscape-5')?.imageHint || ''}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>
            Enter the MESY Universe
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/90 mb-8" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>
            A fantasy entertainment platform where creativity and community collide in a ceremonial journey.
          </p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30">
            <Link href="/signup">
              Let's Startup <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container px-10">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {slideshowImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-0">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          data-ai-hint={image.imageHint}
                          width={600}
                          height={400}
                          className="w-full h-auto object-cover aspect-[3/2] transition-transform duration-300 hover:scale-105"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>

      <section id="features" className="w-full py-16 md:py-24 bg-secondary/40">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold">Platform Features</h2>
            <p className="max-w-3xl mx-auto mt-4 text-muted-foreground">
              Explore a universe of possibilities designed for creators and fans.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureCards.map((feature, index) => (
              <Card key={index} className="bg-card hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-2">
                <CardHeader className="p-0">
                  {feature.image && (
                     <Image
                        src={feature.image.imageUrl}
                        alt={feature.image.description}
                        data-ai-hint={feature.image.imageHint}
                        width={400}
                        height={300}
                        className="rounded-t-lg w-full h-auto object-cover aspect-video"
                      />
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="pb-2">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="link" className="text-accent-foreground text-lg hover:text-primary">
                <Link href="/features">See All Features <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="member-plan" className="w-full py-16 md:py-24 bg-background">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl md:text-5xl font-bold">Unlock Your Potential</h2>
                <p className="max-w-2xl mt-4 text-muted-foreground text-lg">
                    Join our ceremonial membership to gain exclusive access, earn rewards, and become part of our growing universe.
                </p>
                <ul className="mt-6 space-y-4">
                    <li className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-primary" />
                        <span className="text-lg">Climb 50 levels of membership</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-primary" />
                        <span className="text-lg">Earn income from your downline</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-primary" />
                        <span className="text-lg">Access exclusive content and tools</span>
                    </li>
                </ul>
                <div className="mt-8 flex gap-4">
                    <Button size="lg" asChild>
                        <Link href="/signup">Join Now</Link>
                    </Button>
                    <Button size="lg" asChild variant="outline">
                        <Link href="/member-plan">Learn More</Link>
                    </Button>
                </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <Image
                    src={PlaceHolderImages.find((img) => img.id === 'member-plan-video')?.imageUrl || ''}
                    alt="Member plan video"
                    data-ai-hint={PlaceHolderImages.find((img) => img.id === 'member-plan-video')?.imageHint || ''}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
        </div>
      </section>
      
    </div>
  );
}
