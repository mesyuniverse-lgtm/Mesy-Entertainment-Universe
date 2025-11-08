
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="flex items-center space-x-4 text-center">
        <h1 className="text-2xl font-medium text-foreground/80">404</h1>
        <div className="h-8 w-px bg-border"></div>
        <Link href="/welcome">
            <p className="text-foreground/60 hover:text-foreground transition-colors">
                Page not found, back to home.
            </p>
        </Link>
      </div>

      <div className="absolute bottom-4 left-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/welcome">
            <Home className="h-5 w-5 text-muted-foreground" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
