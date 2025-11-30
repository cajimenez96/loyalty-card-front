// ============================================
// Campaign Store - Zustand
// ============================================

import { create } from 'zustand';
import type { Campaign, CampaignProduct } from '@/types';
import { campaignService } from '@/services';

interface CampaignStore {
  activeCampaign: Campaign | null;
  campaigns: Campaign[];
  campaignProducts: CampaignProduct[];
  isLoading: boolean;

  setActiveCampaign: (campaign: Campaign | null) => void;
  fetchCampaigns: () => Promise<void>;
  fetchActiveCampaign: () => Promise<void>;
  fetchCampaignProducts: (campaignId: string) => Promise<void>;
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (id: string, campaign: Partial<Campaign>) => void;
}

export const useCampaignStore = create<CampaignStore>((set, get) => ({
  activeCampaign: null,
  campaigns: [],
  campaignProducts: [],
  isLoading: false,

  setActiveCampaign: (campaign: Campaign | null) => {
    set({ activeCampaign: campaign });
  },

  fetchCampaigns: async () => {
    set({ isLoading: true });
    try {
      const campaigns = await campaignService.getAll();
      set({ campaigns, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchActiveCampaign: async () => {
    set({ isLoading: true });
    try {
      const activeCampaign = await campaignService.getActive();
      set({ activeCampaign, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchCampaignProducts: async (campaignId: string) => {
    set({ isLoading: true });
    try {
      const products = await campaignService.getProducts(campaignId);
      set({ campaignProducts: products, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  addCampaign: (campaign: Campaign) => {
    set({ campaigns: [...get().campaigns, campaign] });
  },

  updateCampaign: (id: string, updatedData: Partial<Campaign>) => {
    set({
      campaigns: get().campaigns.map((c) =>
        c.id === id ? { ...c, ...updatedData } : c
      ),
    });
  },
}));
