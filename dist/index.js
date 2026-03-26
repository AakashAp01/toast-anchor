var D=Object.defineProperty;var $e=Object.getOwnPropertyDescriptor;var we=Object.getOwnPropertyNames;var ve=Object.prototype.hasOwnProperty;var ke=(i,r)=>{for(var n in r)D(i,n,{get:r[n],enumerable:!0})},Ce=(i,r,n,o)=>{if(r&&typeof r=="object"||typeof r=="function")for(let t of we(r))!ve.call(i,t)&&t!==n&&D(i,t,{get:()=>r[t],enumerable:!(o=$e(r,t))||o.enumerable});return i};var Se=i=>Ce(D({},"__esModule",{value:!0}),i);var Ae={};ke(Ae,{DEFAULTS:()=>m,ICONS:()=>g,anchoredConfirm:()=>_,anchoredToast:()=>W,configure:()=>O,createToast:()=>u,default:()=>Ee,dismissAll:()=>E,dismissToast:()=>y,modalConfirm:()=>M,promiseToast:()=>A,toast:()=>ae,useToast:()=>se});module.exports=Se(Ae);if(typeof document<"u"&&!document.getElementById("__tk_css")){let i=document.createElement("style");i.id="__tk_css",i.textContent="@keyframes __tk_spin{to{transform:rotate(360deg)}}",document.head.appendChild(i)}var g={success:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>',error:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>',warning:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',loading:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:__tk_spin 1s linear infinite"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>'};var m={position:"bottom-right",duration:4e3,sound:!1,dismissOnClick:!1,showProgress:!1,maxToasts:5,theme:{success:{bg:"#10b981",light:"#d1fae5"},error:{bg:"#ef4444",light:"#fee2e2"},warning:{bg:"#f59e0b",light:"#fef3c7"},info:{bg:"#3b82f6",light:"#dbeafe"}},toast:{bg:"#ffffff",color:"#1e293b",descColor:"#64748b",borderColor:"#f1f5f9",borderWidth:"1px",borderRadius:"14px",shadow:"0 4px 24px rgba(0,0,0,0.08),0 1px 4px rgba(0,0,0,0.04)",padding:"13px 14px",width:"316px",fontSize:"13.5px",fontWeight:"600",descFontSize:"12px",descFontWeight:"400",showIcon:!0,showClose:!0,closeColor:"#cbd5e1",closeHoverColor:"#94a3b8",progressH:"3px",progressRadius:"0 0 14px 14px",iconSize:"32px",iconRadius:"50%",actionColor:null,actionFontSize:"12px"},anchored:{position:"top",bg:"#0f172a",color:"#ffffff",borderColor:"transparent",borderWidth:"0px",borderRadius:"10px",shadow:"0 8px 24px rgba(0,0,0,0.2)",padding:"8px 14px",fontSize:"13px",fontWeight:"600",showIcon:!0,arrowSize:10,showArrow:!0,gap:13},anchoredConfirm:{position:"top",bg:"#0f172a",color:"#f8fafc",borderColor:"transparent",borderWidth:"0px",borderRadius:"12px",shadow:"0 8px 28px rgba(0,0,0,0.22)",padding:"12px 14px",fontSize:"13px",minWidth:"160px",showIcon:!0,confirmBg:"#ef4444",confirmColor:"#ffffff",confirmHoverBg:"#dc2626",cancelBg:"#1e293b",cancelColor:"#94a3b8",cancelHoverBg:"#334155",cancelBorder:"#334155",btnRadius:"8px",btnFontSize:"12px",btnFontWeight:"700",btnPadding:"6px 0",arrowSize:10,showArrow:!0,gap:13},modal:{position:"center",overlayBg:"rgba(15,23,42,0.55)",overlayBlur:"5px",bg:"#ffffff",borderColor:"transparent",borderWidth:"0px",borderRadius:"20px",shadow:"0 25px 60px rgba(0,0,0,0.22)",maxWidth:"420px",padding:"24px",footerBg:"#f8fafc",footerBorder:"#f1f5f9",footerPaddingV:"14px",footerPaddingVB:"18px",titleColor:"#0f172a",titleSize:"17px",titleWeight:"700",titleMargin:"0 0 8px",messageColor:"#64748b",messageSize:"14px",iconSize:"48px",iconRadius:"50%",iconBg:null,iconColor:null,confirmBg:null,confirmColor:"#ffffff",confirmHoverBg:null,confirmRadius:"10px",confirmSize:"13.5px",confirmWeight:"600",confirmPadding:"9px 22px",cancelColor:"#475569",cancelHoverBg:"#f1f5f9",cancelRadius:"10px",cancelSize:"13.5px",cancelWeight:"500",cancelPadding:"9px 18px",cancelBg:"transparent",cancelBorder:"none"}};function O(i={}){let r=["toast","anchored","anchoredConfirm","modal","theme"];for(let[n,o]of Object.entries(i))if(r.includes(n)&&o&&typeof o=="object")if(n==="theme")for(let[t,e]of Object.entries(o))m.theme[t]={...m.theme[t],...e};else Object.assign(m[n],o);else m[n]=o}var S=null,re={success:{wave:"sine",sf:600,ef:900,gs:.15,ge:.01,dur:.15},error:{wave:"sawtooth",sf:400,ef:200,gs:.15,ge:.01,dur:.15},warning:{wave:"triangle",sf:600,ef:380,gs:.12,ge:.01,dur:.13},info:{wave:"sine",sf:800,ef:300,gs:.15,ge:.01,dur:.1},pop:{wave:"sine",sf:700,ef:350,gs:.12,ge:.01,dur:.1}};function T(i="success"){if(!(typeof window>"u"))try{S||(S=new(window.AudioContext||window.webkitAudioContext)),S.state==="suspended"&&S.resume();let r=re[i]||re.pop,n=S.createOscillator(),o=S.createGain(),t=S.currentTime;n.type=r.wave,n.frequency.setValueAtTime(r.sf,t),n.frequency.exponentialRampToValueAtTime(r.ef,t+r.dur),o.gain.setValueAtTime(r.gs,t),o.gain.exponentialRampToValueAtTime(r.ge,t+r.dur),n.connect(o),o.connect(S.destination),n.start(),n.stop(t+r.dur)}catch{}}var ie={"top-left":"top:1.5rem;left:1.5rem;flex-direction:column","top-center":"top:1.5rem;left:50%;transform:translateX(-50%);flex-direction:column","top-right":"top:1.5rem;right:1.5rem;flex-direction:column","middle-left":"top:50%;left:1.5rem;transform:translateY(-50%);flex-direction:column","middle-center":"top:50%;left:50%;transform:translate(-50%,-50%);flex-direction:column","middle-right":"top:50%;right:1.5rem;transform:translateY(-50%);flex-direction:column","bottom-left":"bottom:1.5rem;left:1.5rem;flex-direction:column-reverse","bottom-center":"bottom:1.5rem;left:50%;transform:translateX(-50%);flex-direction:column-reverse","bottom-right":"bottom:1.5rem;right:1.5rem;flex-direction:column-reverse"},N=new Map,L=new Map,Te=0;function ze(i){if(typeof document>"u")return null;if(N.has(i))return N.get(i);let r=document.createElement("div");return r.id=`__tk_c_${i.replace(/-/g,"_")}`,r.setAttribute("style","position:fixed;z-index:9999;display:flex;gap:10px;pointer-events:none;"+(ie[i]||ie["bottom-right"])),document.body.appendChild(r),N.set(i,r),r}function y(i){let r=L.get(i);if(!r)return;clearTimeout(r.timer);let n=r.el;n.style.opacity="0",n.style.transform="scale(0.9) translateY(6px)",n.style.maxHeight=n.offsetHeight+"px",setTimeout(()=>{n.style.transition="all 0.32s ease-out",n.style.maxHeight="0",n.style.padding="0",n.style.margin="0",n.style.overflow="hidden"},60),setTimeout(()=>{n.remove(),L.delete(i)},420)}function E(){[...L.keys()].forEach(y)}function Be(){return`__tk_${++Te}`}function u(i,r={}){var oe,te;if(typeof document>"u")return()=>{};let n=m,o=n.toast,t={type:"success",position:n.position,duration:n.duration,sound:n.sound,dismissOnClick:n.dismissOnClick,showProgress:n.showProgress,description:null,icon:null,action:null,id:null,showIcon:void 0,showClose:void 0,...r},e=t.type,c=n.theme[e]||n.theme.success,a=$=>t[$]!==void 0?t[$]:o[$],f=a("bg"),d=a("color"),s=a("descColor"),l=a("borderColor"),p=a("borderWidth"),b=a("borderRadius"),w=a("shadow"),H=a("padding"),q=a("width"),h=a("fontSize"),I=a("fontWeight"),v=a("descFontSize"),z=a("descFontWeight"),k=a("closeColor"),F=a("closeHoverColor"),C=a("progressH"),ce=a("progressRadius"),de=t.progressColor||c.bg,le=t.iconBg||c.light,fe=t.iconColor||c.bg,j=a("iconSize"),pe=a("iconRadius"),me=t.actionColor||c.bg,ue=a("actionFontSize"),ge=t.icon||g[e]||g.success,Y=t.id||Be(),be=t.showIcon!==void 0?t.showIcon:o.showIcon!==void 0?o.showIcon:!0,he=t.showClose!==void 0?t.showClose:o.showClose!==void 0?o.showClose:!0,Z=!!(t.description||t.action),xe=Z?"align-items:flex-start":"align-items:center",ye=Z?"padding-top:2px":"";t.sound&&T(e);let ee=ze(t.position);if(!ee)return()=>{};L.size>=n.maxToasts&&y(L.keys().next().value);let x=document.createElement("div");x.id=Y,x.setAttribute("style",["pointer-events:auto","position:relative","overflow:hidden","display:flex",xe,"gap:12px",`width:${q}`,`background:${f}`,`border:${p} solid ${l}`,`padding:${H}`,`border-radius:${b}`,`box-shadow:${w}`,"transition:all 0.38s cubic-bezier(0.34,1.56,0.64,1)","opacity:0","transform:scale(0.9) translateY(10px)",`cursor:${t.dismissOnClick?"pointer":"default"}`,"box-sizing:border-box"].join(";")),x.innerHTML=`
    ${be?`<div style="display:flex;align-items:center;justify-content:center;width:${j};height:${j};min-width:${j};border-radius:${pe};background:${le};color:${fe};flex-shrink:0">
      <div style="width:16px;height:16px;display:flex">${ge}</div>
    </div>`:""}
    <div style="flex:1;min-width:0;${ye}">
      <p style="font-size:${h};font-weight:${I};color:${d};line-height:1.4;margin:0">${i}</p>
      ${t.description?`<p style="font-size:${v};font-weight:${z};color:${s};margin:3px 0 0;line-height:1.5">${t.description}</p>`:""}
      ${t.action?`<button data-tk-action style="margin-top:7px;font-size:${ue};font-weight:700;color:${me};background:none;border:none;cursor:pointer;padding:0;display:block;line-height:1">${t.action.label}</button>`:""}
    </div>
    ${he?`<button data-tk-close
      style="flex-shrink:0;background:none;border:none;cursor:pointer;color:${k};padding:2px;line-height:0;border-radius:4px;transition:color 0.15s"
      title="Dismiss"
      onmouseenter="this.style.color='${F}'"
      onmouseleave="this.style.color='${k}'"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>`:""}
    ${t.showProgress&&t.duration>0?`<div data-tk-bar style="position:absolute;bottom:0;left:0;height:${C};border-radius:${ce};background:${de};width:100%;transition:width ${t.duration}ms linear"></div>`:""}
  `.trim(),ee.appendChild(x),requestAnimationFrame(()=>requestAnimationFrame(()=>{if(x.style.opacity="1",x.style.transform="scale(1) translateY(0)",t.showProgress&&t.duration>0){let $=x.querySelector("[data-tk-bar]");$&&($.style.width="0%")}}));let B=()=>y(Y),R=null;return t.duration>0&&(R=setTimeout(B,t.duration)),x.addEventListener("mouseenter",()=>clearTimeout(R)),x.addEventListener("mouseleave",()=>{t.duration>0&&(R=setTimeout(B,Math.min(t.duration,1500)))}),(oe=x.querySelector("[data-tk-close]"))==null||oe.addEventListener("click",$=>{$.stopPropagation(),B()}),t.dismissOnClick&&x.addEventListener("click",B),(te=x.querySelector("[data-tk-action]"))==null||te.addEventListener("click",$=>{var P,ne;$.stopPropagation(),(ne=(P=t.action)==null?void 0:P.onClick)==null||ne.call(P),B()}),L.set(Y,{el:x,timer:R}),B}var Le=0;function A(i,r={},n={}){let{loading:o="Loading\u2026",success:t="Done!",error:e="Something went wrong"}=r,c=`__tk_p${++Le}`;return u(o,{type:"info",duration:0,icon:g.loading,sound:!1,id:c,...n}),Promise.resolve(i).then(a=>{y(c);let f=typeof t=="function"?t(a):t;u(f,{type:"success",...n})}).catch(a=>{y(c);let f=typeof e=="function"?e(a):e;u(f,{type:"error",...n})}),()=>y(c)}function U(i,r,n,o){let t=r.getBoundingClientRect(),e=i.offsetWidth,c=i.offsetHeight,a=window.scrollX,f=window.scrollY,d,s;switch(n){case"bottom":d=t.bottom+f+o,s=t.left+a+t.width/2-e/2;break;case"left":d=t.top+f+t.height/2-c/2,s=t.left+a-e-o;break;case"right":d=t.top+f+t.height/2-c/2,s=t.right+a+o;break;default:d=t.top+f-c-o,s=t.left+a+t.width/2-e/2}i.style.top=`${d}px`,i.style.left=`${s}px`}function X(i,r,n,o){let t=i.offsetWidth,e=i.offsetHeight,c=r.getBoundingClientRect(),a=document.documentElement.clientWidth,f=document.documentElement.clientHeight,d={top:c.top,bottom:f-c.bottom,left:c.left,right:a-c.right},s={top:e+o,bottom:e+o,left:t+o,right:t+o};if(d[n]>=s[n])return n;let l={top:"bottom",bottom:"top",left:"right",right:"left"};if(d[l[n]]>=s[l[n]])return l[n];let p=n==="top"||n==="bottom"?["right","left"]:["bottom","top"];for(let b of p)if(d[b]>=s[b])return b;return n}function K(i,r,n,o,t){let e=r/2,c=t&&t!=="0px"?t:"0px",a=o||"transparent",f=c!=="0px",d="";if(f){let l=`${c} solid ${a}`,p=`${c} solid transparent`;switch(i){case"top":d=`border-top:${p};border-right:${l};border-bottom:${l};border-left:${p};`;break;case"bottom":d=`border-top:${l};border-right:${p};border-bottom:${p};border-left:${l};`;break;case"left":d=`border-top:${l};border-right:${l};border-bottom:${p};border-left:${p};`;break;case"right":d=`border-top:${p};border-right:${p};border-bottom:${l};border-left:${l};`;break}}let s=`${d}position:absolute;width:${r}px;height:${r}px;background:${n};transform:rotate(45deg);`;switch(i){case"bottom":return`${s}top:${-e}px;left:50%;margin-left:${-e}px`;case"left":return`${s}top:50%;right:${-e}px;margin-top:${-e}px`;case"right":return`${s}top:50%;left:${-e}px;margin-top:${-e}px`;default:return`${s}bottom:${-e}px;left:50%;margin-left:${-e}px`}}function G(i){switch(i){case"bottom":return"scale(0.88) translateY(-8px)";case"left":return"scale(0.88) translateX(8px)";case"right":return"scale(0.88) translateX(-8px)";default:return"scale(0.88) translateY(8px)"}}function J(i){switch(i){case"bottom":return"scale(0.9) translateY(-4px)";case"left":return"scale(0.9) translateX(4px)";case"right":return"scale(0.9) translateX(-4px)";default:return"scale(0.9) translateY(4px)"}}var V=new WeakMap;function W(i,r,n={}){if(typeof document>"u"||!r)return()=>{};let o={type:"success",duration:2500,sound:m.sound,icon:null,...m.anchored,...n},t=m.theme[o.type]||m.theme.success,e=o.icon||g[o.type],c=o.position||"top",a=o.gap!==void 0?o.gap:8;o.sound&&T(o.type);let f=V.get(r);f&&f();let d=o.showIcon!==void 0?o.showIcon:!0,s=document.createElement("div");s.setAttribute("style",["position:absolute","z-index:9998",`padding:${o.padding}`,`background:${o.bg}`,`color:${o.color}`,`font-size:${o.fontSize}`,`font-weight:${o.fontWeight}`,`border-radius:${o.borderRadius}`,`border:${o.borderWidth} solid ${o.borderColor}`,`box-shadow:${o.shadow}`,"pointer-events:none","white-space:nowrap","transition:opacity 0.3s ease,transform 0.3s cubic-bezier(0.34,1.56,0.64,1)","opacity:0"].join(";")),s.innerHTML=`
    <div style="display:flex;align-items:center;gap:7px">
      ${d?`<div style="width:15px;height:15px;display:flex;flex-shrink:0;color:${t.bg}">${e}</div>`:""}
      <span>${i}</span>
    </div>
  `.trim(),document.body.appendChild(s);let l=X(s,r,c,a);o.showArrow&&s.insertAdjacentHTML("beforeend",`<div style="${K(l,o.arrowSize,o.bg,o.borderColor,o.borderWidth)}"></div>`),s.style.transform=G(l),U(s,r,l,a),requestAnimationFrame(()=>requestAnimationFrame(()=>{s.style.opacity="1",s.style.transform="scale(1) translate(0,0)"}));let p=()=>{V.delete(r),s.style.opacity="0",s.style.transform=J(l),setTimeout(()=>s.remove(),300)};return V.set(r,p),o.duration>0&&setTimeout(p,o.duration),p}var Q=new WeakMap;function _(i,r,n,o,t={}){if(typeof document>"u"||!r)return;let e={confirmLabel:"Yes",cancelLabel:"No",sound:m.sound,...m.anchoredConfirm,...t},c=e.position||"top",a=e.gap!==void 0?e.gap:8;e.sound&&T("warning");let f=Q.get(r);f&&f();let d=e.showIcon!==void 0?e.showIcon:!0,s=document.createElement("div");s.setAttribute("style",["position:absolute","z-index:9998",`padding:${e.padding}`,`background:${e.bg}`,`color:${e.color}`,`font-size:${e.fontSize}`,`border-radius:${e.borderRadius}`,`border:${e.borderWidth} solid ${e.borderColor}`,`box-shadow:${e.shadow}`,`min-width:${e.minWidth}`,"pointer-events:auto","transition:opacity 0.3s ease,transform 0.3s cubic-bezier(0.34,1.56,0.64,1)","opacity:0"].join(";")),s.innerHTML=`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
      ${d?`<div style="width:15px;height:15px;flex-shrink:0;color:#fca5a5">${g.warning}</div>`:""}
      <span>${i}</span>
    </div>
    <div style="display:flex;gap:7px">
      <button data-cancel style="
        flex:1;padding:${e.btnPadding};
        background:${e.cancelBg};
        border:1px solid ${e.cancelBorder};
        color:${e.cancelColor};
        border-radius:${e.btnRadius};
        cursor:pointer;
        font-weight:${e.btnFontWeight};
        font-size:${e.btnFontSize};
        transition:background 0.15s,color 0.15s;
      ">${e.cancelLabel}</button>
      <button data-confirm style="
        flex:1;padding:${e.btnPadding};
        background:${e.confirmBg};
        border:none;
        color:${e.confirmColor};
        border-radius:${e.btnRadius};
        cursor:pointer;
        font-weight:${e.btnFontWeight};
        font-size:${e.btnFontSize};
        transition:background 0.15s;
      ">${e.confirmLabel}</button>
    </div>
  `.trim(),document.body.appendChild(s);let l=X(s,r,c,a);e.showArrow!==!1&&s.insertAdjacentHTML("beforeend",`<div style="${K(l,e.arrowSize||8,e.bg,e.borderColor,e.borderWidth)}"></div>`),s.style.transform=G(l),U(s,r,l,a),requestAnimationFrame(()=>requestAnimationFrame(()=>{s.style.opacity="1",s.style.transform="scale(1) translate(0,0)"}));let p=()=>{Q.delete(r),s.style.opacity="0",s.style.transform=J(l),setTimeout(()=>s.remove(),280)};Q.set(r,p);let b=s.querySelector("[data-confirm]"),w=s.querySelector("[data-cancel]");b.addEventListener("mouseenter",()=>{b.style.background=e.confirmHoverBg}),b.addEventListener("mouseleave",()=>{b.style.background=e.confirmBg}),w.addEventListener("mouseenter",()=>{w.style.background=e.cancelHoverBg}),w.addEventListener("mouseleave",()=>{w.style.background=e.cancelBg}),b.onclick=()=>{p(),n==null||n()},w.onclick=()=>{p(),o==null||o()}}function M(i,r,n={}){return new Promise(o=>{if(typeof document>"u")return o(!1);let e={...m.modal,confirmLabel:"Confirm",cancelLabel:"Cancel",confirmVariant:"danger",icon:null,sound:m.sound,...n},c=e.position==="top",a=c?"flex-start":"center",f=c?"padding:5vh 16px 16px":"padding:16px";e.sound&&T("warning");let d=e.confirmVariant!=="primary",s=e.confirmBg||(d?"#ef4444":"#3b82f6"),l=e.confirmHoverBg||(d?"#dc2626":"#2563eb"),p=e.iconColor||(d?"#ef4444":"#3b82f6"),b=e.iconBg||(d?"#fee2e2":"#dbeafe"),w=e.icon||g.warning,H=e.padding.trim().split(/\s+/),q=H[1]||H[0],h=document.createElement("div");h.setAttribute("style",["position:fixed","inset:0","z-index:99999","display:flex",`align-items:${a}`,"justify-content:center",f,`background:${e.overlayBg}`,`backdrop-filter:blur(${e.overlayBlur})`,"-webkit-backdrop-filter:blur("+e.overlayBlur+")","transition:opacity 0.25s ease","opacity:0"].join(";")),h.innerHTML=`
      <div data-mb style="
        width:100%;max-width:${e.maxWidth};
        background:${e.bg};
        border-radius:${e.borderRadius};
        border:${e.borderWidth} solid ${e.borderColor};
        box-shadow:${e.shadow};
        overflow:hidden;
        transition:all 0.32s cubic-bezier(0.34,1.56,0.64,1);
        transform:scale(0.9) translateY(18px);
      ">
        <!-- Body -->
        <div style="padding:${e.padding}">
          <div style="
            width:${e.iconSize};height:${e.iconSize};
            border-radius:${e.iconRadius};
            background:${b};
            display:flex;align-items:center;justify-content:center;
            margin-bottom:16px;
            color:${p};
          ">
            <div style="width:24px;height:24px">${w}</div>
          </div>
          <h3 style="
            font-size:${e.titleSize};
            font-weight:${e.titleWeight};
            color:${e.titleColor};
            margin:${e.titleMargin};
            line-height:1.3;
          ">${i}</h3>
          <p style="
            font-size:${e.messageSize};
            color:${e.messageColor};
            margin:0;
            line-height:1.65;
          ">${r}</p>
        </div>

        <!-- Footer -->
        <div style="
          background:${e.footerBg};
          padding:${e.footerPaddingV} ${q} ${e.footerPaddingVB};
          display:flex;gap:10px;justify-content:flex-end;
          border-top:1px solid ${e.footerBorder};
        ">
          <button data-mc style="
            padding:${e.cancelPadding};
            font-size:${e.cancelSize};
            font-weight:${e.cancelWeight};
            color:${e.cancelColor};
            background:${e.cancelBg};
            border:${e.cancelBorder};
            border-radius:${e.cancelRadius};
            cursor:pointer;
            transition:background 0.15s, color 0.15s;
          ">${e.cancelLabel}</button>
          <button data-mok style="
            padding:${e.confirmPadding};
            font-size:${e.confirmSize};
            font-weight:${e.confirmWeight};
            color:${e.confirmColor};
            background:${s};
            border:none;
            border-radius:${e.confirmRadius};
            cursor:pointer;
            box-shadow:0 2px 8px ${s}55;
            transition:background 0.15s, transform 0.1s;
          ">${e.confirmLabel}</button>
        </div>
      </div>
    `.trim(),document.body.appendChild(h);let I=h.querySelector("[data-mb]"),v=h.querySelector("[data-mok]"),z=h.querySelector("[data-mc]");v.addEventListener("mouseenter",()=>{v.style.background=l,v.style.transform="translateY(-1px)"}),v.addEventListener("mouseleave",()=>{v.style.background=s,v.style.transform=""}),z.addEventListener("mouseenter",()=>{z.style.background=e.cancelHoverBg}),z.addEventListener("mouseleave",()=>{z.style.background=e.cancelBg}),requestAnimationFrame(()=>{h.style.opacity="1",I.style.transform="scale(1) translateY(0)"});let k=C=>{h.style.opacity="0",I.style.transform="scale(0.9) translateY(16px)",setTimeout(()=>{h.remove(),o(C)},280)};z.onclick=()=>k(!1),v.onclick=()=>k(!0),h.addEventListener("click",C=>{C.target===h&&k(!1)});let F=C=>{C.key==="Escape"&&(k(!1),document.removeEventListener("keydown",F)),C.key==="Enter"&&(k(!0),document.removeEventListener("keydown",F))};document.addEventListener("keydown",F)})}function se(i={}){let r=n=>({...i,...n});return{success:(n,o)=>u(n,r({type:"success",...o})),error:(n,o)=>u(n,r({type:"error",...o})),warning:(n,o)=>u(n,r({type:"warning",...o})),info:(n,o)=>u(n,r({type:"info",...o})),notify:(n,o)=>u(n,r(o)),promise:(n,o,t)=>A(n,o,r(t)),anchored:(n,o,t)=>W(n,o,r(t)),anchoredConfirm:_,modal:M,dismiss:y,dismissAll:E}}var ae={success:(i,r)=>u(i,{type:"success",...r}),error:(i,r)=>u(i,{type:"error",...r}),warning:(i,r)=>u(i,{type:"warning",...r}),info:(i,r)=>u(i,{type:"info",...r}),notify:u,promise:A,anchored:W,anchoredConfirm:_,modal:M,dismiss:y,dismissAll:E,configure:O,ICONS:g},Ee=ae;0&&(module.exports={DEFAULTS,ICONS,anchoredConfirm,anchoredToast,configure,createToast,dismissAll,dismissToast,modalConfirm,promiseToast,toast,useToast});
