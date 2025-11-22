
import Link from 'next/link';
import { Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4 text-center">
        <h1 className="text-9xl font-bold text-primary font-headline tracking-widest" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}>404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-muted-foreground mt-2 max-w-sm">
            Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Button asChild className="mt-8">
            <Link href="/welcome">
                Return to Home
            </Link>
        </Button>

      <div className="absolute bottom-4 left-4">
        <Link href="/welcome" aria-label="Back to home">
          <Gem className="h-4 w-4 text-muted-foreground/20" />
        </Link>
      </div>
    </div>
  );
}
