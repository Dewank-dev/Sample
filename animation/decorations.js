(() => {
  function flower(c,x,y,r,color,t=0,seed=0){c.save();c.translate(x,y);c.rotate(Math.sin(t*.5+seed)*.04);for(let j=0;j<10;j++){c.rotate(Math.PI/5);c.fillStyle=color;c.beginPath();c.ellipse(0,-r*.62,r*.22,r*.62,0,0,7);c.fill()}c.fillStyle='#8a5925';c.beginPath();c.arc(0,0,r*.22,0,7);c.fill();c.restore()}
  function drawFrame(c,t,d,im){const w=720,h=1280;let g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,'#fff9e8');g.addColorStop(.5,'#fff2d7');g.addColorStop(1,'#f8e4bb');c.fillStyle=g;c.fillRect(0,0,w,h);
    // Warm parchment grain, frame rails and carved corner curls.
    for(let i=0;i<280;i++){c.globalAlpha=.035;c.fillStyle=i%2?'#8e6339':'#fff';c.fillRect(i*173%w,i*293%h,2,2)}c.globalAlpha=1;c.strokeStyle='#b58a45';c.lineWidth=2;c.strokeRect(22,22,676,1236);c.strokeStyle='rgba(154,107,44,.45)';c.lineWidth=1;c.strokeRect(32,32,656,1216);
    // Dense marigold ceiling like the reference, with leafy greenery and garlands.
    for(let i=0;i<39;i++){let x=8+i*18,s=Math.sin(t*.7+i*.5)*4;flower(c,x,40+s,8+i%3,['#efc52f','#e17a24','#d54f45','#dc2781'][i%4],t,i);if(i%2===0){c.strokeStyle='#53743a';c.lineWidth=2;c.beginPath();c.moveTo(x,46);c.quadraticCurveTo(x+12,65,x+20,55);c.stroke();}}
    for(let j=0;j<13;j++){let x=42+j*53, sway=Math.sin(t*.45+j)*5, end=145+(j%4)*19;c.strokeStyle='#ac7934';c.lineWidth=1.5;c.beginPath();c.moveTo(x,48);c.quadraticCurveTo(x+sway,90,x+sway,end);c.stroke();for(let k=0;k<6;k++)flower(c,x+sway*k/6,62+k*(end-62)/6,5,k%2?'#e4a82c':'#d45e3b',t,k+j)}
    // Carved canopy arch and rich orange, red, green and yellow fabric swags.
    c.fillStyle='#d5b478';c.strokeStyle='#976d36';c.lineWidth=3;c.beginPath();c.moveTo(112,175);c.quadraticCurveTo(155,86,250,100);c.quadraticCurveTo(360,34,470,100);c.quadraticCurveTo(565,86,608,175);c.lineTo(583,200);c.quadraticCurveTo(540,130,470,139);c.quadraticCurveTo(360,76,250,139);c.quadraticCurveTo(180,130,137,200);c.closePath();c.fill();c.stroke();
    const cloth=(color,left,mid,right)=>{c.fillStyle=color;c.beginPath();c.moveTo(left,140);c.bezierCurveTo(left+28,210,mid-55,350,mid-8,366);c.bezierCurveTo(mid+27,378,right-7,222,right,145);c.lineTo(right-16,139);c.bezierCurveTo(right-25,233,mid+33,339,mid+4,343);c.bezierCurveTo(mid-36,337,left+25,209,left+15,144);c.closePath();c.fill()};
    cloth('#d9351d',112,280,360);cloth('#f4a313',265,394,504);cloth('#14824a',420,526,610);cloth('#e94a22',100,514,625);
    // Gold pleats and central hanging ornament.
    for(let i=0;i<8;i++){c.strokeStyle='rgba(255,220,117,.8)';c.lineWidth=2;c.beginPath();c.moveTo(120+i*68,157);c.quadraticCurveTo(180+i*38,240,132+i*65,337);c.stroke()}
    c.fillStyle='#bd772c';c.strokeStyle='#78482a';c.lineWidth=2;c.beginPath();c.moveTo(286,174);c.quadraticCurveTo(360,158,434,174);c.lineTo(420,219);c.quadraticCurveTo(360,255,300,219);c.closePath();c.fill();c.stroke();for(let i=0;i<7;i++)flower(c,305+i*18,193,5,'#eec853',t,i);
    // Use the actual canopy crop from the supplied wedding video as the upper
    // frame, keeping the generated invitation copy clear below it.
    if(im.mandap){c.save();c.drawImage(im.mandap,0,0,w,340);const fade=c.createLinearGradient(0,265,0,370);fade.addColorStop(0,'rgba(255,248,230,0)');fade.addColorStop(1,'rgba(255,248,230,.96)');c.fillStyle=fade;c.fillRect(0,265,w,105);c.restore()}
    // Side strings and pendulum bells; the middle stays open for editable wording.
    for(let side=0;side<2;side++){let x=side?675:45,dir=side?-1:1;c.strokeStyle='rgba(132,86,36,.75)';c.lineWidth=2;c.beginPath();c.moveTo(x,70);c.quadraticCurveTo(x+dir*15,420,x,880);c.stroke();for(let k=0;k<21;k++){let y=90+k*36;flower(c,x+Math.sin(k*.65+t*.35)*4,y,6,k%3?'#e9b834':'#c93d36',t,k)}for(let b=0;b<4;b++){let y=310+b*145;c.save();c.translate(x,y);c.rotate(Math.sin(t*1.3+b+side)*.08);c.fillStyle='#c99d4d';c.strokeStyle='#855d2e';c.beginPath();c.moveTo(-8,0);c.quadraticCurveTo(-7,15,0,17);c.quadraticCurveTo(7,15,8,0);c.closePath();c.fill();c.stroke();c.restore()}}
    // Printed rosette fans midway down the edges.
    for(let side=0;side<2;side++)for(let f=0;f<2;f++){let x=side?673:47,y=780+f*115;c.save();c.translate(x,y);for(let k=0;k<16;k++){c.rotate(Math.PI/8);c.fillStyle=k%2?'#d73b26':'#ed9d21';c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(26,-28,0,-52);c.quadraticCurveTo(-26,-28,0,0);c.fill()}c.fillStyle='#744a2d';c.beginPath();c.arc(0,0,8,0,7);c.fill();c.restore()}
    // Quiet ivory center remains available to carry the scene typography.
    const glow=c.createRadialGradient(360,700,25,360,700,405);glow.addColorStop(0,'rgba(255,250,227,.84)');glow.addColorStop(1,'rgba(255,246,218,0)');c.fillStyle=glow;c.fillRect(80,390,560,640);
    // Lush garden, layered marigolds and peacocks at the bottom.
    c.fillStyle='#56773a';c.beginPath();c.moveTo(0,1200);for(let i=0;i<20;i++)c.quadraticCurveTo(i*40+15,1090+(i%3)*30,(i+1)*40,1200);c.lineTo(720,1280);c.lineTo(0,1280);c.fill();
    if(im.peacock){c.save();c.translate(360,1158);c.scale(1+Math.sin(t*.6)*.006,1);c.drawImage(im.peacock,-160,-77,320,150);c.restore()}
    for(let i=0;i<37;i++){let x=14+i*19,y=1194+Math.sin(i*1.7+t*.7)*14;flower(c,x,y,10+i%5,['#f1bd28','#eb7c1f','#dd4936','#f5d355'][i%4],t,i);c.strokeStyle='#577b39';c.lineWidth=3;c.beginPath();c.moveTo(x,1265);c.quadraticCurveTo(x-7,1220,x+Math.sin(t+i)*5,y+10);c.stroke()}
    [[44,44,1,1],[676,44,-1,1],[44,1236,1,-1],[676,1236,-1,-1]].forEach(([x,y,sx,sy])=>{c.save();c.translate(x,y);c.scale(sx,sy);c.strokeStyle='#a87736';c.lineWidth=2;c.beginPath();c.moveTo(0,45);c.lineTo(0,0);c.lineTo(45,0);c.quadraticCurveTo(8,8,5,38);c.stroke();c.restore()});
  }
  window.WeddingDecorations={drawFrame,flower};
})();
