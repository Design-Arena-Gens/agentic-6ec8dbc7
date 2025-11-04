'use client';

import { useRef, useState, useCallback } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import type { PipelineResult, PipelineContext } from '@/types/pipeline';

export type MangaUploadFormProps = {
  onComplete: (result: PipelineResult) => void;
  onStatus?: (status: string) => void;
};

const pacingOptions: PipelineContext['pacing'][] = ['kinetic', 'balanced', 'melancholic'];

export function MangaUploadForm({ onComplete, onStatus }: MangaUploadFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    mangaTitle: 'Neon Ronin: Chapter 03',
    genre: 'Cyberpunk action drama',
    styleReference: 'Sleek 2.5D anime with neon cityscapes',
    pacing: 'kinetic' as PipelineContext['pacing'],
    voiceModel: 'alloy'
  });
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files ? Array.from(event.target.files) : [];
    setFiles(selected);
  }, []);

  const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const dropped = Array.from(event.dataTransfer.files ?? []);
    setFiles(dropped);
  }, []);

  const handleUpload = useCallback(async () => {
    if (files.length === 0) {
      setError('Upload at least one manga panel to run the agent.');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append('panels', file));
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    try {
      setIsLoading(true);
      setError(null);
      onStatus?.('Uploading panels to the autonomous agent...');
      const response = await fetch('/api/pipeline', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? 'Pipeline failed');
      }

      const data = await response.json();
      onComplete(data.result as PipelineResult);
      onStatus?.('Pipeline completed successfully.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error';
      setError(message);
      onStatus?.(`Pipeline error: ${message}`);
    } finally {
      setIsLoading(false);
    }
  }, [files, form, onComplete, onStatus]);

  return (
    <div className="card border-white/10 p-6 backdrop-blur">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Manga Intake</h2>
          <p className="mt-2 text-sm text-white/70">
            Upload sequential manga panels and tune the cinematic intent. The agent will analyze story beats,
            orchestrate shots, and prepare animation directives automatically.
          </p>
        </div>

        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/5 px-6 py-10 text-center transition hover:border-primary-300/70"
        >
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-white/50">Drop Panels</p>
          <p className="max-w-md text-sm text-white/70">
            Drag in high resolution manga panels (JPG/PNG). Maintain narrative order so the agent can reconstruct
            the story flow.
          </p>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            Select Files
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
          {files.length > 0 && (
            <p className="text-xs text-white/60">{files.length} panel(s) queued</p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-white/80">
            Project title
            <Input
              value={form.mangaTitle}
              onChange={(event) => setForm((prev) => ({ ...prev, mangaTitle: event.target.value }))}
              placeholder="E.g. Blade Dancers: Volume 07"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-white/80">
            Genre + tone
            <Input
              value={form.genre}
              onChange={(event) => setForm((prev) => ({ ...prev, genre: event.target.value }))}
              placeholder="E.g. Mecha political thriller"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-white/80">
            Visual direction
            <Input
              value={form.styleReference}
              onChange={(event) => setForm((prev) => ({ ...prev, styleReference: event.target.value }))}
              placeholder="E.g. Painterly cel shading with volumetric lighting"
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-2 text-sm text-white/80">
              Pacing
              <Select
                value={form.pacing}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, pacing: event.target.value as PipelineContext['pacing'] }))
                }
              >
                {pacingOptions.map((option) => (
                  <option key={option} value={option} className="bg-slate-900 text-white">
                    {option}
                  </option>
                ))}
              </Select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/80">
              Voice model
              <Select
                value={form.voiceModel}
                onChange={(event) => setForm((prev) => ({ ...prev, voiceModel: event.target.value }))}
              >
                <option value="alloy" className="bg-slate-900 text-white">
                  alloy
                </option>
                <option value="nova" className="bg-slate-900 text-white">
                  nova
                </option>
                <option value="verse" className="bg-slate-900 text-white">
                  verse
                </option>
              </Select>
            </label>
          </div>
        </div>

        {error && <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}

        <div className="flex items-center gap-4">
          <Button type="button" variant="primary" size="lg" onClick={handleUpload} disabled={isLoading}>
            {isLoading ? 'Running Agent…' : 'Synthesize Anime Blueprint'}
          </Button>
          {isLoading && <p className="text-sm text-white/70">This may take a minute depending on the number of panels.</p>}
        </div>
      </div>
    </div>
  );
}
