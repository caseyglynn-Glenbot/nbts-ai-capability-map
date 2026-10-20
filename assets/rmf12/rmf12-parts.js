// Part information for the Defender RMF 12 main control enclosure (MCE) model.
// Sources: Evoqua / Neptune Benson drawing set 20807800 (electrical schematic r3), 20807850 r9 (enclosure assembly),
// 20807851 r3 (backpanel wired), 20807852 r3 (interior label), 20807853 r1 (enclosure with holes),
// 20807854 r1 (terminal layout), 20807860 r0 (vacuum transfer junction box).
window.RMF12_PARTS = {
  door: {
    title: 'Cover (door)', tag: 'Enclosure cover',
    desc: 'Hinged FRP cover of the main control enclosure, hinged on the left with two latches on the right and a captive screw at each corner. It carries the Defender RMF overlay on the front, the HMI through a 197 x 141 mm cutout, and the UL and rating labels on the inside.',
    parts: [
      ['W2T893091', 'Label, Defender D7 overlay RMF12', 'Item 24, front of cover'],
      ['W2T837187', 'Label, Defender D7 UL E476304', 'Item 25, inside of cover'],
      ['W3T477963', 'MCE enclosure interior label', '20807852: rating label, CE nameplate, QR label'],
    ],
    notes: [
      ['What is on the inside of the cover?', 'UL legends A to D (Evoqua Water Technologies, Holland MI, UL Type 1 / NEMA 4, keep a complete schematic with this enclosure), the interior rating label and the UL E476304 label (assembly note 1).'],
      ['What does the rating label say?', '120/230 VAC 1PH 60/50 Hz, total FLA 15/10 A, largest motor 0.5 HP, SCCR 5 kA, drawing set 20807800.'],
    ],
    src: '20807850 r9, 20807852 r3, 20807853 r1'
  },
  hmi: {
    title: 'HMI, TP700 Comfort', tag: 'HMI122',
    desc: 'Siemens SIMATIC HMI TP700 Comfort, 7 in touch panel, mounted through the cover. Runs on 24 VDC from the panel supply and talks to the PLC over Ethernet through the switch.',
    parts: [
      ['W2T547245', 'Monitor, TCS TP700 Comfort 7 in 24 VDC', 'Siemens 6AV2124-0GC01-0AX0'],
      ['W2T898034', 'Memory, flash SD card 32 GB class 3', 'Item 30'],
      ['W2T828226', 'Cable, CAT6 shielded patch 3 ft blue', 'Item 12, HMI to switch port 1'],
    ],
    notes: [
      ['What is the HMI IP address?', '192.168.1.11 on the schematic (line 123). The PLC is 192.168.1.10.'],
      ['How high should the enclosure be mounted?', 'So the centre of the HMI screen is 60 in above where the operator stands (assembly note 4).'],
      ['What does it draw?', '0.5 FLA at 24 VDC (schematic line 122).'],
    ],
    src: '20807850 r9, 20807801 r3'
  },
  enclosure: {
    title: 'Enclosure, 16 x 14 x 8 FRP', tag: 'MCE',
    desc: 'Wall mount fibreglass enclosure, NEMA 4X, UL 508A, indoors. Machined with a PG16 and a PG21 entry in the bottom, the manifold screw holes, and a 7/8 in hole in the left wall for the 90 degree liquid tight fitting.',
    parts: [
      ['W2T881939', 'Enclosure, wall mount 16x14x8 FRP 4/4X', 'Raw enclosure'],
      ['W3T477962', 'MCE enclosure with holes', '20807853'],
      ['-', 'Mounting brackets (4) and screws (4)', 'Bagged inside the panel, assembly note 2'],
    ],
    notes: [
      ['What are the design limits?', '40 to 104 F, indoors, NEMA 4X, UL 508A (20807800 enclosure design parameters).'],
      ['Where are the entries?', 'Bottom: PG16 7/8 in at 2 in from the left side and PG21 1-1/8 in at 2-1/4 in from the right side, both 5-13/16 in from the back. Left wall: 7/8 in at 2 in from the back and 3 in from the top.'],
    ],
    src: '20807853 r1, 20807800 r3'
  },
  backpanel: {
    title: 'Backpanel', tag: 'Back panel wired',
    desc: 'The 12-3/4 x 14-3/4 in backpanel that carries every device, rail and duct. It ships wired as one assembly.',
    parts: [
      ['W3T477967', 'MCE back panel wired', '20807851'],
      ['W3T486007', 'Back panel, D7 RMF12', 'Item 2 on 20807851'],
    ],
    notes: [['Where is the wiring diagram?', 'Panel wiring follows electrical schematic set 20807800 (sheets 1 to 4).']],
    src: '20807851 r3'
  },
  din_rails: {
    title: 'DIN rails', tag: '35 mm',
    desc: 'Five 35 mm top hat rails: a short vertical rail for the switch, the contactor rail, the PLC rail, the power supply rail and the full width terminal rail. Revision 3 added two 1 in standoffs, shown here under the PLC rail where the drawing balloons them.',
    parts: [
      ['W2T233876', 'Rail, mounting DIN 35 mm (36 in)', 'Cut to length'],
      ['W2T394088', 'Spacer, standoff 1 x 0.5 in round, unthreaded (2)', 'Item 29, added rev 3'],
      ['W2T236173', 'Rail, DIN standoff angle', 'Item 12'],
    ],
    notes: [],
    src: '20807851 r3'
  },
  end_anchors: {
    title: 'End anchors', tag: 'Item 20',
    desc: 'Clamp style end stops that hold the devices and terminal strips in place on each rail. 11 in total.',
    parts: [['W2T236277', 'Terminal end anchor (11)', '']],
    notes: [], src: '20807851 r3'
  },
  wire_duct: {
    title: 'Wire duct and covers', tag: 'Items 13, 14',
    desc: 'Slotted 1 x 3 in grey wiring duct along the top, the left side and across the middle of the panel, with snap-on covers.',
    parts: [['W2T408622', 'Duct, wiring open slot 1 W x 3 H grey', ''], ['W2T236459', 'Duct, wiring cover 1 in wide grey', '']],
    notes: [], src: '20807851 r3'
  },
  switch: {
    title: 'Ethernet switch', tag: 'ETH126',
    desc: 'Siemens SCALANCE XB005 unmanaged 5 port switch on its own vertical rail. Port 1 goes to the HMI and port 2 to the PLC.',
    parts: [['W2T438662', 'Switch, network unmanaged TCP/IP 5 port', 'Siemens 6GK5005-0BA00-1AB2'], ['W2T828226', 'Cable, CAT6 shielded patch 3 ft blue', 'Item 24, switch port 2 to PLC']],
    notes: [['What does it draw?', '0.07 FLA at 24 VDC (schematic line 125).'], ['Which port is which?', 'Port 1 to the HMI (ENET2), port 2 to the PLC (ENET1), schematic lines 126 to 128.']],
    src: '20807851 r3, 20807801 r3'
  },
  contactor: {
    title: 'Vacuum pump contactor', tag: 'M311',
    desc: 'Siemens SIRIUS 3RT2017 S00 contactor with a 24 VDC coil. It switches the media vacuum motor M1 through the vacuum transfer junction box. The PLC turns the coil on from PLC302 Q0.8.',
    parts: [['W2T829078', 'Contactor, S00 1NO 24 VDC coil 3 pole 7.5 HP', 'Siemens 3RT2017-2BB41']],
    notes: [
      ['How is the motor wired?', 'L1 into 1L1, #12 AWG jumpers 2T1 to 3L2 and 4T2 to 5L3, motor out on 6T3 to T1, return on T2 to neutral (schematic lines 103 to 105).'],
      ['Does the motor have overload protection?', 'No. The schematic notes the media vacuum motor is not overload protected. M1 is 0.5 HP, 9.0 FLA at 120 VAC or 4.8 FLA at 230 VAC.'],
    ],
    src: '20807801 r3, 20807803 r3'
  },
  psu: {
    title: '24 VDC power supply', tag: 'PS109',
    desc: 'Siemens SITOP PSU100S, 120/230 VAC in, 24 VDC 2.5 A out. Feeds the 24+ and COM buses for the HMI, switch, PLC I/O, valves and transmitters. Keep 2 in of ventilation clearance below it.',
    parts: [['W2T228955', 'Power supply, SITOP 24 VDC 2.5 A', 'Siemens 6EP1332-2BA20 (rev 2, was W2T817300)']],
    notes: [['What does it draw?', '1.1 FLA at 120 VAC, 0.7 FLA at 230 VAC (schematic line 108).'], ['What feeds it?', 'L1 through CB114, the same branch as the PLC.']],
    src: '20807851 r3, 20807801 r3'
  },
  plc_cpu: {
    title: 'PLC CPU 1212C', tag: 'PLC114',
    desc: 'Siemens S7-1200 CPU 1212C AC/DC/relay, rack 1 slot 1. Its eight digital inputs take pump running, remote start and stop, air pressure OK and UV healthy. Six relay outputs fire the filter valves.',
    parts: [['W2T814540', 'SIMATIC S7-1200 CPU 1212C, ver 4', 'Siemens 6ES7212-1BE40-0XB0'], ['W2T857862', 'PLC S7-1x00 CPU memory card 4 MB', 'Item 6']],
    notes: [
      ['What are the inputs?', 'I0.0 P-01 recirculating pump running, I0.1 remote filter start (NO), I0.2 remote filter stop (NO), I0.3 valve manifold air pressure OK, I0.4 UV healthy, I0.5 to I0.7 spare, AI0 and AI1 spare.'],
      ['What are the outputs?', 'Q0.0 FV-01 bump, Q0.1 FV-02 regen precoat, Q0.2 FV-03 effluent, Q0.3 FV-04 drain/purge (optional), Q0.4 FV-05 precoat vent (optional), Q0.5 FV-06 UV screen (optional).'],
      ['What is the PLC IP address?', '192.168.1.10 (schematic line 114).'],
    ],
    src: '20807801 r3, 20807802 r3'
  },
  plc_dq: {
    title: 'Relay output module', tag: 'PLC302',
    desc: 'Siemens SM 1222, 8 changeover relay outputs, rack 1 slot 2. Dry contacts for the recirculating pump, the vacuum pump contactor and the filter mode and fireman signals.',
    parts: [['W2T881416', 'PLC module, relay 8DO form C 2 A', 'Siemens 6ES7222-1XF32-0XB0']],
    notes: [['What does each relay do?', 'Q0.6 and Q0.7 P-01 recirculating pump on, Q0.8 M1 vacuum pump on (M311 coil), Q0.9 filter mode 1, Q0.10 filter mode 2, Q0.11 filter mode 3, Q0.12 fireman, Q0.13 spare.']],
    src: '20807803 r3'
  },
  plc_ai: {
    title: 'Analog input module', tag: 'PLC402',
    desc: 'Siemens SM 1231, 4 analog inputs 4 to 20 mA, rack 1 slot 3. Reads the pressure transmitters and the optional flow meter.',
    parts: [['W2T818012', 'PLC module, analog input 4 IP 24 VDC 4-20 mA', 'Siemens 6ES7231-4HD32-0XB0']],
    notes: [['What is on each channel?', 'AI0 PT-1 influent pressure (IW68), AI1 PT-2 effluent pressure (IW70), AI2 PT-3 air pressure, optional (IW72), AI3 FT-1 flow rate, optional (IW74).']],
    src: '20807804 r3'
  },
  breaker: {
    title: 'PLC circuit breaker', tag: 'CB114',
    desc: 'Siemens 5SJ4 branch breaker, 4 A, protecting the line feed to the PLC and the 24 VDC power supply.',
    parts: [['W2T384860', 'Circuit breaker, branch 4 A 240 V', 'Siemens 5SJ4104-7HG40']],
    notes: [['What upstream protection is needed?', 'Customer supplied disconnect with GFCI and overcurrent protection, recommended 120/230 VAC 15/10 A (schematic line 100).']],
    src: '20807851 r3, 20807801 r3'
  },
  ground_lug: {
    title: 'Ground lug', tag: 'Item 21',
    desc: 'Copper 4 AWG ground lug with its 1 x 1 in ground symbol label. Torque to 35 in-lb (UL legend C).',
    parts: [['W2T236250', 'Lug, copper ground wire connector 4 AWG', ''], ['W2T4855', 'Label, vinyl ground symbol 1 x 1 in', '']],
    notes: [], src: '20807851 r3'
  },
  tb1: {
    title: 'Field terminals', tag: 'TB1',
    desc: 'Double level spring terminals for the field wiring. The top level carries the T numbers, the bottom level the B-24+ and B-COM supply. Dry contacts, 24 VDC, copper conductors only, 60 C or larger.',
    parts: [
      ['W2T887318', 'Terminal block, grey STTBS 2,5 double level (39)', 'Item 25'],
      ['W2T887319', 'Terminal block, green STTBS 2,5 double level (2)', 'Item 26, GND'],
      ['W2T830413', 'Terminal cover, grey D-PTTB 2,5 (3)', 'Item 27'],
      ['W2T887320', 'Plug-in bridge 2,5 double level vertical', 'Item 28, on T-COM / B-COM'],
      ['W2T271951', 'Marker, ZB 5.2 mm blank white', 'Item 18'],
    ],
    notes: [['Where is the full terminal list?', 'MCE terminal block layout 20807854. Each marker in the model shows its top and bottom number.']],
    src: '20807851 r3, 20807854 r1'
  },
  tb2: {
    title: 'Power terminals', tag: 'TB2',
    desc: 'Customer power and vacuum motor terminals: L1, N, N, three GND, T1 and T2. 120/230 VAC, 60/50 Hz. The two N terminals are bridged.',
    parts: [
      ['W2T271968', 'Terminal block, grey ST 2,5 QUATTRO (5)', 'Item 17'],
      ['W2T816669', 'Terminal block, green ST 2,5-PE QUATTRO (3)', 'Item 16'],
      ['W2T271965', 'Terminal cover, grey D-ST 2,5 QUATTRO', 'Item 19'],
      ['W2T236200', 'Plug-in bridge FBS 2-5', 'Item 15, N to N'],
    ],
    notes: [['How many terminals?', 'Eight per the layout and the BOM (5 grey, 3 green). The backpanel view shows seven positions, so the model follows the layout.']],
    src: '20807851 r3, 20807854 r1'
  },
  cat6: {
    title: 'CAT6 patch cables', tag: 'Items 12, 24',
    desc: 'Two 3 ft blue shielded CAT6 patch cords: switch port 2 to the PLC PROFINET port (routed through the duct), and switch port 1 to the HMI on the cover.',
    parts: [['W2T828226', 'Cable, CAT6 shielded patch 3 ft blue (2)', '']],
    notes: [], src: '20807850 r9, 20807851 r3'
  },
  manifold: {
    title: 'Valve manifold', tag: 'Item 5',
    desc: 'Six station 24 VDC solenoid valve manifold mounted under the enclosure, three valves and three blank stations, with the supply port, push-in outlet fittings and exhaust silencers.',
    parts: [
      ['W2T865957', '6 station manifold, 3 valve, 3 blank, 24 VDC', ''],
      ['-', 'Screw 8-32 PHMS, nut, #8 lock washer, #8 Thredseal washer (4 each)', 'Items 20 to 23'],
    ],
    notes: [['Which PLC outputs drive it?', 'PLC114 Q0.0 to Q0.2 fire FV-01 to FV-03. Q0.3 to Q0.5 are wired for optional valves FV-04 to FV-06.']],
    src: '20807850 r9, 20807802 r3'
  },
  fv01: { title: 'Bump valve', tag: 'FV-01', desc: 'Manifold station 1, labelled BUMP. Opened by PLC114 Q0.0 (bump valve open command).', parts: [['-', 'Label, BUMP', 'Item 26']], notes: [], src: '20807850 r9, 20807802 r3' },
  fv02: { title: 'Regen precoat valve', tag: 'FV-02', desc: 'Manifold station 2, labelled REGEN. Opened by PLC114 Q0.1 (regen precoat valve open command).', parts: [['-', 'Label, REGEN', 'Item 27']], notes: [], src: '20807850 r9, 20807802 r3' },
  fv03: { title: 'Effluent valve', tag: 'FV-03', desc: 'Manifold station 3, labelled EFFLUENT. Opened by PLC114 Q0.2 (effluent valve open command).', parts: [['-', 'Label, EFFLUENT', 'Item 28']], notes: [], src: '20807850 r9, 20807802 r3' },
  blanks: { title: 'Blank stations', tag: 'Stations 4 to 6', desc: 'Three blank stations on the manifold. The schematic carries the optional drain/purge, precoat vent and UV screen valves (FV-04 to FV-06) on PLC114 Q0.3 to Q0.5.', parts: [], notes: [], src: '20807850 r9, 20807802 r3' },
  pt3: {
    title: 'Air pressure transmitter', tag: 'PT-3',
    desc: '0 to 100 psi, 4 to 20 mA transmitter on the end of the valve manifold, reading supply air pressure. Optional input AI2 on PLC402.',
    parts: [['W2T889373', 'Pressure transmitter 0-100 psi 4-20 mA', 'Item 6 (rev 2, was W2T836681)'], ['W2T509012', 'Cordset 4 pin female 2 m', 'Item 7']],
    notes: [], src: '20807850 r9, 20807804 r3'
  },
  pt1: {
    title: 'Influent pressure transmitter', tag: 'PT-1',
    desc: '0 to 100 psi, 4 to 20 mA transmitter, field mounted on the filter influent and wired back through the PG21 entry. AI0 on PLC402.',
    parts: [['W2T889373', 'Pressure transmitter 0-100 psi 4-20 mA', 'Item 6'], ['W2T509012', 'Cordset 4 pin female 2 m', 'Item 7']],
    notes: [], src: '20807850 r9, 20807804 r3'
  },
  pt2: {
    title: 'Effluent pressure transmitter', tag: 'PT-2',
    desc: '0 to 100 psi, 4 to 20 mA transmitter, field mounted on the filter effluent and wired back through the PG21 entry. AI1 on PLC402.',
    parts: [['W2T889373', 'Pressure transmitter 0-100 psi 4-20 mA', 'Item 6'], ['W2T509012', 'Cordset 4 pin female 2 m', 'Item 7']],
    notes: [], src: '20807850 r9, 20807804 r3'
  },
  cord_grips: {
    title: 'Cord grips', tag: 'Items 9 to 15, 31',
    desc: 'Bottom entries: a PG16 three hole grip for the valve cables and a PG21 three hole grip for the transmitter cordsets, each with an O-ring and locking nut inside.',
    parts: [
      ['W2T888712', 'Connector, cord strain relief PG16 3 x 5.6 mm', 'Item 9'],
      ['W2T837203', 'O-ring, PG16 (2)', 'Item 10'], ['W2T837202', 'Locking nut, black PG16 (2)', 'Item 11'],
      ['W2T910322', 'Connector, cord strain relief PG21 3 x 7 mm', 'Item 13 (rev 9, was W2T881633)'],
      ['W2T881636', 'O-ring, PG21', 'Item 14'], ['W2T881634', 'Locking nut, black PG21', 'Item 15'],
      ['W2T910323', 'Multi hole bushing, PG21, 3/4 in M25', 'Item 31, added rev 9'],
    ],
    notes: [], src: '20807850 r9'
  },
  lt_elbow: {
    title: 'Liquid tight 90 degree', tag: 'Item 8',
    desc: '3/8 in 90 degree liquid tight connector in the left wall, sealed with a PG16 O-ring and locking nut. The flexible conduit to the vacuum transfer junction box lands here.',
    parts: [['W2T836665', 'Connector, liquid tight 90 deg 3/8 in', '']],
    notes: [], src: '20807850 r9, 20807853 r1'
  },
  vac_jbox: {
    title: 'Vacuum transfer junction box', tag: 'VJB',
    desc: '4 x 4 x 2 in grey PVC junction box at the media vacuum motor. The motor leads splice to T1, T2 and GND from the panel inside it.',
    parts: [
      ['W3T477966', 'Vacuum transfer junction box assembly', '20807860, item 29 on 20807850'],
      ['W2T836684', 'Box, junction 4 x 4 x 2 grey PVC with cover', ''],
      ['W2T836682', 'Conduit, liquid tight flexible 3/8 in PVC (7 ft)', ''],
      ['W2T836666', 'Connector, liquid tight straight 3/8 in', ''],
      ['W2T836667', 'Connector, cord strain relief 1/2 in', ''],
      ['W2T837201', 'Wire nut 30-651 (3)', ''], ['W2T837191', 'Label, VACUUM', ''],
    ],
    notes: [], src: '20807860 r0, 20807861 r0'
  },
};
