// ============================================
// Notification Validation Schema
// ============================================

import { z } from 'zod';

export const notificationSchema = z.object({
  campaignId: z
    .string()
    .min(1, 'Campaña es requerida'),

  destinatarios: z.object({
    tipo: z.enum(['todos', 'especifico', 'ganadores']),
    dni: z.string().optional(),
    campaignId: z.string().optional(),
  }),

  mensaje: z
    .string()
    .min(10, 'Mensaje debe tener mínimo 10 caracteres')
    .max(500, 'Mensaje debe tener máximo 500 caracteres'),

  canal: z.enum(['whatsapp', 'email', 'ambos']),
});

export type NotificationFormData = z.infer<typeof notificationSchema>;
