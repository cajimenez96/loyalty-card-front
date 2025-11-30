// ============================================
// QR Code View Component for Cajero
// ============================================

import { QRCodeDisplay, Button, Modal } from '@/components/common';
import { formatPoints, formatDateTime } from '@/utils';
import type { QRData } from '@/types';

interface QRCodeViewProps {
  isOpen: boolean;
  onClose: () => void;
  qrData: QRData | null;
}

export function QRCodeView({ isOpen, onClose, qrData }: QRCodeViewProps) {
  if (!qrData) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Compra Registrada Exitosamente"
      size="lg"
    >
      <div className="space-y-6">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-green-600 mr-3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-lg font-semibold text-green-900">
                ¡Puntos Acreditados!
              </h4>
              <p className="text-sm text-green-700 mt-1">
                Los puntos se han sumado correctamente al cliente
              </p>
            </div>
          </div>
        </div>

        {/* Purchase Details */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Detalles de la Compra
          </h4>
          <dl className="space-y-2">
            <div className="flex justify-between text-sm">
              <dt className="text-gray-600">DNI Cliente:</dt>
              <dd className="font-medium text-gray-900">{qrData.clientDni}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-gray-600">Puntos Ganados:</dt>
              <dd className="font-bold text-green-600 text-lg">
                +{formatPoints(qrData.puntos)}
              </dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-gray-600">Fecha:</dt>
              <dd className="font-medium text-gray-900">
                {formatDateTime(qrData.fecha)}
              </dd>
            </div>
          </dl>
        </div>

        {/* QR Code */}
        <div className="flex justify-center">
          <QRCodeDisplay
            value={qrData.url}
            size={220}
            subtitle="El cliente puede escanear este código para ver los detalles"
          />
        </div>

        {/* URL Display */}
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">URL del QR:</p>
          <p className="text-xs text-gray-800 font-mono break-all">
            {qrData.url}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={() => window.print()}
          >
            Imprimir
          </Button>
          <Button
            variant="primary"
            onClick={onClose}
          >
            Nueva Venta
          </Button>
        </div>
      </div>
    </Modal>
  );
}
