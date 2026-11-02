import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public props: Props;
  public state: State;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleClearCacheAndReload = async () => {
    try {
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
        }
      }
      if ("caches" in window) {
        const cacheNames = await caches.keys();
        for (const name of cacheNames) {
          await caches.delete(name);
        }
      }
    } catch (e) {
      console.warn("Failed to clear caches:", e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-6 text-stone-900 font-sans">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-stone-200 p-6 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xl font-bold">
              !
            </div>
            <h2 className="text-xl font-medium tracking-wide">畫面載入出現異常</h2>
            <p className="text-xs text-stone-500 break-words font-mono bg-stone-50 p-3 rounded-lg border border-stone-200 text-left">
              {this.state.error?.message || "未知錯誤"}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 px-4 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors"
              >
                重新整理頁面
              </button>
              <button
                onClick={this.handleClearCacheAndReload}
                className="flex-1 px-4 py-2.5 bg-stone-100 text-stone-700 border border-stone-300 rounded-xl text-sm font-medium hover:bg-stone-200 transition-colors"
              >
                清除快取重整
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
