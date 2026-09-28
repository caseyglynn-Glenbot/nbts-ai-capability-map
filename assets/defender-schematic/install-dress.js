// Shared dressing for the Defender installation model (Schematic.stp), used by the installation model page
// and the filter mode animation. Call DefenderDress(A) once after loadAssembly(): it recolours the filter and
// piping, styles the F29 strainer, turns the waste pit into a floor drain and swaps D20 for a tank compressor.
// Returns {drainPos, PAL}.
window.DefenderDress=function(A){
  // ---- colours: filter in the SP-55 animation palette, all piping as dark grey SCH 80 PVC --------------
  const PAL={BLUE:0x2b6cc4, DARKBLUE:0x1d3f9a, GREY:0x8b9199, BLACK:0x1f2124, YELLOW:0xd9c92e, ACR:0xe6ecf2, PVC:0x4b5157};
  const TANK=1, PUMP=667, KEEP_CAD=new Set([550,551,552,553]);                 // RMF panel, gauge panel, vacuum unit, regulator keep CAD colours
  const BODY=/^(1001-7313|1001-7314|1000-4331|1000-4332|1001-7319|70115|70118|1001-7257|1001-7196|1001-7252|1000-4634|1000-4483|1000-4545|1000-4630|1000-4339|1000-429[345]|1001-5724|1000-5925|1001-8480|1000-4480|1001-8538|1001-9346|1000-4549|1000-4535|1000-4623|1000-4208)/;
  const PIPE=/pipe|elbow|(^|\W)tee(\W|$)|slip flange|spigot flange|reducing bushing|reducer|8x6x4|sch 80/i, NOT_PIPE=/pipe-\.375|hose|sight glass/i;
  function under(i,a){ while(i>=0){ if(i===a) return true; i=A.nodes[i].parent; } return false; }
  function partChain(i){ const out=[]; while(i>=0){ out.push(A.nodes[i].part||A.nodes[i].name); i=A.nodes[i].parent; } return out; }
  function recolor(){
    A.root.traverse(o=>{
      if(!o.isMesh) return;
      const i=o.userData.idx, n=A.nodes[i], nm=(n.name||'')+' '+(n.part||''), m=o.material;
      if(PIPE.test(nm)&&!NOT_PIPE.test(nm)){ m.color.setHex(PAL.PVC); m.shininess=35; return; }
      if(under(i,PUMP)){ const c=m.color, lum=0.3*c.r+0.59*c.g+0.11*c.b;                                               // F33 pump in the filter palette
        const chain=partChain(i).join(' ');
        m.color.setHex(lum<0.12?PAL.BLACK:/shaft|screw|bolt|nut|washer|key|plug|pin/i.test(chain)?PAL.GREY:PAL.BLUE); return; }
      if(!under(i,TANK) || [...KEEP_CAD].some(k=>under(i,k))) return;
      const chain=partChain(i), has=re=>chain.some(p=>re.test(p));
      if(has(/^1001-9348/)){ m.color.setHex(PAL.ACR); m.transparent=true; m.opacity=0.45; m.depthWrite=false; return; }   // window acrylic
      if(has(/^1000-4723/)||has(/^1000-1797/)||has(/^1000-4772/)){ m.color.setHex(PAL.BLACK); return; }                 // bump tire, gaskets
      if(has(/^1000-4625/)){ m.color.setHex(PAL.DARKBLUE); return; }                                                      // lift shaft guide / bushing
      if(has(/^1000-4475/)){ m.color.setHex(PAL.GREY); return; }                                                          // lift shaft nut
      if(BODY.test(n.part||'')||BODY.test(chain[1]||'')&&/_Welds/.test(n.part||'')){ m.color.setHex(PAL.BLUE); return; }
      if(has(/_Welds/)){ m.color.setHex(PAL.BLUE); return; }
      const c=m.color, lum=0.3*c.r+0.59*c.g+0.11*c.b;
      m.color.setHex(lum<0.12?PAL.BLACK:PAL.GREY);                                                                        // hardware
    });
  }

  // ---- F29 Guardian strainer: blue body, clear lid, black knobs, steel bolts and basket, yellow label -----
  // The STEP part is a single mesh, so it is split into its solids (welded connected components) and each
  // solid is sorted by its bounding box in the part's own frame (y up, flanges on z).
  const STRAINER=610;
  function styleStrainer(){
    const node=A.objs[STRAINER]; if(!node) return;
    const src=node.children.find(c=>c.isMesh); if(!src) return;
    const g=src.geometry, P=g.attributes.position.array, I=g.index.array, nv=P.length/3, nt=I.length/3;
    const weld=new Int32Array(nv), map=new Map();
    for(let v=0;v<nv;v++){ const k=Math.round(P[v*3]*10)+','+Math.round(P[v*3+1]*10)+','+Math.round(P[v*3+2]*10); let w=map.get(k); if(w===undefined){ w=map.size; map.set(k,w); } weld[v]=w; }
    const par=new Int32Array(map.size).map((_,i)=>i), f=x=>{ while(par[x]!==x){ par[x]=par[par[x]]; x=par[x]; } return x; };
    for(let t=0;t<nt;t++){ const a=f(weld[I[t*3]]), b=f(weld[I[t*3+1]]), c=f(weld[I[t*3+2]]); par[b]=a; par[f(c)]=a; }
    const comp=new Map();                                          // root -> {tris, box}
    for(let t=0;t<nt;t++){ const r=f(weld[I[t*3]]); let c=comp.get(r); if(!c){ c={tris:[],lo:[1e9,1e9,1e9],hi:[-1e9,-1e9,-1e9]}; comp.set(r,c); }
      c.tris.push(t); for(let k=0;k<3;k++){ const v=I[t*3+k]; for(let d=0;d<3;d++){ const x=P[v*3+d]; if(x<c.lo[d]) c.lo[d]=x; if(x>c.hi[d]) c.hi[d]=x; } } }
    const comps=[...comp.values()].sort((a,b)=>b.tris.length-a.tris.length);
    const cls=c=>{ const w=Math.max(c.hi[0]-c.lo[0],c.hi[2]-c.lo[2]);
      if(c===comps[0]) return 'body';
      if(c.lo[1]>=575&&c.hi[1]<=592&&w>250) return 'black';        // cover gasket
      if(c.lo[1]>=575&&c.hi[1]<=615&&w>300) return 'lid';          // acrylic cover
      if(c.lo[1]>=608) return 'black';                              // hand knobs and their washers
      return 'steel'; };                                            // cover bolts, nuts, basket
    const MATS={ body:[PAL.BLUE], lid:[PAL.ACR,0.35], black:[PAL.BLACK], steel:[0xb9bec4] };
    const buckets={}; comps.forEach(c=>(buckets[cls(c)]=buckets[cls(c)]||[]).push(...c.tris));
    Object.entries(buckets).forEach(([k,tris])=>{
      const idx=new Uint32Array(tris.length*3); tris.forEach((t,j)=>{ idx[j*3]=I[t*3]; idx[j*3+1]=I[t*3+1]; idx[j*3+2]=I[t*3+2]; });
      const ng=new THREE.BufferGeometry(); ng.setAttribute('position',g.attributes.position); ng.setAttribute('normal',g.attributes.normal); ng.setIndex(new THREE.BufferAttribute(idx,1)); ng.computeBoundingBox(); ng.computeBoundingSphere();
      const m=src.material.clone(); m.color.setHex(MATS[k][0]);
      if(MATS[k][1]!==undefined){ m.transparent=true; m.opacity=MATS[k][1]; m.depthWrite=false; }
      if(k==='steel'){ m.shininess=60; m.specular.setHex(0x555555); }
      const mesh=new THREE.Mesh(ng,m); mesh.userData.idx=STRAINER; if(k==='lid') mesh.renderOrder=2; node.add(mesh);
    });
    node.remove(src);
    // yellow nameplate on both sides of the barrel, between the flanges
    const lm=new THREE.MeshPhongMaterial({color:0xe8c21c,shininess:30,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2});
    [0,Math.PI].forEach(rot=>{
      const plate=new THREE.Mesh(new THREE.CylinderGeometry(134.5,134.5,110,16,1,true,Math.PI/2-0.42+rot,0.84),lm);
      plate.position.y=330; plate.userData.idx=STRAINER; node.add(plate);
    });
  }

  // ---- waste pit: shown as a floor drain with a "to drain" tag instead of the grey cylinder ----------------
  const PIT=672; let drainPos=null;
  function addDrain(){
    const pit=A.objs[PIT]; if(!pit) return;
    const b=new THREE.Box3().setFromObject(pit);
    const c=b.getCenter(new THREE.Vector3()); drainPos=new THREE.Vector3(c.x,b.max.y,c.z);
    const cv=document.createElement('canvas'); cv.width=cv.height=128; const g=cv.getContext('2d');
    g.fillStyle='#3a3f45'; g.beginPath(); g.arc(64,64,62,0,7); g.fill();
    g.strokeStyle='#8b9199'; g.lineWidth=6; g.beginPath(); g.arc(64,64,58,0,7); g.stroke();
    g.fillStyle='#15181b'; for(let k=-3;k<=3;k++){ const w=Math.sqrt(Math.max(0,44*44-(k*14)**2))*2; g.fillRect(64-w/2,64+k*14-3,w,6); }
    const tex=new THREE.CanvasTexture(cv);
    const disc=new THREE.Mesh(new THREE.CircleGeometry(150,40), new THREE.MeshPhongMaterial({map:tex,transparent:true,side:THREE.DoubleSide,shininess:0}));
    disc.userData.idx=PIT;
    // hide the pit geometry but keep the drain on the pit node, so the group and click-to-identify still work
    pit.children.forEach(ch=>{ ch.visible=false; ch.userData.hidden=true; });
    pit.updateMatrixWorld(true);
    const world=new THREE.Matrix4().compose(drainPos.clone().add(new THREE.Vector3(0,2,0)), new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI/2,0,0)), new THREE.Vector3(1,1,1));
    disc.matrixAutoUpdate=false; disc.matrix.copy(new THREE.Matrix4().copy(pit.matrixWorld).invert().multiply(world)); pit.add(disc);
  }
  // ---- D20: the plain compressor cylinder replaced by a vertical tank compressor ----------------------------
  // Modelled on the Ingersoll Rand SS5L5 (5 HP, 60 gal vertical: red tank, cast iron twin-cylinder pump and motor
  // on a saddle, belt guard over the flywheel and motor sheave, pressure switch, gauge, manual drain), scaled to the
  // height and diameter of the original placeholder.
  const COMP=653;
  function addCompressor(){
    const node=A.objs[COMP]; if(!node) return;
    const bb=new THREE.Box3().setFromObject(node), size=bb.getSize(new THREE.Vector3()), ctr=bb.getCenter(new THREE.Vector3());
    node.children.forEach(ch=>{ ch.visible=false; ch.userData.hidden=true; });
    const D=Math.min(size.x,size.z), H=size.y*2, y0=bb.min.y, R=D*0.46;
    const TAN=0xc9b48a, IRON=0x3b3f43, MOTOR=0x2b2f33, STEEL=0x9aa0a6, WHITE=0xf2f2ee;
    const grp=new THREE.Group(), edgeMat=new THREE.LineBasicMaterial({color:0x14171a,transparent:true,opacity:0.55});
    const mat=c=>new THREE.MeshPhongMaterial({color:c,shininess:30,specular:0x333333,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
    function add(geo,c,x,y,z,rx,ry,rz){ const m=new THREE.Mesh(geo,mat(c)); m.position.set(x,y,z); m.rotation.set(rx||0,ry||0,rz||0); m.userData.idx=COMP; grp.add(m);
      const e=new THREE.LineSegments(new THREE.EdgesGeometry(geo,28),edgeMat); e.position.copy(m.position); e.rotation.copy(m.rotation); grp.add(e); return m; }
    // feet
    const legH=34+R*0.42*0.32;   // pad plus the rise of the lower dome at the leg radius
    for(let k=0;k<4;k++){ const a=Math.PI/4+k*Math.PI/2, x=Math.cos(a)*R*0.72, z=Math.sin(a)*R*0.72;
      add(new THREE.BoxGeometry(70,12,70),IRON,x,y0+6,z); add(new THREE.BoxGeometry(28,legH,28),IRON,x,y0+legH/2,z); }
    // tank with domed ends
    const Ht=H*0.62, dome=R*0.42, prof=[];
    for(let i=0;i<=10;i++){ const t=i/10*Math.PI/2; prof.push(new THREE.Vector2(Math.sin(t)*R, dome*(1-Math.cos(t)))); }
    for(let i=10;i>=0;i--){ const t=i/10*Math.PI/2; prof.push(new THREE.Vector2(Math.sin(t)*R, Ht-dome*(1-Math.cos(t)))); }
    const tb=y0+34; add(new THREE.LatheGeometry(prof,40),TAN,0,tb,0);
    add(new THREE.TorusGeometry(R+2,4,6,48),IRON,0,tb+dome,0,Math.PI/2); add(new THREE.TorusGeometry(R+2,4,6,48),IRON,0,tb+Ht-dome,0,Math.PI/2);
    // saddle plate and supports
    const py=tb+Ht-dome*0.25; add(new THREE.BoxGeometry(R*1.9,14,R*1.35),IRON,0,py,0);
    for(const sx of [-1,1]) for(const sz of [-1,1]) add(new THREE.BoxGeometry(18,dome*0.55,18),IRON,sx*R*0.6,py-dome*0.3,sz*R*0.45);
    // pump: crankcase, twin finned cylinders, heads, flywheel
    const px=-R*0.42, cy=py+7;
    add(new THREE.BoxGeometry(170,120,150),IRON,px,cy+60,-10);
    for(const dz of [-40,30]){
      add(new THREE.CylinderGeometry(42,42,120,20),IRON,px,cy+180,dz);
      for(let f=0;f<6;f++) add(new THREE.CylinderGeometry(56,56,5,20),IRON,px,cy+132+f*19,dz);
      add(new THREE.BoxGeometry(110,34,90),IRON,px,cy+257,dz);
    }
    add(new THREE.CylinderGeometry(105,105,22,32),IRON,px,cy+95,R*0.5,Math.PI/2);        // flywheel
    // motor on the other side, with sheave and conduit box
    const mx=R*0.4; add(new THREE.CylinderGeometry(78,78,230,28),MOTOR,mx,cy+85,-15,Math.PI/2);
    add(new THREE.CylinderGeometry(84,84,20,28),MOTOR,mx,cy+85,-138,Math.PI/2); add(new THREE.CylinderGeometry(84,84,20,28),MOTOR,mx,cy+85,108,Math.PI/2);
    add(new THREE.BoxGeometry(70,60,70),MOTOR,mx,cy+175,-20); add(new THREE.BoxGeometry(160,16,120),IRON,mx,cy+8,-15);
    add(new THREE.CylinderGeometry(40,40,26,24),STEEL,mx,cy+85,R*0.5,Math.PI/2);          // sheave
    // belt guard over flywheel and sheave, facing the room
    const shape=new THREE.Shape(); const r1=128, r2=58, x1=px, x2=mx, yc=cy+95;
    shape.absarc(x1,yc,r1,Math.PI/2,Math.PI*1.5,false); shape.lineTo(x2,yc-r2); shape.absarc(x2,yc,r2,-Math.PI/2,Math.PI/2,false); shape.lineTo(x1,yc+r1);
    const guard=new THREE.ExtrudeGeometry(shape,{depth:46,bevelEnabled:true,bevelSize:6,bevelThickness:6,bevelSegments:2,curveSegments:24});
    add(guard,TAN,0,0,R*0.5-10);
    // pressure switch, gauge, outlet, drain
    add(new THREE.BoxGeometry(70,90,55),STEEL,R*0.1,tb+Ht+10,-R*0.55);
    add(new THREE.CylinderGeometry(34,34,12,24),WHITE,-R*0.05,tb+Ht+30,-R*0.62,Math.PI/2,0,0.5);
    add(new THREE.CylinderGeometry(12,12,120,12),STEEL,R*0.15,tb+Ht-40,-R*0.7);
    add(new THREE.CylinderGeometry(9,9,60,10),STEEL,R*0.55,tb+22,R*0.55,0,0,Math.PI/2);  // manual drain
    // place the group at the placeholder's footprint, then attach it under the D20 node
    grp.position.set(ctr.x,0,ctr.z); grp.updateMatrixWorld(true); node.updateMatrixWorld(true);
    const inv=new THREE.Matrix4().copy(node.matrixWorld).invert();
    grp.matrixAutoUpdate=false; grp.matrix.copy(inv.multiply(grp.matrixWorld)); node.add(grp);
  }
  recolor(); styleStrainer(); addDrain(); addCompressor();
  return {drainPos, PAL};
};
