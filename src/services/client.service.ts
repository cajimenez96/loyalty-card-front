// ============================================
// Client Service
// ============================================

import { api } from './api.service';
import { API_ENDPOINTS } from '@/constants';
import type { Client, ClientData, ApiResponse } from '@/types';

export const clientService = {
  /**
   * Buscar cliente por DNI
   */
  async findByDNI(dni: string): Promise<Client | null> {
    try {
      const response = await api.get<ApiResponse<Client>>(
        API_ENDPOINTS.CLIENTS.BY_DNI(dni)
      );

      return response.data.data || null;
    } catch {
      // Si no se encuentra, devolver null
      return null;
    }
  },

  /**
   * Crear nuevo cliente
   */
  async create(data: ClientData): Promise<Client> {
    const response = await api.post<ApiResponse<Client>>(
      API_ENDPOINTS.CLIENTS.CREATE,
      data
    );

    if (response.data.data) {
      return response.data.data;
    }

    throw new Error('Invalid response');
  },

  /**
   * Obtener historial de clientes
   */
  async getAll(): Promise<Client[]> {
    const response = await api.get<ApiResponse<Client[]>>(
      API_ENDPOINTS.CLIENTS.BASE
    );

    return response.data.data || [];
  },
};
