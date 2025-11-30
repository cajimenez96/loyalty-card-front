// ============================================
// Auth Types
// ============================================

export type Role = 'cajero' | 'admin' | 'marketing';

export interface User {
  id: string;
  role: Role;
  name: string;
  pin?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginRequest {
  pin: string;
}

export interface LoginResponse {
  user: User;
  token?: string;
}
