'use client';

import type { PipelineResult } from '@/types/pipeline';

export function PipelineSummary({ result }: { result: PipelineResult | null }) {
  if (!result) {
    return (
      <div className="card border-white/10 p-6 backdrop-blur">
        <h3 className="text-lg font-semibold tracking-tight">Anime Synthesis Overview</h3>
        <p className="mt-2 text-sm text-white/65">
          Once the agent completes its run you will see a synopsis, runtime estimate, and audio direction summary here.
        </p>
      </div>
    );
  }

  return (
    <div className="card border-white/10 p-6 backdrop-blur">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-400/40 bg-primary-500/15 px-3 py-1 text-xs uppercase tracking-[0.35em] text-primary-100">
            Agent synopsis
          </div>
          <p className="text-lg text-white/90">{result.narrativeSynopsis}</p>
        </div>
        <div className="grid gap-4 text-sm text-white/70 md:text-right">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Runtime</p>
            <p className="text-lg text-white">
              {result.estimatedRuntime}
              <span className="ml-1 text-white/70">seconds</span>
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Soundtrack Pitch</p>
            <p className="text-white/80">{result.soundtrackPitch}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
