# toast-anchor

![toast-anchor banner](./assets/banner.png)

A zero-dependency, fully customizable toast & modal notification library. Works with Vanilla JS and React. No setup. No stylesheet imports. No fluff.

**[Website →](https://toast-anchor.vercel.app)** · **[Playground →](https://toast-anchor.vercel.app/playground)** · **[Documentation →](https://toast-anchor.vercel.app/docs)** · **[npm →](https://www.npmjs.com/package/toast-anchor)**

---

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
