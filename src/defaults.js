/**
 * defaults.js — Global configuration defaults for all toast components.
 *
 * Every option here can be overridden globally via configure() or
 * per-call by passing the same key in the options object.
 *
 * Sound is OFF by default. Pass `sound: true` per-call, or enable
 * globally: configure({ sound: true })
 */

export const DEFAULTS = {
  /* ── Global behaviour ─────────────────────────────────────── */
  position:       'bottom-right',
  duration:       4000,
  sound:          false,
  dismissOnClick: false,
  showProgress:   false,
  maxToasts:      5,

  /* ── Per-type icon palette (used for icon bg/color) ────────── */
  theme: {
    success: { bg: '#10b981', light: '#d1fae5' },
    error:   { bg: '#ef4444', light: '#fee2e2' },
    warning: { bg: '#f59e0b', light: '#fef3c7' },
    info:    { bg: '#3b82f6', light: '#dbeafe' },
  },

  /* ── Toast card appearance ──────────────────────────────────
   *  Every key here can also be passed directly in createToast options
   *  (flat, no nesting required per-call).
   */
  toast: {
    bg:            '#ffffff',
    color:         '#1e293b',
    descColor:     '#64748b',
    borderColor:   '#f1f5f9',
    borderWidth:   '1px',
    borderRadius:  '14px',
    shadow:        '0 4px 24px rgba(0,0,0,0.08),0 1px 4px rgba(0,0,0,0.04)',
    padding:       '13px 14px',
    width:         '316px',
    fontSize:      '13.5px',
    fontWeight:    '600',
    descFontSize:  '12px',
    descFontWeight:'400',
    showIcon:      true,
    showClose:     true,
    closeColor:    '#cbd5e1',
    closeHoverColor:'#94a3b8',
    progressH:     '3px',
    progressRadius:'0 0 14px 14px',
    iconSize:      '32px',
    iconRadius:    '50%',
    actionColor:   null,
    actionFontSize:'12px',
  },

  /* ── Anchored toast (tooltip-style popup) ─────────────────── */
  anchored: {
    position:     'top',    // 'top' | 'bottom' | 'left' | 'right'
    bg:           '#0f172a',
    color:        '#ffffff',
    borderColor:  'transparent',
    borderWidth:  '0px',
    borderRadius: '10px',
    shadow:       '0 8px 24px rgba(0,0,0,0.2)',
    padding:      '8px 14px',
    fontSize:     '13px',
    fontWeight:   '600',
    showIcon:     true,
    arrowSize:    10,
    showArrow:    true,
    gap:          13,
  },

  /* ── Anchored confirm popup ───────────────────────────────── */
  anchoredConfirm: {
    position:       'top',
    bg:             '#0f172a',
    color:          '#f8fafc',
    borderColor:    'transparent',
    borderWidth:    '0px',
    borderRadius:   '12px',
    shadow:         '0 8px 28px rgba(0,0,0,0.22)',
    padding:        '12px 14px',
    fontSize:       '13px',
    minWidth:       '160px',
    showIcon:       true,
    confirmBg:      '#ef4444',
    confirmColor:   '#ffffff',
    confirmHoverBg: '#dc2626',
    cancelBg:       '#1e293b',
    cancelColor:    '#94a3b8',
    cancelHoverBg:  '#334155',
    cancelBorder:   '#334155',
    btnRadius:      '8px',
    btnFontSize:    '12px',
    btnFontWeight:  '700',
    btnPadding:     '6px 0',
    arrowSize:      10,
    showArrow:      true,
    gap:            13,
  },

  /* ── Modal confirm ────────────────────────────────────────── */
  modal: {
    position:        'center',  // 'center' | 'top'
    overlayBg:       'rgba(15,23,42,0.55)',
    overlayBlur:     '5px',
    bg:              '#ffffff',
    borderColor:     'transparent',
    borderWidth:     '0px',
    borderRadius:    '20px',
    shadow:          '0 25px 60px rgba(0,0,0,0.22)',
    maxWidth:        '420px',
    padding:         '24px',
    footerBg:        '#f8fafc',
    footerBorder:    '#f1f5f9',
    footerPaddingV:  '14px',
    footerPaddingVB: '18px',
    titleColor:      '#0f172a',
    titleSize:       '17px',
    titleWeight:     '700',
    titleMargin:     '0 0 8px',
    messageColor:    '#64748b',
    messageSize:     '14px',
    iconSize:        '48px',
    iconRadius:      '50%',
    iconBg:          null,
    iconColor:       null,
    confirmBg:       null,
    confirmColor:    '#ffffff',
    confirmHoverBg:  null,
    confirmRadius:   '10px',
    confirmSize:     '13.5px',
    confirmWeight:   '600',
    confirmPadding:  '9px 22px',
    cancelColor:     '#475569',
    cancelHoverBg:   '#f1f5f9',
    cancelRadius:    '10px',
    cancelSize:      '13.5px',
    cancelWeight:    '500',
    cancelPadding:   '9px 18px',
    cancelBg:        'transparent',
    cancelBorder:    'none',
  },
};

/**
 * Deep-merge options into global DEFAULTS.
 *
 * Sub-objects (toast, anchored, anchoredConfirm, modal, theme) are merged
 * shallowly so you only need to pass the keys you want to change.
 *
 * @example
 * configure({
 *   position: 'top-right',
 *   sound: true,
 *   toast:  { bg: '#1e1e2e', color: '#cdd6f4', borderRadius: '8px' },
 *   modal:  { borderRadius: '12px', overlayBg: 'rgba(0,0,0,0.7)' },
 *   theme:  { success: { bg: '#a6e3a1', light: '#1e3a2f' } },
 * });
 */
export function configure(options = {}) {
  const SUB_KEYS = ['toast', 'anchored', 'anchoredConfirm', 'modal', 'theme'];
  for (const [k, v] of Object.entries(options)) {
    if (SUB_KEYS.includes(k) && v && typeof v === 'object') {
      if (k === 'theme') {
        for (const [tk, tv] of Object.entries(v)) {
          DEFAULTS.theme[tk] = { ...DEFAULTS.theme[tk], ...tv };
        }
      } else {
        Object.assign(DEFAULTS[k], v);
      }
    } else {
      DEFAULTS[k] = v;
    }
  }
}