// ============================================
// Cajero Dashboard - Complete Sales Flow
// ============================================

import { useState } from 'react';
import {
  ClientSearch,
  ClientCreateModal,
  ProductSelector,
  SaleRegistration,
  QRCodeView,
} from '@/components/cajero';
import { useClient } from '@/hooks';
import type { QRData } from '@/types';

export function CajeroDashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const [selectedCodPuntos, setSelectedCodPuntos] = useState<string>('');
  const [qrData, setQrData] = useState<QRData | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [initialDNI, setInitialDNI] = useState('');

  const { clearCurrentClient } = useClient();

  const handleClientFound = (clientId: string) => {
    setSelectedClientId(clientId);
    setShowCreateModal(false);
  };

  const handleClientNotFound = () => {
    setShowCreateModal(true);
  };

  const handleClientCreated = (clientId: string) => {
    setSelectedClientId(clientId);
    setShowCreateModal(false);
  };

  const handleSaleComplete = (data: QRData) => {
    setQrData(data);
    setShowQR(true);
  };

  const handleNewSale = () => {
    // Reset everything for new sale
    setShowQR(false);
    setQrData(null);
    setSelectedClientId('');
    setSelectedCodPuntos('');
    setInitialDNI('');
    clearCurrentClient();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Registro de Ventas</h1>
        <p className="text-blue-100">
          Busque el cliente, seleccione el producto y registre la venta para acreditar puntos
        </p>
      </div>

      {/* Main Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Client Search */}
        <div className="space-y-6">
          <ClientSearch
            onClientFound={handleClientFound}
            onClientNotFound={handleClientNotFound}
          />
        </div>

        {/* Right Column - Product Selection */}
        <div className="space-y-6">
          {selectedClientId && (
            <ProductSelector
              value={selectedCodPuntos}
              onChange={setSelectedCodPuntos}
            />
          )}
        </div>
      </div>

      {/* Sale Registration */}
      {selectedClientId && selectedCodPuntos && (
        <SaleRegistration
          clientId={selectedClientId}
          codPuntos={selectedCodPuntos}
          onSaleComplete={handleSaleComplete}
        />
      )}

      {/* Modals */}
      <ClientCreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onClientCreated={handleClientCreated}
        initialDNI={initialDNI}
      />

      <QRCodeView
        isOpen={showQR}
        onClose={handleNewSale}
        qrData={qrData}
      />

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">
          📌 Instrucciones
        </h3>
        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
          <li>Ingrese el DNI del cliente en el campo de búsqueda</li>
          <li>Si el cliente no existe, complete el formulario de registro</li>
          <li>Seleccione el producto o combo de la campaña activa</li>
          <li>Confirme el registro de la venta</li>
          <li>Muestre el código QR al cliente para confirmar sus puntos</li>
        </ol>
      </div>
    </div>
  );
}

