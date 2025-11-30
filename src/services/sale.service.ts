// ============================================
// Sale Service
// ============================================

import { api } from './api.service';
import { API_ENDPOINTS } from '@/constants';
import type { SaleRecord, SaleResponse, ApiResponse } from '@/types';

export const saleService = {
  /**
   * Registrar nueva compra
   */
  async create(data: SaleRecord): Promise<SaleResponse> {
    const response = await api.post<ApiResponse<SaleResponse>>(
      API_ENDPOINTS.SALES.CREATE,
      data
    );

    if (response.data.data) {
      return response.data.data;
    }

    throw new Error('Invalid response');
  },

  /**
   * Obtener ventas de un cliente
   */
  async getByClient(clientId: string): Promise<SaleResponse[]> {
    const response = await api.get<ApiResponse<SaleResponse[]>>(
      API_ENDPOINTS.SALES.BY_CLIENT(clientId)
    );

    return response.data.data || [];
  },
};
