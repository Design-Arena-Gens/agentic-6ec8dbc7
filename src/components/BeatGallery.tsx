'use client';

import Image from 'next/image';
import type { PanelBeat } from '@/types/pipeline';

export function BeatGallery({ beats }: { beats: PanelBeat[] }) {
  if (beats.length === 0) {
    return null;
  }

  return (
    <div className="card border-white/10 p-6 backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">Beat Breakdown</h3>
          <p className="mt-1 text-sm text-white/65">
            Visual summaries extracted by the analysis agent, including emotional drivers and focal story beats.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
          {beats.length} panels
        </span>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {beats.map((beat, index) => (
          <div key={beat.panel.filename + index} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="relative h-56 w-full overflow-hidden bg-black/40">
              <Image
                fill
                src={`data:image/jpeg;base64,${beat.panel.base64}`}
                alt={`Panel ${index + 1}`}
                className="object-contain"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent px-4 py-3 text-xs uppercase tracking-[0.35em] text-white/70">
                Panel {index + 1}
              </div>
            </div>
            <div className="space-y-3 px-4 py-5 text-sm text-white/80">
              <p className="font-medium text-white">{beat.summary}</p>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Emotions</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {beat.emotions.map((emotion) => (
                    <span
                      key={emotion}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/70"
                    >
                      {emotion}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Key moments</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-white/75">
                  {beat.keyMoments.map((moment, idx) => (
                    <li key={idx}>{moment}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
