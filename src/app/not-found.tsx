
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Gem } from '@/components/icons';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="text-center">
        <Link href="/welcome" className="text-foreground/60 hover:text-foreground transition-colors">
            <span className="font-bold text-foreground/80">404</span>
            <span className="mx-2">|</span>
            <span>Page not found, back to home.</span>
        </Link>
      </div>

      <div className="absolute bottom-4 left-4">
        <Link href="/welcome" aria-label="Back to home">
          <Gem className="h-6 w-6 text-muted-foreground" />
        </Link>
      </div>
    </div>
  );
}
