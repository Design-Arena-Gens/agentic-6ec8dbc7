export type MangaPanel = {
  filename: string;
  width: number;
  height: number;
  base64: string;
};

export type PanelBeat = {
  panel: MangaPanel;
  summary: string;
  emotions: string[];
  keyMoments: string[];
};

export type ShotPlan = {
  id: string;
  title: string;
  description: string;
  dialogue: string;
  camera: string;
  soundtrack: string;
  durationSeconds: number;
};

export type AnimationAsset = {
  shotId: string;
  prompt: string;
  negativePrompt: string;
  seed: number;
  referencePanel?: string;
  videoUrl?: string | null;
  fallbackPoster?: string | null;
};

export type AgentLogEntry = {
  stage: string;
  status: 'queued' | 'working' | 'complete' | 'error';
  detail: string;
  timestamp: string;
};

export type PipelineResult = {
  beats: PanelBeat[];
  shots: ShotPlan[];
  animation: AnimationAsset[];
  narrativeSynopsis: string;
  estimatedRuntime: number;
  soundtrackPitch: string;
  log: AgentLogEntry[];
};

export type PipelineContext = {
  mangaTitle: string;
  genre: string;
  styleReference: string;
  pacing: 'kinetic' | 'balanced' | 'melancholic';
  voiceModel: string;
};
