// ============================================
// Auth Service
// ============================================

import { api } from './api.service';
import { API_ENDPOINTS } from '@/constants';
import type { LoginRequest, LoginResponse, ApiResponse } from '@/types';

export const authService = {
  /**
   * Login con PIN
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );

    if (response.data.data) {
      // Guardar token y user en localStorage
      if (response.data.data.token) {
        localStorage.setItem('auth_token', response.data.data.token);
      }
      localStorage.setItem('auth_user', JSON.stringify(response.data.data.user));

      return response.data.data;
    }

    throw new Error('Invalid response');
  },

  /**
   * Logout
   */
  async logout(): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      // Limpiar localStorage siempre
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  },

  /**
   * Verificar token actual
   */
  async verify(): Promise<LoginResponse> {
    const response = await api.get<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.VERIFY
    );

    if (response.data.data) {
      return response.data.data;
    }

    throw new Error('Invalid response');
  },
};
