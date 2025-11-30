// ============================================
// Client Search Component for Cajero
// ============================================

import { useState, useEffect } from 'react';
import { Input } from '@/components/common';
import { useClient } from '@/hooks';
import { useDebounce } from '@/hooks';
import { cleanDNI, formatDNI } from '@/utils';
import toast from 'react-hot-toast';

interface ClientSearchProps {
  onClientFound: (clientId: string) => void;
  onClientNotFound: () => void;
}

export function ClientSearch({ onClientFound, onClientNotFound }: ClientSearchProps) {
  const [dniInput, setDniInput] = useState('');
  const { searchByDNI, currentClient, isLoading } = useClient();
  const debouncedDNI = useDebounce(dniInput, 500);

  useEffect(() => {
    const searchClient = async () => {
      const cleanedDNI = cleanDNI(debouncedDNI);
      
      if (cleanedDNI.length >= 7) {
        try {
          const client = await searchByDNI(cleanedDNI);
          
          if (client) {
            onClientFound(client.id);
            toast.success(`Cliente encontrado: ${client.nombre}`);
          } else {
            onClientNotFound();
            toast.error('Cliente no encontrado. Por favor, registrarlo.');
          }
        } catch (error) {
          toast.error('Error al buscar cliente');
        }
      }
    };

    if (debouncedDNI) {
      searchClient();
    }
  }, [debouncedDNI, searchByDNI, onClientFound, onClientNotFound]);

  const handleDNIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Solo números
    setDniInput(value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Buscar Cliente por DNI
      </h3>
      
      <Input
        type="text"
        label="DNI del Cliente"
        placeholder="Ingrese DNI (sin puntos)"
        value={dniInput}
        onChange={handleDNIChange}
        maxLength={8}
        autoFocus
      />

      {isLoading && (
        <div className="mt-3 text-sm text-blue-600 flex items-center">
          <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Buscando...
        </div>
      )}

      {currentClient && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="text-sm font-medium text-green-900 mb-2">
            Cliente Encontrado
          </h4>
          <div className="text-sm text-green-700">
            <p><strong>Nombre:</strong> {currentClient.nombre} {currentClient.apellido}</p>
            <p><strong>DNI:</strong> {formatDNI(currentClient.dni)}</p>
            <p><strong>Teléfono:</strong> {currentClient.telefono}</p>
            <p><strong>Puntos Acumulados:</strong> {currentClient.puntosTotales}</p>
          </div>
        </div>
      )}
    </div>
  );
}
