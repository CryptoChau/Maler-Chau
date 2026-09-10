export const business = {
  email: 'info@malerchau.ch',
  // Add the real number in international format, e.g. +41..., to enable both links.
  phone: '',
  photoMail: 'mailto:info@malerchau.ch?subject=Projektanfrage%20mit%20Fotos&body=Guten%20Tag%20Chau%0A%0AMein%20Ort%3A%20%0AMein%20Projekt%3A%20%0AGew%C3%BCnschter%20Zeitraum%3A%20%0A%0AFotos%20f%C3%BCge%20ich%20dieser%20E-Mail%20als%20Anhang%20hinzu.',
  areas: ['Niedergösgen', 'Olten', 'Aarau', 'Lenzburg', 'Zofingen', 'Schönenwerd', 'Aargau', 'Solothurn'],
};
export const services = [
  {title:'Wände & Decken',text:'Zimmer, Wohnungen und Wohnräume streichen – für ein frisches, stimmiges Zuhause.'},
  {title:'Renovationen',text:'Bestehende Oberflächen auffrischen und erneuern, abgestimmt auf den Zustand und Ihre Wünsche.'},
  {title:'Spachteln & Ausbessern',text:'Löcher, Risse und kleinere Schäden sorgfältig vorbereiten und sauber ausbessern.'},
  {title:'Türen, Rahmen & Holzwerk',text:'Geeignete Türen, Rahmen und Holzbauteile streichen oder lackieren.'},
  {title:'Einzug / Auszug',text:'Malerarbeiten vor dem Einzug oder einer Wohnungsübergabe – mit klarer Terminabsprache.'},
  {title:'Kleinaufträge',text:'Einzelne Malerarbeiten und kleinere Reparaturen sind ausdrücklich willkommen.'},
];
export const steps = [
  {title:'Anfrage',text:'Sie senden Fotos, Ihren Ort und eine kurze Beschreibung der gewünschten Arbeiten.'},
  {title:'Einschätzung',text:'Ich prüfe den Aufwand. Wenn nötig, vereinbaren wir eine Besichtigung.'},
  {title:'Offerte',text:'Sie erhalten eine transparente und nachvollziehbare Offerte.'},
  {title:'Ausführung',text:'Wir vereinbaren einen Termin. Ich bereite sorgfältig vor und führe die Arbeiten sauber aus.'},
];
// Only publish authentic projects and reviews with permission. Empty sections stay hidden.
export const projects: {title:string; description:string; before?:string; after?:string}[] = [];
export const reviews: {name:string; text:string}[] = [];
// Extension point for a future calculator. No invented prices or live estimates in V1.
export type EstimateInputs = {rooms:number; floorArea:number; wallArea:number; ceilings:boolean; doors:number; wallCondition:string; work:'paint'|'fill-and-paint'; furnished:boolean};

