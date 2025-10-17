import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

// Next.js: themeColor debe declararse en `viewport`, no en `metadata`
export const viewport = {
  themeColor: '#0B0B0C',
}

export async function generateMetadata(): Promise<Metadata> {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

  return {
    title: 'Padel K27 | Pádel en Esquivias (Toledo) · Reservas',
    description:
      'Club de pádel Padel K27 en Esquivias (Toledo). Pistas profesionales y reservas online. A ~45 min del sur de Madrid por la A-4.',
    keywords: 'pádel Toledo, pádel Esquivias, pádel Madrid, pistas de pádel Toledo, reservar pádel Toledo, club pádel Toledo, Padel K27',
    metadataBase: new URL(siteUrl),
    alternates: { canonical: prefix ? `${prefix}/` : '/' },
    manifest: `${prefix}/site.webmanifest`,
    icons: {
      icon: [
        { url: `${prefix}/favicon.ico` },
        { url: `${prefix}/icon-192.png`, sizes: '192x192', type: 'image/png' },
        { url: `${prefix}/icon-512.png`, sizes: '512x512', type: 'image/png' },
      ],
      shortcut: `${prefix}/favicon.ico`,
      apple: `${prefix}/apple-touch-icon.png`,
    },
    openGraph: {
      type: 'website',
      url: prefix ? `${prefix}/` : '/',
      title: 'Padel K27 | Pádel en Esquivias (Toledo) · Reservas',
      description:
        'Pistas profesionales y reservas online. A ~45 min del sur de Madrid.',
      siteName: 'Padel K27',
      images: [`${prefix}/images/pistas2.webp`],
      locale: 'es_ES',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Padel K27 | Pádel en Esquivias',
      description:
        'Pistas profesionales y reservas online. A ~45 min del sur de Madrid.',
      images: [`${prefix}/images/pistas2.webp`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const mystery = process.env.NEXT_PUBLIC_MYSTERY_MODE === '1'
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} bg-padel-black text-white antialiased ${mystery ? 'mystery' : ''}`}>
        {/* SEO: Structured Data (LocalBusiness) */}
        <Script id="ld-localbusiness" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SportsActivityLocation',
            name: 'Padel K27',
            alternateName: 'PadelK27',
            url:
              process.env.NEXT_PUBLIC_SITE_URL ||
              (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
            image: [`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/pistas2.webp`],
            telephone: '+34 644 337 496',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Plaza Industrial Ctra. Borox Call, 26',
              addressLocality: 'Esquivias',
              postalCode: '45221',
              addressRegion: 'Toledo',
              addressCountry: 'ES',
            },
            areaServed: [
              'Esquivias',
              'Toledo',
              'Sur de Madrid',
              'Valdemoro',
              'Pinto',
              'Aranjuez',
              'Illescas',
            ],
            sameAs: ['https://www.instagram.com/padelk27/'],
          })}
        </Script>
        {/* SEO: Organization (logo for brand in Google) */}
        <Script id="ld-organization" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Padel K27',
            alternateName: 'PadelK27',
            url: siteUrl,
            logo: `${siteUrl}${prefix}/images/logo-sinfondo.png`,
            sameAs: ['https://www.instagram.com/padelk27/'],
          })}
        </Script>
        {/* SEO: Structured Data (Website) */}
        <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Padel K27',
            alternateName: 'PadelK27',
            url:
              process.env.NEXT_PUBLIC_SITE_URL ||
              (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
            potentialAction: {
              '@type': 'SearchAction',
              target: (
                process.env.NEXT_PUBLIC_SITE_URL ||
                (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
              ) + '/?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          })}
        </Script>
        {/* Interaction blocker overlay when in mystery mode (below the ribbon at z-[9999]) */}
        {mystery && (
          <div
            aria-hidden
            className="fixed inset-0 z-[9998] cursor-not-allowed"
            style={{ pointerEvents: 'auto', background: 'transparent' }}
          />
        )}
        {/* Instagram floating CTA removed */}
        {children}
      </body>
    </html>
  )
}
