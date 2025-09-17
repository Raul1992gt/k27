import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'K27 Padel - Centro de Pádel Premium',
  description: 'Descubre la experiencia de pádel más completa en nuestras instalaciones de última generación. Pistas profesionales, ambiente único y la mejor ubicación.',
  keywords: 'padel, pistas de padel, deporte, centro deportivo, K27',
  icons: {
    icon: '/images/logo.webp',
    shortcut: '/images/logo.webp',
    apple: '/images/logo.webp',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'K27 Padel - Centro de Pádel Premium',
    description: 'Descubre la experiencia de pádel más completa en nuestras instalaciones de última generación. Pistas profesionales, ambiente único y la mejor ubicación.',
    siteName: 'K27 Padel',
    images: ['/images/logo.webp'],
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K27 Padel - Centro de Pádel Premium',
    description: 'Descubre la experiencia de pádel más completa en nuestras instalaciones de última generación. Pistas profesionales, ambiente único y la mejor ubicación.',
    images: ['/images/logo.webp'],
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
