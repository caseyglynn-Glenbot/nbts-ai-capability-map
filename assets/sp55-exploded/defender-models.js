// Defender model list for the Parts & Warranty page.
// Geometry: one binary per model, converted from the Defender3 STEP files (SP-27/29/33/41/49/55 Auto and the
// "-R" reduced-height variants). The SP-55 Auto keeps its original model, which also shows the internals.
// The STEP files are externals only (head, body, bump, davit, window), so for every other model the internals
// (tube sheet, elements, felt gasket, hold-down plates, lift shaft and its O-rings, bushing O-rings, snap ring)
// are listed with part numbers but are not drawn.
// Part numbers: NBTS master product list (SAP). Where the STEP drawing number is not in the master list,
// the row says so and flags that a SAP number is needed.
(function(){
  const B = window.SP55_PARTS;
  const clone = o => JSON.parse(JSON.stringify(o));
  const NEED = 'SAP # needed';
  const notList = 'Drawing no. from the STEP model; not in the master product list. SAP # needed to order.';

  const SMALL = { // SP-24 to SP-33 bump hardware (SP-27, SP-29, SP-33)
    bump:['1000-1446','BUMP ASSY, AUTO SP-24-33'], bumpP:['1003-3775','BUMP ASSY, AUTO SP-24-33 PAINTED'],
    kit:['1000-5806','DEFENDER BUMP ASSY SPARE PARTS KIT 24-36'], tire:['1000-4722','DEFENDER BUMP TIRE W/HW 24-33'],
    cover:['1000-4622','COVER, AIR SPRING BUMP ASSY SP-24-33 AUTO'], bushing:['1000-4725','BUSHING, DEFENDER LIFT SHAFT SP-24/33'],
    guide:['1000-1445','GUIDE ASSY, LIFT SHAFT W/RETAINER SP-24-33'], guide2:['1000-4620','GUIDE ASSY, LIFT SHAFT-AUTO SP-24-33'],
    snap:['1000-4732','SNAP RING, DEFENDER SP 24-33'], lsor:['1000-4727','O-RING, DEFENDER LIFT SHAFT SP-24-33'],
    bgasket:['1000-4780','GASKET 3" FLANGE ANSI 150# NEOPRENE 1/8"'], nut:['1000-4474','NUT HEX HEAVY 1-8 UNC T304']
  };
  const MID = { // SP-39 to SP-50 bump hardware (SP-41, SP-49)
    bump:['1000-1447','BUMP ASSY, AUTO SP-41-49'], bumpP:['1003-3776','BUMP ASSY, AUTO SP-39-50 PAINTED'],
    kit:['1000-5807','DEFENDER BUMP ASSY SPARE PARTS KIT 39-60'], tire:['1000-4723','DEFENDER BUMP TIRE W/HW SP-39-50'],
    cover:['1000-4623','COVER, AIR SPRING BUMP ASSY SP41-49 AUTO'], bushing:['1000-4726','BUSHING, DEFENDER LIFT SHAFT SP-41-55'],
    guide:['1000-1448','GUIDE ASSY, LIFT SHAFT W/RETNR SP-41-49'], guide2:['1000-4625','GUIDE ASSY, LIFT SHAFT-AUTO SP-41-49'],
    snap:['1000-4733','SNAP RING, DEFENDER SP-41/55'], lsor:['1000-4728','O-RING, DEFENDER LIFT SHAFT SP-39-55'],
    bgasket:['1000-4772','GASKET 6" FLANGE ANSI 150# NEOPRENE'], nut:['1000-4475','NUT HEX HEAVY 1 1/4-7 T304']
  };
  const DEF3_WINDOW = {
    window_gasket:[['1000-1797','DEFENDER GASKET 14" OD X 11.92" ID','Window gasket'],['1004-3514','DEFENDER VIEWING WINDOW 14" GLASS&GASKET','Acrylic with gasket']],
    acrylic:[['1004-3514','DEFENDER VIEWING WINDOW 14" GLASS&GASKET','Acrylic with gasket'],['1001-9348','VIEWING WINDOW 6" ACRYLIC ONLY 14" OD (STEP)',notList]],
    window_cover:[['1001-5724','VIEWING WINDOW ASSY, COVER W/HANDLES','Cover with handles'],['1004-2849','VIEW WINDOW COVER & HANDLES 12" PAINT BLUE','12 in painted variant']],
    window_hardware:[['1001-9590','Heavy hex bolt 7/8-9 UNC x 4.5 (STEP)','12 places with 1000-4473 nuts, 1000-4478 lock washers and 1000-4278 washers. '+notList]]
  };

  // per-model data ------------------------------------------------------------------------------
  const SPEC = {
    'sp-27': { label:'SP-27 Auto', size:'SP-27', b:SMALL, bolts:9, elements:487, elLen:48, filterSys:'SP-27-48-487',
      filter:[['1001-7385','DEFENDER3 SP-27 AUTO','Complete filter, standard davit'],['1004-2927','DEFENDER3 SP-27 AUTO - MIRRORED DAVIT','Mirrored davit variant'],['1002-2390','DEFENDER3 SP-27 AUTO - T316 INTERNALS','T316 internals variant'],['1001-8527','DEFENDER3 SP-27 AUTO REDUCED HEIGHT','Reduced height variant ("R")'],['1001-7257','LEG ASSY, EXTENSION','Leg extension (standard height)'],['1001-7362','SUMP DEF3 ASSY, SP-27 WELDMENT','Body weldment'],['1000-8891','FILTER DEFENDER SP-27-48-487','Filter system, 48 in elements'],['1002-2313','FILTER DEFENDER SP-27-48-487 T316 INTS','Filter system, T316 internals']],
      head:[['1004-3633','HEAD UPPER SP-27 PAINTED AND LINED','Replacement head'],['1000-4527','HEADUPPER W/SEAL RNG SP-27 COMP','Head with seal ring'],['1001-7348','UPPER HEAD W/SEAL RING SP-27 (STEP)',notList],['1004-2391','HARDWARE KIT SP-27 DEF2/DEF3 LID TO BODY','Head-to-body hardware kit']],
      gasket:[['1000-5786','DEFENDER HEAD GASKET 27" KIT','SP-27 kit (STEP part 1000-4206, 5/8 in O-ring)']],
      davit:[['1000-4842','DAVIT ASSEMBLY SP-24/27 (STEP)',notList],['1000-4848','JACK 4 TON (STEP)','With 1001-9370 jack hold down. '+notList],['1004-2927','DEFENDER3 SP-27 AUTO - MIRRORED DAVIT','Filter ordered with davit on the opposite side']],
      shaft:[['1000-4247','LIFT SHAFT, DEFENDER SP-24/27 AUTO T304','Shaft, T304'],['1001-7374','DEFENDER3 LIFT SHAFT 27" AUTO','Defender3 shaft'],['1002-4074','DEFENDER2 LIFT SHAFT 27" AUTO T316 1PC','Shaft, T316 one-piece'],['1002-4075','DEFENDER LIFTSHAFT KIT T304 SP-27','Kit, T304'],['1002-4080','DEFENDER LIFTSHAFT KIT T316 SP-27','Kit, T316']],
      tubesheet:[['1000-4660','TUBESHEET KIT T304 SP-27 W/HW PLT&HW','Tube sheet kit with hold-down plates and hardware, T304'],['1004-2940','TUBE SHEET ASSY, SP-27 LAMINATED T316','Laminated assembly, T316']],
      felt:[['1002-4116','DEFENDER FELT GASKET SP-27','Felt gasket']],
      intHw:[[NEED,'Internals hardware kit, T316, SP-27','No SP-27 internals hardware kit in the master product list (SP-55 is 1003-8321)']] },

    'sp-29': { label:'SP-29 Auto', size:'SP-29', b:SMALL, bolts:24, elements:'200 to 500', elLen:36, filterSys:'SP-29-36-xxx-A', noDavit:true, def2:true,
      filter:[[NEED,'DEFENDER3 SP-29 AUTO','No Defender3 SP-29 Auto line in the master product list. The STEP file is the DEFENDER2 SP-29-36 Auto.'],['1000-8894','FILTER DEFENDER SP-29-36-200-A','200 elements'],['1000-8895','FILTER DEFENDER SP-29-36-250-A','250 elements'],['1002-2317','FILTER DEFENDER SP-29-36-250 T316 INTS','250 elements, T316 internals'],['1000-8896','FILTER DEFENDER SP-29-36-300-A','300 elements'],['1000-8898','FILTER DEFENDER SP-29-36-350-A','350 elements'],['1000-8899','FILTER DEFENDER SP-29-36-400-A','400 elements'],['1000-8901','FILTER DEFENDER SP-29-36-450-A','450 elements'],['1000-8904','FILTER DEFENDER SP-29-36-500-A','500 elements'],['1002-4872','SP-29 ASSERO SUMP WELDMENT & HEAD ONLY','Body weldment and head']],
      head:[['1000-4617','HEADUPPER W/SEAL RNG SP-29-A PAINT/LINED','Replacement head (same number as the STEP head)'],['1000-4270','BOLT HEX HEAD 1/2" X 2-1/2" (STEP)','24 places with 1000-4741 washers, 1000-4203 lock washers and 1000-4470 nuts. '+notList]],
      gasket:[['1000-4797','DEFENDER HEAD GASKET 29"','Same number as the STEP gasket']],
      shaft:[['1001-8490','DEFENDER3 LIFT SHAFT 29" AUTO','Defender3 shaft'],['1000-4839','DEFENDER LIFT SHAFT 29 ASSERO T304-AUTO','Shaft, T304'],['1002-5926','DEFENDER2 LIFT SHAFT 29" AUTO T316 1PC','Shaft, T316 one-piece'],['1002-4064','DEFENDER LIFTSHAFT KIT T304 SP-29','Kit, T304'],['1002-4065','DEFENDER LIFTSHAFT KIT T316 SP-29','Kit, T316']],
      tubesheet:[['1000-4662','TUBE SHEET SP-29-200 KIT T304','200 elements'],['1000-4663','TUBE SHEET SP-29-250 KIT T304','250 elements'],['1000-4664','TUBE SHEET SP-29-300 KIT T304','300 elements'],['1000-4665','TUBE SHEET SP-29-350 KIT T304','350 elements'],['1000-4666','TUBE SHEET SP-29-400 KIT T304','400 elements'],['1000-4667','TUBE SHEET SP-29-450 KIT T304','450 elements'],['1000-4669','TUBE SHEET SP-29-500 KIT T304','500 elements']],
      felt:[['1002-4107','DEFENDER FELT GASKET SP-29 200','200 elements'],['1002-4108','DEFENDER FELT GASKET SP-29 250','250 elements'],['1002-4109','DEFENDER FELT GASKET SP-29 300','300 elements'],['1002-4120','DEFENDER FELT GASKET SP-29 350','350 elements'],['1002-4121','DEFENDER FELT GASKET SP-29 400','400 elements'],['1002-4122','DEFENDER FELT GASKET SP-29 450','450 elements'],['1002-4123','DEFENDER FELT GASKET SP-29 500','500 elements']],
      intHw:[[NEED,'Internals hardware kit, T316, SP-29','No SP-29 internals hardware kit in the master product list']],
      window:{
        window_gasket:[['1000-4243','DEFENDER GASKET 6" (viewing window)','Same number as the STEP gasket'],['1000-5845','DEFENDER VIEWING WINDOW 6" GLASS&GASKET','Glass with gasket']],
        acrylic:[['1000-5845','DEFENDER VIEWING WINDOW 6" GLASS&GASKET','Glass with gasket'],['1000-7560','DEFENDER VIEW WINDOW 6 ASY','Complete 6 in window assembly'],['1000-4731','DEFENDER VIEW WINDOW 6" GLASS ONLY (STEP)',notList]],
        window_cover:[['1000-7560','DEFENDER VIEW WINDOW 6 ASY','Complete 6 in window assembly'],['1000-4542','PLATE SIGHT GLASS COVER-COMPLETE (STEP)',notList]],
        window_hardware:[['1000-4456','STUD 3/8-16 X 3 T304 SS (STEP)','10 places with 1000-4469 nuts and washers. '+notList]]
      } },

    'sp-33': { label:'SP-33 Auto', size:'SP-33', b:SMALL, bolts:12, elements:732, elLen:48, filterSys:'SP-33-48-732',
      filter:[['1001-7418','DEFENDER3 SP-33 AUTO','Complete filter, standard davit'],['1003-8759','DEFENDER3 SP-33 AUTO - MIRRORED DAVIT','Mirrored davit variant'],['1002-2391','DEFENDER3 SP-33 AUTO - T316 INTERNALS','T316 internals variant'],['1001-8523','DEFENDER3 SP-33 AUTO REDUCED HEIGHT','Reduced height variant ("R")'],['1001-7257','LEG ASSY, EXTENSION','Leg extension (standard height)'],['1000-8906','FILTER DEFENDER SP-33-48-732','Filter system, 48 in elements'],['1002-2314','FILTER DEFENDER SP-33-48-732 T316 INTS','Filter system, T316 internals']],
      head:[[NEED,'Upper head SP-33 (STEP 1001-7417 UPPER HEAD W/SEAL RING SP-33)','No SP-33 upper head in the master product list'],[NEED,'Head-to-body hardware kit SP-33','Kits exist for SP-27 (1004-2391) and SP-41 (1004-2392) only']],
      gasket:[['1000-5787','DEFENDER HEAD GASKET 33" KIT','SP-33 kit (STEP part 1000-4207, O-ring)']],
      davit:[['1000-4633','DAVIT ASSEMBLY SP-33 (STEP)',notList],['1000-4757','JACK 6 TON (STEP)','With 1001-8539 jack hold down. '+notList],['1003-8759','DEFENDER3 SP-33 AUTO - MIRRORED DAVIT','Filter ordered with davit on the opposite side']],
      shaft:[['1000-4248','LIFT SHAFT, DEFENDER SP-33 AUTO T304','Shaft, T304'],['1002-4073','DEFENDER2 LIFT SHAFT 33" AUTO T316 1PC','Shaft, T316 one-piece'],['1002-4076','DEFENDER LIFTSHAFT KIT T304 SP-33','Kit, T304'],['1002-4081','DEFENDER LIFTSHAFT KIT T316 SP-33','Kit, T316']],
      tubesheet:[['1000-4659','TUBE SHEET KIT SP-33 T304','Tube sheet kit, T304'],[NEED,'Tube sheet assembly SP-33 laminated T316','No T316 SP-33 tube sheet in the master product list']],
      felt:[['1002-4124','DEFENDER FELT GASKET SP-33','Felt gasket']],
      intHw:[[NEED,'Internals hardware kit, T316, SP-33','No SP-33 internals hardware kit in the master product list']] },

    'sp-41': { label:'SP-41 Auto', size:'SP-41', b:MID, bolts:14, elements:1038, elLen:48, filterSys:'SP-41-48-1038',
      filter:[['1001-7344','DEFENDER3 SP-41 AUTO','Complete filter, standard davit'],['1002-5145','DEFENDER3 SP-41 AUTO - MIRRORED DAVIT','Mirrored davit variant'],['1002-2392','DEFENDER3 SP-41 AUTO - T316 INTERNALS','T316 internals variant'],['1001-8509','DEFENDER3 SP-41 AUTO REDUCED HEIGHT','Reduced height variant ("R")'],['1004-3998','DEFENDER3 SP-41 AUTO - REDUCED & SPLIT','Reduced height, split'],['1001-7257','LEG ASSY, EXTENSION','Leg extension (standard height)'],['1001-7314','SUMP DEF3 ASSY, SP-41 WELDMENT','Body weldment'],['1000-8909','FILTER DEFENDER SP-41-48-1038','Filter system, 48 in elements'],['1002-2315','FILTER DEFENDER SP-41-48-1038 T316 INTS','Filter system, T316 internals']],
      head:[[NEED,'Upper head SP-41 (STEP 1001-7319 UPPER HEAD W/SEAL RING SP-41)','No SP-41 upper head in the master product list'],['1004-2392','HARDWARE KIT SP-41 DEF2/DEF3 LID TO BODY','Head-to-body hardware kit']],
      gasket:[['1000-5788','DEFENDER HEAD GASKET 41" KIT','SP-41 kit (STEP part 1000-4208, 5/8 in O-ring)']],
      davit:[['1000-4634','DAVIT ASSEMBLY SP-41 (STEP)',notList],['1000-4757','JACK 6 TON (STEP)','With 1001-8539 jack hold down. '+notList],['1002-5145','DEFENDER3 SP-41 AUTO - MIRRORED DAVIT','Filter ordered with davit on the opposite side']],
      shaft:[['1001-7331','DEFENDER3 LIFT SHAFT 41" AUTO','Defender3 shaft'],['1000-4249','LIFT SHAFT, DEFENDER SP-39-43 AUTO T304','Shaft, T304'],['1002-4071','LIFT SHAFT, DEFENDER SP-39-43 AUTO T316','Shaft, T316'],['1002-4077','DEFENDER LIFTSHAFT KIT T304 SP-39-43','Kit, T304'],['1002-4082','DEFENDER LIFTSHAFT KIT T316 SP-39-43','Kit, T316']],
      tubesheet:[['1000-4658','TUBE SHEET ASSY, SP-41 LAMINATED','Laminated assembly'],[NEED,'Tube sheet kit SP-41 T304','No T304 SP-41 tube sheet kit in the master product list']],
      felt:[['1002-4125','DEFENDER FELT GASKET SP-41','Felt gasket']],
      intHw:[[NEED,'Internals hardware kit, T316, SP-41','No SP-41 internals hardware kit in the master product list']] },

    'sp-49': { label:'SP-49 Auto', size:'SP-49', b:MID, bolts:16, elements:1548, elLen:48, filterSys:'SP-49-48-1548', noNut:true,
      filter:[['1001-7285','DEFENDER3 SP-49 AUTO','Complete filter, standard davit'],[NEED,'DEFENDER3 SP-49 AUTO - MIRRORED DAVIT','Only the reduced-height mirrored version (1003-4748) is in the master product list'],['1002-2393','DEFENDER3 SP-49 AUTO - T316 INTERNALS','T316 internals variant'],['1001-8504','DEFENDER3 SP-49 AUTO REDUCED HEIGHT','Reduced height variant ("R")'],['1001-7257','LEG ASSY, EXTENSION','Leg extension (standard height)'],['1000-8912','FILTER DEFENDER SP-49-48-1548','Filter system, 48 in elements'],['1002-2316','FILTER DEFENDER SP-49-48-1548 T316 INTS','Filter system, T316 internals']],
      head:[['1000-4521','HEADUPPER W/SEAL RNG SP-49 COMP','Head with seal ring'],['1001-7279','UPPER HEAD W/SEAL RING SP-49 (STEP)',notList],[NEED,'Head-to-body hardware kit SP-49','Kits exist for SP-27 (1004-2391) and SP-41 (1004-2392) only']],
      gasket:[['1000-4209','DEFENDER HEAD GASKET 49" KIT','Same number as the STEP gasket (O-ring)']],
      davit:[['1000-4843','DAVIT ASSEMBLY SP-49 (STEP)',notList],['1000-4757','JACK 6 TON (STEP)','With 1001-8539 jack hold down. '+notList]],
      shaft:[['1001-7268','DEFENDER3 LIFT SHAFT 49" AUTO','Defender3 shaft'],['1000-4250','LIFT SHAFT, DEFENDER SP-47-50 AUTO T304','Shaft, T304'],['1002-4070','LIFT SHAFT, DEFENDER SP-47-50 AUTO T316','Shaft, T316'],['1002-4078','DEFENDER LIFTSHAFT KIT T304 SP-47-50','Kit, T304'],['1002-4083','DEFENDER LIFTSHAFT KIT T316 SP-47-50','Kit, T316']],
      tubesheet:[['1000-4657','TUBE SHEET KIT SP-49 T304','Tube sheet kit, T304'],[NEED,'Tube sheet assembly SP-49 laminated T316','No T316 SP-49 tube sheet in the master product list']],
      felt:[['1002-4126','DEFENDER FELT GASKET SP-49','Felt gasket']],
      intHw:[[NEED,'Internals hardware kit, T316, SP-49','No SP-49 internals hardware kit in the master product list']] }
  };
  // reduced-height variants: same parts, the "R" filter numbers first, no leg extension
  const R = (k, label, rows, mirr) => { const s=clone(SPEC[k]); s.label=label; s.rh=true; s.filter=rows;
    if(s.davit){ s.davit=s.davit.filter(r=>!/MIRRORED DAVIT/.test(r[1])); s.davit.push(mirr||[NEED,'DEFENDER3 '+s.size+' AUTO REDUCED HEIGHT - MIRRORED DAVIT','Not in the master product list']); }
    return s; };
  SPEC['sp-27r']=R('sp-27','SP-27 Auto Reduced Height',[['1001-8527','DEFENDER3 SP-27 AUTO REDUCED HEIGHT','Complete filter, reduced height'],['1000-8893','FILTER DEFENDER SP-27-48-487-R','Filter system, reduced height']]);
  SPEC['sp-33r']=R('sp-33','SP-33 Auto Reduced Height',[['1001-8523','DEFENDER3 SP-33 AUTO REDUCED HEIGHT','Complete filter, reduced height'],['1000-8908','FILTER DEFENDER SP-33-48-732-R','Filter system, reduced height'],[NEED,'DEFENDER3 SP-33 AUTO REDUCED HEIGHT - MIRRORED DAVIT','Not in the master product list']]);
  SPEC['sp-41r']=R('sp-41','SP-41 Auto Reduced Height',[['1001-8509','DEFENDER3 SP-41 AUTO REDUCED HEIGHT','Complete filter, reduced height'],['1002-8237','DEFENDER3 SP-41 AUTO REDUCED - MIRR DAV','Reduced height, mirrored davit'],['1003-4621','DEFENDER3 SP-41 AUTO REDUCED - T316 INT','Reduced height, T316 internals'],['1004-3998','DEFENDER3 SP-41 AUTO - REDUCED & SPLIT','Reduced height, split'],['1000-8911','FILTER DEFENDER SP-41-48-1038-R','Filter system, reduced height']]);
  SPEC['sp-49r']=R('sp-49','SP-49 Auto Reduced Height',[['1001-8504','DEFENDER3 SP-49 AUTO REDUCED HEIGHT','Complete filter, reduced height'],['1003-4748','DEFENDER3 SP-49 AUTO REDUCED - MIRR DAV','Reduced height, mirrored davit'],['1000-8914','FILTER DEFENDER SP-49-48-1548-R','Filter system, reduced height']]);
  SPEC['sp-41r'].davit[SPEC['sp-41r'].davit.length-1]=['1002-8237','DEFENDER3 SP-41 AUTO REDUCED - MIRR DAV','Filter ordered with davit on the opposite side'];
  SPEC['sp-49r'].davit[SPEC['sp-49r'].davit.length-1]=['1003-4748','DEFENDER3 SP-49 AUTO REDUCED - MIRR DAV','Filter ordered with davit on the opposite side'];

  function build(key, s){
    const P=clone(B), b=s.b, src=s.label+' STEP';
    const name=(s.def2?'Defender2 ':'Defender3 ')+s.label;
    P.body.desc=`The tank of the ${name.toUpperCase()} regenerative media filter. It carries the influent and effluent connections, the viewing window, the drain, the legs and the floor anchors. The head, tube sheet stack and bump assembly all mount to it.`;
    P.body.parts=s.filter; P.body.src='Master product list; '+src;
    P.upper_head.parts=s.head; P.upper_head.desc = s.def2
      ? 'Upper head with seal ring that closes the filter body. The bump assembly, the effluent and vacuum connections and the gauge panel bracket attach to it. It bolts to the body flange with 24 bolts over the head gasket and is lifted off with a hoist (no davit on the SP-29).'
      : `Flat top plate that closes the filter body. The bump assembly mounting flange, the effluent and vacuum connections and the gauge panel bracket attach to it, and the davit jack brace is welded to it. It is held to the body flange over the head gasket by ${s.bolts} 7/8 in x 7-1/2 in head bolts (1001-7251 on the STEP model).`;
    if(s.def2) P.upper_head.faq[0]=['What is the head bolt torque?','The flat-head three-stage torque (70 / 140 / 200 ft-lb) is for Defender3 flat heads. Use the SP-29 head bolt torque from the Defender IOM for this bolted head.'];
    P.upper_head.src='O&M Head Removal and Head Torque; master product list; '+src;
    P.head_gasket.parts=s.gasket; P.head_gasket.src='O&M Head Gasket; master product list; '+src;
    if(s.noDavit) delete P.davit;
    else { P.davit.parts=s.davit; P.davit.src='O&M Head Removal; '+src; }
    P.bump_gasket.desc='Neoprene flat gasket between the bump assembly mounting flange and the top of the head. It seals the bump assembly penetration where the lift shaft passes through the head.';
    P.bump_gasket.parts=[[b.bgasket[0],b.bgasket[1]+' (STEP)',notList],[b.bump[0],b.bump[1],'Gasket supplied with the bump assembly'],[b.bumpP[0],b.bumpP[1],'Painted variant']];
    P.bump_gasket.src='Master product list; '+src;
    P.bump_bushing.desc='HDPE bushing that guides the lift shaft through the head and carries the bushing O-rings. It is retained by the snap ring. The guide housing also carries the small brass ball valve and fittings shown on the model.';
    P.bump_bushing.parts=[[b.bushing[0],b.bushing[1],'Bushing'],[b.guide[0],b.guide[1],'Bushing guide assembly with retainer'],[b.guide2[0],b.guide2[1],'Lift shaft guide'],['1000-4820','VALVE, BALL 0.5" FPTxFPT BRS','Ball valve on the housing']];
    P.bushing_oring.parts=[[b.kit[0],b.kit[1],'Kit with bushing O-rings, lift shaft O-rings, bushing and snap ring'],[b.guide[0],b.guide[1],'Assembly including O-rings']];
    P.snap_ring.parts=[[b.snap[0],b.snap[1],'Snap ring'],[b.kit[0],b.kit[1],'Kit includes snap ring']];
    P.bump_tire.parts=[[b.tire[0],b.tire[1],'Tire with hardware'],[b.cover[0],b.cover[1],'Top cover'],[b.bump[0],b.bump[1],'Complete bump assembly'],[b.kit[0],b.kit[1],'Spare parts kit']];
    P.lift_shaft_nut.parts=[['1003-5583','HARDWARE KIT LIFTSHAFT RETAINING DEF','Retaining hardware kit'],[s.shaft.find(r=>/KIT T304/.test(r[1]))[0], s.shaft.find(r=>/KIT T304/.test(r[1]))[1],'Lift shaft kit (T304)'],[b.nut[0],b.nut[1]+' (STEP)',(s.noNut?'Not present in the '+s.label+' STEP model; size taken from the SP-41/SP-55 models. ':'')+notList]];
    P.lift_shaft.parts=s.shaft;
    P.lift_shaft.faq[1]= s.noDavit ? ['How is the head lifted clear of it?','With a hoist on the head lifting points: the SP-29 has no davit.'] : P.lift_shaft.faq[1];
    P.lift_shaft_oring.parts=[[b.lsor[0],b.lsor[1],'Lift shaft O-ring'],[b.kit[0],b.kit[1],'Kit includes lift shaft O-rings']];
    P.lift_shaft_hardware.parts=[['1003-5583','HARDWARE KIT LIFTSHAFT RETAINING DEF','Retaining hardware']].concat(s.intHw);
    P.tube_sheet.parts=s.tubesheet;
    if(s.noDavit) P.tube_sheet.faq[0]=['How do I get to it?','Lower it onto the internal rests with the bump jig, remove the bump assembly, unbolt the head and lift it off with a hoist.'];
    P.tube_elements.desc=`Flexible tube elements hanging from the tube sheet. Perlite media precoats their outer surface and does the filtering; bumping shakes the media loose so it can re-deposit. The ${s.filterSys} carries ${s.elements} elements ${s.elLen} in long.`;
    P.tube_elements.parts= s.elLen===36 ? [['1000-7552','DEFENDER TUBE ELEMENT 36 T316','36 in element (SP-29-36)']] : [['1000-4638','DEFENDER TUBE ELEMENT 48 T316','48 in element ('+s.filterSys+')']];
    P.felt_gasket.parts=s.felt;
    P.hold_down_plate.parts=[['1002-5817','HOLD DOWN PLATE HARDWARE WASHER & BOLT','Plate hardware']].concat(s.tubesheet.filter(r=>r[0]!==NEED).slice(0,1).map(r=>[r[0],r[1],'Tube sheet kit or assembly']));
    P.hold_down_plate.faq=[['Are the plates sold separately?','Not as a separate line in the master product list; they come with the tube sheet kit or assembly. Ask NBTS for the plate by drawing number if only the plates are needed.']];
    P.tube_sheet_hardware.parts=[['1002-5817','HOLD DOWN PLATE HARDWARE WASHER & BOLT','Washer and bolt set']].concat(s.intHw);
    const W=s.window||DEF3_WINDOW;
    for(const k of Object.keys(W)) P[k].parts=W[k];
    if(s.window){
      P.window_gasket.desc='Gasket between the 6 in glass and the sight glass boss on the SP-29.';
      P.acrylic.desc='6 in sight glass on the side of the SP-29 that lets the operator watch the water level and precoat.';
      P.window_cover.desc='Bolted sight glass cover plate that clamps the glass and gasket to the boss.';
      P.window_hardware.desc='Ten 3/8-16 studs with nuts and washers that hold the sight glass cover plate.';
    }
    for(const k of ['window_gasket','acrylic','window_cover','window_hardware']) P[k].src='Master product list; '+src;
    for(const v of Object.values(P)) v.src=v.src.replace(/SP-55 Auto STEP/g, src);
    return {key, label:s.label, name, bin:'/assets/sp55-exploded/models/'+key+'.bin', parts:P, internalsShown:false};
  }

  const M = {};
  M['sp-55']={key:'sp-55', label:'SP-55 Auto', name:'Defender3 SP-55 Auto', bin:'/assets/sp55-exploded/sp55-model.bin', parts:B, internalsShown:true};
  const p55r=clone(B);
  p55r.body.parts=[['1001-8499','DEFENDER3 SP-55 AUTO REDUCED HEIGHT','Complete filter, reduced height'],[NEED,'DEFENDER3 SP-55 AUTO REDUCED HEIGHT - MIRRORED DAVIT','Not in the master product list'],['1000-8916','FILTER DEFENDER SP-55-48-2076-R','Filter system, reduced height']];
  p55r.davit.parts=p55r.davit.parts.filter(r=>!/MIRRORED DAVIT/.test(r[1])).concat([[NEED,'DEFENDER3 SP-55 AUTO REDUCED HEIGHT - MIRRORED DAVIT','Not in the master product list']]);
  p55r.body.desc=p55r.body.desc.replace('SP-55 AUTO','SP-55 AUTO REDUCED HEIGHT');
  for(const v of Object.values(p55r)) v.src=v.src.replace(/SP-55 Auto STEP/g,'SP-55 Auto Reduced Height STEP');
  p55r.tube_elements.desc=p55r.tube_elements.desc.replace(/ Shown as .*$/,'');
  M['sp-55r']={key:'sp-55r', label:'SP-55 Auto Reduced Height', name:'Defender3 SP-55 Auto Reduced Height', bin:'/assets/sp55-exploded/models/sp-55r.bin', parts:p55r, internalsShown:false};
  for(const k of ['sp-49','sp-49r','sp-41','sp-41r','sp-33','sp-33r','sp-29','sp-27','sp-27r']) M[k]=build(k, SPEC[k]);

  // explode settings per model: davit post axis (x,z) in mm from the STEP model, head lift and swing
  const RIG = {
    'sp-55':{post:[-519,620], lift:420, swing:2.72}, 'sp-55r':{post:[-519,619], lift:420, swing:2.72},
    'sp-49':{post:[-508,508], lift:420, swing:2.72}, 'sp-49r':{post:[-507,507], lift:420, swing:2.72},
    'sp-41':{post:[-482,384], lift:400, swing:2.72}, 'sp-41r':{post:[-482,384], lift:400, swing:2.72},
    'sp-33':{post:[-269,431], lift:380, swing:2.72}, 'sp-33r':{post:[-269,431], lift:380, swing:2.72},
    'sp-27':{post:[-258,312], lift:360, swing:2.72}, 'sp-27r':{post:[-258,312], lift:360, swing:2.72},
    'sp-29':{post:[0,0], lift:650, swing:0}
  };
  for(const k in M) Object.assign(M[k], RIG[k]);
  window.DEFENDER_MODELS = M;
  window.DEFENDER_MODEL_ORDER = ['sp-27','sp-27r','sp-29','sp-33','sp-33r','sp-41','sp-41r','sp-49','sp-49r','sp-55','sp-55r'];
})();
