/* Shared 3D scene helpers for the RMF 12 pages: bin loader, printed decals and the RMF 12 hardware labels.
   Needs three.js (r128). Bin format: [u32 header length][JSON header][blocks], int16 positions at 0.1 mm,
   int8 normals, uint8 RGB vertex colours, u16/u32 indices, optional int16 edge lines. */
window.RMF12Scene = (function(){
  // ---- decals (labels printed on the hardware) ------------------------------------
  function decal(w, h, ppm, draw, opts){
    const W=Math.max(8,Math.round(w*ppm)), H=Math.max(8,Math.round(h*ppm));
    const cv=document.createElement('canvas'); cv.width=W; cv.height=H;
    const ctx=cv.getContext('2d'); draw(ctx,W,H,ppm);
    const tex=new THREE.CanvasTexture(cv); tex.anisotropy=4;
    if(THREE.sRGBEncoding) tex.encoding=THREE.sRGBEncoding;
    const mat=new THREE.MeshLambertMaterial({map:tex, transparent:true, polygonOffset:true, polygonOffsetFactor:-2, polygonOffsetUnits:-2, depthWrite:false});
    const g=new THREE.PlaneGeometry(w,h);
    const m=new THREE.Mesh(g,mat);
    const f=(opts&&opts.face)||'+z';
    if(opts&&opts.rot) g.rotateZ(opts.rot);
    if(f==='-z') g.rotateY(Math.PI); else if(f==='+x') g.rotateY(Math.PI/2); else if(f==='-x') g.rotateY(-Math.PI/2);
    else if(f==='-y') g.rotateX(Math.PI/2); else if(f==='+y') g.rotateX(-Math.PI/2);
    m.position.set(opts.at[0],opts.at[1],opts.at[2]);
    m.renderOrder=2; m.userData.decal=true;
    return m;
  }
  const font=(px,w,fam)=>`${w||500} ${px}px ${fam||'"Barlow Semi Condensed", Arial, sans-serif'}`;
  function txt(ctx, s, x, y, px, color, align, weight, fam){ ctx.font=font(px,weight,fam); ctx.fillStyle=color||'#fff'; ctx.textAlign=align||'left'; ctx.textBaseline='middle'; ctx.fillText(s,x,y); }
  function siemens(ctx,x,y,px,color){ txt(ctx,'SIEMENS',x,y,px,color||'#e9ecef','left',700,'Arial, sans-serif'); }

  let hmiMesh=null;
  function drawHMI(c,W,H,k,mode){
    if(mode==='p45'){
      c.fillStyle='#e9eef2'; c.fillRect(0,0,W,H);
      c.fillStyle='#1E4B8C'; c.fillRect(0,0,W,13*k); txt(c,'DEFENDER RMF  ·  SETUP PARAMETERS',5*k,6.5*k,5.4*k,'#fff','left',600);
      c.fillStyle='#fff'; c.fillRect(6*k,19*k,W-12*k,32*k); c.strokeStyle='#0085AD'; c.lineWidth=0.8*k; c.strokeRect(6*k,19*k,W-12*k,32*k);
      txt(c,'PARAMETER 45',11*k,27*k,5*k,'#5c6168','left',600); txt(c,'PRECOAT JOG',11*k,34*k,4.2*k,'#5c6168','left',500);
      txt(c,'OP2',W-12*k,37*k,13*k,'#1c1e21','right',600);
      c.fillStyle='#0085AD'; c.fillRect(6*k,58*k,44*k,20*k); txt(c,'ENTER',28*k,68*k,5*k,'#fff','center',600);
      c.fillStyle='#cfd8df'; c.fillRect(54*k,58*k,44*k,20*k); txt(c,'BACK',76*k,68*k,5*k,'#1c1e21','center',600);
      txt(c,'Screen illustration',W-6*k,H-4*k,3.2*k,'#8a9096','right',500);
      return;
    }

    c.fillStyle='#e9eef2'; c.fillRect(0,0,W,H);
    c.fillStyle='#1E4B8C'; c.fillRect(0,0,W,13*k); txt(c,'DEFENDER RMF  ·  SYSTEM CONTROLLER',5*k,6.5*k,5.4*k,'#fff','left',600);
      const tiles=[['INFLUENT','PSI'],['EFFLUENT','PSI'],['AIR','PSI']];
      tiles.forEach((t,i)=>{ const x=6*k+i*49*k, y=19*k; c.fillStyle='#fff'; c.fillRect(x,y,45*k,30*k); c.strokeStyle='#c4ccd3'; c.strokeRect(x,y,45*k,30*k);
        txt(c,t[0],x+4*k,y+6*k,4.2*k,'#5c6168','left',600); txt(c,'--',x+4*k,y+18*k,10*k,'#1c1e21','left',600); txt(c,t[1],x+40*k,y+20*k,4*k,'#5c6168','right',500); });
      ['FILTER','BUMP','PRECOAT','SETUP'].forEach((b,i)=>{ const x=6*k+i*36.5*k, y=56*k; c.fillStyle=i===0?'#0085AD':'#cfd8df'; c.fillRect(x,y,33*k,22*k); txt(c,b,x+16.5*k,y+11*k,5*k,i===0?'#fff':'#1c1e21','center',600); });
  }
  function setHMI(mode){ if(!hmiMesh) return; const t=hmiMesh.material.map, cv=t.image, c=cv.getContext('2d'); c.clearRect(0,0,cv.width,cv.height); drawHMI(c,cv.width,cv.height,cv.width/154,mode); t.needsUpdate=true; }
  function addDecals(meta, parts){
    const M=meta, zR=M.zR, zR3=M.zR3, zP=M.zP, P=M.panel;
    const X=px=>P.x0+px, Y=py=>P.y0-py;
    const at=(name,m)=>{ const p=parts[name]; if(p) p.holder.add(m); };
    const dz=M.door_face_z, hc=M.hmi_centre;
    // door overlay, original artwork in the spirit of the RMF12 overlay (item 24)
    at('door', decal(340,385,2.6,(c,W,H,k)=>{
      const g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#f3f8fb'); g.addColorStop(0.3,'#e3f1f8'); g.addColorStop(0.55,'#5fb5dc'); g.addColorStop(1,'#1782bd');
      c.fillStyle=g; c.fillRect(0,0,W,H);
      c.fillStyle='rgba(255,255,255,.55)';
      c.beginPath(); c.moveTo(0,H*0.27); for(let i=0;i<=40;i++){ const x=W*i/40; c.lineTo(x, H*0.27+Math.sin(i/40*Math.PI*3.2)*H*0.018); } c.lineTo(W,H*0.33); c.lineTo(0,H*0.33); c.fill();
      for(let i=0;i<60;i++){ const r=(2+Math.random()*6)*k/3; c.beginPath(); c.arc(W*0.05+Math.random()*W*0.35, H*0.35+Math.random()*H*0.5, r, 0, 7); c.strokeStyle='rgba(255,255,255,.55)'; c.lineWidth=1.2; c.stroke(); }
      c.fillStyle='#ffffff'; c.beginPath(); c.moveTo(0,H*0.9); c.quadraticCurveTo(W*0.5,H*0.78,W,H*0.86); c.lineTo(W,H); c.lineTo(0,H); c.fill();
      const navy='#1E4B8C';
      txt(c,'DEFENDER® RMF',W/2,H*0.085,22*k,navy,'center',600);
      txt(c,'R E G E N E R A T I V E   M E D I A   F I L T E R',W/2,H*0.145,5.2*k,'#0085AD','center',600);
      txt(c,'Neptune-Benson',W*0.78,H*0.92,9*k,'#1E4B8C','center',600,'Barlow, Arial, sans-serif');
      c.strokeStyle='rgba(0,0,0,.18)'; c.lineWidth=2; c.strokeRect(1,1,W-2,H-2);
    },{at:[0,0,dz+0.15]}));
    // HMI bezel print + screen
    at('hmi', decal(214,158,3,(c,W,H,k)=>{ siemens(c,8*k,7*k,5*k,'#d7dbe0'); txt(c,'SIMATIC HMI',W-8*k,7*k,4.2*k,'#c9cdd2','right',600); c.save(); c.translate(W-4*k,H/2); c.rotate(Math.PI/2); txt(c,'TOUCH',0,0,4*k,'#9aa0a6','center',600); c.restore(); },{at:[hc[0],hc[1],dz+6.05]}));
    { const m=decal(154,86,4,(c,W,H,k)=>drawHMI(c,W,H,k,'home'),{at:[hc[0],hc[1]-1,dz+6.4]}); at('hmi', m); hmiMesh=m; }
    // inside of the cover: rating label, UL legends A-D, UL E476304 (assembly note 1)
    const zin=dz-4.05;
    at('door', decal(101.6,76.2,5,(c,W,H,k)=>{ c.fillStyle='#fbfbf8'; c.fillRect(0,0,W,H); c.strokeStyle='#333'; c.lineWidth=2; c.strokeRect(2,2,W-4,H-4);
      txt(c,'Neptune-Benson',W/2,9*k,7*k,'#1c1e21','center',600,'Barlow, Arial, sans-serif');
      ['EVOQUA WATER TECHNOLOGIES','HOLLAND, MI','VOLTAGE: 120/230 VAC 1PH 60/50Hz','TOTAL FLA: 15/10 A','LARGEST MOTOR: 0.5 HP','SCCR: 5 KA','DRAWING SET 20807800','MFR DATE: ________'].forEach((s,i)=>txt(c,s,5*k,(22+i*6.6)*k,4.3*k,'#1c1e21','left',500,'Arial, sans-serif'));
    },{at:[-70,40,zin], face:'-z'}));
    at('door', decal(110,34,5,(c,W,H,k)=>{ c.fillStyle='#fbfbf8'; c.fillRect(0,0,W,H);
      ['A  EVOQUA WATER TECHNOLOGIES','B  HOLLAND, MI','C  UL TYPE 1 / NEMA 4','D  MAINTAIN A COMPLETE SCHEMATIC WITH THIS ENCLOSURE'].forEach((s,i)=>txt(c,s,3*k,(5+i*7.8)*k,3.6*k,'#1c1e21','left',500,'Arial, sans-serif')); },{at:[60,140,zin], face:'-z'}));
    at('door', decal(50,25,6,(c,W,H,k)=>{ c.fillStyle='#fbfbf8'; c.fillRect(0,0,W,H); txt(c,'UL',8*k,H/2,9*k,'#1c1e21','center',700,'Arial'); txt(c,'DEFENDER D7',17*k,8*k,4*k,'#1c1e21','left',600,'Arial'); txt(c,'E476304',17*k,16*k,4*k,'#1c1e21','left',500,'Arial'); },{at:[90,-150,zin], face:'-z'}));
    // outside of the enclosure: panel nameplate (left side) and QR label (right side), 20807852
    at('enclosure', decal(127,76.2,4,(c,W,H,k)=>{ c.fillStyle='#fbfbf8'; c.fillRect(0,0,W,H); c.strokeStyle='#222'; c.lineWidth=2; c.strokeRect(2,2,W-4,H-4);
      txt(c,'EVOQUA WATER TECHNOLOGIES',W/2,8*k,6*k,'#111','center',700,'Arial'); txt(c,'USA HOLLAND, MI',30*k,20*k,4.4*k,'#111','left',500,'Arial'); txt(c,'CE',W-14*k,22*k,10*k,'#111','center',700,'Arial');
      [['TYPE','IEC 61439-2'],['MODEL','RMF SYSTEM CONTROLLER'],['DATE OF MANUFACTURE','MONTH/YEAR']].forEach((r,i)=>{ txt(c,r[0],52*k,(38+i*10)*k,3.8*k,'#111','right',500,'Arial'); c.strokeRect(54*k,(34+i*10)*k,66*k,7.5*k); txt(c,r[1],56*k,(38+i*10)*k,3.8*k,'#111','left',500,'Arial'); });
      c.fillStyle='#111'; c.fillRect(6*k,14*k,20*k,18*k); },{at:[-184.55,40,110], face:'-x'}));
    at('enclosure', decal(76.2,76.2,5,(c,W,H,k)=>{ c.fillStyle='#fbfbf8'; c.fillRect(0,0,W,H);
      const n=21, s=40*k/n, ox=W/2-20*k, oy=8*k; c.fillStyle='#111';
      const fp=(x,y)=>{ c.fillRect(ox+x*s,oy+y*s,7*s,7*s); c.fillStyle='#fbfbf8'; c.fillRect(ox+(x+1)*s,oy+(y+1)*s,5*s,5*s); c.fillStyle='#111'; c.fillRect(ox+(x+2)*s,oy+(y+2)*s,3*s,3*s); };
      fp(0,0); fp(14,0); fp(0,14);
      for(let y=0;y<n;y++) for(let x=0;x<n;x++){ if((x<8&&y<8)||(x>12&&y<8)||(x<8&&y>12)) continue; if(((x*7+y*13+x*y)%5)<2) c.fillRect(ox+x*s,oy+y*s,s,s); }
      txt(c,'Scan QR Code To Access Current',W/2,56*k,3.6*k,'#111','center',500,'Calibri, Arial'); txt(c,'Operating & Maintenance Manual',W/2,61*k,3.6*k,'#111','center',500,'Calibri, Arial');
    },{at:[184.55,0,110], face:'+x'}));
    // S7-1200 fronts: face (v 24..76) and top terminal cover (v 2..23)
    const s7face=(name,x0,w,draw)=>at(name, decal(w-1.4,52,8,draw,{at:[X(x0)+w/2,Y(120.7+50),zR3+75.05]}));
    const s7top=(name,x0,w,draw)=>at(name, decal(w-1.4,21,8,draw,{at:[X(x0)+w/2,Y(120.7+12.5),zR3+64.05]}));
    const L='#d3d8dd', B='#eef1f4';
    s7top('plc_cpu',33.3,90.1,(c,W,H,k)=>{ c.fillStyle='#e9ecef'; c.fillRect(4*k,9*k,19*k,6*k); txt(c,'SIEMENS',13.5*k,12.1*k,3.6*k,'#2f343a','center',700,'Arial');
      txt(c,'SIMATIC',W-5*k,8.5*k,4.2*k,B,'right',600); txt(c,'S7-1200',W-5*k,13.5*k,4.2*k,B,'right',600); });
    s7face('plc_cpu',33.3,90.1,(c,W,H,k)=>{
      c.save(); c.translate(6.5*k,15*k); c.rotate(-Math.PI/2); txt(c,'RUN / STOP',0,0,2.2*k,L,'center',500); c.restore();
      c.save(); c.translate(9.5*k,15*k); c.rotate(-Math.PI/2); txt(c,'ERROR',0,0,2.2*k,L,'center',500); c.restore();
      c.save(); c.translate(12.5*k,15*k); c.rotate(-Math.PI/2); txt(c,'MAINT',0,0,2.2*k,L,'center',500); c.restore();
      txt(c,'.0 .1 .2 .3 .4 .5 .6 .7',47*k,6*k,2.4*k,L,'left',500); txt(c,'DIa',47*k,9.5*k,2.2*k,L,'left',500);
      txt(c,'CPU 1212C',W-5*k,24*k,3.6*k,B,'right',600); txt(c,'AC/DC/RLY',W-5*k,28.5*k,3.2*k,B,'right',500);
      txt(c,'DQa',47*k,41*k,2.2*k,L,'left',500); txt(c,'.0 .1 .2 .3 .4 .5',47*k,45*k,2.4*k,L,'left',500); });
    s7face('plc_dq',123.4,69.9,(c,W,H,k)=>{ c.save(); c.translate(4.2*k,9*k); c.rotate(-Math.PI/2); txt(c,'DIAG',0,0,2.2*k,L,'center',500); c.restore();
      txt(c,'.0 .1 .2 .3',10*k,6*k,2.4*k,L,'left',500); txt(c,'DQa',10*k,9.5*k,2.2*k,L,'left',500);
      txt(c,'SM 1222',W-5*k,24*k,3.6*k,B,'right',600); txt(c,'RLY',W-5*k,28.5*k,3.2*k,B,'right',500);
      txt(c,'DQa',10*k,41*k,2.2*k,L,'left',500); txt(c,'.4 .5 .6 .7',10*k,45*k,2.4*k,L,'left',500); });
    s7face('plc_ai',193.3,45,(c,W,H,k)=>{ c.save(); c.translate(4.2*k,9*k); c.rotate(-Math.PI/2); txt(c,'DIAG',0,0,2.2*k,L,'center',500); c.restore();
      txt(c,'0 1 2 3',10*k,6*k,2.4*k,L,'left',500); txt(c,'AI',10*k,9.5*k,2.2*k,L,'left',500);
      txt(c,'SM 1231',W-4*k,24*k,3.6*k,B,'right',600); txt(c,'AI',W-4*k,28.5*k,3.2*k,B,'right',500); });
    // SITOP PSU100S
    at('psu', decal(30,52,8,(c,W,H,k)=>{ c.save(); c.translate(W*0.55,H/2); c.rotate(-Math.PI/2); txt(c,'SITOP PSU100S',0,0,5.2*k,'#2a2e33','center',600); c.restore(); },{at:[X(302.6),Y(110),zR+125.05]}));
    at('psu', decal(16,6,10,(c,W,H,k)=>{ txt(c,'L1   N   PE',W/2,H/2,2.6*k,'#f1f3f5','center',600); },{at:[X(310.2),Y(161),zR+122.05]}));
    at('psu', decal(30,7,10,(c,W,H,k)=>{ txt(c,'24V O.K.     ADJUST 22.8...28V',W/2,H/2,2.3*k,'#1c1e21','center',600); },{at:[X(302.6),Y(181.5),zR+117.05]}));
    // SIRIUS contactor
    at('contactor', decal(39,32,9,(c,W,H,k)=>{ siemens(c,2*k,4*k,3.2*k,'#3d4247'); txt(c,'SIRIUS',W-2*k,4*k,3.6*k,'#3d4247','right',600); txt(c,'3RT20',2*k,28*k,3*k,'#3d4247','left',600); },{at:[X(236),Y(48.4),zR+73.45]}));
    at('contactor', decal(44,4,12,(c,W,H,k)=>{ txt(c,'1/L1   3/L2   5/L3   13NO   A1+',W/2,H/2,2.2*k,'#2a2e33','center',600); },{at:[X(236),Y(13.4+12.6),zR+48.6]}));
    at('contactor', decal(44,4,12,(c,W,H,k)=>{ txt(c,'2/T1   4/T2   6/T3   14NO   A2-',W/2,H/2,2.2*k,'#2a2e33','center',600); },{at:[X(236),Y(13.4+67),zR+48.6]}));
    // SCALANCE XB005
    at('switch', decal(100,45,8,(c,W,H,k)=>{ c.fillStyle='rgba(0,0,0,0)';
      c.save(); c.translate(6*k,H/2); c.rotate(-Math.PI/2); siemens(c,-9*k,0,3.4*k); c.restore();
      txt(c,'SCALANCE',12*k,8*k,3.2*k,'#e9ecef','left',600); txt(c,'XB005',12*k,12.5*k,3.2*k,'#e9ecef','left',600);
      txt(c,'P3',36*k,6*k,2.6*k,'#cfd4d9','left',600); txt(c,'P4',55*k,6*k,2.6*k,'#cfd4d9','left',600); txt(c,'P5',74*k,6*k,2.6*k,'#cfd4d9','left',600);
      txt(c,'P1',55*k,42*k,2.6*k,'#cfd4d9','left',600); txt(c,'P2',74*k,42*k,2.6*k,'#cfd4d9','left',600);
      c.save(); c.translate(87*k,H/2+2*k); c.rotate(-Math.PI/2); txt(c,'LAN ONLY',0,0,2.6*k,'#cfd4d9','center',600); c.restore(); },{at:[X(89),Y(38.1),zR+87.05]}));
    // breaker
    at('breaker', decal(16,40,10,(c,W,H,k)=>{ siemens(c,1*k,4*k,2.6*k,'#2a2e33'); txt(c,'5SJ4',1*k,9*k,2.6*k,'#2a2e33','left',600); txt(c,'C4',W-1*k,36*k,4*k,'#2a2e33','right',700); },{at:[X(238.3+8.75),Y(128.5+45),zR3+70.05]}));
    // UL legends on the backpanel (A-G)
    at('backpanel', decal(232,7,9,(c,W,H,k)=>{ c.fillStyle='#fbfbf8'; c.fillRect(0,0,W,H); txt(c,'F  DRY CONTACTS     E  USE COPPER CONDUCTORS ONLY     B  24VDC     D  USE 60 DEG C OR LARGER',3*k,H/2,3.4*k,'#1c1e21','left',600); },{at:[X(124),Y(367.5),zP+0.05]}));
    at('backpanel', decal(40,10,9,(c,W,H,k)=>{ c.fillStyle='#fbfbf8'; c.fillRect(0,0,W,H); txt(c,'A  120/230VAC',2*k,3*k,3.2*k,'#1c1e21','left',600); txt(c,'G  60/50Hz',2*k,7.4*k,3.2*k,'#1c1e21','left',600); },{at:[X(286),Y(366),zP+0.05]}));
    at('backpanel', decal(40,9,9,(c,W,H,k)=>{ c.fillStyle='#fbfbf8'; c.fillRect(0,0,W,H); txt(c,'C  GROUND LUG',2*k,2.8*k,3*k,'#1c1e21','left',600); txt(c,'TORQUE: 35 IN.LB.',2*k,6.5*k,3*k,'#1c1e21','left',600); },{at:[X(292),Y(16),zP+0.05]}));
    at('backpanel', decal(11.4,11.4,12,(c,W,H,k)=>{ c.fillStyle='#2f8a3c'; c.fillRect(0,0,W,H); c.strokeStyle='#fff'; c.lineWidth=0.7*k; c.beginPath(); c.arc(W/2,H/2,4.6*k,0,7); c.stroke();
      c.beginPath(); c.moveTo(W/2,2.4*k); c.lineTo(W/2,5.8*k); c.moveTo(3.2*k,5.8*k); c.lineTo(W-3.2*k,5.8*k); c.moveTo(4.2*k,7.3*k); c.lineTo(W-4.2*k,7.3*k); c.moveTo(5.2*k,8.8*k); c.lineTo(W-5.2*k,8.8*k); c.stroke(); },{at:[X(300),Y(35),zP+0.05]}));
    // terminal markers (20807854 layout), one tiny decal per terminal
    const mk=M.tb1_marker;
    for(const t of M.tb1){ at(t.part, decal(4.6,12,26,(c,W,H,k)=>{ c.save(); c.translate(W/2,H/2); c.rotate(-Math.PI/2); txt(c,t.top,0,-1.15*k,1.65*k,'#111','center',600); txt(c,t.bot,0,1.15*k,1.65*k,'#111','center',600); c.restore(); },{at:[t.x,(mk.y0+mk.y1)/2,mk.z+0.05]})); }
    const mk2=M.tb2_marker;
    for(const t of M.tb2){ at(t.part, decal(4.6,9.6,26,(c,W,H,k)=>{ c.save(); c.translate(W/2,H/2); c.rotate(-Math.PI/2); txt(c,t.lab,0,0,2.4*k,'#111','center',600); c.restore(); },{at:[t.x,(mk2.y0+mk2.y1)/2,mk2.z+0.05]})); }
    // valve labels (items 26-28) and junction box label
    [['valve_fv01','BUMP'],['valve_fv02','REGEN'],['valve_fv03','EFFLUENT']].forEach(([n,s],i)=>{
      const x=-368.9/2+94.5+(i+0.5)*19.18;
      at(n, decal(17,12,14,(c,W,H,k)=>{ c.fillStyle='#fbfbf8'; c.fillRect(0,0,W,H); c.save(); c.translate(W/2,H/2); txt(c,s,0,0,(s.length>5?2.6:3.4)*k,'#111','center',700,'Arial'); c.restore(); },{at:[x,-209.45-37.3-13,131.05]}));
    });
    at('vac_jbox', decal(70,30,6,(c,W,H,k)=>{ c.fillStyle='#fbfbf8'; c.fillRect(0,0,W,H); txt(c,'VACUUM',W/2,9*k,7*k,'#111','center',700,'Arial'); txt(c,'TRANSFER JUNCTION BOX',W/2,20*k,4*k,'#111','center',600,'Arial'); },{at:[-184.45-150,-330,50.85]}));
  }


  function getBin(src){
    if(src instanceof ArrayBuffer) return Promise.resolve(src);
    if(typeof src==='string' && src.startsWith('b64:')){ const s=atob(src.slice(4)); const b=new Uint8Array(s.length); for(let i=0;i<s.length;i++) b[i]=s.charCodeAt(i); return Promise.resolve(b.buffer); }
    return fetch(src,{credentials:'same-origin'}).then(r=>{ if(!r.ok) throw new Error('model '+r.status); return r.arrayBuffer(); });
  }
  // returns {meta, parts}; each part: {rig, holder, mesh, lines, bb}. rig > holder > mesh, for pivots and offsets
  function loadBin(src, opts){
    opts=opts||{};
    return getBin(src).then(buf=>{
      const hl=new DataView(buf).getUint32(0,true);
      const meta=JSON.parse(new TextDecoder().decode(new Uint8Array(buf,4,hl)));
      const base=4+hl, parts={};
      for(const e of meta.parts){
        const geo=new THREE.BufferGeometry();
        const q=new Int16Array(buf, base+e.V, e.nv*3); const pos=new Float32Array(q.length); for(let i=0;i<q.length;i++) pos[i]=q[i]*0.1;
        const nq=new Int8Array(buf, base+e.N, e.nv*3); const nor=new Float32Array(nq.length); for(let i=0;i<nq.length;i++) nor[i]=nq[i]/127;
        geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
        geo.setAttribute('normal', new THREE.BufferAttribute(nor,3));
        geo.setAttribute('color', new THREE.BufferAttribute(new Uint8Array(buf, base+e.C, e.nv*3).slice(),3,true));
        const idx= e.itype==='u16' ? new Uint16Array(buf, base+e.F, e.nf*3) : new Uint32Array(buf, base+e.F, e.nf*3);
        geo.setIndex(new THREE.BufferAttribute(idx.slice(),1));
        const mat=new THREE.MeshPhongMaterial({vertexColors:true, shininess:26, specular:0x262626, polygonOffset:true, polygonOffsetFactor:1, polygonOffsetUnits:1, side:opts.doubleSide?THREE.DoubleSide:THREE.FrontSide});
        const mesh=new THREE.Mesh(geo,mat), holder=new THREE.Group(); holder.add(mesh);
        let lines=null;
        if(e.nl){
          const lq=new Int16Array(buf, base+e.L, e.nl*6); const lp=new Float32Array(lq.length); for(let i=0;i<lq.length;i++) lp[i]=lq[i]*0.1;
          const lg=new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.BufferAttribute(lp,3));
          lines=new THREE.LineSegments(lg, new THREE.LineBasicMaterial({color:0x15171a, transparent:true, opacity:opts.lineOpacity||0.3}));
          holder.add(lines);
        }
        const rig=new THREE.Group(); rig.add(holder);
        parts[e.name]={rig, holder, mesh, lines, bb:e.bbox, name:e.name};
      }
      return {meta, parts};
    });
  }
  return { loadBin, decal, txt, siemens, addDecals, setHMI };
})();
