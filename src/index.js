/**
 * index.js — Main entry point for the toast library.
 *
 * ─── NAMED EXPORTS (tree-shakeable) ────────────────────────────────────────
 *
 *   import { createToast, modalConfirm, configure, ICONS } from './index.js';
 *
 * ─── DEFAULT EXPORT (convenience object) ────────────────────────────────────
 *
 *   import toast from './index.js';
 *
 *   // Notify toasts (slide-in)
 *   toast.success('Saved!');
 *   toast.error('Failed.', { position: 'top-right' });
 *   toast.warning('Low storage.', { showProgress: true, duration: 6000 });
 *   toast.info('Tip: use Ctrl+S', { description: 'Keyboard shortcut' });
 *
 *   // Full style override per-call:
 *   toast.success('Dark mode!', {
 *     bg: '#1e1e2e', color: '#cdd6f4', borderRadius: '8px',
 *     borderColor: '#45475a', iconBg: '#313244', iconColor: '#a6e3a1',
 *     progressColor: '#a6e3a1', sound: true,
 *   });
 *
 *   // Promise tracking:
 *   toast.promise(saveData(), {
 *     loading: 'Saving…',
 *     success: (r) => `Saved ${r.name}!`,
 *     error:   (e) => `Error: ${e.message}`,
 *   });
 *
 *   // Anchored (tooltip-style):
 *   toast.anchored('Copied!', buttonEl, { position: 'top', type: 'success' });
 *   toast.anchored('Below me', buttonEl, { position: 'bottom', bg: '#7c3aed' });
 *
 *   // Anchored confirm:
 *   toast.anchoredConfirm('Remove item?', buttonEl,
 *     () => removeItem(),
 *     null,
 *     { position: 'top', confirmBg: '#7c3aed' }
 *   );
 *
 *   // Modal confirm (Promise):
 *   const ok = await toast.modal('Delete file?', 'This cannot be undone.', {
 *     confirmVariant: 'danger',
 *     bg: '#1e1e2e',
 *     titleColor: '#cdd6f4',
 *   });
 *   if (ok) deleteFile();
 *
 *   // Programmatic dismiss:
 *   const dismiss = toast.info('Loading…', { duration: 0 });
 *   dismiss(); // call when done
 *
 *   toast.dismissAll();
 *
 * ─── GLOBAL CONFIGURATION ───────────────────────────────────────────────────
 *
 *   toast.configure({
 *     position:     'top-right',
 *     sound:        true,
 *     showProgress: true,
 *
 *     // Style all toast cards globally:
 *     toast: {
 *       bg:           '#1e1e2e',
 *       color:        '#cdd6f4',
 *       borderRadius: '8px',
 *       borderColor:  '#45475a',
 *       borderWidth:  '1px',
 *     },
 *
 *     // Style all anchored toasts:
 *     anchored: {
 *       bg:           '#7c3aed',
 *       borderRadius: '8px',
 *     },
 *
 *     // Style all anchored confirms:
 *     anchoredConfirm: {
 *       bg:         '#1e1e2e',
 *       confirmBg:  '#a6e3a1',
 *     },
 *
 *     // Style all modals:
 *     modal: {
 *       bg:           '#1e1e2e',
 *       titleColor:   '#cdd6f4',
 *       overlayBg:    'rgba(0,0,0,0.8)',
 *       borderRadius: '16px',
 *     },
 *
 *     // Override type colors:
 *     theme: {
 *       success: { bg: '#a6e3a1', light: '#1e3a2f' },
 *     },
 *   });
 *
 * ─── REACT HOOK ─────────────────────────────────────────────────────────────
 *
 *   import { useToast } from './index.js';   // or from './react.js'
 *   const { success, modal, promise } = useToast({ position: 'top-center' });
 *
 * ─── POSITIONS (toast) ──────────────────────────────────────────────────────
 *   top-left       top-center       top-right
 *   middle-left    middle-center    middle-right
 *   bottom-left    bottom-center    bottom-right
 *
 * ─── POSITIONS (anchored / anchoredConfirm) ─────────────────────────────────
 *   top  bottom  left  right
 */

// ── Re-export everything (tree-shakeable) ────────────────────────────────────
export { ICONS }                                             from './icons.js';
export { DEFAULTS, configure }                               from './defaults.js';
export { createToast, dismissToast, dismissAll }             from './core-toast.js';
export { promiseToast }                                      from './promise-toast.js';
export { anchoredToast }                                     from './anchored-toast.js';
export { anchoredConfirm }                                   from './anchored-confirm.js';
export { modalConfirm }                                      from './modal.js';
export { useToast }                                          from './react.js';

// ── Convenience imports for the default object ───────────────────────────────
import { ICONS }                            from './icons.js';
import { configure }                        from './defaults.js';
import { createToast, dismissToast, dismissAll } from './core-toast.js';
import { promiseToast }                     from './promise-toast.js';
import { anchoredToast }                    from './anchored-toast.js';
import { anchoredConfirm }                  from './anchored-confirm.js';
import { modalConfirm }                     from './modal.js';

// ── Default export: the `toast` API object ───────────────────────────────────
export const toast = {
  // ── Notify toasts ──────────────────────────────────────────────────────────
  success:  (msg, opts) => createToast(msg, { type: 'success', ...opts }),
  error:    (msg, opts) => createToast(msg, { type: 'error',   ...opts }),
  warning:  (msg, opts) => createToast(msg, { type: 'warning', ...opts }),
  info:     (msg, opts) => createToast(msg, { type: 'info',    ...opts }),
  notify:   createToast,

  // ── Promise tracking ────────────────────────────────────────────────────────
  promise:  promiseToast,

  // ── Anchored ────────────────────────────────────────────────────────────────
  anchored:        anchoredToast,
  anchoredConfirm: anchoredConfirm,

  // ── Modal ───────────────────────────────────────────────────────────────────
  modal:    modalConfirm,

  // ── Dismiss ─────────────────────────────────────────────────────────────────
  dismiss:    dismissToast,
  dismissAll: dismissAll,

  // ── Config ──────────────────────────────────────────────────────────────────
  configure,
  ICONS,
};

export default toast;