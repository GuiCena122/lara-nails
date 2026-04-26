import { z } from 'zod';

export const serviceSchema = z.object({
  name: z.string().min(1, "Le nom est obligatoire"),
  price: z.number().positive("Le prix doit être positif"),
  duration_minutes: z.number().int().min(15, "Durée minimale 15min").max(480),
  description: z.string().optional(),
});

export const appointmentSchema = z.object({
  client_name: z.string().min(1, "Le nom est obligatoire"),
  service_name: z.string().min(1, "Veuillez choisir une prestation"),
  appointment_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date invalide"),
  appointment_time: z.string().regex(/^\d{2}:\d{2}$/, "Heure invalide"),
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).default('pending'),
});

export const profileSchema = z.object({
  full_name: z.string().min(1),
  phone: z.string().min(8),
  is_admin: z.boolean().default(false),
});
