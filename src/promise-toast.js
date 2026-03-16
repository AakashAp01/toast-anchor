/**
 * promise-toast.js — Track a Promise through loading → success / error states.
 */

import { ICONS }                         from './icons.js';
import { DEFAULTS }                      from './defaults.js';
import { createToast, dismissToast, _active } from './core-toast.js';

let _seq = 0;

/**
 * Track a Promise with loading → success/error toast states.
 *
 * @param {Promise}  promise
 * @param {object}   messages
 * @param {string}            [messages.loading='Loading…']
 * @param {string|function}   [messages.success='Done!']     receives resolved value
 * @param {string|function}   [messages.error='Something went wrong']  receives error
 * @param {object}   [options]  forwarded to createToast — all style overrides apply
 * @returns {function} dismiss — cancels the loading indicator early
 *
 * @example
 * toast.promise(
 *   fetch('/api/save').then(r => r.json()),
 *   {
 *     loading: 'Saving…',
 *     success: (data) => `Saved "${data.name}"!`,
 *     error:   (err)  => `Failed: ${err.message}`,
 *   },
 *   { position: 'top-right', sound: true }
 * );
 */
export function promiseToast(promise, messages = {}, options = {}) {
  const {
    loading = 'Loading…',
    success = 'Done!',
    error   = 'Something went wrong',
  } = messages;

  const id = `__tk_p${++_seq}`;

  createToast(loading, {
    type:     'info',
    duration: 0,
    icon:     ICONS.loading,
    sound:    false,
    id,
    ...options,
  });

  Promise.resolve(promise)
    .then((result) => {
      dismissToast(id);
      const msg = typeof success === 'function' ? success(result) : success;
      createToast(msg, { type: 'success', ...options });
    })
    .catch((err) => {
      dismissToast(id);
      const msg = typeof error === 'function' ? error(err) : error;
      createToast(msg, { type: 'error', ...options });
    });

  return () => dismissToast(id);
}