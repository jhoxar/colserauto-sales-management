export interface Vendedor {
  id?: number;
  nombre: string;
  email: string;
  telefono: string;
}

export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: 'Peritaje' | 'Mecánica' | 'Documentación' | 'Otros';
}

export interface Venta {
  id?: number;
  id_vendedor: number;
  id_producto: number;
  cantidad: number;
  total: number;
  fecha?: string;
  vendedor?: string;
  producto?: string;
}