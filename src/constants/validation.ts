// ============================================
// Validation Constants
// ============================================

// DNI Validation
export const DNI_MIN_LENGTH = 7;
export const DNI_MAX_LENGTH = 8;
export const DNI_REGEX = /^\d{7,8}$/;

// Phone Validation
export const PHONE_MIN_LENGTH = 10;
export const PHONE_MAX_LENGTH = 15;
export const PHONE_REGEX = /^[\d\s\-\+\(\)]+$/;

// Email Validation
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// PIN Validation
export const PIN_MIN_LENGTH = 4;
export const PIN_MAX_LENGTH = 6;
export const PIN_REGEX = /^\d{4,6}$/;

// Winner Code Validation
export const WINNER_CODE_LENGTH = 5;
export const WINNER_CODE_REGEX = /^[A-Za-z0-9]{5}$/;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 50;

// Debounce
export const SEARCH_DEBOUNCE_MS = 500;

// Date formats
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm';

// Role colors (Tailwind classes)
export const ROLE_COLORS = {
  cajero: 'blue',
  admin: 'purple',
  marketing: 'green',
} as const;
