import type { ReactNode } from 'react';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/react';

const menuItems = [
  { href: '/studio', label: 'Studio' },
  { href: '/upload', label: 'Upload' },
  { href: '/history', label: 'Render History' }
];

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(88,28,135,0.45),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(14,116,144,0.25),_transparent_65%)]" />
      </div>
      <header className="relative z-10 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-primary-300">
              M2A
            </span>
            <span>Manga2Anime Agent Studio</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm uppercase tracking-wide text-white/70">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="relative z-10 mx-auto min-h-[calc(100vh-80px)] w-full max-w-6xl px-6 py-12">
        <div className="gradient-border mb-10">
          <div className="flex flex-wrap items-center justify-between gap-6 px-6 py-5">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary-200/80">Agent status</p>
              <h1 className="mt-2 text-3xl font-semibold">Cinematic Anime Generation Pipeline</h1>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex h-3 w-3 animate-pulse rounded-full bg-green-400" />
              <span>Autonomous workflow online</span>
            </div>
          </div>
        </div>
        {children}
      </main>
      <Analytics />
    </div>
  );
}
