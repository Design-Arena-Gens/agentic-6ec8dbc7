'use client';

import type { AgentLogEntry } from '@/types/pipeline';

const statusClass: Record<AgentLogEntry['status'], string> = {
  queued: 'bg-white/10 text-white/70',
  working: 'bg-amber-500/20 text-amber-100 border border-amber-400/40',
  complete: 'bg-emerald-500/20 text-emerald-100 border border-emerald-400/40',
  error: 'bg-rose-500/20 text-rose-100 border border-rose-400/40'
};

export function AgentLog({ log }: { log: AgentLogEntry[] }) {
  return (
    <div className="card border-white/10 p-6 backdrop-blur">
      <h3 className="text-lg font-semibold tracking-tight">Agent Timeline</h3>
      <p className="mt-2 text-sm text-white/65">
        Observe how the orchestration engine traversed ingestion, analysis, writing, and animation stages.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        {log.map((entry, index) => (
          <div
            key={`${entry.stage}-${entry.timestamp}-${index}`}
            className={`rounded-xl px-4 py-3 text-sm shadow-lg shadow-black/30 ${statusClass[entry.status]}`}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="uppercase tracking-[0.3em] text-xs text-white/70">{entry.stage}</span>
              <span className="text-white/40 text-xs">{new Date(entry.timestamp).toLocaleTimeString()}</span>
            </div>
            <p className="mt-2 text-white/90">{entry.detail}</p>
          </div>
        ))}
        {log.length === 0 && (
          <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
            Pipeline has not been executed yet. Upload manga pages to kick off the agent.
          </p>
        )}
      </div>
    </div>
  );
}
