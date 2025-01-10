import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import * as React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ECG Axis Interpretation Trainer',
  description:
    'Interactive tool to practice ECG axis interpretation with real-time feedback',
  openGraph: {
    title: 'ECG Axis Interpretation Trainer',
    description:
      'Interactive tool to practice ECG axis interpretation with real-time feedback',
    images: [
      {
        url: '/og-image.png', // Add your own image path here
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
