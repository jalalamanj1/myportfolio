import React from 'react';
import { Save, Github } from 'lucide-react';
import { GitHubConfig } from '../data/githubSync';

interface GitHubSyncCardProps {
  config: GitHubConfig;
  onConfigChange: (config: GitHubConfig) => void;
  status: string;
  busy: boolean;
  onSaveConfig: () => void;
  onPush: () => void;
  pushLabel: string;
}

export const GitHubSyncCard: React.FC<GitHubSyncCardProps> = ({
  config,
  onConfigChange,
  status,
  busy,
  onSaveConfig,
  onPush,
  pushLabel,
}) => {
  return (
    <div className="mb-8 p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
      <div className="flex items-center gap-2">
        <Github className="w-4 h-4 text-[#D7C4A3]" />
        <h2 className="font-serif text-lg font-light text-[#D7C4A3]">
          GitHub Sync — publish to all visitors
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
          GitHub Token (fine-grained PAT, Contents: read+write on this repo only)
          <input
            type="password"
            value={config.token}
            onChange={(e) => onConfigChange({ ...config, token: e.target.value })}
            placeholder="github_pat_…"
            className="glass-input px-4 py-3 text-sm font-light text-white"
          />
        </label>
        <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
          Repository
          <input
            value={config.repo}
            onChange={(e) => onConfigChange({ ...config, repo: e.target.value })}
            placeholder="owner/repo"
            className="glass-input px-4 py-3 text-sm font-light text-white"
          />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onSaveConfig}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          Save Connection
        </button>
        <button
          onClick={onPush}
          disabled={busy}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button-primary text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
        >
          <Github className="w-3.5 h-3.5" />
          {busy ? 'Pushing…' : pushLabel}
        </button>
        <span className="text-xs text-neutral-400 font-light">{status}</span>
      </div>
      <p className="text-[10px] text-neutral-500 font-light leading-relaxed">
        Token is stored only in your browser and sent to api.github.com. Pushing overwrites the data file
        in the repo and triggers the deploy — no manual download needed. "Save" pushes automatically when a token is saved.
      </p>
    </div>
  );
};
