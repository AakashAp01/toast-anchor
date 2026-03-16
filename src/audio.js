/**
 * audio.js — Web Audio engine for toast sounds.
 * AudioContext is created lazily on first use to avoid browser warnings.
 */

let _ctx = null;

const PROFILES = {
  success: { wave: 'sine',     sf: 600, ef: 900, gs: 0.15, ge: 0.01, dur: 0.15 },
  error:   { wave: 'sawtooth', sf: 400, ef: 200, gs: 0.15, ge: 0.01, dur: 0.15 },
  warning: { wave: 'triangle', sf: 600, ef: 380, gs: 0.12, ge: 0.01, dur: 0.13 },
  info:    { wave: 'sine',     sf: 800, ef: 300, gs: 0.15, ge: 0.01, dur: 0.10 },
  pop:     { wave: 'sine',     sf: 700, ef: 350, gs: 0.12, ge: 0.01, dur: 0.10 },
};

/**
 * Play a short synthesised chime.
 * @param {'success'|'error'|'warning'|'info'|'pop'} type
 */
export function playSound(type = 'success') {
  if (typeof window === 'undefined') return;
  try {
    if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (_ctx.state === 'suspended') _ctx.resume();

    const p    = PROFILES[type] || PROFILES.pop;
    const osc  = _ctx.createOscillator();
    const gain = _ctx.createGain();
    const t    = _ctx.currentTime;

    osc.type = p.wave;
    osc.frequency.setValueAtTime(p.sf, t);
    osc.frequency.exponentialRampToValueAtTime(p.ef, t + p.dur);
    gain.gain.setValueAtTime(p.gs, t);
    gain.gain.exponentialRampToValueAtTime(p.ge, t + p.dur);
    osc.connect(gain);
    gain.connect(_ctx.destination);
    osc.start();
    osc.stop(t + p.dur);
  } catch (_) { /* silent fail — audio may be blocked */ }
}