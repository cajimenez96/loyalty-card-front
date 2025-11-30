// ============================================
// Sale Types
// ============================================

export interface Sale {
  id: string;
  clientId: string;
  campaignId: string;
  productoId?: string;
  comboId?: string;
  codPuntos: string;
  puntos: number;
  createdAt: string;
}

export interface SaleRecord {
  clientDni: string;
  campaignId: string;
  codPuntos: string;
}

export interface QRData {
  saleId: string;
  clientDni: string;
  puntos: number;
  fecha: string;
  url: string;
}

export interface SaleResponse {
  sale: Sale;
  qrUrl: string;
  totalPuntos: number;
}
