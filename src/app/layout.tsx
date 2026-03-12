'use client';

import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/app-context';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { Toaster } from 'sileo';

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
        <link href="https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Patrick+Hand&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen">
        <AppProvider>
          <Toaster position="top-right" />
          <LoadingScreen />
          <div className="paper-texture min-h-screen transition-colors duration-300">
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
