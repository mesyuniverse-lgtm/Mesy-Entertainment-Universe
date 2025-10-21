import { Gem } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <a href="#" className="flex items-center font-headline text-xl font-bold text-primary">
            <Gem className="w-6 h-6 mr-2" />
            Mesy
          </a>
          <nav className="ml-auto flex items-center gap-4">
            <a
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Login
            </a>
            <a
              href="/signup"
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Sign Up
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl lg:text-7xl text-primary">
                Enter the Mesy Universe
              </h1>
              <p className="mt-4 text-lg md:text-xl lg:text-2xl text-foreground/80">
                A new dimension of social, entertainment, and commerce awaits.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-lg font-bold text-primary-foreground shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Join the Universe
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background/80">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">Features</h2>
            {/* Feature cards will be re-implemented here */}
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
