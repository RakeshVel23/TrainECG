import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import * as React from 'react';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Medical Learning Tools',
  description:
    'Interactive tools to support medical education and training',
  openGraph: {
    title: 'Medical Learning Tools',
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
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
