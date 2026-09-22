// Part information for the Defender3 SP-55 Auto exploded view.
// Part numbers: NBTS master product list (Parts Lookup). Descriptions and FAQ: Defender O&M (RMF 11, 4/30/2019),
// Felt Gasket Replacement Technical Bulletin AQ-TB-070921-R1, Bump Assembly Kit sheet 12848, SP-55 Auto STEP assembly.
window.SP55_PARTS = {
  body: {
    title: 'Filter body',
    desc: 'The tank of the DEFENDER3 SP-55 AUTO regenerative media filter. It carries the influent and effluent connections, the viewing window, the drain, the legs and the floor anchors. The head, tube sheet stack and bump assembly all mount to it.',
    parts: [
      ['1001-7256', 'DEFENDER3 SP-55 AUTO', 'Complete filter, standard davit'],
      ['1002-2874', 'DEFENDER3 SP-55 AUTO - MIRRORED DAVIT', 'Mirrored davit variant'],
      ['1001-8499', 'DEFENDER3 SP-55 AUTO REDUCED HEIGHT', 'Reduced height variant ("R")'],
      ['1000-4536', 'LEG EXTENSION ASY SP-55', 'Leg extension'],
      ['1000-8915', 'FILTER DEFENDER SP-55-48-2076', 'Filter system, 48 in elements'],
    ],
    faq: [
      ['Does the filter need to be anchored before service?', 'Yes. Mounting anchors must be installed per the manufacturer instructions before attempting to lift the filter head. Anchor bolts are tightened to 120 ft-lb.'],
      ['Can the tank be laid horizontal for access?', 'Only with the bump mechanism pressurized to at least 75 psi first, and it must be returned to vertical as soon as possible. An unpressurized bump can damage the lift shaft.'],
      ['What are the operating limits?', 'Working pressure 50 psi, maximum differential pressure 15 psi, filter rate 0.5 to 2 gpm/sq ft, water temperature 4 to 48 C, pH 7.2 to 7.8.'],
    ],
    src: 'O&M installation, operating limits; master product list'
  },
  upper_head: {
    title: 'Upper head',
    desc: 'Flat top plate that closes the filter body. The bump assembly mounting flange, the effluent and vacuum connections and the gauge panel bracket attach to it, and the davit jack brace is welded to it. The head bolts to the body flange over the head gasket.',
    parts: [
      ['1003-3894', 'HEAD UPPER SP-55 PAINTED AND LINED', 'Replacement head'],
      ['1001-7191', 'Head weldment (STEP 70451 - Head)', 'From SP-55 Auto model'],
      ['1001-7251', 'Head-to-body bolt set (STEP)', '18 places, with 70358 / 70363 / 1000-4278 hardware'],
    ],
    faq: [
      ['What is the head bolt torque?', 'Head bolts are tightened in three stages: 70 ft-lb, then 140 ft-lb, then 200 ft-lb, in the standard bolt pattern (flat head models including SP-55-48-2076).'],
      ['What has to happen before the head comes off?', 'Bump and drain the filter, isolate air and power, disconnect the effluent and vacuum piping and the gauge panel tubing, lower the tube sheet onto its internal rests with the bump jig, then remove the bump assembly and the head bolts.'],
      ['Does the head gasket get reused?', 'No. The head gasket is replaced after every upper head removal.'],
    ],
    src: 'O&M Head Removal and Head Torque (p. 62-64)'
  },
  head_gasket: {
    title: 'Head gasket',
    desc: 'O-ring style gasket seated in the body flange that seals the upper head to the filter body. It is a single-use seal: a new gasket goes in every time the head is lifted.',
    parts: [
      ['1000-5790', 'DEFENDER HEAD GASKET 55" KIT', 'SP-55 kit'],
      ['1000-5795', 'DEFENDER HEAD GASKET 60" FLAT', 'Confirm against tank flange before ordering'],
      ['1000-5958', 'DEFENDER HEAD GASKET 60" 3/8" CHORD', 'Confirm against tank flange before ordering'],
    ],
    faq: [
      ['When is it replaced?', 'After every upper head removal, to guarantee a proper seal.'],
      ['Should I have one on hand before starting head work?', 'Yes. The O&M head removal procedure starts with "Be sure to have a new head gasket before performing this."'],
    ],
    src: 'O&M Head Gasket (p. 62); master product list'
  },
  davit: {
    title: 'Davit',
    desc: 'Tank-mounted jack attached to a structural steel brace welded to the head. It raises the head just clear of the lift shaft and lets it swing aside so the tube sheet, elements and bump assembly can be serviced without a hoist. Supplied on all Defender models except SP-18 and SP-29.',
    parts: [
      ['1000-4844', 'Davit assembly (STEP 70771)', 'Arm, post and hardware'],
      ['70043 / 70785', 'Jack and jack hold down (STEP)', 'Not listed separately in the master product list'],
      ['1002-2874', 'DEFENDER3 SP-55 AUTO - MIRRORED DAVIT', 'Filter ordered with davit on the opposite side'],
    ],
    faq: [
      ['Does the davit need maintenance?', 'Because it is used so rarely, lubricating grease must be applied to the davit before each operation.'],
      ['Is it safe to lift the head with the davit?', 'Only when the filter is anchored to the floor per manufacturer specifications. Keep clear of the head when lowering (pinch hazard).'],
      ['Which models do not have one?', 'SP-18 and SP-29 and older domed-head filters use lifting lugs, padeye lugs or eye nuts with a hoist instead.'],
    ],
    src: 'O&M Head Removal (p. 62-63); Felt Gasket TB'
  },
  bump_gasket: {
    title: 'Bump gasket',
    desc: 'Neoprene flat gasket between the bump assembly mounting flange and the top of the head. It seals the bump assembly penetration where the lift shaft passes through the head.',
    parts: [
      ['1000-1452', 'BUMP ASSY, AUTO SP-55', 'Gasket supplied with the bump assembly (STEP 70081 Neoprene Gasket)'],
      ['1003-3777', 'BUMP ASSY, AUTO SP-55 PAINTED', 'Painted variant'],
    ],
    faq: [
      ['Is the gasket sold on its own?', 'It is not a separate line in the master product list. Order it with the bump assembly or ask NBTS for the gasket by drawing number.'],
    ],
    src: 'SP-55 Auto STEP; master product list'
  },
  bump_bushing: {
    title: 'Bump bushing',
    desc: 'HDPE bushing that guides the lift shaft through the head and carries the bushing O-rings. It is retained by the snap ring. On the SP-55 the bushing housing also carries the small brass ball valve and bracket shown on the model.',
    parts: [
      ['1000-4726', 'BUSHING, DEFENDER LIFT SHAFT SP-41-55', 'Bushing'],
      ['1000-1451', 'GUIDE ASSY, LIFT SHAFT W/ RETAINER SP-55', 'Bushing guide assembly with retainer'],
      ['1000-4820', 'VALVE, BALL 0.5" FPTxFPT BRS', 'Ball valve on the housing (STEP)'],
    ],
    faq: [
      ['How often is it inspected?', 'At the five-year maintenance: check the bump bushing for wear and replace if necessary, along with the two bushing O-rings, three lift shaft O-rings, snap ring and bump tire.'],
    ],
    src: 'O&M Bump Assembly and Five-Year Maintenance (p. 65-66)'
  },
  bushing_oring: {
    title: 'Bushing O-ring',
    desc: 'Two O-rings that seal the bump bushing in the head. They are inspected with the rest of the bump assembly at the five-year maintenance.',
    parts: [
      ['1000-5807', 'DEFENDER BUMP ASSY SPARE PARTS KIT 39-60', 'Kit with bushing O-rings, lift shaft O-rings, bushing and snap ring'],
      ['1000-1451', 'GUIDE ASSY, LIFT SHAFT W/ RETAINER SP-55', 'Assembly including O-rings'],
    ],
    faq: [
      ['How many are there?', 'Two bushing O-rings per bump assembly, plus three lift shaft O-rings.'],
      ['Anything else needed when replacing them?', 'O-ring lubricant is sold with the bump kits (12851 on the SP-24 to 36 kit sheet).'],
    ],
    src: 'O&M Five-Year Maintenance; Bump Assembly Kit sheet 12848'
  },
  snap_ring: {
    title: 'Snap ring',
    desc: 'Retaining ring that holds the bump bushing in the head. Removed with straight-tip snap ring pliers when the bushing or O-rings are serviced.',
    parts: [
      ['1000-4733', 'SNAP RING, DEFENDER SP-41/55', 'Snap ring'],
      ['1000-5807', 'DEFENDER BUMP ASSY SPARE PARTS KIT 39-60', 'Kit includes snap ring'],
    ],
    faq: [
      ['What tool is needed?', 'Straight-tip snap ring pliers (12850 on the bump kit sheet).'],
      ['When is it inspected?', 'At the five-year maintenance with the rest of the bump assembly.'],
    ],
    src: 'O&M Five-Year Maintenance; Bump Assembly Kit sheet 12848'
  },
  bump_tire: {
    title: 'Bump tire',
    desc: 'Air spring on top of the bump assembly. Cycling air into and out of the tire raises and drops the lift shaft and tube sheet, which knocks the perlite media off the tube elements to regenerate the filter. The controller inflates it automatically on power-up.',
    parts: [
      ['1000-4724', 'DEFENDER BUMP TIRE W/HW SP-55', 'Tire with hardware'],
      ['1000-4624', 'COVER, AIR SPRING BUMP ASSY SP-55 AUTO', 'Top cover'],
      ['1000-1452', 'BUMP ASSY, AUTO SP-55', 'Complete bump assembly'],
      ['1000-5807', 'DEFENDER BUMP ASSY SPARE PARTS KIT 39-60', 'Spare parts kit'],
    ],
    faq: [
      ['What pressure does it run at?', 'The filter regulator is set to 90 psi. Before moving or tilting the filter the bump must be pressurized (70 to 90 psi; minimum 75 psi before tilting) or the lift shaft can be damaged.'],
      ['The tire is flat after a shutdown. Is that a fault?', 'Not necessarily. When the control panel is re-energized and reboots, the bump tire should reinflate automatically. Then bump manually 5 to 6 times to verify operation.'],
      ['How often is it inspected?', 'At the five-year maintenance.'],
    ],
    src: 'O&M installation notes, Bump Assembly (p. 65-66); Felt Gasket TB step 15'
  },
  lift_shaft_nut: {
    title: 'Lift shaft nut',
    desc: 'Large hex nut on top of the bump assembly that holds the tube sheet lift shaft to the bump mechanism. Unthreading it (with the bump jig fitted) lets the tube sheet be lowered onto its internal rests for service.',
    parts: [
      ['1003-5583', 'HARDWARE KIT LIFTSHAFT RETAINING DEF', 'Retaining hardware kit'],
      ['1002-4079', 'DEFENDER LIFTSHAFT KIT T304 SP-55', 'Lift shaft kit (T304)'],
      ['1000-4475', 'Lift shaft nut (STEP)', 'From SP-55 Auto model'],
    ],
    faq: [
      ['What holds the tube sheet up while the nut is off?', 'The bump jig: a threaded rod screwed into the lift shaft with double nuts, used to lower and raise the tube sheet in a controlled way.'],
      ['How is alignment checked on reassembly?', 'Before tightening the head bolts, look down the middle of the bump assembly to confirm the shaft head is centred in it.'],
    ],
    src: 'O&M Head Removal steps 17-21; Felt Gasket TB steps 13-14'
  },
  lift_shaft: {
    title: 'Lift shaft',
    desc: 'Stainless steel shaft fixed to the centre hub of the tube sheet. It passes up through the bump bushing in the head and is held by the lift shaft nut, so the bump tire lifts and drops the whole tube sheet with it.',
    parts: [
      ['1000-4251', 'LIFT SHAFT, DEFENDER SP-55 AUTO T304', 'Shaft'],
      ['1002-4079', 'DEFENDER LIFTSHAFT KIT T304 SP-55', 'Kit, T304'],
      ['1002-4084', 'DEFENDER LIFTSHAFT KIT T316 SP-55', 'Kit, T316'],
    ],
    faq: [
      ['How can the lift shaft get damaged?', 'By tilting or laying the tank horizontal without the bump mechanism pressurized to at least 75 psi.'],
      ['How is the head lifted clear of it?', 'With the davit jack: jack the head up until it clears the lift shaft, then swing it aside.'],
    ],
    src: 'O&M installation notes and Head Removal'
  },
  lift_shaft_oring: {
    title: 'Lift shaft O-ring',
    desc: 'Three O-rings that seal the lift shaft where it runs through the bump bushing. Inspected at the five-year maintenance.',
    parts: [
      ['1000-4728', 'O-RING, DEFENDER LIFT SHAFT SP-39-55', 'Lift shaft O-ring'],
      ['1000-5807', 'DEFENDER BUMP ASSY SPARE PARTS KIT 39-60', 'Kit includes lift shaft O-rings'],
    ],
    faq: [
      ['How many per filter?', 'Three.'],
    ],
    src: 'O&M Bump Assembly and Five-Year Maintenance'
  },
  lift_shaft_hardware: {
    title: 'Lift shaft hardware',
    desc: 'Hex bolt with lock washer and flat washers threaded into the top of the lift shaft. It comes off first during head removal so the bump jig rod can be threaded into the shaft.',
    parts: [
      ['1003-5583', 'HARDWARE KIT LIFTSHAFT RETAINING DEF', 'Retaining hardware'],
      ['1003-8321', 'HARDWARE KIT - SP-55 INTERNALS - T316', 'Internals hardware, T316'],
    ],
    faq: [
      ['Order of operations?', 'Remove the hex bolt and washers, assemble the bump jig into the lift shaft, unthread the lift shaft nut, then lower the tube sheet.'],
    ],
    src: 'O&M Head Removal steps 17-21'
  },
  tube_sheet: {
    title: 'Tube sheet plate',
    desc: 'Perforated plate with a centre hub and radial ribs that carries every flexible tube element. It hangs from the lift shaft and is bumped up and down to regenerate the media. For service it is lowered onto internal rests inside the tank.',
    parts: [
      ['1000-4656', 'TUBE SHEET SP-55 KIT T304', 'Tube sheet kit, T304'],
      ['1003-8320', 'TUBE SHEET ASSY, SP-55 LAMINATED T316', 'Laminated assembly, T316'],
    ],
    faq: [
      ['How do I get to it?', 'Lower it onto the internal rests with the bump jig, remove the bump assembly and the head, then lift the head clear with the davit.'],
      ['Can it be rotated for cleaning without removing the head?', 'Yes. Through the viewing window, grab several tubes and pull radially to rotate the tube sheet and reach the rest of the elements.'],
    ],
    src: 'O&M Flexible Tube Element Wash Procedure and Head Removal'
  },
  tube_elements: {
    title: 'Tube elements',
    desc: 'Flexible tube elements hanging from the tube sheet. Perlite media precoats their outer surface and does the filtering; bumping shakes the media loose so it can re-deposit. The SP-55-48-2076 carries 2076 elements 48 in long. Shown as 690 modeled tubes in this view.',
    parts: [
      ['1000-4638', 'DEFENDER TUBE ELEMENT 48 T316', '48 in element (SP-55-48-2076)'],
      ['1000-7552', 'DEFENDER TUBE ELEMENT 36 T316', '36 in element (SP-55-36-2076)'],
    ],
    faq: [
      ['How often should the tubes be washed?', 'Indoor competition, lap and dive pools once annually; outdoor pools at end of season (up to 4 months), middle and end of season (up to 9 months), or three times a year for year-round operation.'],
      ['How are they washed?', 'Drain and rinse, shut off the RMF breaker, remove the viewing window, rinse the tubes with a fan-pattern power washer or straight hose nozzle, rotate the tube sheet to reach all elements, then refit the window and vacuum transfer the media back in. A chemical filter cleaner can follow if needed.'],
      ['When are they replaced?', 'Inspect at ten years. Damaged tubes found during any felt gasket or tube sheet work should be replaced before reassembly.'],
    ],
    src: 'O&M Flexible Tube Element Cleaning, Ten-Year Maintenance; Felt Gasket TB'
  },
  felt_gasket: {
    title: 'Felt gasket',
    desc: 'Felt sheet between the tube sheet and the hold down plates. It cushions the element tops and seals them against the plate so media cannot bypass the tubes.',
    parts: [
      ['1002-4127', 'DEFENDER FELT GASKET SP-55', 'Felt gasket'],
    ],
    faq: [
      ['How is it replaced?', 'Technical Bulletin AQ-TB-070921-R1: bump and drain, isolate air and power, lower the tube sheet with the bump jig, unbolt the head and raise it with the davit, remove the hold down plates, pull the tube elements by hand, swap the felt gasket, inspect and refit the elements, refit the plates, lower the head, torque the bolts, pull the tube sheet back up and refit the nut, then reinflate the bump and precoat.'],
      ['Any tip before starting?', 'If the tubes are caked, do a tube wash first. Clean elements are far easier to pull from the tube sheet.'],
    ],
    src: 'Felt Gasket Replacement TB AQ-TB-070921-R1'
  },
  hold_down_plate: {
    title: 'Hold down plate',
    desc: 'Perforated plates in six sectors that bolt down over the felt gasket and clamp the tops of the tube elements into the tube sheet. They come off to release the elements.',
    parts: [
      ['1002-5817', 'HOLD DOWN PLATE HARDWARE WASHER & BOLT', 'Plate hardware'],
      ['1003-8320', 'TUBE SHEET ASSY, SP-55 LAMINATED T316', 'Assembly including plates'],
    ],
    faq: [
      ['Are the plates sold separately for the SP-55?', 'Not as a separate line in the master product list; they are part of the tube sheet assembly. Ask NBTS for the plate by drawing number if only the plates are needed.'],
    ],
    src: 'Felt Gasket TB steps 7 and 11; master product list'
  },
  tube_sheet_hardware: {
    title: 'Tube sheet hardware',
    desc: 'Bolts and washers that fasten the hold down plates to the tube sheet.',
    parts: [
      ['1002-5817', 'HOLD DOWN PLATE HARDWARE WASHER & BOLT', 'Washer and bolt set'],
      ['1003-8321', 'HARDWARE KIT - SP-55 INTERNALS - T316', 'Full internals hardware kit, T316'],
    ],
    faq: [
      ['Which material?', 'Match the internals: T304 tube sheet kits use the standard hardware; T316 internals use the T316 kit.'],
    ],
    src: 'Master product list'
  },
  window_gasket: {
    title: 'Viewing window gasket',
    desc: 'Flat gasket between the acrylic window and the tank nozzle flange.',
    parts: [
      ['1000-1797', 'DEFENDER GASKET 14" OD X 11.92" ID', 'Window gasket'],
      ['1004-3514', 'DEFENDER VIEWING WINDOW 14" GLASS&GASKET', 'Acrylic with gasket'],
    ],
    faq: [
      ['Do I need a new gasket every time the window comes off?', 'The O&M does not call for routine replacement. Inspect it each time the window is removed for a tube wash and replace it if it is compressed, cut or leaking (general guidance).'],
    ],
    src: 'Master product list; general guidance'
  },
  acrylic: {
    title: 'Acrylic',
    desc: 'Clear acrylic disc that lets the operator watch the water level and precoat through the side of the tank. The O&M uses it as the reference point during drain and rinse ("wait a couple of seconds after the water passes the viewing window").',
    parts: [
      ['1004-3514', 'DEFENDER VIEWING WINDOW 14" GLASS&GASKET', 'Acrylic with gasket'],
    ],
    faq: [
      ['Where does it come into the procedures?', 'During drain and rinse: run the pump until water passes the viewing window, wait a few seconds, then stop. During head removal: press Cycle Start, wait 4 to 5 seconds after water fills past the window, then Cycle Stop.'],
    ],
    src: 'O&M drain and rinse and Head Removal procedures; master product list'
  },
  window_cover: {
    title: 'Viewing window cover',
    desc: 'Bolted steel ring with two handles that clamps the acrylic and gasket to the tank nozzle. Removed for the flexible tube element wash procedure.',
    parts: [
      ['1001-5724', 'VIEWING WINDOW ASSY, COVER W/HANDLES', 'Cover with handles'],
      ['1004-2849', 'VIEW WINDOW COVER & HANDLES 12" PAINT BLUE', '12 in painted variant'],
    ],
    faq: [
      ['Why remove it?', 'It is the access point for washing the tube elements in place and for rotating the tube sheet by hand.'],
    ],
    src: 'O&M Flexible Tube Element Wash Procedure'
  },
  window_hardware: {
    title: 'Window hardware',
    desc: 'Twelve 7/8-9 UNC x 4.5 in heavy hex bolts with nuts and washers that hold the viewing window cover to the nozzle flange.',
    parts: [
      ['1001-9590', 'Heavy hex bolt 7/8-9 UNC x 4.5 (STEP)', '12 places with 70358 / 70363 / 1000-4278 nuts and washers'],
    ],
    faq: [
      ['Is there a torque spec?', 'The O&M gives no window-specific torque; use standard bolt pattern and torque recommendations for the bolt size.'],
    ],
    src: 'SP-55 Auto STEP; O&M'
  }
};
