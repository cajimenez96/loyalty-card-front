// ============================================
// Client Types
// ============================================

export interface Client {
  id: string;
  dni: string;
  nombre: string;
  apellido?: string;
  telefono: string;
  email?: string;
  puntosTotales: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClientData {
  dni: string;
  nombre: string;
  apellido?: string;
  telefono: string;
  email?: string;
}

export interface ClientSearchParams {
  dni?: string;
  telefono?: string;
  nombre?: string;
}
