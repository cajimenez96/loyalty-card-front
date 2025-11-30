// ============================================
// Validator Utility Functions
// ============================================

import { DNI_REGEX, PHONE_REGEX, EMAIL_REGEX, PIN_REGEX, WINNER_CODE_REGEX } from '@/constants';

/**
 * Valida un DNI argentino (7-8 dígitos)
 */
export function isValidDNI(dni: string): boolean {
  const cleaned = dni.replace(/\D/g, '');
  return DNI_REGEX.test(cleaned);
}

/**
 * Valida un número de teléfono
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && PHONE_REGEX.test(phone);
}

/**
 * Valida un email
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Valida un PIN (4-6 dígitos)
 */
export function isValidPIN(pin: string): boolean {
  return PIN_REGEX.test(pin);
}

/**
 * Valida un código de ganador (5 caracteres alfanuméricos)
 */
export function isValidWinnerCode(code: string): boolean {
  return WINNER_CODE_REGEX.test(code);
}

/**
 * Valida que una fecha inicio sea menor que fecha fin
 */
export function isValidDateRange(startDate: string, endDate: string): boolean {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start < end;
}

/**
 * Limpia un DNI removiendo caracteres no numéricos
 */
export function cleanDNI(dni: string): string {
  return dni.replace(/\D/g, '');
}

/**
 * Limpia un teléfono removiendo caracteres no numéricos
 */
export function cleanPhone(phone: string): string {
  return phone.replace(/\D/g, '');
}
