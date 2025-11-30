// ============================================
// Marketing Dashboard - Mass Notifications
// ============================================

import { NotificationForm } from '@/components/marketing';

export function MarketingDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Panel de Marketing</h1>
        <p className="text-green-100">
          Envíe notificaciones masivas a los clientes de las campañas activas
        </p>
      </div>

      {/* Notification Form */}
      <NotificationForm />

      {/* Help Section */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-green-900 mb-2">
          💡 Consejos para Envíos Efectivos
        </h3>
        <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
          <li>Personalice los mensajes usando variables disponibles</li>
          <li>Revise la vista previa antes de enviar</li>
          <li>Segmente correctamente a los destinatarios</li>
          <li>Use un lenguaje claro y llamativo</li>
          <li>Incluya llamadas a la acción específicas</li>
        </ul>
      </div>
    </div>
  );
}

