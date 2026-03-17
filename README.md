<div align="center">

# toast-anchor

![toast-anchor banner](./assets/banner.png)

<br />

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
    <picture>
      <source media="(prefers-color-scheme: dark)"  srcset="https://img.shields.io/badge/Website-%23111827?style=for-the-badge&logo=vercel&logoColor=%2310b981" />
      <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/Website-%23e4e4e7?style=for-the-badge&logo=vercel&logoColor=%23059669&labelColor=%23e4e4e7" />
      <img src="https://img.shields.io/badge/Website-%23111827?style=for-the-badge&logo=vercel&logoColor=%2310b981" alt="Website" />
    </picture>
  </a>
  &nbsp;
  <a href="https://toast-anchor.vercel.app/playground">
    <picture>
      <source media="(prefers-color-scheme: dark)"  srcset="https://img.shields.io/badge/Playground-%23111827?style=for-the-badge&logo=codesandbox&logoColor=%2310b981" />
      <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/Playground-%23e4e4e7?style=for-the-badge&logo=codesandbox&logoColor=%23059669&labelColor=%23e4e4e7" />
      <img src="https://img.shields.io/badge/Playground-%23111827?style=for-the-badge&logo=codesandbox&logoColor=%2310b981" alt="Playground" />
    </picture>
  </a>
  &nbsp;
  <a href="https://toast-anchor.vercel.app/docs">
    <picture>
      <source media="(prefers-color-scheme: dark)"  srcset="https://img.shields.io/badge/Documentation-%23111827?style=for-the-badge&logo=gitbook&logoColor=%2310b981" />
      <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/Documentation-%23e4e4e7?style=for-the-badge&logo=gitbook&logoColor=%23059669&labelColor=%23e4e4e7" />
      <img src="https://img.shields.io/badge/Documentation-%23111827?style=for-the-badge&logo=gitbook&logoColor=%2310b981" alt="Documentation" />
    </picture>
  </a>
  &nbsp;
  <a href="https://www.npmjs.com/package/toast-anchor">
    <picture>
      <source media="(prefers-color-scheme: dark)"  srcset="https://img.shields.io/badge/npm-%23111827?style=for-the-badge&logo=npm&logoColor=%2310b981" />
      <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/npm-%23e4e4e7?style=for-the-badge&logo=npm&logoColor=%23059669&labelColor=%23e4e4e7" />
      <img src="https://img.shields.io/badge/npm-%23111827?style=for-the-badge&logo=npm&logoColor=%2310b981" alt="npm" />
    </picture>
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
