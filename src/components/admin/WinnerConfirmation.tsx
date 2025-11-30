// ============================================
// Winner Confirmation Component for Admin
// ============================================

import { Modal, Button } from '@/components/common';
import { formatPoints, formatDateTime } from '@/utils';
import type { RedemptionResponse } from '@/types';

interface WinnerConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  redemptionData: RedemptionResponse | null;
}

export function WinnerConfirmation({
  isOpen,
  onClose,
  redemptionData,
}: WinnerConfirmationProps) {
  if (!redemptionData) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="¡Premio Canjeado!"
      size="md"
    >
      <div className="space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Ganador Confirmado
          </h3>
          <p className="text-gray-600">
            El premio ha sido canjeado exitosamente
          </p>
        </div>

        {/* Winner Details */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Detalles del Ganador
          </h4>
          <dl className="space-y-2">
            <div className="flex justify-between text-sm">
              <dt className="text-gray-600">Código:</dt>
              <dd className="font-mono font-bold text-gray-900">
                {redemptionData.reward.codigo}
              </dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-gray-600">Nombre:</dt>
              <dd className="font-medium text-gray-900">
                {redemptionData.client.nombre} {redemptionData.client.apellido}
              </dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-gray-600">DNI:</dt>
              <dd className="font-medium text-gray-900">
                {redemptionData.client.dni}
              </dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-gray-600">Puntos:</dt>
              <dd className="font-bold text-green-600">
                {formatPoints(redemptionData.client.puntos)}
              </dd>
            </div>
            {redemptionData.reward.fechaCanje && (
              <div className="flex justify-between text-sm">
                <dt className="text-gray-600">Fecha de Canje:</dt>
                <dd className="font-medium text-gray-900">
                  {formatDateTime(redemptionData.reward.fechaCanje)}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Message */}
        {redemptionData.message && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">{redemptionData.message}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={() => window.print()}
          >
            Imprimir Comprobante
          </Button>
          <Button
            variant="primary"
            onClick={onClose}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
