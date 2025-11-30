// ============================================
// Client Store - Zustand
// ============================================

import { create } from 'zustand';
import type { Client } from '@/types';
import { clientService } from '@/services';

interface ClientStore {
  currentClient: Client | null;
  clientsHistory: Client[];
  isLoading: boolean;

  setCurrentClient: (client: Client | null) => void;
  findClientByDNI: (dni: string) => Promise<Client | null>;
  createClient: (data: { dni: string; nombre: string; telefono: string; apellido?: string; email?: string }) => Promise<Client>;
  addToHistory: (client: Client) => void;
  clearCurrentClient: () => void;
}

export const useClientStore = create<ClientStore>((set, get) => ({
  currentClient: null,
  clientsHistory: [],
  isLoading: false,

  setCurrentClient: (client: Client | null) => {
    set({ currentClient: client });
  },

  findClientByDNI: async (dni: string) => {
    set({ isLoading: true });
    try {
      const client = await clientService.findByDNI(dni);
      set({ currentClient: client, isLoading: false });

      if (client) {
        get().addToHistory(client);
      }

      return client;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  createClient: async (data) => {
    set({ isLoading: true });
    try {
      const client = await clientService.create(data);
      set({ currentClient: client, isLoading: false });
      get().addToHistory(client);
      return client;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  addToHistory: (client: Client) => {
    const history = get().clientsHistory;
    const exists = history.some((c) => c.id === client.id);

    if (!exists) {
      set({ clientsHistory: [client, ...history].slice(0, 10) }); // Mantener últimos 10
    }
  },

  clearCurrentClient: () => {
    set({ currentClient: null });
  },
}));
