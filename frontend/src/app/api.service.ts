import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendedor, Producto, Venta } from './interfaces';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Vendedores
  getVendedores(): Observable<Vendedor[]> { return this.http.get<Vendedor[]>(`${this.url}/vendedores`); }
  createVendedor(v: Vendedor): Observable<any> { return this.http.post(`${this.url}/vendedores`, v); }
  updateVendedor(id: number, v: Vendedor): Observable<any> { return this.http.put(`${this.url}/vendedores/${id}`, v); }
  deleteVendedor(id: number): Observable<any> { return this.http.delete(`${this.url}/vendedores/${id}`); }

  // Servicios (Productos)
  getProductos(): Observable<Producto[]> { return this.http.get<Producto[]>(`${this.url}/productos`); }
  createProducto(p: Producto): Observable<any> { return this.http.post(`${this.url}/productos`, p); }

  // Ventas
  getVentas(): Observable<Venta[]> { return this.http.get<Venta[]>(`${this.url}/ventas`); }
  createVenta(v: Venta): Observable<any> { return this.http.post(`${this.url}/ventas`, v); }
  deleteVenta(id: number): Observable<any> { return this.http.delete(`${this.url}/ventas/${id}`); }
}