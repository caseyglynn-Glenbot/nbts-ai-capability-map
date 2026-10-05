// Barrier Ti UV (Evoqua / Xylem) parts data for the TI-1200-4, TI-2200-8 and TI-4200-8 chambers.
// Sources: Barrier Ti UV System IOM (SIII-M-LP200) Iss.1 (replacement components and spares kits, maintenance),
// Barrier Ti Wiper manual (SIII-M-LP200) Iss.1, and the Barrier Ti technical data sheet XYL-DS-BARRIER_TI-EN-DS-0925.
// Part rows are [part number, description, note]. The IOM lists two codes per part; the 1003- number is shown first with
// the W-code alongside. Chamber geometry: from the CGA STEP files, split into parts; lamps, quartz thimbles and the
// wiper plate are drawn from the IOM dimensions (QTH-30 x 1025 thimble).
(function(){
  const SRC='Barrier Ti UV System IOM (SIII-M-LP200) Iss.1; Barrier Ti Wiper manual Iss.1; data sheet XYL-DS-BARRIER_TI-EN-DS-0925.';
  const FAQ={
    lamp:[
      ['How long does a lamp last?','16,000 hours. Frequent stop and start operation shortens lamp life, and the Spectra controller shows a priority message when the run hours pass the lamp life set point.'],
      ['How do I change a lamp?','Isolate power. Twist the TwistLok+ plug locking ring anticlockwise and remove it, unscrew the clamp ring retainer, then turn the TwistLok+ connector about 2 turns anticlockwise to release the lamp. Pull the lamp and connector out keeping it parallel to the chamber.'],
      ['Anything to watch when fitting a new lamp?','Keep fingerprints and dirt off the lamp. Fit the connector, insert the lamp, turn 2 turns clockwise until the connector flange meets the tertiary seal, refit the retainer and the plug (1/4 turn). Then reset the lamp hours on the Spectra.'],
      ['Is there mercury in the lamp?','Yes, up to 300 mg per lamp. If one breaks, follow the mercury spillage procedure in the IOM.']],
    quartz:[
      ['How do I remove a quartz thimble?','Isolate flow and drain the chamber, remove the lamp, unscrew the clamp ring (the secondary seal makes it stiff at first), remove the primary seal and slide the thimble out parallel to the chamber.'],
      ['How do I clean the quartz?','Soap and water. For heavier deposits soak in 5% citric acid or wipe with household vinegar; remove fingerprints with surgical spirit and a lint-free cloth.'],
      ['Should the seals be replaced?','Yes, it is good practice to replace the seals whenever the quartz is removed. Move the soft seat and spring to the new thimble and tighten the clamp ring to 20 Nm (15 lbf ft), or hand tight plus 3/4 turn.']],
    flange:[
      ['How is the lamp flange removed?','Remove the lamps and quartz thimbles first, then the hex head flange bolts (hold the connecting nuts with a spanner) and lift the flange off with its flange seal.'],
      ['What torque for the flange bolts?','20 Nm (15 lbf ft) on the TI-2200 and TI-4200, 10 Nm (7.5 lbf ft) on the TI-1200. Tighten evenly to load the flange seal.'],
      ['Which way should the chamber be installed?','Horizontal or vertical. Vertical chambers mount with the lamp connections facing upwards. Leave room at the lamp end to pull the lamps and quartz.']],
    branch:[
      ['Can the inlet and outlet be turned?','Yes. Remove the lamps and quartz, then the collar bolts and washers, and lift off the branch and flange assembly. Refit it in the new orientation (U or Z shape) with the collar seal in place.'],
      ['What torque for the collar bolts?','20 Nm (15 lbf ft) on the TI-2200 and TI-4200, 10 Nm (7.5 lbf ft) on the TI-1200, tightened evenly.'],
      ['What pipe connections are used?','EN1092 / ASME B16.5 flanges with split backing rings: DN 50 / 2 in on the TI-1200-4 and DN 100 / 4 in on the TI-2200-8 and TI-4200-8.']],
    plug:[
      ['Where are the vent and drain plugs?','One 3/4 in vent / drain plug in each end cap assembly, each with a plug seal. Tighten to 10 Nm (7.5 lbf ft).'],
      ['How is the chamber cleaned in place?','Drain, remove both plugs, connect CIP equipment to the 3/4 in ports (bottom in, top out) and circulate 2 to 10% phosphoric or citric acid for 15 to 30 minutes, then rinse.']],
    sensor:[
      ['How is the UV sensor removed?','With the system off, unscrew the sensor cable, then the sensor cap, and lift the validated sensor out of the sensor window housing.'],
      ['How is the sensor window cleaned?','By CIP, the manual wiper (if fitted) or by removing the window housing. Use non-abrasive cleaners; weak acids for stubborn fouling. Check the sensor seal.'],
      ['Does the sensor need calibrating on site?','No. The validated 4-20 mA sensors are factory calibrated.']],
    temp:[
      ['What does the temperature sensor do?','The PT100 sensor monitors chamber temperature and shuts the lamps down if the water overheats, for example with no flow. A disconnected sensor raises a fault.']],
    wiper:[
      ['Which models have a wiper?','The manual wiper is an option on the TI-2200-8 and TI-4200-8 only.'],
      ['How often should it be used?','Set the frequency to suit the water. Increase it if deposits build on the quartz, reduce it if the sleeves stay clean. The Spectra can show a reminder to run a wiper sweep.']],
    body:[
      ['What is the chamber made of?','Titanium with PP parts, EPDM seals and high purity quartz sleeves. Maximum operating pressure 3.5 bar / 50 psi.'],
      ['What certifications does it have?','UL 1081, NSF-50 (Crypto), FCC, FDA, CE and UKCA.']],
    panel:[
      ['What is in the control panel?','The Spectra membrane (ATUV-1010 main board with OLED display), the ATUV-1220 I/O module and the LP electronic ballasts, in an epoxy coated mild steel IP54 / NEMA 12 enclosure.'],
      ['How does it communicate?','MODBUS RTU over RS-422 / RS-485, with 2 digital inputs, 2 digital outputs and 1 analogue input. The supply is 120-240 V, 50/60 Hz; a GFCI distribution breaker is not supplied.']]
  };
  const KIT={
    '1200':{seal:['1003-8529','W3T614853'], pm:['1003-8558','W3T614859']},
    '2200':{seal:['1003-8530','W3T614854'], wseal:['1003-8532','W3T614856'], pm:['1003-8559','W3T614991']},
    '4200':{seal:['1003-8531','W3T614855'], wseal:['1003-8533','W3T614857'], pm:['1003-8560','W3T614993']}};
  const row=(p,d,n)=>[p[0],d,(p[1]?'Evoqua code '+p[1]:'')+(n?(p[1]?'. ':'')+n:'')];
  function model(o){
    const k=KIT[o.key], seal=row(k.seal,'Seal kit, '+o.model), pm=row(k.pm,'Preventative maintenance kit, '+o.model);
    const parts={
      lamps:{title:'UV lamps', desc:`${o.lamps} x 200 W low pressure amalgam lamp${o.lamps>1?'s':''} (LPHO) with TWISTLOK quick release, single-ended access from the lamp flange. Power is adjustable from 60 to 100%.`,
        parts:[['—','UV Lamp, 200W, LPHO, Barrier Ti','No part number in the IOM; order through Evoqua UV'],pm], faq:FAQ.lamp},
      quartz:{title:'Quartz thimbles', desc:`High purity quartz thimble QTH-30 x 1025 over each lamp, held at the lamp flange by the clamp ring with primary and secondary EPDM seals.`,
        parts:[['—','Quartz Thimble QTH-30 X 1025','No part number in the IOM; order through Evoqua UV'],seal,row(['1003-8549','W3T597924'],'Quartz wedge clamp, TI, Q30')], faq:FAQ.quartz},
      lampflange:{title:'Lamp flange', desc:`End flange carrying the ${o.lamps} lamp port${o.lamps>1?'s':''}: TwistLok+ connector, quartz retainer and clamp ring at each port. Bolted to the branch through the flange seal.`,
        parts:[row(o.flange,o.flangeDesc),row(['1000-3291','W2T874964'],'TwistLok Plus connector Q30'),row(['1003-8551','W3T597925'],'Quartz retainer, TI, Q30'),row(o.bolt,o.boltDesc),seal], faq:FAQ.flange},
      'branch-lamp':{title:'Branch and collar, lamp end', desc:`Titanium branch (${o.branchDesc.replace(/^BRANCH, TI, /,'')}) with its flanged connection, joined to the chamber body by the collar and collar bolts over the collar seal.`,
        parts:[row(o.branch,o.branchDesc),row(o.collar,o.collarDesc),row(o.bolt,o.boltDesc),seal], faq:FAQ.branch},
      'branch-far':{title:'Branch and collar, far end', desc:`Second branch and collar at the closed end of the chamber. The two branches can be set as a U or Z shape.`,
        parts:[row(o.branch,o.branchDesc),row(o.collar,o.collarDesc),row(o.bolt,o.boltDesc),seal], faq:FAQ.branch},
      'flange-lamp':{title:'Split backing ring, lamp end', desc:`Loose ${o.conn} split backing ring that bolts the branch to the pipework (EN1092 / ASME B16.5 drilling).`,
        parts:[row(o.ring,o.ringDesc)], faq:FAQ.branch},
      'flange-far':{title:'Split backing ring, far end', desc:`Loose ${o.conn} split backing ring on the far-end branch.`,
        parts:[row(o.ring,o.ringDesc)], faq:FAQ.branch},
      endcap:{title:'End cap', desc:'Closed end of the chamber, with the 3/4 in vent / drain plug used for draining and clean in place.',
        parts:[row(['1003-8546','W3T597922'],'Hex plug, TI, G3/4 (vent / drain)'),['—','End cap','No part number in the IOM']], faq:FAQ.plug},
      body:{title:'Chamber body', desc:`Titanium chamber body (${o.bodyDesc}) with the UV sensor and temperature sensor ports.`,
        parts:[['—',o.bodyDesc,'No part number in the IOM'],seal], faq:FAQ.body},
      uvsensor:{title:'UV sensor', desc:'Validated 4-20 mA UV intensity sensor (AT-900) in the sensor window housing on the chamber body.',
        parts:[['W2T898830','Validated UV probe, 500 W/m2, LP','Factory calibrated']], faq:FAQ.sensor},
      tempsensor:{title:'Temperature sensor', desc:'PT100 temperature sensor on top of the chamber body, protecting the chamber against overheating.',
        parts:[['—','PT100 temperature sensor','No part number in the IOM']], faq:FAQ.temp},
      brackets:{title:'Fixing brackets', desc:'Mounting brackets under each branch for horizontal or vertical installation.',
        parts:[['—','Chamber fixing bracket','No part number in the IOM']], faq:FAQ.body},
      panel:{title:'Control panel', nomodel:true, desc:`Spectra control panel, ${o.panel}. Not part of the chamber model.`,
        parts:[['ATUV-1010','Spectra membrane main board','Board reference from the IOM'],['ATUV-1220','I/O module','Board reference from the IOM'],['—','LP electronic ballast','One per lamp']], faq:FAQ.panel}
    };
    if(o.wiper) parts.wiper={title:'Manual wiper', desc:`Manual wiper (option): handwheel knob on the lamp flange driving the wiper shaft and plate with 30 mm EPDM wiper rings along the quartz thimbles.`,
      parts:[row(k.wseal,'Wiper seal kit, '+o.model),['—','Manual wiper shaft, TI, Q30, '+o.lamps+'L, 8"','No part number in the IOM']], faq:FAQ.wiper};
    return Object.assign({},o,{parts});
  }
  window.BARRIER_TI={
    '1200':model({key:'1200', model:'TI-1200-4', file:'ti-1200.bin', lamps:1, ports:[[0,0]], conn:'DN 50 / 2 in', flow:'30 m³/h / 132 gpm', power:'130 - 220 W', weight:'7.5 kg / 16.5 lb dry', wiper:false,
      flange:['1003-8538','W3T597912'], flangeDesc:'Flange, TI, Q30, 1L, 4"', bolt:['1003-8554','W3T612346'], boltDesc:'Bolt set, Barrier Ti, 4 inch',
      branch:['1003-8536','W3T597718'], branchDesc:'BRANCH, TI, 4"-2"', collar:['1003-8534','W3T597717'], collarDesc:'Collar, TI, Q30, 4"', ring:['1003-8544','W3T597913'], ringDesc:'Split backing ring, TI, 2"',
      bodyDesc:'CH body, TI, 200W, 4"', panel:'400 x 400 x 200 mm, 12.5 kg, natural cooling'}),
    '2200':model({key:'2200', model:'TI-2200-8', file:'ti-2200.bin', lamps:2, ports:[[0,60],[0,-60]], conn:'DN 100 / 4 in', flow:'75 m³/h / 330 gpm', power:'265 - 440 W', weight:'23 kg / 50.7 lb dry', wiper:true,
      flange:['1003-8539','W3T610434'], flangeDesc:'Flange, TI, Q30, 2L, 8"', bolt:['1003-8555','W3T612347'], boltDesc:'Bolt set, Barrier Ti, 8 inch',
      branch:['1003-8537','W3T597916'], branchDesc:'BRANCH, TI, 8"-4"', collar:['1003-8535','W3T597915'], collarDesc:'Collar, TI, Q30, 8"', ring:['1003-8547','W3T597919'], ringDesc:'Split backing ring, TI, 4"',
      bodyDesc:'CH body, TI, 200W, 8"', panel:'400 x 400 x 200 mm, 15.5 kg, forced air cooling'}),
    '4200':model({key:'4200', model:'TI-4200-8', file:'ti-4200.bin', lamps:4, ports:[[60,0],[-60,0],[0,60],[0,-60]], conn:'DN 100 / 4 in', flow:'115 m³/h / 506 gpm', power:'530 - 880 W', weight:'24 kg / 55.1 lb dry', wiper:true,
      flange:['1003-8540','W3T597918'], flangeDesc:'Flange, TI, Q30, 4L, 8"', bolt:['1003-8555','W3T612347'], boltDesc:'Bolt set, Barrier Ti, 8 inch',
      branch:['1003-8537','W3T597916'], branchDesc:'BRANCH, TI, 8"-4"', collar:['1003-8535','W3T597915'], collarDesc:'Collar, TI, Q30, 8"', ring:['1003-8547','W3T597919'], ringDesc:'Split backing ring, TI, 4"',
      bodyDesc:'CH body, TI, 200W, 8"', panel:'400 x 400 x 200 mm, 19 kg, forced air cooling'})
  };
  window.BARRIER_TI_SRC=SRC;
})();
