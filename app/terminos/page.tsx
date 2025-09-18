'use client'

export default function TerminosPage() {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return (
    <main className="min-h-screen bg-padel-black text-white">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-black mb-6"><span className="gradient-text">Términos y Condiciones</span></h1>
          <p className="text-gray-300 mb-6">Última actualización: 2025-01-01</p>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>El uso de esta web implica la aceptación de estos términos. La información mostrada es informativa y puede variar sin aviso previo (horarios, tarifas, disponibilidad).</p>
            <p>Las reservas y pagos (en su caso) se gestionarán a través del software de reservas externo indicado. Cualquier condición específica de reservas/pagos se regirá por dicho proveedor.</p>
            <p>El contenido, marcas y diseño de esta web pertenecen a sus respectivos titulares.</p>
          </div>

          <div className="mt-10">
            <a href={`${prefix}/`} className="underline text-gray-400 hover:text-white">Volver al inicio</a>
          </div>
        </div>
      </section>
    </main>
  )
}
