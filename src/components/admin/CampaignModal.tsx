// ============================================
// Campaign Create/Edit Modal Component for Admin
// ============================================

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, Button, Input } from '@/components/common';
import { campaignSchema, type CampaignFormData } from '@/schemas';
import { campaignService } from '@/services';
import toast from 'react-hot-toast';
import type { Campaign } from '@/types';

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  campaign?: Campaign;
}

export function CampaignModal({
  isOpen,
  onClose,
  onSuccess,
  campaign,
}: CampaignModalProps) {
  const isEditMode = !!campaign;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: campaign ? {
      nombre: campaign.nombre,
      descripcion: campaign.descripcion || '',
      fechaInicio: campaign.fechaInicio.split('T')[0],
      fechaFin: campaign.fechaFin.split('T')[0],
      puntosRequeridos: campaign.puntosRequeridos,
    } : {
      nombre: '',
      descripcion: '',
      fechaInicio: '',
      fechaFin: '',
      puntosRequeridos: 0,
    },
  });

  const onSubmit = async (data: CampaignFormData) => {
    try {
      if (isEditMode && campaign) {
        await campaignService.update(campaign.id, data);
        toast.success('Campaña actualizada exitosamente');
      } else {
        await campaignService.create(data);
        toast.success('Campaña creada exitosamente');
      }
      
      reset();
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Error al guardar la campaña');
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditMode ? 'Editar Campaña' : 'Nueva Campaña'}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register('nombre')}
          label="Nombre de la Campaña"
          placeholder="Campaña Verano 2024"
          error={errors.nombre?.message}
          required
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            {...register('descripcion')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
            placeholder="Descripción de la campaña (opcional)"
          />
          {errors.descripcion && (
            <p className="text-sm text-red-600">{errors.descripcion.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            {...register('fechaInicio')}
            type="date"
            label="Fecha de Inicio"
            error={errors.fechaInicio?.message}
            required
          />

          <Input
            {...register('fechaFin')}
            type="date"
            label="Fecha de Fin"
            error={errors.fechaFin?.message}
            required
          />
        </div>

        <Input
          {...register('puntosRequeridos', { valueAsNumber: true })}
          type="number"
          label="Puntos Requeridos para Ganar (opcional)"
          placeholder="1000"
          error={errors.puntosRequeridos?.message}
        />

        <div className="flex gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
          >
            {isEditMode ? 'Actualizar' : 'Crear'} Campaña
          </Button>
        </div>
      </form>
    </Modal>
  );
}
