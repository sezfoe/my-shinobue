import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register service worker safely for offline support without blocking initial render
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  try {
    registerSW({
      immediate: true,
      onOfflineReady() {
        console.log('篠笛曲集已就緒，支援離線看譜');
      },
      onRegisterError(error) {
        console.warn('SW registration skipped or failed:', error);
      },
    });
  } catch (err) {
    console.warn('registerSW execution failed:', err);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
