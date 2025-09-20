import type { Metadata } from 'next'
import Image from 'next/image'
import { Clock, ArrowLeft, Bell, Phone, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reservas · Próximamente | Padel K27',
  description:
    'Estamos preparando el recinto. Muy pronto abrimos y activaremos las reservas online. ¡No te lo querrás perder!',
}

export default function ReservarSoonPage() {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return (
    <main className="min-h-screen bg-padel-black text-white">
      <div className="sticky top-0 z-10 w-full bg-padel-black/90 backdrop-blur-md border-b border-padel-red/20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href={`${prefix}/`} className="inline-flex items-center text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Volver al inicio
          </a>
          <a href={`${prefix}/`} className="inline-flex items-center">
            <Image src={`${prefix}/images/logo.webp`} alt="Padel K27 Logo" width={32} height={32} className="mr-2" />
            <span className="font-semibold gradient-text">Padel K27</span>
          </a>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-padel-red/10 border border-padel-red/30 flex items-center justify-center mb-6">
            <Bell className="w-10 h-10 text-padel-red" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <span className="gradient-text">PRÓXIMAMENTE</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-6">
            Estamos preparando el recinto para ofrecerte la mejor experiencia de pádel.
          </p>
          <p className="text-gray-400 mb-10">
            Abrimos muy pronto y activaremos las reservas online. ¡No te lo querrás perder!
          </p>

          <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            <a
              href="tel:+34618913615"
              className="inline-flex items-center justify-center gap-2 bg-white text-padel-red hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition-colors"
            >
              <Phone className="w-5 h-5" /> Llamar
            </a>
            <a
              href="https://wa.me/34618913615?text=Hola%20K27%20Padel%2C%20quisiera%20informaci%C3%B3n%20sobre%20reservas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-padel-red text-padel-red hover:bg-padel-red hover:text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </div>

          <div className="mt-12 inline-flex items-start gap-3 text-left bg-padel-gray border border-padel-red/20 rounded-2xl p-5">
            <Clock className="w-6 h-6 text-padel-red mt-0.5" />
            <div className="text-gray-300">
              <p className="font-semibold text-white mb-1">Horario de atención</p>
              <p>Entre semana: 9:30 - 14:00 y 16:30 - 23:00</p>
              <p>Fines de semana: 9:30 - 14:00 y 16:30 - 21:00</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
