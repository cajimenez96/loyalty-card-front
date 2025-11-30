// ============================================
// useClient Hook
// ============================================

import { useCallback } from 'react';
import { useClientStore } from '@/stores';
import { useShallow } from 'zustand/react/shallow';
import type { ClientData } from '@/types';

/**
 * Hook para gestión de clientes
 */
export function useClient() {
  const {
    currentClient,
    clientsHistory,
    isLoading,
    findClientByDNI,
    createClient,
    clearCurrentClient,
  } = useClientStore(
    useShallow((state) => ({
      currentClient: state.currentClient,
      clientsHistory: state.clientsHistory,
      isLoading: state.isLoading,
      findClientByDNI: state.findClientByDNI,
      createClient: state.createClient,
      clearCurrentClient: state.clearCurrentClient,
    }))
  );

  const searchByDNI = useCallback(
    async (dni: string) => {
      if (!dni || dni.length < 7) return null;
      return await findClientByDNI(dni);
    },
    [findClientByDNI]
  );

  const create = useCallback(
    async (data: ClientData) => {
      return await createClient(data);
    },
    [createClient]
  );

  const clear = useCallback(() => {
    clearCurrentClient();
  }, [clearCurrentClient]);

  return {
    currentClient,
    clientsHistory,
    isLoading,
    searchByDNI,
    createClient: create,
    clearCurrentClient: clear,
  };
}
