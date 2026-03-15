var A=Object.defineProperty;var M=Object.getOwnPropertyDescriptor;var j=Object.getOwnPropertyNames;var Y=Object.prototype.hasOwnProperty;var q=(a,r)=>{for(var t in r)A(a,t,{get:r[t],enumerable:!0})},I=(a,r,t,e)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of j(r))!Y.call(a,o)&&o!==t&&A(a,o,{get:()=>r[o],enumerable:!(e=M(r,o))||e.enumerable});return a};var N=a=>I(A({},"__esModule",{value:!0}),a);var G={};q(G,{DEFAULTS:()=>l,ICONS:()=>u,SOUND_PROFILES:()=>F,anchoredConfirm:()=>L,anchoredToast:()=>R,configure:()=>W,createToast:()=>p,default:()=>X,dismissAll:()=>B,dismissToast:()=>y,modalConfirm:()=>E,playSound:()=>v,promiseToast:()=>T,useToast:()=>_});module.exports=N(G);var l={position:"bottom-right",duration:4e3,sound:!1,dismissOnClick:!1,showProgress:!1,maxToasts:5,toast:{bg:"#ffffff",borderColor:"#f1f5f9",borderRadius:"14px",shadow:"0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",width:"316px",padding:"13px 14px",titleColor:"#1e293b",descColor:"#64748b",titleSize:"13.5px",descSize:"12px",titleWeight:"600",iconSize:"32px",iconRadius:"50%"},theme:{success:{bg:"#10b981",light:"#d1fae5"},error:{bg:"#ef4444",light:"#fee2e2"},warning:{bg:"#f59e0b",light:"#fef3c7"},info:{bg:"#3b82f6",light:"#dbeafe"}},anchored:{bg:"#0f172a",textColor:"#ffffff",arrowColor:null,borderRadius:"10px",fontSize:"13px",fontWeight:"600",padding:"8px 14px",shadow:"0 8px 24px rgba(0,0,0,0.2)",iconSize:"15px",arrowSize:"10px"},anchoredConfirm:{bg:"#0f172a",textColor:"#f8fafc",iconColor:"#fca5a5",borderRadius:"12px",fontSize:"13px",padding:"12px 14px",shadow:"0 8px 28px rgba(0,0,0,0.22)",minWidth:"160px",arrowColor:null,arrowSize:"10px",confirmBg:"#ef4444",confirmColor:"#ffffff",confirmHoverBg:"#dc2626",cancelBg:"#1e293b",cancelColor:"#94a3b8",cancelBorder:"#334155",cancelHoverBg:"#273549",btnRadius:"8px",btnFontSize:"12px",btnFontWeight:"700",btnPadding:"6px 0"},modal:{overlayBg:"rgba(15,23,42,0.55)",overlayBlur:"5px",bg:"#ffffff",borderRadius:"20px",shadow:"0 25px 60px rgba(0,0,0,0.22)",maxWidth:"420px",padding:"24px 24px 20px",footerBg:"#f8fafc",footerBorder:"#f1f5f9",footerPadding:"14px 24px 18px",titleColor:"#0f172a",titleSize:"17px",titleWeight:"700",messageColor:"#64748b",messageSize:"14px",iconCircleSize:"48px",iconSize:"24px",confirmBg:"#ef4444",confirmColor:"#ffffff",confirmHoverBg:"#dc2626",confirmRadius:"10px",confirmPadding:"9px 22px",confirmFontSize:"13.5px",confirmWeight:"600",cancelColor:"#475569",cancelHoverBg:"#f1f5f9",cancelRadius:"10px",cancelPadding:"9px 18px",cancelFontSize:"13.5px",cancelWeight:"500"}};var u={success:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
  </svg>`,error:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
  </svg>`,warning:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
  </svg>`,info:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>`,loading:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:__toast_spin 1s linear infinite">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>`};if(typeof document<"u"&&!document.getElementById("__toast_styles")){let a=document.createElement("style");a.id="__toast_styles",a.textContent="@keyframes __toast_spin{to{transform:rotate(360deg)}}",document.head.appendChild(a)}var S=null,F={success:{wave:"sine",sf:600,ef:900,gs:.15,ge:.01,dur:.15},error:{wave:"sawtooth",sf:400,ef:200,gs:.15,ge:.01,dur:.15},warning:{wave:"triangle",sf:600,ef:380,gs:.12,ge:.01,dur:.13},info:{wave:"sine",sf:800,ef:300,gs:.15,ge:.01,dur:.1},pop:{wave:"sine",sf:700,ef:350,gs:.12,ge:.01,dur:.1}};function v(a="success",r={}){if(!(typeof window>"u"))try{S||(S=new(window.AudioContext||window.webkitAudioContext)),S.state==="suspended"&&S.resume();let t=S.createOscillator(),e=S.createGain(),o={...F[a]||F.pop,...r},s=S.currentTime;t.type=o.wave,t.frequency.setValueAtTime(o.sf,s),t.frequency.exponentialRampToValueAtTime(o.ef,s+o.dur),e.gain.setValueAtTime(o.gs,s),e.gain.exponentialRampToValueAtTime(o.ge,s+o.dur),t.connect(e),e.connect(S.destination),t.start(),t.stop(s+o.dur)}catch{}}function W(a={}){let{theme:r,toast:t,anchored:e,anchoredConfirm:o,modal:s,icons:i,...b}=a;Object.assign(l,b);let w={theme:r,toast:t,anchored:e,anchoredConfirm:o,modal:s};for(let[c,n]of Object.entries(w))if(n&&typeof n=="object")if(l[c]||(l[c]={}),c==="theme")for(let[g,h]of Object.entries(n))l.theme[g]={...l.theme[g],...h};else Object.assign(l[c],n);i&&typeof i=="object"&&Object.assign(u,i)}var P={"top-left":"top:1.5rem;left:1.5rem;flex-direction:column","top-center":"top:1.5rem;left:50%;transform:translateX(-50%);flex-direction:column","top-right":"top:1.5rem;right:1.5rem;flex-direction:column","bottom-left":"bottom:1.5rem;left:1.5rem;flex-direction:column-reverse","bottom-center":"bottom:1.5rem;left:50%;transform:translateX(-50%);flex-direction:column-reverse","bottom-right":"bottom:1.5rem;right:1.5rem;flex-direction:column-reverse"};function H(a){if(typeof document>"u")return null;let r=`__toast_c_${a.replace(/-/g,"_")}`,t=document.getElementById(r);if(!t){t=document.createElement("div"),t.id=r;let e=P[a]||P["bottom-right"];t.setAttribute("style",`position:fixed;z-index:9999;display:flex;gap:10px;pointer-events:none;${e}`),document.body.appendChild(t)}return t}var D=0,k=new Map;function y(a){let r=k.get(a);if(!r)return;clearTimeout(r.timer);let t=r.el;t.style.opacity="0",t.style.transform="scale(0.9) translateY(6px)";let e=t.offsetHeight;t.style.maxHeight=e+"px",setTimeout(()=>{t.style.transition="all 0.32s ease-out",t.style.maxHeight="0",t.style.padding="0 14px",t.style.overflow="hidden"},60),setTimeout(()=>{t.remove(),k.delete(a)},420)}function B(){[...k.keys()].forEach(y)}function p(a,r={}){var C,$;if(typeof document>"u")return()=>{};let t=l.toast,e={type:"success",position:l.position,duration:l.duration,sound:l.sound,dismissOnClick:l.dismissOnClick,showProgress:l.showProgress,description:null,icon:null,action:null,id:null,bg:t.bg,borderColor:t.borderColor,borderRadius:t.borderRadius,shadow:t.shadow,width:t.width,padding:t.padding,titleColor:t.titleColor,descColor:t.descColor,titleSize:t.titleSize,descSize:t.descSize,titleWeight:t.titleWeight,iconBg:null,iconColor:null,iconSize:t.iconSize,iconRadius:t.iconRadius,progressColor:null,progressHeight:"3px",actionColor:null,...r},o=e.type,s={...l.theme[o]||l.theme.success},i=e.icon??u[o]??u.success,b=e.id??`__toast_${++D}`,w=e.iconBg??s.light,c=e.iconColor??s.bg,n=e.progressColor??s.bg,g=e.actionColor??s.bg;e.sound&&v(o);let h=H(e.position);if(!h)return()=>{};k.size>=l.maxToasts&&y(k.keys().next().value);let d=document.createElement("div");d.id=b,d.setAttribute("style",["pointer-events:auto","position:relative","overflow:hidden","display:flex","align-items:flex-start","gap:12px",`width:${e.width}`,`background:${e.bg}`,`border:1px solid ${e.borderColor}`,`padding:${e.padding}`,`border-radius:${e.borderRadius}`,`box-shadow:${e.shadow}`,"transition:all 0.38s cubic-bezier(0.34,1.56,0.64,1)","opacity:0","transform:scale(0.9) translateY(10px)",`cursor:${e.dismissOnClick?"pointer":"default"}`].join(";")),d.innerHTML=`
    <div style="
      display:flex;align-items:center;justify-content:center;
      width:${e.iconSize};height:${e.iconSize};
      border-radius:${e.iconRadius};
      flex-shrink:0;
      background:${w};
      color:${c}
    ">
      <div style="width:16px;height:16px;display:flex">${i}</div>
    </div>

    <div style="flex:1;min-width:0;padding-top:2px">
      <p style="
        font-size:${e.titleSize};
        font-weight:${e.titleWeight};
        color:${e.titleColor};
        line-height:1.4;margin:0
      ">${a}</p>

      ${e.description?`
        <p style="
          font-size:${e.descSize};
          color:${e.descColor};
          margin:3px 0 0;line-height:1.5
        ">${e.description}</p>
      `:""}

      ${e.action?`
        <button data-toast-action style="
          margin-top:7px;
          font-size:12px;font-weight:700;
          color:${g};
          background:none;border:none;cursor:pointer;padding:0;display:block
        ">${e.action.label}</button>
      `:""}
    </div>

    <button data-toast-close style="
      flex-shrink:0;background:none;border:none;cursor:pointer;
      color:#cbd5e1;padding:1px;margin-top:1px;line-height:0;
      transition:color 0.15s
    " title="Dismiss">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    ${e.showProgress&&e.duration>0?`
      <div data-toast-bar style="
        position:absolute;bottom:0;left:0;
        height:${e.progressHeight};
        border-radius:0 0 ${e.borderRadius} ${e.borderRadius};
        background:${n};
        width:100%;
        transition:width ${e.duration}ms linear
      "></div>
    `:""}
  `,h.appendChild(d);let m=()=>y(b),f=null;return requestAnimationFrame(()=>requestAnimationFrame(()=>{if(d.style.opacity="1",d.style.transform="scale(1) translateY(0)",e.showProgress&&e.duration>0){let x=d.querySelector("[data-toast-bar]");x&&(x.style.width="0%")}})),e.duration>0&&(f=setTimeout(m,e.duration)),d.addEventListener("mouseenter",()=>{f&&clearTimeout(f)}),d.addEventListener("mouseleave",()=>{e.duration>0&&(f=setTimeout(m,Math.min(e.duration,1500)))}),(C=d.querySelector("[data-toast-close]"))==null||C.addEventListener("click",x=>{x.stopPropagation(),m()}),e.dismissOnClick&&d.addEventListener("click",m),($=d.querySelector("[data-toast-action]"))==null||$.addEventListener("click",x=>{var z,O;x.stopPropagation(),(O=(z=e.action)==null?void 0:z.onClick)==null||O.call(z),m()}),k.set(b,{el:d,timer:f}),m}var U=0;function T(a,r={},t={}){let{loading:e="Loading\u2026",success:o="Done!",error:s="Something went wrong"}=r,{loadingOptions:i={},successOptions:b={},errorOptions:w={},...c}=t,n=`__toast_p${++U}`;return p(e,{...c,...i,type:"info",duration:0,icon:u.loading,id:n}),Promise.resolve(a).then(g=>{y(n);let h=typeof o=="function"?o(g):o;p(h,{...c,...b,type:"success"})}).catch(g=>{y(n);let h=typeof s=="function"?s(g):s;p(h,{...c,...w,type:"error"})}),()=>y(n)}function R(a,r,t={}){if(typeof document>"u"||!r)return()=>{};let e=l.anchored,o={type:"success",duration:2500,sound:l.sound,icon:null,bg:e.bg,textColor:e.textColor,arrowColor:e.arrowColor,borderRadius:e.borderRadius,fontSize:e.fontSize,fontWeight:e.fontWeight,padding:e.padding,shadow:e.shadow,iconSize:e.iconSize,iconColor:null,arrowSize:e.arrowSize,offsetY:13,...t},s=l.theme[o.type]||l.theme.success,i=o.icon??u[o.type],b=o.iconColor??s.bg,w=o.arrowColor??o.bg;o.sound&&v(o.type);let c=document.createElement("div");c.setAttribute("style",["position:absolute","z-index:9998",`padding:${o.padding}`,`background:${o.bg}`,`color:${o.textColor}`,`font-size:${o.fontSize}`,`font-weight:${o.fontWeight}`,`border-radius:${o.borderRadius}`,`box-shadow:${o.shadow}`,"pointer-events:none","white-space:nowrap","transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1)","opacity:0","transform:scale(0.85) translateY(8px)"].join(";")),c.innerHTML=`
    <div style="display:flex;align-items:center;gap:7px">
      <div style="width:${o.iconSize};height:${o.iconSize};display:flex;color:${b}">
        ${i}
      </div>
      <span>${a}</span>
    </div>
    <div style="
      position:absolute;bottom:-${parseInt(o.arrowSize)/2}px;left:50%;
      transform:translateX(-50%) rotate(45deg);
      width:${o.arrowSize};height:${o.arrowSize};
      background:${w}
    "></div>
  `,document.body.appendChild(c);let n=r.getBoundingClientRect(),{height:g,width:h}=c.getBoundingClientRect();c.style.top=`${n.top+window.scrollY-g-o.offsetY}px`,c.style.left=`${n.left+window.scrollX+n.width/2-h/2}px`,requestAnimationFrame(()=>requestAnimationFrame(()=>{c.style.opacity="1",c.style.transform="scale(1) translateY(0)"}));let d=()=>{c.style.opacity="0",c.style.transform="scale(0.9) translateY(4px)",setTimeout(()=>c.remove(),300)},m=null;return o.duration>0&&(m=setTimeout(d,o.duration)),d}function L(a,r,t,e,o={}){if(typeof document>"u"||!r)return;let s=l.anchoredConfirm,i={confirmLabel:"Yes",cancelLabel:"No",sound:l.sound,icon:null,bg:s.bg,textColor:s.textColor,iconColor:s.iconColor,borderRadius:s.borderRadius,fontSize:s.fontSize,padding:s.padding,shadow:s.shadow,minWidth:s.minWidth,arrowColor:s.arrowColor,arrowSize:s.arrowSize,offsetY:13,confirmBg:s.confirmBg,confirmColor:s.confirmColor,confirmHoverBg:s.confirmHoverBg,cancelBg:s.cancelBg,cancelColor:s.cancelColor,cancelBorder:s.cancelBorder,cancelHoverBg:s.cancelHoverBg,btnRadius:s.btnRadius,btnFontSize:s.btnFontSize,btnFontWeight:s.btnFontWeight,btnPadding:s.btnPadding,...o},b=i.icon??u.warning,w=i.arrowColor??i.bg;i.sound&&v("warning");let c=document.createElement("div");c.setAttribute("style",["position:absolute","z-index:9998",`padding:${i.padding}`,`background:${i.bg}`,`color:${i.textColor}`,`font-size:${i.fontSize}`,"font-weight:600",`border-radius:${i.borderRadius}`,`box-shadow:${i.shadow}`,"pointer-events:auto",`min-width:${i.minWidth}`,"transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1)","opacity:0","transform:scale(0.85) translateY(8px)"].join(";")),c.innerHTML=`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;color:${i.iconColor}">
      <div style="width:15px;height:15px;flex-shrink:0">${b}</div>
      <span style="font-size:${i.fontSize};color:${i.textColor}">${a}</span>
    </div>

    <div style="display:flex;gap:7px">
      <button data-cancel style="
        flex:1;
        padding:${i.btnPadding};
        background:${i.cancelBg};
        border:1px solid ${i.cancelBorder};
        color:${i.cancelColor};
        border-radius:${i.btnRadius};
        cursor:pointer;
        font-weight:${i.btnFontWeight};
        font-size:${i.btnFontSize};
        transition:all 0.15s
      ">${i.cancelLabel}</button>

      <button data-confirm style="
        flex:1;
        padding:${i.btnPadding};
        background:${i.confirmBg};
        border:none;
        color:${i.confirmColor};
        border-radius:${i.btnRadius};
        cursor:pointer;
        font-weight:${i.btnFontWeight};
        font-size:${i.btnFontSize};
        transition:all 0.15s
      ">${i.confirmLabel}</button>
    </div>

    <div style="
      position:absolute;
      bottom:-${parseInt(i.arrowSize)/2}px;
      left:50%;
      transform:translateX(-50%) rotate(45deg);
      width:${i.arrowSize};height:${i.arrowSize};
      background:${w}
    "></div>
  `,document.body.appendChild(c);let n=r.getBoundingClientRect(),{height:g,width:h}=c.getBoundingClientRect();c.style.top=`${n.top+window.scrollY-g-i.offsetY}px`,c.style.left=`${n.left+window.scrollX+n.width/2-h/2}px`,requestAnimationFrame(()=>requestAnimationFrame(()=>{c.style.opacity="1",c.style.transform="scale(1) translateY(0)"}));let d=()=>{c.style.opacity="0",c.style.transform="scale(0.9) translateY(4px)",setTimeout(()=>c.remove(),280)},m=c.querySelector("[data-confirm]"),f=c.querySelector("[data-cancel]");m.addEventListener("mouseenter",()=>{m.style.background=i.confirmHoverBg}),m.addEventListener("mouseleave",()=>{m.style.background=i.confirmBg}),f.addEventListener("mouseenter",()=>{f.style.background=i.cancelHoverBg}),f.addEventListener("mouseleave",()=>{f.style.background=i.cancelBg}),m.onclick=()=>{d(),t==null||t()},f.onclick=()=>{d(),e==null||e()}}function E(a,r,t={}){return new Promise(e=>{if(typeof document>"u")return e(!1);let o=l.modal,s=(t.confirmVariant??"danger")==="danger",i=s?"#ef4444":"#3b82f6",b=s?"#dc2626":"#2563eb",w=s?"#fee2e2":"#dbeafe",c=s?"#ef4444":"#3b82f6",n={confirmLabel:"Confirm",cancelLabel:"Cancel",confirmVariant:"danger",icon:null,sound:l.sound,closeOnOverlayClick:!0,closeOnEscape:!0,enterToConfirm:!0,overlayBg:o.overlayBg,overlayBlur:o.overlayBlur,bg:o.bg,borderRadius:o.borderRadius,shadow:o.shadow,maxWidth:o.maxWidth,border:"none",padding:o.padding,footerBg:o.footerBg,footerBorder:o.footerBorder,footerPadding:o.footerPadding,titleColor:o.titleColor,titleSize:o.titleSize,titleWeight:o.titleWeight,messageColor:o.messageColor,messageSize:o.messageSize,iconBg:w,iconColor:c,iconCircleSize:o.iconCircleSize,iconSize:o.iconSize,iconCircleRadius:"50%",confirmBg:i,confirmColor:o.confirmColor,confirmHoverBg:b,confirmRadius:o.confirmRadius,confirmPadding:o.confirmPadding,confirmFontSize:o.confirmFontSize,confirmWeight:o.confirmWeight,confirmShadow:null,cancelColor:o.cancelColor,cancelHoverBg:o.cancelHoverBg,cancelRadius:o.cancelRadius,cancelPadding:o.cancelPadding,cancelFontSize:o.cancelFontSize,cancelWeight:o.cancelWeight,cancelBg:"transparent",cancelBorder:"none",...t},g=n.icon??u.warning,h=n.confirmShadow??`0 2px 8px ${n.confirmBg}55`;n.sound&&v("warning");let d=document.createElement("div");d.setAttribute("style",["position:fixed","inset:0","z-index:99999","display:flex","align-items:center","justify-content:center","padding:16px",`background:${n.overlayBg}`,`backdrop-filter:blur(${n.overlayBlur})`,"-webkit-backdrop-filter:blur("+n.overlayBlur+")","transition:opacity 0.25s ease","opacity:0"].join(";")),d.innerHTML=`
      <div data-modal-box style="
        width:100%;
        max-width:${n.maxWidth};
        background:${n.bg};
        border-radius:${n.borderRadius};
        border:${n.border};
        box-shadow:${n.shadow};
        overflow:hidden;
        transition:all 0.32s cubic-bezier(0.34,1.56,0.64,1);
        transform:scale(0.9) translateY(18px)
      ">
        <!-- Body -->
        <div style="padding:${n.padding}">
          <div style="
            width:${n.iconCircleSize};
            height:${n.iconCircleSize};
            border-radius:${n.iconCircleRadius};
            background:${n.iconBg};
            display:flex;align-items:center;justify-content:center;
            margin-bottom:16px;
            color:${n.iconColor}
          ">
            <div style="width:${n.iconSize};height:${n.iconSize}">${g}</div>
          </div>

          <h3 style="
            font-size:${n.titleSize};
            font-weight:${n.titleWeight};
            color:${n.titleColor};
            margin:0 0 8px;line-height:1.3
          ">${a}</h3>

          <p style="
            font-size:${n.messageSize};
            color:${n.messageColor};
            margin:0;line-height:1.65
          ">${r}</p>
        </div>

        <!-- Footer -->
        <div style="
          background:${n.footerBg};
          padding:${n.footerPadding};
          display:flex;gap:10px;justify-content:flex-end;
          border-top:1px solid ${n.footerBorder}
        ">
          <button data-modal-cancel style="
            padding:${n.cancelPadding};
            font-size:${n.cancelFontSize};
            font-weight:${n.cancelWeight};
            color:${n.cancelColor};
            background:${n.cancelBg};
            border:${n.cancelBorder};
            border-radius:${n.cancelRadius};
            cursor:pointer;
            transition:all 0.15s
          ">${n.cancelLabel}</button>

          <button data-modal-confirm style="
            padding:${n.confirmPadding};
            font-size:${n.confirmFontSize};
            font-weight:${n.confirmWeight};
            color:${n.confirmColor};
            background:${n.confirmBg};
            border:none;
            border-radius:${n.confirmRadius};
            cursor:pointer;
            box-shadow:${h};
            transition:all 0.15s
          ">${n.confirmLabel}</button>
        </div>
      </div>
    `,document.body.appendChild(d);let m=d.querySelector("[data-modal-box]"),f=d.querySelector("[data-modal-confirm]"),C=d.querySelector("[data-modal-cancel]");f.addEventListener("mouseenter",()=>{f.style.background=n.confirmHoverBg,f.style.transform="translateY(-1px)"}),f.addEventListener("mouseleave",()=>{f.style.background=n.confirmBg,f.style.transform=""}),C.addEventListener("mouseenter",()=>{C.style.background=n.cancelHoverBg}),C.addEventListener("mouseleave",()=>{C.style.background=n.cancelBg}),requestAnimationFrame(()=>{d.style.opacity="1",m.style.transform="scale(1) translateY(0)"});let $=x=>{d.style.opacity="0",m.style.transform="scale(0.9) translateY(16px)",setTimeout(()=>{d.remove(),e(x)},280)};if(f.onclick=()=>$(!0),C.onclick=()=>$(!1),n.closeOnOverlayClick&&d.addEventListener("click",x=>{x.target===d&&$(!1)}),n.closeOnEscape||n.enterToConfirm){let x=O=>{n.closeOnEscape&&O.key==="Escape"&&($(!1),z()),n.enterToConfirm&&O.key==="Enter"&&($(!0),z())},z=()=>document.removeEventListener("keydown",x);document.addEventListener("keydown",x)}})}function _(a={}){let r=(t={})=>({...a,...t});return{success:(t,e)=>p(t,{...r(e),type:"success"}),error:(t,e)=>p(t,{...r(e),type:"error"}),warning:(t,e)=>p(t,{...r(e),type:"warning"}),info:(t,e)=>p(t,{...r(e),type:"info"}),notify:(t,e)=>p(t,r(e)),promise:(t,e,o)=>T(t,e,r(o)),anchored:(t,e,o)=>R(t,e,r(o)),anchoredConfirm:(t,e,o,s,i)=>L(t,e,o,s,r(i)),modal:(t,e,o)=>E(t,e,r(o)),dismiss:y,dismissAll:B}}var V={success:(a,r)=>p(a,{type:"success",...r}),error:(a,r)=>p(a,{type:"error",...r}),warning:(a,r)=>p(a,{type:"warning",...r}),info:(a,r)=>p(a,{type:"info",...r}),notify:p,promise:T,anchored:R,anchoredConfirm:L,modal:E,dismiss:y,dismissAll:B,configure:W,ICONS:u},X=V;0&&(module.exports={DEFAULTS,ICONS,SOUND_PROFILES,anchoredConfirm,anchoredToast,configure,createToast,dismissAll,dismissToast,modalConfirm,playSound,promiseToast,useToast});
