// ============================================
// Messages Constants
// ============================================

export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Inicio de sesión exitoso',
    LOGOUT_SUCCESS: 'Sesión cerrada correctamente',
  },
  CLIENT: {
    CREATE_SUCCESS: 'Cliente creado correctamente',
    UPDATE_SUCCESS: 'Cliente actualizado correctamente',
  },
  CAMPAIGN: {
    CREATE_SUCCESS: 'Campaña creada correctamente',
    UPDATE_SUCCESS: 'Campaña actualizada correctamente',
    DELETE_SUCCESS: 'Campaña eliminada correctamente',
  },
  SALE: {
    REGISTER_SUCCESS: 'Compra registrada correctamente',
    POINTS_ADDED: 'Puntos acreditados al cliente',
  },
  REWARD: {
    REDEEM_SUCCESS: 'Premio canjeado correctamente',
    WINNER_CONFIRMED: 'Ganador confirmado',
  },
  NOTIFICATION: {
    SEND_SUCCESS: 'Notificaciones enviadas correctamente',
  },
} as const;

export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_PIN: 'PIN inválido',
    UNAUTHORIZED: 'No autorizado',
    SESSION_EXPIRED: 'Sesión expirada',
  },
  CLIENT: {
    NOT_FOUND: 'Cliente no encontrado',
    ALREADY_EXISTS: 'Cliente ya existe',
    INVALID_DNI: 'DNI inválido',
    INVALID_PHONE: 'Teléfono inválido',
  },
  CAMPAIGN: {
    NOT_FOUND: 'Campaña no encontrada',
    NO_ACTIVE: 'No hay campaña activa',
    INVALID_DATES: 'Fechas inválidas',
  },
  SALE: {
    REGISTER_FAILED: 'Error al registrar la compra',
  },
  REWARD: {
    INVALID_CODE: 'Código inválido',
    ALREADY_REDEEMED: 'Premio ya canjeado',
    NOT_FOUND: 'Premio no encontrado',
  },
  NOTIFICATION: {
    SEND_FAILED: 'Error al enviar notificaciones',
  },
  GENERAL: {
    NETWORK_ERROR: 'Error de conexión',
    SERVER_ERROR: 'Error del servidor',
    UNKNOWN_ERROR: 'Error desconocido',
    REQUIRED_FIELD: 'Este campo es requerido',
  },
} as const;

export const INFO_MESSAGES = {
  CAMPAIGN: {
    NO_PRODUCTS: 'Esta campaña no tiene productos asignados',
  },
  CLIENT: {
    NO_POINTS: 'Cliente sin puntos acumulados',
  },
} as const;
