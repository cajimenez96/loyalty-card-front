// ============================================
// Reward Service
// ============================================

import { api } from './api.service';
import { API_ENDPOINTS } from '@/constants';
import type { RewardRedemption, RedemptionResponse, Reward, ApiResponse } from '@/types';

export const rewardService = {
  /**
   * Validar código de ganador
   */
  async validate(codigo: string): Promise<boolean> {
    try {
      const response = await api.post<ApiResponse<{ valid: boolean }>>(
        API_ENDPOINTS.REWARDS.VALIDATE,
        { codigo }
      );

      return response.data.data?.valid || false;
    } catch {
      return false;
    }
  },

  /**
   * Canjear premio
   */
  async redeem(data: RewardRedemption): Promise<RedemptionResponse> {
    const response = await api.post<ApiResponse<RedemptionResponse>>(
      API_ENDPOINTS.REWARDS.REDEEM,
      data
    );

    if (response.data.data) {
      return response.data.data;
    }

    throw new Error('Invalid response');
  },

  /**
   * Obtener premios de una campaña
   */
  async getByCampaign(campaignId: string): Promise<Reward[]> {
    const response = await api.get<ApiResponse<Reward[]>>(
      API_ENDPOINTS.REWARDS.BY_CAMPAIGN(campaignId)
    );

    return response.data.data || [];
  },
};
