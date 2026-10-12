// Lawson Aquatics SuperSump (MLD-SG) parts data for the 9x9, 12x12 and 18x18 main drains.
// Sources: Lawson Aquatic Grate O&M (parts list, installation and maintenance instructions), the
// MLD-SG-0909 / 1212 / 1818 General Certificates of Conformity, and the SuperSump technical data sheet (R 4/5/13).
// Part rows are [part number, description, note]. holes: bolt-hole centres (x,z) in the STEP frame, found from the
// 7.8 mm insert bores in the sump; sumpTop: the sump face the grate sits on; boltLen in mm (5/8 in or 15/16 in).
(function(){
  const SRC='Lawson Aquatic Grate O&M (parts list, installation and maintenance); MLD-SG General Certificate of Conformity; SuperSump technical data sheet R 4/5/13.';
  const FAQ_GRATE=[
    ['How tight should the grate screws be?','Start each screw by hand so it does not cross-thread, then tighten with a hex key to 10 in-lb. Do not use power tools to install or remove the fasteners. Hand check the grate for snugness afterwards.'],
    ['Can the grate be replaced in place?','Yes, like for like. Covers and grates can be replaced in place with the same part. Drilling holes in an existing sump or grate is prohibited.'],
    ['How long does a grate last?','Service life is 10 years, starting from the month and year it was installed, with or without water. Replace it at or before the end of its service life.'],
    ['When must the pool be closed?','If the grate is missing, broken, cracked or loose, or can be removed without tools. Check the grate and fasteners for damage or tampering every operational day.']
  ];
  const FAQ_SUMP=[
    ['How is the piping tested?','Water test only, never compressed air, at no more than 15 psi. Use the 1/2 in NPT tap in the test plate to fill or purge the line, then remove the plug to relieve pressure and drain.'],
    ['What if a screw insert is stripped?','Damaged fastener receptacles mean the sump body has to be removed and replaced.'],
    ['What does the sump need under it?','Install the 2 in hydrostatic relief valve (or cap the outlet with a 2 in plug), glue the perforated collection tee into the 2 in socket on the underside and bed it in 1 in free-draining gravel.'],
    ['Will it survive freezing?','The sump is tapered so ice can expand upwards without damaging it. Follow normal pool winterisation practice.']
  ];
  const FAQ_PLATE=[
    ['What is the test plate for?','It seals the side port so the suction line can be pressure tested before the pool is finished. The 1/2 in NPT tap lets you fill the line or purge air.'],
    ['How is it removed?','After testing, cut the plate out with a Roto-Zip or similar tool, staying inside the circular groove. If more testing is needed later, brace a blow-up test ball in the pipe.']
  ];
  const FAQ_HW=[
    ['Which screws go with this drain?','Use only the stainless steel screws supplied. Brass inserts are moulded into the sump for the screws to thread into.'],
    ['How often should the fasteners be checked?','Every operational day for damage or tampering, and replaced along with the grate at the end of the 10 year service life.']
  ];
  function model(o){
    return {
      model:o.model, size:o.size, holes:o.holes, sumpTop:o.sumpTop, boltLen:o.boltLen, assembly:o.assembly, port:o.port, floor:o.floor, wall:o.wall, area:o.area, blockable:o.blockable,
      parts:{
        grate:{title:o.size+' grate (cover)', desc:'Injection-moulded white grate with the Lawson low-profile top, 54% open area. Screws down onto the sump with four stainless screws into moulded brass inserts.',
          parts:[[o.grate,o.size+' SuperSump grate','Grate part number from the parts list and certificate'],[o.assembly,'Complete '+o.model+' assembly (sump and grate)',o.assemblyNote||'']], faq:FAQ_GRATE, src:SRC},
        sump:{title:o.size+' sump', desc:'One-piece injection-moulded sump with internal plumbing fittings, a built-in water stop and a tapered body. '+o.port+' side port to the suction line; 2 in socket underneath for the hydrostatic relief and collection tee.',
          parts:[[o.sump,o.size+' SuperSump sump body','Sump part number from the parts list and certificate'],[o.assembly,'Complete '+o.model+' assembly (sump and grate)',o.assemblyNote||'']], faq:FAQ_SUMP, src:SRC},
        plate:{title:'Test plate', desc:'Moulded plate across the side port with a 1/2 in NPT tap, used to pressure test the suction piping. It is cut out after testing.',
          parts:[[o.sump,'Moulded into the sump body','No separate part number; supplied as part of the sump']], faq:FAQ_PLATE, src:SRC},
        screws:{title:'Grate screws', desc:'Four 1/4-20 stainless steel hex socket screws hold the grate down, one at each bolt hole, threading into the brass inserts in the sump. Tighten with a hex key to 10 in-lb.',
          parts:[[o.bolt,o.boltDesc,'Model number from the installation instructions'],['1000-8309','Fastener and insert kit','Parts list: fastener and inserts part number']], faq:FAQ_HW, src:SRC},
        inserts:{title:'Brass inserts', desc:'Four brass rivet-nut inserts, 1/4-20 thread, set into the bolt holes around the top of the sump for the grate screws.',
          parts:[['BRASS-TI','Brass rivet-nut insert, 1/4-20','Model number from the SuperSump data sheet'],['1000-8309','Fastener and insert kit','Parts list: fastener and inserts part number']], faq:FAQ_HW, src:SRC}
      }
    };
  }
  window.LAWSON_SUPERSUMP={
    '0909':model({model:'MLD-SG-0909', size:'9 x 9', assembly:'1001-9895', grate:'1000-8344', sump:'1002-1110', port:'4 in', holes:[[0,105.1],[-105.1,0],[0,-105.1],[105.1,0]], sumpTop:252.4, boltLen:15.9, floor:237, wall:199, area:42.12, blockable:true, bolt:'BOLT-01-SS', boltDesc:'1/4-20 x 5/8 stainless hex socket screw, (4) per grate'}),
    '1212':model({model:'MLD-SG-1212', size:'12 x 12', assembly:'1001-9893', grate:'1000-8345', sump:'1000-8357', port:'6 in', holes:[[70.1,103.6],[70.1,-175.8],[-69.6,-36.1],[209.8,-36.1]], sumpTop:172.9, boltLen:15.9, floor:365, wall:340, area:81.3, blockable:true, bolt:'BOLT-01-SS', boltDesc:'1/4-20 x 5/8 stainless hex socket screw, (4) per grate',
      assemblyNote:'O&M parts list gives 1001-9893; the MLD-SG-1212 certificate shows 1001-9896 (the MLD-FG-1212 frame and grate number). Confirm before ordering.'}),
    '1818':model({model:'MLD-SG-1818', size:'18 x 18', assembly:'1001-9894', grate:'1000-8346', sump:'1000-8358', port:'8 in', holes:[[72.9,149.1],[-372.9,-295.3],[-372.9,149.1],[72.9,-295.3]], sumpTop:-167.4, boltLen:23.8, floor:816, wall:696, area:183.06, blockable:false, bolt:'BOLT-02-SS', boltDesc:'1/4-20 x 15/16 stainless hex socket screw, (4) per grate'})
  };

  // ---- molded 18 in channel sumps (18 x 36, 18 x 54, 18 x 72) -------------------------------------------------
  // Geometry from the Lawson "Sump Inventor Files - Updated NSF Dataplate" STEP assemblies (18X36 / 18X54_ / 18X72_ASSEMBLY).
  // Each drain is one molded sump with 2, 3 or 4 flat 18 x 18 grate sections, four 1/4-20 screws per section.
  // Part numbers from the master product list (SAP). Where the list has no matching line the row says SAP # needed.
  const NEED='SAP # needed';
  const SRC2='Lawson molded sump STEP assembly (Updated NSF Dataplate); master product list (SAP). Care, inspection and torque from the Lawson Aquatic Grate O&M.';
  function channel(o){
    const n=o.sections, scr=n*4;
    const m=model({model:o.model, size:o.size, assembly:NEED, grate:NEED, sump:NEED, port:'See submittal', holes:o.holes, sumpTop:o.sumpTop, boltLen:o.boltLen,
      floor:null, wall:null, area:null, blockable:null, bolt:NEED, boltDesc:''});
    m.bin='mld-'+o.code.replace('X','')+'.bin'; m.sections=n; m.ratingNote='Flow ratings and open area for the '+o.size+' are not in the documents I have. Take them from the '+o.size+' certificate of conformity.';
    const P=m.parts;
    P.grate.title=o.size+' grate sections';
    P.grate.desc=`${n} flat 18 x 18 in molded grate sections side by side across the ${o.size} sump. Each section screws down with four 1/4-20 stainless screws into inserts in the sump.`;
    P.grate.parts=[[o.frameGrate,'FRAME & GRT MOLDED '+o.code+' WT SUPERFLOW','Frame and grates, white'],[o.frame,'MAIN DRAIN FRAME ONLY '+o.code+'-WT','Frame only, white'],[NEED,'Grate section only, 18 x 18 flat (STEP '+o.code+'_FLAT_GRATE)','No grate-only line for the '+o.size+' in the master product list']].concat(o.extra||[]);
    P.grate.src=SRC2;
    P.sump.title=o.size+' sump';
    P.sump.desc=`One-piece molded channel sump, 18 in wide and ${o.len} in long, carrying ${n} grate sections. Suction connection on the side.`;
    P.sump.parts=[[NEED,'Molded sump only, '+o.size+' (STEP '+o.code+' SUMP)','The master product list only has fiberglass '+o.code+' sumps (1003-8xxx); no molded sump-only line'],[NEED,'Complete '+o.size+' molded sump and grate assembly','No sump-and-grate assembly line for the '+o.size+' in the master product list']];
    P.sump.src=SRC2;
    P.plate.desc='Not included in the '+o.size+' STEP assembly. '+P.plate.desc;
    P.plate.parts=[[NEED,'Test plate / inner cover, '+o.size,'Not a separate line in the master product list']];
    P.plate.src=SRC2;
    P.coupling={title:'Side connection', desc:'Pipe coupling on the side suction outlet of the '+o.size+' sump, as modeled in the STEP assembly.',
      parts:[[NEED,'Side outlet coupling, '+o.size+' (STEP '+o.couplingName+')','Not in the master product list']],
      faq:[['How is the suction line tested?','Water test only, never compressed air, at no more than 15 psi (Lawson grate O&M).']], src:SRC2};
    P.plate.nomodel=true;
    P.screws.desc=`${scr} 1/4-20 stainless steel screws, four per grate section, threading into inserts in the sump. Tighten with a hex key to 10 in-lb. Length shown is measured from the model (about 1-1/4 in); confirm against the submittal.`;
    P.screws.parts=[[NEED,'1/4-20 stainless hex socket screw, about 1-1/4 in, ('+scr+') per drain','Screw length measured from the STEP model. Confirm before ordering.']];
    P.screws.src=SRC2;
    P.inserts.desc=`${scr} threaded inserts in the 3/8 in bores around the top of the sump, one under each grate screw.`;
    P.inserts.parts=[[NEED,'Threaded insert, 1/4-20, for 3/8 in sump bore, ('+scr+') per drain','Not in the master product list']];
    P.inserts.src=SRC2;
    return m;
  }
  const D=window.LAWSON_SUPERSUMP;
  const rowHoles=(xs,zs)=>{ const h=[]; for(const z of zs) for(const x of xs) h.push([x,z]); return h; };
  D['1836']=channel({model:'Molded 18 x 36', size:'18 x 36', code:'18X36', len:36, sections:2, frameGrate:'1000-8329', frame:'1000-8314', noPlate:true, couplingName:'18X36_SCH40_NEW_COUPLING',
    holes:rowHoles([-458.7,-14.2],[-373.2,-4.9,84.0,452.3]), sumpTop:494.7, boltLen:32.1});
  D['1854']=channel({model:'Molded 18 x 54', size:'18 x 54', code:'18X54', len:54, sections:3, frameGrate:'1000-8330', frame:'1000-1443', couplingName:'INNER_COVER',
    holes:rowHoles([-455.6,-11.1],[416.7,785.0,873.9,1242.2,1331.1,1699.4]), sumpTop:-409.8, boltLen:32.1});
  D['1872']=channel({model:'Molded 18 x 72', size:'18 x 72', code:'18X72', len:72, sections:4, frameGrate:'1000-8331', frame:'1002-1095', couplingName:'INNER_COVER',
    holes:rowHoles([-455.6,-11.1],[1772.1,2140.4,2229.3,2597.6,2686.5,3054.8,3143.7,3512.0]), sumpTop:724.0, boltLen:32.1,
    extra:[['1000-8270','HANDHOLD - WT 85401 - 1872','Grate handhold for the 18 x 72']]});
  window.LAWSON_MODEL_ORDER=['0909','1212','1818','1836','1854','1872'];
})();
