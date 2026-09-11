'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { estimatePrice, type PriceInput } from './price-model';
import { business } from './site-content';
import './price-calculator.css';
const money=(n:number)=>Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '’');
export function PriceCalculator(){
  const [rooms,setRooms]=useState('1'),[floor,setFloor]=useState(''),[wall,setWall]=useState(''),[doors,setDoors]=useState('');
  const [windowLeaves,setWindowLeaves]=useState(''),[facade,setFacade]=useState(''),[ceilingArea,setCeilingArea]=useState('');
  const [ceilings,setCeilings]=useState(false),[furnished,setFurnished]=useState(false),[colored,setColored]=useState(false);
  const [condition,setCondition]=useState<PriceInput['condition']>('good');
  const result=estimatePrice({rooms:Number(rooms),floor:Number(floor),wall:wall.trim()===''?null:Number(wall),doors:Number(doors),windowLeaves:Number(windowLeaves),facade:Number(facade),ceilingArea:!ceilings||ceilingArea.trim()===''?null:Number(ceilingArea),ceilings,furnished,colored,condition});
  const ceilingPending=ceilings && Number(ceilingArea || floor)<=0;
  const range=result&&!result.manual?'CHF '+money(result.low)+'–'+money(result.high):'Individuelle Einschätzung';
  const summary=result ? ['Guten Tag Chau,','ich möchte eine kostenlose Offerte zu dieser Budgetschätzung anfragen.','Zimmer: '+rooms,'Bodenfläche: '+(floor||'nicht angegeben')+' m²','Wandfläche: '+result.wall+' m²'+(result.autoWall?' (geschätzt)':''),'Decken: '+(ceilingPending?'gewünscht, Fläche noch offen / nicht im Budget enthalten':result.ceiling+' m²'),'Türen mit Zarge: '+(doors||'0'),'Fensterflügel innen: '+(windowLeaves||'0'),'Fassadenfläche: '+(facade||'0')+' m² (Anstrich ohne Gerüst und Sanierung)','Vorbereitung: '+({good:'normaler Untergrund',light:'leichte Ausbesserungen und Grundierung',full:'Wände vollflächig spachteln und streichen',damaged:'starke Schäden / Feuchtigkeit / Nikotin'}[condition]),'Wände farbig: '+(colored?'ja':'nein'),'Möbliert: '+(furnished?'ja':'nein'),'Unverbindliches Planungsbudget: '+range,'Bitte prüfen Sie den tatsächlichen Aufwand.','Mein Ort:','Gewünschter Zeitraum:','Fotos füge ich dieser E-Mail bei.'].join('\n') : '';
  const mail='mailto:'+business.email+'?subject='+encodeURIComponent('Offertanfrage mit Preisrechner')+'&body='+encodeURIComponent(summary);
  return <section className="section price-calculator" id="kosten" aria-labelledby="price-heading">
    <div className="price-heading"><p className="eyebrow">Erste Orientierung · Schweizer Richtpreise</p><h2 id="price-heading">Was kostet mein Malerprojekt?</h2><p>Tragen Sie nur die gewünschten Arbeiten ein. Wandfläche, Decke, Türen, Fensterflügel und Fassade lassen sich einzeln oder gemeinsam berechnen. Sie sehen sofort eine unverbindliche Kostenspanne in Schweizer Franken.</p></div>
    <div className="price-layout">
      <div className="price-fields">
        <div className="price-input-grid">
          <label htmlFor="calc-rooms">Zimmer (nur für Flächenschätzung)<Input id="calc-rooms" type="number" min="1" max="20" step="1" value={rooms} onChange={e=>setRooms(e.target.value)}/></label>
          <label htmlFor="calc-floor">Bodenfläche (m²), optional<Input id="calc-floor" type="number" min="0" max="500" step="0.1" value={floor} onChange={e=>setFloor(e.target.value)}/></label>
          <label htmlFor="calc-wall">Wandfläche (m²)<Input id="calc-wall" type="number" min="0" max="2000" step="0.1" value={wall} placeholder="Fläche eintragen" onChange={e=>setWall(e.target.value)} aria-describedby="wall-help"/></label>
          <label htmlFor="calc-doors">Türen inklusive Zarge<Input id="calc-doors" type="number" min="0" max="30" step="1" value={doors} onChange={e=>setDoors(e.target.value)}/></label>
        </div>
        <div className="price-input-grid" style={{marginTop:22}}>
          <label htmlFor="calc-window-leaves">Anzahl Fensterflügel<Input id="calc-window-leaves" type="number" min="0" max="30" step="1" value={windowLeaves} placeholder="0" onChange={e=>setWindowLeaves(e.target.value)} aria-describedby="window-help"/></label>
          <label htmlFor="calc-facade">Fassadenfläche (m²)<Input id="calc-facade" type="number" min="0" max="2000" step="0.1" value={facade} placeholder="0" onChange={e=>setFacade(e.target.value)} aria-describedby="facade-help"/></label>
        </div>
        <p id="window-help" className="price-note">Alle zu streichenden Fensterflügel zusammenzählen. Ein zweiflügliges Fenster zählt als 2. Ansatz für Holzfenster innen, normale Grösse und normaler Zustand.</p>
        <p id="facade-help" className="price-note">Fassade: tatsächlich zu streichende Fläche nach Abzug von Fenstern und Türen. CHF 25–45/m² für einfachen Anstrich auf tragfähigem Untergrund. Ohne Gerüst, Hebebühne, Reinigung, Risssanierung und besondere Grundierung.</p>
        <p id="wall-help" className="price-note">Eine Wandfläche genügt – Bodenfläche ist optional. Nur mit Bodenfläche und leerem Wandfeld wird die Wandfläche geschätzt: quadratische Zimmer, 2,5 m Höhe, 15 % Abzug für Öffnungen. Für reine Deckenarbeiten Wandfläche auf 0 setzen.</p>
        <label id="calc-condition-label" className="price-field-label">Wände: Zustand & Vorbereitung</label>
        <Select value={condition} onValueChange={value=>{if(value)setCondition(value as PriceInput['condition']);}}>
          <SelectTrigger aria-labelledby="calc-condition-label" className="price-select"><SelectValue>{({good:'Gut – nur streichen',light:'Kleine Schäden – ausbessern & grundieren',full:'Wände vollflächig spachteln & streichen',damaged:'Starke Schäden, Feuchtigkeit oder Nikotin'}[condition])}</SelectValue></SelectTrigger>
          <SelectContent className="price-options">{Object.entries({good:'Gut – nur streichen',light:'Kleine Schäden – ausbessern & grundieren',full:'Wände vollflächig spachteln & streichen',damaged:'Starke Schäden, Feuchtigkeit oder Nikotin'}).map(([value,label])=><SelectItem key={value} value={value}>{label}</SelectItem>)}</SelectContent>
        </Select>
        <div className="price-toggles">
          <label htmlFor="calc-ceiling"><span>Decken weiss streichen<small>Eigene Deckenfläche eingeben oder vorhandene Bodenfläche verwenden.</small></span><Switch id="calc-ceiling" checked={ceilings} onCheckedChange={setCeilings}/></label>
          {ceilings&&<label htmlFor="calc-ceiling-area">Deckenfläche (m²)<Input id="calc-ceiling-area" type="number" min="0" max="500" step="0.1" value={ceilingArea} placeholder="Alternativ Bodenfläche verwenden" onChange={e=>setCeilingArea(e.target.value)}/></label>}
          <label htmlFor="calc-color"><span>Wände farbig streichen<small>Standardfarbton, keine Spezialtechnik.</small></span><Switch id="calc-color" checked={colored} onCheckedChange={setColored}/></label>
          <label htmlFor="calc-furniture"><span>Räume sind möbliert<small>Zusätzliche Budgetreserve für Abdecken und Zugang.</small></span><Switch id="calc-furniture" checked={furnished} onCheckedChange={setFurnished}/></label>
        </div>
      </div>
      <div className="price-result">
        <div role="status" aria-live="polite" aria-atomic="true"><p className="eyebrow">Ihr geschätztes Budget</p><p className="price-total">{result?range:'Menge oder Fläche eingeben'}</p></div>
        {!result?<p>Mindestens eine Fläche oder Stückzahl eingeben. Bodenfläche ist nicht erforderlich. Zulässig: bis 2’000 m² Wand-/Fassadenfläche, bis 500 m² Boden-/Deckenfläche und je 0–30 Türen/Fensterflügel. Bei aktivierten Decken bitte Decken- oder Bodenfläche angeben.</p>:result.manual?<p>Stark beschädigte Wand- oder Deckenflächen benötigen eine persönliche Einschätzung. Senden Sie mir ein paar Fotos.</p>:<>
          <p className="price-note">{result.wall>0?result.wall+' m² Wände. ':''}{result.ceiling>0?result.ceiling+' m² Decken. ':''}{result.facade>0?result.facade+' m² Fassade. ':''}{result.autoWall?'Wandfläche automatisch geschätzt.':''} Nur eingetragene Arbeiten werden berechnet.</p>
          <dl className="price-breakdown">{result.lines.filter(r=>r.high>0).map(r=><div key={r.label}><dt>{r.label}</dt><dd>CHF {money(r.low)}–{money(r.high)}</dd></div>)}</dl>
          <p className="price-note">Gesamtspanne nach aussen auf CHF 10 gerundet. Zur Budgetplanung mit 8,1 % MWST-Reserve; die definitive Steuerangabe erfolgt in der Offerte.</p>
        </>}
        {Number(facade)>0&&<p className="price-note"><strong>Fassade: nur Anstrich kalkuliert.</strong> Gerüst, Reinigung und Sanierung kommen bei Bedarf hinzu und werden nach Besichtigung separat offeriert.</p>}
        {ceilingPending&&<p className="price-note"><strong>Deckenfläche noch offen.</strong> Der angezeigte Preis enthält weiterhin Ihre übrigen Arbeiten. Bitte Deckenfläche oder Bodenfläche eintragen, damit der Deckenanstrich dazukommt (CHF 18–28/m²).</p>}
        <p className="price-disclaimer">Diese Berechnung ist unverbindlich und ersetzt keine individuelle Offerte.</p>
        <p className="price-note">Bei kleinen Einzelaufträgen kann zusätzlicher Mindestaufwand für Anfahrt und Einrichtung hinzukommen. Fensterpreise gelten für Holzfenster innen in normalem Zustand.</p>
        {result&&<a className="button" href={mail}>Schätzung per E-Mail anfragen</a>}
        <a className="secondary" href="#kontakt">Zum Kontaktformular</a>
        <p className="price-note">Der E-Mail-Entwurf enthält Ihre Auswahl. Fotos können Sie dort anhängen. Es wird nichts automatisch versendet.</p>
      </div>
    </div>
    <details className="price-method"><summary>Preisgrundlagen & enthaltene Annahmen</summary>
      <p>Orientierung an veröffentlichten Schweizer Anbieterpreisen, abgerufen am 11. September 2026. Kein verbindlicher Tarif von Maler Chau. Wände weiss CHF 15–25/m², Decken weiss CHF 18–28/m², farbige Wände zusätzlich CHF 3–5/m². Leichte Ausbesserungen und Grundierung: Wände insgesamt CHF 18–30/m². Vollflächiges Spachteln der Wände zusätzlich CHF 20–40/m² zum Anstrich. Türen mit Zarge CHF 220–400/Stück. Fenster innen: vereinfachter Ansatz CHF 105–160 pro Flügel. Grundlage ist der Einflügelpreis von New Colour mit rund 50 % eigener oberer Budgetreserve; bei mehreren Flügeln ist dies eine lineare Rechnerannahme, kein veröffentlichter Mehrflügeltarif. Fassadenanstrich CHF 25–45/m² nach Maler Mathias, ohne zusätzliche Vorarbeiten oder Gerüst.</p>
      <p>Rechnerannahmen: Standardmaterial und übliche Abdeckarbeiten im Budget berücksichtigt. Bei Möblierung werden auf Innenarbeiten 10–20 % Reserve ergänzt; dies ist eine Planungsannahme, kein erhobener Schweizer Durchschnitt. Decken werden mit normalem Untergrund gerechnet. Spezialfarben, Tapetenentfernung, Schimmel, Gerüste, aufwendige Reparaturen, Räumungen und besondere Anfahrten sind nicht enthalten.</p>
      <p>Quellen: <a href="https://newcolour.ch/angebot" target="_blank" rel="noreferrer">New Colour – Fenster innen</a>, <a href="https://www.malermathias.ch/maler-preise" target="_blank" rel="noreferrer">Maler Mathias – Richtpreise</a>, <a href="https://ttbischoff.ch/preise/" target="_blank" rel="noreferrer">T&T Bischoff – Preisübersicht</a>, <a href="https://www.estv.admin.ch/de/mwst-steuersaetze-schweiz" target="_blank" rel="noreferrer">ESTV – MWST-Satz</a>.</p>
    </details>
    <noscript><p>Für den Rechner bitte JavaScript aktivieren oder direkt an <a href={'mailto:'+business.email}>{business.email}</a> schreiben.</p></noscript>
  </section>;
}
