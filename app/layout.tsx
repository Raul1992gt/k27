import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Instagram } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

  return {
    title: 'Padel K27 | Pádel en Esquivias (Toledo) · Pistas y Reservas',
    description:
      'Padel K27 en Esquivias (Toledo). Pistas de pádel profesionales, reservas rápidas y comunidad activa. A 45 min de Madrid por la A-4.',
    keywords: 'pádel Toledo, pádel Esquivias, pádel Madrid, pistas de pádel Toledo, reservar pádel Toledo, club pádel Toledo, Padel K27',
    metadataBase: new URL(siteUrl),
    alternates: { canonical: prefix ? `${prefix}/` : '/' },
    icons: {
      icon: `${prefix}/images/logo.webp`,
      shortcut: `${prefix}/images/logo.webp`,
      apple: `${prefix}/images/logo.webp`,
    },
    openGraph: {
      type: 'website',
      url: prefix ? `${prefix}/` : '/',
      title: 'Padel K27 | Pádel en Esquivias (Toledo) · Pistas y Reservas',
      description:
        'Club de pádel en Esquivias (Toledo). Pistas profesionales, reservas online y a 45 min de Madrid.',
      siteName: 'Padel K27',
      images: [`${prefix}/images/pistas2.webp`],
      locale: 'es_ES',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Padel K27 | Pádel en Esquivias (Toledo)',
      description:
        'Pistas profesionales y reservas online. A 45 min de Madrid por la A-4.',
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
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} bg-padel-black text-white antialiased ${mystery ? 'mystery' : ''}`}>
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
