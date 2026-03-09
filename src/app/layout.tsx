import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'InkFolio | Creative Portfolio',
  description: 'A hand-drawn inspired portfolio for creative individuals.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Patrick+Hand&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen">
        <div className="paper-texture min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
