/**
 * react-hook.js — useToast React hook.
 *
 * Provides the full toast API scoped to a set of default options.
 * Import from the package root: import { useToast } from 'your-toast-pkg';
 */

import { createToast, dismissToast, dismissAll } from './core-toast.js';
import { promiseToast }    from './promise-toast.js';
import { anchoredToast }   from './anchored-toast.js';
import { anchoredConfirm } from './anchored-confirm.js';
import { modalConfirm }    from './modal-confirm.js';

/**
 * React hook — returns the toast API with optional default options pre-applied.
 *
 * @param {object} [defaultOptions]
 *   Any option accepted by createToast/anchoredToast/etc.
 *   These are merged (per-call options take priority).
 *
 * @returns {{
 *   success, error, warning, info, notify,
 *   promise,
 *   anchored, anchoredConfirm,
 *   modal,
 *   dismiss, dismissAll,
 * }}
 *
 * @example
 * const toast = useToast({ position: 'top-right', sound: true });
 * toast.success('Saved!');
 *
 * @example — scoped sound/position for an entire component
 * const { success, modal } = useToast({ sound: true, duration: 3000 });
 * const ok = await modal('Delete?', 'Permanent action.');
 * if (ok) { success('Deleted!'); }
 */
export function useToast(defaultOptions = {}) {
  const merge = (opts = {}) => ({ ...defaultOptions, ...opts });

  return {
    // ── Notify toasts ──────────────────────────────────────
    success:  (msg, opts) => createToast(msg, { ...merge(opts), type: 'success' }),
    error:    (msg, opts) => createToast(msg, { ...merge(opts), type: 'error'   }),
    warning:  (msg, opts) => createToast(msg, { ...merge(opts), type: 'warning' }),
    info:     (msg, opts) => createToast(msg, { ...merge(opts), type: 'info'    }),
    notify:   (msg, opts) => createToast(msg, merge(opts)),

    // ── Promise toast ──────────────────────────────────────
    promise:  (p, msgs, opts) => promiseToast(p, msgs, merge(opts)),

    // ── Anchored ───────────────────────────────────────────
    anchored:        (msg, anchor, opts) => anchoredToast(msg, anchor, merge(opts)),
    anchoredConfirm: (msg, anchor, onConfirm, onCancel, opts) =>
                       anchoredConfirm(msg, anchor, onConfirm, onCancel, merge(opts)),

    // ── Modal ──────────────────────────────────────────────
    modal: (title, msg, opts) => modalConfirm(title, msg, merge(opts)),

    // ── Dismiss ────────────────────────────────────────────
    dismiss:    dismissToast,
    dismissAll,
  };
}