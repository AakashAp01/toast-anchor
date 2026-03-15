/**
 * promise-toast.js — Tracks a Promise with loading → success/error states.
 */

import { createToast, dismissToast } from './core-toast.js';
import { ICONS }                      from './icons.js';

let seq = 0;

/**
 * Show a loading toast while a Promise is pending, then switch to success/error.
 *
 * @param {Promise}  promise
 * @param {object}   messages
 * @param {string}            [messages.loading='Loading…']
 * @param {string|function}   [messages.success='Done!']        receives resolved value
 * @param {string|function}   [messages.error='Something went wrong'] receives error
 * @param {object}   [options] — any createToast option; applies to all states
 *
 * ── Per-state option overrides ────────────────────────────
 * @param {object}   [options.loadingOptions]  extra opts for loading toast
 * @param {object}   [options.successOptions]  extra opts for success toast
 * @param {object}   [options.errorOptions]    extra opts for error toast
 *
 * @returns {function} dismiss — manually dismiss the loading toast
 *
 * @example
 * toast.promise(saveUser(data), {
 *   loading: 'Saving…',
 *   success: (user) => `Welcome, ${user.name}!`,
 *   error:   (err)  => `Failed: ${err.message}`,
 * });
 *
 * @example — with custom colours per state
 * toast.promise(fetchData(), {
 *   loading: 'Fetching…',
 *   success: 'Got it!',
 *   error:   'Oops!',
 * }, {
 *   successOptions: { bg: '#f0fdf4', iconBg: '#bbf7d0' },
 *   errorOptions:   { bg: '#fff1f2' },
 * });
 */
export function promiseToast(promise, messages = {}, options = {}) {
  const {
    loading = 'Loading…',
    success = 'Done!',
    error   = 'Something went wrong',
  } = messages;

  const {
    loadingOptions = {},
    successOptions = {},
    errorOptions   = {},
    ...sharedOptions
  } = options;

  const id = `__toast_p${++seq}`;

  createToast(loading, {
    ...sharedOptions,
    ...loadingOptions,
    type:     'info',
    duration: 0,
    icon:     ICONS.loading,
    id,
  });

  Promise.resolve(promise)
    .then((result) => {
      dismissToast(id);
      const msg = typeof success === 'function' ? success(result) : success;
      createToast(msg, { ...sharedOptions, ...successOptions, type: 'success' });
    })
    .catch((err) => {
      dismissToast(id);
      const msg = typeof error === 'function' ? error(err) : error;
      createToast(msg, { ...sharedOptions, ...errorOptions, type: 'error' });
    });

  return () => dismissToast(id);
}