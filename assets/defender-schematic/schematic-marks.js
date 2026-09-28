// General Installation Schematic marks for the Defender3 SP-41 Auto installation model.
// Sources: Defender RMF O&M (04/2025) pp.79-80 "Filter Components" tables and the General Installation
// Schematic sheet (mark numbering D1-D21 / F22-F37 follows the schematic sheet).
// nodes: indices into defender-sp41-schematic.bin (nodes array). A mark lights every mesh under those nodes.
// confirm: true where the mapping from mark to 3D part is inferred from position and should be checked.
window.DEF_SCHEMATIC = {
  model: 'DEFENDER3 SP-41 AUTO (1001-7344) with typical installation piping',
  source: 'Schematic.stp (Autodesk Inventor 2024, 2026-01-08)',
  marks: [
    {mark:'D1', ref:'Pneumatic bump assembly', notes:'BUMP ASSY, AUTO SP-41-49 (1000-1447).', nodes:[102,507]},
    {mark:'D2', ref:'Quick exhaust valve', notes:'Air fittings on the bump assembly (1000-4817 to 1000-4821).', nodes:[161,162,163,165], confirm:true},
    {mark:'D3', ref:'Lifting davit', notes:'', nodes:[53]},
    {mark:'D4', ref:'Viewing window', notes:'Cover with handles 1001-5724, gasket 1000-1797, acrylic.', nodes:[412,481,482]},
    {mark:'D5', ref:'Gauge panel', notes:'', nodes:[551]},
    {mark:'D6', ref:'Influent check valve', notes:'', nodes:[609]},
    {mark:'D7', ref:'Pneumatic effluent valve', notes:'Install directly on precoat tee. Locate where valve position can be easily viewed.', nodes:[620,698]},
    {mark:'D8', ref:'Pneumatic precoat valve', notes:'Install as close as possible to pump suction piping. Precoat piping should be 2 pipe diameters smaller than effluent piping (no less than 2").', nodes:[598,699]},
    {mark:'D9', ref:'System fill valve', notes:'Manually operated, normally open valve.', nodes:[601,700]},
    {mark:'D10', ref:'Tank drain valve', notes:'Manually operated, normally closed valve. Extension is bolted directly to tank bottom. Must be plumbed independently to waste. Automated option available.', nodes:[566,580,673,674,675,676,677]},
    {mark:'D11', ref:'In-line sight glass', notes:'Install on precoat line so it can be viewed while standing at filter control panel.', nodes:[591]},
    {mark:'D12', ref:'RMF control panel', notes:'', nodes:[550]},
    {mark:'D13', ref:'Filter regulator', notes:'Set to 90 psi.', nodes:[553]},
    {mark:'D14', ref:'Vacuum transfer unit', notes:'Pre-wiring provided to RMF control panel.', nodes:[552]},
    {mark:'D15', ref:'Vacuum transfer hose', notes:'', nodes:[687]},
    {mark:'D16', ref:'Vacuum transfer piping and fittings', notes:'SCH80 PVC fittings and pipe, 1.5".', nodes:[654,655,656,657,658,659,678,679,671,681,683]},
    {mark:'D17', ref:'Vacuum transfer valve', notes:'True union ball valve 1.5", normally closed.', nodes:[680], confirm:true},
    {mark:'D18', ref:'Vacuum vent valve', notes:'True union ball valve 1.5", normally closed. Vacuum drain line must be plumbed independently to waste.', nodes:[670], confirm:true},
    {mark:'D19', ref:'Vacuum hose valve with hose', notes:'True union ball valve 1.5", normally closed.', nodes:[684,690], confirm:true},
    {mark:'D20', ref:'Air compressor', notes:'Optional. Shown as a 5 HP, 60 gal vertical tank unit (modelled on the Ingersoll Rand SS5L5), tan, at the schematic footprint diameter and twice the schematic height.', nodes:[653]},
    {mark:'D21', ref:'Water separator', notes:'', nodes:[668]},
    {mark:'F22', ref:'greenDrive VFD', notes:'Available in NEMA4X or with bypass.', nodes:[]},
    {mark:'F23', ref:'Wafer UV generator', notes:'Package includes control cabinet and treatment chamber.', nodes:[]},
    {mark:'F24', ref:'Wafer UV chamber', notes:'Installed in vertical section of piping. The model shows a WF-125-6.', nodes:[651]},
    {mark:'F25', ref:'EZ Clean strainer', notes:'Installed on the effluent side of the UV chamber.', nodes:[]},
    {mark:'F26', ref:'UV system bypass loop', notes:'Bypass leg and its gear-operated valve.', nodes:[626,627,628,629,637,693]},
    {mark:'F27', ref:'UV isolation valves', notes:'Gear or lever operated valves, normally open.', nodes:[631,694,639,695]},
    {mark:'F28', ref:'Check valve', notes:'For self-priming pumps, check valve must be installed on the suction pipe below water level.', nodes:[703]},
    {mark:'F29', ref:'Guardian strainer', notes:'Hair and lint strainer.', nodes:[610]},
    {mark:'F30', ref:'Strainer isolation valve', notes:'Gear or lever operated valve, normally open.', nodes:[617,701]},
    {mark:'F31', ref:'Precoat reducing tee', notes:'8 x 6 x 4 tee.', nodes:[605]},
    {mark:'F32', ref:'Pump throttling valve', notes:'Gear or lever operated valve, normally open.', nodes:[608,697]},
    {mark:'F33', ref:'Recirculating pump', notes:'Normblock Multi 125-250, 20 HP, with base.', nodes:[667]},
    {mark:'F34', ref:'3/4" precoat line vent valve', notes:'Ball valve, normally closed. Must be plumbed independently to waste.', nodes:[716]},
    {mark:'F35', ref:'3/4" precoat line vent auto valve', notes:'Shown with automated option.', nodes:[717]},
    {mark:'F36', ref:'1/2" shut off valve', notes:'', nodes:[682]},
    {mark:'F37', ref:'Flow meter', notes:'4-20 mA output. Signet brazolet with insert.', nodes:[708]}
  ],
  // Unmarked groups, kept so they can be moved or animated by name later.
  groups: [
    {id:'tank', ref:'Filter tank, head and legs (DEFENDER3 SP-41 AUTO)', nodes:[3,48,52,211,240,269,298]},
    {id:'influent', ref:'Influent piping (pump to filter)', nodes:[561,586,587,588,589,590,596]},
    {id:'effluent', ref:'Effluent piping', nodes:[554,581,582,583,584,619,621,622,707]},
    {id:'precoat', ref:'Precoat line', nodes:[585,595,597,599,600,602,603,604]},
    {id:'suction', ref:'Pump suction piping', nodes:[606,607,611,612,613,614,615,616,618,702,704,705,706]},
    {id:'uvloop', ref:'UV loop piping', nodes:[623]},
    {id:'uvlever', ref:'Lever valve in UV loop (not marked on the schematic)', nodes:[644,696]},
    {id:'vent', ref:'3/4" vent line', nodes:[660,661,662,663,664,709,710,711,712,713,714,715]},
    {id:'air', ref:'Compressed air line', nodes:[665,666,669,718]},
    {id:'pit', ref:'To drain (waste pit, min. 300 gpm capacity)', nodes:[672]}
  ]
};
