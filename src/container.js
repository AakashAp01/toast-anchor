/**
 * container.js — Creates and caches fixed-position toast containers per position.
 */

const POSITION_CSS = {
  'top-left':      'top:1.5rem;left:1.5rem;flex-direction:column',
  'top-center':    'top:1.5rem;left:50%;transform:translateX(-50%);flex-direction:column',
  'top-right':     'top:1.5rem;right:1.5rem;flex-direction:column',
  'bottom-left':   'bottom:1.5rem;left:1.5rem;flex-direction:column-reverse',
  'bottom-center': 'bottom:1.5rem;left:50%;transform:translateX(-50%);flex-direction:column-reverse',
  'bottom-right':  'bottom:1.5rem;right:1.5rem;flex-direction:column-reverse',
};

/**
 * Returns (or creates) the container div for the given position.
 * @param {string} position
 * @returns {HTMLElement|null}
 */
export function getContainer(position) {
  if (typeof document === 'undefined') return null;
  const id = `__toast_c_${position.replace(/-/g, '_')}`;
  let   el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    const posStyle = POSITION_CSS[position] || POSITION_CSS['bottom-right'];
    el.setAttribute('style',
      `position:fixed;z-index:9999;display:flex;gap:10px;pointer-events:none;${posStyle}`
    );
    document.body.appendChild(el);
  }
  return el;
}