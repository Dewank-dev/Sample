(() => {
  const lengths=[4,4,3,3,3,3,3,5,6], titles=['Opening','Wedding introduction','Mangalik Karyakram','Haldi','Mehendi','Sangeet','Baraat','Vivah / Phere','Final blessings'];
  window.WeddingScenes={duration:34,list:lengths.map((length,i)=>({start:lengths.slice(0,i).reduce((a,b)=>a+b,0),length,title:titles[i]})),at(t){return this.list.findIndex(s=>t<s.start+s.length);}};
})();
