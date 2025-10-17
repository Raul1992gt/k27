import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Reservas | Padel K27',
  description: 'Gestiona tu reserva en nuestro sistema online.',
}

export default function ReservarRedirectPage() {
  // Redirección inmediata a la plataforma externa de reservas
  return redirect('https://k27.taykus.com/')
}
