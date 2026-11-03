# Sand filter configurator build

- `sand_filter_data.json` is the single source of truth (SHFFG, SRF/SRFFG, DRF, CCFG, face piping parts).
- `build_data.py <dumps> <D:\sand filter\New folder> sand_filter_data.json` rebuilds it from the tech data sheets, part number list and drawing matrix.
- `build_page.py` embeds the JSON into `template.html` and writes `assets/configurators/sand-filter/index.html` (+ three.min.js).
- `make_sql.py` writes the Supabase inserts for `sand_filter_models` and `sand_filter_face_piping` (File storage project).
