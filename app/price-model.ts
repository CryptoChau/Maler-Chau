export type PriceInput = { rooms:number; floor:number; wall:number|null; ceilings:boolean; ceilingArea?:number|null; doors:number; windows1?:number; windows2?:number; windows3?:number; condition:'good'|'light'|'full'|'damaged'; furnished:boolean; colored:boolean };
export function estimatePrice(i:PriceInput) {
  const counts=[i.doors,i.windows1??0,i.windows2??0,i.windows3??0];
  if (counts.some(n=>!Number.isInteger(n)||n<0||n>30) || !Number.isFinite(i.floor) || i.floor<0 || i.floor>500 || (i.wall!==null&&(!Number.isFinite(i.wall)||i.wall<0||i.wall>2000)) || (i.ceilingArea!=null&&(!Number.isFinite(i.ceilingArea)||i.ceilingArea<0||i.ceilingArea>500))) return null;
  const autoWall=i.wall===null&&i.floor>0;
  if(autoWall&&(!Number.isInteger(i.rooms)||i.rooms<1||i.rooms>20))return null;
  const wall=i.wall??(autoWall?Math.round(4*Math.sqrt(i.floor/i.rooms)*2.5*i.rooms*.85):0);
  const ceiling=i.ceilings?(i.ceilingArea??i.floor):0;
  if(i.ceilings&&ceiling<=0)return null;
  if(wall+ceiling===0&&counts.every(n=>n===0))return null;
  if(i.condition==='damaged'&&wall+ceiling>0)return {manual:true as const,wall,ceiling,autoWall};
  const wallRate=i.condition==='full'?[35,65]:i.condition==='light'?[18,30]:[15,25];
  const lines=[
    {label:'Wände',low:wall*(wallRate[0]+(i.colored?3:0)),high:wall*(wallRate[1]+(i.colored?5:0))},
    {label:'Decken (weiss)',low:ceiling*18,high:ceiling*28},
    {label:'Türen mit Zarge',low:i.doors*220,high:i.doors*400},
    {label:'Fenster innen · 1 Flügel',low:counts[1]*105,high:counts[1]*160},
    {label:'Fenster innen · 2 Flügel',low:counts[2]*170,high:counts[2]*255},
    {label:'Fenster innen · 3 Flügel',low:counts[3]*215,high:counts[3]*325},
  ];
  const subtotal=lines.reduce((s,r)=>({low:s.low+r.low,high:s.high+r.high}),{low:0,high:0});
  if(i.furnished)lines.push({label:'Reserve für möblierte Räume',low:subtotal.low*.1,high:subtotal.high*.2});
  const net=lines.reduce((s,r)=>({low:s.low+r.low,high:s.high+r.high}),{low:0,high:0});
  lines.push({label:'MWST-Budgetreserve (8,1 %)',low:net.low*.081,high:net.high*.081});
  return {manual:false as const,wall,ceiling,autoWall,lines,low:Math.floor(net.low*1.081/10)*10,high:Math.ceil(net.high*1.081/10)*10};
}

