import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/k27' : '')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raul1992gt.github.io'

  return {
    title: 'K27 Padel - Centro de Pádel Premium',
    description:
      'Descubre la experiencia de pádel más completa en nuestras instalaciones de última generación. Pistas profesionales, ambiente único y la mejor ubicación.',
    keywords: 'padel, pistas de padel, deporte, centro deportivo, K27',
    metadataBase: new URL(siteUrl),
    alternates: { canonical: '/' },
    icons: {
      icon: `${prefix}/images/logo.webp`,
      shortcut: `${prefix}/images/logo.webp`,
      apple: `${prefix}/images/logo.webp`,
    },
    openGraph: {
      type: 'website',
      url: '/',
      title: 'K27 Padel - Centro de Pádel Premium',
      description:
        'Descubre la experiencia de pádel más completa en nuestras instalaciones de última generación. Pistas profesionales, ambiente único y la mejor ubicación.',
      siteName: 'K27 Padel',
      images: [`${prefix}/images/logo.webp`],
      locale: 'es_ES',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'K27 Padel - Centro de Pádel Premium',
      description:
        'Descubre la experiencia de pádel más completa en nuestras instalaciones de última generación. Pistas profesionales, ambiente único y la mejor ubicación.',
      images: [`${prefix}/images/logo.webp`],
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
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} bg-padel-black text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
