<div align="center">

```text
  _____               _         _               _                
 |_   _|__  __ _  ___| |_      / \   _ __   ___| |__   ___  _ __ 
   | |/ _ \/ _` |/ __| __|    / _ \ | '_ \ / __| '_ \ / _ \| '__|
   | | (_) | (_| \__ \ |_    / ___ \| | | | (__| | | | (_) | |   
 |_|\___/ \__,_|___/\__|  /_/   \_\_| |_|\___|_| |_|\___/|_| 
```

[![npm version](https://img.shields.io/npm/v/toast-anchor?color=%2310b981&labelColor=%23111&style=flat-square)](https://www.npmjs.com/package/toast-anchor)
[![npm downloads](https://img.shields.io/npm/dm/toast-anchor?color=%2310b981&labelColor=%23111&style=flat-square)](https://www.npmjs.com/package/toast-anchor)
[![bundle size](https://img.shields.io/bundlephobia/minzip/toast-anchor?color=%2310b981&labelColor=%23111&label=gzipped&style=flat-square)](https://bundlephobia.com/package/toast-anchor)
[![license](https://img.shields.io/npm/l/toast-anchor?color=%2310b981&labelColor=%23111&style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-%2310b981?labelColor=%23111&style=flat-square)](https://www.npmjs.com/package/toast-anchor)
[![zero deps](https://img.shields.io/badge/dependencies-zero-%2310b981?labelColor=%23111&style=flat-square)](#)

<br />

> A zero-dependency, fully customizable toast & modal notification library.
> Works with **Vanilla JS** and **React**. No setup. No stylesheet imports. No fluff.

<br />

<p>
  <a href="https://toast-anchor.vercel.app/">
    <img src="https://img.shields.io/badge/Website-%23111827?style=for-the-badge&logo=vercel&logoColor=%2310b981" alt="Website" />
  </a>
  &nbsp;
  <a href="https://toast-anchor.vercel.app/playground">
    <img src="https://img.shields.io/badge/Playground-%23111827?style=for-the-badge&logo=codesandbox&logoColor=%2310b981" alt="Playground" />
  </a>
  &nbsp;
  <a href="https://toast-anchor.vercel.app/docs">
    <img src="https://img.shields.io/badge/Documentation-%23111827?style=for-the-badge&logo=gitbook&logoColor=%2310b981" alt="Documentation" />
  </a>
  &nbsp;
  <a href="https://www.npmjs.com/package/toast-anchor">
    <img src="https://img.shields.io/badge/npm-%23111827?style=for-the-badge&logo=npm&logoColor=%2310b981" alt="npm" />
  </a>
</p>

</div>

---

## Install

```bash
npm install toast-anchor
# or
pnpm add toast-anchor
# or
yarn add toast-anchor
```

---

## Quick Start

```js
// Vanilla JS
import toast from 'toast-anchor';

toast.success('Saved!');
toast.error('Something went wrong.');
toast.warning('Low storage.');
toast.info('New version available.');
```

```jsx
// React
import { useToast } from 'toast-anchor';

function App() {
  const toast = useToast();
  return <button onClick={() => toast.success('Done!')}>Save</button>;
}
```

---

## Package Structure

```
toast-anchor/
    └── src/
        ├── index.js            # Entry — re-exports + default toast object
        ├── defaults.js         # DEFAULTS + configure()
        ├── core-toast.js       # createToast, dismissToast, dismissAll
        ├── promise-toast.js    # promiseToast
        ├── anchored-toast.js   # anchoredToast + shared geometry helpers
        ├── anchored-confirm.js # anchoredConfirm
        ├── modal.js            # modalConfirm
        ├── react.js            # useToast hook
        ├── icons.js            # ICONS + spinner keyframe
        └── audio.js            # playSound (lazy AudioContext)
```

---

<div align="center">

<sub>MIT License · Built with zero dependencies · Made for developers who care about details</sub>

</div>
