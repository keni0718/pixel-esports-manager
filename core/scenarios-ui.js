import*as t from"./scenarios.js";import{TITLES as z}from"../data/titles.js";const D=`
/* title screen: with Continue + Challenge Scenarios the menu wraps to a 2nd row \u2014 a slightly smaller marquee keeps it at 900px */
.title-screen:has(.title-menu > .btn:nth-child(5)) #title-canvas{width:min(540px,92vw)}
.scen-page{display:flex;flex-direction:column;height:100vh;overflow:hidden;padding:18px 22px}
.scen-page .ng-head{margin-bottom:12px}
.scen-page .ng-head .sc-rec{margin-left:auto}
.scen-grid{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1fr) 470px;gap:20px}
.scen-list{display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:min-content;gap:14px;align-content:start;min-height:0;overflow:auto;padding:4px}
.scen-card{display:grid;grid-template-columns:52px 1fr auto;gap:4px 12px;align-items:center;text-align:left;cursor:pointer;border:0;margin:0;padding:12px 14px}
.scen-card:hover{background:var(--panel2)}
.scen-card.sel{background:var(--panel2);box-shadow:0 -3px 0 0 var(--gold),0 3px 0 0 var(--gold),-3px 0 0 0 var(--gold),3px 0 0 0 var(--gold),0 9px 0 0 var(--shadow)}
.scen-card .sc-ic{grid-row:span 3;font-size:36px;line-height:1;text-align:center}
.scen-card b{font-family:var(--font-pixel);font-size:10px;line-height:1.4}
.scen-card small{font-size:16px;line-height:1.1}
.scen-card .sc-meta{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.sc-diff{color:var(--gold);letter-spacing:1px;font-size:15px}
.sc-grade{display:inline-grid;place-items:center;min-width:34px;height:30px;padding:0 4px;font-family:var(--font-pixel);font-size:12px;color:#10101a;background:var(--c,#3b4266);box-shadow:0 0 0 2px #10101a,0 3px 0 #000a}
.sc-grade.none{background:#0b0e1a;color:var(--ink-dim);box-shadow:0 0 0 2px #262c4c}
.scen-card .sc-grade{grid-row:span 3;align-self:center}
.sc-how{grid-column:1/-1;margin:4px 0 0;padding:10px 14px}.sc-how ul{margin:0;padding-left:18px;font-size:16px;line-height:1.15;color:var(--ink-dim)}
.scen-side{display:flex;flex-direction:column;gap:6px;min-height:0;overflow:auto;margin:0}
.scen-side h3{margin:4px 0 0}
.scen-side .sc-story{font-size:18px;line-height:1.15;margin:0}
.scen-side ul{margin:0;padding-left:20px;font-size:17px;line-height:1.15}
.scen-side .sc-wl{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;font-size:17px;line-height:1.15}
.scen-side .sc-wl b{font-family:var(--font-pixel);font-size:8px;padding-top:4px}
.scen-side .sc-grades{display:flex;flex-wrap:wrap;gap:4px 10px;font-size:15px;color:var(--ink-dim)}
.scen-side .np-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.scen-side .field{margin:0}
.scen-start{margin-top:auto;padding-top:8px}
.scen-strip .obj-lbl{color:var(--gold);min-width:150px}
.scen-strip.done .obj-lbl{color:var(--good)}
.scen-strip .sc-grade{align-self:center;margin-right:6px}
.scen-modal{text-align:center}
.scen-modal .sc-big{display:inline-grid;place-items:center;width:110px;height:110px;margin:6px auto 10px;font-family:var(--font-pixel);font-size:44px;color:#10101a;background:var(--c);box-shadow:0 0 0 4px #10101a,0 8px 0 #000a,0 0 30px color-mix(in srgb,var(--c) 60%,transparent);animation:scpop .5s steps(5)}
.scen-modal h2{color:var(--c)}
.scen-modal p{font-size:19px;margin:6px 0}
.scen-modal .btn-row{justify-content:center;margin-top:12px}
@keyframes scpop{0%{transform:scale(.3) rotate(-8deg);opacity:0}100%{transform:scale(1) rotate(0);opacity:1}}
@media (max-width:1100px){.scen-grid{grid-template-columns:1fr}.scen-page{height:auto;overflow:auto}}
`;function H(f){const{ui:r,G:d,esc:n,go:u,render:b,toast:v,openModal:x,closeModal:$,titleChip:E}=f;if(typeof document<"u"&&!document.getElementById("scen-style")){const e=document.createElement("style");e.id="scen-style",e.textContent=D,document.head.appendChild(e)}const h=()=>d.getState(),g=(e,s="")=>e?`<span class="sc-grade ${s}" style="--c:${t.GRADE_COLOR[e]||"#3b4266"}">${e}</span>`:`<span class="sc-grade none ${s}">\u2014</span>`,S=e=>`<span class="sc-diff" title="Difficulty ${e}/5">${"\u2605".repeat(e)}${"\u2606".repeat(5-e)}</span>`,C=e=>`<span class="mode-chip ${e.mode==="career"?"pro":""}">${e.mode==="career"?"\u2605 PRO CAREER":"ORG MANAGER"}</span>`,R=()=>{const e=d.listSaves();return(e.find(s=>s.empty)||e[0]).slot},I=e=>{try{return localStorage.getItem(e==="career"?"pxesm.lastHandle":"pxesm.lastName")||""}catch{return""}};function N(e){const s=t.SCENARIOS[r.scenSel]?r.scenSel:t.SCEN_ORDER[0];r.scenSel=s;const a=t.SCENARIOS[s],l=t.loadRecords().s,o=l[s]||{},i=d.listSaves(),p=r.scenSlot&&i.some(c=>c.slot===r.scenSlot)?r.scenSlot:R(),G=t.SCEN_ORDER.filter(c=>l[c]?.wins).length;e.innerHTML=`<section class="newgame scen-page">
      <header class="ng-head"><button class="btn sm" data-act="toTitle">\u25C0 Back</button><h2>\u{1F3AF} Challenge Scenarios</h2>
        <button class="btn sm" data-act="newpro">\u2605 Normal career</button><button class="btn sm" data-act="newgame">\u271A Normal org manager</button>
        <span class="pill dim sc-rec" title="Scenario records are stored on this device">${G}/${t.SCEN_ORDER.length} cleared</span></header>
      <div class="scen-grid">
        <div class="scen-list">${t.SCEN_ORDER.map(c=>{const m=t.SCENARIOS[c],T=l[c]?.best||null;return`<button class="panel scen-card ${c===s?"sel":""}" data-act="scenPick" data-id="${c}">
          <span class="sc-ic">${m.icon}</span><b>${n(m.name)}</b>${g(T)}
          <small>${n(m.tag)}</small>
          <span class="sc-meta">${C(m)}${m.title?E(m.title):""}${S(m.diff)}</span></button>`}).join("")}
          <div class="panel sc-how"><h3>How challenges work</h3><ul><li>A challenge is a normal save built from a New Game / New Career, then set up for the story.</li><li>Your goal and progress sit in the objective strip (My Pro in a career, the Inbox as a manager); \u24D8 shows the rules.</li><li>When it ends you get a grade S\u2013F; the best grade per challenge is kept on this device. The save keeps going afterwards.</li></ul></div></div>
        <aside class="panel scen-side">
          <header class="card-head"><h2>${a.icon} ${n(a.name)}</h2><span class="ch-meta">${S(a.diff)} ${g(o.best||null)}</span></header>
          <p class="sc-story">${n(a.story)}</p>
          <h3>Setup</h3><ul>${a.setup.map(c=>`<li>${n(c)}</li>`).join("")}</ul>
          <div class="sc-wl"><b class="good">WIN</b><span>${n(a.win)}</span><b class="bad">LOSE</b><span>${n(a.lose)}</span></div>
          <h3>Grades</h3><div class="sc-grades">${a.grading.map(c=>`<span>${n(c)}</span>`).join("")}</div>
          <p class="muted small" style="margin:2px 0">${o.plays?`Played ${o.plays}\xD7 \xB7 cleared ${o.wins||0}\xD7 \xB7 best ${o.best||"\u2014"}${o.last?` \xB7 last ${o.last.grade}`:""}`:"Not played yet."}</p>
          <div class="np-row"><label class="field">${a.mode==="career"?"In-game name":"Manager name"}<input id="sc-name" maxlength="16" value="${n(I(a.mode))}" placeholder="${a.mode==="career"?"Your IGN":"Your name"}"></label>
            <label class="field">Save slot<select id="sc-slot">${i.map(c=>`<option value="${c.slot}" ${c.slot===p?"selected":""}>Slot ${c.slot}${c.empty?" (empty)":` \u2014 overwrite ${n(c.org)}`}</option>`).join("")}</select></label></div>
          <div class="scen-start"><button class="btn btn-go big" data-act="scenStart" style="width:100%">Start challenge \u25B6</button></div>
        </aside>
      </div></section>`}function w(){const e=h(),s=t.active(e);if(!s)return"";const a=t.SCENARIOS[s.id];if(s.result)return`<div class="obj-strip scen-strip done" role="group" aria-label="Challenge scenario"><span class="obj-lbl">${a.icon} ${n(a.name.toUpperCase())}<small>${s.result.state==="won"?"CLEARED":"FAILED"}</small></span>
        ${g(s.result.grade)}<button class="obj-step ${s.result.state==="won"?"done":"skip"}" data-act="scenResult"><span class="obj-n">${s.result.state==="won"?"\u2714":"\u2715"}</span>${n(s.result.reason||"")}</button></div>`;const o=(t.track(e)||{steps:[]}).steps.map(i=>({...i}));if(!o.some(i=>/now/.test(i.st))){const i=o.findIndex(p=>!/done|skip/.test(p.st));i>=0&&(o[i].st=`${o[i].st} now`.trim())}return`<div class="obj-strip scen-strip" role="group" aria-label="Challenge scenario objective">
      <span class="obj-lbl" data-tip="${n(`${a.win} \u2014 LOSE: ${a.lose}`)}">${a.icon} ${n(a.name.toUpperCase())}<small>CHALLENGE</small></span>
      ${o.map((i,p)=>`${p?'<i class="obj-sep">\u25B8</i>':""}<button class="obj-step ${i.st}" data-act="scenInfo" data-tip="${n(i.tip||"")}"><span class="obj-n">${/done/.test(i.st)?"\u2714":/skip/.test(i.st)?"\u2715":p+1}</span>${n(i.l)}</button>`).join("")}
      <button class="obj-x" data-act="scenInfo" data-tip="Scenario rules and grades" aria-label="Scenario details">\u24D8</button></div>`}function k(){const e=t.active();if(!e)return;const s=t.SCENARIOS[e.id],a=t.track()||{steps:[]};x(`<div class="scen-modal" style="--c:var(--gold)"><h2>${s.icon} ${n(s.name)}</h2><p class="muted">${n(s.story)}</p>
      <div class="sc-wl" style="text-align:left;display:grid;grid-template-columns:auto 1fr;gap:4px 10px"><b class="good">WIN</b><span>${n(s.win)}</span><b class="bad">LOSE</b><span>${n(s.lose)}</span></div>
      <p style="text-align:left">${a.steps.map(l=>`<span class="pill ${/done/.test(l.st)?"ok":/skip/.test(l.st)?"bad":"dim"}">${n(l.l)}</span>`).join(" ")}</p>
      <p class="small muted">${s.grading.map(n).join(" \xB7 ")}</p>
      <div class="btn-row"><button class="btn" data-act="closeModal">Close</button></div></div>`)}function y(){const e=h(),s=t.active(e);if(!s?.result)return;const a=t.SCENARIOS[s.id],l=s.result,o=l.state==="won",i=t.bestGrade(s.id);x(`<div class="scen-modal" style="--c:${t.GRADE_COLOR[l.grade]||"#888"}">
      <h2>${o?"CHALLENGE CLEARED":"CHALLENGE FAILED"}</h2>
      <div class="sc-big">${n(l.grade)}</div>
      <h3>${a.icon} ${n(a.name)}</h3>
      <p>${n(l.reason||"")}</p>
      <p class="muted">Season ${l.season} \xB7 Week ${l.week} \xB7 Best on this device: <b>${n(i||l.grade)}</b>${l.newBest?' <span class="pill gold">NEW BEST</span>':""}</p>
      <p class="small muted">The save keeps going as a normal game \u2014 the result is locked in.</p>
      <div class="btn-row"><button class="btn btn-go" data-act="scenSeen">Keep playing</button><button class="btn" data-act="scenAgain">\u{1F3AF} Scenarios</button></div></div>`,"scen-wrap")}const O={career:["dash"],manager:["inbox"]};function j(e){const s=h();if(!s||["title","newgame","newpro","gameover","scenarios","live","prematch"].includes(r.view))return;const a=t.check(s);if(t.active(s)&&(O[s.mode]||[]).includes(r.view)&&e.insertAdjacentHTML("afterbegin",w()),a)try{d.saveGame()}catch{}const l=t.active(s);l?.result&&!l.result.seen&&!document.querySelector("#modal-root.open")&&setTimeout(()=>{!document.querySelector("#modal-root.open")&&t.active()?.result&&!t.active().result.seen&&y()},a?500:50)}const A={scenarios:()=>{r.scenSel||=t.SCEN_ORDER[0],u("scenarios")},scenPick:e=>{r.scenSel=e.id;const s=document.getElementById("sc-slot");s&&(r.scenSlot=+s.value),b()},scenStart:()=>{const e=r.scenSel,s=t.SCENARIOS[e];if(!s)return;const a=(document.getElementById("sc-name")?.value||"").trim(),l=+(document.getElementById("sc-slot")?.value||1),o=d.listSaves().find(p=>p.slot===l);if(o&&!o.empty&&!confirm(`Overwrite slot ${l} (${o.org})?`))return;if(a)try{localStorage.setItem(s.mode==="career"?"pxesm.lastHandle":"pxesm.lastName",a)}catch{}const i=t.startScenario(e,{name:a,slot:l});if(!i.ok)return v(i.msg,"bad");f.afterStart?.(),d.saveGame(l),r.mailId=null,u(s.mode==="career"?"dash":"inbox"),v(i.msg,"info")},scenInfo:()=>k(),scenResult:()=>y(),scenSeen:()=>{const e=t.active();e?.result&&(e.result.seen=!0,d.saveGame()),$(),b()},scenAgain:()=>{const e=t.active();e?.result&&(e.result.seen=!0),d.hasGame()&&d.saveGame(),$(),d.quitToTitle(),r.scenSel=e?.id||r.scenSel,u("scenarios")}};function L(){const e=t.active();if(!e)return"";const s=t.SCENARIOS[e.id],a=t.track()||{steps:[]};return`<div class="panel"><header class="card-head"><h2>${s.icon} Challenge: ${n(s.name)}</h2>${e.result?g(e.result.grade):'<span class="pill gold">IN PROGRESS</span>'}</header>
      <p class="small" style="margin:0 0 6px">${n(s.win)} <span class="muted">LOSE: ${n(s.lose)}</span></p>
      <p style="margin:0">${e.result?n(e.result.reason||""):a.steps.map(l=>`<span class="pill ${/done/.test(l.st)?"ok":/skip/.test(l.st)?"bad":"dim"}">${n(l.l)}</span>`).join(" ")}</p></div>`}return{views:{scenarios:N},acts:A,afterRender:j,stripHTML:w,settingsPanelHTML:L,TITLES:z}}export{H as installScenariosUI};
