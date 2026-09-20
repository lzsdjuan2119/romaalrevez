import { DedicationData, DEFAULT_DEDICATION } from '../types';

const STORAGE_KEY = 'flores_amarillas_dedication_v1';

export function loadDedication(): DedicationData {
  // 1. Try to read from URL query parameters
  if (typeof window !== 'undefined') {
    try {
      const params = new URLSearchParams(window.location.search);
      const nombre = params.get('nombre');
      const mensaje = params.get('mensaje');

      if (nombre || mensaje) {
        return {
          recipientName: (nombre || DEFAULT_DEDICATION.recipientName).trim(),
          message: (mensaje || DEFAULT_DEDICATION.message).trim(),
          photoUrl: null, // Note: photos are not put in URL query params to keep link short
        };
      }
    } catch (e) {
      console.warn('Could not parse URL query parameters', e);
    }

    // 2. Try to read from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          return {
            recipientName: parsed.recipientName || DEFAULT_DEDICATION.recipientName,
            message: parsed.message || DEFAULT_DEDICATION.message,
            photoUrl: parsed.photoUrl || null,
          };
        }
      }
    } catch (e) {
      console.warn('Could not access localStorage', e);
    }
  }

  return { ...DEFAULT_DEDICATION };
}

export function saveDedication(data: DedicationData): void {
  if (typeof window === 'undefined') return;

  // 1. Save to localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Could not save to localStorage', e);
  }

  // 2. Sync URL query parameters
  try {
    const url = new URL(window.location.href);
    if (data.recipientName) {
      url.searchParams.set('nombre', data.recipientName);
    } else {
      url.searchParams.delete('nombre');
    }

    if (data.message) {
      url.searchParams.set('mensaje', data.message);
    } else {
      url.searchParams.delete('mensaje');
    }

    window.history.replaceState({}, '', url.toString());
  } catch (e) {
    console.warn('Could not update URL parameters', e);
  }
}

export function getShareableUrl(data: DedicationData): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.origin + window.location.pathname);
  if (data.recipientName) {
    url.searchParams.set('nombre', data.recipientName);
  }
  if (data.message) {
    url.searchParams.set('mensaje', data.message);
  }
  return url.toString();
}
