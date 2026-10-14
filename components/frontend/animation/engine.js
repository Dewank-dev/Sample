(() => {
  class WeddingEngine {
    constructor(canvas,data,assets){this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});this.data=data;this.duration=Number(data.duration)||34;this.assets={};this.time=0;this.playing=true;this.last=0;this.audio=null;this.tick=null;this.particles=new window.WeddingParticleField(720,1280,matchMedia('(max-width:700px)').matches?24:44);Object.entries(assets||{}).forEach(([k,src])=>{if(src){let im=new Image();im.onload=()=>this.assets[k]=im;im.src=src}});canvas.width=720;canvas.height=1280;this.loop=this.loop.bind(this);this.raf=requestAnimationFrame(this.loop)}
    setData(d){this.data=d;this.duration=Number(d.duration)||34}setAudio(a){this.audio=a}play(){this.playing=true;this.last=0}pause(){this.playing=false}restart(){this.time=0;this.playing=true;this.last=0;if(this.audio&&this.audio.src){this.audio.currentTime=0;this.audio.play().catch(()=>{})}}seek(t){this.time=Math.min(this.duration,Math.max(0,t))}
    loop(now){if(this.playing){let dt=this.last?Math.min(.05,(now-this.last)/1000):0;this.time+=dt;if(this.time>=this.duration){this.time=0;if(this.audio&&!this.audio.paused)this.audio.currentTime=0}this.particles.update(dt)}this.last=now;this.draw();if(this.tick)this.tick(this.time,this.playing);this.raf=requestAnimationFrame(this.loop)}
    draw(){let t=this.time*34/this.duration,index=window.WeddingScenes.at(t),c=this.ctx;c.save();let zoom=1.006+Math.sin(t/34*Math.PI*2)*.007;c.translate(360+Math.sin(t*.08)*2,640);c.scale(zoom,zoom);c.translate(-360,-640);window.WeddingDecorations.drawFrame(c,t,this.data,this.assets);this.particles.draw(c,t);if(index===1&&this.assets.ganesha){c.save();c.globalAlpha=Math.min(1,(t-4)/.5);c.drawImage(this.assets.ganesha,322,462,76,76);c.restore()}window.WeddingText.draw(c,t,this.data,index);window.WeddingTransitions.draw(c,t,index,34);c.restore()}
    destroy(){cancelAnimationFrame(this.raf)}
  }
  window.WeddingEngine=WeddingEngine;
})();
