/**
 * anchored-toast.js — Tooltip-style toast anchored to a DOM element.
 *
 * Positions: 'top' | 'bottom' | 'left' | 'right'
 * Arrow and entry animation automatically adapt to the chosen side.
 */

import { DEFAULTS }  from './defaults.js';
import { ICONS }     from './icons.js';
import { playSound } from './audio.js';

// ── Shared geometry helpers (also used by anchored-confirm.js) ───────────────

/**
 * Position a floating element relative to an anchor rect.
 * Must be called after the element is in the DOM so its size is measurable.
 * @param {HTMLElement} el
 * @param {HTMLElement} anchor
 * @param {'top'|'bottom'|'left'|'right'} side
 * @param {number} gap  px distance between arrow tip and anchor edge
 */
export function placeElement(el, anchor, side, gap) {
  const ar = anchor.getBoundingClientRect();
  const er = el.getBoundingClientRect();
  const sx = window.scrollX, sy = window.scrollY;
  let top, left;

  switch (side) {
    case 'bottom':
      top  = ar.bottom + sy + gap;
      left = ar.left   + sx + ar.width  / 2 - er.width  / 2;
      break;
    case 'left':
      top  = ar.top    + sy + ar.height / 2 - er.height / 2;
      left = ar.left   + sx - er.width  - gap;
      break;
    case 'right':
      top  = ar.top    + sy + ar.height / 2 - er.height / 2;
      left = ar.right  + sx + gap;
      break;
    default: // 'top'
      top  = ar.top    + sy - er.height - gap;
      left = ar.left   + sx + ar.width  / 2 - er.width  / 2;
  }

  el.style.top  = `${top}px`;
  el.style.left = `${left}px`;
}

/**
 * Build inline style for the caret arrow (rotated square).
 * @param {'top'|'bottom'|'left'|'right'} side  which side the popup appears on
 * @param {number} size      diamond side length in px
 * @param {string} bg        background color (matches popup bg)
 * @param {string} borderColor
 * @param {string} borderWidth
 * @returns {string} inline style string
 */
export function arrowStyle(side, size, bg, borderColor, borderWidth) {
  const half   = size / 2;
  const border = borderWidth && borderWidth !== '0px'
    ? `border:${borderWidth} solid ${borderColor};`
    : '';
  const base   = `${border}position:absolute;width:${size}px;height:${size}px;background:${bg};transform:rotate(45deg);`;

  switch (side) {
    case 'bottom': return `${base}top:${-half}px;left:50%;margin-left:${-half}px`;
    case 'left':   return `${base}top:50%;right:${-half}px;margin-top:${-half}px`;
    case 'right':  return `${base}top:50%;left:${-half}px;margin-top:${-half}px`;
    default:       return `${base}bottom:${-half}px;left:50%;margin-left:${-half}px`;
  }
}

/** Entry transform (popup slides in from opposite side of anchor). */
export function entryTransform(side) {
  switch (side) {
    case 'bottom': return 'scale(0.88) translateY(-8px)';
    case 'left':   return 'scale(0.88) translateX(8px)';
    case 'right':  return 'scale(0.88) translateX(-8px)';
    default:       return 'scale(0.88) translateY(8px)';
  }
}

/** Exit transform. */
export function exitTransform(side) {
  switch (side) {
    case 'bottom': return 'scale(0.9) translateY(-4px)';
    case 'left':   return 'scale(0.9) translateX(4px)';
    case 'right':  return 'scale(0.9) translateX(-4px)';
    default:       return 'scale(0.9) translateY(4px)';
  }
}

// ── anchoredToast ────────────────────────────────────────────────────────────
/**
 * Show a tooltip-style toast anchored to a DOM element.
 *
 * @param {string}      message
 * @param {HTMLElement} anchor
 * @param {object}      [options]
 *
 * ─── Behaviour ───────────────────────────────────────────────────────────────
 * @param {'success'|'error'|'warning'|'info'} [options.type='success']
 * @param {number}  [options.duration=2500]   ms; 0 = manual dismiss only
 * @param {boolean} [options.sound]
 * @param {string}  [options.icon]            custom icon HTML
 *
 * ─── Position ────────────────────────────────────────────────────────────────
 * @param {'top'|'bottom'|'left'|'right'} [options.position='top']
 * @param {number}  [options.gap]             px gap between arrow tip and anchor
 * @param {boolean} [options.showArrow=true]
 * @param {number}  [options.arrowSize]       diamond side length in px
 *
 * ─── Style overrides (merged over DEFAULTS.anchored) ─────────────────────────
 * @param {string}  [options.bg]
 * @param {string}  [options.color]
 * @param {string}  [options.borderColor]
 * @param {string}  [options.borderWidth]
 * @param {string}  [options.borderRadius]
 * @param {string}  [options.shadow]
 * @param {string}  [options.padding]
 * @param {string}  [options.fontSize]
 * @param {string}  [options.fontWeight]
 *
 * @returns {function} dismiss
 */
export function anchoredToast(message, anchor, options = {}) {
  if (typeof document === 'undefined' || !anchor) return () => {};

  const o = { type: 'success', duration: 2500, sound: DEFAULTS.sound, icon: null, ...DEFAULTS.anchored, ...options };
  const theme = DEFAULTS.theme[o.type] || DEFAULTS.theme.success;
  const icon  = o.icon || ICONS[o.type];
  const side  = o.position;

  if (o.sound) playSound(o.type);

  const el = document.createElement('div');
  el.setAttribute('style', [
    'position:absolute',
    'z-index:9998',
    `padding:${o.padding}`,
    `background:${o.bg}`,
    `color:${o.color}`,
    `font-size:${o.fontSize}`,
    `font-weight:${o.fontWeight}`,
    `border-radius:${o.borderRadius}`,
    `border:${o.borderWidth} solid ${o.borderColor}`,
    `box-shadow:${o.shadow}`,
    'pointer-events:none',
    'white-space:nowrap',
    'transition:opacity 0.3s ease,transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
    'opacity:0',
    `transform:${entryTransform(side)}`,
  ].join(';'));

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:7px">
      <div style="width:15px;height:15px;display:flex;flex-shrink:0;color:${theme.bg}">${icon}</div>
      <span>${message}</span>
    </div>
    ${o.showArrow ? `<div style="${arrowStyle(side, o.arrowSize, o.bg, o.borderColor, o.borderWidth)}"></div>` : ''}
  `.trim();

  document.body.appendChild(el);
  placeElement(el, anchor, side, o.gap);

  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.opacity   = '1';
    el.style.transform = 'scale(1) translate(0,0)';
  }));

  const dismiss = () => {
    el.style.opacity   = '0';
    el.style.transform = exitTransform(side);
    setTimeout(() => el.remove(), 300);
  };

  if (o.duration > 0) setTimeout(dismiss, o.duration);
  return dismiss;
}