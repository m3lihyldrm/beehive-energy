/**
 * BeeHive Plausible Analytics Service
 * Gizlilik dostu (Privacy-friendly, GDPR-uyumlu) analitik entegrasyonu.
 * Yalnızca VITE_PLAUSIBLE_DOMAIN ortam değişkeni tanımlıysa devreye girer.
 */

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
  }
}

export type AnalyticsEvent =
  | 'demo_request_submitted'
  | 'contact_form_error'
  | 'map_station_viewed'
  | 'demo_request_cta_clicked';

const PLAUSIBLE_DOMAIN = import.meta.env?.VITE_PLAUSIBLE_DOMAIN || '';

/**
 * Plausible script'ini sayfa yüklenirken dinamik ve asenkron olarak ekler.
 * Eğer VITE_PLAUSIBLE_DOMAIN boşsa hiçbir harici script yüklemez.
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return;
  if (!PLAUSIBLE_DOMAIN || PLAUSIBLE_DOMAIN.trim() === '') {
    // Analytics devre dışı
    return;
  }

  // Script daha önce eklenmiş mi kontrol et
  const existingScript = document.querySelector('script[data-domain]');
  if (existingScript) return;

  const script = document.createElement('script');
  script.defer = true;
  script.setAttribute('data-domain', PLAUSIBLE_DOMAIN.trim());
  script.src = 'https://plausible.io/js/script.tagged-events.js';
  document.head.appendChild(script);
  console.info(`[Analytics] Plausible Analytics '${PLAUSIBLE_DOMAIN}' için başlatıldı.`);
}

/**
 * Özel olay (Custom Event) kaydı
 */
export function trackEvent(eventName: AnalyticsEvent, props?: Record<string, any>): void {
  if (typeof window === 'undefined') return;

  if (window.plausible) {
    try {
      window.plausible(eventName, props ? { props } : undefined);
    } catch (e) {
      console.warn('[Analytics] Olay kaydedilemedi:', e);
    }
  } else if (PLAUSIBLE_DOMAIN) {
    console.debug(`[Analytics (Simüle)] Event: ${eventName}`, props);
  }
}
