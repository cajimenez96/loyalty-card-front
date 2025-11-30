// ============================================
// QR Generator Utility
// ============================================

import type { QRData } from '@/types';

/**
 * Genera la URL dinámica para el QR code después de registrar una compra
 * La URL incluye parámetros con información de la venta
 */
export function generateQRUrl(qrData: QRData): string {
  const baseUrl = import.meta.env.VITE_QR_BASE_URL || 'https://loyalty.example.com/sale';

  const params = new URLSearchParams({
    id: qrData.saleId,
    dni: qrData.clientDni,
    puntos: qrData.puntos.toString(),
    fecha: qrData.fecha,
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Valida si una URL de QR es válida
 */
export function isValidQRUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.has('id') &&
      urlObj.searchParams.has('dni') &&
      urlObj.searchParams.has('puntos');
  } catch {
    return false;
  }
}
