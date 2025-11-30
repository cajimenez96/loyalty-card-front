// ============================================
// Notification Service
// ============================================

import { api } from './api.service';
import { API_ENDPOINTS } from '@/constants';
import type { NotificationData, NotificationResponse, ApiResponse } from '@/types';

export const notificationService = {
  /**
   * Enviar notificaciones masivas
   */
  async send(data: NotificationData): Promise<NotificationResponse> {
    const response = await api.post<ApiResponse<NotificationResponse>>(
      API_ENDPOINTS.NOTIFICATIONS.SEND,
      data
    );

    if (response.data.data) {
      return response.data.data;
    }

    throw new Error('Invalid response');
  },
};
