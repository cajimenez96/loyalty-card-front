// ============================================
// Campaign Validation Schema
// ============================================

import { z } from 'zod';

export const campaignSchema = z.object({
  nombre: z
    .string()
    .min(3, 'Nombre debe tener mínimo 3 caracteres')
    .max(100, 'Nombre debe tener máximo 100 caracteres'),

  descripcion: z
    .string()
    .max(500, 'Descripción debe tener máximo 500 caracteres')
    .optional()
    .or(z.literal('')),

  fechaInicio: z
    .string()
    .min(1, 'Fecha de inicio es requerida'),

  fechaFin: z
    .string()
    .min(1, 'Fecha de fin es requerida'),

  premios: z
    .array(z.string())
    .optional(),

  puntosRequeridos: z
    .number()
    .min(1, 'Puntos requeridos debe ser mayor a 0')
    .optional(),
}).refine(
  (data) => {
    const inicio = new Date(data.fechaInicio);
    const fin = new Date(data.fechaFin);
    return inicio < fin;
  },
  {
    message: 'Fecha de inicio debe ser anterior a fecha de fin',
    path: ['fechaFin'],
  }
);

export type CampaignFormData = z.infer<typeof campaignSchema>;
