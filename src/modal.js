/**
 * modal.js — Promise-based centered confirmation modal.
 *
 * Returns Promise<boolean>: true = confirmed, false = cancelled / dismissed.
 */

import { DEFAULTS }  from './defaults.js';
import { ICONS }     from './icons.js';
import { playSound } from './audio.js';

/**
 * Show a centered overlay confirmation modal.
 *
 * @param {string}  title
 * @param {string}  message
 * @param {object}  [options]
 *
 * ─── Behaviour ────────────────────────────────────────────────────────────
 * @param {string}  [options.confirmLabel='Confirm']
 * @param {string}  [options.cancelLabel='Cancel']
 * @param {'danger'|'primary'} [options.confirmVariant='danger']
 * @param {string}  [options.icon]
 * @param {boolean} [options.sound]
 *
 * ─── Overlay ──────────────────────────────────────────────────────────────
 * @param {string}  [options.overlayBg]
 * @param {string}  [options.overlayBlur]
 *
 * ─── Card ─────────────────────────────────────────────────────────────────
 * @param {string}  [options.bg]
 * @param {string}  [options.borderColor]
 * @param {string}  [options.borderWidth]
 * @param {string}  [options.borderRadius]
 * @param {string}  [options.shadow]
 * @param {string}  [options.maxWidth]
 * @param {string}  [options.padding]
 *
 * ─── Icon ─────────────────────────────────────────────────────────────────
 * @param {string}  [options.iconSize]
 * @param {string}  [options.iconRadius]
 * @param {string}  [options.iconBg]
 * @param {string}  [options.iconColor]
 *
 * ─── Text ─────────────────────────────────────────────────────────────────
 * @param {string}  [options.titleColor]
 * @param {string}  [options.titleSize]
 * @param {string}  [options.titleWeight]
 * @param {string}  [options.titleMargin]
 * @param {string}  [options.messageColor]
 * @param {string}  [options.messageSize]
 *
 * ─── Footer ───────────────────────────────────────────────────────────────
 * @param {string}  [options.footerBg]
 * @param {string}  [options.footerBorder]
 * @param {string}  [options.footerPaddingV]
 * @param {string}  [options.footerPaddingVB]
 *
 * ─── Confirm button ───────────────────────────────────────────────────────
 * @param {string}  [options.confirmBg]
 * @param {string}  [options.confirmColor]
 * @param {string}  [options.confirmHoverBg]
 * @param {string}  [options.confirmRadius]
 * @param {string}  [options.confirmSize]
 * @param {string}  [options.confirmWeight]
 * @param {string}  [options.confirmPadding]
 *
 * ─── Cancel button ────────────────────────────────────────────────────────
 * @param {string}  [options.cancelBg]
 * @param {string}  [options.cancelColor]
 * @param {string}  [options.cancelHoverBg]
 * @param {string}  [options.cancelRadius]
 * @param {string}  [options.cancelSize]
 * @param {string}  [options.cancelWeight]
 * @param {string}  [options.cancelPadding]
 * @param {string}  [options.cancelBorder]
 *
 * @returns {Promise<boolean>}
 *
 * @example
 * const ok = await toast.modal('Delete file?', 'This action is permanent.', {
 *   confirmVariant: 'danger',
 *   bg: '#1e1e2e',
 *   titleColor: '#cdd6f4',
 *   overlayBg: 'rgba(0,0,0,0.7)',
 * });
 * if (ok) deleteFile();
 */
export function modalConfirm(title, message, options = {}) {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') return resolve(false);

    const MD = DEFAULTS.modal;
    const o  = { ...MD, confirmLabel: 'Confirm', cancelLabel: 'Cancel', confirmVariant: 'danger', icon: null, sound: DEFAULTS.sound, ...options };

    if (o.sound) playSound('warning');

    // ── Auto-derive variant colors (overridden if explicitly set) ──────────
    const isDanger  = o.confirmVariant !== 'primary';
    const confBg    = o.confirmBg       || (isDanger ? '#ef4444' : '#3b82f6');
    const confHov   = o.confirmHoverBg  || (isDanger ? '#dc2626' : '#2563eb');
    const icoColor  = o.iconColor       || (isDanger ? '#ef4444' : '#3b82f6');
    const icoBg     = o.iconBg          || (isDanger ? '#fee2e2' : '#dbeafe');
    const iconHtml  = o.icon            || ICONS.warning;

    // ── Compute footer horizontal padding from body padding ────────────────
    const bodyParts = o.padding.trim().split(/\s+/);
    const padH      = bodyParts[1] || bodyParts[0];  // e.g. '24px'

    // ── Build DOM ──────────────────────────────────────────────────────────
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
      <div data-mb style="
        width:100%;max-width:${o.maxWidth};
        background:${o.bg};
        border-radius:${o.borderRadius};
        border:${o.borderWidth} solid ${o.borderColor};
        box-shadow:${o.shadow};
        overflow:hidden;
        transition:all 0.32s cubic-bezier(0.34,1.56,0.64,1);
        transform:scale(0.9) translateY(18px);
      ">
        <!-- Body -->
        <div style="padding:${o.padding}">
          <div style="
            width:${o.iconSize};height:${o.iconSize};
            border-radius:${o.iconRadius};
            background:${icoBg};
            display:flex;align-items:center;justify-content:center;
            margin-bottom:16px;
            color:${icoColor};
          ">
            <div style="width:24px;height:24px">${iconHtml}</div>
          </div>
          <h3 style="
            font-size:${o.titleSize};
            font-weight:${o.titleWeight};
            color:${o.titleColor};
            margin:${o.titleMargin};
            line-height:1.3;
          ">${title}</h3>
          <p style="
            font-size:${o.messageSize};
            color:${o.messageColor};
            margin:0;
            line-height:1.65;
          ">${message}</p>
        </div>

        <!-- Footer -->
        <div style="
          background:${o.footerBg};
          padding:${o.footerPaddingV} ${padH} ${o.footerPaddingVB};
          display:flex;gap:10px;justify-content:flex-end;
          border-top:1px solid ${o.footerBorder};
        ">
          <button data-mc style="
            padding:${o.cancelPadding};
            font-size:${o.cancelSize};
            font-weight:${o.cancelWeight};
            color:${o.cancelColor};
            background:${o.cancelBg};
            border:${o.cancelBorder};
            border-radius:${o.cancelRadius};
            cursor:pointer;
            transition:background 0.15s, color 0.15s;
          ">${o.cancelLabel}</button>
          <button data-mok style="
            padding:${o.confirmPadding};
            font-size:${o.confirmSize};
            font-weight:${o.confirmWeight};
            color:${o.confirmColor};
            background:${confBg};
            border:none;
            border-radius:${o.confirmRadius};
            cursor:pointer;
            box-shadow:0 2px 8px ${confBg}55;
            transition:background 0.15s, transform 0.1s;
          ">${o.confirmLabel}</button>
        </div>
      </div>
    `.trim();

    document.body.appendChild(overlay);

    const box  = overlay.querySelector('[data-mb]');
    const conf = overlay.querySelector('[data-mok]');
    const canc = overlay.querySelector('[data-mc]');

    // Button hover
    conf.addEventListener('mouseenter', () => { conf.style.background = confHov; conf.style.transform = 'translateY(-1px)'; });
    conf.addEventListener('mouseleave', () => { conf.style.background = confBg;  conf.style.transform = ''; });
    canc.addEventListener('mouseenter', () => { canc.style.background = o.cancelHoverBg; });
    canc.addEventListener('mouseleave', () => { canc.style.background = o.cancelBg; });

    // Animate in
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      box.style.transform   = 'scale(1) translateY(0)';
    });

    // ── Close helpers ──────────────────────────────────────────────────────
    const close = (result) => {
      overlay.style.opacity = '0';
      box.style.transform   = 'scale(0.9) translateY(16px)';
      setTimeout(() => { overlay.remove(); resolve(result); }, 280);
    };

    canc.onclick  = () => close(false);
    conf.onclick  = () => close(true);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(false); });

    // Keyboard
    const onKey = (e) => {
      if (e.key === 'Escape') { close(false); document.removeEventListener('keydown', onKey); }
      if (e.key === 'Enter')  { close(true);  document.removeEventListener('keydown', onKey); }
    };
    document.addEventListener('keydown', onKey);
  });
}