// ============================================
// Client Create Modal Component for Cajero
// ============================================

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, Button, Input } from '@/components/common';
import { clientSchema, type ClientFormData } from '@/schemas';
import { useClient } from '@/hooks';
import toast from 'react-hot-toast';

interface ClientCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClientCreated: (clientId: string) => void;
  initialDNI?: string;
}

export function ClientCreateModal({
  isOpen,
  onClose,
  onClientCreated,
  initialDNI = '',
}: ClientCreateModalProps) {
  const { createClient, isLoading } = useClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      dni: initialDNI,
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
    },
  });

  const onSubmit = async (data: ClientFormData) => {
    try {
      const client = await createClient({
        dni: data.dni,
        nombre: data.nombre,
        apellido: data.apellido,
        telefono: data.telefono,
        email: data.email || undefined,
      });

      toast.success('Cliente creado exitosamente');
      reset();
      onClientCreated(client.id);
      onClose();
    } catch (error) {
      toast.error('Error al crear cliente');
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
      title="Registrar Nuevo Cliente"
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register('dni')}
          label="DNI"
          placeholder="12345678"
          error={errors.dni?.message}
          maxLength={8}
          required
        />

        <Input
          {...register('nombre')}
          label="Nombre"
          placeholder="Juan"
          error={errors.nombre?.message}
          required
        />

        <Input
          {...register('apellido')}
          label="Apellido"
          placeholder="Pérez"
          error={errors.apellido?.message}
        />

        <Input
          {...register('telefono')}
          label="Teléfono"
          placeholder="1234567890"
          error={errors.telefono?.message}
          maxLength={15}
          required
        />

        <Input
          {...register('email')}
          type="email"
          label="Email (opcional)"
          placeholder="juan@example.com"
          error={errors.email?.message}
        />

        <div className="flex gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
          >
            Crear Cliente
          </Button>
        </div>
      </form>
    </Modal>
  );
}
