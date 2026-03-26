/**
 * anchored-toast.js — Tooltip-style toast anchored to a DOM element.
 *
 * Positions: 'top' | 'bottom' | 'left' | 'right'
 * Arrow and entry animation automatically adapt to the chosen side.
 * Features Smart Positioning: Flips side if there isn't enough screen space.
 */

import { DEFAULTS }  from './defaults.js';
import { ICONS }     from './icons.js';
import { playSound } from './audio.js';

// ── Shared geometry helpers (also used by anchored-confirm.js) ───────────────

/**
 * Position a floating element relative to an anchor rect.
 * Uses offsetWidth/offsetHeight so CSS scale animations don't mess up measurements.
 */
export function placeElement(el, anchor, side, gap) {
  const ar = anchor.getBoundingClientRect();
  const eWidth = el.offsetWidth;
  const eHeight = el.offsetHeight;
  const sx = window.scrollX, sy = window.scrollY;
  let top, left;

  switch (side) {
    case 'bottom':
      top  = ar.bottom + sy + gap;
      left = ar.left   + sx + ar.width  / 2 - eWidth  / 2;
      break;
    case 'left':
      top  = ar.top    + sy + ar.height / 2 - eHeight / 2;
      left = ar.left   + sx - eWidth  - gap;
      break;
    case 'right':
      top  = ar.top    + sy + ar.height / 2 - eHeight / 2;
      left = ar.right  + sx + gap;
      break;
    default: // 'top'
      top  = ar.top    + sy - eHeight - gap;
      left = ar.left   + sx + ar.width  / 2 - eWidth  / 2;
  }

  el.style.top  = `${top}px`;
  el.style.left = `${left}px`;
}

/**
 * Calculates the best side to display the toast based on viewport space.
 */
export function getOptimalSide(el, anchor, preferredSide, gap) {
  const eWidth = el.offsetWidth;
  const eHeight = el.offsetHeight;
  const ar = anchor.getBoundingClientRect();
  
  // Viewport dimensions
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;

  // Available space on all 4 sides of the anchor
  const space = {
    top: ar.top,
    bottom: vh - ar.bottom,
    left: ar.left,
    right: vw - ar.right
  };

  // Required space on all 4 sides
  const needed = {
    top: eHeight + gap,
    bottom: eHeight + gap,
    left: eWidth + gap,
    right: eWidth + gap
  };

  // 1. Try preferred side first
  if (space[preferredSide] >= needed[preferredSide]) return preferredSide;

  // 2. If it fails, try the exact opposite side
  const opposite = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
  if (space[opposite[preferredSide]] >= needed[opposite[preferredSide]]) return opposite[preferredSide];

  // 3. If vertical fails, try horizontal (and vice versa)
  const fallbacks = preferredSide === 'top' || preferredSide === 'bottom' 
    ? ['right', 'left'] 
    : ['bottom', 'top'];

  for (const fallback of fallbacks) {
    if (space[fallback] >= needed[fallback]) return fallback;
  }

  // 4. Default back to preferred if screen is just too small everywhere
  return preferredSide;
}

/**
 * Build inline style for the caret arrow (rotated square).
 */
export function arrowStyle(side, size, bg, borderColor, borderWidth) {
  const half = size / 2;
  const bw   = borderWidth && borderWidth !== '0px' ? borderWidth : '0px';
  const bc   = borderColor || 'transparent';
  const hasBorder = bw !== '0px';

  let borderCSS = '';
  if (hasBorder) {
    const solid = `${bw} solid ${bc}`;
    const none  = `${bw} solid transparent`;
    switch (side) {
      case 'top':    
        borderCSS = `border-top:${none};border-right:${solid};border-bottom:${solid};border-left:${none};`;
        break;
      case 'bottom': 
        borderCSS = `border-top:${solid};border-right:${none};border-bottom:${none};border-left:${solid};`;
        break;
      case 'left':   
        borderCSS = `border-top:${solid};border-right:${solid};border-bottom:${none};border-left:${none};`;
        break;
      case 'right':  
        borderCSS = `border-top:${none};border-right:${none};border-bottom:${solid};border-left:${solid};`;
        break;
    }
  }

  const base = `${borderCSS}position:absolute;width:${size}px;height:${size}px;background:${bg};transform:rotate(45deg);`;

  switch (side) {
    case 'bottom': return `${base}top:${-half}px;left:50%;margin-left:${-half}px`;
    case 'left':   return `${base}top:50%;right:${-half}px;margin-top:${-half}px`;
    case 'right':  return `${base}top:50%;left:${-half}px;margin-top:${-half}px`;
    default:       return `${base}bottom:${-half}px;left:50%;margin-left:${-half}px`;
  }
}

export function entryTransform(side) {
  switch (side) {
    case 'bottom': return 'scale(0.88) translateY(-8px)';
    case 'left':   return 'scale(0.88) translateX(8px)';
    case 'right':  return 'scale(0.88) translateX(-8px)';
    default:       return 'scale(0.88) translateY(8px)';
  }
}

export function exitTransform(side) {
  switch (side) {
    case 'bottom': return 'scale(0.9) translateY(-4px)';
    case 'left':   return 'scale(0.9) translateX(4px)';
    case 'right':  return 'scale(0.9) translateX(-4px)';
    default:       return 'scale(0.9) translateY(4px)';
  }
}

// ── anchoredToast ────────────────────────────────────────────────────────────

const _anchoredMap = new WeakMap();

export function anchoredToast(message, anchor, options = {}) {
  if (typeof document === 'undefined' || !anchor) return () => {};

  const o = { type: 'success', duration: 2500, sound: DEFAULTS.sound, icon: null, ...DEFAULTS.anchored, ...options };
  const theme = DEFAULTS.theme[o.type] || DEFAULTS.theme.success;
  const icon  = o.icon || ICONS[o.type];
  const requestedSide = o.position || 'top';
  const gap = o.gap !== undefined ? o.gap : 8; // default distance

  if (o.sound) playSound(o.type);

  const prevDismiss = _anchoredMap.get(anchor);
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
    `font-weight:${o.fontWeight}`,
    `border-radius:${o.borderRadius}`,
    `border:${o.borderWidth} solid ${o.borderColor}`,
    `box-shadow:${o.shadow}`,
    'pointer-events:none',
    'white-space:nowrap',
    'transition:opacity 0.3s ease,transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
    'opacity:0', // Keep hidden while we measure
    // Note: We DO NOT apply the initial transform yet, as scale affects measurements
  ].join(';'));

  // Append just the content first to get an accurate width/height measurement
  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:7px">
      ${showIcon ? `<div style="width:15px;height:15px;display:flex;flex-shrink:0;color:${theme.bg}">${icon}</div>` : ''}
      <span>${message}</span>
    </div>
  `.trim();

  document.body.appendChild(el);

  // --- COLLISION DETECTION ---
  // Determine if it fits on requested side, otherwise flip it automatically
  const actualSide = getOptimalSide(el, anchor, requestedSide, gap);

  // --- FINAL DOM UPDATES ---
  // Now add the arrow pointing to the newly determined side
  if (o.showArrow) {
    el.insertAdjacentHTML('beforeend', `<div style="${arrowStyle(actualSide, o.arrowSize, o.bg, o.borderColor, o.borderWidth)}"></div>`);
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
    _anchoredMap.delete(anchor);
    el.style.opacity   = '0';
    el.style.transform = exitTransform(actualSide); // Exit towards the correct side
    setTimeout(() => el.remove(), 300);
  };

  _anchoredMap.set(anchor, dismiss);

  if (o.duration > 0) setTimeout(dismiss, o.duration);
  return dismiss;
}
