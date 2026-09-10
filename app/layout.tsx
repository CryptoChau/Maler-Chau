import type { Metadata } from 'next';
import './globals.css';
const title = 'Maler Chau | Maler EFZ in Niedergösgen, Olten & Aarau';
const description = 'Persönliche Malerarbeiten von Chau: Maler EFZ, seit 2004 im Beruf. Zimmer streichen, Renovationen und Kleinaufträge in Aargau & Solothurn. Kostenlose Offerte.';
export const metadata: Metadata = {
  metadataBase: new URL('https://malerchau.ch'), title, description,
  alternates: { canonical: '/' },
  openGraph: { title, description, url: '/', siteName: 'Maler Chau', locale: 'de_CH', type: 'website' },
  twitter: { card: 'summary', title, description },
  icons: { icon: '/favicon.svg' }
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
  return <html lang="de-CH"><body>{children}</body></html>;
}

