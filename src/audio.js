/**
 * audio.js — Sound engine for toast notifications
 * Default: sound is OFF. Pass { sound: true } or configure({ sound: true }) to enable.
 */

let audioCtx = null;

/**
 * Sound profiles per toast type.
 * Each profile: { wave, sf (start freq), ef (end freq), gs (gain start), ge (gain end), dur (seconds) }
 */
const SOUND_PROFILES = {
  success: { wave: 'sine',     sf: 600, ef: 900, gs: 0.15, ge: 0.01, dur: 0.15 },
  error:   { wave: 'sawtooth', sf: 400, ef: 200, gs: 0.15, ge: 0.01, dur: 0.15 },
  warning: { wave: 'triangle', sf: 600, ef: 380, gs: 0.12, ge: 0.01, dur: 0.13 },
  info:    { wave: 'sine',     sf: 800, ef: 300, gs: 0.15, ge: 0.01, dur: 0.10 },
  pop:     { wave: 'sine',     sf: 700, ef: 350, gs: 0.12, ge: 0.01, dur: 0.10 },
};

/**
 * Play a tone for the given notification type.
 * Silently no-ops in non-browser environments or if Web Audio is unavailable.
 *
 * @param {'success'|'error'|'warning'|'info'|'pop'} type
 * @param {object} [customProfile] - override any profile keys
 */
export function playSound(type = 'success', customProfile = {}) {
  if (typeof window === 'undefined') return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const p    = { ...(SOUND_PROFILES[type] || SOUND_PROFILES.pop), ...customProfile };
    const now  = audioCtx.currentTime;

    osc.type = p.wave;
    osc.frequency.setValueAtTime(p.sf, now);
    osc.frequency.exponentialRampToValueAtTime(p.ef, now + p.dur);
    gain.gain.setValueAtTime(p.gs, now);
    gain.gain.exponentialRampToValueAtTime(p.ge, now + p.dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(now + p.dur);
  } catch (_) { /* silent fail */ }
}

export { SOUND_PROFILES };