// ============================================
// Product Types
// ============================================

export interface Product {
  id: string;
  nombre: string;
  descripcion?: string;
  codigo?: string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCombo {
  id: string;
  nombre: string;
  descripcion?: string;
  productos: string[];
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CodPuntos {
  id: string;
  codigo: string;
  nombre: string;
  puntos: number;
  tipo: 'producto' | 'combo';
  campaignId: string;
}
