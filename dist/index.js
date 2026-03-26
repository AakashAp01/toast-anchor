var D=Object.defineProperty;var ye=Object.getOwnPropertyDescriptor;var $e=Object.getOwnPropertyNames;var we=Object.prototype.hasOwnProperty;var ve=(i,r)=>{for(var n in r)D(i,n,{get:r[n],enumerable:!0})},ke=(i,r,n,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of $e(r))!we.call(i,o)&&o!==n&&D(i,o,{get:()=>r[o],enumerable:!(t=ye(r,o))||t.enumerable});return i};var Ce=i=>ke(D({},"__esModule",{value:!0}),i);var Ee={};ve(Ee,{DEFAULTS:()=>l,ICONS:()=>g,anchoredConfirm:()=>A,anchoredToast:()=>E,configure:()=>P,createToast:()=>u,default:()=>Le,dismissAll:()=>B,dismissToast:()=>x,modalConfirm:()=>_,promiseToast:()=>L,toast:()=>se,useToast:()=>ie});module.exports=Ce(Ee);if(typeof document<"u"&&!document.getElementById("__tk_css")){let i=document.createElement("style");i.id="__tk_css",i.textContent="@keyframes __tk_spin{to{transform:rotate(360deg)}}",document.head.appendChild(i)}var g={success:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>',error:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>',warning:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',loading:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:__tk_spin 1s linear infinite"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>'};var l={position:"bottom-right",duration:4e3,sound:!1,dismissOnClick:!1,showProgress:!1,maxToasts:5,theme:{success:{bg:"#10b981",light:"#d1fae5"},error:{bg:"#ef4444",light:"#fee2e2"},warning:{bg:"#f59e0b",light:"#fef3c7"},info:{bg:"#3b82f6",light:"#dbeafe"}},toast:{bg:"#ffffff",color:"#1e293b",descColor:"#64748b",borderColor:"#f1f5f9",borderWidth:"1px",borderRadius:"14px",shadow:"0 4px 24px rgba(0,0,0,0.08),0 1px 4px rgba(0,0,0,0.04)",padding:"13px 14px",width:"316px",fontSize:"13.5px",fontWeight:"600",descFontSize:"12px",descFontWeight:"400",showIcon:!0,showClose:!0,closeColor:"#cbd5e1",closeHoverColor:"#94a3b8",progressH:"3px",progressRadius:"0 0 14px 14px",iconSize:"32px",iconRadius:"50%",actionColor:null,actionFontSize:"12px"},anchored:{position:"top",bg:"#0f172a",color:"#ffffff",borderColor:"transparent",borderWidth:"0px",borderRadius:"10px",shadow:"0 8px 24px rgba(0,0,0,0.2)",padding:"8px 14px",fontSize:"13px",fontWeight:"600",showIcon:!0,arrowSize:10,showArrow:!0,gap:13},anchoredConfirm:{position:"top",bg:"#0f172a",color:"#f8fafc",borderColor:"transparent",borderWidth:"0px",borderRadius:"12px",shadow:"0 8px 28px rgba(0,0,0,0.22)",padding:"12px 14px",fontSize:"13px",minWidth:"160px",showIcon:!0,confirmBg:"#ef4444",confirmColor:"#ffffff",confirmHoverBg:"#dc2626",cancelBg:"#1e293b",cancelColor:"#94a3b8",cancelHoverBg:"#334155",cancelBorder:"#334155",btnRadius:"8px",btnFontSize:"12px",btnFontWeight:"700",btnPadding:"6px 0",arrowSize:10,showArrow:!0,gap:13},modal:{position:"center",overlayBg:"rgba(15,23,42,0.55)",overlayBlur:"5px",bg:"#ffffff",borderColor:"transparent",borderWidth:"0px",borderRadius:"20px",shadow:"0 25px 60px rgba(0,0,0,0.22)",maxWidth:"420px",padding:"24px",footerBg:"#f8fafc",footerBorder:"#f1f5f9",footerPaddingV:"14px",footerPaddingVB:"18px",titleColor:"#0f172a",titleSize:"17px",titleWeight:"700",titleMargin:"0 0 8px",messageColor:"#64748b",messageSize:"14px",iconSize:"48px",iconRadius:"50%",iconBg:null,iconColor:null,confirmBg:null,confirmColor:"#ffffff",confirmHoverBg:null,confirmRadius:"10px",confirmSize:"13.5px",confirmWeight:"600",confirmPadding:"9px 22px",cancelColor:"#475569",cancelHoverBg:"#f1f5f9",cancelRadius:"10px",cancelSize:"13.5px",cancelWeight:"500",cancelPadding:"9px 18px",cancelBg:"transparent",cancelBorder:"none"}};function P(i={}){let r=["toast","anchored","anchoredConfirm","modal","theme"];for(let[n,t]of Object.entries(i))if(r.includes(n)&&t&&typeof t=="object")if(n==="theme")for(let[o,e]of Object.entries(t))l.theme[o]={...l.theme[o],...e};else Object.assign(l[n],t);else l[n]=t}var k=null,re={success:{wave:"sine",sf:600,ef:900,gs:.15,ge:.01,dur:.15},error:{wave:"sawtooth",sf:400,ef:200,gs:.15,ge:.01,dur:.15},warning:{wave:"triangle",sf:600,ef:380,gs:.12,ge:.01,dur:.13},info:{wave:"sine",sf:800,ef:300,gs:.15,ge:.01,dur:.1},pop:{wave:"sine",sf:700,ef:350,gs:.12,ge:.01,dur:.1}};function C(i="success"){if(!(typeof window>"u"))try{k||(k=new(window.AudioContext||window.webkitAudioContext)),k.state==="suspended"&&k.resume();let r=re[i]||re.pop,n=k.createOscillator(),t=k.createGain(),o=k.currentTime;n.type=r.wave,n.frequency.setValueAtTime(r.sf,o),n.frequency.exponentialRampToValueAtTime(r.ef,o+r.dur),t.gain.setValueAtTime(r.gs,o),t.gain.exponentialRampToValueAtTime(r.ge,o+r.dur),n.connect(t),t.connect(k.destination),n.start(),n.stop(o+r.dur)}catch{}}var ne={"top-left":"top:1.5rem;left:1.5rem;flex-direction:column","top-center":"top:1.5rem;left:50%;transform:translateX(-50%);flex-direction:column","top-right":"top:1.5rem;right:1.5rem;flex-direction:column","middle-left":"top:50%;left:1.5rem;transform:translateY(-50%);flex-direction:column","middle-center":"top:50%;left:50%;transform:translate(-50%,-50%);flex-direction:column","middle-right":"top:50%;right:1.5rem;transform:translateY(-50%);flex-direction:column","bottom-left":"bottom:1.5rem;left:1.5rem;flex-direction:column-reverse","bottom-center":"bottom:1.5rem;left:50%;transform:translateX(-50%);flex-direction:column-reverse","bottom-right":"bottom:1.5rem;right:1.5rem;flex-direction:column-reverse"},N=new Map,z=new Map,Se=0;function Te(i){if(typeof document>"u")return null;if(N.has(i))return N.get(i);let r=document.createElement("div");return r.id=`__tk_c_${i.replace(/-/g,"_")}`,r.setAttribute("style","position:fixed;z-index:9999;display:flex;gap:10px;pointer-events:none;"+(ne[i]||ne["bottom-right"])),document.body.appendChild(r),N.set(i,r),r}function x(i){let r=z.get(i);if(!r)return;clearTimeout(r.timer);let n=r.el;n.style.opacity="0",n.style.transform="scale(0.9) translateY(6px)",n.style.maxHeight=n.offsetHeight+"px",setTimeout(()=>{n.style.transition="all 0.32s ease-out",n.style.maxHeight="0",n.style.padding="0",n.style.margin="0",n.style.overflow="hidden"},60),setTimeout(()=>{n.remove(),z.delete(i)},420)}function B(){[...z.keys()].forEach(x)}function ze(){return`__tk_${++Se}`}function u(i,r={}){var ee,oe;if(typeof document>"u")return()=>{};let n=l,t=n.toast,o={type:"success",position:n.position,duration:n.duration,sound:n.sound,dismissOnClick:n.dismissOnClick,showProgress:n.showProgress,description:null,icon:null,action:null,id:null,showIcon:void 0,showClose:void 0,...r},e=o.type,d=n.theme[e]||n.theme.success,a=y=>o[y]!==void 0?o[y]:t[y],c=a("bg"),s=a("color"),f=a("descColor"),p=a("borderColor"),m=a("borderWidth"),H=a("borderRadius"),O=a("shadow"),F=a("padding"),q=a("width"),h=a("fontSize"),M=a("fontWeight"),$=a("descFontSize"),S=a("descFontWeight"),w=a("closeColor"),W=a("closeHoverColor"),v=a("progressH"),ae=a("progressRadius"),de=o.progressColor||d.bg,ce=o.iconBg||d.light,le=o.iconColor||d.bg,j=a("iconSize"),fe=a("iconRadius"),pe=o.actionColor||d.bg,me=a("actionFontSize"),ue=o.icon||g[e]||g.success,Y=o.id||ze(),ge=o.showIcon!==void 0?o.showIcon:t.showIcon!==void 0?t.showIcon:!0,he=o.showClose!==void 0?o.showClose:t.showClose!==void 0?t.showClose:!0,Q=!!(o.description||o.action),be=Q?"align-items:flex-start":"align-items:center",xe=Q?"padding-top:2px":"";o.sound&&C(e);let Z=Te(o.position);if(!Z)return()=>{};z.size>=n.maxToasts&&x(z.keys().next().value);let b=document.createElement("div");b.id=Y,b.setAttribute("style",["pointer-events:auto","position:relative","overflow:hidden","display:flex",be,"gap:12px",`width:${q}`,`background:${c}`,`border:${m} solid ${p}`,`padding:${F}`,`border-radius:${H}`,`box-shadow:${O}`,"transition:all 0.38s cubic-bezier(0.34,1.56,0.64,1)","opacity:0","transform:scale(0.9) translateY(10px)",`cursor:${o.dismissOnClick?"pointer":"default"}`,"box-sizing:border-box"].join(";")),b.innerHTML=`
    ${ge?`<div style="display:flex;align-items:center;justify-content:center;width:${j};height:${j};min-width:${j};border-radius:${fe};background:${ce};color:${le};flex-shrink:0">
      <div style="width:16px;height:16px;display:flex">${ue}</div>
    </div>`:""}
    <div style="flex:1;min-width:0;${xe}">
      <p style="font-size:${h};font-weight:${M};color:${s};line-height:1.4;margin:0">${i}</p>
      ${o.description?`<p style="font-size:${$};font-weight:${S};color:${f};margin:3px 0 0;line-height:1.5">${o.description}</p>`:""}
      ${o.action?`<button data-tk-action style="margin-top:7px;font-size:${me};font-weight:700;color:${pe};background:none;border:none;cursor:pointer;padding:0;display:block;line-height:1">${o.action.label}</button>`:""}
    </div>
    ${he?`<button data-tk-close
      style="flex-shrink:0;background:none;border:none;cursor:pointer;color:${w};padding:2px;line-height:0;border-radius:4px;transition:color 0.15s"
      title="Dismiss"
      onmouseenter="this.style.color='${W}'"
      onmouseleave="this.style.color='${w}'"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>`:""}
    ${o.showProgress&&o.duration>0?`<div data-tk-bar style="position:absolute;bottom:0;left:0;height:${v};border-radius:${ae};background:${de};width:100%;transition:width ${o.duration}ms linear"></div>`:""}
  `.trim(),Z.appendChild(b),requestAnimationFrame(()=>requestAnimationFrame(()=>{if(b.style.opacity="1",b.style.transform="scale(1) translateY(0)",o.showProgress&&o.duration>0){let y=b.querySelector("[data-tk-bar]");y&&(y.style.width="0%")}}));let T=()=>x(Y),I=null;return o.duration>0&&(I=setTimeout(T,o.duration)),b.addEventListener("mouseenter",()=>clearTimeout(I)),b.addEventListener("mouseleave",()=>{o.duration>0&&(I=setTimeout(T,Math.min(o.duration,1500)))}),(ee=b.querySelector("[data-tk-close]"))==null||ee.addEventListener("click",y=>{y.stopPropagation(),T()}),o.dismissOnClick&&b.addEventListener("click",T),(oe=b.querySelector("[data-tk-action]"))==null||oe.addEventListener("click",y=>{var R,te;y.stopPropagation(),(te=(R=o.action)==null?void 0:R.onClick)==null||te.call(R),T()}),z.set(Y,{el:b,timer:I}),T}var Be=0;function L(i,r={},n={}){let{loading:t="Loading\u2026",success:o="Done!",error:e="Something went wrong"}=r,d=`__tk_p${++Be}`;return u(t,{type:"info",duration:0,icon:g.loading,sound:!1,id:d,...n}),Promise.resolve(i).then(a=>{x(d);let c=typeof o=="function"?o(a):o;u(c,{type:"success",...n})}).catch(a=>{x(d);let c=typeof e=="function"?e(a):e;u(c,{type:"error",...n})}),()=>x(d)}function U(i,r,n,t){let o=r.getBoundingClientRect(),e=i.getBoundingClientRect(),d=window.scrollX,a=window.scrollY,c,s;switch(n){case"bottom":c=o.bottom+a+t,s=o.left+d+o.width/2-e.width/2;break;case"left":c=o.top+a+o.height/2-e.height/2,s=o.left+d-e.width-t;break;case"right":c=o.top+a+o.height/2-e.height/2,s=o.right+d+t;break;default:c=o.top+a-e.height-t,s=o.left+d+o.width/2-e.width/2}i.style.top=`${c}px`,i.style.left=`${s}px`}function X(i,r,n,t,o){let e=r/2,d=o&&o!=="0px"?o:"0px",a=t||"transparent",c=d!=="0px",s="";if(c){let p=`${d} solid ${a}`,m=`${d} solid transparent`;switch(i){case"top":s=`border-top:${m};border-right:${p};border-bottom:${p};border-left:${m};`;break;case"bottom":s=`border-top:${p};border-right:${m};border-bottom:${m};border-left:${p};`;break;case"left":s=`border-top:${p};border-right:${p};border-bottom:${m};border-left:${m};`;break;case"right":s=`border-top:${m};border-right:${m};border-bottom:${p};border-left:${p};`;break}}let f=`${s}position:absolute;width:${r}px;height:${r}px;background:${n};transform:rotate(45deg);`;switch(i){case"bottom":return`${f}top:${-e}px;left:50%;margin-left:${-e}px`;case"left":return`${f}top:50%;right:${-e}px;margin-top:${-e}px`;case"right":return`${f}top:50%;left:${-e}px;margin-top:${-e}px`;default:return`${f}bottom:${-e}px;left:50%;margin-left:${-e}px`}}function K(i){switch(i){case"bottom":return"scale(0.88) translateY(-8px)";case"left":return"scale(0.88) translateX(8px)";case"right":return"scale(0.88) translateX(-8px)";default:return"scale(0.88) translateY(8px)"}}function G(i){switch(i){case"bottom":return"scale(0.9) translateY(-4px)";case"left":return"scale(0.9) translateX(4px)";case"right":return"scale(0.9) translateX(-4px)";default:return"scale(0.9) translateY(4px)"}}var V=new WeakMap;function E(i,r,n={}){if(typeof document>"u"||!r)return()=>{};let t={type:"success",duration:2500,sound:l.sound,icon:null,...l.anchored,...n},o=l.theme[t.type]||l.theme.success,e=t.icon||g[t.type],d=t.position;t.sound&&C(t.type);let a=V.get(r);a&&a();let c=t.showIcon!==void 0?t.showIcon:!0,s=document.createElement("div");s.setAttribute("style",["position:absolute","z-index:9998",`padding:${t.padding}`,`background:${t.bg}`,`color:${t.color}`,`font-size:${t.fontSize}`,`font-weight:${t.fontWeight}`,`border-radius:${t.borderRadius}`,`border:${t.borderWidth} solid ${t.borderColor}`,`box-shadow:${t.shadow}`,"pointer-events:none","white-space:nowrap","transition:opacity 0.3s ease,transform 0.3s cubic-bezier(0.34,1.56,0.64,1)","opacity:0",`transform:${K(d)}`].join(";")),s.innerHTML=`
    <div style="display:flex;align-items:center;gap:7px">
      ${c?`<div style="width:15px;height:15px;display:flex;flex-shrink:0;color:${o.bg}">${e}</div>`:""}
      <span>${i}</span>
    </div>
    ${t.showArrow?`<div style="${X(d,t.arrowSize,t.bg,t.borderColor,t.borderWidth)}"></div>`:""}
  `.trim(),document.body.appendChild(s),U(s,r,d,t.gap),requestAnimationFrame(()=>requestAnimationFrame(()=>{s.style.opacity="1",s.style.transform="scale(1) translate(0,0)"}));let f=()=>{V.delete(r),s.style.opacity="0",s.style.transform=G(d),setTimeout(()=>s.remove(),300)};return V.set(r,f),t.duration>0&&setTimeout(f,t.duration),f}var J=new WeakMap;function A(i,r,n,t,o={}){if(typeof document>"u"||!r)return;let e={confirmLabel:"Yes",cancelLabel:"No",sound:l.sound,...l.anchoredConfirm,...o},d=e.position;e.sound&&C("warning");let a=J.get(r);a&&a();let c=e.showIcon!==void 0?e.showIcon:!0,s=document.createElement("div");s.setAttribute("style",["position:absolute","z-index:9998",`padding:${e.padding}`,`background:${e.bg}`,`color:${e.color}`,`font-size:${e.fontSize}`,`border-radius:${e.borderRadius}`,`border:${e.borderWidth} solid ${e.borderColor}`,`box-shadow:${e.shadow}`,`min-width:${e.minWidth}`,"pointer-events:auto","transition:opacity 0.3s ease,transform 0.3s cubic-bezier(0.34,1.56,0.64,1)","opacity:0",`transform:${K(d)}`].join(";")),s.innerHTML=`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
      ${c?`<div style="width:15px;height:15px;flex-shrink:0;color:#fca5a5">${g.warning}</div>`:""}
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
    ${e.showArrow?`<div style="${X(d,e.arrowSize,e.bg,e.borderColor,e.borderWidth)}"></div>`:""}
  `.trim(),document.body.appendChild(s),U(s,r,d,e.gap),requestAnimationFrame(()=>requestAnimationFrame(()=>{s.style.opacity="1",s.style.transform="scale(1) translate(0,0)"}));let f=()=>{J.delete(r),s.style.opacity="0",s.style.transform=G(d),setTimeout(()=>s.remove(),280)};J.set(r,f);let p=s.querySelector("[data-confirm]"),m=s.querySelector("[data-cancel]");p.addEventListener("mouseenter",()=>{p.style.background=e.confirmHoverBg}),p.addEventListener("mouseleave",()=>{p.style.background=e.confirmBg}),m.addEventListener("mouseenter",()=>{m.style.background=e.cancelHoverBg}),m.addEventListener("mouseleave",()=>{m.style.background=e.cancelBg}),p.onclick=()=>{f(),n==null||n()},m.onclick=()=>{f(),t==null||t()}}function _(i,r,n={}){return new Promise(t=>{if(typeof document>"u")return t(!1);let e={...l.modal,confirmLabel:"Confirm",cancelLabel:"Cancel",confirmVariant:"danger",icon:null,sound:l.sound,...n},d=e.position==="top",a=d?"flex-start":"center",c=d?"padding:5vh 16px 16px":"padding:16px";e.sound&&C("warning");let s=e.confirmVariant!=="primary",f=e.confirmBg||(s?"#ef4444":"#3b82f6"),p=e.confirmHoverBg||(s?"#dc2626":"#2563eb"),m=e.iconColor||(s?"#ef4444":"#3b82f6"),H=e.iconBg||(s?"#fee2e2":"#dbeafe"),O=e.icon||g.warning,F=e.padding.trim().split(/\s+/),q=F[1]||F[0],h=document.createElement("div");h.setAttribute("style",["position:fixed","inset:0","z-index:99999","display:flex",`align-items:${a}`,"justify-content:center",c,`background:${e.overlayBg}`,`backdrop-filter:blur(${e.overlayBlur})`,"-webkit-backdrop-filter:blur("+e.overlayBlur+")","transition:opacity 0.25s ease","opacity:0"].join(";")),h.innerHTML=`
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
            background:${H};
            display:flex;align-items:center;justify-content:center;
            margin-bottom:16px;
            color:${m};
          ">
            <div style="width:24px;height:24px">${O}</div>
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
            background:${f};
            border:none;
            border-radius:${e.confirmRadius};
            cursor:pointer;
            box-shadow:0 2px 8px ${f}55;
            transition:background 0.15s, transform 0.1s;
          ">${e.confirmLabel}</button>
        </div>
      </div>
    `.trim(),document.body.appendChild(h);let M=h.querySelector("[data-mb]"),$=h.querySelector("[data-mok]"),S=h.querySelector("[data-mc]");$.addEventListener("mouseenter",()=>{$.style.background=p,$.style.transform="translateY(-1px)"}),$.addEventListener("mouseleave",()=>{$.style.background=f,$.style.transform=""}),S.addEventListener("mouseenter",()=>{S.style.background=e.cancelHoverBg}),S.addEventListener("mouseleave",()=>{S.style.background=e.cancelBg}),requestAnimationFrame(()=>{h.style.opacity="1",M.style.transform="scale(1) translateY(0)"});let w=v=>{h.style.opacity="0",M.style.transform="scale(0.9) translateY(16px)",setTimeout(()=>{h.remove(),t(v)},280)};S.onclick=()=>w(!1),$.onclick=()=>w(!0),h.addEventListener("click",v=>{v.target===h&&w(!1)});let W=v=>{v.key==="Escape"&&(w(!1),document.removeEventListener("keydown",W)),v.key==="Enter"&&(w(!0),document.removeEventListener("keydown",W))};document.addEventListener("keydown",W)})}function ie(i={}){let r=n=>({...i,...n});return{success:(n,t)=>u(n,r({type:"success",...t})),error:(n,t)=>u(n,r({type:"error",...t})),warning:(n,t)=>u(n,r({type:"warning",...t})),info:(n,t)=>u(n,r({type:"info",...t})),notify:(n,t)=>u(n,r(t)),promise:(n,t,o)=>L(n,t,r(o)),anchored:(n,t,o)=>E(n,t,r(o)),anchoredConfirm:A,modal:_,dismiss:x,dismissAll:B}}var se={success:(i,r)=>u(i,{type:"success",...r}),error:(i,r)=>u(i,{type:"error",...r}),warning:(i,r)=>u(i,{type:"warning",...r}),info:(i,r)=>u(i,{type:"info",...r}),notify:u,promise:L,anchored:E,anchoredConfirm:A,modal:_,dismiss:x,dismissAll:B,configure:P,ICONS:g},Le=se;0&&(module.exports={DEFAULTS,ICONS,anchoredConfirm,anchoredToast,configure,createToast,dismissAll,dismissToast,modalConfirm,promiseToast,toast,useToast});
