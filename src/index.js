/**
 * index.js — Entry point for the toast notification package.
 *
 * ─── QUICK START ─────────────────────────────────────────────────────────────
 *
 *  Vanilla JS
 *  ──────────
 *  import toast from 'your-toast-pkg';
 *
 *  toast.success('Saved!');
 *  toast.error('Failed.', { position: 'top-right' });
 *  toast.warning('Low storage', { sound: true, showProgress: true });
 *
 *  // Promise
 *  toast.promise(fetch('/api/save'), {
 *    loading: 'Saving…',
 *    success: (d) => `Saved ${d.name}!`,
 *    error:   (e) => `Error: ${e.message}`,
 *  });
 *
 *  // Anchored (tooltip above a button)
 *  toast.anchored('Copied!', document.getElementById('copy-btn'), {
 *    type: 'success',
 *    bg: '#7c3aed', arrowColor: '#7c3aed', textColor: '#fff',
 *  });
 *
 *  // Anchored confirm (inline yes/no)
 *  toast.anchoredConfirm('Delete this?', btnEl, () => handleDelete(), null, {
 *    confirmLabel: 'Delete',
 *    confirmBg: '#dc2626',
 *  });
 *
 *  // Modal (Promise-based)
 *  const ok = await toast.modal('Delete account?', 'This is permanent.', {
 *    confirmLabel: 'Delete',
 *    bg: '#1e1e2e', footerBg: '#181825',
 *    titleColor: '#cdd6f4', messageColor: '#a6adc8',
 *  });
 *  if (ok) handleDelete();
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  React
 *  ──────
 *  import { useToast } from 'your-toast-pkg';
 *
 *  function MyComponent() {
 *    const toast = useToast({ position: 'top-right', sound: true });
 *
 *    const handleSave = async () => {
 *      const ok = await toast.modal('Save?', 'Changes will be published.');
 *      if (ok) toast.success('Published!');
 *    };
 *
 *    return <button onClick={handleSave}>Save</button>;
 *  }
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Global config (run once at app startup)
 *  ───────────────────────────────────────
 *  import { configure } from 'your-toast-pkg';
 *
 *  configure({
 *    position:     'top-right',
 *    duration:     5000,
 *    sound:        true,           // enable sound globally (default is OFF)
 *    showProgress: true,
 *    theme: {
 *      success: { bg: '#0d9488', light: '#ccfbf1' },
 *    },
 *    modal: {
 *      bg: '#1e1e2e', footerBg: '#181825',
 *      titleColor: '#cdd6f4',
 *    },
 *    anchored: {
 *      bg: '#312e81', arrowColor: '#312e81',
 *    },
 *  });
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Sound
 *  ──────
 *  Sound is OFF by default.
 *  Enable per-call:     toast.success('!', { sound: true })
 *  Enable globally:     configure({ sound: true })
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Re-export everything ──────────────────────────────────────────────────────
export { DEFAULTS }           from './defaults.js';
export { ICONS }              from './icons.js';
export { SOUND_PROFILES }     from './audio.js';
export { playSound }          from './audio.js';
export { configure }          from './configure.js';
export { createToast, dismissToast, dismissAll } from './core-toast.js';
export { promiseToast }       from './promise-toast.js';
export { anchoredToast }      from './anchored-toast.js';
export { anchoredConfirm }    from './anchored-confirm.js';
export { modalConfirm }       from './modal-confirm.js';
export { useToast }           from './react-hook.js';

// ── Named convenience imports ─────────────────────────────────────────────────
import { createToast, dismissToast, dismissAll } from './core-toast.js';
import { promiseToast }    from './promise-toast.js';
import { anchoredToast }   from './anchored-toast.js';
import { anchoredConfirm } from './anchored-confirm.js';
import { modalConfirm }    from './modal-confirm.js';
import { configure }       from './configure.js';
import { ICONS }           from './icons.js';

/**
 * Default export — the `toast` object with all methods.
 *
 * @type {{
 *   success, error, warning, info, notify,
 *   promise,
 *   anchored, anchoredConfirm,
 *   modal,
 *   dismiss, dismissAll,
 *   configure,
 *   ICONS,
 * }}
 */
const toast = {
  // ── Notify toasts ──────────────────────────────────────────
  success:  (msg, opts) => createToast(msg, { type: 'success', ...opts }),
  error:    (msg, opts) => createToast(msg, { type: 'error',   ...opts }),
  warning:  (msg, opts) => createToast(msg, { type: 'warning', ...opts }),
  info:     (msg, opts) => createToast(msg, { type: 'info',    ...opts }),
  notify:   createToast,

  // ── Promise tracking ───────────────────────────────────────
  promise: promiseToast,

  // ── Anchored ───────────────────────────────────────────────
  anchored:        anchoredToast,
  anchoredConfirm: anchoredConfirm,

  // ── Modal ──────────────────────────────────────────────────
  modal: modalConfirm,

  // ── Dismiss ────────────────────────────────────────────────
  dismiss:    dismissToast,
  dismissAll,

  // ── Config ─────────────────────────────────────────────────
  configure,
  ICONS,
};

export default toast;