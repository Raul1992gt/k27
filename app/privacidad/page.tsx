'use client'

export default function PrivacidadPage() {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return (
    <main className="min-h-screen bg-padel-black text-white">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-black mb-6"><span className="gradient-text">Política de Privacidad</span></h1>
          <p className="text-gray-300 mb-6">Última actualización: octubre de 2025</p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <p className="text-lg font-semibold text-white">Política de Privacidad – K27 Club de Pádel</p>
            <p>En OLIASPORT PADEL SL (en adelante, “PADEL K27”), valoramos la privacidad de nuestros usuarios y garantizamos la protección de sus datos personales conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).</p>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">1. Responsable del tratamiento</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Responsable: OLIASPORT PADEL SL</li>
                <li>NIF: B22678007</li>
                <li>Dirección: Calle manzanares, 18 ESQUIVIAS (Toledo), España</li>
                <li>Correo electrónico: <a className="underline" href="mailto:info@padelk27.es">info@padelk27.es</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">2. Datos que recogemos</h2>
              <p>Podemos recoger los siguientes datos personales a través de formularios web, redes sociales o de manera presencial:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Número de identificación (DNI o NIE)</li>
                <li>Nombre y apellidos</li>
                <li>Teléfono y correo electrónico</li>
                <li>Datos de facturación (en caso de compras o reservas)</li>
                <li>Imágenes o grabaciones en eventos y torneos</li>
                <li>Preferencias deportivas o niveles de juego (en el caso de inscripciones o rankings)</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">3. Finalidad del tratamiento</h2>
              <p>Los datos personales se utilizan con las siguientes finalidades:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Gestionar reservas de pistas, clases y eventos.</li>
                <li>Enviar comunicaciones relacionadas con actividades, promociones o torneos del club.</li>
                <li>Emitir facturas, cobros y justificantes de pago.</li>
                <li>Responder a consultas o solicitudes de contacto.</li>
                <li>Difundir actividades del club en redes sociales y medios propios (solo si el interesado lo autoriza).</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">4. Legitimación</h2>
              <p>El tratamiento de los datos se basa en:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Ejecución de un contrato o prestación de servicio.</li>
                <li>Consentimiento del interesado.</li>
                <li>Cumplimiento de obligaciones legales.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">5. Conservación de los datos</h2>
              <p>Los datos se conservarán mientras exista relación con el usuario y, posteriormente, durante los plazos legales necesarios.</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">6. Comunicación de datos</h2>
              <p>PADEL K27 no cede datos personales a terceros salvo obligación legal o cuando sea necesario para la prestación de servicios, garantizando siempre las medidas de seguridad adecuadas.</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">7. Derechos del usuario</h2>
              <p>El usuario puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad enviando un correo a <a className="underline" href="mailto:info@padelk27.es">info@padelk27.es</a>.</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">8. Seguridad de los datos</h2>
              <p>PADEL K27 adopta medidas técnicas y organizativas necesarias para garantizar la confidencialidad, integridad y disponibilidad de los datos personales.</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">9. Redes sociales</h2>
              <p>PADEL K27 dispone de perfiles en redes sociales (Instagram, TikTok, WhatsApp, etc.) con la finalidad de promocionar sus actividades. Los datos de los usuarios se tratarán conforme a esta política y las condiciones de cada red social.</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">10. Modificación de la Política de Privacidad</h2>
              <p>PADEL K27 se reserva el derecho a modificar esta Política de Privacidad conforme a cambios normativos o de servicio. Cualquier modificación será publicada en la web.</p>
            </div>
          </div>

          <div className="mt-10">
            <a href={`${prefix}/`} className="underline text-gray-400 hover:text-white">Volver al inicio</a>
          </div>
        </div>
      </section>
    </main>
  )
}
