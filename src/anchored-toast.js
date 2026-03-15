/**
 * anchored-toast.js — Tooltip-style toast anchored above a DOM element.
 */

import { DEFAULTS }  from './defaults.js';
import { ICONS }     from './icons.js';
import { playSound } from './audio.js';

/**
 * Show a tooltip-style toast anchored above an element.
 *
 * @param {string}      message
 * @param {HTMLElement} anchor   element to position above
 * @param {object}      [options]
 *
 * ── Core ──────────────────────────────────────────────────
 * @param {'success'|'error'|'warning'|'info'} [options.type='success']
 * @param {number}  [options.duration=2500]  ms; 0 = no auto-dismiss
 * @param {boolean} [options.sound]          default false
 * @param {string}  [options.icon]           custom icon HTML
 *
 * ── Appearance ────────────────────────────────────────────
 * @param {string}  [options.bg]             background color
 * @param {string}  [options.textColor]      text color
 * @param {string}  [options.arrowColor]     arrow color (null → inherits bg)
 * @param {string}  [options.borderRadius]
 * @param {string}  [options.fontSize]
 * @param {string}  [options.fontWeight]
 * @param {string}  [options.padding]
 * @param {string}  [options.shadow]
 * @param {string}  [options.iconSize]       icon width/height
 * @param {string}  [options.iconColor]      icon stroke/fill color (null → theme.bg)
 * @param {string}  [options.arrowSize]      arrow square size
 * @param {number}  [options.offsetY=13]     vertical gap above anchor (px)
 *
 * @returns {function} dismiss
 *
 * @example
 * toast.anchored('Copied!', buttonEl, { type: 'success' });
 *
 * @example — dark custom style
 * toast.anchored('Saved', btnEl, {
 *   bg: '#7c3aed', arrowColor: '#7c3aed',
 *   iconColor: '#ede9fe', textColor: '#fff',
 * });
 */
export function anchoredToast(message, anchor, options = {}) {
  if (typeof document === 'undefined' || !anchor) return () => {};

  const ad = DEFAULTS.anchored;
  const o  = {
    type:         'success',
    duration:     2500,
    sound:        DEFAULTS.sound,
    icon:         null,
    bg:           ad.bg,
    textColor:    ad.textColor,
    arrowColor:   ad.arrowColor,
    borderRadius: ad.borderRadius,
    fontSize:     ad.fontSize,
    fontWeight:   ad.fontWeight,
    padding:      ad.padding,
    shadow:       ad.shadow,
    iconSize:     ad.iconSize,
    iconColor:    null,  // resolved below from theme
    arrowSize:    ad.arrowSize,
    offsetY:      13,
    ...options,
  };

  const theme      = DEFAULTS.theme[o.type] || DEFAULTS.theme.success;
  const icon       = o.icon ?? ICONS[o.type];
  const iconColor  = o.iconColor  ?? theme.bg;
  const arrowColor = o.arrowColor ?? o.bg;

  if (o.sound) playSound(o.type);

  const el = document.createElement('div');
  el.setAttribute('style', [
    'position:absolute',
    'z-index:9998',
    `padding:${o.padding}`,
    `background:${o.bg}`,
    `color:${o.textColor}`,
    `font-size:${o.fontSize}`,
    `font-weight:${o.fontWeight}`,
    `border-radius:${o.borderRadius}`,
    `box-shadow:${o.shadow}`,
    'pointer-events:none',
    'white-space:nowrap',
    'transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
    'opacity:0',
    'transform:scale(0.85) translateY(8px)',
  ].join(';'));

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:7px">
      <div style="width:${o.iconSize};height:${o.iconSize};display:flex;color:${iconColor}">
        ${icon}
      </div>
      <span>${message}</span>
    </div>
    <div style="
      position:absolute;bottom:-${parseInt(o.arrowSize) / 2}px;left:50%;
      transform:translateX(-50%) rotate(45deg);
      width:${o.arrowSize};height:${o.arrowSize};
      background:${arrowColor}
    "></div>
  `;

  document.body.appendChild(el);

  // Position above anchor
  const rect = anchor.getBoundingClientRect();
  const { height: elH, width: elW } = el.getBoundingClientRect();
  el.style.top  = `${rect.top  + window.scrollY - elH - o.offsetY}px`;
  el.style.left = `${rect.left + window.scrollX + rect.width / 2 - elW / 2}px`;

  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.opacity   = '1';
    el.style.transform = 'scale(1) translateY(0)';
  }));

  const dismiss = () => {
    el.style.opacity   = '0';
    el.style.transform = 'scale(0.9) translateY(4px)';
    setTimeout(() => el.remove(), 300);
  };

  let timer = null;
  if (o.duration > 0) timer = setTimeout(dismiss, o.duration);

  return dismiss;
}