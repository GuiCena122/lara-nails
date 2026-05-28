export interface Service {
  id: string
  name: string
  price: number
  duration_minutes: number
  description?: string
  active: boolean
}

export interface Appointment {
  id: number
  client_name: string
  client_email: string | null
  client_phone: string | null
  service_name: string
  appointment_date: string
  appointment_time: string
  price: number
  status: string
  payment_type: string
  notes?: string
  created_at?: string
}

export interface ClientProfile {
  id: string
  name: string
  email?: string
  phone?: string
  visits: number
  spentValue: number
  spent: string
  rating: number
  status: string
}

export function statusBadge(s: string) {
  if (s === 'confirmed') return 'bg-green-500/20 text-green-400'
  if (s === 'pending') return 'bg-amber-500/20 text-amber-400'
  return 'bg-rose-500/20 text-rose-400'
}

export function statusLabel(s: string) {
  if (s === 'confirmed') return 'Confirmé'
  if (s === 'pending') return 'En attente'
  if (s === 'cancelled') return 'Annulé'
  return s
}

export function statusBorder(s: string) {
  if (s === 'confirmed') return 'border-l-[#4ade80]'
  if (s === 'pending') return 'border-l-amber-400'
  return 'border-l-rose-400'
}

export function statusDot(s: string) {
  if (s === 'confirmed') return 'bg-green-500'
  if (s === 'pending') return 'bg-amber-400'
  return 'bg-rose-400'
}
