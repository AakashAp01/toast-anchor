/**
 * anchored-confirm.js — Inline yes/no confirmation popup anchored to a DOM element.
 *
 * Positions: 'top' | 'bottom' | 'left' | 'right'
 * Features Smart Positioning: Flips side if there isn't enough screen space.
 */

import { DEFAULTS }  from './defaults.js';
import { ICONS }     from './icons.js';
import { playSound } from './audio.js';
// We must import the new getOptimalSide function here!
import { placeElement, getOptimalSide, arrowStyle, entryTransform, exitTransform } from './anchored-toast.js';

// Track last anchored confirm per anchor for auto-dismiss on re-trigger
const _confirmMap = new WeakMap();

export function anchoredConfirm(message, anchor, onConfirm, onCancel, options = {}) {
  if (typeof document === 'undefined' || !anchor) return;

  const o = {
    confirmLabel: 'Yes',
    cancelLabel:  'No',
    sound:        DEFAULTS.sound,
    ...DEFAULTS.anchoredConfirm,
    ...options,
  };

  const requestedSide = o.position || 'top';
  const gap = o.gap !== undefined ? o.gap : 8; // default distance

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
    'opacity:0', // Keep hidden without transforms so we can measure it accurately
  ].join(';'));

  // Notice we removed the arrow from the initial HTML injection
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
  `.trim();

  document.body.appendChild(el);

  // --- COLLISION DETECTION ---
  // Determine actual side based on available screen space
  const actualSide = getOptimalSide(el, anchor, requestedSide, gap);

  // --- FINAL DOM UPDATES ---
  // Now add the arrow pointing to the newly determined side
  if (o.showArrow !== false) {
    el.insertAdjacentHTML('beforeend', `<div style="${arrowStyle(actualSide, o.arrowSize || 8, o.bg, o.borderColor, o.borderWidth)}"></div>`);
  }

  // Apply entrance transform based on the actual side
  el.style.transform = entryTransform(actualSide);

  // Position it correctly
  placeElement(el, anchor, actualSide, gap);

  // Trigger Entrance Animation
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.opacity   = '1';
    el.style.transform = 'scale(1) translate(0,0)';
  }));

  const dismiss = () => {
    _confirmMap.delete(anchor);
    el.style.opacity   = '0';
    el.style.transform = exitTransform(actualSide); // Exit towards the correct side
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
