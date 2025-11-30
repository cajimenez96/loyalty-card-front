// ============================================
// Client Validation Schema
// ============================================

import { z } from 'zod';
import { DNI_MIN_LENGTH, DNI_MAX_LENGTH, PHONE_MIN_LENGTH, EMAIL_REGEX } from '@/constants';
import { ERROR_MESSAGES } from '@/constants';

export const clientSchema = z.object({
  dni: z
    .string()
    .min(DNI_MIN_LENGTH, `DNI debe tener mínimo ${DNI_MIN_LENGTH} dígitos`)
    .max(DNI_MAX_LENGTH, `DNI debe tener máximo ${DNI_MAX_LENGTH} dígitos`)
    .regex(/^\d+$/, ERROR_MESSAGES.CLIENT.INVALID_DNI),

  nombre: z
    .string()
    .min(2, 'Nombre debe tener mínimo 2 caracteres')
    .max(50, 'Nombre debe tener máximo 50 caracteres'),

  apellido: z
    .string()
    .min(2, 'Apellido debe tener mínimo 2 caracteres')
    .max(50, 'Apellido debe tener máximo 50 caracteres')
    .optional(),

  telefono: z
    .string()
    .min(PHONE_MIN_LENGTH, `Teléfono debe tener mínimo ${PHONE_MIN_LENGTH} dígitos`)
    .regex(/^\d+$/, ERROR_MESSAGES.CLIENT.INVALID_PHONE),

  email: z
    .string()
    .regex(EMAIL_REGEX, 'Email inválido')
    .optional()
    .or(z.literal('')),
});

export type ClientFormData = z.infer<typeof clientSchema>;
