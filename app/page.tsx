import Image from 'next/image';
import { ArrowRight, Check, PaintRoller, ShieldCheck, Sparkles } from 'lucide-react';

const services = [
  { number: '01', title: 'Innenräume', text: 'Wände, Decken und Details – sauber ausgeführt und genau auf Ihren Raum abgestimmt.' },
  { number: '02', title: 'Fassaden', text: 'Langlebiger Schutz und ein stimmiges Erscheinungsbild für Ihr Zuhause oder Gewerbeobjekt.' },
  { number: '03', title: 'Lackierarbeiten', text: 'Türen, Fenster und Oberflächen erhalten ein präzises, widerstandsfähiges Finish.' },
];

const steps = [
  ['Kennenlernen', 'Wir besprechen Ihre Wünsche direkt vor Ort.'],
  ['Klares Angebot', 'Sie erhalten eine nachvollziehbare Planung ohne Überraschungen.'],
  ['Saubere Umsetzung', 'Wir schützen, arbeiten präzise und hinterlassen alles ordentlich.'],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#start" aria-label="Maler Chau Startseite">
          <span className="brand-mark"><PaintRoller size={22} /></span><span>Maler Chau</span>
        </a>
        <nav aria-label="Hauptnavigation">
          <a href="#leistungen">Leistungen</a><a href="#ablauf">Ablauf</a><a href="#kontakt">Kontakt</a>
        </nav>
        <a className="header-cta" href="#kontakt">Projekt anfragen <ArrowRight size={17} /></a>
      </header>

      <section className="hero" id="start">
        <Image src="/malerchau-room.jpg" alt="Heller Raum mit frisch gestrichener blauer Akzentwand und Holzboden" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow"><span /> Handwerk mit Haltung</p>
          <h1>Räume, die<br />sich richtig <em>anfühlen.</em></h1>
          <p className="hero-copy">Hochwertige Malerarbeiten mit klarem Blick fürs Detail – von der ersten Idee bis zum letzten Pinselstrich.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#kontakt">Unverbindlich anfragen <ArrowRight size={18} /></a>
            <a className="text-link" href="#leistungen">Leistungen ansehen</a>
          </div>
        </div>
        <div className="hero-proof">
          <div><ShieldCheck size={22} /><span><strong>Zuverlässig</strong><small>Absprachen, die halten</small></span></div>
          <div><Sparkles size={22} /><span><strong>Sauber</strong><small>Bis ins kleinste Detail</small></span></div>
        </div>
      </section>

      <section className="section services" id="leistungen">
        <div className="section-intro">
          <p className="eyebrow dark"><span /> Was wir machen</p>
          <h2>Gutes Handwerk<br />sieht man. <em>Und spürt man.</em></h2>
        </div>
        <p className="section-lead">Wir verbinden Erfahrung mit einem sicheren Gespür für Farbe, Material und Raum. Das Ergebnis: Oberflächen, die lange Freude machen.</p>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span className="service-number">{service.number}</span><div className="service-icon"><PaintRoller size={23} /></div>
              <h3>{service.title}</h3><p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="quality-band">
        <div className="quality-quote"><span className="quote-mark">“</span><p>Präzision ist für uns kein Extra. Sie ist die Grundlage unserer Arbeit.</p></div>
        <div className="quality-list">
          {['Sorgfältige Vorbereitung', 'Hochwertige Materialien', 'Transparente Kommunikation', 'Termintreue Ausführung'].map((item) => (
            <div key={item}><span><Check size={15} /></span>{item}</div>
          ))}
        </div>
      </section>

      <section className="section process" id="ablauf">
        <div className="section-intro"><p className="eyebrow dark"><span /> So läuft es</p><h2>Einfach. Klar.<br /><em>Persönlich.</em></h2></div>
        <div className="steps">
          {steps.map(([title, copy], index) => (
            <article className="step" key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="contact" id="kontakt">
        <div><p className="eyebrow"><span /> Ihr Projekt</p><h2>Bereit für<br />frische <em>Farbe?</em></h2></div>
        <div className="contact-copy">
          <p>Erzählen Sie uns kurz, was Sie vorhaben. Wir melden uns persönlich und besprechen die nächsten Schritte.</p>
          <a className="button button-light" href="mailto:?subject=Projektanfrage%20an%20Maler%20Chau">Projekt anfragen <ArrowRight size={18} /></a>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#start"><span className="brand-mark"><PaintRoller size={20} /></span><span>Maler Chau</span></a>
        <p>Saubere Arbeit. Schöne Räume.</p><p>© {new Date().getFullYear()} Maler Chau</p>
      </footer>
    </main>
  );
}
