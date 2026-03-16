/**
 * react.js — useToast React hook.
 *
 * Provides the full toast API with optional per-hook defaults so you can,
 * for example, lock all toasts in a component to a specific position or style.
 *
 * @example
 * import { useToast } from 'your-toast-lib/react';
 *
 * function App() {
 *   const toast = useToast({ position: 'top-right', sound: true });
 *
 *   return (
 *     <button onClick={() => toast.success('Saved!')}>Save</button>
 *   );
 * }
 */

import { createToast, dismissToast, dismissAll } from './core-toast.js';
import { promiseToast }                          from './promise-toast.js';
import { anchoredToast }                         from './anchored-toast.js';
import { anchoredConfirm }                       from './anchored-confirm.js';
import { modalConfirm }                          from './modal.js';

/**
 * @param {object} [hookDefaults]  merged into every call made from this hook instance
 * @returns toast API object
 */
export function useToast(hookDefaults = {}) {
  // Merge hook-level defaults with per-call options (per-call wins)
  const m = (opts) => ({ ...hookDefaults, ...opts });

  return {
    /** Show a success toast */
    success:  (msg, opts)              => createToast(msg, m({ type: 'success', ...opts })),
    /** Show an error toast */
    error:    (msg, opts)              => createToast(msg, m({ type: 'error',   ...opts })),
    /** Show a warning toast */
    warning:  (msg, opts)              => createToast(msg, m({ type: 'warning', ...opts })),
    /** Show an info toast */
    info:     (msg, opts)              => createToast(msg, m({ type: 'info',    ...opts })),
    /** Show a toast with explicit type / full options */
    notify:   (msg, opts)              => createToast(msg, m(opts)),
    /** Track a Promise through loading → success/error */
    promise:  (p, msgs, opts)          => promiseToast(p, msgs, m(opts)),
    /** Show a tooltip-style anchored toast */
    anchored: (msg, anchor, opts)      => anchoredToast(msg, anchor, m(opts)),
    /** Show an inline anchored confirm popup (not Promise-based) */
    anchoredConfirm,
    /** Show a Promise-based centered modal confirm */
    modal:    modalConfirm,
    /** Dismiss a single toast by ID */
    dismiss:  dismissToast,
    /** Dismiss all active toasts */
    dismissAll,
  };
}