'use client';

import type { AnimationAsset, ShotPlan } from '@/types/pipeline';
import { Button } from '@/components/ui/button';

type AnimationBoardProps = {
  assets: AnimationAsset[];
  shots: ShotPlan[];
};

export function AnimationBoard({ assets, shots }: AnimationBoardProps) {
  if (assets.length === 0) {
    return null;
  }

  return (
    <div className="card border-white/10 p-6 backdrop-blur">
      <h3 className="text-lg font-semibold tracking-tight">Animation Directives</h3>
      <p className="mt-1 text-sm text-white/65">
        Diffusion-ready instructions and generated motion previews for each shot. Export prompts to your render farm
        or trigger remote compute nodes.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {assets.map((asset) => {
          const shot = shots.find((item) => item.id === asset.shotId);
          return (
            <div key={asset.shotId} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{shot?.title ?? 'Shot'}</p>
                <p className="mt-2 text-sm text-white/75">{shot?.description}</p>
              </div>
              {asset.videoUrl ? (
                <video
                  src={asset.videoUrl}
                  controls
                  className="w-full overflow-hidden rounded-xl border border-white/10"
                  poster={asset.fallbackPoster ?? undefined}
                />
              ) : (
                <div className="rounded-xl border border-white/10 bg-black/40 p-6 text-center text-sm text-white/50">
                  <p className="font-medium text-white/80">No video yet</p>
                  <p className="mt-2">Configure FAL_KEY to enable automatic motion renders.</p>
                  {asset.referencePanel && (
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="mt-2 border-white/10 bg-white/5 text-xs uppercase tracking-[0.3em] text-white/60"
                    >
                      <a href={asset.referencePanel} download>
                        Download Panel Reference
                      </a>
                    </Button>
                  )}
                </div>
              )}
              <div className="space-y-2 text-xs">
                <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                  <p className="uppercase tracking-[0.35em] text-[0.65rem] text-white/50">Prompt</p>
                  <p className="mt-1 text-white/80">{asset.prompt}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                  <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.35em] text-white/50">
                    <span>Negative</span>
                    <span>Seed {asset.seed}</span>
                  </div>
                  <p className="mt-1 text-white/70">{asset.negativePrompt}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
