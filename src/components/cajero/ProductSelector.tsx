// ============================================
// Product Selector Component for Cajero
// ============================================

import { useEffect, useMemo } from 'react';
import { SearchSelect, type SearchSelectOption } from '@/components/common';
import { useCampaign } from '@/hooks';
import toast from 'react-hot-toast';

interface ProductSelectorProps {
  value?: string;
  onChange: (codPuntos: string) => void;
  error?: string;
}

export function ProductSelector({ value, onChange, error }: ProductSelectorProps) {
  const { activeCampaign, campaignProducts, loadCampaignProducts, isLoading } = useCampaign();

  useEffect(() => {
    if (activeCampaign && campaignProducts.length === 0) {
      loadCampaignProducts(activeCampaign.id).catch(() => {
        toast.error('Error al cargar productos de campaña');
      });
    }
  }, [activeCampaign, campaignProducts.length, loadCampaignProducts]);

  const productOptions: SearchSelectOption[] = useMemo(() => {
    return campaignProducts.map((product) => ({
      value: product.codPuntos,
      label: `${product.nombre} - ${product.puntos} puntos (${product.tipo})`,
      metadata: {
        puntos: product.puntos,
        tipo: product.tipo,
      },
    }));
  }, [campaignProducts]);

  if (!activeCampaign) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          No hay campaña activa. Por favor, contacte al administrador.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Seleccionar Producto/Combo
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Campaña activa: <strong>{activeCampaign.nombre}</strong>
        </p>
      </div>

      <SearchSelect
        label="Producto o Combo (COD_PUNTOS)"
        options={productOptions}
        value={value}
        onChange={onChange}
        placeholder="Buscar producto o combo..."
        searchPlaceholder="Escribe para buscar..."
        error={error}
      />

      {productOptions.length === 0 && (
        <div className="mt-3 text-sm text-gray-500">
          No hay productos configurados para esta campaña.
        </div>
      )}
    </div>
  );
}
