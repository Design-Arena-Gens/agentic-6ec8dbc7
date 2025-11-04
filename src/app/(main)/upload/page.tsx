import Image from 'next/image';
import Link from 'next/link';

const samples = [
  { src: '/manga-samples/panel-01.svg', caption: 'High-energy combat panel' },
  { src: '/manga-samples/panel-02.svg', caption: 'Urban skyline reveal' },
  { src: '/manga-samples/panel-03.svg', caption: 'Emotional close-up' }
];

export default function UploadPage() {
  return (
    <div className="space-y-10">
      <section className="card border-white/10 p-6 backdrop-blur">
        <h2 className="text-2xl font-semibold tracking-tight">Intake Console</h2>
        <p className="mt-3 text-sm text-white/65">
          Prepare manga assets for the anime synthesis pipeline. Maintain sequential naming to preserve narrative
          order. Panels are embedded into a multi-agent workflow progressing from story analysis to motion directives.
        </p>
      </section>

      <section className="card border-white/10 p-6 backdrop-blur">
        <h3 className="text-lg font-semibold tracking-tight">Curation Checklist</h3>
        <ul className="mt-4 grid gap-3 text-sm text-white/70 md:grid-cols-2">
          <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            Export each page or panel at ≥ 1600px on the shortest edge for best vision model performance.
          </li>
          <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            Remove gutters and speech bubbles when possible; the agent will synthesize dialogue from story beats.
          </li>
          <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            Keep lighting and style consistent across panels to yield coherent video diffusion prompts.
          </li>
          <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            Upload 4-12 panels per sequence. The orchestration engine scores pacing using this sample size.
          </li>
        </ul>
      </section>

      <section className="card border-white/10 p-6 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Sample Dataset</h3>
            <p className="mt-2 text-sm text-white/65">
              Use these illustrative panels to experiment with the pipeline before connecting your own manga assets.
            </p>
          </div>
          <Link
            href={samples[0].src}
            className="rounded-full border border-primary-400/40 bg-primary-500/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-primary-100"
            download
          >
            Download sample panel
          </Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {samples.map((sample) => (
            <figure key={sample.src} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="relative h-64 w-full overflow-hidden rounded-xl border border-white/10 bg-black/50">
                <Image src={sample.src} alt={sample.caption} fill className="object-contain" />
              </div>
              <figcaption className="mt-3 text-center text-xs uppercase tracking-[0.3em] text-white/60">
                {sample.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-xs text-white/50">
          Tip: batch-select multiple panels when uploading to preserve narrative order in the Studio pipeline.
        </p>
      </section>
    </div>
  );
}
