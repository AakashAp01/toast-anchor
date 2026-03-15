var l={position:"bottom-right",duration:4e3,sound:!1,dismissOnClick:!1,showProgress:!1,maxToasts:5,toast:{bg:"#ffffff",borderColor:"#f1f5f9",borderRadius:"14px",shadow:"0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",width:"316px",padding:"13px 14px",titleColor:"#1e293b",descColor:"#64748b",titleSize:"13.5px",descSize:"12px",titleWeight:"600",iconSize:"32px",iconRadius:"50%"},theme:{success:{bg:"#10b981",light:"#d1fae5"},error:{bg:"#ef4444",light:"#fee2e2"},warning:{bg:"#f59e0b",light:"#fef3c7"},info:{bg:"#3b82f6",light:"#dbeafe"}},anchored:{bg:"#0f172a",textColor:"#ffffff",arrowColor:null,borderRadius:"10px",fontSize:"13px",fontWeight:"600",padding:"8px 14px",shadow:"0 8px 24px rgba(0,0,0,0.2)",iconSize:"15px",arrowSize:"10px"},anchoredConfirm:{bg:"#0f172a",textColor:"#f8fafc",iconColor:"#fca5a5",borderRadius:"12px",fontSize:"13px",padding:"12px 14px",shadow:"0 8px 28px rgba(0,0,0,0.22)",minWidth:"160px",arrowColor:null,arrowSize:"10px",confirmBg:"#ef4444",confirmColor:"#ffffff",confirmHoverBg:"#dc2626",cancelBg:"#1e293b",cancelColor:"#94a3b8",cancelBorder:"#334155",cancelHoverBg:"#273549",btnRadius:"8px",btnFontSize:"12px",btnFontWeight:"700",btnPadding:"6px 0"},modal:{overlayBg:"rgba(15,23,42,0.55)",overlayBlur:"5px",bg:"#ffffff",borderRadius:"20px",shadow:"0 25px 60px rgba(0,0,0,0.22)",maxWidth:"420px",padding:"24px 24px 20px",footerBg:"#f8fafc",footerBorder:"#f1f5f9",footerPadding:"14px 24px 18px",titleColor:"#0f172a",titleSize:"17px",titleWeight:"700",messageColor:"#64748b",messageSize:"14px",iconCircleSize:"48px",iconSize:"24px",confirmBg:"#ef4444",confirmColor:"#ffffff",confirmHoverBg:"#dc2626",confirmRadius:"10px",confirmPadding:"9px 22px",confirmFontSize:"13.5px",confirmWeight:"600",cancelColor:"#475569",cancelHoverBg:"#f1f5f9",cancelRadius:"10px",cancelPadding:"9px 18px",cancelFontSize:"13.5px",cancelWeight:"500"}};var u={success:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
  </svg>`,error:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
  </svg>`,warning:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
  </svg>`,info:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>`,loading:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:__toast_spin 1s linear infinite">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>`};if(typeof document<"u"&&!document.getElementById("__toast_styles")){let c=document.createElement("style");c.id="__toast_styles",c.textContent="@keyframes __toast_spin{to{transform:rotate(360deg)}}",document.head.appendChild(c)}var S=null,F={success:{wave:"sine",sf:600,ef:900,gs:.15,ge:.01,dur:.15},error:{wave:"sawtooth",sf:400,ef:200,gs:.15,ge:.01,dur:.15},warning:{wave:"triangle",sf:600,ef:380,gs:.12,ge:.01,dur:.13},info:{wave:"sine",sf:800,ef:300,gs:.15,ge:.01,dur:.1},pop:{wave:"sine",sf:700,ef:350,gs:.12,ge:.01,dur:.1}};function v(c="success",s={}){if(!(typeof window>"u"))try{S||(S=new(window.AudioContext||window.webkitAudioContext)),S.state==="suspended"&&S.resume();let n=S.createOscillator(),e=S.createGain(),o={...F[c]||F.pop,...s},r=S.currentTime;n.type=o.wave,n.frequency.setValueAtTime(o.sf,r),n.frequency.exponentialRampToValueAtTime(o.ef,r+o.dur),e.gain.setValueAtTime(o.gs,r),e.gain.exponentialRampToValueAtTime(o.ge,r+o.dur),n.connect(e),e.connect(S.destination),n.start(),n.stop(r+o.dur)}catch{}}function W(c={}){let{theme:s,toast:n,anchored:e,anchoredConfirm:o,modal:r,icons:i,...b}=c;Object.assign(l,b);let w={theme:s,toast:n,anchored:e,anchoredConfirm:o,modal:r};for(let[a,t]of Object.entries(w))if(t&&typeof t=="object")if(l[a]||(l[a]={}),a==="theme")for(let[g,h]of Object.entries(t))l.theme[g]={...l.theme[g],...h};else Object.assign(l[a],t);i&&typeof i=="object"&&Object.assign(u,i)}var A={"top-left":"top:1.5rem;left:1.5rem;flex-direction:column","top-center":"top:1.5rem;left:50%;transform:translateX(-50%);flex-direction:column","top-right":"top:1.5rem;right:1.5rem;flex-direction:column","bottom-left":"bottom:1.5rem;left:1.5rem;flex-direction:column-reverse","bottom-center":"bottom:1.5rem;left:50%;transform:translateX(-50%);flex-direction:column-reverse","bottom-right":"bottom:1.5rem;right:1.5rem;flex-direction:column-reverse"};function P(c){if(typeof document>"u")return null;let s=`__toast_c_${c.replace(/-/g,"_")}`,n=document.getElementById(s);if(!n){n=document.createElement("div"),n.id=s;let e=A[c]||A["bottom-right"];n.setAttribute("style",`position:fixed;z-index:9999;display:flex;gap:10px;pointer-events:none;${e}`),document.body.appendChild(n)}return n}var H=0,k=new Map;function y(c){let s=k.get(c);if(!s)return;clearTimeout(s.timer);let n=s.el;n.style.opacity="0",n.style.transform="scale(0.9) translateY(6px)";let e=n.offsetHeight;n.style.maxHeight=e+"px",setTimeout(()=>{n.style.transition="all 0.32s ease-out",n.style.maxHeight="0",n.style.padding="0 14px",n.style.overflow="hidden"},60),setTimeout(()=>{n.remove(),k.delete(c)},420)}function T(){[...k.keys()].forEach(y)}function m(c,s={}){var C,$;if(typeof document>"u")return()=>{};let n=l.toast,e={type:"success",position:l.position,duration:l.duration,sound:l.sound,dismissOnClick:l.dismissOnClick,showProgress:l.showProgress,description:null,icon:null,action:null,id:null,bg:n.bg,borderColor:n.borderColor,borderRadius:n.borderRadius,shadow:n.shadow,width:n.width,padding:n.padding,titleColor:n.titleColor,descColor:n.descColor,titleSize:n.titleSize,descSize:n.descSize,titleWeight:n.titleWeight,iconBg:null,iconColor:null,iconSize:n.iconSize,iconRadius:n.iconRadius,progressColor:null,progressHeight:"3px",actionColor:null,...s},o=e.type,r={...l.theme[o]||l.theme.success},i=e.icon??u[o]??u.success,b=e.id??`__toast_${++H}`,w=e.iconBg??r.light,a=e.iconColor??r.bg,t=e.progressColor??r.bg,g=e.actionColor??r.bg;e.sound&&v(o);let h=P(e.position);if(!h)return()=>{};k.size>=l.maxToasts&&y(k.keys().next().value);let d=document.createElement("div");d.id=b,d.setAttribute("style",["pointer-events:auto","position:relative","overflow:hidden","display:flex","align-items:flex-start","gap:12px",`width:${e.width}`,`background:${e.bg}`,`border:1px solid ${e.borderColor}`,`padding:${e.padding}`,`border-radius:${e.borderRadius}`,`box-shadow:${e.shadow}`,"transition:all 0.38s cubic-bezier(0.34,1.56,0.64,1)","opacity:0","transform:scale(0.9) translateY(10px)",`cursor:${e.dismissOnClick?"pointer":"default"}`].join(";")),d.innerHTML=`
    <div style="
      display:flex;align-items:center;justify-content:center;
      width:${e.iconSize};height:${e.iconSize};
      border-radius:${e.iconRadius};
      flex-shrink:0;
      background:${w};
      color:${a}
    ">
      <div style="width:16px;height:16px;display:flex">${i}</div>
    </div>

    <div style="flex:1;min-width:0;padding-top:2px">
      <p style="
        font-size:${e.titleSize};
        font-weight:${e.titleWeight};
        color:${e.titleColor};
        line-height:1.4;margin:0
      ">${c}</p>

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
        background:${t};
        width:100%;
        transition:width ${e.duration}ms linear
      "></div>
    `:""}
  `,h.appendChild(d);let p=()=>y(b),f=null;return requestAnimationFrame(()=>requestAnimationFrame(()=>{if(d.style.opacity="1",d.style.transform="scale(1) translateY(0)",e.showProgress&&e.duration>0){let x=d.querySelector("[data-toast-bar]");x&&(x.style.width="0%")}})),e.duration>0&&(f=setTimeout(p,e.duration)),d.addEventListener("mouseenter",()=>{f&&clearTimeout(f)}),d.addEventListener("mouseleave",()=>{e.duration>0&&(f=setTimeout(p,Math.min(e.duration,1500)))}),(C=d.querySelector("[data-toast-close]"))==null||C.addEventListener("click",x=>{x.stopPropagation(),p()}),e.dismissOnClick&&d.addEventListener("click",p),($=d.querySelector("[data-toast-action]"))==null||$.addEventListener("click",x=>{var z,B;x.stopPropagation(),(B=(z=e.action)==null?void 0:z.onClick)==null||B.call(z),p()}),k.set(b,{el:d,timer:f}),p}var _=0;function R(c,s={},n={}){let{loading:e="Loading\u2026",success:o="Done!",error:r="Something went wrong"}=s,{loadingOptions:i={},successOptions:b={},errorOptions:w={},...a}=n,t=`__toast_p${++_}`;return m(e,{...a,...i,type:"info",duration:0,icon:u.loading,id:t}),Promise.resolve(c).then(g=>{y(t);let h=typeof o=="function"?o(g):o;m(h,{...a,...b,type:"success"})}).catch(g=>{y(t);let h=typeof r=="function"?r(g):r;m(h,{...a,...w,type:"error"})}),()=>y(t)}function L(c,s,n={}){if(typeof document>"u"||!s)return()=>{};let e=l.anchored,o={type:"success",duration:2500,sound:l.sound,icon:null,bg:e.bg,textColor:e.textColor,arrowColor:e.arrowColor,borderRadius:e.borderRadius,fontSize:e.fontSize,fontWeight:e.fontWeight,padding:e.padding,shadow:e.shadow,iconSize:e.iconSize,iconColor:null,arrowSize:e.arrowSize,offsetY:13,...n},r=l.theme[o.type]||l.theme.success,i=o.icon??u[o.type],b=o.iconColor??r.bg,w=o.arrowColor??o.bg;o.sound&&v(o.type);let a=document.createElement("div");a.setAttribute("style",["position:absolute","z-index:9998",`padding:${o.padding}`,`background:${o.bg}`,`color:${o.textColor}`,`font-size:${o.fontSize}`,`font-weight:${o.fontWeight}`,`border-radius:${o.borderRadius}`,`box-shadow:${o.shadow}`,"pointer-events:none","white-space:nowrap","transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1)","opacity:0","transform:scale(0.85) translateY(8px)"].join(";")),a.innerHTML=`
    <div style="display:flex;align-items:center;gap:7px">
      <div style="width:${o.iconSize};height:${o.iconSize};display:flex;color:${b}">
        ${i}
      </div>
      <span>${c}</span>
    </div>
    <div style="
      position:absolute;bottom:-${parseInt(o.arrowSize)/2}px;left:50%;
      transform:translateX(-50%) rotate(45deg);
      width:${o.arrowSize};height:${o.arrowSize};
      background:${w}
    "></div>
  `,document.body.appendChild(a);let t=s.getBoundingClientRect(),{height:g,width:h}=a.getBoundingClientRect();a.style.top=`${t.top+window.scrollY-g-o.offsetY}px`,a.style.left=`${t.left+window.scrollX+t.width/2-h/2}px`,requestAnimationFrame(()=>requestAnimationFrame(()=>{a.style.opacity="1",a.style.transform="scale(1) translateY(0)"}));let d=()=>{a.style.opacity="0",a.style.transform="scale(0.9) translateY(4px)",setTimeout(()=>a.remove(),300)},p=null;return o.duration>0&&(p=setTimeout(d,o.duration)),d}function E(c,s,n,e,o={}){if(typeof document>"u"||!s)return;let r=l.anchoredConfirm,i={confirmLabel:"Yes",cancelLabel:"No",sound:l.sound,icon:null,bg:r.bg,textColor:r.textColor,iconColor:r.iconColor,borderRadius:r.borderRadius,fontSize:r.fontSize,padding:r.padding,shadow:r.shadow,minWidth:r.minWidth,arrowColor:r.arrowColor,arrowSize:r.arrowSize,offsetY:13,confirmBg:r.confirmBg,confirmColor:r.confirmColor,confirmHoverBg:r.confirmHoverBg,cancelBg:r.cancelBg,cancelColor:r.cancelColor,cancelBorder:r.cancelBorder,cancelHoverBg:r.cancelHoverBg,btnRadius:r.btnRadius,btnFontSize:r.btnFontSize,btnFontWeight:r.btnFontWeight,btnPadding:r.btnPadding,...o},b=i.icon??u.warning,w=i.arrowColor??i.bg;i.sound&&v("warning");let a=document.createElement("div");a.setAttribute("style",["position:absolute","z-index:9998",`padding:${i.padding}`,`background:${i.bg}`,`color:${i.textColor}`,`font-size:${i.fontSize}`,"font-weight:600",`border-radius:${i.borderRadius}`,`box-shadow:${i.shadow}`,"pointer-events:auto",`min-width:${i.minWidth}`,"transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1)","opacity:0","transform:scale(0.85) translateY(8px)"].join(";")),a.innerHTML=`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;color:${i.iconColor}">
      <div style="width:15px;height:15px;flex-shrink:0">${b}</div>
      <span style="font-size:${i.fontSize};color:${i.textColor}">${c}</span>
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
  `,document.body.appendChild(a);let t=s.getBoundingClientRect(),{height:g,width:h}=a.getBoundingClientRect();a.style.top=`${t.top+window.scrollY-g-i.offsetY}px`,a.style.left=`${t.left+window.scrollX+t.width/2-h/2}px`,requestAnimationFrame(()=>requestAnimationFrame(()=>{a.style.opacity="1",a.style.transform="scale(1) translateY(0)"}));let d=()=>{a.style.opacity="0",a.style.transform="scale(0.9) translateY(4px)",setTimeout(()=>a.remove(),280)},p=a.querySelector("[data-confirm]"),f=a.querySelector("[data-cancel]");p.addEventListener("mouseenter",()=>{p.style.background=i.confirmHoverBg}),p.addEventListener("mouseleave",()=>{p.style.background=i.confirmBg}),f.addEventListener("mouseenter",()=>{f.style.background=i.cancelHoverBg}),f.addEventListener("mouseleave",()=>{f.style.background=i.cancelBg}),p.onclick=()=>{d(),n==null||n()},f.onclick=()=>{d(),e==null||e()}}function O(c,s,n={}){return new Promise(e=>{if(typeof document>"u")return e(!1);let o=l.modal,r=(n.confirmVariant??"danger")==="danger",i=r?"#ef4444":"#3b82f6",b=r?"#dc2626":"#2563eb",w=r?"#fee2e2":"#dbeafe",a=r?"#ef4444":"#3b82f6",t={confirmLabel:"Confirm",cancelLabel:"Cancel",confirmVariant:"danger",icon:null,sound:l.sound,closeOnOverlayClick:!0,closeOnEscape:!0,enterToConfirm:!0,overlayBg:o.overlayBg,overlayBlur:o.overlayBlur,bg:o.bg,borderRadius:o.borderRadius,shadow:o.shadow,maxWidth:o.maxWidth,border:"none",padding:o.padding,footerBg:o.footerBg,footerBorder:o.footerBorder,footerPadding:o.footerPadding,titleColor:o.titleColor,titleSize:o.titleSize,titleWeight:o.titleWeight,messageColor:o.messageColor,messageSize:o.messageSize,iconBg:w,iconColor:a,iconCircleSize:o.iconCircleSize,iconSize:o.iconSize,iconCircleRadius:"50%",confirmBg:i,confirmColor:o.confirmColor,confirmHoverBg:b,confirmRadius:o.confirmRadius,confirmPadding:o.confirmPadding,confirmFontSize:o.confirmFontSize,confirmWeight:o.confirmWeight,confirmShadow:null,cancelColor:o.cancelColor,cancelHoverBg:o.cancelHoverBg,cancelRadius:o.cancelRadius,cancelPadding:o.cancelPadding,cancelFontSize:o.cancelFontSize,cancelWeight:o.cancelWeight,cancelBg:"transparent",cancelBorder:"none",...n},g=t.icon??u.warning,h=t.confirmShadow??`0 2px 8px ${t.confirmBg}55`;t.sound&&v("warning");let d=document.createElement("div");d.setAttribute("style",["position:fixed","inset:0","z-index:99999","display:flex","align-items:center","justify-content:center","padding:16px",`background:${t.overlayBg}`,`backdrop-filter:blur(${t.overlayBlur})`,"-webkit-backdrop-filter:blur("+t.overlayBlur+")","transition:opacity 0.25s ease","opacity:0"].join(";")),d.innerHTML=`
      <div data-modal-box style="
        width:100%;
        max-width:${t.maxWidth};
        background:${t.bg};
        border-radius:${t.borderRadius};
        border:${t.border};
        box-shadow:${t.shadow};
        overflow:hidden;
        transition:all 0.32s cubic-bezier(0.34,1.56,0.64,1);
        transform:scale(0.9) translateY(18px)
      ">
        <!-- Body -->
        <div style="padding:${t.padding}">
          <div style="
            width:${t.iconCircleSize};
            height:${t.iconCircleSize};
            border-radius:${t.iconCircleRadius};
            background:${t.iconBg};
            display:flex;align-items:center;justify-content:center;
            margin-bottom:16px;
            color:${t.iconColor}
          ">
            <div style="width:${t.iconSize};height:${t.iconSize}">${g}</div>
          </div>

          <h3 style="
            font-size:${t.titleSize};
            font-weight:${t.titleWeight};
            color:${t.titleColor};
            margin:0 0 8px;line-height:1.3
          ">${c}</h3>

          <p style="
            font-size:${t.messageSize};
            color:${t.messageColor};
            margin:0;line-height:1.65
          ">${s}</p>
        </div>

        <!-- Footer -->
        <div style="
          background:${t.footerBg};
          padding:${t.footerPadding};
          display:flex;gap:10px;justify-content:flex-end;
          border-top:1px solid ${t.footerBorder}
        ">
          <button data-modal-cancel style="
            padding:${t.cancelPadding};
            font-size:${t.cancelFontSize};
            font-weight:${t.cancelWeight};
            color:${t.cancelColor};
            background:${t.cancelBg};
            border:${t.cancelBorder};
            border-radius:${t.cancelRadius};
            cursor:pointer;
            transition:all 0.15s
          ">${t.cancelLabel}</button>

          <button data-modal-confirm style="
            padding:${t.confirmPadding};
            font-size:${t.confirmFontSize};
            font-weight:${t.confirmWeight};
            color:${t.confirmColor};
            background:${t.confirmBg};
            border:none;
            border-radius:${t.confirmRadius};
            cursor:pointer;
            box-shadow:${h};
            transition:all 0.15s
          ">${t.confirmLabel}</button>
        </div>
      </div>
    `,document.body.appendChild(d);let p=d.querySelector("[data-modal-box]"),f=d.querySelector("[data-modal-confirm]"),C=d.querySelector("[data-modal-cancel]");f.addEventListener("mouseenter",()=>{f.style.background=t.confirmHoverBg,f.style.transform="translateY(-1px)"}),f.addEventListener("mouseleave",()=>{f.style.background=t.confirmBg,f.style.transform=""}),C.addEventListener("mouseenter",()=>{C.style.background=t.cancelHoverBg}),C.addEventListener("mouseleave",()=>{C.style.background=t.cancelBg}),requestAnimationFrame(()=>{d.style.opacity="1",p.style.transform="scale(1) translateY(0)"});let $=x=>{d.style.opacity="0",p.style.transform="scale(0.9) translateY(16px)",setTimeout(()=>{d.remove(),e(x)},280)};if(f.onclick=()=>$(!0),C.onclick=()=>$(!1),t.closeOnOverlayClick&&d.addEventListener("click",x=>{x.target===d&&$(!1)}),t.closeOnEscape||t.enterToConfirm){let x=B=>{t.closeOnEscape&&B.key==="Escape"&&($(!1),z()),t.enterToConfirm&&B.key==="Enter"&&($(!0),z())},z=()=>document.removeEventListener("keydown",x);document.addEventListener("keydown",x)}})}function M(c={}){let s=(n={})=>({...c,...n});return{success:(n,e)=>m(n,{...s(e),type:"success"}),error:(n,e)=>m(n,{...s(e),type:"error"}),warning:(n,e)=>m(n,{...s(e),type:"warning"}),info:(n,e)=>m(n,{...s(e),type:"info"}),notify:(n,e)=>m(n,s(e)),promise:(n,e,o)=>R(n,e,s(o)),anchored:(n,e,o)=>L(n,e,s(o)),anchoredConfirm:(n,e,o,r,i)=>E(n,e,o,r,s(i)),modal:(n,e,o)=>O(n,e,s(o)),dismiss:y,dismissAll:T}}var j={success:(c,s)=>m(c,{type:"success",...s}),error:(c,s)=>m(c,{type:"error",...s}),warning:(c,s)=>m(c,{type:"warning",...s}),info:(c,s)=>m(c,{type:"info",...s}),notify:m,promise:R,anchored:L,anchoredConfirm:E,modal:O,dismiss:y,dismissAll:T,configure:W,ICONS:u},Be=j;export{l as DEFAULTS,u as ICONS,F as SOUND_PROFILES,E as anchoredConfirm,L as anchoredToast,W as configure,m as createToast,Be as default,T as dismissAll,y as dismissToast,O as modalConfirm,v as playSound,R as promiseToast,M as useToast};
