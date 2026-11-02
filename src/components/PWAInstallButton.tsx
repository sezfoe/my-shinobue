import React, { useState, useEffect } from 'react';
import { Download, Share, PlusSquare, X, Smartphone, ExternalLink, Copy, Check, AlertCircle } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      setIsInIframe(window.self !== window.top);
    } catch {
      setIsInIframe(true);
    }
  }, []);

  // If already running as an installed PWA, hide the button and divider
  if (isInstalled) {
    return null;
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDevUrl = typeof window !== 'undefined' && window.location.hostname.includes('ais-dev-');

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
                className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto"
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

                <div className="mt-4 space-y-3.5 text-sm text-stone-600 leading-relaxed">
                  {/* Explanation for 404 if using dev url */}
                  {isDevUrl && (
                    <div className="p-3.5 bg-red-50 rounded-xl border border-red-200/90 space-y-2">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-red-900">為什麼安裝後一定會 404？</div>
                          <p className="text-xs text-red-800/90 mt-1 leading-normal">
                            目前是 <strong>AI Studio 開發暫存環境</strong>（<code>ais-dev-...</code>）。這個網址在您離開編輯器或閒置後會自動休眠關閉，且 iOS 獨立桌面不帶 Google 登入 Cookie，因此<strong>點開必然顯示 404</strong>。
                          </p>
                        </div>
                      </div>

                      <div className="p-2.5 bg-white/90 rounded-lg border border-red-200 text-xs text-stone-800 space-y-1">
                        <div className="font-semibold text-stone-900">💡 永久不 404 的安裝步驟：</div>
                        <ol className="list-decimal list-inside space-y-1 text-stone-600">
                          <li>在 AI Studio 畫面右上角點擊 <strong>「Share（分享）」</strong> 發佈正式網址。</li>
                          <li>用 iPhone Safari 開啟產生的專屬正式網址。</li>
                          <li>點擊 Safari <strong>「分享」 $\rightarrow$ 「加入主畫面」</strong>。</li>
                        </ol>
                      </div>
                    </div>
                  )}

                  {!isDevUrl && (
                    <>
                      <div className="flex items-start gap-3 bg-stone-50 p-3 rounded-xl">
                        <div className="p-2 bg-white rounded-lg shadow-xs text-blue-600 shrink-0">
                          <Share className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-semibold text-stone-800">步驟 1</span>
                          <p className="text-xs text-stone-500 mt-0.5">
                            點選 Safari 底部或右上角的「<strong>分享</strong>」按鈕。
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-stone-50 p-3 rounded-xl">
                        <div className="p-2 bg-white rounded-lg shadow-xs text-stone-800 shrink-0">
                          <PlusSquare className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-semibold text-stone-800">步驟 2</span>
                          <p className="text-xs text-stone-500 mt-0.5">
                            選單向下滑動，點擊「<strong>加入主畫面</strong>（Add to Home Screen）」。
                          </p>
                        </div>
                      </div>

                      <div className="p-3 text-xs bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200/80">
                        正式網址已啟動離線快取（Service Worker），加入桌面後無網路也能正常看譜！
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="mt-5 w-full rounded-xl bg-stone-900 py-2.5 text-sm font-medium text-white hover:bg-black transition-all"
                >
                  關閉
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
