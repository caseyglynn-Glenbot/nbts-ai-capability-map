"""Build the sand filter configurator dataset (single source of truth).

Inputs (dumped from D:\\sand filter):
  SHFFG-TECH DATA SHEET.pdf (R 2/9/18)       -> horizontal tank table, media chart, face piping dims
  PART NUMBERS - MODEL NUMBERS.xlsx           -> SAP part numbers per tank / hand / stacked
  FILTER SYSTEM DRAWING MATRIX.xlsx           -> orientation codes per arrangement
  SRF-TECH DATA.pdf (R-5/4/11)                -> vertical SRF and DRF tables, SRF media (transcribed below)
  CCFG - TECH DATA.pdf (ML-4/29/26), 36CCFG-3MAN drawing, CCFG PIF -> CCFG Legacy
  SAND CALCULATION.xlsx                       -> SCH 80 pipe capacity at 10 ft/s
  master_product_list (Sand)                  -> part numbers incl. face piping assemblies
Output: sand_filter_data.json
"""
import json, re, sys, os
import openpyxl

DUMP = sys.argv[1]           # folder with the text dumps
SRC = sys.argv[2]            # staged source folder
OUT = sys.argv[3]
HERE = os.path.dirname(os.path.abspath(__file__))

def frac(s):
    s = s.strip().replace('"', '').replace('\u201d', '')
    parts = s.split()
    v = 0.0
    for p in parts:
        if '/' in p:
            a, b = p.split('/'); v += float(a) / float(b)
        else:
            v += float(p)
    return round(v, 4)

# ---------------------------------------------------------------- SHFFG
txt = open(os.path.join(DUMP, 'SHFFG-TECH DATA SHEET.pdf.txt')).read()
rows = []
pat = re.compile(r'^\(\*\)(\d+)SHFFG (\d) ([\d.]+) (\d+)-(\d+) (\d+)-(\d+) (\d+) (\d+) (.*)$')
for line in txt.splitlines():
    m = pat.match(line.strip())
    if not m: continue
    code, conn, area, f0, f1, r0, r1, ship, op, rest = m.groups()
    # rest: A A1 B C E G with fractions -> tokenise numbers keeping "x y/z" together
    toks = re.findall(r'\d+(?: \d+/\d+)?', rest)
    A, A1, B, C, E, G = [frac(t) for t in toks[:6]]
    dia = int(code[:2]); length = int(code[2:])
    rows.append(dict(model=f'{code}SHFFG', dia=dia, length=length, conn=int(conn), area_sf=float(area),
                     flow_gpm=[int(f0), int(f1)], rate_gpmsf=[int(r0), int(r1)], ship_lb=int(ship), oper_lb=int(op),
                     A=A, A1=A1, B=B, C=C, E=E, G=G))
media = {}
for line in txt.splitlines():
    for m in re.finditer(r'\(\*\)(\d+SHFFG) (\d+) ([\d.]+)', line):
        media[m.group(1)] = (int(m.group(2)), float(m.group(3)))
for r in rows:
    s, d = media[r['model']]; r['sand_cf'] = s; r['bed_in'] = d; r['sand_lb'] = s * 100

# part numbers (tank with internals), keyed by e.g. 4248SHFFG-4R / 4248SHFFGS-4L / ...Z
pn = {}
wb = openpyxl.load_workbook(os.path.join(SRC, 'INFORMATION/PQA/PART NUMBERS - MODEL NUMBERS.xlsx'), data_only=True)
for p, d in wb.active.iter_rows(min_row=2, values_only=True):
    if not p or not d: continue
    m = re.search(r'(\d{2})0?(\d{2,3})(SHFFGS?)-(\d)([LR])(Z?)', d)
    if not m: continue
    key = f'{m.group(1)}{int(m.group(2))}{m.group(3)}-{m.group(4)}{m.group(5)}{m.group(6)}'
    pn.setdefault(key, str(p))
mpl = []
seen = set()
for line in open(os.path.join(HERE, 'mpl_sand.txt')):
    if line.startswith('#') or not line.strip(): continue
    p, d, sc = line.rstrip('\n').split('~')
    if p in seen: continue
    seen.add(p); mpl.append(dict(part=p, desc=d, sub=sc))
    m = re.search(r'HZ (?:STACKED )?(\d{2})0?(\d{2,3})(SHFFGS?)-(\d)([LR])(Z?)$', d)
    if m:
        key = f'{m.group(1)}{int(m.group(2))}{m.group(3)}-{m.group(4)}{m.group(5)}{m.group(6)}'
        pn.setdefault(key, p)
# models in the part list but not on the tech data sheet (e.g. 48144SHFFG, 42048SHFFG-6)
extra_models = sorted({re.sub(r'S?-.*', '', k) + ('-' + k.split('-')[1][0]) for k in pn})

for r in rows:
    base = r['model']; c = r['conn']
    r['pn'] = {h: pn.get(f'{base}{s}-{c}{hh}') for h, (s, hh) in
               {'single_R': ('', 'R'), 'single_L': ('', 'L'), 'stacked_R': ('S', 'R'), 'stacked_L': ('S', 'L'),
                'single_RZ': ('', 'RZ'), 'single_LZ': ('', 'LZ'), 'stacked_RZ': ('S', 'RZ'), 'stacked_LZ': ('S', 'LZ')}.items()}
    r['pn'] = {k: v for k, v in r['pn'].items() if v}

# drawing library orientation codes (FILTER SYSTEM DRAWING MATRIX.xlsx)
orient = {'1SHF': 6, '2SHF': 16, '2SHFS': 48, '4SHFS': 36}

shffg_fp_single = {3: dict(J=15.25, K=19, L=5.1875), 4: dict(J=17, K=22, L=6.125),
                   6: dict(J=20, K=28, L=8.125), 8: dict(J=24, K=37, L=10.375)}
shffg_fp_dual = {
    'SxS': {'4x3': (14, 9.5, 33), '6x4': (18, 11, 38), '6x6': (19, 16, 45), '8x6': (22, 16, 48), '10x6': (28, 16, 54), '10x8': (28, 16, 60)},
    'S':   {'4x3': (24, 21, 8), '6x4': (31, 26, 13), '6x6': (41, 30, 13), '8x6': (41, 33, 17), '10x6': (41, 39, 21), '10x8': (54, 42, 21)},
}

# ---------------------------------------------------------------- SRF / SRFFG (SRF-TECH DATA.pdf p2-3, transcribed)
srf_rows = """36,3,7.07,36-141,5-20,36,36 3/8,9,23 1/8,16 1/4,51 1/4,73 3/8,79 1/4,3/16,3/16,520,4173,6,13
42,4,9.62,48-192,5-20,42,42 3/8,10,25,16 1/8,51 7/8,74,79 7/8,3/16,3/16,600,5738,8,18
48,3,12.6,63-189,5-15,48,48 3/8,9,23 1/8,16 7/8,53 3/8,75 1/2,82 3/8,3/16,3/16,700,7421,12,23
48,4,12.6,190-252,16-20,48,48 3/8,10,25,17 7/8,51 1/2,76 1/2,83 1/4,3/16,3/16,730,7421,16,23
54,4,15.9,80-318,5-20,54,54 3/8,10,25,18 5/8,53 1/2,78 1/2,85 1/4,1/4,3/16,940,9496,20,29
60,4,19.6,98-294,5-15,60,60 3/8,10,25,18 5/8,54 1/8,79 1/8,85 7/8,1/4,3/16,1080,11725,20,36
60,6,19.6,295-392,16-20,60,60 3/8,15,28 1/8,18 5/8,54 1/8,79 1/8,85 7/8,1/4,3/16,1120,11725,22,36
66,4,23.8,119-357,5-15,66,66 1/2,10,25,19 3/8,55 5/8,80 5/8,87 3/8,1/4,1/4,1400,14922,26,44
66,6,23.8,358-476,16-20,66,66 1/2,15,28 1/8,20 3/8,57 1/2,85 5/8,93 3/8,1/4,1/4,1440,14922,27,44
72,6,28.3,142-566,5-20,72,72 1/2,15,28 1/8,21 1/4,58 1/8,87 1/4,95,1/4,1/4,1620,17857,34,52
78,6,33.2,166-664,5-20,78,78 1/2,15,28 1/8,22 1/8,60 7/8,89,96 3/4,5/16,1/4,1980,21182,41,61
84,6,38.5,193-770,5-20,84,84 1/2,15,28 1/8,23,62 1/2,90 5/8,98 3/8,5/16,1/4,2200,24705,49,71
90,6,44.2,221-663,5-15,90,90 1/2,15,28 1/8,23 3/4,64 1/8,92 1/4,100,5/16,1/4,2430,28423,57,81
90,8,44.2,664-884,16-20,90,90 1/2,19,36 1/2,24 3/4,64 1/8,96 1/4,106,5/16,1/4,2480,28423,61,81
96,6,50.3,252-755,5-15,96,96 1/2,15,28 1/8,24 5/8,65 3/4,93 7/8,101 5/8,5/16,1/4,2690,32435,66,92
96,8,50.3,756-1006,16-20,96,96 1/2,19,36 1/2,25 5/8,61 7/8,98 1/2,108 1/4,5/16,1/4,2740,32435,70,92
102,6,56.8,284-851,5-15,102,102 5/8,15,28 1/8,25 1/2,67 5/8,95 3/4,103 1/2,3/8,5/16,3520,38020,77,104
102,8,56.8,852-1136,16-20,102,102 5/8,19,36 1/2,26 1/2,63 1/4,99 3/4,109 1/2,3/8,5/16,3570,38020,82,104
108,6,63.6,318-954,5-15,108,108 5/8,15,28 1/8,26 1/4,66 1/8,97 1/4,105,3/8,5/16,3850,42949,89,117
108,8,63.6,955-1272,16-20,108,108 5/8,19,36 1/2,27 1/4,61 3/4,101 1/4,111,3/8,5/16,3910,42949,95,117
114,8,70.9,355-1418,5-20,114,114 5/8,19,36 1/2,27 1/8,70 3/4,102 3/4,112 5/8,3/8,5/16,4280,48041,107,130
120,8,78.5,393-1570,5-20,120,120 5/8,19,36 1/2,28 7/8,73 3/8,105 3/8,115 1/8,3/8,5/16,4650,53836,123,144"""
def split_mixed(s, n):
    return s.split(',')
srf = []
for line in srf_rows.splitlines():
    t = split_mixed(line, 0)
    dia, conn, area, flow, rate = int(t[0]), int(t[1]), float(t[2]), t[3], t[4]
    A, A1, B, C, D, E, F, G, H, J = [frac(x) for x in t[5:15]]
    ship, op, gravel, sand = int(t[15]), int(t[16]), int(t[17]), int(t[18])
    f0, f1 = map(int, flow.split('-')); r0, r1 = map(int, rate.split('-'))
    srf.append(dict(model=f'{dia}SRF-{conn}', dia=dia, conn=conn, area_sf=area, flow_gpm=[f0, f1], rate_gpmsf=[r0, r1],
                    A=A, A1=A1, B=B, C=C, D=D, E=E, F=F, G=G, head_t=H, shell_t=J, ship_lb=ship, oper_lb=op,
                    gravel_cf=gravel, sand_cf=sand, bed_in=22))
# media chart also lists 114 SRF-6 and 120 SRF-6 (no dimension rows): keep as media-only references
srf_media_only = [dict(model='114SRF-6', gravel_cf=101, sand_cf=130), dict(model='120SRF-6', gravel_cf=116, sand_cf=144)]
# part numbers
for r in srf:
    for x in mpl:
        if re.search(rf'STL {r["dia"]}SRF-{r["conn"]}$', x['desc']): r.setdefault('pn', {})['steel'] = x['part']
        if re.search(rf'FG {r["dia"]}SRFFG-{r["conn"]}(Z?)', x['desc']) or re.search(rf'FILTER {r["dia"]}SRFFG-{r["conn"]} ', x['desc']):
            z = re.search(r'-\dZ', x['desc'])
            r.setdefault('pn', {})['fiberglass' + ('_Z' if z else '')] = x['part']
# vertical fiberglass (API) sizes from the 2026 vertical vessel sheets: side shell 60 or 72 in, 50 psi
srffg_fg = {36: [3], 42: [3, 4], 48: [4, 6], 54: [4], 60: [3, 4, 6], 66: [4, 6], 72: [6], 78: [6], 84: [6], 90: [6],
            96: [8], 102: [8], 108: [8], 114: [8], 120: [8]}

drf_rows = """36 3x3 14.1 71-212 5-15 88 1/2 32 1/8 1040 8346
36 4x3 14.1 213-282 16-20 90 1/2 33 1/8 1040 8346
42 4x3 19.2 96-288 5-15 102 1/2 33 1/8 1200 11476
42 6x3 19.2 289-384 16-20 112 1/2 40 1200 11476
48 4x3 25.1 125-377 5-15 114 1/2 33 1/8 1400 14842
48 6x4 25.2 378-502 16-20 124 1/2 40 1400 14842
54 6x4 31.8 159-636 5-20 136 1/2 40 1880 18992
60 6x4 39.3 196-590 5-15 148 1/2 40 2160 23450
60 6x6 39.3 591-786 16-20 148 1/2 40 2160 23450
66 6x4 47.5 237-713 5-15 160 5/8 40 2800 29844
66 8x6 47.5 714-950 16-20 168 5/8 55 1/2 2800 29844
72 6x6 56.5 282-848 5-15 180 5/8 40 3240 35714
72 8x6 56.5 849-1130 16-20 180 5/8 55 1/2 3240 35714
78 8x6 66.4 332-1328 5-20 192 5/8 55 1/2 3960 42364
84 8x6 77.0 385-1155 5-15 204 5/8 55 1/2 4400 49410
84 10x6 77.0 1156-1540 16-20 210 5/8 39 15/16 4400 49410
90 8x6 88.4 442-1326 5-15 216 5/8 55 1/2 4860 56846
90 10x6 88.4 1327-1768 16-20 222 5/8 39 15/16 4860 56846
96 8x6 100.5 502-1508 5-15 228 5/8 55 1/2 5380 64870
96 10x8 100.5 1509-2010 16-20 234 5/8 39 15/16 5480 64870
102 8x6 113.6 568-1704 5-15 240 3/4 55 1/2 7040 76040
102 10x8 113.6 1705-2272 16-20 246 3/4 39 15/16 7140 76040
108 10x8 127.2 636-1908 5-15 258 3/4 39 15/16 7820 85898
108 12x8 127.2 1909-2544 16-20 262 3/4 47 11/16 7820 85898
114 10x8 141.8 709-2128 5-15 270 3/4 39 15/16 8560 96082
114 12x8 141.8 2129-2836 16-20 274 3/4 47 11/16 8560 96082
120 10x8 157.0 785-2355 5-15 282 3/4 39 15/16 9300 107672
120 12x8 157.0 2356-3140 16-20 286 3/4 47 11/16 9300 107672"""
drf = []
for line in drf_rows.splitlines():
    t = re.findall(r'\d+x\d+|\d+ \d+/\d+|[\d.]+-[\d.]+|[\d.]+', line)
    dia, fp, area, flow, rate, K, L, ship, op = t
    f0, f1 = map(int, flow.split('-')); r0, r1 = map(int, rate.split('-'))
    hdr = fp.split('x')
    drf.append(dict(model=f'{dia}DRF-{hdr[0]}', dia=int(dia), fp=fp, area_sf=float(area), flow_gpm=[f0, f1], rate_gpmsf=[r0, r1],
                    K=frac(K), L=frac(L), ship_lb=int(ship), oper_lb=int(op)))

# ---------------------------------------------------------------- CCFG Legacy
ccfg = [
    dict(model='36CCFG-3', dia=36, conn=3, area_sf=6.5, flow_gpm=[33, 98], rate_gpmsf=[5, 15], max_flow=98,
         A=None, B=None, C=42.6875, D=None, E=11.9375, F=11.875, ship_lb=None, oper_lb=None, gravel_cf=2, sand_cf=6, bed_in=11,
         access='lid', bw_gpm=[98, 130], note='From drawing 36CCFG-3MAN (FP-1). NSF PIF lists 6.9 sq ft and a 16 in bed; tech data sheet ML-4/29/26 lists 42 and 48 only.',
         pn={'tank_only': '1000-8277'}),
    dict(model='42CCFG-3', dia=42, conn=3, area_sf=9.6, flow_gpm=[48, 115], rate_gpmsf=[5, 12], max_flow=115,
         A=64, B=43, C=44, D=38, E=13.75, F=13.75, ship_lb=111, oper_lb=2170, gravel_cf=3, sand_cf=13, bed_in=16,
         access='6x9 access port', pn={'complete_man': '1000-7152', 'complete_auto': '1002-8170', 'tank_internals': '1000-8278', 'tank_only': '1000-8279'}),
    dict(model='48CCFG-3', dia=48, conn=3, area_sf=11.8, flow_gpm=[59, 142], rate_gpmsf=[5, 12], max_flow=142,
         A=70, B=49, C=57.75, D=47.25, E=14.125, F=21.625, ship_lb=189, oper_lb=3410, gravel_cf=3, sand_cf=16, bed_in=17,
         access='14x18 manway', pn={'complete_man': '1000-7263', 'complete_auto': '1000-7262', 'tank_internals': '1000-8280', 'tank_only': '1000-8281'}),
]
ccfg_fp_dual = {'3x3': (7, 7), '4x3': (8, 8), '6x3': (13, 13)}   # G, H

# ---------------------------------------------------------------- face piping assemblies from the master product list
fp_parts = []
for x in mpl:
    if x['sub'] != 'Facepipe': continue
    d = x['desc']
    m = re.search(r'FACEPIPE\*?\s*(3WL|3WE|3WG|3WP|STD|DLK)?\s*(\d?)(SHFS|SHF|CCFG|SDC|DRF|SRF)\s*([\dX]+)', d.replace('3WL2SHFS', '3WL 2SHFS').replace('STD4SHFS', 'STD 4SHFS').replace('SHF12X', 'SHF 12X').replace('SHFS12X', 'SHFS 12X').replace('SHFS10X', 'SHFS 10X'))
    if not m:
        if 'FP4SHFS3WE10X6' in d: fp_parts.append(dict(part=x['part'], op='3WE', tanks=4, arr='SHFS', size='10X6', desc=d)); continue
        if 'CCFG' in d: fp_parts.append(dict(part=x['part'], op='MAN' if 'MAN' in d else 'AUTO', tanks=1, arr='CCFG', size='3', desc=d)); continue
        continue
    op, n, arr, size = m.groups()
    fp_parts.append(dict(part=x['part'], op=op or 'STD', tanks=int(n) if n else (2 if arr in ('DRF', 'SDC') else 1), arr=arr, size=size, desc=d))

pipe_cap = {1: 22, 1.5: 53, 2: 90, 2.5: 128, 3: 201, 4: 351, 6: 799, 8: 1401, 10: 2206, 12: 3123, 14: 3771, 16: 4953, 18: 6278}

ops = {
    '3WL': '3-way lever: valve pairs linked to one handle (influent with backwash waste, effluent with backwash supply)',
    '3WE': '3-way electric: linear actuators on the linked valve pairs (115/220 V)',
    '3WG': '3-way gear operated',
    '3WP': '3-way pneumatic: pneumatic operators driven by an MFP4 programmer',
    'STD': 'Standard face piping with individual valves',
    'DLK': 'DLK face piping (as listed in the master product list)',
}

data = dict(
    meta=dict(built='2026-11-02', sources=[
        'SHFFG Technical Data Sheet R 2/9/18', 'SRF/DRF Single Cell Sand Filters tech data R-5/4/11',
        'CCFG Legacy Fiberglass Sand Filters tech data ML-4/29/26', 'Drawing 36CCFG-3MAN', 'Drawing 42SRFFG-4',
        'PART NUMBERS - MODEL NUMBERS.xlsx', 'FILTER SYSTEM DRAWING MATRIX.xlsx', 'SAND CALCULATION.xlsx (velocity chart)',
        'Vertical vessel 2026 size sheets (sizes only)', 'master_product_list product_line Sand'],
        backwash_rate_gpmsf=[15, 20], design_pressure_psi=50,
        notes=['Fiberglass tanks: 50 psi working pressure, hydrostatically tested to 1.1x working pressure, 4:1 safety factor.',
               'Steel SRF/DRF: 50 psi operating, 75 psi hydrostatic test.',
               'Sand .45-.55 mm, 100 lb per cu ft. Gravel 1/4 x 1/8 in where used.']),
    shffg=dict(models=rows, fp_single=shffg_fp_single, fp_dual=shffg_fp_dual, orient=orient),
    srf=dict(models=srf, media_only=srf_media_only, fg_sizes=srffg_fg),
    drf=dict(models=drf),
    ccfg=dict(models=ccfg, fp_dual=ccfg_fp_dual),
    fp_parts=fp_parts, ops=ops, pipe_cap_10fps=pipe_cap,
    parts=[x for x in mpl if x['sub'] in ('Media', 'Controller', 'Misc', 'Kit', 'Gasket')],
)
json.dump(data, open(OUT, 'w'), indent=1)
print('SHFFG rows', len(rows), 'SRF', len(srf), 'DRF', len(drf), 'CCFG', len(ccfg), 'FP parts', len(fp_parts))
print('SHFFG rows without any PN:', [r['model'] + '-' + str(r['conn']) for r in rows if not r['pn']])
print('PN keys not on tech sheet:', sorted({k for k in pn if re.sub(r'S?-.*', '', k) not in {r['model'] for r in rows}}))
