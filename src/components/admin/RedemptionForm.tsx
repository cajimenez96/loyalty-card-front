// ============================================
// Prize Redemption Form Component for Admin
// ============================================

import { useState } from 'react';
import { Input, Button } from '@/components/common';
import { rewardService } from '@/services';
import { isValidWinnerCode } from '@/utils';
import toast from 'react-hot-toast';
import type { RedemptionResponse } from '@/types';

interface RedemptionFormProps {
  onRedemptionSuccess: (data: RedemptionResponse) => void;
}

export function RedemptionForm({ onRedemptionSuccess }: RedemptionFormProps) {
  const [codigo, setCodigo] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [validatedData, setValidatedData] = useState<RedemptionResponse | null>(null);

  const handleValidate = async () => {
    if (!isValidWinnerCode(codigo)) {
      toast.error('Código debe tener 5 caracteres alfanuméricos');
      return;
    }

    setIsValidating(true);
    try {
      const isValid = await rewardService.validate(codigo);
      
      if (isValid) {
        toast.success('Código válido');
        // En una implementación real, aquí cargaríamos los datos del ganador
        // Por ahora simulamos que el código es válido
      } else {
        toast.error('Código inválido o ya canjeado');
        setValidatedData(null);
      }
    } catch (error) {
      toast.error('Error al validar código');
      setValidatedData(null);
    } finally {
      setIsValidating(false);
    }
  };

  const handleRedeem = async () => {
    if (!codigo) return;

    setIsRedeeming(true);
    try {
      const response = await rewardService.redeem({ codigo });
      
      toast.success('Premio canjeado exitosamente');
      onRedemptionSuccess(response);
      
      // Reset form
      setCodigo('');
      setValidatedData(null);
    } catch (error) {
      toast.error('Error al canjear premio');
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Canjear Premio
        </h3>
        <p className="text-sm text-gray-600">
          Ingrese el código de 5 caracteres del ganador para validar y canjear el premio
        </p>
      </div>

      {/* Code Input */}
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            label="Código del Ganador"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.toUpperCase())}
            placeholder="ABC12"
            maxLength={5}
            className="font-mono text-lg"
          />
        </div>
        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={handleValidate}
            isLoading={isValidating}
            disabled={codigo.length !== 5}
          >
            Validar
          </Button>
        </div>
      </div>

      {/* Validated Data Display */}
      {validatedData && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-green-900 mb-3">
            Datos del Ganador
          </h4>
          <dl className="space-y-2">
            <div className="flex justify-between text-sm">
              <dt className="text-green-700">Nombre:</dt>
              <dd className="font-medium text-green-900">
                {validatedData.client.nombre} {validatedData.client.apellido}
              </dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-green-700">DNI:</dt>
              <dd className="font-medium text-green-900">{validatedData.client.dni}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-green-700">Puntos:</dt>
              <dd className="font-bold text-green-900 text-lg">
                {validatedData.client.puntos}
              </dd>
            </div>
          </dl>

          <div className="mt-4 pt-4 border-t border-green-200">
            <Button
              variant="primary"
              onClick={handleRedeem}
              isLoading={isRedeeming}
              className="w-full"
            >
              Confirmar Canje
            </Button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">
          📋 Instrucciones
        </h4>
        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
          <li>Solicite al ganador su código de 5 caracteres</li>
          <li>Ingrese el código y presione "Validar"</li>
          <li>Verifique los datos del ganador</li>
          <li>Entregue el premio y presione "Confirmar Canje"</li>
        </ol>
      </div>
    </div>
  );
}
