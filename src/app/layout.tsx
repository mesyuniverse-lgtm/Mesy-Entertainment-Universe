
'use client';

import type { Metadata } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase/client-provider';

// This is the root layout that wraps the entire application.
// It should not contain 'use client' if you want to use metadata.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID" crossOrigin="anonymous"></script>
        <title>Mesy Entertainment Universe</title>
        <meta name="description" content="Fantasy Entertainment Platform with Next.js + Firebase" />
      </head>
      <body className="font-body">
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}

    