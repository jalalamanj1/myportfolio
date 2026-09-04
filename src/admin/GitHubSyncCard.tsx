import React from 'react';
import { Save, Github } from 'lucide-react';
import { GitHubConfig } from '../data/githubSync';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';

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
  const { lang } = useLang();
  return (
    <div className="mb-8 p-5 rounded-2xl bg-accent-soft border border-line space-y-4">
      <div className="flex items-center gap-2">
        <Github className="w-4 h-4 text-accent" />
        <h2 className="font-serif text-lg font-light text-accent">
          {t('gh.title', lang)}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex flex-col space-y-1.5 text-xs text-ink">
          {t('gh.tokenLabel', lang)}
          <input
            type="password"
            value={config.token}
            onChange={(e) => onConfigChange({ ...config, token: e.target.value })}
            placeholder={t('gh.tokenPlaceholder', lang)}
            className="glass-input px-4 py-3 text-sm font-light text-ink"
          />
        </label>
        <label className="flex flex-col space-y-1.5 text-xs text-ink">
          {t('gh.repoLabel', lang)}
          <input
            value={config.repo}
            onChange={(e) => onConfigChange({ ...config, repo: e.target.value })}
            placeholder={t('gh.repoPlaceholder', lang)}
            className="glass-input px-4 py-3 text-sm font-light text-ink"
          />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onSaveConfig}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          {t('gh.saveConnection', lang)}
        </button>
        <button
          onClick={onPush}
          disabled={busy}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button-primary text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
        >
          <Github className="w-3.5 h-3.5" />
          {busy ? t('gh.pushing', lang) : pushLabel}
        </button>
        <span className="text-xs text-ink-muted font-light">{status}</span>
      </div>
      <p className="text-[10px] text-ink-muted font-light leading-relaxed">
        {t('gh.note', lang)}
      </p>
    </div>
  );
};
