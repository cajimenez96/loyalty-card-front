// ============================================
// Campaigns Table Component for Admin
// ============================================

import { useMemo, useState } from 'react';
import { Table, Button, type TableColumn } from '@/components/common';
import { useCampaign } from '@/hooks';
import { formatDate } from '@/utils';
import type { Campaign, CampaignStatus } from '@/types';

interface CampaignsTableProps {
  onCreateClick: () => void;
  onEditClick: (campaign: Campaign) => void;
}

export function CampaignsTable({ onCreateClick, onEditClick }: CampaignsTableProps) {
  const { campaigns, isLoading } = useCampaign();
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | 'todas'>('todas');

  const filteredCampaigns = useMemo(() => {
    if (statusFilter === 'todas') return campaigns;
    return campaigns.filter(c => c.status === statusFilter);
  }, [campaigns, statusFilter]);

  const columns: TableColumn<Campaign>[] = [
    {
      key: 'nombre',
      label: 'Nombre',
      render: (campaign) => (
        <div>
          <p className="font-medium text-gray-900">{campaign.nombre}</p>
          {campaign.descripcion && (
            <p className="text-sm text-gray-500">{campaign.descripcion}</p>
          )}
        </div>
      ),
    },
    {
      key: 'fechaInicio',
      label: 'Fecha Inicio',
      render: (campaign) => formatDate(campaign.fechaInicio),
    },
    {
      key: 'fechaFin',
      label: 'Fecha Fin',
      render: (campaign) => formatDate(campaign.fechaFin),
    },
    {
      key: 'status',
      label: 'Estado',
      render: (campaign) => {
        const statusColors = {
          activa: 'bg-green-100 text-green-800',
          vencida: 'bg-gray-100 text-gray-800',
          proxima: 'bg-blue-100 text-blue-800',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[campaign.status]}`}>
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </span>
        );
      },
    },
    {
      key: 'puntosRequeridos',
      label: 'Puntos Requeridos',
      render: (campaign) => campaign.puntosRequeridos || 'N/A',
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (campaign) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onEditClick(campaign)}
        >
          Editar
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header with filters */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {(['todas', 'activa', 'proxima', 'vencida'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <Button variant="primary" onClick={onCreateClick}>
          + Nueva Campaña
        </Button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-purple-600 border-t-transparent rounded-full" />
        </div>
      ) : (
        <Table
          columns={columns}
          data={filteredCampaigns}
          keyExtractor={(campaign) => campaign.id}
          itemsPerPage={10}
        />
      )}
    </div>
  );
}
