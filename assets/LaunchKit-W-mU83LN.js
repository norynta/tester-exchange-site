import{g as H,r as u,j as t}from"./react-DqeFNp_H.js";import{u as K,a as S,k as Q,m as I,s as L,t as i,j as z,b,l as V,e as Z}from"./index-B7COz0pQ.js";import"./supabase-f4bNl52y.js";const E=[{key:"email",label:"Email address"},{key:"name",label:"Name"},{key:"account",label:"Account (sign-in) details"},{key:"device_id",label:"Device or advertising ID"},{key:"location",label:"Location"},{key:"photos",label:"Photos, files or media"},{key:"payments",label:"Purchase history"},{key:"analytics",label:"App usage analytics"},{key:"crash",label:"Crash logs and diagnostics"}],P={app_name:"",package_name:"",dev_name:"",contact_email:"",website:"",short_desc:"",features:"",audience:"",min_age:"",collects:{},has_ads:!1,has_iap:!1,services:""};function J(e){const s=e&&typeof e=="object"?e:{},n={...P,collects:{}};for(const o of Object.keys(P)){const r=P[o];typeof r=="string"&&typeof s[o]=="string"?n[o]=s[o].slice(0,2e3):typeof r=="boolean"&&typeof s[o]=="boolean"&&(n[o]=s[o])}["","13","16","18"].includes(n.min_age)||(n.min_age="");const a=s.collects;if(a&&typeof a=="object")for(const o of E)a[o.key]===!0&&(n.collects[o.key]=!0);return n}const A=(e,s)=>e.trim()?e.trim():s,q=e=>E.filter(s=>e.collects[s.key]),X="Device or advertising ID (used by ad networks)",$=e=>[...q(e).map(s=>s.label),...e.has_ads&&!e.collects.device_id?[X]:[]],ee=e=>$(e).length>0,te=e=>/^[A-Z][a-z]/.test(e)?e[0].toLowerCase()+e.slice(1):e,ae=()=>new Date().toISOString().slice(0,10),W=e=>A(e.dev_name,"[your name or company]"),k=e=>A(e.contact_email,"[your contact email]"),g=e=>A(e.app_name,"[your app name]");function se(e){const s=e.services.split(/[,\n;]/).map(a=>a.trim()).filter(Boolean),n=a=>{s.some(o=>o.toLowerCase()===a.toLowerCase())||s.push(a)};return n("Google Play services"),e.has_ads&&s.length===1&&n("Advertising networks"),s}function Y(e){const s=$(e),n=s.length?s.map(c=>`- ${c}`).join(`
`):"- Nothing. The app does not collect personal data.",a=se(e).map(c=>`- ${c}`).join(`
`),o=e.min_age?`${g(e)} is intended for people aged ${e.min_age} and over. We do not knowingly collect personal data from anyone younger. If you believe a child has given us data, write to ${k(e)} and we will delete it.`:`${g(e)} is not directed at children. If you believe a child has given us personal data, write to ${k(e)} and we will delete it.`,r=s.length?"We use this data only to run and improve the app: to sign you in, to provide the features you ask for, to fix crashes and to understand which features are used.":"Because no personal data is collected, none is used.";return`# Privacy Policy for ${g(e)}

Last updated: ${ae()}

${W(e)} ("we", "us") provides the ${g(e)} Android app${e.package_name.trim()?` (${e.package_name.trim()})`:""}. This policy explains what data the app handles and your choices.

## Data we collect
${n}

${r}
${e.has_ads?`
## Advertising
The app shows ads. Ad networks may use a device or advertising ID to show relevant ads. You can reset or opt out of personalised ads in your Android settings (Settings > Google > Ads).
`:""}${e.has_iap?`
## Purchases
The app offers in-app purchases through Google Play. Payments are handled by Google; we never see or store your card details.
`:""}
## Sharing
We do not sell your personal data. We share data only with the services that help us run the app:
${a}

These services have their own privacy policies. We may also disclose data if the law requires it.

## Storage and retention
${s.length?"Data is kept while your account or the app is in use and deleted when you ask us to delete it, or when it is no longer needed.":"No personal data is stored by us."} Data sent over the network is encrypted in transit (HTTPS).

## Your choices
You can ask us to access, correct or delete your data at any time by writing to ${k(e)}. ${ee(e)?"Deletion steps are on our account deletion page.":""} Depending on where you live (for example the EU, UK or California) you may have additional rights, and we will honour them.

## Children
${o}

## Changes
If we change this policy we will update the date above. Continued use of the app means you accept the updated policy.

## Contact
${W(e)}
${k(e)}${e.website.trim()?`
${e.website.trim()}`:""}
`}function R(e){const n=q(e).length>0||e.has_ads,a=[{q:"Does your app collect or share any of the required user data types?",a:n?"Yes":"No"}];if(!n)return a.push({q:"Is all of the user data collected by your app encrypted in transit?",a:"Not asked when nothing is collected. Leave the rest of the form blank and publish."}),a;a.push({q:"Is all of the user data collected by your app encrypted in transit?",a:"Yes, if your app only talks to servers over HTTPS. If any connection is plain HTTP, answer No."}),a.push({q:"Do you provide a way for users to request that their data is deleted?",a:"Yes. Use the account deletion page from this kit as the deletion URL (App content > Data safety > Data deletion)."});const o=(r,c,h)=>{e.collects[r]&&a.push({q:`Data type: ${c}`,a:`Collected: Yes. Shared: No (unless a service you listed receives it, then also tick Shared). Purpose: ${h}. Processed ephemerally: No unless you discard it right after use.`})};return o("email","Personal info > Email address","App functionality, Account management"),o("name","Personal info > Name","App functionality, Account management"),o("account","Personal info > User IDs","App functionality, Account management"),o("device_id","Device or other IDs > Device or other IDs",e.has_ads?"Advertising or marketing, Analytics":"Analytics"),o("location","Location > Approximate or precise location","App functionality"),o("photos","Photos and videos / Files and docs","App functionality"),o("payments","Financial info > Purchase history","App functionality"),o("analytics","App activity > App interactions","Analytics"),o("crash","App info and performance > Crash logs and Diagnostics","Analytics, App functionality"),e.has_ads&&a.push({q:"Ads",a:'In Play Console > App content > Ads, answer "Yes, my app contains ads". Also declare Device or other IDs as collected for Advertising.'}),a}function O(e){return`# Delete your ${g(e)} account and data

${W(e)} makes ${g(e)}. You can ask us to delete your account and the data linked to it at any time.

## How to request deletion
1. Open ${g(e)} and go to Settings (if the app has an account screen, use "Delete account" there).
2. Or send an email to ${k(e)} from the address you used in the app, with the subject "Delete my ${g(e)} data". Tell us the app name${e.package_name.trim()?` (${e.package_name.trim()})`:""}.

## What we delete
${$(e).length?$(e).map(s=>`- ${s}`).join(`
`):"- Any data linked to you"}

We delete this within 30 days of your request and confirm by email.

## What we may keep
Records we must keep by law (for example payment records), kept only as long as the law requires. Backups are overwritten on their normal schedule, within 90 days.

## Contact
${k(e)}
`}const f={title:30,short:80,full:4e3};function U(e){const s=g(e),n=A(e.short_desc,"[what your app does in one sentence]"),a=e.features.split(new RegExp("[\\n;]|(?<=\\.)\\s")).map(d=>d.trim().replace(/\.$/,"")).filter(Boolean).slice(0,8),o=n.length<=f.short?n:n.slice(0,f.short-1).trimEnd()+"…",r=[n.endsWith(".")?n:n+".","",...a.length?["What you get:",...a.map(d=>`• ${d}`),""]:["What you get:","• [feature 1]","• [feature 2]","• [feature 3]",""],e.audience.trim()?`Made for ${te(e.audience.trim().replace(/\.$/,""))}.`:"",e.has_ads?"The app contains ads.":"No ads.",e.has_iap?"Optional in-app purchases are available.":"","",`Questions or ideas? Write to ${k(e)}.`].filter((d,_,N)=>!(d===""&&N[_-1]==="")).join(`
`).trim(),c=`${s} ${n} ${e.features}`.toLowerCase().match(/[a-z0-9]{4,}/g)??[],h=new Set(["with","that","this","your","from","have","will","then","they","what","when","also","into","more","than","only"]),p=new Map;for(const d of c)h.has(d)||p.set(d,(p.get(d)??0)+1);const y=[...p.entries()].sort((d,_)=>_[1]-d[1]||_[0].length-d[0].length).slice(0,10).map(([d])=>d);return{title:s.slice(0,f.title),short:o,full:r.slice(0,f.full),keywords:y}}function ne(e){const s=a=>a.map(o=>`Q: ${o.q}
A: ${o.a}`).join(`

`),n=U(e);return["=== PRIVACY POLICY ===",Y(e),"=== DATA SAFETY ANSWERS ===",s(R(e)),"","=== ACCOUNT DELETION PAGE ===",O(e),"=== STORE LISTING ===",`Title (${f.title}): ${n.title}

Short description (${f.short}): ${n.short}

Full description (${f.full}):
${n.full}

Keywords to work into the text: ${n.keywords.join(", ")}`].join(`

`)}function oe(e){return(e.match(/\[[^\]\n]{3,}\]/g)??[]).length}function ue(){var h,p;K();const[e]=H(),s=e.has("bought"),n=S(Q),a=S(async()=>I(L.from("launch_kits").select("id, inputs, created_at").eq("status","paid").order("created_at",{ascending:!1}))),o=S(async()=>I(L.from("apps").select("name, package_name"))),r=u.useRef(0);if(u.useEffect(()=>{if(!s||a.data===void 0||a.data.length>0||r.current>=12)return;const y=setTimeout(()=>{r.current+=1,a.reload()},3e3);return()=>clearTimeout(y)},[s,a.data,a]),a.data===void 0||n.data===void 0&&!n.error)return t.jsx("div",{className:"stack",style:{maxWidth:640},children:t.jsx("p",{className:"muted",children:i("loading")})});const c=a.data[0];return c?t.jsx(re,{kit:c,apps:o.data??[]},c.id):s&&r.current<12?t.jsxs("div",{className:"stack",style:{maxWidth:640},children:[t.jsx("h2",{children:i("k_title")}),t.jsx("p",{role:"status",children:i("k_setup")})]}):t.jsx(ie,{price:((h=n.data)==null?void 0:h.price_cents)??null,available:!!((p=n.data)!=null&&p.available)})}function ie({price:e,available:s}){const[n,a]=u.useState(!1),[o,r]=u.useState(""),c=async()=>{a(!0),r("");try{await V()}catch(p){r(Z(p)),a(!1)}},h=e?`$${(e/100).toFixed(e%100?2:0)}`:"";return t.jsxs("div",{className:"stack",style:{maxWidth:640},children:[t.jsx("h2",{children:i("k_title")}),t.jsx("p",{style:{margin:0},children:i("k_sub")}),t.jsxs("section",{className:"card",children:[t.jsx("ul",{style:{margin:0,paddingLeft:"1.2rem"},children:["k_i1","k_i2","k_i3","k_i4"].map(p=>t.jsx("li",{children:i(p)},p))}),s?t.jsx("button",{className:"primary big",disabled:n,onClick:()=>{b("kit_buy_click"),c()},children:i("k_buy",{price:h})}):t.jsx("p",{className:"small muted",style:{margin:0},children:i("k_soon")}),o&&t.jsx("p",{className:"error",role:"alert",style:{margin:0},children:o}),t.jsx("p",{className:"small muted",style:{margin:0},children:i("k_note")})]})]})}const le=(e=3)=>({rows:e,style:{width:"100%"}});function re({kit:e,apps:s}){const n=u.useMemo(()=>J(e.inputs),[e.inputs]),[a,o]=u.useState(()=>{const l=s[0];return n.app_name||!l?n:{...n,app_name:l.name??"",package_name:l.package_name}}),[r,c]=u.useState(!1),[h,p]=u.useState("idle"),y=(l,m)=>{o(v=>({...v,[l]:m})),c(!0),p("idle")},d=u.useRef(!1);u.useEffect(()=>{d.current||r||a.app_name||!s[0]||(d.current=!0,o(l=>({...l,app_name:s[0].name??"",package_name:s[0].package_name})))},[s,r,a.app_name]);const _=async l=>{p("saving");try{await I(L.rpc("save_launch_kit_inputs",{p_kit:e.id,p_inputs:l})),p("saved"),c(!1)}catch{p("error")}};u.useEffect(()=>{if(!r)return;const l=setTimeout(()=>{_(a)},1500);return()=>clearTimeout(l)},[a,r]);const N=Y(a),M=O(a),B=R(a),x=U(a),F=`${x.title}

${x.short}

${x.full}`,G=()=>{const l=URL.createObjectURL(new Blob([ne(a)],{type:"text/plain;charset=utf-8"})),m=document.createElement("a");m.href=l,m.download=`${(a.package_name||"launch-kit").replace(/[^a-z0-9._-]/gi,"_")}-launch-kit.txt`,m.click(),URL.revokeObjectURL(l),b("kit_download")},w=(l,m,v="",D="text")=>t.jsxs("label",{className:"field",children:[m,t.jsx("input",{type:D,value:a[l],placeholder:v,maxLength:200,onChange:C=>y(l,C.target.value)})]}),T=(l,m,v="",D=3)=>t.jsxs("label",{className:"field",children:[m,t.jsx("textarea",{...le(D),value:a[l],placeholder:v,maxLength:1500,onChange:C=>y(l,C.target.value)})]});return t.jsxs("div",{className:"stack",style:{maxWidth:720},children:[t.jsx("h2",{children:i("k_title")}),t.jsx("p",{style:{margin:0},children:i("k_work_sub")}),t.jsxs("section",{className:"card",children:[t.jsx("b",{children:i("k_f_app")}),w("app_name","App name","My App"),w("package_name","Package name","com.you.app"),w("dev_name","Your name or company (as on Play)","Ada Lovelace"),w("contact_email","Contact email shown to users","support@you.com","email"),w("website","Website (optional)","https://"),T("short_desc","What the app does, in one or two sentences","Tracks daily water intake and reminds you to drink.",2),T("features","Main features, one per line",`Daily goal and reminders
Weekly chart
Widgets`,4),T("audience","Who is it for?","Adults who want to build a hydration habit.",2),t.jsxs("label",{className:"field",children:["Minimum age",t.jsxs("select",{value:a.min_age,onChange:l=>y("min_age",l.target.value),children:[t.jsx("option",{value:"",children:"Not specified"}),t.jsx("option",{value:"13",children:"13+"}),t.jsx("option",{value:"16",children:"16+"}),t.jsx("option",{value:"18",children:"18+"})]})]})]}),t.jsxs("section",{className:"card",children:[t.jsx("b",{children:i("k_f_data")}),t.jsx("p",{className:"small muted",style:{margin:0},children:i("k_f_data_hint")}),E.map(l=>t.jsxs("label",{className:"row",style:{gap:8},children:[t.jsx("input",{type:"checkbox",checked:!!a.collects[l.key],onChange:m=>y("collects",{...a.collects,[l.key]:m.target.checked})}),t.jsx("span",{children:l.label})]},l.key)),t.jsxs("label",{className:"row",style:{gap:8},children:[t.jsx("input",{type:"checkbox",checked:a.has_ads,onChange:l=>y("has_ads",l.target.checked)}),t.jsx("span",{children:"The app shows ads"})]}),t.jsxs("label",{className:"row",style:{gap:8},children:[t.jsx("input",{type:"checkbox",checked:a.has_iap,onChange:l=>y("has_iap",l.target.checked)}),t.jsx("span",{children:"The app has in-app purchases"})]}),w("services","Services your app sends data to, comma separated","Firebase Analytics, AdMob, RevenueCat")]}),t.jsx("p",{className:"small muted",role:"status",style:{margin:0},children:h==="saving"?i("k_saving"):h==="saved"?i("k_saved"):h==="error"?i("k_save_err"):r?"…":""}),t.jsx(j,{title:i("k_d_policy"),text:N,hint:i("k_d_policy_hint")}),t.jsx(j,{title:i("k_d_ds"),text:ce(B),hint:i("k_d_ds_hint")}),t.jsx(j,{title:i("k_d_del"),text:M,hint:i("k_d_del_hint")}),t.jsx(j,{title:i("k_d_list"),text:F,hint:i("k_d_list_hint",{t:f.title,s:f.short,f:f.full})}),t.jsx("p",{className:"small muted",style:{margin:0},children:i("k_keywords",{words:x.keywords.join(", ")||"…"})}),t.jsxs("div",{className:"row",style:{gap:12,flexWrap:"wrap"},children:[t.jsx("button",{className:"primary",onClick:G,children:i("k_download")}),t.jsx("a",{className:"small",href:`${z}tools/production-answers/`,children:i("k_free_prod")}),t.jsx("a",{className:"small",href:"https://getrankroot.com",target:"_blank",rel:"noopener",onClick:()=>b("kit_rankroot_click"),children:i("k_next")})]}),t.jsx("p",{className:"small muted",style:{margin:0},children:i("k_disclaimer")})]})}const ce=e=>e.map(s=>`${s.q}
${s.a}`).join(`

`);function j({title:e,text:s,hint:n}){const[a,o]=u.useState(!1),r=oe(s),c=async()=>{try{await navigator.clipboard.writeText(s),o(!0),b("kit_copy",{doc:e}),setTimeout(()=>o(!1),1800)}catch{}};return t.jsxs("details",{className:"card",open:!1,children:[t.jsxs("summary",{children:[t.jsx("b",{children:e}),r>0&&t.jsxs("span",{className:"small muted",children:[" · ",i("k_blanks",{n:r})]})]}),t.jsx("p",{className:"small muted",style:{margin:".4rem 0"},children:n}),t.jsx("pre",{className:"kitdoc",children:s}),t.jsx("button",{className:"ghost small",onClick:c,children:a?i("k_copied"):i("k_copy")})]})}export{ue as default};
