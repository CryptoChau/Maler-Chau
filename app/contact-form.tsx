'use client';
import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { business } from './site-content';

export function ContactForm() {
  const [draft, setDraft] = useState('');
  function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields = [['name','Name'],['phone','Telefon'],['email','E-Mail'],['location','PLZ / Ort'],['work','Gewünschte Arbeiten'],['rooms','Anzahl Zimmer'],['time','Ungefährer Zeitraum']];
    const body = 'Guten Tag Chau,\n\nich möchte eine kostenlose Offerte anfragen.\n\n'+fields.map(([key,label])=>label+': '+String(data.get(key)||'Keine Angabe').trim()).join('\n')+'\n\nFotos füge ich bei Bedarf als E-Mail-Anhang hinzu.';
    const link = 'mailto:'+business.email+'?subject='+encodeURIComponent('Kostenlose Offerte – '+String(data.get('location')||''))+'&body='+encodeURIComponent(body);
    setDraft(link);
    window.location.href = link;
  }
  return <form className="quote-form" onSubmit={submit}>
    <h3>Kostenlose Offerte anfragen</h3>
    <p className="form-note">Das Formular bereitet Ihre E-Mail vor. Sie prüfen und senden sie anschliessend in Ihrem E-Mail-Programm.</p>
    <div className="form-grid">
      <label htmlFor="name">Name *<Input id="name" name="name" autoComplete="name" required maxLength={100}/></label>
      <label htmlFor="phone">Telefonnummer<Input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40}/></label>
      <label htmlFor="email">E-Mail *<Input id="email" name="email" type="email" autoComplete="email" required maxLength={150}/></label>
      <label htmlFor="location">PLZ / Ort *<Input id="location" name="location" autoComplete="address-level2" required maxLength={100}/></label>
      <label className="full" htmlFor="work">Was soll gemacht werden? *<Textarea id="work" name="work" rows={4} required maxLength={1500} placeholder="Zum Beispiel: Wände und Decke in zwei Zimmern streichen, kleine Bohrlöcher ausbessern."/></label>
      <label htmlFor="rooms">Anzahl Zimmer<Input id="rooms" name="rooms" type="number" min={0} max={100} step={1}/></label>
      <label htmlFor="time">Ungefährer Zeitraum<Input id="time" name="time" maxLength={100} placeholder="Zum Beispiel: im November"/></label>
    </div>
    <div className="photo-note" id="fotos"><strong>Fotos helfen bei der Einschätzung.</strong><p>Bitte hängen Sie Ihre Bilder an die E-Mail an. Ein direkter Foto-Upload auf der Website ist noch nicht verfügbar.</p></div>
    <button className="button" type="submit">Kostenlose Offerte anfragen</button>
    <p className="form-note">* Pflichtfelder. Ihre Angaben werden hier weder gespeichert noch automatisch versendet.</p>
    {draft && <p role="status" className="draft-status">Ihre Anfrage ist vorbereitet, aber noch nicht versendet. <a href={draft}>E-Mail-Entwurf erneut öffnen</a> oder direkt an <a href={'mailto:'+business.email}>{business.email}</a> schreiben.</p>}
    <noscript><p>Bitte senden Sie Ihre Anfrage direkt an <a href={'mailto:'+business.email}>{business.email}</a>.</p></noscript>
  </form>;
}

