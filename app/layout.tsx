import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
        {children}
      </body>
    </html>
  )
}
