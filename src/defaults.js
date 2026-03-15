/**
 * defaults.js — Global defaults for all toast types.
 * Mutated by configure(). All per-call options override these.
 *
 * NOTE: sound defaults to FALSE. Pass { sound: true } per-call
 *       or configure({ sound: true }) to enable globally.
 */

export const DEFAULTS = {
  // ── Positioning & lifecycle ──────────────────────────────
  position:       'bottom-right', // top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
  duration:       4000,           // ms — 0 = stay until dismissed
  sound:          false,          // Sound OFF by default

  // ── Behaviour ────────────────────────────────────────────
  dismissOnClick: false,
  showProgress:   false,
  maxToasts:      5,

  // ── Notify toast appearance ──────────────────────────────
  toast: {
    bg:            '#ffffff',
    borderColor:   '#f1f5f9',
    borderRadius:  '14px',
    shadow:        '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
    width:         '316px',
    padding:       '13px 14px',
    titleColor:    '#1e293b',
    descColor:     '#64748b',
    titleSize:     '13.5px',
    descSize:      '12px',
    titleWeight:   '600',
    iconSize:      '32px',
    iconRadius:    '50%',
  },

  // ── Per-type colour tokens ───────────────────────────────
  theme: {
    success: { bg: '#10b981', light: '#d1fae5' },
    error:   { bg: '#ef4444', light: '#fee2e2' },
    warning: { bg: '#f59e0b', light: '#fef3c7' },
    info:    { bg: '#3b82f6', light: '#dbeafe' },
  },

  // ── Anchored toast appearance ────────────────────────────
  anchored: {
    bg:           '#0f172a',
    textColor:    '#ffffff',
    arrowColor:   null,
    borderRadius: '10px',
    fontSize:     '13px',
    fontWeight:   '600',
    padding:      '8px 14px',
    shadow:       '0 8px 24px rgba(0,0,0,0.2)',
    iconSize:     '15px',
    arrowSize:    '10px',
  },

  // ── Anchored confirm appearance ──────────────────────────
  anchoredConfirm: {
    bg:             '#0f172a',
    textColor:      '#f8fafc',
    iconColor:      '#fca5a5',
    borderRadius:   '12px',
    fontSize:       '13px',
    padding:        '12px 14px',
    shadow:         '0 8px 28px rgba(0,0,0,0.22)',
    minWidth:       '160px',
    arrowColor:     null,
    arrowSize:      '10px',
    confirmBg:      '#ef4444',
    confirmColor:   '#ffffff',
    confirmHoverBg: '#dc2626',
    cancelBg:       '#1e293b',
    cancelColor:    '#94a3b8',
    cancelBorder:   '#334155',
    cancelHoverBg:  '#273549',
    btnRadius:      '8px',
    btnFontSize:    '12px',
    btnFontWeight:  '700',
    btnPadding:     '6px 0',
  },

  // ── Modal confirm appearance ─────────────────────────────
  modal: {
    overlayBg:        'rgba(15,23,42,0.55)',
    overlayBlur:      '5px',
    bg:               '#ffffff',
    borderRadius:     '20px',
    shadow:           '0 25px 60px rgba(0,0,0,0.22)',
    maxWidth:         '420px',
    padding:          '24px 24px 20px',
    footerBg:         '#f8fafc',
    footerBorder:     '#f1f5f9',
    footerPadding:    '14px 24px 18px',
    titleColor:       '#0f172a',
    titleSize:        '17px',
    titleWeight:      '700',
    messageColor:     '#64748b',
    messageSize:      '14px',
    iconCircleSize:   '48px',
    iconSize:         '24px',
    confirmBg:        '#ef4444',
    confirmColor:     '#ffffff',
    confirmHoverBg:   '#dc2626',
    confirmRadius:    '10px',
    confirmPadding:   '9px 22px',
    confirmFontSize:  '13.5px',
    confirmWeight:    '600',
    cancelColor:      '#475569',
    cancelHoverBg:    '#f1f5f9',
    cancelRadius:     '10px',
    cancelPadding:    '9px 18px',
    cancelFontSize:   '13.5px',
    cancelWeight:     '500',
  },
};