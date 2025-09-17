'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Script from 'next/script'
import { MapPin, Phone, Mail, Clock, Users, Trophy, Star, X, ChevronLeft, ChevronRight, Facebook, Instagram, Menu } from 'lucide-react'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [showReservationModal, setShowReservationModal] = useState(false)
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  const galleryImages = [
    { src: '/images/pistas.jpg', alt: 'Pistas de Padel Principales', title: 'Pistas Profesionales' },
    { src: '/images/pistas2.webp', alt: 'Vista General de las Pistas', title: 'Instalaciones Completas' },
    { src: '/images/recepcion.webp', alt: 'Área de Recepción', title: 'Zona de Recepción' },
    { src: '/images/chica-padel.jpg', alt: 'Jugadora en Acción', title: 'Experiencia de Juego' }
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
                src="/images/logo.webp"
                alt="K27 Padel Logo"
                width={60}
                height={60}
                className="mr-3"
              />
              <span className="text-2xl font-bold gradient-text">K27 PADEL</span>
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
            src="/images/pistas.jpg"
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
                src="/images/chica-padel.jpg"
                alt="Jugadora de Padel"
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
                  <h3 className="text-xl font-semibold text-white">Excelencia Deportiva</h3>
                  <p className="text-gray-400">Instalaciones de nivel profesional</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-padel-red p-3 rounded-full">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Comunidad Activa</h3>
                  <p className="text-gray-400">Más de 500 jugadores activos</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-padel-red p-3 rounded-full">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Experiencia Premium</h3>
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
                src="/images/pistas2.webp"
                alt="Pistas de Padel"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">Pistas Profesionales</h3>
                <p className="text-gray-400">
                  4 pistas de última generación con césped artificial premium y sistema de iluminación LED profesional.
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
                src="/images/recepcion.webp"
                alt="Recepción"
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
                src="/images/chica-padel.jpg"
                alt="Jugadora con Material de Padel"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">Alquiler de Material</h3>
                <p className="text-gray-400">
                  Palas profesionales, pelotas de calidad y todo el equipamiento necesario disponible para alquilar.
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
              Estratégicamente ubicados en Esquivias, Toledo, con fácil acceso desde la A-4 y amplio estacionamiento gratuito.
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
                    Plaza Industrial Ctra. Borox<br />
                    45221 Esquivias, Toledo, España
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
                    Lunes a Domingo: 7:00 - 23:00
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
                    +34 91 123 45 67<br />
                    info@k27padel.com
                  </p>
                </div>
              </div>

              <div className="bg-padel-black rounded-xl p-6 border border-padel-red/20">
                <h4 className="text-lg font-semibold text-white mb-3">Cómo llegar</h4>
                <ul className="text-gray-400 space-y-2">
                  <li>• Desde Toledo: 15 minutos por la CM-4000</li>
                  <li>• Desde Madrid: 45 minutos por la A-4</li>
                  <li>• Fácil acceso desde la autopista A-4</li>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.2!2d-3.7!3d40.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPlaza%20Industrial%20Ctra.%20Borox%2C%20Esquivias%2C%20Toledo%2C%20Spain!5e0!3m2!1sen!2ses!4v1634567890123!5m2!1sen!2ses"
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
                  En Esquivias, Toledo, con excelente acceso desde la A-4 y amplio parking gratuito para tu comodidad.
                </p>
                <button 
                  onClick={() => window.open('https://maps.google.com/?q=Plaza+Industrial+Ctra.+Borox,+Esquivias,+Toledo,+Spain', '_blank')}
                  className="bg-padel-red hover:bg-padel-red-dark text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Ver en Google Maps
                </button>
              </div>
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
                  src="/images/logo.webp"
                  alt="K27 Padel Logo"
                  width={40}
                  height={40}
                  className="mr-3"
                />
                <span className="text-xl font-bold gradient-text">K27 PADEL</span>
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
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 bg-padel-red rounded-full flex items-center justify-center hover:bg-padel-red-dark transition-colors"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
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
              © 2024 K27 Padel. Todos los derechos reservados.
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
                <p className="text-gray-400">Llámanos para reservar tu pista</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-padel-black rounded-xl p-4 border border-padel-red/20">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-padel-red" />
                    <div>
                      <p className="text-white font-semibold">Teléfono</p>
                      <p className="text-padel-red text-lg font-bold">+34 91 123 45 67</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-padel-black rounded-xl p-4 border border-padel-red/20">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-padel-red" />
                    <div>
                      <p className="text-white font-semibold">Email</p>
                      <p className="text-padel-red font-bold">reservas@k27padel.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-padel-black rounded-xl p-4 border border-padel-red/20">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-padel-red" />
                    <div>
                      <p className="text-white font-semibold">Horario de Reservas</p>
                      <p className="text-gray-300">Lunes a Domingo: 7:00 - 23:00</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <a 
                  href="tel:+34911234567" 
                  className="flex-1 bg-padel-red hover:bg-padel-red-dark text-white py-3 rounded-full font-semibold text-center transition-colors"
                >
                  Llamar Ahora
                </a>
                <a 
                  href="mailto:reservas@k27padel.com" 
                  className="flex-1 border border-padel-red text-padel-red hover:bg-padel-red hover:text-white py-3 rounded-full font-semibold text-center transition-colors"
                >
                  Enviar Email
                </a>
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
              className="bg-padel-gray rounded-2xl p-6 max-w-4xl w-full border border-padel-red/20 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModals}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold gradient-text mb-2">Nuestras Instalaciones</h3>
                <p className="text-gray-400">Descubre nuestras instalaciones de primera clase</p>
              </div>
              
              <div className="relative">
                <div className="aspect-video relative overflow-hidden rounded-xl">
                  <Image
                    src={galleryImages[currentImageIndex].src}
                    alt={galleryImages[currentImageIndex].alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h4 className="text-white text-xl font-bold">{galleryImages[currentImageIndex].title}</h4>
                    <p className="text-gray-300">{galleryImages[currentImageIndex].alt}</p>
                  </div>
                </div>
                
                {/* Navigation buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-padel-red/80 hover:bg-padel-red text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-padel-red/80 hover:bg-padel-red text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                {/* Image counter */}
                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
              </div>
              
              {/* Thumbnail navigation */}
              <div className="flex justify-center space-x-2 mt-4">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
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
          name: 'K27 Padel',
          image: ['/images/logo.webp'],
          url: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
          telephone: '+34 91 123 45 67',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Plaza Industrial Ctra. Borox',
            addressLocality: 'Esquivias',
            addressRegion: 'Toledo',
            postalCode: '45221',
            addressCountry: 'ES'
          },
          openingHours: ['Mo-Su 07:00-23:00'],
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 40.1,
            longitude: -3.7
          },
          sameAs: [
            '#', // Facebook URL to be provided
            '#', // Instagram URL to be provided
          ]
        })}
      </Script>
    </main>
  )
}
