const Pe=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))i(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerpolicy&&(o.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?o.credentials="include":l.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(l){if(l.ep)return;l.ep=!0;const o=n(l);fetch(l.href,o)}};Pe();const $={};function De(e){$.context=e}const Me=(e,t)=>e===t,Fe=Symbol("solid-track"),X={equals:Me};let Le=ve;const k={},R=1,V=2,$e={owned:null,cleanups:null,context:null,owner:null};var b=null;let U=null,g=null,H=null,m=null,T=null,ie=0;function ee(e,t){const n=g,i=b,l=e.length===0?$e:{owned:null,cleanups:null,context:null,owner:t||i};b=l,g=null;try{return re(()=>e(()=>ce(l)),!0)}finally{g=n,b=i}}function F(e,t){t=t?Object.assign({},X,t):X;const n={value:e,observers:null,observerSlots:null,pending:k,comparator:t.equals||void 0},i=l=>(typeof l=="function"&&(l=l(n.pending!==k?n.pending:n.value)),se(n,l));return[xe.bind(n),i]}function B(e,t,n){const i=oe(e,t,!1,R);q(i)}function le(e,t,n){Le=Ue;const i=oe(e,t,!1,R);i.user=!0,T?T.push(i):q(i)}function te(e,t,n){n=n?Object.assign({},X,n):X;const i=oe(e,t,!0,0);return i.pending=k,i.observers=null,i.observerSlots=null,i.comparator=n.equals||void 0,q(i),xe.bind(i)}function ke(e){if(H)return e();let t;const n=H=[];try{t=e()}finally{H=null}return re(()=>{for(let i=0;i<n.length;i+=1){const l=n[i];if(l.pending!==k){const o=l.pending;l.pending=k,se(l,o)}}},!1),t}function W(e){let t,n=g;return g=null,t=e(),g=n,t}function _e(e){le(()=>W(e))}function He(e){return b===null||(b.cleanups===null?b.cleanups=[e]:b.cleanups.push(e)),e}function xe(){const e=U;if(this.sources&&(this.state||e)){const t=m;m=null,this.state===R||e?q(this):Y(this),m=t}if(g){const t=this.observers?this.observers.length:0;g.sources?(g.sources.push(this),g.sourceSlots.push(t)):(g.sources=[this],g.sourceSlots=[t]),this.observers?(this.observers.push(g),this.observerSlots.push(g.sources.length-1)):(this.observers=[g],this.observerSlots=[g.sources.length-1])}return this.value}function se(e,t,n){if(H)return e.pending===k&&H.push(e),e.pending=t,t;if(e.comparator&&e.comparator(e.value,t))return t;let i=!1;return e.value=t,e.observers&&e.observers.length&&re(()=>{for(let l=0;l<e.observers.length;l+=1){const o=e.observers[l];i&&U.disposed.has(o),(i&&!o.tState||!i&&!o.state)&&(o.pure?m.push(o):T.push(o),o.observers&&Ne(o)),i||(o.state=R)}if(m.length>1e6)throw m=[],new Error},!1),t}function q(e){if(!e.fn)return;ce(e);const t=b,n=g,i=ie;g=b=e,Oe(e,e.value,i),g=n,b=t}function Oe(e,t,n){let i;try{i=e.fn(t)}catch(l){Re(l)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?se(e,i):e.value=i,e.updatedAt=n)}function oe(e,t,n,i=R,l){const o={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:b,context:null,pure:n};return b===null||b!==$e&&(b.owned?b.owned.push(o):b.owned=[o]),o}function O(e){const t=U;if(e.state===0||t)return;if(e.state===V||t)return Y(e);if(e.suspense&&W(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ie);)(e.state||t)&&n.push(e);for(let i=n.length-1;i>=0;i--)if(e=n[i],e.state===R||t)q(e);else if(e.state===V||t){const l=m;m=null,Y(e,n[0]),m=l}}function re(e,t){if(m)return e();let n=!1;t||(m=[]),T?n=!0:T=[],ie++;try{const i=e();return Be(n),i}catch(i){Re(i)}finally{m=null,n||(T=null)}}function Be(e){m&&(ve(m),m=null),!e&&(T.length?ke(()=>{Le(T),T=null}):T=null)}function ve(e){for(let t=0;t<e.length;t++)O(e[t])}function Ue(e){let t,n=0;for(t=0;t<e.length;t++){const l=e[t];l.user?e[n++]=l:O(l)}$.context&&De();const i=e.length;for(t=0;t<n;t++)O(e[t]);for(t=i;t<e.length;t++)O(e[t])}function Y(e,t){const n=U;e.state=0;for(let i=0;i<e.sources.length;i+=1){const l=e.sources[i];l.sources&&(l.state===R||n?l!==t&&O(l):(l.state===V||n)&&Y(l,t))}}function Ne(e){const t=U;for(let n=0;n<e.observers.length;n+=1){const i=e.observers[n];(!i.state||t)&&(i.state=V,i.pure?m.push(i):T.push(i),i.observers&&Ne(i))}}function ce(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),i=e.sourceSlots.pop(),l=n.observers;if(l&&l.length){const o=l.pop(),r=n.observerSlots.pop();i<l.length&&(o.sourceSlots[r]=i,l[i]=o,n.observerSlots[i]=r)}}if(e.owned){for(t=0;t<e.owned.length;t++)ce(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function Re(e){throw e}const he=Symbol("fallback");function de(e){for(let t=0;t<e.length;t++)e[t]()}function We(e,t,n={}){let i=[],l=[],o=[],r=[],s=0,c;return He(()=>de(o)),()=>{const f=e()||[];return f[Fe],W(()=>{if(f.length===0)return s!==0&&(de(o),o=[],i=[],l=[],s=0,r=[]),n.fallback&&(i=[he],l[0]=ee(p=>(o[0]=p,n.fallback())),s=1),l;for(i[0]===he&&(o[0](),o=[],i=[],l=[],s=0),c=0;c<f.length;c++)c<i.length&&i[c]!==f[c]?r[c](()=>f[c]):c>=i.length&&(l[c]=ee(d));for(;c<i.length;c++)o[c]();return s=r.length=o.length=f.length,i=f.slice(0),l=l.slice(0,s)});function d(p){o[c]=p;const[y,u]=F(f[c]);return r[c]=u,t(y,c)}}}function M(e,t){return W(()=>e(t||{}))}function ge(e){const t="fallback"in e&&{fallback:()=>e.fallback};return te(We(()=>e.each,e.children,t||void 0))}function qe(e){let t=!1;const n=te(()=>e.when,void 0,{equals:(i,l)=>t?i===l:!i==!l});return te(()=>{const i=n();if(i){const l=e.children;return(t=typeof l=="function"&&l.length>0)?W(()=>l(i)):l}return e.fallback})}function Ke(e,t,n){let i=n.length,l=t.length,o=i,r=0,s=0,c=t[l-1].nextSibling,f=null;for(;r<l||s<o;){if(t[r]===n[s]){r++,s++;continue}for(;t[l-1]===n[o-1];)l--,o--;if(l===r){const d=o<i?s?n[s-1].nextSibling:n[o-s]:c;for(;s<o;)e.insertBefore(n[s++],d)}else if(o===s)for(;r<l;)(!f||!f.has(t[r]))&&t[r].remove(),r++;else if(t[r]===n[o-1]&&n[s]===t[l-1]){const d=t[--l].nextSibling;e.insertBefore(n[s++],t[r++].nextSibling),e.insertBefore(n[--o],d),t[l]=n[o]}else{if(!f){f=new Map;let p=s;for(;p<o;)f.set(n[p],p++)}const d=f.get(t[r]);if(d!=null)if(s<d&&d<o){let p=r,y=1,u;for(;++p<l&&p<o&&!((u=f.get(t[p]))==null||u!==d+y);)y++;if(y>d-s){const P=t[r];for(;s<d;)e.insertBefore(n[s++],P)}else e.replaceChild(n[s++],t[r++])}else r++;else t[r++].remove()}}}const pe="_$DX_DELEGATE";function je(e,t,n){let i;return ee(l=>{i=l,t===document?e():N(t,e(),t.firstChild?null:void 0,n)}),()=>{i(),t.textContent=""}}function I(e,t,n){const i=document.createElement("template");i.innerHTML=e;let l=i.content.firstChild;return n&&(l=l.firstChild),l}function Ge(e,t=window.document){const n=t[pe]||(t[pe]=new Set);for(let i=0,l=e.length;i<l;i++){const o=e[i];n.has(o)||(n.add(o),t.addEventListener(o,Ve))}}function Xe(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function N(e,t,n,i){if(n!==void 0&&!i&&(i=[]),typeof t!="function")return Q(e,t,i,n);B(l=>Q(e,t(),l,n),i)}function Ve(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),$.registry&&!$.done&&($.done=!0,document.querySelectorAll("[id^=pl-]").forEach(i=>i.remove()));n!==null;){const i=n[t];if(i&&!n.disabled){const l=n[`${t}Data`];if(l!==void 0?i(l,e):i(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function Q(e,t,n,i,l){for($.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,r=i!==void 0;if(e=r&&n[0]&&n[0].parentNode||e,o==="string"||o==="number"){if($.context)return n;if(o==="number"&&(t=t.toString()),r){let s=n[0];s&&s.nodeType===3?s.data=t:s=document.createTextNode(t),n=D(e,n,i,s)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||o==="boolean"){if($.context)return n;n=D(e,n,i)}else{if(o==="function")return B(()=>{let s=t();for(;typeof s=="function";)s=s();n=Q(e,s,n,i)}),()=>n;if(Array.isArray(t)){const s=[];if(ne(s,t,l))return B(()=>n=Q(e,s,n,i,!0)),()=>n;if($.context){for(let c=0;c<s.length;c++)if(s[c].parentNode)return n=s}if(s.length===0){if(n=D(e,n,i),r)return n}else Array.isArray(n)?n.length===0?be(e,s,i):Ke(e,n,s):(n&&D(e),be(e,s));n=s}else if(t instanceof Node){if($.context&&t.parentNode)return n=r?[t]:t;if(Array.isArray(n)){if(r)return n=D(e,n,i,t);D(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function ne(e,t,n){let i=!1;for(let l=0,o=t.length;l<o;l++){let r=t[l],s;if(r instanceof Node)e.push(r);else if(!(r==null||r===!0||r===!1))if(Array.isArray(r))i=ne(e,r)||i;else if((s=typeof r)=="string")e.push(document.createTextNode(r));else if(s==="function")if(n){for(;typeof r=="function";)r=r();i=ne(e,Array.isArray(r)?r:[r])||i}else e.push(r),i=!0;else e.push(document.createTextNode(r.toString()))}return i}function be(e,t,n){for(let i=0,l=t.length;i<l;i++)e.insertBefore(t[i],n)}function D(e,t,n,i){if(n===void 0)return e.textContent="";const l=i||document.createTextNode("");if(t.length){let o=!1;for(let r=t.length-1;r>=0;r--){const s=t[r];if(l!==s){const c=s.parentNode===e;!o&&!r?c?e.replaceChild(l,s):e.insertBefore(l,n):c&&s.remove()}else o=!0}}else e.insertBefore(l,n);return[l]}function Ye(){let e;const t=s=>e=s,[n,i]=F(0),[l,o]=F(0);function r(){e!=null&&(i(e.clientWidth),o(e.clientHeight))}return _e(function(){window.addEventListener("resize",r),r()}),{canvasContainerRef:t,containerWidth:n,containerHeight:l}}function Qe(e,t,n){let i;const l=r=>i=r;let o;return le(()=>{if(i!=null){if(i.width=e(),i.height=t(),o==null){o=n(i);return}o()}}),{canvasRef:l}}function Ze(e){const t=[...e];let n=t.length,i;for(;n!=0;)i=Math.floor(Math.random()*n),n--,[t[n],t[i]]=[t[i],t[n]];return t}const ze=I('<input type="text">');function Je(e){function t(i){e.onUpdateLabel(i.currentTarget.value)}function n(i){if(i.keyCode===13){debugger;e.onEnter()}}return(()=>{const i=ze.cloneNode(!0);i.addEventListener("keypress",n);const l=e.ref;return typeof l=="function"?l(i):e.ref=i,i.addEventListener("blur",t),B(()=>i.value=e.value),i})()}class et{constructor(){this.currentFrameTimestamp=new Date().getTime(),this.lastFrameTime=this.currentFrameTimestamp,this.deltaTime=0}update(){this.currentFrameTimestamp=new Date().getTime(),this.deltaTime=(this.currentFrameTimestamp-this.lastFrameTime)/1e3,this.lastFrameTime=this.currentFrameTimestamp}}const me=I("<br>"),tt=I("<hr>"),nt=I('<main><section id="sidebar"><div id="controls"><button>Clear All</button><button>Shuffle</button><button>Cancel Spin</button></div><div id="rows"></div><ul id="history-list"></ul></section><section id="canvas"></section></main>'),it=I('<div class="input-row"><button>x</button><button>&</button></div>'),lt=I("<li></li>"),st=I("<canvas></canvas>"),Se=[["#0c79a8","#0e8ac0","#109cd8","#13acee","#2bb4f0"],["#43cd3e","#56d352","#6ad867","#7edd7b","#92e28f"],["#984907","#b05509","#c9600a","#e16c0b","#f37812"],["#640798","#7409b0","#840ac9","#940be1","#a212f3"]],J=Se[Math.floor(Math.random()*Se.length)],ye=Math.PI*2,ot=6,rt=.991,G=23,we=.4,Ae=.65,ct=5e-4,Te="white",ft="black",ut="transparent",Ce=e=>e*180/Math.PI;function at(e){return e===0&&(e=Math.floor(J.length/2)),J[e%J.length]}const Ee=[""];function ht(){const{canvasContainerRef:e,containerWidth:t,containerHeight:n}=Ye(),[i,l]=F(Ee),[o,r]=F([]),[s,c]=F(!1);let f,d;function p(h){r(a=>[h,...a].slice(0,6))}function y(){E(),l(h=>[...h,""]),d?.focus()}function u(h,a){E(),l(S=>{const L=[...S];return L.splice(h,1,a),L})}function P(h){E(),l(a=>{if(h<0||h>a.length)return a;const S=[...a];return S.splice(h,0,S[h]),S})}function K(h){E(),l(a=>{const S=[...a];return S.splice(h,1),S}),d?.focus()}function C(){!window.confirm("Are you sure you want to clear the wheel?")||(E(),l(Ee),f?.focus())}function _(){E(),l(h=>Ze(h.filter(a=>a!=null&&a.length>0)))}function E(){c(!1)}return le(()=>{i().filter(a=>a==null||a.length===0).length<1&&y()}),_e(()=>{f?.focus()}),(()=>{const h=nt.cloneNode(!0),a=h.firstChild,S=a.firstChild,L=S.firstChild,w=L.nextSibling,A=w.nextSibling,fe=S.nextSibling,ue=fe.nextSibling,Z=a.nextSibling;return L.$$click=C,w.$$click=_,A.$$click=E,N(fe,M(ge,{get each(){return i()},children:(z,x)=>(()=>{const v=it.cloneNode(!0),ae=v.firstChild,Ie=ae.nextSibling;return ae.$$click=()=>K(x),Ie.$$click=()=>P(x),N(v,M(Je,{get value(){return z()},onUpdateLabel:j=>u(x,j),ref:j=>{x===0?f=j:x===i().length-1&&(d=j)},onEnter:y}),null),v})()})),N(a,M(qe,{get when(){return o().length>0},get children(){return[me.cloneNode(!0),tt.cloneNode(!0),me.cloneNode(!0)]}}),ue),N(ue,M(ge,{get each(){return o()},children:(z,x)=>(()=>{const v=lt.cloneNode(!0);return Xe(v,"data-index",x),N(v,z),v})()})),Z.$$click=()=>c(!0),e(Z),N(Z,M(dt,{containerWidth:t,containerHeight:n,labels:i,onSpinDecision:p,spinning:s,stopSpin:()=>c(!1)})),B(()=>A.disabled=!s()),h})()}function dt(e){const t=()=>e.labels().filter(r=>r!=null&&r.length>0),{canvasRef:n}=Qe(e.containerWidth,e.containerHeight,o),i=()=>ye/t().length,l=()=>i()/2;function o(r){if(r==null){console.error("[createRenderer] Failed to find canvas element");return}const s=r.getContext("2d");if(s==null){console.error("[createRenderer] Failed to find canvas ctx");return}const c=new et;requestAnimationFrame(a);let f=0,d=0,p=0,y=0,u=0,P=0,K=0,C=0,_=0,E=!1;_=Math.random()*Ae+we;function h(){if(s==null){console.error("[setDefaults] Failed to find canvas ctx");return}s.font="20px Arial",f=Math.min(r.width,r.height),d=r.width/2,p=r.height/2,u=f/2,y=Math.min(d,p),P=d-u,K=p-u,s?.translate(P,K)}h();function a(){if(!e.spinning()){t().length===1&&(C=Math.PI);return}if(c.update(),_=_*rt,C=C+_,C>=ye&&(C=0),E=C%i()<_*6,_<ct){const L=Math.floor((360-Ce(C)%360)/Ce(i()));e.onSpinDecision(t()[L]),S(),e.stopSpin(),_=Math.random()*Ae+we;return}S(),requestAnimationFrame(a)}function S(){if(s==null)return;if(s.clearRect(0,0,r.width,r.height),t()==null||t().length===0){const w="Add some items using the sidebar",A=s.measureText(w);s.fillStyle="#ffffff",s.fillText(w,u-A.width/2,u);return}const L=t();for(let w=0;w<L.length;w++){const A=C+i()*w;s.beginPath(),s.arc(u,u,u,A,A+i(),!1),s.arc(u,u,ot,A+i(),A,!0),s.fillStyle=at(w),s.fill(),s.closePath(),s.translate(u,u),s.rotate(A+l()),s.fillStyle=Te,s.fillText(L[w],u/4,0,u),s.rotate(-(A+l())),s.translate(-u,-u)}s.beginPath(),s.moveTo(f-G,y),s.lineTo(f,y-G),s.lineTo(f,y+G),s.lineTo(f-G,y),e.spinning()?s.fillStyle=E?Te:ut:s.fillStyle=ft,s.fill(),s.stroke(),s.closePath()}return()=>{h(),a(),S()}}return(()=>{const r=st.cloneNode(!0);return n(r),r})()}Ge(["click"]);je(()=>M(ht,{}),document.getElementById("root"));