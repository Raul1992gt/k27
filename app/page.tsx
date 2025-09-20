'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Script from 'next/script'
import { MapPin, Phone, Clock, Users, Trophy, Star, X, ChevronLeft, ChevronRight, Instagram, Menu, MessageCircle, Maximize2, Minimize2 } from 'lucide-react'

export default function Home() {
  // Prefix for assets (only set when deploying to GitHub Pages)
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const [isVisible, setIsVisible] = useState(false)
  const [showReservationModal, setShowReservationModal] = useState(false)
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  // Gallery zoom/fullscreen state
  const imageContainerRef = useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const pinchStartDistRef = useRef<number | null>(null)
  const swipeStartYRef = useRef<number | null>(null)

  const resetZoom = () => setScale(1)

  const toggleFullscreen = async () => {
    try {
      const el = imageContainerRef.current
      if (!el) return
      if (!document.fullscreenElement) {
        await el.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (_) {
      // ignore
    }
  }

  const galleryImages = [
    { src: `${prefix}/images/pistas1.webp`, alt: 'Pistas de Padel Principales', title: 'Pistas Profesionales' },
    { src: `${prefix}/images/pistas2.webp`, alt: 'Vista General de las Pistas', title: 'Instalaciones Completas' },
    { src: `${prefix}/images/recepcion.webp`, alt: 'Área de Recepción', title: 'Zona de Recepción' },
    { src: `${prefix}/images/fachada.webp`, alt: 'Fachada del Recinto', title: 'Experiencia de Juego' }
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Keyboard navigation for gallery on desktop
  useEffect(() => {
    if (!showGalleryModal) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'Escape') closeModals()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [showGalleryModal])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const closeModals = () => {
    setShowReservationModal(false)
    setShowGalleryModal(false)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNav = (sectionId: string) => {
    scrollToSection(sectionId)
    setMobileOpen(false)
  }

  // Close modals on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModals()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <main className="min-h-screen bg-padel-black overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-50 bg-padel-black/90 backdrop-blur-md border-b border-padel-red/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image
                src={`${prefix}/images/logo.webp`}
                alt="Padel K27 Logo"
                width={60}
                height={60}
                className="mr-3"
                data-no-mask
              />
              <span className="text-2xl font-bold gradient-text">Padel K27</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('inicio')} className="hover:text-padel-red transition-colors">Inicio</button>
              <button onClick={() => scrollToSection('nosotros')} className="hover:text-padel-red transition-colors">Nosotros</button>
              <button onClick={() => scrollToSection('recinto')} className="hover:text-padel-red transition-colors">El Recinto</button>
              <button onClick={() => scrollToSection('ubicacion')} className="hover:text-padel-red transition-colors">Ubicación</button>
            </div>
            {/* Mobile menu button */}
            <button
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="md:hidden p-2 rounded-lg border border-padel-red/30 hover:border-padel-red text-white"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-24 left-0 right-0 z-40 bg-padel-black/95 backdrop-blur-md border-b border-padel-red/20"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-4 space-y-3">
              <button onClick={() => handleNav('inicio')} className="block w-full text-left py-2 px-2 rounded hover:bg-padel-red/10">Inicio</button>
              <button onClick={() => handleNav('nosotros')} className="block w-full text-left py-2 px-2 rounded hover:bg-padel-red/10">Nosotros</button>
              <button onClick={() => handleNav('recinto')} className="block w-full text-left py-2 px-2 rounded hover:bg-padel-red/10">El Recinto</button>
              <button onClick={() => handleNav('ubicacion')} className="block w-full text-left py-2 px-2 rounded hover:bg-padel-red/10">Ubicación</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={`${prefix}/images/pistas1.webp`}
            alt="Pistas de Padel K27"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-padel-black via-padel-black/70 to-transparent"></div>
        </motion.div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black mb-6 leading-tight"
          >
            <span className="gradient-text">VIVE</span><br />
            <span className="text-white">EL PÁDEL</span><br />
            <span className="gradient-text">AL MÁXIMO</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Descubre la experiencia de pádel más completa en nuestras instalaciones de última generación
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => setShowReservationModal(true)}
              className="bg-white text-padel-red px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Reservar Ahora
            </button>
            <button 
              onClick={() => setShowGalleryModal(true)}
              className="border-2 border-padel-red text-padel-red hover:bg-padel-red hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              Ver Instalaciones
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-padel-red rounded-full flex justify-center">
            <div className="w-1 h-3 bg-padel-red rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      

      {/* SEO snippet: Áreas y cercanía (discreto) */}
      <section className="bg-padel-black py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-300">
          <p className="mb-3">
            <span className="text-white font-semibold">Padel K27</span> (<span className="text-white font-semibold">PadelK27</span>) es tu club de pádel en <span className="text-white font-semibold">Esquivias (Toledo)</span>, a ~45 minutos del <span className="text-white font-semibold">sur de Madrid</span> por la A-4.
          </p>
          <ul className="flex flex-wrap gap-3 justify-center text-sm text-gray-400">
            <li>
              <a href={`${prefix}/`} className="inline-block px-3 py-1 rounded-full border border-padel-red/30 hover:bg-padel-red/10 hover:text-white transition-colors">PadelK27</a>
            </li>
            <li>
              <a href={`${prefix}/padel-esquivias`} className="inline-block px-3 py-1 rounded-full border border-padel-red/30 hover:bg-padel-red/10 hover:text-white transition-colors">Esquivias</a>
            </li>
            <li>
              <a href={`${prefix}/padel-toledo`} className="inline-block px-3 py-1 rounded-full border border-padel-red/30 hover:bg-padel-red/10 hover:text-white transition-colors">Toledo capital</a>
            </li>
            <li>
              <a href={`${prefix}/padel-madrid`} className="inline-block px-3 py-1 rounded-full border border-padel-red/30 hover:bg-padel-red/10 hover:text-white transition-colors">Sur de Madrid (Valdemoro, Pinto, Aranjuez, Illescas)</a>
            </li>
          </ul>
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-20 bg-padel-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="gradient-text">NOSOTROS</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Somos más que un centro de pádel. Somos una comunidad apasionada por este deporte que busca ofrecer la mejor experiencia a todos nuestros jugadores.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src={`${prefix}/images/fachada.webp`}
                alt="Fachada de Padel K27 (PadelK27) en Esquivias, Toledo"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-padel-red p-3 rounded-full">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Excelencia Deportiva en PadelK27</h3>
                  <p className="text-gray-400">Instalaciones de nivel profesional</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-padel-red p-3 rounded-full">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Comunidad Activa en Padel K27</h3>
                  <p className="text-gray-400">Únete a una comunidad en crecimiento</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-padel-red p-3 rounded-full">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Experiencia Premium en el sur de Madrid y Toledo</h3>
                  <p className="text-gray-400">Servicio personalizado y de calidad</p>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                Desde nuestra apertura, hemos sido pioneros en ofrecer una experiencia de pádel única. 
                Nuestro compromiso es proporcionar instalaciones de primera clase, un ambiente acogedor 
                y servicios que superen las expectativas de cada jugador.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* El Recinto Section */}
      <section id="recinto" className="py-20 bg-padel-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="gradient-text">EL RECINTO</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Instalaciones diseñadas para ofrecer la mejor experiencia de juego con tecnología de vanguardia y comodidades excepcionales.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-padel-gray rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={`${prefix}/images/pistas2.webp`}
                alt="Pistas de pádel en Padel K27 (PadelK27)"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">Pistas Profesionales</h3>
                <p className="text-gray-400">
                  3 pistas de última generación y sistema de iluminación LED profesional.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-padel-gray rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={`${prefix}/images/recepcion.webp`}
                alt="Recepción de Padel K27 en Esquivias (Toledo)"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">Zona Social</h3>
                <p className="text-gray-400">
                  Amplia recepción con zona de descanso, cafetería y tienda especializada en material de pádel.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-padel-gray rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={`${prefix}/images/pistas1.webp`}
                alt="Clases de pádel en Padel K27 (PadelK27)"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">Clases de Pádel</h3>
                <p className="text-gray-400">
                  Entrenamientos y clases para todos los niveles con monitores titulados. Sesiones individuales, por parejas y en grupos.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-padel-red to-padel-red-dark rounded-2xl p-8 text-center"
          >
            <h3 className="text-3xl font-bold text-white mb-4">¿Listo para jugar?</h3>
            <p className="text-xl text-white/90 mb-6">
              Reserva tu pista ahora y disfruta de la mejor experiencia de pádel
            </p>
            <button 
              onClick={() => setShowReservationModal(true)}
              className="bg-white text-padel-red px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Reservar Ahora
            </button>
          </motion.div>
        </div>
      </section>

      {/* Ubicación Section */}
      <section id="ubicacion" className="py-20 bg-padel-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="gradient-text">UBICACIÓN</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Estratégicamente ubicados en Esquivias (Toledo) con fácil acceso y aparcamiento.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-padel-red p-3 rounded-full mt-1">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Dirección</h3>
                  <p className="text-gray-400 text-lg">
                    Plaza Industrial Ctra. Borox Call, 22<br />
                    45221 Esquivias, Toledo
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-padel-red p-3 rounded-full mt-1">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Horarios</h3>
                  <p className="text-gray-400 text-lg">
                    Entre semana: 9:30 - 14:00 y 16:30 - 23:00
                    <br />
                    Fines de semana: 9:30 - 14:00 y 16:30 - 21:00
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-padel-red p-3 rounded-full mt-1">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Contacto</h3>
                  <p className="text-gray-400 text-lg">
                    +34 618 913 615
                  </p>
                </div>
              </div>

              <div className="bg-padel-black rounded-xl p-6 border border-padel-red/20">
                <h4 className="text-lg font-semibold text-white mb-3">Cómo llegar</h4>
                <ul className="text-gray-400 space-y-2">
                  <li>• Desde Toledo: 15 minutos por la CM-4000</li>
                  <li>• Desde Madrid: 45 minutos por la A-4</li>
                  <li>• Fácil acceso desde la autovía A-4</li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-padel-black rounded-2xl p-8 border border-padel-red/20"
            >
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent('Plaza Industrial Ctra. Borox Call, 22, 45221 Esquivias, Toledo')}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                ></iframe>
              </div>
              
              <div className="text-center">
                <h4 className="text-xl font-semibold text-white mb-4">Ubicación Privilegiada</h4>
                <p className="text-gray-400 mb-6">
                  En Esquivias (Toledo), con excelente acceso desde la A-4 y buena zona de aparcamiento para tu comodidad.
                </p>
                <a 
                  href={'https://maps.google.com/?q=' + encodeURIComponent('Plaza Industrial Ctra. Borox Call, 22, 45221 Esquivias, Toledo')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-padel-red hover:bg-padel-red-dark text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Ver en Google Maps
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section (moved above Footer) */}
      <section id="faq" className="py-20 bg-padel-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-4">
              <span className="gradient-text">PREGUNTAS FRECUENTES</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Resolvemos tus dudas sobre cómo llegar, reservar y disfrutar del pádel en Esquivias (Toledo), a 45 minutos de Madrid.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-padel-gray rounded-2xl border border-padel-red/20 overflow-hidden"
            >
              <details className="group">
                <summary className="cursor-pointer select-none list-none p-6 flex items-center justify-between">
                  <span className="text-white text-lg font-semibold">¿Dónde jugar pádel en Esquivias (Toledo)?</span>
                  <span className="text-padel-red transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-300">
                 Padel K27 está en Esquivias (Toledo), con pistas profesionales, reservas rápidas y parking gratuito.
                </div>
              </details>
            </motion.div>

            {/* Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              viewport={{ once: true }}
              className="bg-padel-gray rounded-2xl border border-padel-red/20 overflow-hidden"
            >
              <details className="group">
                <summary className="cursor-pointer select-none list-none p-6 flex items-center justify-between">
                  <span className="text-white text-lg font-semibold">¿A qué distancia está desde Madrid?</span>
                  <span className="text-padel-red transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-300">
                  Aproximadamente 45 minutos por la A-4, con acceso sencillo desde el sur de Madrid (Valdemoro, Pinto, Aranjuez, Illescas).
                </div>
              </details>
            </motion.div>

            {/* Item 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-padel-gray rounded-2xl border border-padel-red/20 overflow-hidden"
            >
              <details className="group">
                <summary className="cursor-pointer select-none list-none p-6 flex items-center justify-between">
                  <span className="text-white text-lg font-semibold">¿Cómo reservar pista?</span>
                  <span className="text-padel-red transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-300">
                  Pulsa “Reservar online” para abrir el software de reservas o llama al <span className="text-white font-semibold">+34 618 913 615</span>.
                </div>
              </details>
            </motion.div>

            {/* Item 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              className="bg-padel-gray rounded-2xl border border-padel-red/20 overflow-hidden"
            >
              <details className="group">
                <summary className="cursor-pointer select-none list-none p-6 flex items-center justify-between">
                  <span className="text-white text-lg font-semibold">¿Cuál es el horario?</span>
                  <span className="text-padel-red transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-300">
                  Entre semana: 9:30–14:00 y 16:30–23:00. Fines de semana: 9:30–14:00 y 16:30–21:00.
                </div>
              </details>
            </motion.div>

            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-padel-black border-t border-padel-red/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src={`${prefix}/images/logo.webp`}
                  alt="Padel K27 Logo"
                  width={40}
                  height={40}
                  className="mr-3"
                />
                <span className="text-xl font-bold gradient-text">Padel K27</span>
              </div>
              <p className="text-gray-400">
                El centro de pádel más moderno de la Sagra. Vive la pasión del pádel con nosotros.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#nosotros" className="hover:text-padel-red transition-colors">Nosotros</a></li>
                <li><a href="#recinto" className="hover:text-padel-red transition-colors">El Recinto</a></li>
                <li><a href="#ubicacion" className="hover:text-padel-red transition-colors">Ubicación</a></li>
                <li><a href={`${prefix}/privacidad`} className="hover:text-padel-red transition-colors">Privacidad</a></li>
                <li><a href={`${prefix}/terminos`} className="hover:text-padel-red transition-colors">Términos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/padelk27/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 bg-padel-red rounded-full flex items-center justify-center hover:bg-padel-red-dark transition-colors"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-padel-red/20 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Padel K27. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Desarrollado por <a href="https://www.linkedin.com/in/raul-garcia-torrejon/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">Raúl GT</a> · 2025
            </p>
          </div>
        </div>
      </footer>

      {/* Reservation Modal */}
      <AnimatePresence>
        {showReservationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModals}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-padel-gray rounded-2xl p-8 max-w-md w-full border border-padel-red/20 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModals}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center mb-6">
                <div className="bg-padel-red p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Reservar Pista</h3>
                <p className="text-gray-400">Reserva online o llámanos en el horario indicado</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-padel-black rounded-xl p-4 border border-padel-red/20">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-padel-red" />
                    <div>
                      <p className="text-white font-semibold">Teléfono</p>
                      <p className="text-padel-red text-lg font-bold">+34 618 913 615</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-padel-black rounded-xl p-4 border border-padel-red/20">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-padel-red" />
                    <div>
                      <p className="text-white font-semibold">Dirección</p>
                      <p className="text-gray-300">Plaza Industrial Ctra. Borox Call, 22<br />45221 Esquivias, Toledo</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-padel-black rounded-xl p-4 border border-padel-red/20">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-padel-red" />
                    <div>
                      <p className="text-white font-semibold">Horario de Reservas</p>
                      <p className="text-gray-300">Entre semana: 9:30 - 14:00 y 16:30 - 23:00</p>
                      <p className="text-gray-300">Fines de semana: 9:30 - 14:00 y 16:30 - 21:00</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <a
                  href={`${prefix}/reservar`}
                  className="w-full bg-white text-padel-red hover:bg-gray-100 h-12 rounded-full font-semibold transition-colors inline-flex items-center justify-center"
                >
                  Reservar online
                </a>
                <div className="flex gap-3">
                  <a
                    href="https://wa.me/34618913615?text=Hola%20K27%20Padel%2C%20quisiera%20reservar%20pista"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-padel-red text-padel-red hover:bg-padel-red hover:text-white h-12 rounded-full font-semibold transition-colors inline-flex items-center justify-center gap-2"
                    aria-label="Contactar por WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" /> WhatsApp
                  </a>
                  <a 
                    href="tel:+34618913615" 
                    className="flex-1 border border-padel-red text-padel-red hover:bg-padel-red hover:text-white h-12 rounded-full font-semibold transition-colors inline-flex items-center justify-center gap-2"
                    aria-label="Llamar por teléfono"
                  >
                    <Phone className="w-5 h-5" /> Llamar
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Modal */}
      <AnimatePresence>
        {showGalleryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModals}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-padel-gray rounded-2xl p-4 md:p-6 max-w-lg md:max-w-4xl w-full border border-padel-red/20 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModals}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              {/* Fullscreen toggle */}
              <button
                onClick={toggleFullscreen}
                className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors z-10"
                aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
              >
                {isFullscreen ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
              </button>
              
              <div className="text-center mb-4 md:mb-6">
                <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-1 md:mb-2">Nuestras Instalaciones</h3>
                <p className="text-gray-400 text-sm md:text-base">Descubre nuestras instalaciones de primera clase</p>
              </div>
              
              <div className="relative">
                <div
                  ref={imageContainerRef}
                  className="relative overflow-hidden rounded-xl w-full h-56 sm:h-64 md:h-auto aspect-video touch-none"
                  onTouchStart={(e) => {
                    if (e.touches.length === 1) {
                      ;(window as any)._gTouchX = e.touches[0].clientX
                      swipeStartYRef.current = e.touches[0].clientY
                    } else if (e.touches.length === 2) {
                      const dx = e.touches[0].clientX - e.touches[1].clientX
                      const dy = e.touches[0].clientY - e.touches[1].clientY
                      pinchStartDistRef.current = Math.hypot(dx, dy)
                    }
                  }}
                  onTouchMove={(e) => {
                    if (e.touches.length === 2 && pinchStartDistRef.current) {
                      const dx = e.touches[0].clientX - e.touches[1].clientX
                      const dy = e.touches[0].clientY - e.touches[1].clientY
                      const dist = Math.hypot(dx, dy)
                      const ratio = dist / pinchStartDistRef.current
                      const nextScale = Math.min(3, Math.max(1, ratio * scale))
                      setScale(nextScale)
                    }
                  }}
                  onTouchEnd={(e) => {
                    // swipe left/right
                    const startX = (window as any)._gTouchX || 0
                    if (startX && e.changedTouches.length) {
                      const endX = e.changedTouches[0].clientX
                      const deltaX = endX - startX
                      if (Math.abs(deltaX) > 40 && scale === 1) {
                        deltaX > 0 ? prevImage() : nextImage()
                      }
                      ;(window as any)._gTouchX = 0
                    }
                    // swipe down to close
                    const startY = swipeStartYRef.current
                    if (startY && e.changedTouches.length) {
                      const endY = e.changedTouches[0].clientY
                      if (endY - startY > 80 && scale === 1) closeModals()
                      swipeStartYRef.current = null
                    }
                    // reset pinch state
                    pinchStartDistRef.current = null
                  }}
                  onDoubleClick={() => setScale((s) => (s === 1 ? 2 : 1))}
                >
                  <Image
                    src={galleryImages[currentImageIndex].src}
                    alt={galleryImages[currentImageIndex].alt}
                    fill
                    className="object-cover"
                    style={{ transform: `scale(${scale})`, transition: 'transform 0.1s ease-out' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
                    <h4 className="text-white text-lg md:text-xl font-bold">{galleryImages[currentImageIndex].title}</h4>
                    <p className="text-gray-300 text-sm md:text-base">{galleryImages[currentImageIndex].alt}</p>
                  </div>
                  {/* In-image close button for better discoverability */}
                  <button
                    onClick={closeModals}
                    className="absolute top-2 right-2 z-20 bg-black/50 hover:bg-black/60 text-white rounded-full p-1.5"
                    aria-label="Cerrar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  {/* Decorative arrows for desktop (do not intercept clicks) */}
                  <div className="flex absolute inset-y-0 left-2 md:left-3 items-center pointer-events-none">
                    <div className="bg-black/35 md:bg-black/45 rounded-full p-1.5 md:p-2">
                      <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white/70 md:text-white/80" />
                    </div>
                  </div>
                  <div className="flex absolute inset-y-0 right-2 md:right-3 items-center pointer-events-none">
                    <div className="bg-black/35 md:bg-black/45 rounded-full p-1.5 md:p-2">
                      <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white/70 md:text-white/80" />
                    </div>
                  </div>
                  {/* Click-to-advance on desktop when not zoomed */}
                  {/* Mobile tappable zones (left/right) */}
                  <div
                    className="absolute inset-y-0 left-0 w-1/2 md:hidden"
                    onClick={() => { if (scale === 1) prevImage() }}
                    aria-label="Anterior"
                  />
                  <div
                    className="absolute inset-y-0 right-0 w-1/2 md:hidden"
                    onClick={() => { if (scale === 1) nextImage() }}
                    aria-label="Siguiente"
                  />
                  <div
                    className="hidden md:block absolute inset-0"
                    onClick={(e) => {
                      if (scale !== 1) return
                      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
                      const mid = rect.left + rect.width / 2
                      if (e.clientX < mid) prevImage(); else nextImage()
                    }}
                  />
                </div>
                
                {/* Navigation buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-padel-red/80 hover:bg-padel-red text-white p-2 md:p-2.5 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-padel-red/80 hover:bg-padel-red text-white p-2 md:p-2.5 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                {/* Image counter */}
                <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-black/50 text-white px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
              </div>
              
              {/* Thumbnail navigation */}
              <div className="flex justify-center space-x-2 mt-3 md:mt-4">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-padel-red' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    
      {/* SEO: JSON-LD LocalBusiness */}
      <Script id="ld-localbusiness" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SportsActivityLocation',
          name: 'Padel K27',
          image: [`${prefix}/images/logo.webp`],
          url: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
          telephone: '+34 618 913 615',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Plaza Industrial Ctra. Borox Call, 22',
            addressLocality: 'Esquivias',
            addressRegion: 'Toledo',
            postalCode: '45221',
            addressCountry: 'ES'
          },
          areaServed: ['Toledo', 'Esquivias', 'Madrid'],
          priceRange: '€€',
          openingHours: [
            'Mo-Fr 09:30-14:00',
            'Mo-Fr 16:30-23:00',
            'Sa-Su 09:30-14:00',
            'Sa-Su 16:30-21:00'
          ],
          sameAs: [
            '#', // Facebook URL to be provided
            '#', // Instagram URL to be provided
          ]
        })}
      </Script>

      {/* SEO: JSON-LD FAQPage */}
      <Script id="ld-faq" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: '¿Dónde jugar pádel en Esquivias (Toledo)?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Padel K27 está en Esquivias (Toledo), con pistas profesionales, reservas rápidas y parking gratuito.'
              }
            },
            {
              '@type': 'Question',
              name: '¿A qué distancia está desde Madrid?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Aproximadamente 45 minutos por la A-4, con acceso sencillo desde el sur de Madrid (Valdemoro, Pinto, Aranjuez, Illescas).'
              }
            },
            {
              '@type': 'Question',
              name: '¿Cómo reservar pista?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Pulsa “Reservar online” para abrir el software de reservas o llama al +34 618 913 615.'
              }
            },
            {
              '@type': 'Question',
              name: '¿Cuál es el horario?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Entre semana: 9:30-14:00 y 16:30-23:00. Fines de semana: 9:30-14:00 y 16:30-21:00.'
              }
            }
          ]
        })}
      </Script>
    </main>
  )
}
