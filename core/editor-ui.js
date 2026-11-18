import*as s from"./editor.js";import{TITLES as $,TITLE_ORDER as P,STAT_NAMES as D}from"../data/titles.js";import{NATIONS as C}from"../data/players.js";const F=`
.settings-page.wide{max-width:none}
.set-tabs{margin:0 0 12px}
.ed-page{display:flex;flex-direction:column;gap:10px;height:calc(100vh - 214px);min-height:420px}
.ed-top{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.ed-top .tabs{margin:0}
.ed-top .ed-flag{margin-left:auto}
.ed-body{flex:1;min-height:0;display:grid;grid-template-columns:330px minmax(0,1fr);gap:14px}
.ed-body.one{grid-template-columns:1fr 1fr}
.ed-body>.panel{margin:0;display:flex;flex-direction:column;min-height:0;padding:12px 14px}
.ed-scroll{flex:1;min-height:0;overflow:auto}
.ed-list{display:flex;flex-direction:column;gap:3px}
.ed-item{display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:4px 6px;border:0;background:none;text-align:left;cursor:pointer;font-size:17px;line-height:1.1}
.ed-item:hover{background:#ffffff0d}
.ed-item.sel{background:var(--panel2);box-shadow:inset 3px 0 0 var(--gold)}
.ed-item small{font-size:14px}
.ed-ctl{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:8px}
.ed-ctl select,.ed-ctl input,.ed-form input,.ed-form select{background:#0b0e1a;border:0;box-shadow:0 0 0 2px var(--line);padding:3px 6px;font-size:18px;min-width:0}
.ed-ctl input[type=search]{flex:1}
.ed-form{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px 12px;align-items:end;margin-bottom:8px}
.ed-form label{display:flex;flex-direction:column;gap:2px;font-size:15px;color:var(--ink-dim)}
.ed-form label.w2{grid-column:span 2}
.ed-form input[type=color]{height:30px;padding:0 2px;width:100%}
.ed-form .btn-row{grid-column:1/-1;margin:0}
.ed-tbl{width:100%;border-collapse:collapse;font-size:17px}
.ed-tbl th{font-family:var(--font-pixel);font-size:8px;color:var(--ink-dim);text-align:left;padding:3px 5px;position:sticky;top:0;background:var(--panel)}
.ed-tbl td{padding:2px 5px;border-bottom:1px dashed #262c4c;white-space:nowrap}
.ed-tbl tr.bench td{color:var(--ink-dim)}
.ed-tbl tr.sep td{border-bottom:2px solid var(--line)}
.ed-tbl .btn{padding:4px 6px;font-size:8px}
.ed-msg{min-height:22px;font-size:16px;margin:2px 0}
.ed-msg.bad{color:var(--bad)}.ed-msg.ok{color:var(--good)}
.ed-chars{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:4px 10px}
.ed-char{display:grid;grid-template-columns:1fr auto auto 72px;gap:6px;align-items:center;padding:2px 4px;font-size:16px;line-height:1.05;border-bottom:1px dashed #262c4c}
.ed-char.on{background:#ffd16610}
.ed-char small{font-size:13px;display:block}
.ed-step{display:inline-flex;align-items:center;gap:2px}
.ed-step button{width:22px;height:22px;padding:0;border:0;cursor:pointer;background:var(--panel2);color:var(--ink);font-family:var(--font-pixel);font-size:9px}
.ed-step b{min-width:26px;text-align:center;font-family:var(--font-pixel);font-size:9px}
.ed-step b.up{color:var(--good)}.ed-step b.dn{color:var(--bad)}
.ed-notes{font-size:15px;line-height:1.15;margin:0;padding-left:16px}
.ed-kv{display:grid;grid-template-columns:auto 1fr;gap:2px 10px;font-size:17px}
.ed-kv dt{color:var(--ink-dim)}
.ed-warn{font-size:14px;color:var(--warn);margin:4px 0;padding-left:16px;max-height:110px;overflow:auto}
`;function J(T){const{ui:A,G:d,esc:n,toast:f,render:g,titleChip:M,orgBadge:k,ovrBadge:x,roleChip:O}=T;if(typeof document<"u"&&!document.getElementById("ed-style")){const e=document.createElement("style");e.id="ed-style",e.textContent=F,document.head.appendChild(e)}const y=()=>d.getState(),i=()=>A.ed||={tab:"teams",tid:null,entryId:null,pid:null,q:"",patch:{},imp:null,msg:null},R=()=>(d.isCareer()?d.proPlayer()?.title:d.userTitles()[0])||P[0],I=()=>{const e=i().msg;return`<p class="ed-msg ${e?.ok?"ok":e?"bad":""}">${e?n(e.text):"&nbsp;"}</p>`},v=(e,t)=>{i().msg={ok:e.ok,text:e.ok?(t||e.msg)+(e.warnings?.length?` \xB7 ${e.warnings[0]}`:""):e.errors?.[0]||e.msg},f(i().msg.text,e.ok?e.changed?.length||e.changed===!0?"ok":"info":"bad")},S=(e,t)=>`<select data-change="${e}">${P.map(l=>`<option value="${l}" ${l===t?"selected":""}>${$[l].icon} ${$[l].short}</option>`).join("")}</select>`,h=e=>document.getElementById(e)?.value;function N(){const e=i(),t=y();(!e.tid||!$[e.tid])&&(e.tid=R());const l=[["teams","\u265F Teams"],["players","\u263A Players"],["patch","\u270E Balance patch"],["io","\u21C5 Import / Export"]],a=e.tab==="players"?z():e.tab==="patch"?B():e.tab==="io"?G():j();return`<div class="ed-page">
      <div class="ed-top"><div class="tabs">${l.map(([m,r])=>`<button class="btn sm ${e.tab===m?"btn-go":""}" data-act="edTab" data-k="${m}">${r}</button>`).join("")}</div>
        <span class="pill ${t.sandbox?"bad":t.edited?"warn":"dim"} ed-flag" data-tip="${t.sandbox?`Admin / Commissioner sandbox save (${t.editCount||1} change${(t.editCount||1)>1?"s":""} by the editor / admin tools) \u2014 tagged [SANDBOX] in the save lists.`:t.edited?`This save was changed with the editor (${t.editCount||1} edit${(t.editCount||1)>1?"s":""}) \u2014 marked \u270E edited in the save lists.`:"No editor changes in this save yet."}">${t.sandbox?"[SANDBOX] SAVE":t.edited?"\u270E EDITED SAVE":"UNEDITED SAVE"}</span></div>
      ${a}</div>`}function j(){const e=i(),t=e.tid,l=s.teamsOf(t);l.some(c=>c.id===e.entryId)||(e.entryId=d.userEntry(t)&&l.find(c=>c.id===d.userEntry(t).id)?.id||l[0]?.id||null);const a=e.entryId?d.E(e.entryId):null,m=$[t],r=a?.orgId?s.getOrg(a.orgId):null,p=m.teamSize,u=d.maxRoster(t),o=a?s.listPlayers({title:t,limit:400}).filter(c=>c.entryId!==a.id&&!c.isPro):[];return`<div class="ed-body">
      <div class="panel"><div class="ed-ctl">${S("edTid",t)}<small>${l.length} teams</small></div>
        <div class="ed-scroll ed-list">${l.map(c=>`<button class="ed-item ${c.id===e.entryId?"sel":""}" data-act="edTeam" data-id="${c.id}">${k(d.entryTag(c),d.entryColor(c))}<span>${n(d.entryLabel(c))}${d.isUserEntry(c)?' <b class="gold">\u2605</b>':""}<br><small>${n(d.entryLeague(c)?.short||"")} \xB7 ${c.playerIds.length}/${u}</small></span>${x(d.teamOvr(c))}</button>`).join("")}</div></div>
      <div class="panel">${a?`
        <header class="card-head"><h2>${k(d.entryTag(a),d.entryColor(a))} ${n(d.entryLabel(a))}</h2><span class="ch-meta">${M(t)} <span class="pill dim">${a.playerIds.length}/${u} players</span></span></header>
        <div class="ed-form">
          <label class="w2">Name<input id="ed-o-name" maxlength="${s.LIMITS.nameMax}" value="${n(r?r.name:d.entryLabel(a))}"></label>
          <label>Tag<input id="ed-o-tag" maxlength="${s.LIMITS.tagMax}" value="${n(r?r.tag:d.entryTag(a))}"></label>
          <label>Colors<span style="display:flex;gap:4px"><input type="color" id="ed-o-c1" value="${n(r?r.colors[0]||"#888888":d.entryColor(a))}">${r?`<input type="color" id="ed-o-c2" value="${n(r.colors[1]||"#ffffff")}">`:""}</span></label>
          <div class="btn-row"><button class="btn sm btn-go" data-act="edSaveTeam">Save team</button>${r?'<small class="muted">Renames the organization everywhere (all titles).</small>':""}</div></div>
        ${I()}
        <div class="ed-scroll"><table class="ed-tbl"><thead><tr><th>#</th><th>Player</th><th>Role</th><th>Age</th><th>Nat</th><th>OVR</th><th>Pot</th><th></th></tr></thead><tbody>
          ${a.playerIds.map((c,w)=>{const b=y().players[c];if(!b)return"";const L=d.isProId(c);return`<tr class="${w>=p?"bench":""} ${w===p-1?"sep":""}"><td>${w<p?w+1:"B"}</td><td>${n(b.handle)}${L?' <b class="gold">\u2605 YOU</b>':""}</td><td>${O(b.role)}</td><td>${b.age}</td><td>${n(b.nat)}</td><td>${x(d.ovr(b))}</td><td>${s.potGradeOf(b)}</td>
            <td><button class="btn sm" data-act="edOpenPlayer" data-id="${n(c)}">Edit</button>${L?"":` <button class="btn sm btn-bad" data-act="edRelease" data-id="${n(c)}" title="Release to free agency">\u2715</button>`}</td></tr>`}).join("")}
        </tbody></table></div>
        <div class="ed-ctl" style="margin:8px 0 0"><input list="ed-pool" id="ed-add" placeholder="Add player: type a handle (free agents and other teams)\u2026" style="flex:1"><datalist id="ed-pool">${o.map(c=>`<option value="${n(c.id)}">${n(c.handle)} \xB7 ${n(c.role)} \xB7 OVR ${c.ovr} \xB7 ${c.entryId?n(d.entryLabel(d.E(c.entryId))):"Free agent"}</option>`).join("")}</datalist>
          <button class="btn sm btn-go" data-act="edAdd" ${a.playerIds.length>=u?`disabled title="Roster full (${u})"`:""}>Move here</button></div>`:'<p class="muted">No teams for this title yet.</p>'}
      </div></div>`}function z(){const e=i(),t=e.tid,l=s.listPlayers({title:t,q:e.q,limit:120});e.pid&&!s.getPlayer(e.pid)&&(e.pid=null),!e.pid&&l[0]&&(e.pid=l[0].id);const a=e.pid?s.getPlayer(e.pid):null,m=a?$[a.title]:null,r=a?[...new Set([a.nat,...C])]:C,p=a?s.teamsOf(a.title):[],u=a?s.STAT_KEYS.filter(o=>o!=="cmp"||a.stats.cmp!=null||a.isPro):[];return`<div class="ed-body">
      <div class="panel"><div class="ed-ctl">${S("edTid",t)}<input type="search" data-change="edQ" value="${n(e.q)}" placeholder="Search handle / org\u2026"></div>
        <div class="ed-scroll ed-list">${l.map(o=>`<button class="ed-item ${o.id===e.pid?"sel":""}" data-act="edPlayer" data-id="${n(o.id)}">${x(o.ovr)}<span>${n(o.handle)}${o.isPro?' <b class="gold">\u2605</b>':""}<br><small>${n(o.role)} \xB7 ${o.age} \xB7 ${o.entryId?n(d.entryLabel(d.E(o.entryId))):"Free agent"}</small></span><small>${o.potGrade}</small></button>`).join("")||'<p class="muted">No players match.</p>'}</div></div>
      <div class="panel">${a?`
        <header class="card-head"><h2>${n(a.handle)} ${a.isPro?'<span class="pill gold">YOUR PRO</span>':""}</h2><span class="ch-meta">${M(a.title)} ${x(a.ovr)} <span class="pill dim">${a.entryId?n(d.entryLabel(d.E(a.entryId))):"Free agent"}</span></span></header>
        <div class="ed-form">
          <label class="w2">Handle<input id="ed-p-handle" maxlength="${s.LIMITS.handleMax}" value="${n(a.handle)}"></label>
          <label>Nationality<select id="ed-p-nat">${r.map(o=>`<option ${o===a.nat?"selected":""}>${o}</option>`).join("")}</select></label>
          <label>Age (${s.LIMITS.ageMin}\u2013${s.LIMITS.ageMax})<input id="ed-p-age" type="number" min="${s.LIMITS.ageMin}" max="${s.LIMITS.ageMax}" value="${a.age}"></label>
          <label class="w2">${m.genre==="fgc"?"Archetype":"Role"}<select id="ed-p-role">${m.roles.map(o=>`<option ${o===a.role?"selected":""}>${n(o)}</option>`).join("")}</select></label>
          <label>Potential grade<select id="ed-p-grade">${s.GRADE_ORDER.map(o=>`<option ${o===a.potGrade?"selected":""}>${o}</option>`).join("")}</select></label>
          <label>${a.isPro?"Scout projection":"Ceiling (pot)"}<input id="ed-p-pot" type="number" min="1" max="99" value="${a.pot}"></label>
          ${u.map(o=>`<label>${n(D[o]||(o==="cmp"?"Composure":o))}<input id="ed-p-s-${o}" type="number" min="${s.LIMITS.statMin}" max="${s.LIMITS.statMax}" value="${Math.round(a.stats[o]??70)}"></label>`).join("")}
          <label class="w2">Team${a.isPro?" (contracts only)":""}<select id="ed-p-team" ${a.isPro?"disabled":""}><option value="">Free agent</option>${p.map(o=>`<option value="${o.id}" ${o.id===a.entryId?"selected":""} ${o.id!==a.entryId&&o.playerIds.length>=d.maxRoster(a.title)?"disabled":""}>${n(d.entryLabel(o))} (${o.playerIds.length}/${d.maxRoster(a.title)})</option>`).join("")}</select></label>
          <div class="btn-row"><button class="btn sm btn-go" data-act="edSavePlayer">Save player</button><button class="btn sm" data-act="edPlayer" data-id="${n(a.id)}">\u21BA Revert</button><small class="muted">Stats ${s.LIMITS.statMin}\u2013${s.LIMITS.statMax} \xB7 roles valid for ${n(m.short)} \xB7 lineups and the import cap are re-checked after a save.</small></div></div>
        ${I()}`:'<p class="muted">Pick a player.</p>'}</div></div>`}function B(){const e=i(),t=e.tid,l=s.patchState(t),a=$[t];e.patch||={};for(const p of Object.keys(e.patch))a.pool.some(u=>u.id===p)||delete e.patch[p];const m=Object.values(e.patch).filter(Boolean).length,r=l.lastNote;return`<div class="ed-body">
      <div class="panel"><div class="ed-ctl">${S("edTid",t)}</div>
        <dl class="ed-kv"><dt>Live patch</dt><dd><b>${n(l.patch)}</b>${r?.custom?' <span class="pill warn">CUSTOM</span>':""}</dd><dt>Next official</dt><dd>${l.next==null?"\u2014":l.next?`in ${l.next} wk`:"this week"}</dd></dl>
        <h3>Latest notes</h3>
        <div class="ed-scroll"><ul class="ed-notes">${(r?.changes||[]).map(p=>`<li>${p.map?n(p.text):`${n(p.name)} ${p.dir>0?'<b class="good">\u25B2 BUFF</b>':'<b class="bad">\u25BC NERF</b>'}`}</li>`).join("")||'<li class="muted">No patch yet.</li>'}${r?.ps?`<li>Playstyle ${n(r.ps.name)} ${r.ps.dir>0?"\u25B2":"\u25BC"}</li>`:""}</ul>
        <p class="muted small">Live buffs play at +4% execution, nerfs at \u22124% (deep pools soften nerfs). Strength is the draft-meta tier (\u22126\u2026+6). A custom patch replaces the live one immediately.</p></div></div>
      <div class="panel"><header class="card-head"><h2>\u270E Custom patch \xB7 ${n(a.short)} ${n(a.poolLabel)}</h2><span class="ch-meta"><span class="pill ${m?"gold":"dim"}">${m} change${m===1?"":"s"}</span></span></header>
        <div class="ed-scroll"><div class="ed-chars">${l.chars.map(p=>{const u=e.patch[p.id]||0,o=Math.max(-s.LIMITS.strength,Math.min(s.LIMITS.strength,p.strength+u));return`<div class="ed-char ${u?"on":""}"><span>${n(p.name)}<small>${n(p.cls)}${p.live?` \xB7 live ${p.live>0?"\u25B2":"\u25BC"}`:""}</small></span>
          <span class="tier tier-${p.tier}" title="Strength ${p.strength}">${p.tier}</span><span>${u?`\u2192 <span class="tier tier-${d.metaTier(o)}">${d.metaTier(o)}</span>`:""}</span>
          <span class="ed-step"><button data-act="edDelta" data-id="${p.id}" data-d="-1" ${u<=-s.LIMITS.patchMag?"disabled":""}>\u2212</button><b class="${u>0?"up":u<0?"dn":""}">${u>0?"+":""}${u||"0"}</b><button data-act="edDelta" data-id="${p.id}" data-d="1" ${u>=s.LIMITS.patchMag?"disabled":""}>+</button></span></div>`}).join("")}</div></div>
        ${I()}
        <div class="ed-ctl" style="margin:4px 0 0"><input id="ed-patch-name" maxlength="40" placeholder="Patch name (optional)" style="flex:1"><button class="btn sm" data-act="edPatchReset" ${m?"":"disabled"}>\u21BA Reset</button><button class="btn sm btn-go" data-act="edPatchApply" ${m?"":"disabled"}>Apply custom patch now</button></div></div></div>`}function G(){const e=i(),t=y(),l=e.imp,a=s.pendingWorld();return`<div class="ed-body one">
      <div class="panel"><header class="card-head"><h2>\u2B73 Export world</h2></header>
        <p class="small" style="margin:0 0 8px">Every team's roster (org + title), each player's handle, nationality, age, role, stats and potential, org names / tags / colors and every title's balance state, as one JSON file. Share it, edit it in any text editor, then import it here or into a new game.</p>
        <div class="btn-row"><button class="btn btn-go" data-act="edExport">\u2B73 Download world JSON</button><button class="btn" data-act="edExportFA">\u2B73 Without free agents</button></div>
        <h3 style="margin-top:14px">Edit log</h3>
        <div class="ed-scroll"><ul class="ed-notes">${(t.editLog||[]).slice(-8).reverse().map(r=>`<li><small class="muted">S${r.s} W${r.w}</small> ${n(r.what)}</li>`).join("")||'<li class="muted">No editor changes yet \u2014 this save is unedited.</li>'}</ul></div></div>
      <div class="panel"><header class="card-head"><h2>\u2B71 Import world</h2>${a?'<span class="pill gold">QUEUED FOR NEW GAME</span>':""}</header>
        <p class="small" style="margin:0 0 8px">Files are checked before anything changes: max ${s.LIMITS.importBytes/1048576} MB, JSON only, unknown fields ignored, stats clamped ${s.LIMITS.statMin}\u2013${s.LIMITS.statMax}, ages ${s.LIMITS.ageMin}\u2013${s.LIMITS.ageMax}, roles checked per title, rosters capped and import limits enforced.</p>
        <label class="btn">\u2B71 Choose world file<input type="file" accept=".json,application/json" data-change="edImportFile" hidden></label>
        ${l?l.ok?`<dl class="ed-kv" style="margin-top:10px"><dt>File</dt><dd>${n(l.name||"world.json")}</dd><dt>Contents</dt><dd>${l.summary.teams} rosters \xB7 ${l.summary.players} players \xB7 ${l.summary.orgs} orgs \xB7 ${l.summary.metaTitles} titles' meta</dd>${l.summary.source?.season?`<dt>Exported</dt><dd>Season ${l.summary.source.season} (${n(l.summary.source.mode||"?")})</dd>`:""}</dl>
            ${l.warnings?.length?`<ul class="ed-warn">${l.warnings.slice(0,12).map(r=>`<li>${n(r)}</li>`).join("")}</ul>`:""}
            <div class="btn-row" style="margin-top:8px"><button class="btn btn-go" data-act="edImportApply">Apply to this save</button><button class="btn" data-act="edImportNew">Use in a new game \u25B6</button><button class="btn btn-bad sm" data-act="edImportClear">Discard</button></div>`:`<p class="ed-msg bad">${n(l.errors?.[0]||"Invalid file.")}</p>`:""}
        ${a&&!l?'<p class="small">A world file is queued: it is applied right after you start the next New Game, Pro Career or Challenge Scenario. <button class="btn sm" data-act="edPendClear">Cancel</button></p>':""}
        ${I()}</div></div>`}function E(e,t){const l=new Blob([t],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(l),a.download=e,a.click(),setTimeout(()=>URL.revokeObjectURL(a.href),1e3)}return{html:N,acts:{edTab:e=>{i().tab=e.k,i().msg=null,g()},edTeam:e=>{i().entryId=e.id,i().msg=null,g()},edPlayer:e=>{i().pid=e.id,i().msg=null,g()},edOpenPlayer:e=>{const t=i();t.pid=e.id,t.tab="players",t.msg=null,g()},edSaveTeam:()=>{const e=d.E(i().entryId);if(!e)return;const t=h("ed-o-c2"),l=e.orgId?s.editOrg(e.orgId,{name:h("ed-o-name"),tag:h("ed-o-tag"),colors:t?[h("ed-o-c1"),t]:[h("ed-o-c1")]}):s.editEntry(e.id,{name:h("ed-o-name"),tag:h("ed-o-tag"),color:h("ed-o-c1")});v(l),l.changed.length&&d.saveGame(),g()},edRelease:e=>{const t=s.movePlayer(e.id,null);v(t,"Released to free agency"),t.ok&&d.saveGame(),g()},edAdd:()=>{const e=(h("ed-add")||"").trim();if(!e)return;const t=y(),l=i().tid,a=Object.prototype.hasOwnProperty.call(t.players,e)?e:s.listPlayers({title:l,q:e,limit:5}).find(r=>r.handle.toLowerCase()===e.toLowerCase())?.id;if(!a)return i().msg={ok:!1,text:`No ${$[l].short} player "${e}".`},g();const m=s.movePlayer(a,i().entryId);v(m,`${t.players[a].handle} moved`),m.ok&&d.saveGame(),g()},edSavePlayer:()=>{const e=s.getPlayer(i().pid);if(!e)return;const t={};for(const r of s.STAT_KEYS){const p=h(`ed-p-s-${r}`);p!=null&&(t[r]=p)}const l={handle:h("ed-p-handle"),nat:h("ed-p-nat"),age:h("ed-p-age"),role:h("ed-p-role"),stats:t,potGrade:h("ed-p-grade")},a=h("ed-p-pot");a!=null&&+a!==e.pot&&(l.pot=a),e.isPro||(l.entryId=h("ed-p-team")||null);const m=s.editPlayer(e.id,l);v(m),m.changed.length&&d.saveGame(),g()},edDelta:e=>{const t=i(),l=Math.max(-s.LIMITS.patchMag,Math.min(s.LIMITS.patchMag,(t.patch[e.id]||0)+ +e.d));l?t.patch[e.id]=l:delete t.patch[e.id],g()},edPatchReset:()=>{i().patch={},g()},edPatchApply:()=>{const e=i(),t=s.applyPatch(e.tid,e.patch,{name:h("ed-patch-name")||""});v(t,t.ok?`Patch ${t.note.patch} is live`:""),t.ok&&(e.patch={},d.saveGame()),g()},edExport:()=>{const e=y();E(`pixel-esports-world-S${e.season}W${e.week}.json`,s.exportWorldJSON()),f("World exported.")},edExportFA:()=>{const e=y();E(`pixel-esports-rosters-S${e.season}W${e.week}.json`,s.exportWorldJSON({freeAgents:!1})),f("Rosters exported.")},edImportApply:()=>{const e=i().imp;if(!e?.ok)return;const t=s.importWorld(e);i().imp=null,i().msg={ok:t.ok,text:t.ok?t.msg:t.errors[0]},f(i().msg.text,t.ok?"ok":"bad"),t.ok&&t.changed&&d.saveGame(),g()},edImportNew:()=>{const e=i().imp;e?.ok&&(s.setPendingWorld(e),i().imp=null,d.hasGame()&&d.saveGame(),d.quitToTitle(),f("World queued \u2014 start a New Game, Pro Career or Challenge and it is applied right away.","info"),T.go("title"))},edImportClear:()=>{i().imp=null,g()},edPendClear:()=>{s.setPendingWorld(null),g()}},changes:{edTid:e=>{const t=i();t.tid=e.value,t.entryId=null,t.pid=null,t.patch={},t.msg=null,g()},edQ:e=>{i().q=e.value,i().pid=null,g()},edImportFile:e=>{const t=e.files?.[0];if(t){if(t.size>s.LIMITS.importBytes)return i().imp={ok:!1,errors:[`File too large (${(t.size/1048576).toFixed(1)} MB \u2014 limit ${s.LIMITS.importBytes/1048576} MB).`]},g();t.text().then(l=>{const a=s.parseWorld(l);a.name=t.name,i().imp=a,i().msg=null,g()}).catch(()=>{i().imp={ok:!1,errors:["Could not read that file."]},g()})}}}}}export{J as installEditorUI};
