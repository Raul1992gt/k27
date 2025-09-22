import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { Instagram } from 'lucide-react'

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
            telephone: '+34 618 913 615',
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
        {mystery && (
          <a
            href="https://www.instagram.com/padelk27/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="PRÓXIMAMENTE · Síguenos en Instagram para las novedades"
            className="fixed left-1/2 -translate-x-1/2 z-[9999] block select-none"
            style={{ bottom: '26vh', transform: 'translateX(-50%) rotate(-20deg)' }}
          >
            <div className="w-[160vw] max-w-none">
              <div className="bg-gradient-to-r from-padel-red to-padel-red-dark opacity-95 shadow-2xl rounded border border-padel-red/60 flex flex-col items-center justify-center gap-2 md:gap-3 py-6 md:py-8 px-8 ribbon-mask">
                <span className="font-extrabold uppercase text-white text-xl md:text-2xl tracking-[0.2em] drop-shadow shimmer-text">
                  PRÓXIMAMENTE
                </span>
                <span className="inline-flex items-center gap-2 text-white/95 font-semibold text-base md:text-lg drop-shadow">
                  <span>Síguenos en</span>
                  <span className="inline-flex w-8 h-8 md:w-9 md:h-9 items-center justify-center rounded-full bg-white/10 ring-2 ring-white/30 icon-breathe">
                    <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                  </span>
                  <span>para las novedades</span>
                </span>
              </div>
            </div>
          </a>
        )}
        {/* Interaction blocker overlay when in mystery mode (below the ribbon at z-[9999]) */}
        {mystery && (
          <div
            aria-hidden
            className="fixed inset-0 z-[9998] cursor-not-allowed"
            style={{ pointerEvents: 'auto', background: 'transparent' }}
          />
        )}
        {!mystery && (
          <a
            href="https://www.instagram.com/padelk27/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Síguenos en Instagram"
            className="fixed left-1/2 -translate-x-1/2 bottom-[5vh] z-[9999] inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-padel-black/75 border border-padel-red/60 backdrop-blur-md shadow-xl hover:bg-padel-black/85 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-padel-red/70"
          >
            <span className="inline-flex w-7 h-7 md:w-8 md:h-8 items-center justify-center rounded-full bg-white/10 ring-2 ring-white/20 icon-breathe">
              <Instagram className="w-4 h-4 md:w-5 md:h-5" />
            </span>
            <span className="text-sm md:text-base font-semibold">Síguenos en Instagram</span>
          </a>
        )}
        {children}
      </body>
    </html>
  )
}
