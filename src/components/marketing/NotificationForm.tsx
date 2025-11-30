// ============================================
// Notification Form Component for Marketing
// ============================================

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@/components/common';
import { notificationSchema, type NotificationFormData } from '@/schemas';
import { useCampaign } from '@/hooks';
import { notificationService } from '@/services';
import toast from 'react-hot-toast';
import type { RecipientType } from '@/types';

export function NotificationForm() {
  const [sending, setSending] = useState(false);
  const { campaigns } = useCampaign();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      campaignId: '',
      destinatarios: {
        tipo: 'todos',
      },
      mensaje: '',
      canal: 'email',
    },
  });

  const destinatarios = watch('destinatarios');

  const handleRecipientTypeChange = (tipo: RecipientType) => {
    setValue('destinatarios.tipo', tipo);
  };

  const onSubmit = async (data: NotificationFormData) => {
    setSending(true);
    try {
      await notificationService.send(data);
      
      toast.success(`Notificación enviada exitosamente`);
      reset();
    } catch (error) {
      toast.error('Error al enviar notificación');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Envío Masivo de Notificaciones
        </h3>
        <p className="text-sm text-gray-600">
          Envíe mensajes a clientes específicos o a todos los participantes de una campaña
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Campaign Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Campaña <span className="text-red-500">*</span>
          </label>
          <select
            {...register('campaignId')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Seleccione una campaña</option>
            {campaigns.map(c => (
              <option key={c.id} value={c.id}>
                {c.nombre} ({c.status})
              </option>
            ))}
          </select>
          {errors.campaignId && (
            <p className="mt-1 text-sm text-red-600">{errors.campaignId.message}</p>
          )}
        </div>

        {/* Recipients Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destinstarios <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                checked={destinatarios.tipo === 'todos'}
                onChange={() => handleRecipientTypeChange('todos')}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">
                Todos los participantes de la campaña
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={destinatarios.tipo === 'especifico'}
                onChange={() => handleRecipientTypeChange('especifico')}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">
                Cliente específico (por DNI)
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={destinatarios.tipo === 'ganadores'}
                onChange={() => handleRecipientTypeChange('ganadores')}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">
                Solo ganadores de premios
              </span>
            </label>
          </div>
        </div>

        {/* Specific DNI field (conditional) */}
        {destinatarios.tipo === 'especifico' && (
          <Input
            {...register('destinatarios.dni')}
            label="DNI del Cliente"
            placeholder="12345678"
            maxLength={8}
          />
        )}

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mensaje <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('mensaje')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={5}
            placeholder="Escriba el mensaje a enviar..."
          />
          {errors.mensaje && (
            <p className="mt-1 text-sm text-red-600">{errors.mensaje.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Variables disponibles: {'{nombre}'}, {'{puntos}'}, {'{premio}'}
          </p>
        </div>

        {/* Channel */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Canal de Envío <span className="text-red-500">*</span>
          </label>
          <select
            {...register('canal')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="ambos">Email y WhatsApp</option>
          </select>
          {errors.canal && (
            <p className="mt-1 text-sm text-red-600">{errors.canal.message}</p>
          )}
        </div>

        {/* Preview Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">
            Vista Previa
          </h4>
          <div className="bg-white p-3 rounded border border-blue-100">
            <p className="text-sm text-gray-800 whitespace-pre-wrap">
              {watch('mensaje') || 'El mensaje aparecerá aquí...'}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={sending}
          className="w-full"
        >
          Enviar Notificación
        </Button>
      </form>
    </div>
  );
}

