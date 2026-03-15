/**
 * modal-confirm.js — Centered overlay confirmation modal, Promise-based.
 */

import { DEFAULTS }  from './defaults.js';
import { ICONS }     from './icons.js';
import { playSound } from './audio.js';

/**
 * Show a centered confirmation modal.
 * Returns a Promise<boolean> — true = confirmed, false = cancelled.
 *
 * @param {string} title
 * @param {string} message
 * @param {object} [options]
 *
 * ── Labels & behaviour ────────────────────────────────────
 * @param {string}  [options.confirmLabel='Confirm']
 * @param {string}  [options.cancelLabel='Cancel']
 * @param {'danger'|'primary'} [options.confirmVariant='danger']
 *        Shorthand: 'danger' → red, 'primary' → blue.
 *        Overridden by explicit color options below.
 * @param {string}  [options.icon]       custom icon HTML; defaults to warning SVG
 * @param {boolean} [options.sound]      default false
 * @param {boolean} [options.closeOnOverlayClick=true]
 * @param {boolean} [options.closeOnEscape=true]
 * @param {boolean} [options.enterToConfirm=true]
 *
 * ── Overlay ───────────────────────────────────────────────
 * @param {string}  [options.overlayBg]       backdrop color/rgba
 * @param {string}  [options.overlayBlur]     backdrop-filter blur amount
 *
 * ── Modal box ─────────────────────────────────────────────
 * @param {string}  [options.bg]              modal background
 * @param {string}  [options.borderRadius]
 * @param {string}  [options.shadow]
 * @param {string}  [options.maxWidth]
 * @param {string}  [options.border]          e.g. '1px solid #e2e8f0'
 * @param {string}  [options.padding]         body padding
 *
 * ── Footer ────────────────────────────────────────────────
 * @param {string}  [options.footerBg]
 * @param {string}  [options.footerBorder]
 * @param {string}  [options.footerPadding]
 *
 * ── Typography ────────────────────────────────────────────
 * @param {string}  [options.titleColor]
 * @param {string}  [options.titleSize]
 * @param {string}  [options.titleWeight]
 * @param {string}  [options.messageColor]
 * @param {string}  [options.messageSize]
 *
 * ── Icon circle ───────────────────────────────────────────
 * @param {string}  [options.iconBg]          circle background
 * @param {string}  [options.iconColor]       icon stroke/fill color
 * @param {string}  [options.iconCircleSize]  e.g. '48px'
 * @param {string}  [options.iconSize]        inner icon size e.g. '24px'
 * @param {string}  [options.iconCircleRadius]
 *
 * ── Confirm button ────────────────────────────────────────
 * @param {string}  [options.confirmBg]
 * @param {string}  [options.confirmColor]
 * @param {string}  [options.confirmHoverBg]
 * @param {string}  [options.confirmRadius]
 * @param {string}  [options.confirmPadding]
 * @param {string}  [options.confirmFontSize]
 * @param {string}  [options.confirmWeight]
 * @param {string}  [options.confirmShadow]   null → auto from confirmBg
 *
 * ── Cancel button ─────────────────────────────────────────
 * @param {string}  [options.cancelColor]
 * @param {string}  [options.cancelHoverBg]
 * @param {string}  [options.cancelRadius]
 * @param {string}  [options.cancelPadding]
 * @param {string}  [options.cancelFontSize]
 * @param {string}  [options.cancelWeight]
 * @param {string}  [options.cancelBg]        default transparent
 * @param {string}  [options.cancelBorder]    default none
 *
 * @returns {Promise<boolean>}
 *
 * @example
 * const ok = await toast.modal('Delete file?', 'This cannot be undone.');
 * if (ok) deleteFile();
 *
 * @example — fully custom dark modal
 * const ok = await toast.modal('Confirm?', 'Are you sure?', {
 *   bg: '#1e1e2e', footerBg: '#181825',
 *   titleColor: '#cdd6f4', messageColor: '#a6adc8',
 *   confirmBg: '#89b4fa', confirmColor: '#1e1e2e',
 *   overlayBg: 'rgba(0,0,0,0.7)',
 *   borderRadius: '16px',
 * });
 */
export function modalConfirm(title, message, options = {}) {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') return resolve(false);

    const md = DEFAULTS.modal;

    // Resolve variant colours first, then let explicit options override
    const isVariantDanger  = (options.confirmVariant ?? 'danger') === 'danger';
    const variantConfirmBg  = isVariantDanger ? '#ef4444' : '#3b82f6';
    const variantHoverBg    = isVariantDanger ? '#dc2626' : '#2563eb';
    const variantIconBg     = isVariantDanger ? '#fee2e2' : '#dbeafe';
    const variantIconColor  = isVariantDanger ? '#ef4444' : '#3b82f6';

    const o = {
      confirmLabel:        'Confirm',
      cancelLabel:         'Cancel',
      confirmVariant:      'danger',
      icon:                null,
      sound:               DEFAULTS.sound,
      closeOnOverlayClick: true,
      closeOnEscape:       true,
      enterToConfirm:      true,

      // overlay
      overlayBg:    md.overlayBg,
      overlayBlur:  md.overlayBlur,

      // modal box
      bg:           md.bg,
      borderRadius: md.borderRadius,
      shadow:       md.shadow,
      maxWidth:     md.maxWidth,
      border:       'none',
      padding:      md.padding,

      // footer
      footerBg:      md.footerBg,
      footerBorder:  md.footerBorder,
      footerPadding: md.footerPadding,

      // typography
      titleColor:    md.titleColor,
      titleSize:     md.titleSize,
      titleWeight:   md.titleWeight,
      messageColor:  md.messageColor,
      messageSize:   md.messageSize,

      // icon circle
      iconBg:           variantIconBg,
      iconColor:        variantIconColor,
      iconCircleSize:   md.iconCircleSize,
      iconSize:         md.iconSize,
      iconCircleRadius: '50%',

      // confirm button
      confirmBg:       variantConfirmBg,
      confirmColor:    md.confirmColor,
      confirmHoverBg:  variantHoverBg,
      confirmRadius:   md.confirmRadius,
      confirmPadding:  md.confirmPadding,
      confirmFontSize: md.confirmFontSize,
      confirmWeight:   md.confirmWeight,
      confirmShadow:   null, // auto

      // cancel button
      cancelColor:    md.cancelColor,
      cancelHoverBg:  md.cancelHoverBg,
      cancelRadius:   md.cancelRadius,
      cancelPadding:  md.cancelPadding,
      cancelFontSize: md.cancelFontSize,
      cancelWeight:   md.cancelWeight,
      cancelBg:       'transparent',
      cancelBorder:   'none',

      ...options,
    };

    const iconHtml      = o.icon ?? ICONS.warning;
    const confirmShadow = o.confirmShadow ?? `0 2px 8px ${o.confirmBg}55`;

    if (o.sound) playSound('warning');

    // ── Build overlay ──────────────────────────────────────
    const overlay = document.createElement('div');
    overlay.setAttribute('style', [
      'position:fixed',
      'inset:0',
      'z-index:99999',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'padding:16px',
      `background:${o.overlayBg}`,
      `backdrop-filter:blur(${o.overlayBlur})`,
      '-webkit-backdrop-filter:blur(' + o.overlayBlur + ')',
      'transition:opacity 0.25s ease',
      'opacity:0',
    ].join(';'));

    overlay.innerHTML = `
      <div data-modal-box style="
        width:100%;
        max-width:${o.maxWidth};
        background:${o.bg};
        border-radius:${o.borderRadius};
        border:${o.border};
        box-shadow:${o.shadow};
        overflow:hidden;
        transition:all 0.32s cubic-bezier(0.34,1.56,0.64,1);
        transform:scale(0.9) translateY(18px)
      ">
        <!-- Body -->
        <div style="padding:${o.padding}">
          <div style="
            width:${o.iconCircleSize};
            height:${o.iconCircleSize};
            border-radius:${o.iconCircleRadius};
            background:${o.iconBg};
            display:flex;align-items:center;justify-content:center;
            margin-bottom:16px;
            color:${o.iconColor}
          ">
            <div style="width:${o.iconSize};height:${o.iconSize}">${iconHtml}</div>
          </div>

          <h3 style="
            font-size:${o.titleSize};
            font-weight:${o.titleWeight};
            color:${o.titleColor};
            margin:0 0 8px;line-height:1.3
          ">${title}</h3>

          <p style="
            font-size:${o.messageSize};
            color:${o.messageColor};
            margin:0;line-height:1.65
          ">${message}</p>
        </div>

        <!-- Footer -->
        <div style="
          background:${o.footerBg};
          padding:${o.footerPadding};
          display:flex;gap:10px;justify-content:flex-end;
          border-top:1px solid ${o.footerBorder}
        ">
          <button data-modal-cancel style="
            padding:${o.cancelPadding};
            font-size:${o.cancelFontSize};
            font-weight:${o.cancelWeight};
            color:${o.cancelColor};
            background:${o.cancelBg};
            border:${o.cancelBorder};
            border-radius:${o.cancelRadius};
            cursor:pointer;
            transition:all 0.15s
          ">${o.cancelLabel}</button>

          <button data-modal-confirm style="
            padding:${o.confirmPadding};
            font-size:${o.confirmFontSize};
            font-weight:${o.confirmWeight};
            color:${o.confirmColor};
            background:${o.confirmBg};
            border:none;
            border-radius:${o.confirmRadius};
            cursor:pointer;
            box-shadow:${confirmShadow};
            transition:all 0.15s
          ">${o.confirmLabel}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const box        = overlay.querySelector('[data-modal-box]');
    const confirmBtn = overlay.querySelector('[data-modal-confirm]');
    const cancelBtn  = overlay.querySelector('[data-modal-cancel]');

    // Hover effects
    confirmBtn.addEventListener('mouseenter', () => {
      confirmBtn.style.background = o.confirmHoverBg;
      confirmBtn.style.transform  = 'translateY(-1px)';
    });
    confirmBtn.addEventListener('mouseleave', () => {
      confirmBtn.style.background = o.confirmBg;
      confirmBtn.style.transform  = '';
    });
    cancelBtn.addEventListener('mouseenter', () => {
      cancelBtn.style.background = o.cancelHoverBg;
    });
    cancelBtn.addEventListener('mouseleave', () => {
      cancelBtn.style.background = o.cancelBg;
    });

    // Animate in
    requestAnimationFrame(() => {
      overlay.style.opacity  = '1';
      box.style.transform    = 'scale(1) translateY(0)';
    });

    const close = (result) => {
      overlay.style.opacity  = '0';
      box.style.transform    = 'scale(0.9) translateY(16px)';
      setTimeout(() => { overlay.remove(); resolve(result); }, 280);
    };

    confirmBtn.onclick = () => close(true);
    cancelBtn.onclick  = () => close(false);

    if (o.closeOnOverlayClick) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close(false);
      });
    }

    if (o.closeOnEscape || o.enterToConfirm) {
      const onKey = (e) => {
        if (o.closeOnEscape  && e.key === 'Escape') { close(false); cleanup(); }
        if (o.enterToConfirm && e.key === 'Enter')  { close(true);  cleanup(); }
      };
      const cleanup = () => document.removeEventListener('keydown', onKey);
      document.addEventListener('keydown', onKey);
    }
  });
}