import { NextResponse } from 'next/server';
import { runMangaToAnimePipeline } from '@/app/lib/pipeline/agent';
import type { PipelineContext } from '@/types/pipeline';

export const runtime = 'nodejs';
export const maxDuration = 120;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('panels').filter((entry): entry is File => entry instanceof File);

    if (files.length === 0) {
      return NextResponse.json({ error: 'No panels provided' }, { status: 400 });
    }

    const context: PipelineContext = {
      mangaTitle: String(formData.get('mangaTitle') ?? 'Untitled Manga'),
      genre: String(formData.get('genre') ?? 'Action'),
      styleReference: String(formData.get('styleReference') ?? 'Modern digital anime'),
      pacing: (formData.get('pacing') as PipelineContext['pacing']) ?? 'balanced',
      voiceModel: String(formData.get('voiceModel') ?? 'alloy')
    };

    const result = await runMangaToAnimePipeline(files, context);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('[pipeline] error', error);
    return NextResponse.json({ error: 'Pipeline failed', details: String(error) }, { status: 500 });
  }
}
