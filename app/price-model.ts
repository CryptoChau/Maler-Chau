export type PriceInput = { rooms:number; floor:number; wall:number|null; ceilings:boolean; doors:number; condition:'good'|'light'|'full'|'damaged'; furnished:boolean; colored:boolean };
export const priceRates = { wall:[15,25], ceiling:[18,28], door:[220,400], fullFill:[20,40], vat:0.081 } as const;
export function estimatePrice(i:PriceInput) {
  if (![i.rooms,i.floor,i.doors].every(Number.isFinite) || !Number.isInteger(i.rooms) || i.rooms<1 || i.rooms>20 || i.floor<1 || i.floor>500 || !Number.isInteger(i.doors) || i.doors<0 || i.doors>30 || (i.wall!==null && (!Number.isFinite(i.wall) || i.wall<0 || i.wall>2000))) return null;
  const wall = i.wall ?? Math.round(4 * Math.sqrt(i.floor/i.rooms) * 2.5 * i.rooms * .85);
  const ceiling = i.ceilings ? i.floor : 0;
  if (i.condition==='damaged' || (wall+ceiling<20 && i.doors===0)) return {manual:true as const,wall,ceiling};
  const wallRate = i.condition==='full' ? [35,65] : i.condition==='light' ? [18,30] : [15,25];
  const lines = [
    {label:'Wände',low:wall*(wallRate[0]+(i.colored?3:0)),high:wall*(wallRate[1]+(i.colored?5:0))},
    {label:'Decken (weiss)',low:ceiling*18,high:ceiling*28},
    {label:'Türen mit Zarge',low:i.doors*220,high:i.doors*400},
  ];
  const subtotal=lines.reduce((s,r)=>({low:s.low+r.low,high:s.high+r.high}),{low:0,high:0});
  if(i.furnished) lines.push({label:'Reserve für möblierte Räume',low:subtotal.low*.1,high:subtotal.high*.2});
  const net=lines.reduce((s,r)=>({low:s.low+r.low,high:s.high+r.high}),{low:0,high:0});
  const tax={label:'MWST-Budgetreserve (8,1 %)',low:net.low*.081,high:net.high*.081};
  lines.push(tax);
  return {manual:false as const,wall,ceiling,lines,low:Math.floor(net.low*1.081/50)*50,high:Math.ceil(net.high*1.081/50)*50};
}

