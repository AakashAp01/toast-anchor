/**
 * configure.js — Set global defaults for all subsequent toast calls.
 *
 * Deep-merges nested objects (toast, anchored, anchoredConfirm, modal, theme).
 * All options are optional; only provided keys are updated.
 */

import { DEFAULTS } from './defaults.js';
import { ICONS }    from './icons.js';

/**
 * Update global toast defaults.
 *
 * @param {object} options
 *
 * ── Top-level ─────────────────────────────────────────────
 * @param {string}  [options.position]
 * @param {number}  [options.duration]
 * @param {boolean} [options.sound]          default is false
 * @param {boolean} [options.dismissOnClick]
 * @param {boolean} [options.showProgress]
 * @param {number}  [options.maxToasts]
 *
 * ── Nested sections (deep-merged) ─────────────────────────
 * @param {object}  [options.theme]           { success, error, warning, info } — { bg, light }
 * @param {object}  [options.toast]           notify toast appearance
 * @param {object}  [options.anchored]        anchored toast appearance
 * @param {object}  [options.anchoredConfirm] anchored confirm appearance
 * @param {object}  [options.modal]           modal confirm appearance
 * @param {object}  [options.icons]           override icon SVGs: { success, error, warning, info, loading }
 *
 * @example — enable sound globally and shift position
 * configure({ sound: true, position: 'top-right' });
 *
 * @example — retheme success to teal
 * configure({ theme: { success: { bg: '#0d9488', light: '#ccfbf1' } } });
 *
 * @example — dark modal by default
 * configure({
 *   modal: {
 *     bg: '#1e1e2e', footerBg: '#181825',
 *     titleColor: '#cdd6f4', messageColor: '#a6adc8',
 *     overlayBg: 'rgba(0,0,0,0.75)',
 *   },
 * });
 *
 * @example — override icons globally
 * configure({
 *   icons: {
 *     success: '<svg>…</svg>',
 *   },
 * });
 */
export function configure(options = {}) {
  const { theme, toast, anchored, anchoredConfirm, modal, icons, ...flat } = options;

  // Flat top-level keys
  Object.assign(DEFAULTS, flat);

  // Deep-merge nested sections
  const deepSections = { theme, toast, anchored, anchoredConfirm, modal };
  for (const [key, val] of Object.entries(deepSections)) {
    if (val && typeof val === 'object') {
      if (!DEFAULTS[key]) DEFAULTS[key] = {};
      // One more level deep for theme (has per-type objects)
      if (key === 'theme') {
        for (const [type, colours] of Object.entries(val)) {
          DEFAULTS.theme[type] = { ...DEFAULTS.theme[type], ...colours };
        }
      } else {
        Object.assign(DEFAULTS[key], val);
      }
    }
  }

  // Override icons
  if (icons && typeof icons === 'object') {
    Object.assign(ICONS, icons);
  }
}