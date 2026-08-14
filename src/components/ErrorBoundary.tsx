import React, { Component } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { t } from '../i18n';

interface Props {
  children: React.ReactNode;
}

interface State {
  error: Error | null;
  stack: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  state: State = { error: null, stack: null };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
    this.setState({ stack: info.componentStack });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="w-full min-h-screen flex items-center justify-center p-6">
          <div className="glass-panel p-8 rounded-[32px] border border-red-500/40 max-w-lg w-full">
            <h2 className="font-serif text-2xl font-light text-white mb-3">
              {t('error.title', this.context.lang)}
            </h2>
            <pre className="text-xs text-red-300 font-mono whitespace-pre-wrap break-words">
              {this.state.error.message}
              {this.state.stack ? '\n---\n' + this.state.stack : ''}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
