// ============================================
// Campaign Types
// ============================================

export type CampaignStatus = 'activa' | 'vencida' | 'proxima';

export interface Campaign {
  id: string;
  nombre: string;
  descripcion?: string;
  fechaInicio: string;
  fechaFin: string;
  status: CampaignStatus;
  productos: CampaignProduct[];
  premios: string[];
  puntosRequeridos: number;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignProduct {
  id: string;
  campaignId: string;
  productoId?: string;
  comboId?: string;
  codPuntos: string;
  nombre: string;
  puntos: number;
  tipo: 'producto' | 'combo';
}

export interface CampaignData {
  nombre: string;
  descripcion?: string;
  fechaInicio: string;
  fechaFin: string;
  premios?: string[];
  puntosRequeridos?: number;
}
