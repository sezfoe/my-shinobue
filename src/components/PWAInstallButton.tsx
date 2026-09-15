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
                  {/* 404 Prevention Alert if inside AI Studio iframe */}
                  {isInIframe ? (
                    <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200/80 space-y-3">
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-amber-900">為什麼安裝後會 404？</div>
                          <p className="text-xs text-amber-800/90 mt-1 leading-normal">
                            您目前在 AI Studio 編輯預覽內。若直接在目前頁面點 Safari 分享，會把 <strong>AI Studio 工作區網址</strong> 加入桌面，導致開啟時無權限顯示 404。
                          </p>
                        </div>
                      </div>

                      <div className="pt-1 flex flex-col gap-2">
                        <a
                          href={window.location.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full rounded-xl bg-stone-900 text-white py-2.5 text-xs font-semibold hover:bg-black transition shadow-sm"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>在獨立分頁開啟本 App（推薦）</span>
                        </a>

                        <button
                          type="button"
                          onClick={handleCopyLink}
                          className="flex items-center justify-center gap-1.5 w-full rounded-xl border border-amber-300/80 bg-white py-2 text-xs font-medium text-stone-700 hover:bg-amber-50/50 transition"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
                          <span>{copied ? '已複製專屬獨立網址！' : '複製專屬獨立網址'}</span>
                        </button>
                      </div>

                      <p className="text-[11px] text-amber-700 leading-tight">
                        💡 點擊上方按鈕在 Safari 開啟新分頁後，再執行下方的步驟 1 與步驟 2，即可正常使用！
                      </p>
                    </div>
                  ) : null}

                  <div className="flex items-start gap-3 bg-stone-50 p-3 rounded-xl">
                    <div className="p-2 bg-white rounded-lg shadow-xs text-blue-600 shrink-0">
                      <Share className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-semibold text-stone-800">步驟 1</span>
                      <p className="text-xs text-stone-500 mt-0.5">
                        在獨立 App 網頁中，點選 Safari 底部或右上角的「<strong>分享</strong>」按鈕。
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

                  <div className="p-3 text-xs bg-stone-100 text-stone-700 rounded-xl">
                    安裝完成後，將以獨立全螢幕運行，無 Safari 網址列干擾，並支援離線演奏看譜。
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
