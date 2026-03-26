/**
 * anchored-confirm.js — Inline yes/no confirmation popup anchored to a DOM element.
 *
 * Positions: 'top' | 'bottom' | 'left' | 'right'
 */

import { DEFAULTS }  from './defaults.js';
import { ICONS }     from './icons.js';
import { playSound } from './audio.js';
import { placeElement, arrowStyle, entryTransform, exitTransform } from './anchored-toast.js';

// Track last anchored confirm per anchor for auto-dismiss on re-trigger
const _confirmMap = new WeakMap();

/**
 * Show an inline confirmation popup anchored to an element.
 *
 * @param {string}      message
 * @param {HTMLElement} anchor
 * @param {function}    [onConfirm]
 * @param {function}    [onCancel]
 * @param {object}      [options]
 *
 * ─── Behaviour ───────────────────────────────────────────────────────────────
 * @param {string}  [options.confirmLabel='Yes']
 * @param {string}  [options.cancelLabel='No']
 * @param {boolean} [options.sound]
 *
 * ─── Position ────────────────────────────────────────────────────────────────
 * @param {'top'|'bottom'|'left'|'right'} [options.position='top']
 * @param {number}  [options.gap]
 * @param {boolean} [options.showArrow=true]
 * @param {number}  [options.arrowSize]
 *
 * ─── Style overrides (merged over DEFAULTS.anchoredConfirm) ──────────────────
 * @param {string}  [options.bg]              popup background
 * @param {string}  [options.color]           message text color
 * @param {string}  [options.borderColor]
 * @param {string}  [options.borderWidth]
 * @param {string}  [options.borderRadius]
 * @param {string}  [options.shadow]
 * @param {string}  [options.padding]
 * @param {string}  [options.fontSize]
 * @param {string}  [options.minWidth]
 * @param {string}  [options.confirmBg]
 * @param {string}  [options.confirmColor]
 * @param {string}  [options.confirmHoverBg]
 * @param {string}  [options.cancelBg]
 * @param {string}  [options.cancelColor]
 * @param {string}  [options.cancelHoverBg]
 * @param {string}  [options.cancelBorder]    cancel button border color
 * @param {string}  [options.btnRadius]
 * @param {string}  [options.btnFontSize]
 * @param {string}  [options.btnFontWeight]
 * @param {string}  [options.btnPadding]
 *
 * @example
 * anchoredConfirm(
 *   'Delete this item?',
 *   buttonEl,
 *   () => deleteItem(),
 *   null,
 *   { position: 'bottom', confirmBg: '#7c3aed', confirmHoverBg: '#6d28d9' }
 * );
 */
export function anchoredConfirm(message, anchor, onConfirm, onCancel, options = {}) {
  if (typeof document === 'undefined' || !anchor) return;

  const o = {
    confirmLabel: 'Yes',
    cancelLabel:  'No',
    sound:        DEFAULTS.sound,
    ...DEFAULTS.anchoredConfirm,
    ...options,
  };

  const side = o.position;
  if (o.sound) playSound('warning');

  // Auto-dismiss any previous anchored confirm on this anchor
  const prevDismiss = _confirmMap.get(anchor);
  if (prevDismiss) prevDismiss();

  const showIcon = o.showIcon !== undefined ? o.showIcon : true;

  const el = document.createElement('div');
  el.setAttribute('style', [
    'position:absolute',
    'z-index:9998',
    `padding:${o.padding}`,
    `background:${o.bg}`,
    `color:${o.color}`,
    `font-size:${o.fontSize}`,
    `border-radius:${o.borderRadius}`,
    `border:${o.borderWidth} solid ${o.borderColor}`,
    `box-shadow:${o.shadow}`,
    `min-width:${o.minWidth}`,
    'pointer-events:auto',
    'transition:opacity 0.3s ease,transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
    'opacity:0',
    `transform:${entryTransform(side)}`,
  ].join(';'));

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
      ${showIcon ? `<div style="width:15px;height:15px;flex-shrink:0;color:#fca5a5">${ICONS.warning}</div>` : ''}
      <span>${message}</span>
    </div>
    <div style="display:flex;gap:7px">
      <button data-cancel style="
        flex:1;padding:${o.btnPadding};
        background:${o.cancelBg};
        border:1px solid ${o.cancelBorder};
        color:${o.cancelColor};
        border-radius:${o.btnRadius};
        cursor:pointer;
        font-weight:${o.btnFontWeight};
        font-size:${o.btnFontSize};
        transition:background 0.15s,color 0.15s;
      ">${o.cancelLabel}</button>
      <button data-confirm style="
        flex:1;padding:${o.btnPadding};
        background:${o.confirmBg};
        border:none;
        color:${o.confirmColor};
        border-radius:${o.btnRadius};
        cursor:pointer;
        font-weight:${o.btnFontWeight};
        font-size:${o.btnFontSize};
        transition:background 0.15s;
      ">${o.confirmLabel}</button>
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
    _confirmMap.delete(anchor);
    el.style.opacity   = '0';
    el.style.transform = exitTransform(side);
    setTimeout(() => el.remove(), 280);
  };

  _confirmMap.set(anchor, dismiss);

  const confirmBtn = el.querySelector('[data-confirm]');
  const cancelBtn  = el.querySelector('[data-cancel]');

  confirmBtn.addEventListener('mouseenter', () => { confirmBtn.style.background = o.confirmHoverBg; });
  confirmBtn.addEventListener('mouseleave', () => { confirmBtn.style.background = o.confirmBg; });
  cancelBtn.addEventListener('mouseenter',  () => { cancelBtn.style.background  = o.cancelHoverBg; });
  cancelBtn.addEventListener('mouseleave',  () => { cancelBtn.style.background  = o.cancelBg; });

  confirmBtn.onclick = () => { dismiss(); onConfirm?.(); };
  cancelBtn.onclick  = () => { dismiss(); onCancel?.(); };
}