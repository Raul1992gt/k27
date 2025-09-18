import type { Metadata } from 'next'
import { MapPin, Phone, ArrowRight, ArrowLeft } from 'lucide-react'
import CommentIcon from '../components/CommentIcon'

export const metadata: Metadata = {
  title: 'Pádel sur de Madrid | Padel K27',
  description: '¿Buscas pádel cerca del sur de Madrid? Padel K27 en Esquivias (Toledo), a ~45 min por la A-4. Pistas profesionales y reservas online.',
}

export default function PadelMadridPage() {
  const bookingUrl = 'https://toletvmpadelindoor.es/?utm_source=k27-web&utm_medium=landing-madrid&utm_campaign=reservas'
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return (
    <main className="min-h-screen bg-padel-black text-white">
      <div className="sticky top-0 z-10 w-full bg-padel-black/90 backdrop-blur-md border-b border-padel-red/20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href={`${prefix}/`} className="inline-flex items-center text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Volver al inicio
          </a>
        </div>
      </div>
      <section className="py-20 bg-padel-black">
        <div className="max-w-5xl mx-auto px-4">
          {/* Breadcrumb visible */}
          <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
            <a href={`${prefix}/`} className="hover:text-white">Inicio</a>
            <span className="mx-2">/</span>
            <span className="text-white">Pádel sur de Madrid</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-black mb-4"><span className="gradient-text">PÁDEL SUR DE MADRID</span></h1>
          <p className="text-gray-300 text-lg md:text-xl mb-6">
            Desde Valdemoro, Pinto o Aranjuez estás a ~15 minutos de Padel K27 por la A-4. Club con pistas profesionales y reservas online.
          </p>
          {/* Feature chips */}
          <ul className="flex flex-wrap gap-2 mb-8 text-sm">
            <li className="px-3 py-1 rounded-full border border-padel-red/30 text-gray-300">Pistas Pro</li>
            <li className="px-3 py-1 rounded-full border border-padel-red/30 text-gray-300">Iluminación LED</li>
            <li className="px-3 py-1 rounded-full border border-padel-red/30 text-gray-300">Partidos nivelados</li>
            <li className="px-3 py-1 rounded-full border border-padel-red/30 text-gray-300">Reserva fácil</li>
          </ul>
          <div className="flex flex-wrap gap-3 mb-10">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="bg-white text-padel-red px-6 py-3 rounded-full font-semibold hover:bg-gray-100 inline-flex items-center">
              Reservar online <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <a href="tel:+34618913615" className="border border-padel-red text-padel-red px-6 py-3 rounded-full font-semibold hover:bg-padel-red hover:text-white inline-flex items-center">
              <Phone className="w-5 h-5 mr-2" /> Llamar
            </a>
          </div>

          <div className="bg-padel-gray rounded-2xl border border-padel-red/20 p-6">
            <h2 className="text-2xl font-bold mb-3">Cómo llegar</h2>
            <div className="flex items-start gap-3 text-gray-300">
              <MapPin className="w-6 h-6 text-padel-red flex-shrink-0 mt-1" />
              <div>
                Plaza Industrial Ctra. Borox Call, 22, 45221 Esquivias, Toledo
                <div className="mt-3">
                  <a
                    href={'https://maps.google.com/?q=' + encodeURIComponent('Plaza Industrial Ctra. Borox Call, 22, 45221 Esquivias, Toledo')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-padel-red hover:bg-padel-red-dark text-white px-5 py-2 rounded-full font-semibold"
                  >
                    Ver en Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bloque extra: Si vienes del sur de Madrid */}
          <div className="mt-8 bg-padel-black border border-padel-red/20 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-3">¿Vienes del sur de Madrid?</h2>
            <p className="text-gray-300 mb-3">
              Estamos muy cerca por la A-4. Ven a probar nuestras pistas con superficie profesional e iluminación LED: perfectas para partidos entre semana y planes de fin de semana.
            </p>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              <li>Pistas cuidadas y ambiente de club.</li>
              <li>Partidos nivelados y atención cercana.</li>
              <li>Reserva online rápida o por teléfono.</li>
            </ul>
          </div>

          {/* Comentarios de jugadores */}
          <section className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <CommentIcon />
              <h2 className="text-2xl font-bold">Comentarios de jugadores</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-padel-gray rounded-2xl border border-padel-red/20 p-6">
                <blockquote className="text-gray-300 italic">
                  “Desde Valdemoro tardo muy poco por la A-4. Buen ambiente y pistas muy cuidadas.”
                </blockquote>
                <p className="text-gray-400 mt-3">— Sergio L. (Valdemoro)</p>
              </div>
              <div className="bg-padel-gray rounded-2xl border border-padel-red/20 p-6">
                <blockquote className="text-gray-300 italic">
                  “Vengo desde Pinto con amigos y el nivel de las pistas es top. La reserva online es comodísima.”
                </blockquote>
                <p className="text-gray-400 mt-3">— Irene S. (Pinto)</p>
              </div>
              <div className="bg-padel-gray rounded-2xl border border-padel-red/20 p-6">
                <blockquote className="text-gray-300 italic">
                  “En Aranjuez no encontrábamos horarios y aquí siempre hemos encajado. Muy recomendable.”
                </blockquote>
                <p className="text-gray-400 mt-3">— Óscar F. (Aranjuez)</p>
              </div>
            </div>
          </section>

          {/* Mini-FAQ local */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Preguntas frecuentes</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-padel-gray rounded-xl border border-padel-red/20 overflow-hidden">
                <details className="group">
                  <summary className="cursor-pointer select-none list-none p-5 flex items-center justify-between">
                    <span className="text-white font-semibold">¿Cómo reservo pista?</span>
                    <span className="text-padel-red transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-300">
                    Pulsa “Reservar online” o llama al <span className="text-white font-semibold">+34 618 913 615</span>.
                  </div>
                </details>
              </div>
              <div className="bg-padel-gray rounded-xl border border-padel-red/20 overflow-hidden">
                <details className="group">
                  <summary className="cursor-pointer select-none list-none p-5 flex items-center justify-between">
                    <span className="text-white font-semibold">¿Cuál es el horario?</span>
                    <span className="text-padel-red transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-300">
                    Entre semana: 9:30–14:00 y 16:30–23:00. Fines de semana: 9:30–14:00 y 16:30–21:00.
                  </div>
                </details>
              </div>
              <div className="bg-padel-gray rounded-xl border border-padel-red/20 overflow-hidden md:col-span-2">
                <details className="group">
                  <summary className="cursor-pointer select-none list-none p-5 flex items-center justify-between">
                    <span className="text-white font-semibold">¿Se puede aparcar cerca?</span>
                    <span className="text-padel-red transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-300">
                    No disponemos de parking propio, pero se puede aparcar fácilmente en la puerta.
                  </div>
                </details>
              </div>
            </div>
          </section>

          
        </div>
      </section>

      {/* Spacer to avoid overlap with CTA bar on mobile */}
      <div className="h-20 md:hidden" />

      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 inset-x-0 z-20 md:hidden">
        <div className="backdrop-blur-md bg-padel-black/80 border-t border-padel-red/20 px-4 py-3 flex items-center gap-2 justify-center">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-white text-padel-red font-semibold py-3 rounded-full text-center"
          >
            Reservar
          </a>
          <a
            href="https://wa.me/34618913615?text=Hola%20K27%20Padel%2C%20quisiera%20reservar%20pista"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border border-padel-red text-padel-red font-semibold py-3 rounded-full text-center"
            aria-label="Contactar por WhatsApp"
          >
            WhatsApp
          </a>
          <a
            href="tel:+34618913615"
            className="flex-1 border border-padel-red text-padel-red font-semibold py-3 rounded-full text-center"
          >
            Llamar
          </a>
        </div>
      </div>
    </main>
  )
}
