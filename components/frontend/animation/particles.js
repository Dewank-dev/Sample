(() => {
  class ParticleField {
    constructor(w,h,count=42){this.w=w;this.h=h;const r=()=>Math.random();this.petals=Array.from({length:count},()=>this.petal(true));this.glows=Array.from({length:28},()=>({x:r()*w,y:r()*h,r:1+r()*2,p:r()*7,s:.2+r()*.6}));this.butterflies=Array.from({length:4},(_,i)=>({x:100+i*160,y:600+(i%2)*160,p:i*2,c:['#d36758','#dfa93d','#ba5a6d','#e6c86d'][i]}));}
    petal(full=false){return{x:Math.random()*this.w,y:full?Math.random()*this.h:-10,v:18+Math.random()*30,a:Math.random()*6,spin:-1+Math.random()*2,alpha:.35+Math.random()*.5,scale:.5+Math.random()*.8};}
    update(dt){this.petals.forEach((p,i)=>{p.y+=p.v*dt;p.x+=Math.sin(p.y/130)*7*dt;p.a+=p.spin*dt;if(p.y>this.h+20)this.petals[i]=this.petal();});}
    draw(c,t){this.glows.forEach(p=>{c.globalAlpha=.1+.2*(1+Math.sin(t*p.s+p.p))/2;c.fillStyle='#f3c462';c.shadowColor='#f3bd4e';c.shadowBlur=12;c.beginPath();c.arc(p.x,(p.y-t*7*p.s+this.h*2)%this.h,p.r,0,7);c.fill();});c.shadowBlur=0;this.petals.forEach(p=>{c.save();c.translate(p.x,p.y);c.rotate(p.a);c.globalAlpha=p.alpha;c.fillStyle=['#dfaa57','#d27160','#e8c76a'][Math.floor(p.x+p.y)%3];c.beginPath();c.ellipse(0,0,3*p.scale,6*p.scale,0,0,7);c.fill();c.restore();});this.butterflies.forEach(b=>{c.save();c.translate(b.x+Math.sin(t*.5+b.p)*30,b.y+Math.sin(t*.8+b.p)*20);c.fillStyle=b.c;let f=2+Math.abs(Math.sin(t*9+b.p))*3;c.beginPath();c.ellipse(-3,0,4,f,-.3,0,7);c.ellipse(3,0,4,f,.3,0,7);c.fill();c.restore();});c.globalAlpha=1;}
  }
  window.WeddingParticleField=ParticleField;
})();
