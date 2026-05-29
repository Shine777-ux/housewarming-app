import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Our Housewarming Ceremony',
  description: 'You are invited to celebrate our new home.',
  openGraph: {
    title: 'Our Housewarming Ceremony',
    description: 'You are warmly invited to celebrate our new home with us.',
    images: [
      {
        url: '/house.jpeg', // This will use the house image for WhatsApp link previews
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-navy text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
