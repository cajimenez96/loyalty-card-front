// ============================================
// useQRCode Hook
// ============================================

import { useState, useCallback } from 'react';
import type { QRData } from '@/types';
import { generateQRUrl } from '@/utils';

/**
 * Hook para generación y gestión de QR codes
 */
export function useQRCode() {
  const [qrData, setQRData] = useState<QRData | null>(null);
  const [qrUrl, setQrUrl] = useState<string>('');

  const generateQR = useCallback((data: QRData) => {
    const url = generateQRUrl(data);
    setQRData(data);
    setQrUrl(url);
  }, []);

  const clearQR = useCallback(() => {
    setQRData(null);
    setQrUrl('');
  }, []);

  return {
    qrData,
    qrUrl,
    generateQR,
    clearQR,
  };
}
