import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div 
      id="offline-banner"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-xl bg-stone-900/90 text-stone-100 backdrop-blur-md px-3.5 py-2 text-xs font-medium shadow-lg border border-stone-700"
    >
      <WifiOff className="w-4 h-4 text-amber-400" />
      <span>離線模式 — 已載入本地快取樂譜</span>
    </div>
  );
};
