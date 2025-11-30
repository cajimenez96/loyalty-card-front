// ============================================
// Sale Registration Component for Cajero
// ============================================

import { useState } from 'react';
import { Button } from '@/components/common';
import { useClient, useCampaign } from '@/hooks';
import { saleService } from '@/services';
import toast from 'react-hot-toast';
import type { QRData } from '@/types';

interface SaleRegistrationProps {
  clientId: string;
  codPuntos: string;
  onSaleComplete: (qrData: QRData) => void;
}

export function SaleRegistration({
  clientId,
  codPuntos,
  onSaleComplete,
}: SaleRegistrationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentClient } = useClient();
  const { activeCampaign } = useCampaign();

  const handleRegisterSale = async () => {
    if (!currentClient || !activeCampaign) {
      toast.error('Faltan datos del cliente o campaña');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await saleService.create({
        clientDni: currentClient.dni,
        campaignId: activeCampaign.id,
        codPuntos,
      });

      // Crear QR Data
      const qrData: QRData = {
        saleId: response.sale.id,
        clientDni: currentClient.dni,
        puntos: response.sale.puntos,
        fecha: response.sale.createdAt,
        url: response.qrUrl,
      };

      toast.success('Venta registrada exitosamente');
      onSaleComplete(qrData);
    } catch (error) {
      toast.error('Error al registrar la venta');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentClient) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          Por favor, busque un cliente primero.
        </p>
      </div>
    );
  }

  const isFormValid = clientId && codPuntos;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Confirmar Registro de Venta
      </h3>

      <div className="space-y-4">
        {/* Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Resumen de la Venta
          </h4>
          <dl className="space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-blue-700">Cliente:</dt>
              <dd className="font-medium text-blue-900">
                {currentClient.nombre} {currentClient.apellido}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-blue-700">DNI:</dt>
              <dd className="font-medium text-blue-900">{currentClient.dni}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-blue-700">Código Puntos:</dt>
              <dd className="font-medium text-blue-900">{codPuntos || 'No seleccionado'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-blue-700">Campaña:</dt>
              <dd className="font-medium text-blue-900">
                {activeCampaign?.nombre || 'No disponible'}
              </dd>
            </div>
          </dl>
        </div>

        {/* Action Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={handleRegisterSale}
          isLoading={isSubmitting}
          disabled={!isFormValid}
          className="w-full"
        >
          Registrar Venta y Generar QR
        </Button>

        {!isFormValid && (
          <p className="text-sm text-gray-500 text-center">
            Complete los campos anteriores para habilitar el registro
          </p>
        )}
      </div>
    </div>
  );
}
