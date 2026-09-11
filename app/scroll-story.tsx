'use client';

import { useEffect, useRef, useState } from 'react';
import './scroll-story.css';
import './story-intro.css';

const scenes = [
  { image: '/story-brand.webp', label: 'Maler Chau · Niedergösgen SO', title: ['Malerarbeiten.', 'Persönlich für Sie.'], text: '', link: '#projektanfrage', cta: 'Ihr Projekt anfragen', position: '50% 50%' },
  { image: '/story-room.webp', label: 'Wände & Decken', title: ['Neue Farbe.', 'Neues Wohngefühl.'], text: 'Frische Wände. Klare Linien. Ein Zuhause, das zu Ihnen passt.', link: '#leistungen', cta: 'Malerarbeiten entdecken', position: '50% 50%' },
  { image: '/story-colors.webp', label: 'Persönliche Beratung', title: ['Ihre Idee.', 'Gemeinsam weitergedacht.'], text: 'Farben, Oberflächen und Aufwand bespreche ich direkt mit Ihnen.', link: '#kontakt', cta: 'Projekt besprechen', position: '50% 50%' },
  { image: '/story-detail.webp', label: 'Renovationen & Holzwerk', title: ['Sorgfalt.', 'Bis ins Detail.'], text: 'Von der Vorbereitung bis zur letzten Kante: sauber ausgeführtes Handwerk.', link: '#kontakt', cta: 'Kostenlose Offerte anfragen', position: '50% 50%' },
];

export function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = root.current;
    const viewport = stage.current;
    if (!section || !viewport) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let current = -1;
    const panels = Array.from(viewport.querySelectorAll<HTMLElement>('.story-scene'));
    const update = () => {
      frame = 0;
      if (reduced.matches) return;
      const rect = section.getBoundingClientRect();
      const travel = section.offsetHeight - viewport.offsetHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, travel)));
      const sceneProgress = progress * (scenes.length - 1);
      const selected = Math.min(scenes.length - 1, Math.round(sceneProgress));
      if (selected !== current) { current = selected; setActive(selected); }
      panels.forEach((panel, index) => {
        const distance = sceneProgress - index;
        const opacity = Math.max(0, 1 - Math.abs(distance));
        panel.style.opacity = String(opacity);
        panel.style.visibility = opacity > 0 ? 'visible' : 'hidden';
        const image = panel.querySelector<HTMLElement>('.story-image');
        const copy = panel.querySelector<HTMLElement>('.story-copy');
        if (image) image.style.transform = 'translate3d(' + (distance * -3) + '%, ' + (distance * 1.5) + '%, 0) scale(' + (1.1 - distance * .035) + ')';
        if (copy) {
          copy.style.transform = 'translateY(' + (distance * -28) + 'px)';
          copy.style.opacity = String(Math.max(0, 1 - Math.abs(distance) * 3));
        }
      });
      section.style.setProperty('--story-progress', String(progress));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const configure = () => {
      const enabled = !reduced.matches;
      section.dataset.motion = String(enabled);
      setEnhanced(enabled);
      if (!enabled) {
        panels.forEach(panel => {
          panel.style.removeProperty('opacity');
          panel.style.removeProperty('visibility');
          panel.querySelector<HTMLElement>('.story-image')?.style.removeProperty('transform');
          panel.querySelector<HTMLElement>('.story-copy')?.style.removeProperty('transform');
          panel.querySelector<HTMLElement>('.story-copy')?.style.removeProperty('opacity');
        });
      } else schedule();
    };
    configure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', configure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', configure);
    };
  }, []);

  return <section className="scroll-story" id="inspiration" ref={root} aria-label="Farbe, Beratung und Handwerk">
    <div className="story-stage" ref={stage}>
      {scenes.map((scene, index) => <article key={scene.image} className={'story-scene' + (index === 0 ? ' story-brand' : '')} aria-hidden={enhanced && active !== index ? true : undefined} inert={enhanced && active !== index}>
        <img className="story-image" src={scene.image} alt={index === 0 ? 'Maler Chau Logo auf einer hellen Wand' : ''} width="1600" height="900" loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" style={{objectPosition: scene.position}} />
        <div className="story-shade" />
        <div className="story-copy">
          <p className="story-label">{scene.label}</p>
          {index === 0 ? <h1>{scene.title.join(' ')}</h1> : <h2>{scene.title.map(line => <span key={line}>{line}</span>)}</h2>}
          <p className="story-description">{scene.text}</p>
          <a className="story-link" href={scene.link}>{scene.cta}<span aria-hidden="true"> ↗</span></a>
        </div>
      </article>)}
      <div className="story-topline"><span>Räume. Farben. Handwerk.</span><a href="#projektanfrage">Direkt zur Anfrage ↓</a></div>
      <div className="story-bottomline"><span>KI-Rauminspiration · keine Projektreferenzen</span><span aria-hidden="true">0{active + 1} / 04</span></div>
      <div className="story-progress" aria-hidden="true"><span /></div>
    </div>
  </section>;
}
