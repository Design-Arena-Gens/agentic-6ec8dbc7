'use client';

import type { ShotPlan } from '@/types/pipeline';

export function ShotTimeline({ shots }: { shots: ShotPlan[] }) {
  if (shots.length === 0) {
    return null;
  }

  return (
    <div className="card border-white/10 p-6 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">Shot Blueprint</h3>
          <p className="mt-1 text-sm text-white/65">
            Scene-by-scene direction created from the manga beats, including camera language and dialogue cues.
          </p>
        </div>
        <span className="rounded-full border border-primary-400/40 bg-primary-500/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-primary-100">
          Runtime {shots.reduce((total, shot) => total + shot.durationSeconds, 0)}s
        </span>
      </div>
      <ol className="mt-6 flex flex-col gap-4">
        {shots.map((shot, index) => (
          <li key={shot.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/30">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/60">
              <span>Shot {index + 1}</span>
              <span>{shot.durationSeconds}s</span>
            </div>
            <h4 className="mt-2 text-lg font-semibold text-white">{shot.title}</h4>
            <p className="mt-2 text-sm text-white/75">{shot.description}</p>
            <div className="mt-3 grid gap-2 text-xs text-white/65 md:flex md:flex-wrap md:gap-4">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Camera: {shot.camera}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Dialogue: {shot.dialogue || 'No dialogue'}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Soundtrack: {shot.soundtrack}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
