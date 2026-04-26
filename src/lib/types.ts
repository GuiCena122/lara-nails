export interface Service {
  id: string;
  name: string;
  price: number;
  duration_minutes: number;
  description?: string;
  active: boolean;
}

export interface Appointment {
  id: string;
  client_name: string;
  client_email?: string;
  client_phone?: string;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  price?: number;
  notes?: string;
  created_at: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  visits: number;
  spentValue: number;
  spent: string;
  rating: number;
  status: string;
}
