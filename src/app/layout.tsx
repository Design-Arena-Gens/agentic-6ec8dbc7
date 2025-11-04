import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display'
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'Manga2Anime Agent Studio',
  description:
    'Autonomous agent that transforms manga storyboards into cinematic anime sequences using AI pipelines.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="noise-overlay">
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-transparent`}>
        {children}
      </body>
    </html>
  );
}
