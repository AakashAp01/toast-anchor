/**
 * toast.js — Fully Customizable Toast Library
 * Works with Vanilla JS and React (useToast hook included)
 * No dependencies required.
 *
 * ─── QUICK START ───────────────────────────────────────────
 *
 *  Vanilla JS:
 *    import toast from './toast.js';
 *    toast.success('Saved!');
 *    toast.error('Something broke.', { position: 'top-right' });
 *
 *  React:
 *    import { useToast } from './toast.js';
 *    const { success, error, promise, modal } = useToast();
 *    success('Profile updated!');
 *    const ok = await modal('Delete?', 'Are you sure?');
 *
 * ───────────────────────────────────────────────────────────
 */

// ============================================================
// 1. AUDIO ENGINE
// ============================================================
let audioCtx = null;

function playSound(type = 'success') {
  if (typeof window === 'undefined') return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    const profiles = {
      success: { wave: 'sine',     sf: 600, ef: 900,  gs: 0.15, ge: 0.01, dur: 0.15 },
      error:   { wave: 'sawtooth', sf: 400, ef: 200,  gs: 0.15, ge: 0.01, dur: 0.15 },
      warning: { wave: 'triangle', sf: 600, ef: 380,  gs: 0.12, ge: 0.01, dur: 0.13 },
      info:    { wave: 'sine',     sf: 800, ef: 300,  gs: 0.15, ge: 0.01, dur: 0.10 },
      pop:     { wave: 'sine',     sf: 700, ef: 350,  gs: 0.12, ge: 0.01, dur: 0.10 },
    };

    const p   = profiles[type] || profiles.pop;
    const now = audioCtx.currentTime;

    osc.type = p.wave;
    osc.frequency.setValueAtTime(p.sf, now);
    osc.frequency.exponentialRampToValueAtTime(p.ef, now + p.dur);
    gain.gain.setValueAtTime(p.gs, now);
    gain.gain.exponentialRampToValueAtTime(p.ge, now + p.dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(now + p.dur);
  } catch (_) { /* silent fail */ }
}

// ============================================================
// 2. DEFAULTS (mutated by configure())
// ============================================================
const DEFAULTS = {
  position:       'bottom-right', // top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
  duration:       4000,           // ms; 0 = stay until dismissed
  sound:          true,
  dismissOnClick: false,
  showProgress:   false,
  maxToasts:      5,
  theme: {
    success: { bg: '#10b981', light: '#d1fae5' },
    error:   { bg: '#ef4444', light: '#fee2e2' },
    warning: { bg: '#f59e0b', light: '#fef3c7' },
    info:    { bg: '#3b82f6', light: '#dbeafe' },
  },
};

// ============================================================
// 3. ICONS
// ============================================================
export const ICONS = {
  success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`,
  error:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
  info:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  loading: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:__toast_spin 1s linear infinite"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
};

// Inject spinner keyframe once
if (typeof document !== 'undefined' && !document.getElementById('__toast_styles')) {
  const s = document.createElement('style');
  s.id = '__toast_styles';
  s.textContent = '@keyframes __toast_spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(s);
}

// ============================================================
// 4. CONTAINER MANAGER
// ============================================================
const POSITION_CSS = {
  'top-left':      'top:1.5rem;left:1.5rem;flex-direction:column',
  'top-center':    'top:1.5rem;left:50%;transform:translateX(-50%);flex-direction:column',
  'top-right':     'top:1.5rem;right:1.5rem;flex-direction:column',
  'bottom-left':   'bottom:1.5rem;left:1.5rem;flex-direction:column-reverse',
  'bottom-center': 'bottom:1.5rem;left:50%;transform:translateX(-50%);flex-direction:column-reverse',
  'bottom-right':  'bottom:1.5rem;right:1.5rem;flex-direction:column-reverse',
};

function getContainer(position) {
  if (typeof document === 'undefined') return null;
  const id  = `__toast_c_${position.replace(/-/g, '_')}`;
  let   el  = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    el.setAttribute('style', `position:fixed;z-index:9999;display:flex;gap:10px;pointer-events:none;${POSITION_CSS[position] || POSITION_CSS['bottom-right']}`);
    document.body.appendChild(el);
  }
  return el;
}

// ============================================================
// 5. CORE NOTIFY TOAST
// ============================================================
let   toastSeq    = 0;
const activeMap   = new Map(); // id → { el, timer }

/**
 * Dismiss a toast by its ID.
 * @param {string} id
 */
export function dismissToast(id) {
  const entry = activeMap.get(id);
  if (!entry) return;
  clearTimeout(entry.timer);
  const el = entry.el;
  el.style.opacity   = '0';
  el.style.transform = 'scale(0.9) translateY(6px)';

  const h = el.offsetHeight;
  el.style.maxHeight = h + 'px';
  setTimeout(() => {
    el.style.transition = 'all 0.32s ease-out';
    el.style.maxHeight  = '0';
    el.style.padding    = '0 14px';
    el.style.overflow   = 'hidden';
  }, 60);
  setTimeout(() => { el.remove(); activeMap.delete(id); }, 420);
}

/**
 * Create a global (slide-in) notification toast.
 *
 * @param {string} message
 * @param {object} [options]
 * @param {'success'|'error'|'warning'|'info'} [options.type='success']
 * @param {string}  [options.position]         - overrides configure() default
 * @param {number}  [options.duration]         - ms; 0 = no auto-close
 * @param {boolean} [options.sound]
 * @param {boolean} [options.dismissOnClick]
 * @param {boolean} [options.showProgress]
 * @param {string}  [options.description]      - secondary text below message
 * @param {string}  [options.icon]             - custom HTML icon string
 * @param {{label:string, onClick:function}} [options.action] - action button
 * @param {string}  [options.id]               - custom ID for programmatic dismiss
 * @returns {function} dismiss — call to manually dismiss this toast
 */
export function createToast(message, options = {}) {
  if (typeof document === 'undefined') return () => {};

  const o = {
    type:           'success',
    position:       DEFAULTS.position,
    duration:       DEFAULTS.duration,
    sound:          DEFAULTS.sound,
    dismissOnClick: DEFAULTS.dismissOnClick,
    showProgress:   DEFAULTS.showProgress,
    description:    null,
    icon:           null,
    action:         null,
    id:             null,
    ...options,
  };

  const type   = o.type;
  const theme  = { ...(DEFAULTS.theme[type] || DEFAULTS.theme.success) };
  const icon   = o.icon || ICONS[type] || ICONS.success;
  const id     = o.id   || `__toast_${++toastSeq}`;

  if (o.sound) playSound(type);

  const container = getContainer(o.position);
  if (!container) return () => {};

  // Enforce max queue
  if (activeMap.size >= DEFAULTS.maxToasts) {
    dismissToast(activeMap.keys().next().value);
  }

  const el = document.createElement('div');
  el.id = id;
  el.setAttribute('style', [
    'pointer-events:auto',
    'position:relative',
    'overflow:hidden',
    'display:flex',
    'align-items:flex-start',
    'gap:12px',
    'width:316px',
    'background:white',
    'border:1px solid #f1f5f9',
    'padding:13px 14px',
    'border-radius:14px',
    'box-shadow:0 4px 24px rgba(0,0,0,0.08),0 1px 4px rgba(0,0,0,0.04)',
    'transition:all 0.38s cubic-bezier(0.34,1.56,0.64,1)',
    'opacity:0',
    'transform:scale(0.9) translateY(10px)',
    `cursor:${o.dismissOnClick ? 'pointer' : 'default'}`,
  ].join(';'));

  el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;flex-shrink:0;background:${theme.light};color:${theme.bg}">
      <div style="width:16px;height:16px;display:flex">${icon}</div>
    </div>
    <div style="flex:1;min-width:0;padding-top:2px">
      <p style="font-size:13.5px;font-weight:600;color:#1e293b;line-height:1.4;margin:0">${message}</p>
      ${o.description ? `<p style="font-size:12px;color:#64748b;margin:3px 0 0;line-height:1.5">${o.description}</p>` : ''}
      ${o.action ? `<button data-toast-action style="margin-top:7px;font-size:12px;font-weight:700;color:${theme.bg};background:none;border:none;cursor:pointer;padding:0;display:block">${o.action.label}</button>` : ''}
    </div>
    <button data-toast-close style="flex-shrink:0;background:none;border:none;cursor:pointer;color:#cbd5e1;padding:1px;margin-top:1px;line-height:0;transition:color 0.15s" title="Dismiss">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
    ${o.showProgress && o.duration > 0
      ? `<div data-toast-bar style="position:absolute;bottom:0;left:0;height:3px;border-radius:0 0 14px 14px;background:${theme.bg};width:100%;transition:width ${o.duration}ms linear"></div>`
      : ''}
  `;

  container.appendChild(el);

  const dismiss = () => dismissToast(id);
  let   timer   = null;

  // Animate in
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.opacity   = '1';
    el.style.transform = 'scale(1) translateY(0)';
    if (o.showProgress && o.duration > 0) {
      const bar = el.querySelector('[data-toast-bar]');
      if (bar) bar.style.width = '0%';
    }
  }));

  if (o.duration > 0) timer = setTimeout(dismiss, o.duration);

  // Pause timer on hover
  el.addEventListener('mouseenter', () => { if (timer) clearTimeout(timer); });
  el.addEventListener('mouseleave', () => {
    if (o.duration > 0) timer = setTimeout(dismiss, Math.min(o.duration, 1500));
  });

  el.querySelector('[data-toast-close]')?.addEventListener('click', (e) => { e.stopPropagation(); dismiss(); });
  if (o.dismissOnClick) el.addEventListener('click', dismiss);
  el.querySelector('[data-toast-action]')?.addEventListener('click', (e) => {
    e.stopPropagation(); o.action?.onClick?.(); dismiss();
  });

  activeMap.set(id, { el, timer });
  return dismiss;
}

// ============================================================
// 6. PROMISE TOAST
// ============================================================

/**
 * Tracks a Promise with loading → success/error states.
 *
 * @param {Promise}  promise
 * @param {{ loading?: string, success?: string|function, error?: string|function }} messages
 * @param {object}   [options] - same as createToast options
 * @returns {function} dismiss
 *
 * @example
 * toast.promise(fetch('/api/save'), {
 *   loading: 'Saving...',
 *   success: (data) => `Saved ${data.name}!`,
 *   error:   (err)  => `Error: ${err.message}`,
 * });
 */
export function promiseToast(promise, messages = {}, options = {}) {
  const {
    loading = 'Loading…',
    success = 'Done!',
    error   = 'Something went wrong',
  } = messages;

  const id = `__toast_p${++toastSeq}`;

  createToast(loading, {
    type:     'info',
    duration: 0,
    icon:     ICONS.loading,
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

// ============================================================
// 7. ANCHORED TOAST (tooltip-style, above element)
// ============================================================

/**
 * Show a tooltip-style toast anchored above an element.
 *
 * @param {string}      message
 * @param {HTMLElement} anchor  - the element to anchor above
 * @param {object}      [options]
 * @param {'success'|'error'|'warning'|'info'} [options.type='success']
 * @param {number}  [options.duration=2500]
 * @param {boolean} [options.sound=true]
 * @param {string}  [options.icon]
 * @returns {function} dismiss
 */
export function anchoredToast(message, anchor, options = {}) {
  if (typeof document === 'undefined' || !anchor) return () => {};

  const o = { type: 'success', duration: 2500, sound: true, icon: null, ...options };
  if (o.sound) playSound(o.type);

  const theme = DEFAULTS.theme[o.type] || DEFAULTS.theme.success;
  const icon  = o.icon || ICONS[o.type];

  const el = document.createElement('div');
  el.setAttribute('style', [
    'position:absolute',
    'z-index:9998',
    'padding:8px 14px',
    'background:#0f172a',
    'color:white',
    'font-size:13px',
    'font-weight:600',
    'border-radius:10px',
    'box-shadow:0 8px 24px rgba(0,0,0,0.2)',
    'pointer-events:none',
    'white-space:nowrap',
    'transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
    'opacity:0',
    'transform:scale(0.85) translateY(8px)',
  ].join(';'));

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:7px">
      <div style="width:15px;height:15px;display:flex;color:${theme.bg}">${icon}</div>
      <span>${message}</span>
    </div>
    <div style="position:absolute;bottom:-5px;left:50%;transform:translateX(-50%) rotate(45deg);width:10px;height:10px;background:#0f172a"></div>
  `;

  document.body.appendChild(el);

  const { top, left, width } = anchor.getBoundingClientRect();
  const { height, width: tw } = el.getBoundingClientRect();
  el.style.top  = `${top  + window.scrollY - height - 13}px`;
  el.style.left = `${left + window.scrollX + width / 2 - tw / 2}px`;

  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.opacity   = '1';
    el.style.transform = 'scale(1) translateY(0)';
  }));

  const dismiss = () => {
    el.style.opacity   = '0';
    el.style.transform = 'scale(0.9) translateY(4px)';
    setTimeout(() => el.remove(), 300);
  };

  if (o.duration > 0) setTimeout(dismiss, o.duration);
  return dismiss;
}

// ============================================================
// 8. ANCHORED CONFIRM (inline yes/no popup)
// ============================================================

/**
 * Show an inline confirmation popup anchored above an element.
 *
 * @param {string}      message
 * @param {HTMLElement} anchor
 * @param {function}    onConfirm
 * @param {function}    [onCancel]
 * @param {object}      [options]
 * @param {string}      [options.confirmLabel='Yes']
 * @param {string}      [options.cancelLabel='No']
 * @param {boolean}     [options.sound=true]
 */
export function anchoredConfirm(message, anchor, onConfirm, onCancel, options = {}) {
  if (typeof document === 'undefined' || !anchor) return;

  const o = { confirmLabel: 'Yes', cancelLabel: 'No', sound: true, ...options };
  if (o.sound) playSound('warning');

  const el = document.createElement('div');
  el.setAttribute('style', [
    'position:absolute',
    'z-index:9998',
    'padding:12px 14px',
    'background:#0f172a',
    'color:white',
    'font-size:13px',
    'font-weight:600',
    'border-radius:12px',
    'box-shadow:0 8px 28px rgba(0,0,0,0.22)',
    'pointer-events:auto',
    'min-width:160px',
    'transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
    'opacity:0',
    'transform:scale(0.85) translateY(8px)',
  ].join(';'));

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;color:#fca5a5">
      <div style="width:15px;height:15px;flex-shrink:0">${ICONS.warning}</div>
      <span style="font-size:13px;color:#f8fafc">${message}</span>
    </div>
    <div style="display:flex;gap:7px">
      <button data-cancel style="flex:1;padding:6px 0;background:#1e293b;border:1px solid #334155;color:#94a3b8;border-radius:8px;cursor:pointer;font-weight:700;font-size:12px;transition:all 0.15s">${o.cancelLabel}</button>
      <button data-confirm style="flex:1;padding:6px 0;background:#ef4444;border:none;color:white;border-radius:8px;cursor:pointer;font-weight:700;font-size:12px;transition:all 0.15s">${o.confirmLabel}</button>
    </div>
    <div style="position:absolute;bottom:-5px;left:50%;transform:translateX(-50%) rotate(45deg);width:10px;height:10px;background:#0f172a"></div>
  `;

  document.body.appendChild(el);

  const { top, left, width } = anchor.getBoundingClientRect();
  const { height, width: ew } = el.getBoundingClientRect();
  el.style.top  = `${top  + window.scrollY - height - 13}px`;
  el.style.left = `${left + window.scrollX + width / 2 - ew / 2}px`;

  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.opacity   = '1';
    el.style.transform = 'scale(1) translateY(0)';
  }));

  const dismiss = () => {
    el.style.opacity   = '0';
    el.style.transform = 'scale(0.9) translateY(4px)';
    setTimeout(() => el.remove(), 280);
  };

  el.querySelector('[data-confirm]').onclick = () => { dismiss(); onConfirm?.(); };
  el.querySelector('[data-cancel]' ).onclick = () => { dismiss(); onCancel?.();  };
}

// ============================================================
// 9. MODAL CONFIRM (centered overlay, Promise-based)
// ============================================================

/**
 * Show a centered confirmation modal.
 * Returns a Promise that resolves to true (confirm) or false (cancel).
 *
 * @param {string} title
 * @param {string} message
 * @param {object} [options]
 * @param {string} [options.confirmLabel='Confirm']
 * @param {string} [options.cancelLabel='Cancel']
 * @param {'danger'|'primary'} [options.confirmVariant='danger']
 * @param {string} [options.icon]           - custom icon HTML; defaults to warning
 * @param {boolean} [options.sound=true]
 * @returns {Promise<boolean>}
 *
 * @example
 * const ok = await toast.modal('Delete?', 'This cannot be undone.');
 * if (ok) handleDelete();
 */
export function modalConfirm(title, message, options = {}) {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') return resolve(false);

    const o = {
      confirmLabel:   'Confirm',
      cancelLabel:    'Cancel',
      confirmVariant: 'danger',
      icon:           null,
      sound:          true,
      ...options,
    };

    if (o.sound) playSound('warning');

    const confirmBg   = o.confirmVariant === 'danger' ? '#ef4444' : '#3b82f6';
    const confirmHov  = o.confirmVariant === 'danger' ? '#dc2626' : '#2563eb';
    const iconHtml    = o.icon || ICONS.warning;
    const iconBg      = o.confirmVariant === 'danger' ? '#fee2e2' : '#dbeafe';
    const iconColor   = o.confirmVariant === 'danger' ? '#ef4444' : '#3b82f6';

    const overlay = document.createElement('div');
    overlay.setAttribute('style', [
      'position:fixed',
      'inset:0',
      'z-index:99999',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'padding:16px',
      'background:rgba(15,23,42,0.55)',
      'backdrop-filter:blur(5px)',
      'transition:opacity 0.25s ease',
      'opacity:0',
    ].join(';'));

    overlay.innerHTML = `
      <div data-modal-box style="width:100%;max-width:420px;background:white;border-radius:20px;box-shadow:0 25px 60px rgba(0,0,0,0.22);overflow:hidden;transition:all 0.32s cubic-bezier(0.34,1.56,0.64,1);transform:scale(0.9) translateY(18px)">
        <div style="padding:24px 24px 20px">
          <div style="width:48px;height:48px;border-radius:50%;background:${iconBg};display:flex;align-items:center;justify-content:center;margin-bottom:16px;color:${iconColor}">
            <div style="width:24px;height:24px">${iconHtml}</div>
          </div>
          <h3 style="font-size:17px;font-weight:700;color:#0f172a;margin:0 0 8px;line-height:1.3">${title}</h3>
          <p style="font-size:14px;color:#64748b;margin:0;line-height:1.65">${message}</p>
        </div>
        <div style="background:#f8fafc;padding:14px 24px 18px;display:flex;gap:10px;justify-content:flex-end;border-top:1px solid #f1f5f9">
          <button data-modal-cancel style="padding:9px 18px;font-size:13.5px;font-weight:500;color:#475569;background:transparent;border:none;border-radius:10px;cursor:pointer;transition:all 0.15s">${o.cancelLabel}</button>
          <button data-modal-confirm style="padding:9px 22px;font-size:13.5px;font-weight:600;color:white;background:${confirmBg};border:none;border-radius:10px;cursor:pointer;box-shadow:0 2px 8px ${confirmBg}55;transition:all 0.15s">${o.confirmLabel}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const box     = overlay.querySelector('[data-modal-box]');
    const confirm = overlay.querySelector('[data-modal-confirm]');
    const cancel  = overlay.querySelector('[data-modal-cancel]');

    confirm.addEventListener('mouseenter', () => { confirm.style.background = confirmHov; confirm.style.transform = 'translateY(-1px)'; });
    confirm.addEventListener('mouseleave', () => { confirm.style.background = confirmBg;  confirm.style.transform = ''; });
    cancel.addEventListener('mouseenter',  () => { cancel.style.background  = '#f1f5f9'; });
    cancel.addEventListener('mouseleave',  () => { cancel.style.background  = 'transparent'; });

    requestAnimationFrame(() => {
      overlay.style.opacity   = '1';
      box.style.transform     = 'scale(1) translateY(0)';
    });

    const close = (result) => {
      overlay.style.opacity = '0';
      box.style.transform   = 'scale(0.9) translateY(16px)';
      setTimeout(() => { overlay.remove(); resolve(result); }, 280);
    };

    cancel.onclick  = () => close(false);
    confirm.onclick = () => close(true);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(false); });

    // Keyboard support
    const onKey = (e) => {
      if (e.key === 'Escape') { close(false); document.removeEventListener('keydown', onKey); }
      if (e.key === 'Enter')  { close(true);  document.removeEventListener('keydown', onKey); }
    };
    document.addEventListener('keydown', onKey);
  });
}

// ============================================================
// 10. CONFIGURE
// ============================================================

/**
 * Set global defaults for all subsequent toasts.
 *
 * @param {object} options
 * @param {string}  [options.position]
 * @param {number}  [options.duration]
 * @param {boolean} [options.sound]
 * @param {boolean} [options.dismissOnClick]
 * @param {boolean} [options.showProgress]
 * @param {number}  [options.maxToasts]
 * @param {object}  [options.theme]  - partial; merged with existing theme
 *
 * @example
 * toast.configure({
 *   position:       'top-right',
 *   duration:       5000,
 *   sound:          false,
 *   showProgress:   true,
 *   theme: {
 *     success: { bg: '#0ea5e9', light: '#e0f2fe' },
 *   }
 * });
 */
export function configure(options = {}) {
  const { theme, ...rest } = options;
  Object.assign(DEFAULTS, rest);
  if (theme) {
    for (const [k, v] of Object.entries(theme)) {
      DEFAULTS.theme[k] = { ...DEFAULTS.theme[k], ...v };
    }
  }
}

// ============================================================
// 11. MAIN EXPORT OBJECT
// ============================================================

/** @type {typeof createToast & { success, error, warning, info, promise, anchored, anchoredConfirm, modal, dismiss, dismissAll, configure, ICONS }} */
export const toast = {
  // ── Notify toasts ──────────────────────────────────────────
  success:  (msg, opts) => createToast(msg, { type: 'success', ...opts }),
  error:    (msg, opts) => createToast(msg, { type: 'error',   ...opts }),
  warning:  (msg, opts) => createToast(msg, { type: 'warning', ...opts }),
  info:     (msg, opts) => createToast(msg, { type: 'info',    ...opts }),
  notify:   createToast,

  // ── Promise tracking ───────────────────────────────────────
  promise:  promiseToast,

  // ── Anchored ───────────────────────────────────────────────
  anchored:        anchoredToast,
  anchoredConfirm: anchoredConfirm,

  // ── Modal ──────────────────────────────────────────────────
  modal:    modalConfirm,

  // ── Dismiss ────────────────────────────────────────────────
  dismiss:    dismissToast,
  dismissAll: () => [...activeMap.keys()].forEach(dismissToast),

  // ── Config ─────────────────────────────────────────────────
  configure,
  ICONS,
};

export default toast;

// ============================================================
// 12. REACT HOOK
// ============================================================

/**
 * React hook — provides a toast API scoped to default options.
 *
 * @param {object} [defaultOptions] - merged into every call
 * @returns {{ success, error, warning, info, notify, promise, anchored, anchoredConfirm, modal, dismiss, dismissAll }}
 *
 * @example
 * const { success, modal, promise } = useToast({ position: 'top-right' });
 * success('Saved!');
 * const ok = await modal('Delete?', 'Are you sure?');
 */
export function useToast(defaultOptions = {}) {
  const merge = (opts) => ({ ...defaultOptions, ...opts });

  return {
    success:  (msg, opts) => toast.success (msg, merge(opts)),
    error:    (msg, opts) => toast.error   (msg, merge(opts)),
    warning:  (msg, opts) => toast.warning (msg, merge(opts)),
    info:     (msg, opts) => toast.info    (msg, merge(opts)),
    notify:   (msg, opts) => toast.notify  (msg, merge(opts)),
    promise:  (p, msgs, opts) => toast.promise(p, msgs, merge(opts)),
    anchored: (msg, anchor, opts) => toast.anchored(msg, anchor, merge(opts)),
    anchoredConfirm: (...args) => toast.anchoredConfirm(...args),
    modal:    toast.modal,
    dismiss:  toast.dismiss,
    dismissAll: toast.dismissAll,
  };
}