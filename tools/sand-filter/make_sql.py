import json,sys
d=json.load(open('sand_filter_data.json'))
def q(v):
    if v is None: return 'null'
    if isinstance(v,(int,float)): return str(v)
    if isinstance(v,(dict,list)): return "'"+json.dumps(v).replace("'","''")+"'::jsonb"
    return "'"+str(v).replace("'","''")+"'"
M=[]
for r in d['shffg']['models']:
    M.append(dict(product_line='SHFFG',model=r['model'],tank_dia_in=r['dia'],shell_len_in=r['length'],conn_in=r['conn'],face_piping_size=None,
      filter_area_sf=r['area_sf'],flow_min_gpm=r['flow_gpm'][0],flow_max_gpm=r['flow_gpm'][1],rate_min_gpmsf=r['rate_gpmsf'][0],rate_max_gpmsf=r['rate_gpmsf'][1],
      sand_cf=r['sand_cf'],gravel_cf=None,bed_depth_in=r['bed_in'],ship_wt_lb=r['ship_lb'],oper_wt_lb=r['oper_lb'],
      dims_in={k:r[k] for k in 'A A1 B C E G'.split()},part_numbers=r['pn'],notes='A=ID (34 in models: OD), A1=max OD, B=overall length, C/E connection heights, G=stacked overall height',source='SHFFG Technical Data Sheet R 2/9/18; PART NUMBERS - MODEL NUMBERS.xlsx'))
for r in d['srf']['models']:
    M.append(dict(product_line='SRF',model=r['model'],tank_dia_in=r['dia'],shell_len_in=None,conn_in=r['conn'],face_piping_size=None,
      filter_area_sf=r['area_sf'],flow_min_gpm=r['flow_gpm'][0],flow_max_gpm=r['flow_gpm'][1],rate_min_gpmsf=r['rate_gpmsf'][0],rate_max_gpmsf=r['rate_gpmsf'][1],
      sand_cf=r['sand_cf'],gravel_cf=r['gravel_cf'],bed_depth_in=22,ship_wt_lb=r['ship_lb'],oper_wt_lb=r['oper_lb'],
      dims_in={k:r[k] for k in 'A A1 B C D E F G head_t shell_t'.split()},part_numbers=r.get('pn',{}),
      notes='Steel SRF dimensions. Fiberglass SRFFG built to the same filter area (50 psi FG, 60 or 72 in side shell); FG sizes '+json.dumps(d['srf']['fg_sizes'].get(str(r['dia'])) or d['srf']['fg_sizes'].get(r['dia'])),source='SRF/DRF tech data R-5/4/11; master_product_list'))
for r in d['drf']['models']:
    M.append(dict(product_line='DRF',model=r['model'],tank_dia_in=r['dia'],shell_len_in=None,conn_in=None,face_piping_size=r['fp'],
      filter_area_sf=r['area_sf'],flow_min_gpm=r['flow_gpm'][0],flow_max_gpm=r['flow_gpm'][1],rate_min_gpmsf=r['rate_gpmsf'][0],rate_max_gpmsf=r['rate_gpmsf'][1],
      sand_cf=None,gravel_cf=None,bed_depth_in=None,ship_wt_lb=r['ship_lb'],oper_wt_lb=r['oper_lb'],dims_in={'K':r['K'],'L':r['L']},part_numbers={},notes='Dual cell, two SRF cells of the same diameter on one face piping set with isolation valves',source='SRF/DRF tech data R-5/4/11'))
for r in d['ccfg']['models']:
    M.append(dict(product_line='CCFG',model=r['model'],tank_dia_in=r['dia'],shell_len_in=None,conn_in=r['conn'],face_piping_size=None,
      filter_area_sf=r['area_sf'],flow_min_gpm=r['flow_gpm'][0],flow_max_gpm=r['flow_gpm'][1],rate_min_gpmsf=r['rate_gpmsf'][0],rate_max_gpmsf=r['rate_gpmsf'][1],
      sand_cf=r['sand_cf'],gravel_cf=r['gravel_cf'],bed_depth_in=r['bed_in'],ship_wt_lb=r['ship_lb'],oper_wt_lb=r['oper_lb'],
      dims_in={k:r[k] for k in 'A B C D E F'.split() if r[k] is not None},part_numbers=r['pn'],notes=r.get('note') or ('Access: '+r['access']),source='CCFG Legacy tech data ML-4/29/26; drawing 36CCFG-3MAN; master_product_list'))
cols=list(M[0].keys())
sql="insert into public.sand_filter_models ("+",".join(cols)+") values\n"+",\n".join("("+",".join(q(m[c]) for c in cols)+")" for m in M)
sql+="\non conflict (product_line, model, conn_in, face_piping_size) do update set "+",".join(f"{c}=excluded.{c}" for c in cols if c not in('product_line','model','conn_in','face_piping_size'))+", updated_at=now();"
open('ins_models.sql','w').write(sql)
F=[]
for s,v in d['shffg']['fp_single'].items():
    F.append(dict(row_type='dimension',product_line='SHFFG',arrangement='1SHF',tanks=1,size=str(s),operation='3W',dims_in=v,sap_part=None,description='Single tank 3-way face piping dimensions',source='SHFFG Technical Data Sheet R 2/9/18'))
for arr,tab in d['shffg']['fp_dual'].items():
    for s,(J,K,Mm) in tab.items():
        F.append(dict(row_type='dimension',product_line='SHFFG',arrangement='2SHF' if arr=='SxS' else '2SHFS',tanks=2,size=s,operation='3W',dims_in={'J':J,'K':K,'M':Mm},sap_part=None,description=('Side by side' if arr=='SxS' else 'Stacked')+' dual tank face piping dimensions',source='SHFFG Technical Data Sheet R 2/9/18'))
for s,(G,H) in d['ccfg']['fp_dual'].items():
    F.append(dict(row_type='dimension',product_line='CCFG',arrangement='2CCFG',tanks=2,size=s,operation='3W',dims_in={'G':G,'H':H},sap_part=None,description='CCFG dual tank face piping dimensions',source='CCFG Legacy tech data ML-4/29/26'))
for a,n in d['shffg']['orient'].items():
    F.append(dict(row_type='orientation',product_line='SHFFG',arrangement=a,tanks=int(a[0]),size=None,operation=None,dims_in={'codes':[f'C{i}' for i in range(1,n+1)]},sap_part=None,description=f'Drawing library orientation codes C1-C{n}',source='FILTER SYSTEM DRAWING MATRIX.xlsx'))
line={'SHF':'SHFFG','SHFS':'SHFFG','CCFG':'CCFG','SDC':'SDC','DRF':'DRF','SRF':'SRF'}
for p in d['fp_parts']:
    F.append(dict(row_type='assembly',product_line=line[p['arr']],arrangement=f"{p['tanks']}{p['arr']}",tanks=p['tanks'],size=p['size'],operation=p['op'],dims_in={},sap_part=p['part'],description=p['desc'],source='master_product_list (Sand / Facepipe)'))
cols=list(F[0].keys())
sql="insert into public.sand_filter_face_piping ("+",".join(cols)+") values\n"+",\n".join("("+",".join(q(m[c]) for c in cols)+")" for m in F)+"\non conflict do nothing;"
open('ins_fp.sql','w').write(sql)
print(len(M),len(F),len(open('ins_models.sql').read()),len(open('ins_fp.sql').read()))
