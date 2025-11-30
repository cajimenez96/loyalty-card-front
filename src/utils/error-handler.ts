// ============================================
// Error Handler Utility
// ============================================

import type { ApiError } from '@/types';
import { ERROR_MESSAGES } from '@/constants';

/**
 * Normaliza errores de la API a un formato consistente
 */
export function handleApiError(error: unknown): ApiError {
  // Error de Axios
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const axiosError = error as {
      response?: {
        data?: { message?: string; error?: string };
        status?: number;
      };
      message?: string;
    };

    return {
      message: axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        axiosError.message ||
        ERROR_MESSAGES.GENERAL.SERVER_ERROR,
      status: axiosError.response?.status,
      code: axiosError.response?.status?.toString(),
    };
  }

  // Error genérico
  if (error instanceof Error) {
    return {
      message: error.message || ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR,
    };
  }

  // Error desconocido
  return {
    message: ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR,
  };
}

/**
 * Determina si un error es de red/conexión
 */
export function isNetworkError(error: unknown): boolean {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message: string }).message.toLowerCase();
    return message.includes('network') || message.includes('connection');
  }
  return false;
}
