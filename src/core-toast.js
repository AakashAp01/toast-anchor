/**
 * core-toast.js — Container manager, createToast, dismissToast, dismissAll.
 */

import { DEFAULTS }  from './defaults.js';
import { ICONS }     from './icons.js';
import { playSound } from './audio.js';

// ── Position → CSS ──────────────────────────────────────────────────────────
const POSITION_CSS = {
  'top-left':      'top:1.5rem;left:1.5rem;flex-direction:column',
  'top-center':    'top:1.5rem;left:50%;transform:translateX(-50%);flex-direction:column',
  'top-right':     'top:1.5rem;right:1.5rem;flex-direction:column',
  'middle-left':   'top:50%;left:1.5rem;transform:translateY(-50%);flex-direction:column',
  'middle-center': 'top:50%;left:50%;transform:translate(-50%,-50%);flex-direction:column',
  'middle-right':  'top:50%;right:1.5rem;transform:translateY(-50%);flex-direction:column',
  'bottom-left':   'bottom:1.5rem;left:1.5rem;flex-direction:column-reverse',
  'bottom-center': 'bottom:1.5rem;left:50%;transform:translateX(-50%);flex-direction:column-reverse',
  'bottom-right':  'bottom:1.5rem;right:1.5rem;flex-direction:column-reverse',
};

// ── Internal state ───────────────────────────────────────────────────────────
const _containers = new Map();   // position → DOM element
export const _active = new Map(); // id       → { el, timer }  (exported for promise-toast)
let _seq = 0;

// ── Container factory (cached per position) ─────────────────────────────────
function _getContainer(pos) {
  if (typeof document === 'undefined') return null;
  if (_containers.has(pos)) return _containers.get(pos);
  const el = document.createElement('div');
  el.id = `__tk_c_${pos.replace(/-/g, '_')}`;
  el.setAttribute('style',
    `position:fixed;z-index:9999;display:flex;gap:10px;pointer-events:none;` +
    (POSITION_CSS[pos] || POSITION_CSS['bottom-right'])
  );
  document.body.appendChild(el);
  _containers.set(pos, el);
  return el;
}

// ── dismissToast ─────────────────────────────────────────────────────────────
/**
 * Dismiss a toast by its ID.
 * @param {string} id
 */
export function dismissToast(id) {
  const entry = _active.get(id);
  if (!entry) return;
  clearTimeout(entry.timer);
  const el = entry.el;
  el.style.opacity   = '0';
  el.style.transform = 'scale(0.9) translateY(6px)';
  el.style.maxHeight = el.offsetHeight + 'px';
  setTimeout(() => {
    el.style.transition = 'all 0.32s ease-out';
    el.style.maxHeight  = '0';
    el.style.padding    = '0';
    el.style.margin     = '0';
    el.style.overflow   = 'hidden';
  }, 60);
  setTimeout(() => { el.remove(); _active.delete(id); }, 420);
}

/** Dismiss every active toast. */
export function dismissAll() {
  [..._active.keys()].forEach(dismissToast);
}

/** Internal: get next unique ID */
export function nextId() { return `__tk_${++_seq}`; }

// ── createToast ──────────────────────────────────────────────────────────────
/**
 * Show a slide-in notification toast.
 *
 * @param {string}  message
 * @param {object}  [options]
 *
 * ─── Behaviour ───────────────────────────────────────────────────────────────
 * @param {'success'|'error'|'warning'|'info'} [options.type='success']
 * @param {string}  [options.position]       top/middle/bottom + left/center/right
 * @param {number}  [options.duration]       ms; 0 = no auto-dismiss
 * @param {boolean} [options.sound]          default: false
 * @param {boolean} [options.dismissOnClick]
 * @param {boolean} [options.showProgress]
 * @param {string}  [options.id]             custom ID for programmatic dismiss
 * @param {string}  [options.description]    secondary text
 * @param {string}  [options.icon]           custom HTML icon string
 * @param {{ label:string, onClick:function }} [options.action]
 *
 * ─── Style overrides ─────────────────────────────────────────────────────────
 * @param {string}  [options.bg]
 * @param {string}  [options.color]
 * @param {string}  [options.descColor]
 * @param {string}  [options.borderColor]
 * @param {string}  [options.borderWidth]
 * @param {string}  [options.borderRadius]
 * @param {string}  [options.shadow]
 * @param {string}  [options.padding]
 * @param {string}  [options.width]
 * @param {string}  [options.fontSize]
 * @param {string}  [options.fontWeight]
 * @param {string}  [options.descFontSize]
 * @param {string}  [options.descFontWeight]
 * @param {string}  [options.closeColor]
 * @param {string}  [options.closeHoverColor]
 * @param {string}  [options.progressH]
 * @param {string}  [options.progressRadius]
 * @param {string}  [options.progressColor]   defaults to theme.bg
 * @param {string}  [options.iconBg]          icon circle background
 * @param {string}  [options.iconColor]       icon stroke/fill
 * @param {string}  [options.iconSize]        circle diameter e.g. '32px'
 * @param {string}  [options.iconRadius]
 * @param {string}  [options.actionColor]     action button color
 * @param {string}  [options.actionFontSize]
 *
 * @returns {function} dismiss — call to manually dismiss this toast
 */
export function createToast(message, options = {}) {
  if (typeof document === 'undefined') return () => {};

  const D  = DEFAULTS;
  const TS = D.toast;

  const o = {
    type:           'success',
    position:       D.position,
    duration:       D.duration,
    sound:          D.sound,
    dismissOnClick: D.dismissOnClick,
    showProgress:   D.showProgress,
    description:    null,
    icon:           null,
    action:         null,
    id:             null,
    showIcon:       undefined,
    showClose:      undefined,
    ...options,
  };

  const type  = o.type;
  const theme = D.theme[type] || D.theme.success;
  const r     = (k) => o[k] !== undefined ? o[k] : TS[k];

  const bg             = r('bg');
  const color          = r('color');
  const descColor      = r('descColor');
  const borderColor    = r('borderColor');
  const borderWidth    = r('borderWidth');
  const borderRadius   = r('borderRadius');
  const shadow         = r('shadow');
  const padding        = r('padding');
  const width          = r('width');
  const fontSize       = r('fontSize');
  const fontWeight     = r('fontWeight');
  const descFontSize   = r('descFontSize');
  const descFontWeight = r('descFontWeight');
  const closeColor     = r('closeColor');
  const closeHoverC    = r('closeHoverColor');
  const progressH      = r('progressH');
  const progressRadius = r('progressRadius');
  const progressColor  = o.progressColor  || theme.bg;
  const iconBg         = o.iconBg         || theme.light;
  const iconColor      = o.iconColor      || theme.bg;
  const iconSize       = r('iconSize');
  const iconRadius     = r('iconRadius');
  const actionColor    = o.actionColor    || theme.bg;
  const actionFontSize = r('actionFontSize');

  const icon = o.icon || ICONS[type] || ICONS.success;
  const id   = o.id   || nextId();
  const showIcon  = o.showIcon  !== undefined ? o.showIcon  : TS.showIcon !== undefined ? TS.showIcon : true;
  const showClose = o.showClose !== undefined ? o.showClose : TS.showClose !== undefined ? TS.showClose : true;

  // Center icon+title vertically when there is no extra content below
  const hasExtra = !!(o.description || o.action);
  const rowAlign = hasExtra ? 'align-items:flex-start' : 'align-items:center';
  const bodyPad  = hasExtra ? 'padding-top:2px'        : '';

  if (o.sound) playSound(type);

  const container = _getContainer(o.position);
  if (!container) return () => {};

  if (_active.size >= D.maxToasts) dismissToast(_active.keys().next().value);

  // ── DOM ──────────────────────────────────────────────────────────────────
  const el = document.createElement('div');
  el.id = id;
  el.setAttribute('style', [
    'pointer-events:auto',
    'position:relative',
    'overflow:hidden',
    'display:flex',
    rowAlign,
    'gap:12px',
    `width:${width}`,
    `background:${bg}`,
    `border:${borderWidth} solid ${borderColor}`,
    `padding:${padding}`,
    `border-radius:${borderRadius}`,
    `box-shadow:${shadow}`,
    'transition:all 0.38s cubic-bezier(0.34,1.56,0.64,1)',
    'opacity:0',
    'transform:scale(0.9) translateY(10px)',
    `cursor:${o.dismissOnClick ? 'pointer' : 'default'}`,
    'box-sizing:border-box',
  ].join(';'));

  el.innerHTML = `
    ${showIcon ? `<div style="display:flex;align-items:center;justify-content:center;width:${iconSize};height:${iconSize};min-width:${iconSize};border-radius:${iconRadius};background:${iconBg};color:${iconColor};flex-shrink:0">
      <div style="width:16px;height:16px;display:flex">${icon}</div>
    </div>` : ''}
    <div style="flex:1;min-width:0;${bodyPad}">
      <p style="font-size:${fontSize};font-weight:${fontWeight};color:${color};line-height:1.4;margin:0">${message}</p>
      ${o.description ? `<p style="font-size:${descFontSize};font-weight:${descFontWeight};color:${descColor};margin:3px 0 0;line-height:1.5">${o.description}</p>` : ''}
      ${o.action      ? `<button data-tk-action style="margin-top:7px;font-size:${actionFontSize};font-weight:700;color:${actionColor};background:none;border:none;cursor:pointer;padding:0;display:block;line-height:1">${o.action.label}</button>` : ''}
    </div>
    ${showClose ? `<button data-tk-close
      style="flex-shrink:0;background:none;border:none;cursor:pointer;color:${closeColor};padding:2px;line-height:0;border-radius:4px;transition:color 0.15s"
      title="Dismiss"
      onmouseenter="this.style.color='${closeHoverC}'"
      onmouseleave="this.style.color='${closeColor}'"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>` : ''}
    ${o.showProgress && o.duration > 0
      ? `<div data-tk-bar style="position:absolute;bottom:0;left:0;height:${progressH};border-radius:${progressRadius};background:${progressColor};width:100%;transition:width ${o.duration}ms linear"></div>`
      : ''}
  `.trim();

  container.appendChild(el);

  // Animate in
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.opacity   = '1';
    el.style.transform = 'scale(1) translateY(0)';
    if (o.showProgress && o.duration > 0) {
      const bar = el.querySelector('[data-tk-bar]');
      if (bar) bar.style.width = '0%';
    }
  }));

  // Timer
  const dismiss = () => dismissToast(id);
  let timer = null;
  if (o.duration > 0) timer = setTimeout(dismiss, o.duration);

  el.addEventListener('mouseenter', () => clearTimeout(timer));
  el.addEventListener('mouseleave', () => {
    if (o.duration > 0) timer = setTimeout(dismiss, Math.min(o.duration, 1500));
  });

  el.querySelector('[data-tk-close]')?.addEventListener('click', (e) => { e.stopPropagation(); dismiss(); });
  if (o.dismissOnClick) el.addEventListener('click', dismiss);
  el.querySelector('[data-tk-action]')?.addEventListener('click', (e) => {
    e.stopPropagation(); o.action?.onClick?.(); dismiss();
  });

  _active.set(id, { el, timer });
  return dismiss;
}