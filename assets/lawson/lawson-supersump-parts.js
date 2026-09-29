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
})();
