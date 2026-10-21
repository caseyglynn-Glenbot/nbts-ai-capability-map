#!/usr/bin/env python3
"""Pull the head piping, vacuum line and gauge panel out of the SP-41 installation schematic
(assets/defender-schematic/defender-sp41-schematic.bin) and write them, scaled onto the SP-55
exploded model frame, as assets/sp55-exploded/sp55-dress.bin in the same simple format the SP-55
pages read (int16 positions in 0.1 mm, u16/u32 triangle indices). Run from the repo root."""
import json, struct
import numpy as np

SRC='assets/defender-schematic/defender-sp41-schematic.bin'
OUT='assets/sp55-exploded/sp55-dress.bin'
S=1.25; DY=-112.0                       # SP-41 -> SP-55: radial scale, and the head landing at y 978 drops onto the SP-55 dome
PVC=[0x4b,0x51,0x57]; LIGHT=[0xb7,0xbc,0xc3]; BLACK=[0x1f,0x21,0x24]; PANEL=[0xd8,0xda,0xdd]; RED=[0xd1,0x20,0x2b]
GROUPS={  # group name -> (node ids, colour, extra radial push in mm)
  'eff_stub':  ([555,559], LIGHT, 0),
  'eff_spool': ([560,557,558,556], PVC, 0),
  'vac_stub':  ([654], LIGHT, 0),
  'vac_spool': ([655,656], PVC, 0),
  'vac_run':   ([657,658,659,671,678,679,681], PVC, 0),
  'hose':      ([689], BLACK, 0),
  'gauge':     ([551], PANEL, 230),
}
FLANGE={555,556,559,654,681}

b=open(SRC,'rb').read(); hl=struct.unpack('<I',b[:4])[0]; H=json.loads(b[4:4+hl]); base=4+hl
N,M=H['nodes'],H['meshes']
W=[None]*len(N)
def mat(m): a=np.array(m,float).reshape(3,4); r=np.eye(4); r[:3,:]=a; return r
for i,n in enumerate(N): W[i]=mat(n['m']) if n['parent']<0 else W[n['parent']]@mat(n['m'])
def mesh(j):
    m=M[N[j]['mesh']]
    q=np.frombuffer(b,dtype='<i2',count=m['nv']*3,offset=base+m['V']).reshape(-1,3).astype(float)*m['s']+np.array(m['c'])
    v=(W[j][:3,:3]@q.T).T+W[j][:3,3]
    f=np.frombuffer(b,dtype='<u2' if m['it']=='u16' else '<u4',count=m['nf']*3,offset=base+m['F']).reshape(-1,3).astype(np.int64)
    return v,f

def components(v,f):
    """connected components over welded vertices -> list of triangle index arrays"""
    key={}; weld=np.zeros(len(v),int)
    for i,p in enumerate(np.round(v*10).astype(int)):
        k=tuple(p); weld[i]=key.setdefault(k,len(key))
    par=list(range(len(key)))
    def find(x):
        while par[x]!=x: par[x]=par[par[x]]; x=par[x]
        return x
    for a,bb,c in f:
        ra,rb,rc=find(weld[a]),find(weld[bb]),find(weld[c]); par[rb]=ra; par[find(rc)]=ra
    roots=np.array([find(weld[t[0]]) for t in f])
    return [np.where(roots==r)[0] for r in np.unique(roots)]

entries=[]; blobs=[]; off=0
def emit(name,col,v,f):
    global off
    q=np.round(v*10).astype(np.int16)
    assert np.abs(v*10).max()<32000, name
    vb=q.astype('<i2').tobytes(); it='u16' if len(v)<65535 else 'u32'
    fb=f.astype('<u2' if it=='u16' else '<u4').tobytes()
    vb+=b'\0'*(-len(vb)%4); fb+=b'\0'*(-len(fb)%4)          # keep every typed-array offset 4-byte aligned
    entries.append({'name':name,'col':col,'nv':len(v),'nf':len(f),'itype':it,'V':[off],'F':[off+len(vb)]})
    blobs.append(vb); blobs.append(fb); off+=len(vb)+len(fb)

for g,(ids,col,push) in GROUPS.items():
    for j in ids:
        v,f=mesh(j)
        v=v*S; v[:,1]+=DY
        if push:
            c=v.mean(0); d=np.array([c[0],0,c[2]]); d/=np.linalg.norm(d); v=v+d*push
        if g=='gauge':
            # one CAD mesh: the big piece is the panel and bracket, the small round pieces are gauge faces
            for tris in components(v,f):
                used=np.unique(f[tris]); remap={u:k for k,u in enumerate(used)}
                vv=v[used]; ff=np.vectorize(remap.get)(f[tris])
                ext=vv.max(0)-vv.min(0); small=max(ext)<110
                emit('gauge_face' if small else 'gauge', RED if small else PANEL, vv, ff)
        else:
            emit(g, LIGHT if j in FLANGE else col, v, f)

hdr=json.dumps(entries).encode(); hdr+=b' '*(-(len(hdr)+4)%4)
with open(OUT,'wb') as fo:
    fo.write(struct.pack('<I',len(hdr))); fo.write(hdr); fo.write(b''.join(blobs))
print(len(entries),'entries,',sum(e['nv'] for e in entries),'verts ->',OUT, off//1024,'KB')
for e in entries: print(' ',e['name'],e['nv'])
