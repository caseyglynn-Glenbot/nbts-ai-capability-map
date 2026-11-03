import json,shutil,os
d=json.load(open('sand_filter_data.json'))
for r in d['srf']['models']: r.setdefault('pn',{})
out=os.path.join('dist','assets','configurators','sand-filter'); os.makedirs(out,exist_ok=True)
html=open('template.html').read().replace('/*__DATA__*/null',json.dumps(d,separators=(',',':')))
open(os.path.join(out,'index.html'),'w').write(html)
shutil.copy('/home/claude/portal/assets/sp55-exploded/three.min.js',os.path.join(out,'three.min.js'))
cad=os.path.join(out,'cad'); os.makedirs(cad,exist_ok=True)
for f in ['pipe-parts-4in.bin','face-c1.bin','face-c2.bin','face-c3.bin','face-c4.bin','face-s-c1.bin','face-s-c2.bin','face-s-c31.bin','face-s-c32.bin']:
    shutil.copy('/home/claude/portal/assets/shffg/'+f,os.path.join(cad,f))
print(len(html))
