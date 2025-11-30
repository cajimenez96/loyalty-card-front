// ============================================
// Campaign Service
// ============================================

import { api } from './api.service';
import { API_ENDPOINTS } from '@/constants';
import type { Campaign, CampaignData, CampaignProduct, ApiResponse } from '@/types';

export const campaignService = {
  /**
   * Obtener todas las campañas
   */
  async getAll(): Promise<Campaign[]> {
    const response = await api.get<ApiResponse<Campaign[]>>(
      API_ENDPOINTS.CAMPAIGNS.BASE
    );

    return response.data.data || [];
  },

  /**
   * Obtener campaña activa
   */
  async getActive(): Promise<Campaign | null> {
    try {
      const response = await api.get<ApiResponse<Campaign>>(
        API_ENDPOINTS.CAMPAIGNS.ACTIVE
      );

      return response.data.data || null;
    } catch {
      return null;
    }
  },

  /**
   * Crear nueva campaña
   */
  async create(data: CampaignData): Promise<Campaign> {
    const response = await api.post<ApiResponse<Campaign>>(
      API_ENDPOINTS.CAMPAIGNS.BASE,
      data
    );

    if (response.data.data) {
      return response.data.data;
    }

    throw new Error('Invalid response');
  },

  /**
   * Actualizar campaña
   */
  async update(id: string, data: Partial<CampaignData>): Promise<Campaign> {
    const response = await api.put<ApiResponse<Campaign>>(
      API_ENDPOINTS.CAMPAIGNS.BY_ID(id),
      data
    );

    if (response.data.data) {
      return response.data.data;
    }

    throw new Error('Invalid response');
  },

  /**
   * Obtener productos de una campaña
   */
  async getProducts(campaignId: string): Promise<CampaignProduct[]> {
    const response = await api.get<ApiResponse<CampaignProduct[]>>(
      API_ENDPOINTS.CAMPAIGNS.PRODUCTS(campaignId)
    );

    return response.data.data || [];
  },
};
