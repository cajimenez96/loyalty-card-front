// ============================================
// useCampaign Hook
// ============================================

import { useEffect, useCallback } from 'react';
import { useCampaignStore } from '@/stores';
import { useShallow } from 'zustand/react/shallow';
import type { CampaignStatus, Campaign } from '@/types';

/**
 * Hook para gestión de campañas
 */
export function useCampaign() {
  const {
    activeCampaign,
    campaigns,
    campaignProducts,
    isLoading,
    fetchCampaigns,
    fetchActiveCampaign,
    fetchCampaignProducts,
  } = useCampaignStore(
    useShallow((state) => ({
      activeCampaign: state.activeCampaign,
      campaigns: state.campaigns,
      campaignProducts: state.campaignProducts,
      isLoading: state.isLoading,
      fetchCampaigns: state.fetchCampaigns,
      fetchActiveCampaign: state.fetchActiveCampaign,
      fetchCampaignProducts: state.fetchCampaignProducts,
    }))
  );

  // Auto-fetch active campaign on mount
  useEffect(() => {
    if (!activeCampaign) {
      fetchActiveCampaign().catch(console.error);
    }
  }, [activeCampaign, fetchActiveCampaign]);

  const getCampaignsByStatus = useCallback(
    (status: CampaignStatus) => {
      return campaigns.filter((c: Campaign) => c.status === status);
    },
    [campaigns]
  );

  const loadCampaignProducts = useCallback(
    async (campaignId: string) => {
      await fetchCampaignProducts(campaignId);
    },
    [fetchCampaignProducts]
  );

  return {
    activeCampaign,
    campaigns,
    campaignProducts,
    isLoading,
    fetchCampaigns,
    fetchActiveCampaign,
    getCampaignsByStatus,
    loadCampaignProducts,
  };
}
