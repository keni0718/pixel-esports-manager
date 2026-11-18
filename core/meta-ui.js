import*as n from"./game-state.js";import*as i from"./meta-patches.js";import{TITLES as w}from"../data/titles.js";const e=p=>String(p??"").replace(/[&<>"']/g,r=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[r]),g=()=>n.getState(),k=`${i.CHIP_CSS}
.mp-notes{display:flex;flex-direction:column;min-height:0}
.mp-notes .card-head{margin-bottom:6px}
.mp-sub{margin:0 0 8px;font-size:17px;color:var(--ink-dim)}
.mp-sub b.good,.mp-sub b.bad{font-family:var(--font-pixel);font-size:9px}
.mp-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(205px,1fr));gap:8px;max-height:430px;overflow:auto;padding:2px}
.mp-card{position:relative;background:var(--panel2);box-shadow:0 0 0 2px #000,inset 4px 0 0 var(--mc);padding:6px 8px 6px 12px;line-height:1.1}
.mp-card.bf{--mc:var(--good)}.mp-card.nf{--mc:var(--bad)}.mp-card.ps{--mc:var(--gold);background:#2a2640}.mp-card.mapc{--mc:var(--accent2)}
.mp-card .mp-h{display:flex;align-items:center;gap:6px;margin-bottom:3px}
.mp-card .mp-h b{font-family:var(--font-pixel);font-size:9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mp-card .mp-h small{color:var(--ink-dim);font-size:15px}
.mp-card.ps .mp-h b{white-space:normal;line-height:1.3}
.mp-card .mp-tag{margin-left:auto;font-family:var(--font-pixel);font-size:7px;padding:2px 3px;color:#000;background:var(--mc);white-space:nowrap}
.mp-card p{margin:0;font-size:17px}
.mp-card .mp-f{display:flex;gap:6px;align-items:center;margin-top:3px;font-size:15px;color:var(--ink-dim)}
.mp-card.mine{box-shadow:0 0 0 2px var(--gold),inset 4px 0 0 var(--mc)}
.mp-exp{margin:8px 0 0;font-size:17px}
.mp-exp .tag{font-size:15px}
.mp-old{margin-top:6px;font-size:16px}
.mp-old summary{cursor:pointer;font-family:var(--font-pixel);font-size:9px;color:var(--ink-dim)}
.mp-old ul{margin:4px 0 0;padding-left:16px;max-height:120px;overflow:auto}
.mp-old li{margin:1px 0}
.split2:has(> .mp-notes) > .panel:first-child{max-height:calc(100vh - 130px);overflow:auto}
.split2:has(> .mp-notes) .row-head{margin-bottom:6px}
.split2:has(> .mp-notes) .tier-row{padding:3px 0;gap:8px;grid-template-columns:40px 1fr}
.split2:has(> .mp-notes) .tier.big{width:36px;font-size:12px;padding:7px 0}
.split2:has(> .mp-notes) .pool-chip{padding:1px 6px;margin:2px 4px 2px 0;line-height:1.05}
.split2:has(> .mp-notes) .pool-chip small{font-size:13px}
.split2:has(> .mp-notes) h3{margin:8px 0 4px}`;function b(){if(typeof document>"u"||document.getElementById("mp-css"))return;const p=document.createElement("style");p.id="mp-css",p.textContent=k,document.head.appendChild(p)}function P(p,r){const c=g()?.meta?.[p];return c?(b(),i.chipOf(c,r)):""}function E(p){const r=g().meta[p],c=[],t=n.isCareer()?n.proPlayer():null,s=t?t.entryId?n.E(t.entryId):null:n.userEntry(p),x=t&&t.title===p?[t,...s?n.starters(s).filter(o=>o.id!==t.id):[]]:s?n.starters(s):[];for(const o of x){const l=Object.entries(o.mastery||{}).sort((f,$)=>$[1]-f[1])[0]?.[0],d=l?i.liveVal(r,l):0;if(!d)continue;const h=i.pickExec(r,o,l);c.push(`<span class="tag ${d>0?"good":""}" title="${e(o.handle)} \u2014 Pool Mastery ${o.stats?.pool??"?"}${d<0?" (deep pools soften nerfs)":""}">${e(o.handle)}${o===t?" (you)":""}: ${e(n.charName(p,l))} <b class="${d>0?"good":"bad"}">${h>0?"+":""}${h.toFixed(1)}%</b></span>`)}return c}const y=p=>n.metaTier(p);function N(p,r=null){b();const c=w[p],t=g().meta[p],s=t.notes[0],x=i.weeksToPatch(t,g().totalWeek),o=x==null?`\u2264${c.patchCadence} wk`:x<=0?"this week":`${x} wk`;if(!s)return`<div class="panel mp-notes"><h2>Patch notes</h2><p class="muted">Launch patch ${e(t.patch)}. Next balance patch in ${o} \u2014 then every ${i.PATCH_TUNE.gapLo}\u2013${i.PATCH_TUNE.gapHi} weeks.</p></div>`;const l=n.isCareer()?n.proPlayer():null,d=new Set(l&&l.title===p?Object.entries(l.mastery||{}).sort((a,m)=>m[1]-a[1]).slice(0,3).map(a=>a[0]):[]),h=a=>r?r(a):`<span class="tier tier-${y(a)}">${y(a)}</span>`,f=a=>a.map?`<div class="mp-card mapc"><div class="mp-h"><b>Map pool</b><span class="mp-tag">\u{1F5FA} ROTATION</span></div><p>${e(a.text.replace(/^Map pool update: /,""))}</p></div>`:`<div class="mp-card ${a.dir>0?"bf":"nf"}${d.has(a.id)?" mine":""}"><div class="mp-h"><b>${e(a.name)}</b><small>${e(a.cls||"")}</small><span class="mp-tag">${a.dir>0?"\u25B2 BUFF":"\u25BC NERF"}</span></div>
      <p>${e(a.text)}</p><div class="mp-f">Tier now ${h(a.after)}<span>${a.dir>0?"+":"\u2212"}${i.PATCH_TUNE.exec}% exec</span>${d.has(a.id)?'<span class="gold">\u2605 your pool</span>':""}</div></div>`,$=s.ps?`<div class="mp-card ps"><div class="mp-h"><b>${e(s.ps.name)}</b><small>playstyle</small><span class="mp-tag" style="background:${s.ps.dir>0?"var(--good)":"var(--bad)"}">${s.ps.dir>0?"\u25B2 META":"\u25BC OFF-META"}</span></div>
      <p>${e(s.ps.text)}.</p><div class="mp-f">${s.ps.dir>0?"+":"\u2212"}${i.PATCH_TUNE.exec*i.PATCH_TUNE.psW}% exec \xB7 ${e((s.ps.ids||[]).map(a=>n.charName(p,a)).slice(0,5).join(", "))}${(s.ps.ids||[]).length>5?"\u2026":""}</div></div>`:"",T=p==="lol"?(()=>{const a=n.mapTraitOf(p,null);return a?`<div class="mp-card mapc"><div class="mp-h"><b>The Rift</b><span class="mp-tag">${e(a.name)}</span></div><p>${e(a.blurb||"The Rift state rotates with every patch.")}</p><div class="mp-f">Fits: ${e(a.fits||"")}</div></div>`:""})():"",v=E(p),u=t.notes.slice(1,8);return`<div class="panel mp-notes"><header class="card-head"><h2>Patch ${e(s.patch)} notes</h2><span class="ch-meta"><span class="pill dim">S${s.season} W${s.week}${s.reason?` \xB7 ${e(s.reason)}`:""}</span><span class="pill">Next patch: ${o}</span></span></header>
    <p class="mp-sub">Live picks: <b class="good">BUFF +${i.PATCH_TUNE.exec}%</b> / <b class="bad">NERF \u2212${i.PATCH_TUNE.exec}%</b> execution (\u2248\xB12pp per game). Deep Pool Mastery softens nerfs; one-tricks eat them in full.</p>
    <div class="mp-cards">${s.changes.filter(a=>!a.map).map(f).join("")}${$}${T}${s.changes.filter(a=>a.map).map(f).join("")}</div>
    ${v.length?`<p class="mp-exp">Roster mains this patch: ${v.join(" ")}</p>`:""}
    ${u.length?`<details class="mp-old"><summary>Earlier patches (${u.length})</summary><ul>${u.map(a=>`<li><b>${e(a.patch)}</b> <small class="muted">S${a.season} W${a.week}</small> ${a.changes.filter(m=>!m.map).map(m=>`<span class="${m.dir>0?"good":"bad"}">${e(m.name)} ${m.dir>0?"\u25B2":"\u25BC"}</span>`).join(", ")}${a.ps?` \xB7 <i>${e(a.ps.name)} ${a.ps.dir>0?"\u25B2":"\u25BC"}</i>`:""}</li>`).join("")}</ul></details>`:""}
  </div>`}export{P as chip,b as ensureCss,N as patchNotesHTML};
