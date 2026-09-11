import Image from 'next/image';
import { ContactForm } from './contact-form';
import { ScrollStory } from './scroll-story';
import { PriceCalculator } from './price-calculator';
import { business, services, steps, projects, reviews } from './site-content';

export default function Home() {
  const schema = {
    '@context': 'https://schema.org', '@type': 'HousePainter',
    name: 'Maler Chau', url: 'https://malerchau.ch', email: business.email,
    description: 'Persönliche Malerarbeiten von Chau, Maler EFZ mit Berufserfahrung seit 2004.',
    address: { '@type': 'PostalAddress', addressLocality: 'Niedergösgen', addressRegion: 'SO', addressCountry: 'CH' },
    areaServed: business.areas, founder: { '@type': 'Person', name: 'Chau', jobTitle: 'Maler EFZ' }
  };
  return (
    <>
      <a href="#inhalt" className="skip-link">Zum Inhalt</a>
      <header className="header">
        <a href="#start" className="brand-logo" aria-label="Maler Chau Startseite"><Image src="/maler-chau-logo-blue.webp" alt="Maler Chau – Malerarbeiten & Renovationen" width={1254} height={1254} priority unoptimized /></a>
        <nav aria-label="Hauptnavigation"><a href="#leistungen">Leistungen</a><a href="#chau">Über Chau</a><a href="#region">Region</a><a href="#kontakt">Kontakt</a></nav>
        <a className="button compact" href="#kontakt">Offerte anfragen</a>
      </header>
      <main id="inhalt">
        <div id="start"><ScrollStory /></div>
        <section className="story-inquiry section" id="projektanfrage">
          <div><p className="eyebrow">Von der Inspiration zu Ihrem Projekt</p><h2>Was darf ich für Sie verändern?</h2><p>Ein Zimmer, eine Renovation oder ein kleiner Auftrag: Erzählen Sie mir von Ihrem Vorhaben.</p></div>
          <div className="inquiry-actions"><a className="button" href="#kontakt">Kostenlose Offerte anfragen</a><a className="secondary" href={business.photoMail}>Projekt per Foto anfragen ↗</a><p>Fotos, Ort und eine kurze Beschreibung genügen für den ersten Kontakt.</p></div>
        </section>
        <PriceCalculator />
        <div className="trust"><span>Maler EFZ</span><span>Seit 2004 im Beruf</span><span>Schweizer Berufserfahrung</span><span>Direkter Kontakt mit Chau</span></div>
        <section className="section" id="leistungen">
          <div className="section-heading"><div><p className="eyebrow">Was ich für Sie mache</p><h2>Vom einzelnen Zimmer<br />bis zur Renovation.</h2></div><p>Für Ihr Haus, Ihre Wohnung oder eine bevorstehende Übergabe. Ich kümmere mich auch um die kleinen Arbeiten, die lange liegen bleiben.</p></div>
          <div className="services">{services.map((s,i)=><article key={s.title}><span className="number">0{i+1}</span><h3>{s.title}</h3><p>{s.text}</p></article>)}</div>
          <p className="small-job">Ein Zimmer, ein Türrahmen, ein paar Bohrlöcher? <strong>Auch kleinere Aufträge sind willkommen.</strong></p>
        </section>
        <section className="about section" id="chau">
          <div className="experience"><span>Seit</span><strong>2004</strong><p>im Malerberuf.<br />Heute persönlich für Sie<br />als Maler Chau.</p></div>
          <div><p className="eyebrow">Wer hinter Maler Chau steckt</p><h2>Neue Marke.<br />22 Jahre Erfahrung.</h2>
            <p>Ich bin Chau und arbeite seit 2004 im Malerhandwerk. Nach meiner Ausbildung zum Maler EFZ habe ich in verschiedenen Schweizer Malerbetrieben über viele Jahre praktische Erfahrung gesammelt.</p>
            <p>Mit Maler Chau setze ich diese Erfahrung nun für meine eigenen Kunden ein. Von der ersten Anfrage über die Besichtigung bis zur Ausführung haben Sie direkt mit mir zu tun.</p>
            <p>Saubere Vorbereitung, zuverlässige Absprachen und ein ordentlich hinterlassener Arbeitsplatz gehören für mich selbstverständlich dazu.</p>
            <ul className="principles"><li>Persönlicher Ansprechpartner</li><li>Sorgfältige Vorbereitung</li><li>Transparente Offerten</li><li>Saubere Ausführung</li></ul>
          </div>
        </section>
        <section className="section" id="ablauf"><p className="eyebrow">So kommen wir zusammen</p><h2>In vier Schritten<br />zur frisch gestrichenen Wand.</h2><div className="steps">{steps.map((s,i)=><article key={s.title}><span className="number">0{i+1}</span><h3>{s.title}</h3><p>{s.text}</p></article>)}</div></section>
        <section className="region section" id="region"><div><p className="eyebrow">In Ihrer Nähe</p><h2>Von Niedergösgen<br />zu Ihnen nach Hause.</h2><p>Mein Ausgangspunkt ist Niedergösgen SO. Ich übernehme Malerarbeiten in der Region Olten, Aarau, Lenzburg und Zofingen sowie in weiteren Orten in Aargau und Solothurn nach Absprache.</p></div><div className="places">{business.areas.map(a=><span key={a}>{a}</span>)}<p>Ihr Ort ist nicht dabei? Fragen Sie mich gerne an.</p></div></section>
        {projects.length > 0 && <section className="section"><h2>Einblicke in meine Arbeit</h2>{projects.map(p=><article key={p.title}><h3>{p.title}</h3><p>{p.description}</p></article>)}</section>}
        {reviews.length > 0 && <section className="section"><h2>Stimmen meiner Kunden</h2>{reviews.map(r=><blockquote key={r.name}>{r.text}<cite>{r.name}</cite></blockquote>)}</section>}
        <section className="contact section" id="kontakt"><div className="contact-intro"><p className="eyebrow">Ihr Projekt beginnt mit einer Nachricht</p><h2>Erzählen Sie mir,<br />was Sie vorhaben.</h2><p>Fotos, Ihr Ort und eine kurze Beschreibung reichen für den ersten Kontakt. Ich melde mich persönlich bei Ihnen.</p><a className="email" href={'mailto:'+business.email}>{business.email}</a><p>Niedergösgen SO · Aargau & Solothurn</p>{business.phone ? <div className="actions"><a href={'tel:'+business.phone}>Anrufen</a><a href={'https://wa.me/'+business.phone.replace(/\D/g,'')}>WhatsApp</a></div> : <p className="muted">Telefon & WhatsApp folgen. Sie erreichen mich bereits per E-Mail.</p>}<a className="secondary" href={business.photoMail}>Fotos senden & erste Einschätzung erhalten ↗</a></div><ContactForm /></section>
      </main>
      <footer><a className="brand-logo" href="#start" aria-label="Maler Chau Startseite"><Image src="/maler-chau-logo-blue.webp" alt="Maler Chau – Malerarbeiten & Renovationen" width={1254} height={1254} unoptimized /></a><p>Neu als Maler Chau. Seit 2004 im Handwerk.</p><a href={'mailto:'+business.email}>{business.email}</a><small>© {new Date().getFullYear()} Maler Chau</small></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} />
    </>
  );
}
