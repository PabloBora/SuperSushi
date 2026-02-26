import type { Metadata } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Super Sushi · Alta Gastronomía Japonesa',
  description: 'Mexican-Asian Fusion - Una experiencia de lujo.',
  openGraph: {
    images: [{ url: '/placeholder-og.jpg' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body style={{ background: 'var(--void)', cursor: 'none' }}>
        {children}
      </body>
    </html>
  );
}
