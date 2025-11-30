// ============================================
// Sale Validation Schema
// ============================================

import { z } from 'zod';

export const saleSchema = z.object({
  clientDni: z
    .string()
    .min(7, 'DNI debe tener mínimo 7 dígitos')
    .max(8, 'DNI debe tener máximo 8 dígitos')
    .regex(/^\d+$/, 'DNI debe contener solo números'),

  campaignId: z
    .string()
    .min(1, 'Campaña es requerida'),

  codPuntos: z
    .string()
    .min(1, 'Producto/Combo es requerido'),
});

export type SaleFormData = z.infer<typeof saleSchema>;
