/**
 * anchored-confirm.js — Inline yes/no confirmation popup anchored above a DOM element.
 */

import { DEFAULTS }  from './defaults.js';
import { ICONS }     from './icons.js';
import { playSound } from './audio.js';

/**
 * Show an inline confirmation popup anchored above an element.
 *
 * @param {string}      message
 * @param {HTMLElement} anchor
 * @param {function}    onConfirm
 * @param {function}    [onCancel]
 * @param {object}      [options]
 *
 * ── Labels ────────────────────────────────────────────────
 * @param {string}  [options.confirmLabel='Yes']
 * @param {string}  [options.cancelLabel='No']
 * @param {boolean} [options.sound]             default false
 * @param {string}  [options.icon]              custom icon HTML (default warning icon)
 *
 * ── Container ─────────────────────────────────────────────
 * @param {string}  [options.bg]                popup background
 * @param {string}  [options.textColor]         message text color
 * @param {string}  [options.iconColor]         icon color
 * @param {string}  [options.borderRadius]
 * @param {string}  [options.fontSize]
 * @param {string}  [options.padding]
 * @param {string}  [options.shadow]
 * @param {string}  [options.minWidth]
 * @param {string}  [options.arrowColor]        null → inherits bg
 * @param {string}  [options.arrowSize]
 * @param {number}  [options.offsetY=13]        vertical gap above anchor (px)
 *
 * ── Confirm button ────────────────────────────────────────
 * @param {string}  [options.confirmBg]
 * @param {string}  [options.confirmColor]
 * @param {string}  [options.confirmHoverBg]
 *
 * ── Cancel button ─────────────────────────────────────────
 * @param {string}  [options.cancelBg]
 * @param {string}  [options.cancelColor]
 * @param {string}  [options.cancelBorder]
 * @param {string}  [options.cancelHoverBg]
 *
 * ── Shared button style ───────────────────────────────────
 * @param {string}  [options.btnRadius]
 * @param {string}  [options.btnFontSize]
 * @param {string}  [options.btnFontWeight]
 * @param {string}  [options.btnPadding]
 *
 * @example
 * anchoredConfirm('Delete this?', btnEl, () => handleDelete(), null, {
 *   confirmLabel: 'Delete',
 *   confirmBg: '#dc2626',
 *   bg: '#1e1e2e',
 *   textColor: '#cdd6f4',
 * });
 */
export function anchoredConfirm(message, anchor, onConfirm, onCancel, options = {}) {
  if (typeof document === 'undefined' || !anchor) return;

  const ad = DEFAULTS.anchoredConfirm;
  const o  = {
    confirmLabel:   'Yes',
    cancelLabel:    'No',
    sound:          DEFAULTS.sound,
    icon:           null,
    bg:             ad.bg,
    textColor:      ad.textColor,
    iconColor:      ad.iconColor,
    borderRadius:   ad.borderRadius,
    fontSize:       ad.fontSize,
    padding:        ad.padding,
    shadow:         ad.shadow,
    minWidth:       ad.minWidth,
    arrowColor:     ad.arrowColor,
    arrowSize:      ad.arrowSize,
    offsetY:        13,
    confirmBg:      ad.confirmBg,
    confirmColor:   ad.confirmColor,
    confirmHoverBg: ad.confirmHoverBg,
    cancelBg:       ad.cancelBg,
    cancelColor:    ad.cancelColor,
    cancelBorder:   ad.cancelBorder,
    cancelHoverBg:  ad.cancelHoverBg,
    btnRadius:      ad.btnRadius,
    btnFontSize:    ad.btnFontSize,
    btnFontWeight:  ad.btnFontWeight,
    btnPadding:     ad.btnPadding,
    ...options,
  };

  const icon       = o.icon ?? ICONS.warning;
  const arrowColor = o.arrowColor ?? o.bg;

  if (o.sound) playSound('warning');

  const el = document.createElement('div');
  el.setAttribute('style', [
    'position:absolute',
    'z-index:9998',
    `padding:${o.padding}`,
    `background:${o.bg}`,
    `color:${o.textColor}`,
    `font-size:${o.fontSize}`,
    'font-weight:600',
    `border-radius:${o.borderRadius}`,
    `box-shadow:${o.shadow}`,
    'pointer-events:auto',
    `min-width:${o.minWidth}`,
    'transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
    'opacity:0',
    'transform:scale(0.85) translateY(8px)',
  ].join(';'));

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;color:${o.iconColor}">
      <div style="width:15px;height:15px;flex-shrink:0">${icon}</div>
      <span style="font-size:${o.fontSize};color:${o.textColor}">${message}</span>
    </div>

    <div style="display:flex;gap:7px">
      <button data-cancel style="
        flex:1;
        padding:${o.btnPadding};
        background:${o.cancelBg};
        border:1px solid ${o.cancelBorder};
        color:${o.cancelColor};
        border-radius:${o.btnRadius};
        cursor:pointer;
        font-weight:${o.btnFontWeight};
        font-size:${o.btnFontSize};
        transition:all 0.15s
      ">${o.cancelLabel}</button>

      <button data-confirm style="
        flex:1;
        padding:${o.btnPadding};
        background:${o.confirmBg};
        border:none;
        color:${o.confirmColor};
        border-radius:${o.btnRadius};
        cursor:pointer;
        font-weight:${o.btnFontWeight};
        font-size:${o.btnFontSize};
        transition:all 0.15s
      ">${o.confirmLabel}</button>
    </div>

    <div style="
      position:absolute;
      bottom:-${parseInt(o.arrowSize) / 2}px;
      left:50%;
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
    setTimeout(() => el.remove(), 280);
  };

  // Button hover effects
  const confirmBtn = el.querySelector('[data-confirm]');
  const cancelBtn  = el.querySelector('[data-cancel]');

  confirmBtn.addEventListener('mouseenter', () => { confirmBtn.style.background = o.confirmHoverBg; });
  confirmBtn.addEventListener('mouseleave', () => { confirmBtn.style.background = o.confirmBg; });
  cancelBtn.addEventListener('mouseenter',  () => { cancelBtn.style.background  = o.cancelHoverBg; });
  cancelBtn.addEventListener('mouseleave',  () => { cancelBtn.style.background  = o.cancelBg; });

  confirmBtn.onclick = () => { dismiss(); onConfirm?.(); };
  cancelBtn.onclick  = () => { dismiss(); onCancel?.(); };
}