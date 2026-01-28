export interface ProductoPaginated {
  total: number;
  page: number;
  limit: number;
  data: Producto[];
}

export interface Producto {
  uuid: string;
  nombre: string;
  tipoId: number;
  url: string;
  monedas: number;
  diamantes: number;
  xp: number;
  createdAt: string;
  updatedAt: string;
  tipo: Tipo;
}

export interface Tipo {
  id: number;
  nombre: string;
}
