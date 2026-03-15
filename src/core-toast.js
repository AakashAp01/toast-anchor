/**
 * core-toast.js — Slide-in notification toast with full style customization.
 */

import { DEFAULTS }      from './defaults.js';
import { ICONS }         from './icons.js';
import { getContainer }  from './container.js';
import { playSound }     from './audio.js';

let toastSeq = 0;
export const activeMap = new Map(); // id → { el, timer }

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

/** Dismiss every active toast. */
export function dismissAll() {
  [...activeMap.keys()].forEach(dismissToast);
}

/**
 * Create a slide-in notification toast.
 *
 * @param {string}  message
 * @param {object}  [options]
 *
 * ── Core ──────────────────────────────────────────────────
 * @param {'success'|'error'|'warning'|'info'} [options.type='success']
 * @param {string}  [options.position]        overrides configure() default
 * @param {number}  [options.duration]        ms; 0 = no auto-close
 * @param {boolean} [options.sound]           default false
 * @param {boolean} [options.dismissOnClick]
 * @param {boolean} [options.showProgress]
 * @param {string}  [options.description]     secondary text
 * @param {string}  [options.icon]            custom HTML icon string
 * @param {string}  [options.id]              custom ID for programmatic dismiss
 * @param {{label:string, onClick:function}} [options.action]  action button
 *
 * ── Toast box ─────────────────────────────────────────────
 * @param {string}  [options.bg]              toast background (default white)
 * @param {string}  [options.borderColor]
 * @param {string}  [options.borderRadius]
 * @param {string}  [options.shadow]
 * @param {string}  [options.width]
 * @param {string}  [options.padding]
 *
 * ── Text ──────────────────────────────────────────────────
 * @param {string}  [options.titleColor]
 * @param {string}  [options.descColor]
 * @param {string}  [options.titleSize]
 * @param {string}  [options.descSize]
 * @param {string}  [options.titleWeight]
 *
 * ── Icon circle ───────────────────────────────────────────
 * @param {string}  [options.iconBg]         overrides theme.light
 * @param {string}  [options.iconColor]      overrides theme.bg
 * @param {string}  [options.iconSize]       icon circle size
 * @param {string}  [options.iconRadius]
 *
 * ── Progress bar ──────────────────────────────────────────
 * @param {string}  [options.progressColor]  overrides theme.bg
 * @param {string}  [options.progressHeight] default '3px'
 *
 * ── Action button ─────────────────────────────────────────
 * @param {string}  [options.actionColor]    overrides theme.bg
 *
 * @returns {function} dismiss — call to manually dismiss this toast
 */
export function createToast(message, options = {}) {
  if (typeof document === 'undefined') return () => {};

  const td = DEFAULTS.toast;
  const o  = {
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

    // toast box
    bg:           td.bg,
    borderColor:  td.borderColor,
    borderRadius: td.borderRadius,
    shadow:       td.shadow,
    width:        td.width,
    padding:      td.padding,

    // text
    titleColor:   td.titleColor,
    descColor:    td.descColor,
    titleSize:    td.titleSize,
    descSize:     td.descSize,
    titleWeight:  td.titleWeight,

    // icon
    iconBg:       null, // resolved below from theme
    iconColor:    null,
    iconSize:     td.iconSize,
    iconRadius:   td.iconRadius,

    // progress
    progressColor:  null, // resolved below from theme
    progressHeight: '3px',

    // action
    actionColor: null, // resolved below from theme

    ...options,
  };

  const type  = o.type;
  const theme = { ...(DEFAULTS.theme[type] || DEFAULTS.theme.success) };
  const icon  = o.icon ?? ICONS[type] ?? ICONS.success;
  const id    = o.id   ?? `__toast_${++toastSeq}`;

  // Resolve theme-dependent defaults
  const iconBg       = o.iconBg       ?? theme.light;
  const iconColor    = o.iconColor    ?? theme.bg;
  const progressColor = o.progressColor ?? theme.bg;
  const actionColor  = o.actionColor  ?? theme.bg;

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
    `width:${o.width}`,
    `background:${o.bg}`,
    `border:1px solid ${o.borderColor}`,
    `padding:${o.padding}`,
    `border-radius:${o.borderRadius}`,
    `box-shadow:${o.shadow}`,
    'transition:all 0.38s cubic-bezier(0.34,1.56,0.64,1)',
    'opacity:0',
    'transform:scale(0.9) translateY(10px)',
    `cursor:${o.dismissOnClick ? 'pointer' : 'default'}`,
  ].join(';'));

  el.innerHTML = `
    <div style="
      display:flex;align-items:center;justify-content:center;
      width:${o.iconSize};height:${o.iconSize};
      border-radius:${o.iconRadius};
      flex-shrink:0;
      background:${iconBg};
      color:${iconColor}
    ">
      <div style="width:16px;height:16px;display:flex">${icon}</div>
    </div>

    <div style="flex:1;min-width:0;padding-top:2px">
      <p style="
        font-size:${o.titleSize};
        font-weight:${o.titleWeight};
        color:${o.titleColor};
        line-height:1.4;margin:0
      ">${message}</p>

      ${o.description ? `
        <p style="
          font-size:${o.descSize};
          color:${o.descColor};
          margin:3px 0 0;line-height:1.5
        ">${o.description}</p>
      ` : ''}

      ${o.action ? `
        <button data-toast-action style="
          margin-top:7px;
          font-size:12px;font-weight:700;
          color:${actionColor};
          background:none;border:none;cursor:pointer;padding:0;display:block
        ">${o.action.label}</button>
      ` : ''}
    </div>

    <button data-toast-close style="
      flex-shrink:0;background:none;border:none;cursor:pointer;
      color:#cbd5e1;padding:1px;margin-top:1px;line-height:0;
      transition:color 0.15s
    " title="Dismiss">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    ${o.showProgress && o.duration > 0 ? `
      <div data-toast-bar style="
        position:absolute;bottom:0;left:0;
        height:${o.progressHeight};
        border-radius:0 0 ${o.borderRadius} ${o.borderRadius};
        background:${progressColor};
        width:100%;
        transition:width ${o.duration}ms linear
      "></div>
    ` : ''}
  `;

  container.appendChild(el);

  const dismiss = () => dismissToast(id);
  let timer = null;

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

  // Pause on hover
  el.addEventListener('mouseenter', () => { if (timer) clearTimeout(timer); });
  el.addEventListener('mouseleave', () => {
    if (o.duration > 0) timer = setTimeout(dismiss, Math.min(o.duration, 1500));
  });

  el.querySelector('[data-toast-close]')?.addEventListener('click', (e) => {
    e.stopPropagation(); dismiss();
  });

  if (o.dismissOnClick) el.addEventListener('click', dismiss);

  el.querySelector('[data-toast-action]')?.addEventListener('click', (e) => {
    e.stopPropagation();
    o.action?.onClick?.();
    dismiss();
  });

  activeMap.set(id, { el, timer });
  return dismiss;
}