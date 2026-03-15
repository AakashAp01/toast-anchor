<div align="center">

<br />

**A zero-dependency, fully customizable toast & modal notification library.**  
Works with Vanilla JS and React. No setup. No stylesheet imports. No fluff.

<br />

[![npm version](https://img.shields.io/npm/v/toast-anchor?color=%2310b981&labelColor=%23111&style=flat-square)](https://www.npmjs.com/package/toast-anchor)
[![npm downloads](https://img.shields.io/npm/dm/toast-anchor?color=%2310b981&labelColor=%23111&style=flat-square)](https://www.npmjs.com/package/toast-anchor)
[![bundle size](https://img.shields.io/bundlephobia/minzip/toast-anchor?color=%2310b981&labelColor=%23111&label=gzipped&style=flat-square)](https://bundlephobia.com/package/toast-anchor)
[![license](https://img.shields.io/npm/l/toast-anchor?color=%2310b981&labelColor=%23111&style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-%2310b981?labelColor=%23111&style=flat-square)](https://www.npmjs.com/package/toast-anchor)
[![zero deps](https://img.shields.io/badge/dependencies-zero-%2310b981?labelColor=%23111&style=flat-square)](#)

<br />

[**Website →**](https://toast-anchor.vercel.app) · [**Playground →**](https://toast-anchor.vercel.app/playground) · [**npm →**](https://www.npmjs.com/package/toast-anchor)

<br />

</div>

---

## What's inside

| Feature | Description |
|---|---|
| 🔔 **Notify Toasts** | `success` `error` `warning` `info` — slide-in notifications with full style control |
| ⚓ **Anchored Toast** | Tooltip-style popup that positions itself above any DOM element |
| 🤔 **Anchored Confirm** | Inline yes/no popup anchored above a button — no overlay |
| 🗂️ **Modal Confirm** | Centered overlay modal, Promise-based — `await toast.modal(...)` |
| ⏳ **Promise Toast** | loading → success/error state tracking with `toast.promise()` |
| 🎨 **Full Style API** | Every pixel is configurable — background, colors, radius, shadow, arrow, typography |
| 🔇 **Sound** | Web Audio engine built in — **off by default**, opt-in per call or globally |
| ⚛️ **React Hook** | `useToast()` hook with scoped defaults |
| 📦 **Zero deps** | No stylesheet imports, no external fonts, nothing extra |

---

## Installation

```bash
npm install toast-anchor
```

```bash
yarn add toast-anchor
```

```bash
pnpm add toast-anchor
```

---

## Quick Start

```js
// Vanilla JS / any framework
import toast from 'toast-anchor';

toast.success('Profile saved!');
toast.error('Connection failed.', { position: 'top-right' });
toast.warning('Storage is 90% full.', { showProgress: true });
```

```jsx
// React
import { useToast } from 'toast-anchor';

function App() {
  const toast = useToast({ position: 'top-right' });

  const handleSave = async () => {
    const ok = await toast.modal('Publish changes?', 'This will go live immediately.');
    if (ok) toast.success('Published!');
  };

  return <button onClick={handleSave}>Publish</button>;
}
```

> **Note:** Sound is `false` by default. Enable per-call with `{ sound: true }` or globally with `configure({ sound: true })`.

---

## Table of Contents

- [Global Configuration](#global-configuration)
- [Notify Toasts](#notify-toasts)
- [Promise Toast](#promise-toast)
- [Anchored Toast](#anchored-toast)
- [Anchored Confirm](#anchored-confirm)
- [Modal Confirm](#modal-confirm)
- [React Hook — useToast](#react-hook--usetoast)
- [Dismiss API](#dismiss-api)
- [Custom Icons](#custom-icons)
- [Full Option Reference](#full-option-reference)
- [File Structure](#file-structure)

---

## Global Configuration

Call once at your app's entry point to set defaults for every subsequent toast.

```js
import { configure } from 'toast-anchor';

configure({
  position:       'top-right',   // default: 'bottom-right'
  duration:        5000,         // default: 4000  (0 = never auto-close)
  sound:           true,         // default: false  ← sound is OFF by default
  showProgress:    true,
  dismissOnClick:  false,
  maxToasts:       5,

  // Re-theme the four built-in types
  theme: {
    success: { bg: '#0d9488', light: '#ccfbf1' },
    error:   { bg: '#dc2626', light: '#fee2e2' },
  },

  // Default toast box appearance
  toast: {
    bg:           '#0f172a',
    borderColor:  '#1e293b',
    titleColor:   '#f1f5f9',
    borderRadius: '12px',
  },

  // Default anchored tooltip appearance
  anchored: {
    bg: '#1e293b', arrowColor: '#1e293b',
  },

  // Default modal appearance
  modal: {
    bg:           '#1e1e2e',
    footerBg:     '#181825',
    titleColor:   '#cdd6f4',
    messageColor: '#a6adc8',
    overlayBg:    'rgba(0,0,0,0.75)',
  },

  // Override any icon globally
  icons: {
    success: `<svg viewBox="0 0 24 24" ...>...</svg>`,
  },
});
```

---

## Notify Toasts

### Basic variants

```js
toast.success('Profile saved successfully.');
toast.error  ('Connection to server failed.');
toast.warning('Storage is 90% full.');
toast.info   ('A new version is available.');
```

### With description & action button

```js
toast.success('File uploaded.', {
  description: '3.4 MB — photos/summer-2026.zip',
  action: {
    label:   'View file →',
    onClick: () => router.push('/files'),
  },
});
```

### Full style customization

Every visual property can be overridden per call:

```js
toast.success('Dark toast.', {
  // Layout
  position:      'top-right',
  duration:       4000,
  width:         '340px',
  borderRadius:  '12px',
  padding:       '14px 16px',
  shadow:        '0 8px 32px rgba(0,0,0,0.3)',
  border:        '1px solid #1e293b',   // via borderColor

  // Colors
  bg:            '#0f172a',
  borderColor:   '#1e293b',
  titleColor:    '#f1f5f9',
  descColor:     '#94a3b8',

  // Icon circle
  iconBg:        '#1e293b',
  iconColor:     '#34d399',
  iconSize:      '34px',
  iconRadius:    '8px',          // square icons

  // Progress bar
  showProgress:   true,
  progressColor: '#34d399',
  progressHeight: '3px',

  // Behaviour
  sound:          true,
  dismissOnClick: true,
});
```

### All top-level options

| Option | Type | Default | Description |
|---|---|---|---|
| `type` | `string` | `'success'` | `success` `error` `warning` `info` |
| `position` | `string` | `'bottom-right'` | See [positions](#positions) |
| `duration` | `number` | `4000` | ms until auto-dismiss. `0` = stay |
| `sound` | `boolean` | `false` | Play audio on show |
| `dismissOnClick` | `boolean` | `false` | Dismiss on toast click |
| `showProgress` | `boolean` | `false` | Show countdown progress bar |
| `description` | `string` | `null` | Secondary text line |
| `icon` | `string` | — | Custom SVG HTML string |
| `action` | `{ label, onClick }` | `null` | Action button |
| `id` | `string` | auto | Custom ID for programmatic dismiss |
| `bg` | `string` | `#ffffff` | Toast background |
| `borderColor` | `string` | `#f1f5f9` | Border color |
| `borderRadius` | `string` | `14px` | Border radius |
| `shadow` | `string` | — | Box shadow |
| `width` | `string` | `316px` | Toast width |
| `padding` | `string` | `13px 14px` | Inner padding |
| `titleColor` | `string` | `#1e293b` | Title text color |
| `descColor` | `string` | `#64748b` | Description text color |
| `titleSize` | `string` | `13.5px` | Title font size |
| `descSize` | `string` | `12px` | Description font size |
| `titleWeight` | `string` | `600` | Title font weight |
| `iconBg` | `string` | theme.light | Icon circle background |
| `iconColor` | `string` | theme.bg | Icon color |
| `iconSize` | `string` | `32px` | Icon circle size |
| `iconRadius` | `string` | `50%` | Icon circle border radius |
| `progressColor` | `string` | theme.bg | Progress bar color |
| `progressHeight` | `string` | `3px` | Progress bar height |
| `actionColor` | `string` | theme.bg | Action button text color |

---

## Promise Toast

Track a Promise through loading → success or error states.

```js
toast.promise(
  fetch('/api/save', { method: 'POST', body: JSON.stringify(data) }),
  {
    loading: 'Saving…',
    success: (res) => `Saved ${res.name}!`,   // receives resolved value
    error:   (err) => `Failed: ${err.message}`, // receives rejection
  },
  {
    position: 'top-right',   // any shared options go here
  }
);
```

#### Per-state style overrides

```js
toast.promise(upload(), {
  loading: 'Uploading…',
  success: 'Done!',
  error:   'Upload failed.',
}, {
  successOptions: { bg: '#f0fdf4', iconBg: '#bbf7d0' },
  errorOptions:   { bg: '#fff1f2', iconBg: '#fecdd3' },
});
```

---

## Anchored Toast

A tooltip-style popup that positions itself above any DOM element. Perfect for copy buttons, inline hints, or field validation.

```js
const button = document.getElementById('copy-btn');

toast.anchored('Copied to clipboard!', button, {
  type:     'success',
  duration:  2000,
});
```

### Full customization

```js
toast.anchored('API key regenerated.', anchorEl, {
  type:         'warning',
  bg:           '#7c3aed',
  arrowColor:   '#7c3aed',
  textColor:    '#ede9fe',
  iconColor:    '#c4b5fd',
  borderRadius: '8px',
  fontSize:     '13px',
  fontWeight:   '700',
  shadow:       '0 12px 32px rgba(124,58,237,0.4)',
  duration:     3000,
  offsetY:      16,       // px gap above the anchor element
});
```

### All anchored options

| Option | Type | Default | Description |
|---|---|---|---|
| `type` | `string` | `'success'` | Icon & icon color source |
| `duration` | `number` | `2500` | ms; `0` = stay |
| `sound` | `boolean` | `false` | Play audio |
| `icon` | `string` | — | Custom SVG HTML |
| `bg` | `string` | `#0f172a` | Popup background |
| `textColor` | `string` | `#ffffff` | Text color |
| `arrowColor` | `string` | inherits `bg` | Arrow color |
| `borderRadius` | `string` | `10px` | Border radius |
| `fontSize` | `string` | `13px` | Font size |
| `fontWeight` | `string` | `600` | Font weight |
| `padding` | `string` | `8px 14px` | Inner padding |
| `shadow` | `string` | — | Box shadow |
| `iconSize` | `string` | `15px` | Icon size |
| `iconColor` | `string` | theme.bg | Icon stroke color |
| `arrowSize` | `string` | `10px` | Arrow square size |
| `offsetY` | `number` | `13` | px gap above anchor |

---

## Anchored Confirm

An inline yes/no confirmation popup anchored above a button. No overlay — minimal and contextual.

```js
toast.anchoredConfirm(
  'Delete this item?',
  deleteButtonElement,
  () => handleDelete(),    // onConfirm
  () => showCancelled(),   // onCancel (optional)
  {
    confirmLabel: 'Delete',
    cancelLabel:  'Keep',
    sound:        true,
  }
);
```

### Full customization

```js
toast.anchoredConfirm('Remove member?', btnEl, onConfirm, onCancel, {
  // Container
  bg:           '#1e1e2e',
  textColor:    '#cdd6f4',
  iconColor:    '#f38ba8',
  borderRadius: '10px',
  shadow:       '0 12px 32px rgba(0,0,0,0.4)',
  minWidth:     '180px',
  arrowColor:   '#1e1e2e',

  // Confirm button
  confirmBg:       '#f38ba8',
  confirmColor:    '#1e1e2e',
  confirmHoverBg:  '#eb6077',

  // Cancel button
  cancelBg:        '#313244',
  cancelColor:     '#a6adc8',
  cancelBorder:    '#45475a',
  cancelHoverBg:   '#3d3f50',

  // Shared button style
  btnRadius:      '6px',
  btnFontSize:    '12px',
  btnFontWeight:  '700',
  btnPadding:     '6px 0',
});
```

### All anchored confirm options

| Option | Type | Default | Description |
|---|---|---|---|
| `confirmLabel` | `string` | `'Yes'` | Confirm button text |
| `cancelLabel` | `string` | `'No'` | Cancel button text |
| `sound` | `boolean` | `false` | Play warning sound |
| `icon` | `string` | warning SVG | Custom icon HTML |
| `bg` | `string` | `#0f172a` | Popup background |
| `textColor` | `string` | `#f8fafc` | Message color |
| `iconColor` | `string` | `#fca5a5` | Icon color |
| `borderRadius` | `string` | `12px` | Border radius |
| `fontSize` | `string` | `13px` | Message font size |
| `padding` | `string` | `12px 14px` | Inner padding |
| `shadow` | `string` | — | Box shadow |
| `minWidth` | `string` | `160px` | Minimum width |
| `arrowColor` | `string` | inherits `bg` | Arrow color |
| `arrowSize` | `string` | `10px` | Arrow square size |
| `offsetY` | `number` | `13` | px gap above anchor |
| `confirmBg` | `string` | `#ef4444` | Confirm button background |
| `confirmColor` | `string` | `#ffffff` | Confirm button text |
| `confirmHoverBg` | `string` | `#dc2626` | Confirm button hover bg |
| `cancelBg` | `string` | `#1e293b` | Cancel button background |
| `cancelColor` | `string` | `#94a3b8` | Cancel button text |
| `cancelBorder` | `string` | `#334155` | Cancel button border |
| `cancelHoverBg` | `string` | `#273549` | Cancel button hover bg |
| `btnRadius` | `string` | `8px` | Button border radius |
| `btnFontSize` | `string` | `12px` | Button font size |
| `btnFontWeight` | `string` | `700` | Button font weight |
| `btnPadding` | `string` | `6px 0` | Button padding |

---

## Modal Confirm

A centered overlay confirmation modal. Returns a Promise — `true` if confirmed, `false` if cancelled.

```js
const ok = await toast.modal('Delete account?', 'All your data will be permanently removed.');

if (ok) {
  await deleteAccount();
  toast.success('Account deleted.');
}
```

### Full customization

```js
// Dark Catppuccin-style modal
const ok = await toast.modal('Delete account?', 'This action is permanent.', {
  // Behaviour
  confirmLabel:        'Yes, delete',
  cancelLabel:         'Never mind',
  closeOnOverlayClick: true,
  closeOnEscape:       true,
  enterToConfirm:      true,
  sound:               true,

  // Overlay
  overlayBg:    'rgba(0,0,0,0.8)',
  overlayBlur:  '8px',

  // Modal box
  bg:           '#1e1e2e',
  borderRadius: '12px',
  shadow:       '0 32px 80px rgba(0,0,0,0.5)',
  maxWidth:     '420px',
  border:       '1px solid #313244',
  padding:      '24px 24px 20px',

  // Footer
  footerBg:     '#181825',
  footerBorder: '#313244',

  // Typography
  titleColor:   '#cdd6f4',
  titleSize:    '17px',
  titleWeight:  '700',
  messageColor: '#a6adc8',
  messageSize:  '14px',

  // Icon circle
  iconBg:           '#45475a',
  iconColor:        '#f38ba8',
  iconCircleSize:   '48px',
  iconSize:         '24px',
  iconCircleRadius: '50%',

  // Confirm button
  confirmBg:       '#f38ba8',
  confirmColor:    '#1e1e2e',
  confirmHoverBg:  '#eb6077',
  confirmRadius:   '10px',
  confirmPadding:  '9px 22px',
  confirmWeight:   '600',

  // Cancel button
  cancelColor:    '#6c7086',
  cancelHoverBg:  '#313244',
  cancelRadius:   '10px',
});
```

### All modal options

| Option | Type | Default | Description |
|---|---|---|---|
| `confirmLabel` | `string` | `'Confirm'` | Confirm button text |
| `cancelLabel` | `string` | `'Cancel'` | Cancel button text |
| `confirmVariant` | `'danger'` \| `'primary'` | `'danger'` | Shorthand color preset |
| `icon` | `string` | warning SVG | Custom icon HTML |
| `sound` | `boolean` | `false` | Play warning sound |
| `closeOnOverlayClick` | `boolean` | `true` | Click backdrop to cancel |
| `closeOnEscape` | `boolean` | `true` | Escape key to cancel |
| `enterToConfirm` | `boolean` | `true` | Enter key to confirm |
| `overlayBg` | `string` | `rgba(15,23,42,0.55)` | Backdrop color |
| `overlayBlur` | `string` | `5px` | Backdrop blur |
| `bg` | `string` | `#ffffff` | Modal background |
| `borderRadius` | `string` | `20px` | Modal border radius |
| `shadow` | `string` | — | Modal box shadow |
| `maxWidth` | `string` | `420px` | Modal max width |
| `border` | `string` | `none` | Modal border |
| `padding` | `string` | `24px 24px 20px` | Body padding |
| `footerBg` | `string` | `#f8fafc` | Footer background |
| `footerBorder` | `string` | `#f1f5f9` | Footer top border |
| `footerPadding` | `string` | `14px 24px 18px` | Footer padding |
| `titleColor` | `string` | `#0f172a` | Title color |
| `titleSize` | `string` | `17px` | Title font size |
| `titleWeight` | `string` | `700` | Title font weight |
| `messageColor` | `string` | `#64748b` | Message text color |
| `messageSize` | `string` | `14px` | Message font size |
| `iconBg` | `string` | variant | Icon circle background |
| `iconColor` | `string` | variant | Icon color |
| `iconCircleSize` | `string` | `48px` | Icon circle diameter |
| `iconSize` | `string` | `24px` | Inner icon size |
| `iconCircleRadius` | `string` | `50%` | Icon circle radius |
| `confirmBg` | `string` | `#ef4444` | Confirm button background |
| `confirmColor` | `string` | `#ffffff` | Confirm button text |
| `confirmHoverBg` | `string` | `#dc2626` | Confirm button hover |
| `confirmRadius` | `string` | `10px` | Confirm button radius |
| `confirmPadding` | `string` | `9px 22px` | Confirm button padding |
| `confirmFontSize` | `string` | `13.5px` | Confirm font size |
| `confirmWeight` | `string` | `600` | Confirm font weight |
| `confirmShadow` | `string` | auto | Confirm button shadow |
| `cancelColor` | `string` | `#475569` | Cancel text color |
| `cancelBg` | `string` | `transparent` | Cancel background |
| `cancelBorder` | `string` | `none` | Cancel border |
| `cancelHoverBg` | `string` | `#f1f5f9` | Cancel hover background |
| `cancelRadius` | `string` | `10px` | Cancel button radius |
| `cancelPadding` | `string` | `9px 18px` | Cancel button padding |
| `cancelFontSize` | `string` | `13.5px` | Cancel font size |
| `cancelWeight` | `string` | `500` | Cancel font weight |

---

## React Hook — useToast

Scopes a set of default options to a component. Per-call options still win.

```jsx
import { useToast } from 'toast-anchor';

function ProfilePage() {
  const toast = useToast({
    position: 'top-right',
    sound:     true,
    duration:  5000,
  });

  const handleDelete = async () => {
    const ok = await toast.modal('Delete profile?', 'You will lose all your data.', {
      confirmLabel: 'Delete forever',
    });

    if (!ok) return;

    toast.promise(deleteProfile(), {
      loading: 'Deleting…',
      success: 'Profile deleted.',
      error:   (e) => `Failed: ${e.message}`,
    });
  };

  return (
    <div>
      <button onClick={() => toast.success('Settings saved!')}>Save</button>
      <button onClick={handleDelete}>Delete Profile</button>
    </div>
  );
}
```

The hook exposes the full API:

```js
const {
  success, error, warning, info,  // notify toasts
  notify,                          // toast.notify(msg, opts) — raw createToast
  promise,                         // promise tracking
  anchored,                        // tooltip-style
  anchoredConfirm,                 // inline yes/no
  modal,                           // await-able modal
  dismiss,                         // dismiss by id
  dismissAll,                      // clear all
} = useToast(defaultOptions);
```

---

## Dismiss API

```js
// Dismiss a specific toast
const dismiss = toast.success('Uploading…', { duration: 0 });
// …later
dismiss(); // or toast.dismiss(id)

// Dismiss by custom ID
toast.info('Connecting…', { id: 'connection-status', duration: 0 });
// …later
toast.dismiss('connection-status');

// Dismiss everything
toast.dismissAll();
```

---

## Custom Icons

Pass any SVG string per-call, or override slots globally via `configure()`.

```js
// Per-call
toast.success('Deployed!', {
  icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
  </svg>`,
});

// Global override via configure()
import { configure } from 'toast-anchor';

configure({
  icons: {
    success: `<svg viewBox="0 0 24 24" ...>...</svg>`,
    error:   `<svg viewBox="0 0 24 24" ...>...</svg>`,
    warning: `<svg viewBox="0 0 24 24" ...>...</svg>`,
    info:    `<svg viewBox="0 0 24 24" ...>...</svg>`,
    loading: `<svg viewBox="0 0 24 24" ...>...</svg>`,
  },
});
```

---

## Positions

```
top-left      top-center      top-right
bottom-left   bottom-center   bottom-right  ← default
```

---

## Full Option Reference

### `configure(options)` — global defaults

```js
configure({
  // Top-level
  position:       'bottom-right',
  duration:        4000,
  sound:           false,           // ← off by default
  dismissOnClick:  false,
  showProgress:    false,
  maxToasts:       5,

  // Nested (deep-merged)
  theme:           { success, error, warning, info },
  toast:           { /* notify toast defaults */ },
  anchored:        { /* anchored toast defaults */ },
  anchoredConfirm: { /* anchored confirm defaults */ },
  modal:           { /* modal confirm defaults */ },
  icons:           { success, error, warning, info, loading },
});
```

---

## File Structure

```
toast-anchor/
└── src/
    ├── index.js              ← package entry, default export + named exports
    ├── defaults.js           ← all global defaults (DEFAULTS object)
    ├── audio.js              ← Web Audio engine
    ├── icons.js              ← default SVG icon set
    ├── container.js          ← fixed-position container manager
    ├── core-toast.js         ← slide-in notify toast + dismiss API
    ├── promise-toast.js      ← promise tracker
    ├── anchored-toast.js     ← tooltip-style anchored toast
    ├── anchored-confirm.js   ← inline yes/no confirm popup
    ├── modal-confirm.js      ← centered overlay modal
    ├── configure.js          ← deep-merge global config
    └── react-hook.js         ← useToast() hook
```

---

## Named Exports

```js
import toast, {
  // Functions
  createToast,
  dismissToast,
  dismissAll,
  promiseToast,
  anchoredToast,
  anchoredConfirm,
  modalConfirm,
  configure,
  playSound,
  useToast,

  // Data
  DEFAULTS,
  ICONS,
  SOUND_PROFILES,
} from 'toast-anchor';
```

---

## Browser Support

Works in all modern browsers that support the [Web Animations API](https://caniuse.com/web-animation) and [Web Audio API](https://caniuse.com/audio-api). The audio engine silently no-ops if unavailable.

| Chrome | Firefox | Safari | Edge |
|:---:|:---:|:---:|:---:|
| ✅ 88+ | ✅ 85+ | ✅ 14+ | ✅ 88+ |

---

## License

[MIT](LICENSE) © toast-anchor contributors

---

<div align="center">

Made with care. Zero dependencies. Zero telemetry.

[**Live Playground →**](https://toast-anchor.dev/playground)

</div>
