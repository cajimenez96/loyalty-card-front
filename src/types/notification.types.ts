// ============================================
// Notification Types
// ============================================

export type RecipientType = 'todos' | 'especifico' | 'ganadores';

export interface RecipientFilter {
  tipo: RecipientType;
  dni?: string;
  campaignId?: string;
}

export interface NotificationData {
  campaignId: string;
  destinatarios: RecipientFilter;
  mensaje: string;
  canal: 'whatsapp' | 'email' | 'ambos';
}

export interface NotificationResponse {
  enviados: number;
  fallidos: number;
  detalles?: {
    dni: string;
    status: 'enviado' | 'fallido';
    error?: string;
  }[];
}

export interface MessageTemplate {
  mensaje: string;
  variables: string[];
}
