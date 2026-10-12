// Shared order / warranty request form for the NBTS parts pages (Lawson SuperSump, ETS-UV Wafer).
// Same fields, same webhook and same behaviour as the Defender SP-55 Parts & Warranty page:
//   1. fires a 'nbts-part-action' event on window,
//   2. calls window.PARTS_ACTIONS.order / .warranty if set, and
//   3. posts multipart form data to the n8n part-request webhook.
// Usage: PartsRequest.open({action:'order'|'warranty', model, modelKey, part, partTitle, partNumber, description, note, extra:{...}})
(function(){
  const REQUEST_WEBHOOK = 'https://glenbot.app.n8n.cloud/webhook/nbts-part-request';
  const CONTACT_KEY = 'sp55-req-contact'; // shared with the Defender page so contact details carry over
  const css = `
  #reqdlg{border:1.5px solid var(--ink);border-radius:3px;background:var(--panel);color:var(--ink);padding:0;width:min(560px,calc(100vw - 24px));max-height:calc(100dvh - 24px);box-shadow:0 18px 48px rgba(0,0,0,.25)}
  #reqdlg::backdrop{background:rgba(20,22,26,.45)}
  #reqdlg form{display:flex;flex-direction:column;max-height:calc(100dvh - 28px)}
  #reqdlg .rh{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;padding:16px 18px 10px;border-bottom:1px solid var(--rule)}
  #reqdlg .rh h2{margin:0;font:600 19px/1.1 "Barlow Semi Condensed",system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase}
  #reqdlg .kicker{font:500 10px "Barlow Semi Condensed",system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;margin-bottom:4px}
  #reqdlg.order .kicker{color:var(--accent)} #reqdlg.warranty .kicker{color:var(--leader)}
  #reqdlg .x{border:0;font-size:20px;line-height:1;padding:2px 6px}
  #reqdlg .rb{overflow-y:auto;padding:14px 18px;display:flex;flex-direction:column;gap:14px}
  #reqdlg .partbox{background:var(--sheet);border:1px solid var(--rule);border-left:3px solid var(--accent);padding:8px 10px;font-size:12.5px;line-height:1.45}
  #reqdlg.warranty .partbox{border-left-color:var(--leader)}
  #reqdlg .partbox b{font:600 13px "Barlow Semi Condensed",system-ui,sans-serif;letter-spacing:.04em}
  #reqdlg fieldset{border:0;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:10px 12px}
  #reqdlg legend{grid-column:1/-1;font:600 11px "Barlow Semi Condensed",system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-2);border-bottom:1px solid var(--rule);padding-bottom:4px;margin-bottom:8px;width:100%}
  #reqdlg label{display:flex;flex-direction:column;gap:4px;font-size:12px;font-weight:500;color:var(--ink-2)}
  #reqdlg label.full{grid-column:1/-1}
  #reqdlg label.chk{flex-direction:row;align-items:center;gap:8px;color:var(--ink)}
  #reqdlg .req::after{content:' *';color:var(--leader)}
  #reqdlg input,#reqdlg select,#reqdlg textarea{font:400 14px "Barlow",system-ui,sans-serif;color:var(--ink);background:var(--panel);border:1px solid var(--rule);border-radius:2px;padding:7px 8px;min-width:0}
  #reqdlg input[type=checkbox]{width:16px;height:16px;padding:0}
  #reqdlg textarea{min-height:70px;resize:vertical}
  #reqdlg input:focus,#reqdlg select:focus,#reqdlg textarea:focus{outline:2px solid var(--focus);outline-offset:0;border-color:var(--focus)}
  #reqdlg input:user-invalid,#reqdlg textarea:user-invalid,#reqdlg select:user-invalid{border-color:var(--leader)}
  #reqdlg [hidden]{display:none!important}
  #reqdlg .rf{display:flex;justify-content:flex-end;align-items:center;gap:8px;padding:12px 18px;border-top:1px solid var(--rule)}
  #reqdlg .rf .msg{margin-right:auto;font-size:12px;color:var(--ink-2)}
  #reqdlg .rf button[type=submit]{background:var(--accent);border-color:var(--accent);color:#fff}
  #reqdlg.warranty .rf button[type=submit]{background:var(--leader);border-color:var(--leader)}
  #reqdlg .done{padding:22px 18px;display:flex;flex-direction:column;gap:10px;font-size:14px;line-height:1.5}
  #reqdlg .done pre{white-space:pre-wrap;font:12px/1.45 ui-monospace,Menlo,monospace;background:var(--sheet);border:1px solid var(--rule);padding:10px;margin:0;max-height:220px;overflow:auto}
  @media (max-width:640px){ #reqdlg fieldset{grid-template-columns:1fr} }`;
  const body = `
        <div class="partbox" id="reqpart"></div>
        <fieldset>
          <legend>Contact</legend>
          <label><span class="req">Name</span><input name="name" autocomplete="name" required></label>
          <label><span class="req">Company</span><input name="company" autocomplete="organization" required></label>
          <label><span class="req">Email</span><input name="email" type="email" autocomplete="email" required></label>
          <label>Phone<input name="phone" type="tel" autocomplete="tel"></label>
          <label class="full">Facility / site name<input name="site"></label>
        </fieldset>
        <fieldset data-for="order">
          <legend>Order</legend>
          <label><span class="req">Quantity</span><input name="quantity" type="number" min="1" step="1" value="1" required></label>
          <label>PO number<input name="po"></label>
          <label>Need by<input name="needBy" type="date"></label>
          <label>Shipping<select name="shipping"><option>Standard ground</option><option>2-day</option><option>Next day</option><option>Customer pickup</option></select></label>
          <label class="full"><span class="req">Ship-to address</span><textarea name="shipTo" autocomplete="street-address" required></textarea></label>
        </fieldset>
        <fieldset data-for="warranty">
          <legend>Warranty claim</legend>
          <label><span class="req" id="reqseriallbl">Serial number</span><input name="serial" required></label>
          <label><span class="req">Start-up date</span><input name="startup" type="date" required></label>
          <label><span class="req">Date of failure</span><input name="failDate" type="date" required></label>
          <label><span class="req">Quantity affected</span><input name="qtyAffected" type="number" min="1" step="1" value="1" required></label>
          <label class="full"><span class="req">What happened</span><textarea name="failure" placeholder="Symptoms, operating conditions, when it was noticed" required></textarea></label>
          <label class="full">Photos<input name="photos" type="file" accept="image/*" multiple></label>
          <label class="full chk"><input name="partAvailable" type="checkbox" value="yes">Failed part is available for return</label>
          <label class="full"><span class="req">Ship replacement to</span><textarea name="shipToW" autocomplete="street-address" required></textarea></label>
        </fieldset>
        <fieldset>
          <legend>Anything else</legend>
          <label class="full">Notes<textarea name="notes"></textarea></label>
        </fieldset>`;
  let dlg, form, reqMsg, reqSubmit, reqCtx=null, cfg={};
  const esc=t=>String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  function build(){
    if(dlg) return;
    const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
    dlg=document.createElement('dialog'); dlg.id='reqdlg'; dlg.setAttribute('aria-labelledby','reqtitle');
    dlg.innerHTML=`<form id="reqform" novalidate>
      <div class="rh"><div><div class="kicker" id="reqkicker"></div><h2 id="reqtitle">Order part</h2></div><button type="button" class="x" data-close aria-label="Close">×</button></div>
      <div class="rb" id="reqbody">${body}</div>
      <div class="rf"><span class="msg" id="reqmsg"></span><button type="button" data-close>Cancel</button><button type="submit" id="reqsubmit">Submit request</button></div>
    </form>`;
    document.body.appendChild(dlg);
    form=dlg.querySelector('form'); reqMsg=dlg.querySelector('#reqmsg'); reqSubmit=dlg.querySelector('#reqsubmit');
    dlg.addEventListener('click',e=>{ if(e.target.closest('[data-close]') || e.target===dlg) dlg.close(); });
    form.addEventListener('submit', submit);
  }
  function open(ctx, opts){
    build(); cfg=opts||{};
    reqCtx=ctx; const act=ctx.action;
    dlg.querySelector('#reqbody').innerHTML=body;
    form.querySelector('.rf').hidden=false; form.reset();
    dlg.className=act;
    const short=ctx.modelLabel||ctx.model;
    dlg.querySelector('#reqkicker').textContent=short+' · '+(act==='order'?'Parts order':'Warranty replacement');
    dlg.querySelector('#reqtitle').textContent=act==='order'?'Order part':'Warranty replacement';
    dlg.querySelector('#reqseriallbl').textContent=cfg.serialLabel||'Serial number';
    reqSubmit.textContent=act==='order'?'Submit order request':'Submit warranty claim';
    const extra=Object.entries(ctx.extra||{}).filter(([k,v])=>v!=null&&v!=='').map(([k,v])=>esc(k)+': '+esc(v)).join(' · ');
    dlg.querySelector('#reqpart').innerHTML=`<b>${esc(ctx.partNumber)}</b> · ${esc(ctx.description)}${ctx.note?`<br><span style="color:var(--ink-2)">${esc(ctx.note)}</span>`:''}<br><span style="color:var(--ink-2)">${esc(ctx.partTitle)} · ${esc(ctx.model)}${extra?' · '+extra:''}</span>`;
    form.querySelectorAll('fieldset[data-for]').forEach(f=>{ const on=f.dataset.for===act; f.hidden=!on; f.disabled=!on; });
    if(act==='order' && ctx.defaultQty) form.elements.quantity.value=ctx.defaultQty;
    try{ const c=JSON.parse(localStorage.getItem(CONTACT_KEY)||'{}'); for(const k in c){ const el=form.elements[k]; if(el && !el.value) el.value=c[k]; } }catch(e){}
    reqMsg.textContent='';
    dlg.showModal();
    const first=[...form.querySelectorAll('input,textarea')].find(el=>!el.closest('fieldset').disabled && !el.value);
    if(first) first.focus();
  }
  function requestText(req){
    const L=[(req.action==='order'?'PARTS ORDER REQUEST':'WARRANTY REPLACEMENT CLAIM'), 'Model: '+req.model, 'Part: '+req.partNumber+' · '+req.description+(req.note?' ('+req.note+')':''), 'Assembly: '+req.partTitle];
    for(const [k,v] of Object.entries(req.extra||{})) if(v!=null && v!=='') L.push(k+': '+v);
    L.push('');
    const N={name:'Name',company:'Company',email:'Email',phone:'Phone',site:'Site',quantity:'Quantity',po:'PO number',needBy:'Need by',shipping:'Shipping',shipTo:'Ship to',serial:'Serial number',startup:'Start-up date',failDate:'Date of failure',qtyAffected:'Quantity affected',failure:'What happened',photos:'Photos',partAvailable:'Failed part available',notes:'Notes'};
    for(const [k,v] of Object.entries(req.form)){ if(v!=='' && v!=null) L.push((N[k]||k)+': '+(Array.isArray(v)?v.join(', '):v)); }
    return L.join('\n');
  }
  async function submit(e){
    e.preventDefault();
    if(!form.checkValidity()){ form.reportValidity(); reqMsg.textContent='Fill in the required fields.'; return; }
    const fd=new FormData(form), vals={}, files=[];
    for(const [k,v] of fd.entries()){ if(v instanceof File){ if(v.size) files.push(v.name); } else vals[k]=v; }
    if(files.length) vals.photos=files;
    if(vals.shipToW){ vals.shipTo=vals.shipToW; delete vals.shipToW; }
    vals.partAvailable = vals.partAvailable ? 'yes' : (reqCtx.action==='warranty' ? 'no' : undefined);
    if(vals.partAvailable===undefined) delete vals.partAvailable;
    try{ localStorage.setItem(CONTACT_KEY, JSON.stringify({name:vals.name,company:vals.company,email:vals.email,phone:vals.phone||'',site:vals.site||''})); }catch(err){}
    const req={...reqCtx, form:vals, submittedAt:new Date().toISOString(), page:location.pathname};
    delete req.modelLabel; delete req.defaultQty;
    window.dispatchEvent(new CustomEvent('nbts-part-action',{detail:req}));
    const handler=(window.PARTS_ACTIONS||{})[req.action];
    let sent=false, ticket=null;
    reqSubmit.disabled=true; reqMsg.textContent='Sending…';
    try{
      if(typeof handler==='function'){ await handler(req, fd); sent=true; }
      if(REQUEST_WEBHOOK){
        const out=new FormData(form);
        out.delete('shipToW'); out.set('shipTo', vals.shipTo||'');
        out.set('request', JSON.stringify(req));
        for(const k of ['action','part','partTitle','partNumber','description','model','modelKey']) out.set(k, req[k]==null?'':req[k]);
        for(const [k,v] of Object.entries(req.extra||{})) if(v!=null) out.set(k, v);
        const res=await fetch(REQUEST_WEBHOOK,{method:'POST',body:out});
        let data={}; try{ data=await res.json(); }catch(_){}
        if(!res.ok || data.ok===false) throw new Error(data.error||('HTTP '+res.status));
        ticket=data; sent=true;
      }
    }catch(err){ reqSubmit.disabled=false; reqMsg.textContent='Could not send ('+err.message+'). Try again.'; return; }
    reqSubmit.disabled=false;
    const txt=requestText(req), b=dlg.querySelector('#reqbody');
    form.querySelector('.rf').hidden=true;
    b.innerHTML = sent
      ? `<div class="done"><p><b>Request sent.</b> ${ticket&&ticket.key?`Ticket <a href="${esc(ticket.url)}" target="_blank" rel="noopener">${esc(ticket.key)}</a> is open. `:''}${req.action==='order'?'The parts team':'The warranty team'} will follow up at ${esc(vals.email)}.</p><pre>${esc(txt)}</pre><div><button type="button" data-close>Done</button></div></div>`
      : `<div class="done"><p><b>Not sent yet.</b> This form isn't connected to ordering or warranty yet, so nothing was submitted. Your request is below to copy.</p><pre>${esc(txt)}</pre><div style="display:flex;gap:8px"><button type="button" id="reqcopy">Copy request</button><button type="button" data-close>Close</button></div></div>`;
    const cp=dlg.querySelector('#reqcopy');
    if(cp) cp.onclick=()=>{ navigator.clipboard.writeText(txt).then(()=>cp.textContent='Copied',()=>cp.textContent='Copy failed'); };
  }
  window.PartsRequest={open};
})();
