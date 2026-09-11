'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { estimatePrice, type PriceInput } from './price-model';
import { business } from './site-content';
import './price-calculator.css';
const money=(n:number)=>new Intl.NumberFormat('de-CH',{maximumFractionDigits:0}).format(n);
export function PriceCalculator(){
  const [rooms,setRooms]=useState('1'),[floor,setFloor]=useState('20'),[wall,setWall]=useState(''),[doors,setDoors]=useState('0');
  const [ceilings,setCeilings]=useState(true),[furnished,setFurnished]=useState(false),[colored,setColored]=useState(false);
  const [condition,setCondition]=useState<PriceInput['condition']>('good');
  const parsed = [rooms,floor,doors].every(s=>s.trim()!=='');
  const result=parsed?estimatePrice({rooms:Number(rooms),floor:Number(floor),wall:wall.trim()===''?null:Number(wall),doors:Number(doors),ceilings,furnished,colored,condition}):null;
  const range=result&&!result.manual?'CHF '+money(result.low)+'–'+money(result.high):'Individuelle Einschätzung';
  const summary=result ? ['Guten Tag Chau,','ich möchte eine kostenlose Offerte zu dieser Budgetschätzung anfragen.','Zimmer: '+rooms,'Bodenfläche: '+floor+' m²','Wandfläche: '+result.wall+' m²'+(wall.trim()===''?' (geschätzt)':''),'Decken: '+result.ceiling+' m²','Türen mit Zarge: '+doors,'Vorbereitung: '+({good:'normaler Untergrund',light:'leichte Ausbesserungen und Grundierung',full:'Wände vollflächig spachteln und streichen',damaged:'starke Schäden / Feuchtigkeit / Nikotin'}[condition]),'Wände farbig: '+(colored?'ja':'nein'),'Möbliert: '+(furnished?'ja':'nein'),'Unverbindliches Planungsbudget: '+range,'Bitte prüfen Sie den tatsächlichen Aufwand.','Mein Ort:','Gewünschter Zeitraum:','Fotos füge ich dieser E-Mail bei.'].join('\n') : '';
  const mail='mailto:'+business.email+'?subject='+encodeURIComponent('Offertanfrage mit Preisrechner')+'&body='+encodeURIComponent(summary);
  return <section className="section price-calculator" id="kosten" aria-labelledby="price-heading">
    <div className="price-heading"><p className="eyebrow">Erste Orientierung · Schweizer Richtpreise</p><h2 id="price-heading">Was kostet mein Malerprojekt?</h2><p>Geben Sie die Räume an, die Sie renovieren möchten. Sie sehen sofort eine unverbindliche Kostenspanne in Schweizer Franken.</p></div>
    <div className="price-layout">
      <div className="price-fields">
        <div className="price-input-grid">
          <label htmlFor="calc-rooms">Anzahl Zimmer<Input id="calc-rooms" type="number" min="1" max="20" step="1" value={rooms} onChange={e=>setRooms(e.target.value)}/></label>
          <label htmlFor="calc-floor">Bodenfläche gesamt (m²)<Input id="calc-floor" type="number" min="1" max="500" step="0.1" value={floor} onChange={e=>setFloor(e.target.value)}/></label>
          <label htmlFor="calc-wall">Wandfläche (m²), falls bekannt<Input id="calc-wall" type="number" min="0" max="2000" step="0.1" value={wall} placeholder="Automatisch schätzen" onChange={e=>setWall(e.target.value)} aria-describedby="wall-help"/></label>
          <label htmlFor="calc-doors">Türen inklusive Zarge<Input id="calc-doors" type="number" min="0" max="30" step="1" value={doors} onChange={e=>setDoors(e.target.value)}/></label>
        </div>
        <p id="wall-help" className="price-note">Ohne Wandmass schätze ich mit gleich grossen, quadratischen Zimmern, 2,5 m Höhe und 15 % Abzug für Öffnungen. Gemessene Wandflächen sind genauer.</p>
        <label id="calc-condition-label" className="price-field-label">Zustand & gewünschte Vorbereitung</label>
        <Select value={condition} onValueChange={value=>{if(value)setCondition(value as PriceInput['condition']);}}>
          <SelectTrigger aria-labelledby="calc-condition-label" className="price-select"><SelectValue>{({good:'Gut – nur streichen',light:'Kleine Schäden – ausbessern & grundieren',full:'Wände vollflächig spachteln & streichen',damaged:'Starke Schäden, Feuchtigkeit oder Nikotin'}[condition])}</SelectValue></SelectTrigger>
          <SelectContent className="price-options">{Object.entries({good:'Gut – nur streichen',light:'Kleine Schäden – ausbessern & grundieren',full:'Wände vollflächig spachteln & streichen',damaged:'Starke Schäden, Feuchtigkeit oder Nikotin'}).map(([value,label])=><SelectItem key={value} value={value}>{label}</SelectItem>)}</SelectContent>
        </Select>
        <div className="price-toggles">
          <label htmlFor="calc-ceiling"><span>Decken weiss streichen<small>Deckenfläche entspricht der Bodenfläche.</small></span><Switch id="calc-ceiling" checked={ceilings} onCheckedChange={setCeilings}/></label>
          <label htmlFor="calc-color"><span>Wände farbig streichen<small>Standardfarbton, keine Spezialtechnik.</small></span><Switch id="calc-color" checked={colored} onCheckedChange={setColored}/></label>
          <label htmlFor="calc-furniture"><span>Räume sind möbliert<small>Zusätzliche Budgetreserve für Abdecken und Zugang.</small></span><Switch id="calc-furniture" checked={furnished} onCheckedChange={setFurnished}/></label>
        </div>
      </div>
      <div className="price-result">
        <div role="status" aria-live="polite" aria-atomic="true"><p className="eyebrow">Ihr geschätztes Budget</p><p className="price-total">{result?range:'Bitte Angaben prüfen'}</p></div>
        {!result?<p>Bitte gültige Werte eingeben: 1–20 Zimmer, 1–500 m² Bodenfläche, 0–2’000 m² Wandfläche und 0–30 Türen.</p>:result.manual?<p>Bei Kleinaufträgen unter 20 m² ohne Türen oder stark beschädigten Untergründen ist eine persönliche Einschätzung sinnvoll. Senden Sie mir ein paar Fotos.</p>:<>
          <p className="price-note">Für {result.wall} m² Wände{result.ceiling>0?' und '+result.ceiling+' m² Decken':''}. {wall.trim()===''?'Wandfläche automatisch geschätzt.':''}</p>
          <dl className="price-breakdown">{result.lines.filter(r=>r.high>0).map(r=><div key={r.label}><dt>{r.label}</dt><dd>CHF {money(r.low)}–{money(r.high)}</dd></div>)}</dl>
          <p className="price-note">Gesamtspanne nach aussen auf CHF 50 gerundet. Zur Budgetplanung mit 8,1 % MWST-Reserve; die definitive Steuerangabe erfolgt in der Offerte.</p>
        </>}
        <p className="price-disclaimer">Diese Berechnung ist unverbindlich und ersetzt keine individuelle Offerte.</p>
        {result&&<a className="button" href={mail}>Schätzung per E-Mail anfragen</a>}
        <a className="secondary" href="#kontakt">Zum Kontaktformular</a>
        <p className="price-note">Der E-Mail-Entwurf enthält Ihre Auswahl. Fotos können Sie dort anhängen. Es wird nichts automatisch versendet.</p>
      </div>
    </div>
    <details className="price-method"><summary>Preisgrundlagen & enthaltene Annahmen</summary>
      <p>Orientierung an veröffentlichten Schweizer Anbieterpreisen, abgerufen am 11. September 2026. Kein verbindlicher Tarif von Maler Chau. Wände weiss CHF 15–25/m², Decken weiss CHF 18–28/m², farbige Wände zusätzlich CHF 3–5/m². Leichte Ausbesserungen und Grundierung: Wände insgesamt CHF 18–30/m². Vollflächiges Spachteln der Wände zusätzlich CHF 20–40/m² zum Anstrich. Türen mit Zarge CHF 220–400/Stück.</p>
      <p>Rechnerannahmen: Standardmaterial und übliche Abdeckarbeiten im Budget berücksichtigt. Bei Möblierung werden 10–20 % Reserve ergänzt; dies ist eine Planungsannahme, kein erhobener Schweizer Durchschnitt. Decken werden mit normalem Untergrund gerechnet. Spezialfarben, Tapetenentfernung, Schimmel, Gerüste, aufwendige Reparaturen, Räumungen und besondere Anfahrten sind nicht enthalten.</p>
      <p>Quellen: <a href="https://www.malermathias.ch/maler-preise" target="_blank" rel="noreferrer">Maler Mathias – Richtpreise</a>, <a href="https://ttbischoff.ch/preise/" target="_blank" rel="noreferrer">T&T Bischoff – Preisübersicht</a>, <a href="https://www.estv.admin.ch/de/mwst-steuersaetze-schweiz" target="_blank" rel="noreferrer">ESTV – MWST-Satz</a>.</p>
    </details>
    <noscript><p>Für den Rechner bitte JavaScript aktivieren oder direkt an <a href={'mailto:'+business.email}>{business.email}</a> schreiben.</p></noscript>
  </section>;
}

