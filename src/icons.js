/**
 * icons.js — Default SVG icon set.
 * Override per-call with { icon: '<svg>…</svg>' }
 * or globally via configure({ icons: { success: '<svg>…</svg>' } })
 */

export const ICONS = {
  success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
  </svg>`,

  error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
  </svg>`,

  warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
  </svg>`,

  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>`,

  loading: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:__toast_spin 1s linear infinite">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>`,
};

// Inject spinner keyframe once
if (typeof document !== 'undefined' && !document.getElementById('__toast_styles')) {
  const s = document.createElement('style');
  s.id = '__toast_styles';
  s.textContent = '@keyframes __toast_spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(s);
}