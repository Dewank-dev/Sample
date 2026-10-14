(() => {
  const deva='"Noto Serif Devanagari","Nirmala UI","Kohinoor Devanagari",Georgia,serif',serif='"Cormorant Garamond",Georgia,serif',script='"Pinyon Script","Brush Script MT",cursive';
  function wrap(c,str,x,y,max,lh){let row=0,line='';for(const word of String(str||'').split(/\s+/)){let next=line?line+' '+word:word;if(c.measureText(next).width>max&&line){c.fillText(line,x,y+row++*lh);line=word}else line=next}if(line)c.fillText(line,x,y+row*lh)}
  function draw(c,t,d,scene){let sc=window.WeddingScenes.list[scene],local=t-sc.start,fade=Math.min(1,local/.5,Math.max(0,(sc.start+sc.length-t)/.45)),rise=(1-Math.min(1,local/.5))*20,center=710;c.save();c.globalAlpha=Math.max(0,fade);c.textAlign='center';
    // Fine divider ornaments frame the copy without covering the parchment backdrop.
    const line=(s,y,size,f=deva,color='#761c28',weight=500)=>{c.font=`${weight} ${size}px ${f}`;c.fillStyle=color;c.fillText(s,360,y+rise)};
    c.strokeStyle='rgba(163,117,52,.68)';c.lineWidth=1.3;c.beginPath();c.moveTo(205,center-176);c.lineTo(515,center-176);c.moveTo(205,center+174);c.lineTo(515,center+174);c.stroke();line('❧',center-168,20,serif,'#a57837');line('❧',center+190,20,serif,'#a57837');
    if(scene===0){line('॥ शुभ विवाह ॥',center-92,43,deva,'#9d6824',600);line(`${d.groom}  &  ${d.bride}`,center+8,48,script,'#791a29');line(d.invitation,center+91,24,serif,'#694b3c')}
    else if(scene===1){line('श्री गणेशाय नमः',center-112,34,deva,'#9d6824',600);line(`${d.groom}  &  ${d.bride}`,center-12,49,script);line('आप सादर आमंत्रित हैं',center+83,27,deva,'#694b3c')}
    else if(scene===2){line('मांगलिक कार्यक्रम',center-5,40,deva,'#831d28',600);line('✦  ❧  ✦',center+62,24,serif,'#a57837')}
    else if(scene>=3&&scene<=7){let f=d.functions[scene-3]||{},h=['हल्दी','मेहंदी','संगीत','बारात','विवाह / फेरे'][scene-3];line(h,center-89,44,deva,f.color||'#9d242a',600);line(f.name||'',center-25,29,script,'#9c6b30');line(`${f.weekday||''}, ${f.date||''}`,center+34,22,serif,'#38251d');line(f.time||'',center+72,22,serif,'#38251d');c.font=`500 22px ${serif}`;c.fillStyle='#38251d';wrap(c,f.venue,360,center+116,430,29);if(f.description){c.font=`italic 19px ${serif}`;c.fillStyle='#775634';wrap(c,f.description,360,center+169,430,26)}}
    else {line(`${d.groom}  &  ${d.bride}`,center-92,51,script);line('आप सादर आमंत्रित हैं',center-4,28,deva,'#694b3c');c.font=`500 24px ${deva}`;c.fillStyle='#694b3c';wrap(c,d.blessing,360,center+56,440,37);line(d.location,center+148,23,serif,'#896538')}
    c.restore()}
  window.WeddingText={draw};
})();
