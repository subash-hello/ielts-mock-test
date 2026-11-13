import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackKey?: string | number;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ExamErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ExamErrorBoundary] Uncaught exam component error:', error, errorInfo);
  }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.fallbackKey !== this.props.fallbackKey && this.state.hasError) {
      this.setState({ hasError: false, error: undefined });
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white select-none">
          <div className="max-w-md w-full p-6 rounded-xl border border-amber-300 bg-amber-50 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Exam View Synchronizing
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your test answers and countdown timer are preserved and safe. Click below to refresh the question view.
            </p>
            <button
              type="button"
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition cursor-pointer shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Resume Question View</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
