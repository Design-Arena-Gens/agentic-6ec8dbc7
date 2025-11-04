'use client';

import { useEffect, useMemo, useState } from 'react';
import { MangaUploadForm } from '@/components/MangaUploadForm';
import { PipelineSummary } from '@/components/PipelineSummary';
import { BeatGallery } from '@/components/BeatGallery';
import { ShotTimeline } from '@/components/ShotTimeline';
import { AnimationBoard } from '@/components/AnimationBoard';
import { AgentLog } from '@/components/AgentLog';
import type { PipelineResult } from '@/types/pipeline';

const STORAGE_KEY = 'manga2anime-runs';

type StoredRun = PipelineResult & {
  id: string;
  createdAt: string;
};

function storeRun(result: PipelineResult) {
  const history: StoredRun[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  history.unshift({ ...result, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 10)));
}

export default function StudioPage() {
  const [result, setResult] = useState<PipelineResult | null>(null);
  const [status, setStatus] = useState<string>('Awaiting manga intake.');

  useEffect(() => {
    if (result) {
      storeRun(result);
    }
  }, [result]);

  const hasVideo = useMemo(() => result?.animation.some((asset) => !!asset.videoUrl), [result]);

  return (
    <div className="space-y-10 pb-16">
      <PipelineSummary result={result} />
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-10">
          <MangaUploadForm onComplete={setResult} onStatus={setStatus} />
          <BeatGallery beats={result?.beats ?? []} />
          <ShotTimeline shots={result?.shots ?? []} />
          <AnimationBoard assets={result?.animation ?? []} shots={result?.shots ?? []} />
        </div>
        <div className="space-y-10">
          <div className="card border-white/10 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold tracking-tight">Agent Monitor</h3>
            <p className="mt-2 text-sm text-white/65">
              Live status from the orchestration layer. Connects to the agent bus and surfaces key telemetry.
            </p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 px-4 py-5 text-sm text-white/80">
              {status}
            </div>
            {hasVideo ? (
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-emerald-200">
                ✅ Motion clips ready for review
              </p>
            ) : (
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-white/50">
                Configure FAL_KEY for automatic video renders
              </p>
            )}
          </div>
          <AgentLog log={result?.log ?? []} />
        </div>
      </div>
    </div>
  );
}
