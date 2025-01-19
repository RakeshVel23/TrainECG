import './globals.css';
import type { Metadata } from 'next';
import { Inter, Andika } from 'next/font/google';
import * as React from 'react';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });
const andika = Andika({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MedSandbox',
  description:
    'Interactive tools to support medical education and training',
  openGraph: {
    title: 'MedSandbox',
    description:
      'Interactive tools to support medical education and training',
    images: [
      {
        url: '/og-image.png',
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
    <html lang="en">
      <body className={`${inter.className} ${andika.className} min-h-screen flex flex-col bg-[#FFE8E1]`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
