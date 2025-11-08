
import Link from 'next/link';
import { Gem } from '@/components/icons';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="text-center">
        <Link href="/welcome" className="text-xs text-foreground/30 hover:text-foreground/50 transition-colors">
            <span className="font-bold">404</span>
            <span className="mx-2">|</span>
            <span>Page not found, back to home.</span>
        </Link>
      </div>

      <div className="absolute bottom-4 left-4">
        <Link href="/welcome" aria-label="Back to home">
          <Gem className="h-4 w-4 text-muted-foreground/20" />
        </Link>
      </div>
    </div>
  );
}
