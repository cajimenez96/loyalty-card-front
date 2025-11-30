// ============================================
// Login Page
// ============================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks';
import { Button, Input } from '@/components/common';
import { PIN_MIN_LENGTH, PIN_MAX_LENGTH } from '@/constants';
import toast, { Toaster } from 'react-hot-toast';

const loginSchema = z.object({
  pin: z
    .string()
    .min(PIN_MIN_LENGTH, `PIN debe tener mínimo ${PIN_MIN_LENGTH} dígitos`)
    .max(PIN_MAX_LENGTH, `PIN debe tener máximo ${PIN_MAX_LENGTH} dígitos`)
    .regex(/^\d+$/, 'PIN debe contener solo números'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.pin);
      toast.success('Inicio de sesión exitoso');
      navigate('/');
    } catch (error) {
      toast.error('PIN inválido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <Toaster position="top-right" />
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sistema de Lealtad
          </h1>
          <p className="text-gray-600">Ingresa tu PIN para continuar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            {...register('pin')}
            type="password"
            label="PIN"
            placeholder="Ingresa tu PIN"
            error={errors.pin?.message}
            autoFocus
            maxLength={PIN_MAX_LENGTH}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            Iniciar Sesión
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>¿Olvidaste tu PIN? Contacta al administrador</p>
        </div>
      </div>
    </div>
  );
}
