// ============================================
// API Service - Axios Client Configuration
// ============================================

import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { API_BASE_URL, REQUEST_TIMEOUT } from '@/constants';
import { handleApiError } from '@/utils';

/**
 * Cliente Axios configurado con interceptors
 */
class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: REQUEST_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - agregar token si existe
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(handleApiError(error));
      }
    );

    // Response interceptor - manejar errores globales
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Si es 401, limpiar auth y redirigir a login
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          window.location.href = '/login';
        }

        return Promise.reject(handleApiError(error));
      }
    );
  }

  public getClient(): AxiosInstance {
    return this.api;
  }
}

export const apiService = new ApiService();
export const api = apiService.getClient();
