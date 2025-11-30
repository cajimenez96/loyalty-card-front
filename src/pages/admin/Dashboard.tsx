// ============================================
// Admin Dashboard - Campaigns & Redemptions
// ============================================

import { useState } from 'react';
import {
  CampaignsTable,
  CampaignModal,
  RedemptionForm,
  WinnerConfirmation,
} from '@/components/admin';
import { useCampaign } from '@/hooks';
import type { Campaign, RedemptionResponse } from '@/types';

type TabType = 'campaigns' | 'redemption';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('campaigns');
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | undefined>();
  const [showWinnerConfirmation, setShowWinnerConfirmation] = useState(false);
  const [redemptionData, setRedemptionData] = useState<RedemptionResponse | null>(null);

  const { fetchCampaigns } = useCampaign();

  const handleCreateCampaign = () => {
    setSelectedCampaign(undefined);
    setShowCampaignModal(true);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowCampaignModal(true);
  };

  const handleCampaignSuccess = () => {
    fetchCampaigns();
  };

  const handleRedemptionSuccess = (data: RedemptionResponse) => {
    setRedemptionData(data);
    setShowWinnerConfirmation(true);
  };

  const tabs = [
    { id: 'campaigns' as const, label: 'Gestión de Campañas', icon: '🎯' },
    { id: 'redemption' as const, label: 'Canje de Premios', icon: '🎁' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
        <p className="text-purple-100">
          Gestione campañas, productos y canjee premios de los ganadores
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="text-xl mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'campaigns' && (
            <CampaignsTable
              onCreateClick={handleCreateCampaign}
              onEditClick={handleEditCampaign}
            />
          )}

          {activeTab === 'redemption' && (
            <RedemptionForm onRedemptionSuccess={handleRedemptionSuccess} />
          )}
        </div>
      </div>

      {/* Modals */}
      <CampaignModal
        isOpen={showCampaignModal}
        onClose={() => setShowCampaignModal(false)}
        onSuccess={handleCampaignSuccess}
        campaign={selectedCampaign}
      />

      <WinnerConfirmation
        isOpen={showWinnerConfirmation}
        onClose={() => setShowWinnerConfirmation(false)}
        redemptionData={redemptionData}
      />
    </div>
  );
}

