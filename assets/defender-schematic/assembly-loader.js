// Loads the assembly binary into a three.js hierarchy. Returns {root, nodes:[{obj,node}]}
function loadAssembly(buf){
  const dv=new DataView(buf), hl=dv.getUint32(0,true);
  const H=JSON.parse(new TextDecoder().decode(new Uint8Array(buf,4,hl))), base=4+hl;
  const geos=H.meshes.map(m=>{
    const q=new Int16Array(buf,base+m.V,m.nv*3), p=new Float32Array(q.length);
    for(let i=0;i<q.length;i+=3){ p[i]=q[i]*m.s+m.c[0]; p[i+1]=q[i+1]*m.s+m.c[1]; p[i+2]=q[i+2]*m.s+m.c[2]; }
    const idx=m.it==='u16'?new Uint16Array(buf,base+m.F,m.nf*3):new Uint32Array(buf,base+m.F,m.nf*3);
    const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(p,3)); g.setIndex(new THREE.BufferAttribute(idx.slice(),1)); g.computeVertexNormals(); g.computeBoundingBox();
    let lg=null; if(m.nl){ const ql=new Int16Array(buf,base+m.L,m.nl*3), lp=new Float32Array(ql.length); for(let i=0;i<ql.length;i+=3){ lp[i]=ql[i]*m.s+m.c[0]; lp[i+1]=ql[i+1]*m.s+m.c[1]; lp[i+2]=ql[i+2]*m.s+m.c[2]; } lg=new THREE.BufferGeometry(); lg.setAttribute('position',new THREE.BufferAttribute(lp,3)); }
    return {g,lg};
  });
  const objs=[], matCache={};
  const lineMat=new THREE.LineBasicMaterial({color:0x14171a,transparent:true,opacity:0.55});
  H.nodes.forEach((n,i)=>{
    const o=new THREE.Group(); o.name=n.name; o.userData.idx=i;
    const m=n.m; o.matrixAutoUpdate=false;
    o.matrix.set(m[0],m[1],m[2],m[3], m[4],m[5],m[6],m[7], m[8],m[9],m[10],m[11], 0,0,0,1);
    o.matrix.decompose(o.position,o.quaternion,o.scale); o.matrixAutoUpdate=true;
    objs.push(o);
    if(n.parent>=0) objs[n.parent].add(o);
  });
  // colour inherits down the tree when a part has none of its own
  const colOf=i=>{ let k=i; while(k>=0){ if(H.nodes[k].col) return H.nodes[k].col; k=H.nodes[k].parent; } return [0.75,0.77,0.8]; };
  H.nodes.forEach((n,i)=>{
    if(n.mesh===undefined||n.mesh<0) return;
    const c=colOf(i), key=c.join(',');
    const mat=new THREE.MeshPhongMaterial({color:new THREE.Color(c[0],c[1],c[2]),shininess:20,specular:0x222222,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
    const mesh=new THREE.Mesh(geos[n.mesh].g,mat); mesh.userData.idx=i; objs[i].add(mesh);
    if(geos[n.mesh].lg) objs[i].add(new THREE.LineSegments(geos[n.mesh].lg,lineMat));
  });
  const root=new THREE.Group(); H.nodes.forEach((n,i)=>{ if(n.parent<0) root.add(objs[i]); });
  return {root, objs, nodes:H.nodes};
}
