var j=Object.defineProperty;var ge=Object.getOwnPropertyDescriptor;var he=Object.getOwnPropertyNames;var be=Object.prototype.hasOwnProperty;var xe=(s,n)=>{for(var t in n)j(s,t,{get:n[t],enumerable:!0})},ye=(s,n,t,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let o of he(n))!be.call(s,o)&&o!==t&&j(s,o,{get:()=>n[o],enumerable:!(r=ge(n,o))||r.enumerable});return s};var $e=s=>ye(j({},"__esModule",{value:!0}),s);var Te={};xe(Te,{DEFAULTS:()=>c,ICONS:()=>p,anchoredConfirm:()=>L,anchoredToast:()=>B,configure:()=>M,createToast:()=>l,default:()=>Se,dismissAll:()=>T,dismissToast:()=>g,modalConfirm:()=>E,promiseToast:()=>z,toast:()=>te,useToast:()=>oe});module.exports=$e(Te);if(typeof document<"u"&&!document.getElementById("__tk_css")){let s=document.createElement("style");s.id="__tk_css",s.textContent="@keyframes __tk_spin{to{transform:rotate(360deg)}}",document.head.appendChild(s)}var p={success:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>',error:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>',warning:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',loading:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:__tk_spin 1s linear infinite"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>'};var c={position:"bottom-right",duration:4e3,sound:!1,dismissOnClick:!1,showProgress:!1,maxToasts:5,theme:{success:{bg:"#10b981",light:"#d1fae5"},error:{bg:"#ef4444",light:"#fee2e2"},warning:{bg:"#f59e0b",light:"#fef3c7"},info:{bg:"#3b82f6",light:"#dbeafe"}},toast:{bg:"#ffffff",color:"#1e293b",descColor:"#64748b",borderColor:"#f1f5f9",borderWidth:"1px",borderRadius:"14px",shadow:"0 4px 24px rgba(0,0,0,0.08),0 1px 4px rgba(0,0,0,0.04)",padding:"13px 14px",width:"316px",fontSize:"13.5px",fontWeight:"600",descFontSize:"12px",descFontWeight:"400",closeColor:"#cbd5e1",closeHoverColor:"#94a3b8",progressH:"3px",progressRadius:"0 0 14px 14px",iconSize:"32px",iconRadius:"50%",actionColor:null,actionFontSize:"12px"},anchored:{position:"top",bg:"#0f172a",color:"#ffffff",borderColor:"transparent",borderWidth:"0px",borderRadius:"10px",shadow:"0 8px 24px rgba(0,0,0,0.2)",padding:"8px 14px",fontSize:"13px",fontWeight:"600",arrowSize:10,showArrow:!0,gap:13},anchoredConfirm:{position:"top",bg:"#0f172a",color:"#f8fafc",borderColor:"transparent",borderWidth:"0px",borderRadius:"12px",shadow:"0 8px 28px rgba(0,0,0,0.22)",padding:"12px 14px",fontSize:"13px",minWidth:"160px",confirmBg:"#ef4444",confirmColor:"#ffffff",confirmHoverBg:"#dc2626",cancelBg:"#1e293b",cancelColor:"#94a3b8",cancelHoverBg:"#334155",cancelBorder:"#334155",btnRadius:"8px",btnFontSize:"12px",btnFontWeight:"700",btnPadding:"6px 0",arrowSize:10,showArrow:!0,gap:13},modal:{overlayBg:"rgba(15,23,42,0.55)",overlayBlur:"5px",bg:"#ffffff",borderColor:"transparent",borderWidth:"0px",borderRadius:"20px",shadow:"0 25px 60px rgba(0,0,0,0.22)",maxWidth:"420px",padding:"24px",footerBg:"#f8fafc",footerBorder:"#f1f5f9",footerPaddingV:"14px",footerPaddingVB:"18px",titleColor:"#0f172a",titleSize:"17px",titleWeight:"700",titleMargin:"0 0 8px",messageColor:"#64748b",messageSize:"14px",iconSize:"48px",iconRadius:"50%",iconBg:null,iconColor:null,confirmBg:null,confirmColor:"#ffffff",confirmHoverBg:null,confirmRadius:"10px",confirmSize:"13.5px",confirmWeight:"600",confirmPadding:"9px 22px",cancelColor:"#475569",cancelHoverBg:"#f1f5f9",cancelRadius:"10px",cancelSize:"13.5px",cancelWeight:"500",cancelPadding:"9px 18px",cancelBg:"transparent",cancelBorder:"none"}};function M(s={}){let n=["toast","anchored","anchoredConfirm","modal","theme"];for(let[t,r]of Object.entries(s))if(n.includes(t)&&r&&typeof r=="object")if(t==="theme")for(let[o,e]of Object.entries(r))c.theme[o]={...c.theme[o],...e};else Object.assign(c[t],r);else c[t]=r}var $=null,Z={success:{wave:"sine",sf:600,ef:900,gs:.15,ge:.01,dur:.15},error:{wave:"sawtooth",sf:400,ef:200,gs:.15,ge:.01,dur:.15},warning:{wave:"triangle",sf:600,ef:380,gs:.12,ge:.01,dur:.13},info:{wave:"sine",sf:800,ef:300,gs:.15,ge:.01,dur:.1},pop:{wave:"sine",sf:700,ef:350,gs:.12,ge:.01,dur:.1}};function v(s="success"){if(!(typeof window>"u"))try{$||($=new(window.AudioContext||window.webkitAudioContext)),$.state==="suspended"&&$.resume();let n=Z[s]||Z.pop,t=$.createOscillator(),r=$.createGain(),o=$.currentTime;t.type=n.wave,t.frequency.setValueAtTime(n.sf,o),t.frequency.exponentialRampToValueAtTime(n.ef,o+n.dur),r.gain.setValueAtTime(n.gs,o),r.gain.exponentialRampToValueAtTime(n.ge,o+n.dur),t.connect(r),r.connect($.destination),t.start(),t.stop(o+n.dur)}catch{}}var ee={"top-left":"top:1.5rem;left:1.5rem;flex-direction:column","top-center":"top:1.5rem;left:50%;transform:translateX(-50%);flex-direction:column","top-right":"top:1.5rem;right:1.5rem;flex-direction:column","middle-left":"top:50%;left:1.5rem;transform:translateY(-50%);flex-direction:column","middle-center":"top:50%;left:50%;transform:translate(-50%,-50%);flex-direction:column","middle-right":"top:50%;right:1.5rem;transform:translateY(-50%);flex-direction:column","bottom-left":"bottom:1.5rem;left:1.5rem;flex-direction:column-reverse","bottom-center":"bottom:1.5rem;left:50%;transform:translateX(-50%);flex-direction:column-reverse","bottom-right":"bottom:1.5rem;right:1.5rem;flex-direction:column-reverse"},Y=new Map,S=new Map,ve=0;function we(s){if(typeof document>"u")return null;if(Y.has(s))return Y.get(s);let n=document.createElement("div");return n.id=`__tk_c_${s.replace(/-/g,"_")}`,n.setAttribute("style","position:fixed;z-index:9999;display:flex;gap:10px;pointer-events:none;"+(ee[s]||ee["bottom-right"])),document.body.appendChild(n),Y.set(s,n),n}function g(s){let n=S.get(s);if(!n)return;clearTimeout(n.timer);let t=n.el;t.style.opacity="0",t.style.transform="scale(0.9) translateY(6px)",t.style.maxHeight=t.offsetHeight+"px",setTimeout(()=>{t.style.transition="all 0.32s ease-out",t.style.maxHeight="0",t.style.padding="0",t.style.margin="0",t.style.overflow="hidden"},60),setTimeout(()=>{t.remove(),S.delete(s)},420)}function T(){[...S.keys()].forEach(g)}function ke(){return`__tk_${++ve}`}function l(s,n={}){var G,J;if(typeof document>"u")return()=>{};let t=c,r=t.toast,o={type:"success",position:t.position,duration:t.duration,sound:t.sound,dismissOnClick:t.dismissOnClick,showProgress:t.showProgress,description:null,icon:null,action:null,id:null,...n},e=o.type,a=t.theme[e]||t.theme.success,i=h=>o[h]!==void 0?o[h]:r[h],d=i("bg"),f=i("color"),b=i("descColor"),H=i("borderColor"),_=i("borderWidth"),P=i("borderRadius"),m=i("shadow"),F=i("padding"),x=i("width"),w=i("fontSize"),k=i("fontWeight"),A=i("descFontSize"),y=i("descFontWeight"),U=i("closeColor"),re=i("closeHoverColor"),ne=i("progressH"),ie=i("progressRadius"),se=o.progressColor||a.bg,ae=o.iconBg||a.light,de=o.iconColor||a.bg,O=i("iconSize"),ce=i("iconRadius"),le=o.actionColor||a.bg,fe=i("actionFontSize"),pe=o.icon||p[e]||p.success,q=o.id||ke(),X=!!(o.description||o.action),me=X?"align-items:flex-start":"align-items:center",ue=X?"padding-top:2px":"";o.sound&&v(e);let K=we(o.position);if(!K)return()=>{};S.size>=t.maxToasts&&g(S.keys().next().value);let u=document.createElement("div");u.id=q,u.setAttribute("style",["pointer-events:auto","position:relative","overflow:hidden","display:flex",me,"gap:12px",`width:${x}`,`background:${d}`,`border:${_} solid ${H}`,`padding:${F}`,`border-radius:${P}`,`box-shadow:${m}`,"transition:all 0.38s cubic-bezier(0.34,1.56,0.64,1)","opacity:0","transform:scale(0.9) translateY(10px)",`cursor:${o.dismissOnClick?"pointer":"default"}`,"box-sizing:border-box"].join(";")),u.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:center;width:${O};height:${O};min-width:${O};border-radius:${ce};background:${ae};color:${de};flex-shrink:0">
      <div style="width:16px;height:16px;display:flex">${pe}</div>
    </div>
    <div style="flex:1;min-width:0;${ue}">
      <p style="font-size:${w};font-weight:${k};color:${f};line-height:1.4;margin:0">${s}</p>
      ${o.description?`<p style="font-size:${A};font-weight:${y};color:${b};margin:3px 0 0;line-height:1.5">${o.description}</p>`:""}
      ${o.action?`<button data-tk-action style="margin-top:7px;font-size:${fe};font-weight:700;color:${le};background:none;border:none;cursor:pointer;padding:0;display:block;line-height:1">${o.action.label}</button>`:""}
    </div>
    <button data-tk-close
      style="flex-shrink:0;background:none;border:none;cursor:pointer;color:${U};padding:2px;line-height:0;border-radius:4px;transition:color 0.15s"
      title="Dismiss"
      onmouseenter="this.style.color='${re}'"
      onmouseleave="this.style.color='${U}'"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    ${o.showProgress&&o.duration>0?`<div data-tk-bar style="position:absolute;bottom:0;left:0;height:${ne};border-radius:${ie};background:${se};width:100%;transition:width ${o.duration}ms linear"></div>`:""}
  `.trim(),K.appendChild(u),requestAnimationFrame(()=>requestAnimationFrame(()=>{if(u.style.opacity="1",u.style.transform="scale(1) translateY(0)",o.showProgress&&o.duration>0){let h=u.querySelector("[data-tk-bar]");h&&(h.style.width="0%")}}));let C=()=>g(q),W=null;return o.duration>0&&(W=setTimeout(C,o.duration)),u.addEventListener("mouseenter",()=>clearTimeout(W)),u.addEventListener("mouseleave",()=>{o.duration>0&&(W=setTimeout(C,Math.min(o.duration,1500)))}),(G=u.querySelector("[data-tk-close]"))==null||G.addEventListener("click",h=>{h.stopPropagation(),C()}),o.dismissOnClick&&u.addEventListener("click",C),(J=u.querySelector("[data-tk-action]"))==null||J.addEventListener("click",h=>{var R,Q;h.stopPropagation(),(Q=(R=o.action)==null?void 0:R.onClick)==null||Q.call(R),C()}),S.set(q,{el:u,timer:W}),C}var Ce=0;function z(s,n={},t={}){let{loading:r="Loading\u2026",success:o="Done!",error:e="Something went wrong"}=n,a=`__tk_p${++Ce}`;return l(r,{type:"info",duration:0,icon:p.loading,sound:!1,id:a,...t}),Promise.resolve(s).then(i=>{g(a);let d=typeof o=="function"?o(i):o;l(d,{type:"success",...t})}).catch(i=>{g(a);let d=typeof e=="function"?e(i):e;l(d,{type:"error",...t})}),()=>g(a)}function D(s,n,t,r){let o=n.getBoundingClientRect(),e=s.getBoundingClientRect(),a=window.scrollX,i=window.scrollY,d,f;switch(t){case"bottom":d=o.bottom+i+r,f=o.left+a+o.width/2-e.width/2;break;case"left":d=o.top+i+o.height/2-e.height/2,f=o.left+a-e.width-r;break;case"right":d=o.top+i+o.height/2-e.height/2,f=o.right+a+r;break;default:d=o.top+i-e.height-r,f=o.left+a+o.width/2-e.width/2}s.style.top=`${d}px`,s.style.left=`${f}px`}function I(s,n,t,r,o){let e=n/2,i=`${o&&o!=="0px"?`border:${o} solid ${r};`:""}position:absolute;width:${n}px;height:${n}px;background:${t};transform:rotate(45deg);`;switch(s){case"bottom":return`${i}top:${-e}px;left:50%;margin-left:${-e}px`;case"left":return`${i}top:50%;right:${-e}px;margin-top:${-e}px`;case"right":return`${i}top:50%;left:${-e}px;margin-top:${-e}px`;default:return`${i}bottom:${-e}px;left:50%;margin-left:${-e}px`}}function N(s){switch(s){case"bottom":return"scale(0.88) translateY(-8px)";case"left":return"scale(0.88) translateX(8px)";case"right":return"scale(0.88) translateX(-8px)";default:return"scale(0.88) translateY(8px)"}}function V(s){switch(s){case"bottom":return"scale(0.9) translateY(-4px)";case"left":return"scale(0.9) translateX(4px)";case"right":return"scale(0.9) translateX(-4px)";default:return"scale(0.9) translateY(4px)"}}function B(s,n,t={}){if(typeof document>"u"||!n)return()=>{};let r={type:"success",duration:2500,sound:c.sound,icon:null,...c.anchored,...t},o=c.theme[r.type]||c.theme.success,e=r.icon||p[r.type],a=r.position;r.sound&&v(r.type);let i=document.createElement("div");i.setAttribute("style",["position:absolute","z-index:9998",`padding:${r.padding}`,`background:${r.bg}`,`color:${r.color}`,`font-size:${r.fontSize}`,`font-weight:${r.fontWeight}`,`border-radius:${r.borderRadius}`,`border:${r.borderWidth} solid ${r.borderColor}`,`box-shadow:${r.shadow}`,"pointer-events:none","white-space:nowrap","transition:opacity 0.3s ease,transform 0.3s cubic-bezier(0.34,1.56,0.64,1)","opacity:0",`transform:${N(a)}`].join(";")),i.innerHTML=`
    <div style="display:flex;align-items:center;gap:7px">
      <div style="width:15px;height:15px;display:flex;flex-shrink:0;color:${o.bg}">${e}</div>
      <span>${s}</span>
    </div>
    ${r.showArrow?`<div style="${I(a,r.arrowSize,r.bg,r.borderColor,r.borderWidth)}"></div>`:""}
  `.trim(),document.body.appendChild(i),D(i,n,a,r.gap),requestAnimationFrame(()=>requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="scale(1) translate(0,0)"}));let d=()=>{i.style.opacity="0",i.style.transform=V(a),setTimeout(()=>i.remove(),300)};return r.duration>0&&setTimeout(d,r.duration),d}function L(s,n,t,r,o={}){if(typeof document>"u"||!n)return;let e={confirmLabel:"Yes",cancelLabel:"No",sound:c.sound,...c.anchoredConfirm,...o},a=e.position;e.sound&&v("warning");let i=document.createElement("div");i.setAttribute("style",["position:absolute","z-index:9998",`padding:${e.padding}`,`background:${e.bg}`,`color:${e.color}`,`font-size:${e.fontSize}`,`border-radius:${e.borderRadius}`,`border:${e.borderWidth} solid ${e.borderColor}`,`box-shadow:${e.shadow}`,`min-width:${e.minWidth}`,"pointer-events:auto","transition:opacity 0.3s ease,transform 0.3s cubic-bezier(0.34,1.56,0.64,1)","opacity:0",`transform:${N(a)}`].join(";")),i.innerHTML=`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
      <div style="width:15px;height:15px;flex-shrink:0;color:#fca5a5">${p.warning}</div>
      <span>${s}</span>
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
    ${e.showArrow?`<div style="${I(a,e.arrowSize,e.bg,e.borderColor,e.borderWidth)}"></div>`:""}
  `.trim(),document.body.appendChild(i),D(i,n,a,e.gap),requestAnimationFrame(()=>requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="scale(1) translate(0,0)"}));let d=()=>{i.style.opacity="0",i.style.transform=V(a),setTimeout(()=>i.remove(),280)},f=i.querySelector("[data-confirm]"),b=i.querySelector("[data-cancel]");f.addEventListener("mouseenter",()=>{f.style.background=e.confirmHoverBg}),f.addEventListener("mouseleave",()=>{f.style.background=e.confirmBg}),b.addEventListener("mouseenter",()=>{b.style.background=e.cancelHoverBg}),b.addEventListener("mouseleave",()=>{b.style.background=e.cancelBg}),f.onclick=()=>{d(),t==null||t()},b.onclick=()=>{d(),r==null||r()}}function E(s,n,t={}){return new Promise(r=>{if(typeof document>"u")return r(!1);let e={...c.modal,confirmLabel:"Confirm",cancelLabel:"Cancel",confirmVariant:"danger",icon:null,sound:c.sound,...t};e.sound&&v("warning");let a=e.confirmVariant!=="primary",i=e.confirmBg||(a?"#ef4444":"#3b82f6"),d=e.confirmHoverBg||(a?"#dc2626":"#2563eb"),f=e.iconColor||(a?"#ef4444":"#3b82f6"),b=e.iconBg||(a?"#fee2e2":"#dbeafe"),H=e.icon||p.warning,_=e.padding.trim().split(/\s+/),P=_[1]||_[0],m=document.createElement("div");m.setAttribute("style",["position:fixed","inset:0","z-index:99999","display:flex","align-items:center","justify-content:center","padding:16px",`background:${e.overlayBg}`,`backdrop-filter:blur(${e.overlayBlur})`,"-webkit-backdrop-filter:blur("+e.overlayBlur+")","transition:opacity 0.25s ease","opacity:0"].join(";")),m.innerHTML=`
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
            color:${f};
          ">
            <div style="width:24px;height:24px">${H}</div>
          </div>
          <h3 style="
            font-size:${e.titleSize};
            font-weight:${e.titleWeight};
            color:${e.titleColor};
            margin:${e.titleMargin};
            line-height:1.3;
          ">${s}</h3>
          <p style="
            font-size:${e.messageSize};
            color:${e.messageColor};
            margin:0;
            line-height:1.65;
          ">${n}</p>
        </div>

        <!-- Footer -->
        <div style="
          background:${e.footerBg};
          padding:${e.footerPaddingV} ${P} ${e.footerPaddingVB};
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
            background:${i};
            border:none;
            border-radius:${e.confirmRadius};
            cursor:pointer;
            box-shadow:0 2px 8px ${i}55;
            transition:background 0.15s, transform 0.1s;
          ">${e.confirmLabel}</button>
        </div>
      </div>
    `.trim(),document.body.appendChild(m);let F=m.querySelector("[data-mb]"),x=m.querySelector("[data-mok]"),w=m.querySelector("[data-mc]");x.addEventListener("mouseenter",()=>{x.style.background=d,x.style.transform="translateY(-1px)"}),x.addEventListener("mouseleave",()=>{x.style.background=i,x.style.transform=""}),w.addEventListener("mouseenter",()=>{w.style.background=e.cancelHoverBg}),w.addEventListener("mouseleave",()=>{w.style.background=e.cancelBg}),requestAnimationFrame(()=>{m.style.opacity="1",F.style.transform="scale(1) translateY(0)"});let k=y=>{m.style.opacity="0",F.style.transform="scale(0.9) translateY(16px)",setTimeout(()=>{m.remove(),r(y)},280)};w.onclick=()=>k(!1),x.onclick=()=>k(!0),m.addEventListener("click",y=>{y.target===m&&k(!1)});let A=y=>{y.key==="Escape"&&(k(!1),document.removeEventListener("keydown",A)),y.key==="Enter"&&(k(!0),document.removeEventListener("keydown",A))};document.addEventListener("keydown",A)})}function oe(s={}){let n=t=>({...s,...t});return{success:(t,r)=>l(t,n({type:"success",...r})),error:(t,r)=>l(t,n({type:"error",...r})),warning:(t,r)=>l(t,n({type:"warning",...r})),info:(t,r)=>l(t,n({type:"info",...r})),notify:(t,r)=>l(t,n(r)),promise:(t,r,o)=>z(t,r,n(o)),anchored:(t,r,o)=>B(t,r,n(o)),anchoredConfirm:L,modal:E,dismiss:g,dismissAll:T}}var te={success:(s,n)=>l(s,{type:"success",...n}),error:(s,n)=>l(s,{type:"error",...n}),warning:(s,n)=>l(s,{type:"warning",...n}),info:(s,n)=>l(s,{type:"info",...n}),notify:l,promise:z,anchored:B,anchoredConfirm:L,modal:E,dismiss:g,dismissAll:T,configure:M,ICONS:p},Se=te;0&&(module.exports={DEFAULTS,ICONS,anchoredConfirm,anchoredToast,configure,createToast,dismissAll,dismissToast,modalConfirm,promiseToast,toast,useToast});
