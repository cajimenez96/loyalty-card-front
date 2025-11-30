// ============================================
// API Constants
// ============================================

// Backend base URL - configure según ambiente
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    VERIFY: '/auth/verify',
  },

  // Clients
  CLIENTS: {
    BASE: '/clients',
    SEARCH: '/clients/search',
    BY_DNI: (dni: string) => `/clients/dni/${dni}`,
    CREATE: '/clients',
  },

  // Campaigns
  CAMPAIGNS: {
    BASE: '/campaigns',
    BY_ID: (id: string) => `/campaigns/${id}`,
    ACTIVE: '/campaigns/active',
    PRODUCTS: (id: string) => `/campaigns/${id}/products`,
  },

  // Products
  PRODUCTS: {
    BASE: '/products',
    BY_CAMPAIGN: (campaignId: string) => `/products/campaign/${campaignId}`,
  },

  // Sales
  SALES: {
    BASE: '/sales',
    CREATE: '/sales',
    BY_CLIENT: (clientId: string) => `/sales/client/${clientId}`,
  },

  // Rewards
  REWARDS: {
    BASE: '/rewards',
    VALIDATE: '/rewards/validate',
    REDEEM: '/rewards/redeem',
    BY_CAMPAIGN: (campaignId: string) => `/rewards/campaign/${campaignId}`,
  },

  // Notifications
  NOTIFICATIONS: {
    BASE: '/notifications',
    SEND: '/notifications/send',
  },
} as const;

// Request timeout
export const REQUEST_TIMEOUT = 30000; // 30 segundos
