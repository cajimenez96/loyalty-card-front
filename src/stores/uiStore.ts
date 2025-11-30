// ============================================
// UI Store - Zustand
// ============================================

import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
}

interface UIStore {
  modal: ModalState;
  isLoading: boolean;
  loadingMessage?: string;

  openModal: (title: string, content: React.ReactNode) => void;
  closeModal: () => void;
  setLoading: (isLoading: boolean, message?: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  modal: {
    isOpen: false,
  },
  isLoading: false,
  loadingMessage: undefined,

  openModal: (title: string, content: React.ReactNode) => {
    set({
      modal: {
        isOpen: true,
        title,
        content,
      },
    });
  },

  closeModal: () => {
    set({
      modal: {
        isOpen: false,
        title: undefined,
        content: undefined,
      },
    });
  },

  setLoading: (isLoading: boolean, message?: string) => {
    set({ isLoading, loadingMessage: message });
  },
}));
