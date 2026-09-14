import React, { useState } from 'react';
import { Download, Share, PlusSquare, X, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button and divider
  if (isInstalled) {
    return null;
  }

  return (
    <div className="w-full max-w-xs flex flex-col items-center gap-4 pt-1">
      {/* Separator Divider */}
      <div className="w-full border-t border-stone-300" />

      {isInstallable ? (
        <button
          id="pwa-install-btn"
          onClick={install}
          className="inline-flex items-center gap-2 rounded-xl bg-stone-800 px-4 py-2.5 text-xs md:text-sm font-medium text-white shadow-sm hover:bg-black transition-all"
        >
          <Download className="w-4 h-4" />
          <span>安裝樂譜 App 到主畫面</span>
        </button>
      ) : (
        <>
          <button
            id="pwa-ios-guide-btn"
            onClick={() => setShowIOSGuide(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white/80 backdrop-blur px-4 py-2.5 text-xs md:text-sm font-medium text-stone-700 shadow-sm hover:bg-stone-100 transition-all"
          >
            <Smartphone className="w-4 h-4 text-stone-600" />
            <span>安裝至 iOS / iPad 主畫面</span>
          </button>

          {showIOSGuide && (
            <div 
              id="pwa-ios-modal"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
              onClick={() => setShowIOSGuide(false)}
            >
              <div 
                className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-stone-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <h3 className="text-base font-semibold text-stone-900 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-stone-700" />
                    安裝到 iPhone / iPad
                  </h3>
                  <button
                    onClick={() => setShowIOSGuide(false)}
                    className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 space-y-3 text-sm text-stone-600 leading-relaxed">
                  <div className="flex items-start gap-3 bg-stone-50 p-3 rounded-xl">
                    <div className="p-2 bg-white rounded-lg shadow-xs text-blue-600">
                      <Share className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-semibold text-stone-800">步驟 1</span>
                      <p className="text-xs text-stone-500 mt-0.5">點選 Safari 底部或右上角的「<strong>分享</strong>」按鈕（向上方塊箭頭）。</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-stone-50 p-3 rounded-xl">
                    <div className="p-2 bg-white rounded-lg shadow-xs text-stone-800">
                      <PlusSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-semibold text-stone-800">步驟 2</span>
                      <p className="text-xs text-stone-500 mt-0.5">選單向下滑動，點擊「<strong>加入主畫面</strong>（Add to Home Screen）」。</p>
                    </div>
                  </div>

                  <div className="p-3 text-xs bg-amber-50 text-amber-800 rounded-xl border border-amber-200/60">
                    完成後將以獨立全螢幕運行，無網址列干擾，並支援離線演奏看譜。
                  </div>
                </div>

                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="mt-5 w-full rounded-xl bg-stone-900 py-2.5 text-sm font-medium text-white hover:bg-black transition-all"
                >
                  我知道了
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
