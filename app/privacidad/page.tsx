'use client'

export default function PrivacidadPage() {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return (
    <main className="min-h-screen bg-padel-black text-white">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-black mb-6"><span className="gradient-text">Política de Privacidad</span></h1>
          <p className="text-gray-300 mb-6">Última actualización: 2025-01-01</p>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>Esta web informa de manera general sobre los servicios del club Padel K27. Si nos contactas por teléfono/WhatsApp o mediante email, los datos facilitados se usarán únicamente para gestionar tu solicitud de información o reserva.</p>
            <p>Puedes ejercer tus derechos de acceso, rectificación o supresión escribiendo a nuestro contacto indicado en la sección de Ubicación/Contacto.</p>
            <p>Usamos métricas básicas de navegación (p. ej., analítica web) para mejorar la experiencia; no vendemos datos a terceros.</p>
          </div>

          <div className="mt-10">
            <a href={`${prefix}/`} className="underline text-gray-400 hover:text-white">Volver al inicio</a>
          </div>
        </div>
      </section>
    </main>
  )
}
