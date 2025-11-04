'use client';

import { useEffect, useState } from 'react';
import type { PipelineResult } from '@/types/pipeline';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'manga2anime-runs';

type StoredRun = PipelineResult & {
  id: string;
  createdAt: string;
};

export default function HistoryPage() {
  const [runs, setRuns] = useState<StoredRun[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as StoredRun[];
    setRuns(stored);
  }, []);

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRuns([]);
  };

  return (
    <div className="space-y-8">
      <div className="card border-white/10 p-6 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Render History</h2>
            <p className="mt-2 text-sm text-white/65">
              Chronicle of recent agent orchestrations. Rehydrate prompts or audit the generative process.
            </p>
          </div>
          <Button variant="ghost" onClick={handleClear} disabled={runs.length === 0}>
            Clear History
          </Button>
        </div>
      </div>

      {runs.length === 0 ? (
        <div className="card border-white/10 p-8 text-center text-sm text-white/60">
          No runs tracked yet. Execute the pipeline in the Studio to populate your timeline.
        </div>
      ) : (
        <div className="grid gap-6">
          {runs.map((run) => (
            <div key={run.id} className="card border-white/10 p-6 backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">{new Date(run.createdAt).toLocaleString()}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{run.narrativeSynopsis.slice(0, 72)}...</h3>
                </div>
                <div className="grid gap-2 text-sm text-white/70">
                  <span>
                    Runtime {run.estimatedRuntime}s · Shots {run.shots.length} · Panels {run.beats.length}
                  </span>
                  <span>Soundtrack: {run.soundtrackPitch}</span>
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">
                  <p className="uppercase tracking-[0.3em] text-white/40">Shot Prompts</p>
                  <ul className="mt-2 space-y-2">
                    {run.animation.map((asset) => (
                      <li key={asset.shotId}>
                        <p className="text-white/80">{asset.prompt}</p>
                        <p className="text-white/40">Neg: {asset.negativePrompt}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">
                  <p className="uppercase tracking-[0.3em] text-white/40">Dialogue</p>
                  <ul className="mt-2 space-y-2">
                    {run.shots.map((shot) => (
                      <li key={shot.id}>
                        <p className="text-white/80">{shot.title}</p>
                        <p>{shot.dialogue || '—'}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
