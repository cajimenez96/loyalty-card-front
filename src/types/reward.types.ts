// ============================================
// Reward Types
// ============================================

export interface Reward {
  id: string;
  campaignId: string;
  clientId: string;
  codigo: string;
  puntos: number;
  canjeado: boolean;
  fechaCanje?: string;
  createdAt: string;
}

export interface RewardRedemption {
  codigo: string;
}

export interface RedemptionResponse {
  reward: Reward;
  client: {
    nombre: string;
    apellido?: string;
    dni: string;
    puntos: number;
  };
  message: string;
}

export interface WinnerCode {
  codigo: string;
  isValid: boolean;
  isRedeemed: boolean;
}
