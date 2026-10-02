import type { Metadata } from 'next';
import { Fraunces, DM_Sans, Caveat, Space_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-hand',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-label',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The ArtNook — Handmade Resin Art Studio',
  description:
    'Handcrafted epoxy resin coasters, serving trays, geode wall art, jewellery, floral keepsakes and custom commissions. Poured, cured and finished by hand in small batches.',
  keywords: [
    'resin art',
    'handmade coasters',
    'resin trays',
    'geode wall art',
    'flower preservation',
    'custom resin commission',
    'epoxy art India',
  ],
  openGraph: {
    title: 'The ArtNook — Handmade Resin Art Studio',
    description: 'Little pieces of colour, poured by hand.',
    siteName: 'The ArtNook',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} ${caveat.variable} ${spaceMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-body paper-grain">
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
