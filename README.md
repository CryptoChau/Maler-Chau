# Maler Chau — V1

Persönliche Website von Chau, Maler EFZ. Öffentliche Domain: https://malerchau.ch.

## Entwicklung
Node >=22.13; npm ci; npm run dev. Build: npm run build.
Bestehende Sites/Vinext-Infrastruktur bleibt bestehen; keine Datenbank, Tracker oder kostenpflichtigen Formulardienste ergänzt.

## Inhalte
app/site-content.ts enthält Leistungen, Regionen und Kontaktkonfiguration.
business.phone zunächst leer; später internationale Nummer wie +41… eintragen. Telefon- und WhatsApp-Links erscheinen automatisch.
Die Angabe 22 Jahre bezieht sich auf 2026 und Berufserfahrung seit 2004, nicht das Alter der Marke.
Das Raumfoto ist illustrativ; es zeigt kein Kundenprojekt und keine Person.

## Offertanfragen
app/contact-form.tsx prüft Pflichtfelder und öffnet einen vorausgefüllten mailto-Entwurf.
Die Website versendet und speichert keine Anfragen. Ein eingerichtetes E-Mail-Programm ist erforderlich; die direkte Adresse bleibt sichtbar.
Fotos werden vom Kunden an die E-Mail angehängt. Es gibt noch keinen direkten Upload.

## Erweiterungen
- Preisrechner: Bereich #kosten und Typ EstimateInputs in site-content.ts. Reale Preisgrundlagen von Chau einholen; Ergebnisse als unverbindliche Spanne kennzeichnen.
- Upload: vor Aktivierung separaten Endpunkt mit Dateityp-/Grössenlimits, Aufbewahrung und Datenschutzinformation ergänzen.
- Terminbuchung: erst nach Auswahl und Konfiguration eines passenden Dienstes hinzufügen.
- Projekte/Bewertungen: leere Listen in site-content.ts halten die Abschnitte verborgen. Nur freigegebene echte Inhalte hinzufügen. Vorher-/Nachher-Bildfelder sind vorbereitet; Bilddarstellung bei Befüllung ergänzen.

## SEO und Veröffentlichung
Canonical/Metadaten in app/layout.tsx, sachliche HousePainter-Daten in app/page.tsx.
robots.txt und sitemap.xml verweisen auf die eigene Domain.
Quellcode auf GitHub und im Sites-Quellrepository synchron halten. Mit Sites-Helfern bauen und paketieren, gepushten Commit als Version speichern und veröffentlichen.
Domain- und E-Mail-DNS unverändert lassen.

