// ============================================
// useAuth Hook
// ============================================

import { useCallback } from 'react';
import { useAuthStore } from '@/stores';

/**
 * Hook para gestión de autenticación
 */
export function useAuth() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuthStore(
    (state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,
      login: state.login,
      logout: state.logout,
    })
  );

  const handleLogin = useCallback(
    async (pin: string) => {
      await login(pin);
    },
    [login]
  );

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const hasRole = useCallback(
    (role: string) => {
      return user?.role === role;
    },
    [user]
  );

  return {
    user,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    hasRole,
  };
}
