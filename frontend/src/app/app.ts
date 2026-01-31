import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { Venta, Vendedor, Producto } from './interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  activeTab: 'ventas' | 'vendedores' | 'servicios' = 'ventas';
  
  ventas: Venta[] = [];
  vendedores: Vendedor[] = [];
  productos: Producto[] = [];

  // Modales
  modalVendedor = { show: false, edit: false, data: { id: 0, nombre: '', email: '', telefono: '' } };
  modalServicio = { show: false, data: { nombre: '', descripcion: '', precio: 0, categoria: 'Peritaje' as any } };
  modalVenta = { show: false, data: { id_vendedor: 0, id_producto: 0, cantidad: 1, total: 0 } };
  modalConfirm = { show: false, type: '', id: 0 };

  constructor(private api: ApiService) {}

  ngOnInit() { this.refreshAll(); }

  refreshAll() {
    this.api.getVentas().subscribe(d => this.ventas = d);
    this.api.getVendedores().subscribe(d => this.vendedores = d);
    this.api.getProductos().subscribe(d => this.productos = d);
  }

  // --- Operaciones Vendedor ---
  openVendedor(v?: Vendedor) {
    if (v) {
      this.modalVendedor = { show: true, edit: true, data: { ...v } as any };
    } else {
      this.modalVendedor = { show: true, edit: false, data: { id: 0, nombre: '', email: '', telefono: '' } };
    }
  }

  saveVendedor() {
    if (this.modalVendedor.edit) {
      this.api.updateVendedor(this.modalVendedor.data.id, this.modalVendedor.data).subscribe(() => {
        this.refreshAll(); this.modalVendedor.show = false;
      });
    } else {
      this.api.createVendedor(this.modalVendedor.data).subscribe(() => {
        this.refreshAll(); this.modalVendedor.show = false;
      });
    }
  }

  // --- Operaciones Servicio ---
  saveServicio() {
    this.api.createProducto(this.modalServicio.data).subscribe(() => {
      this.refreshAll(); this.modalServicio.show = false;
    });
  }

  // --- Operaciones Venta ---
  saveVenta() {
    const p = this.productos.find(x => x.id == this.modalVenta.data.id_producto);
    if (p) this.modalVenta.data.total = p.precio * this.modalVenta.data.cantidad;
    this.api.createVenta(this.modalVenta.data).subscribe(() => {
      this.refreshAll(); this.modalVenta.show = false;
    });
  }

  // --- Borrado Universal ---
  askDelete(type: string, id: number) {
    this.modalConfirm = { show: true, type, id };
  }

  confirmDelete() {
    const { type, id } = this.modalConfirm;
    if (type === 'venta') this.api.deleteVenta(id).subscribe(() => this.finishDelete());
    if (type === 'vendedor') this.api.deleteVendedor(id).subscribe(() => this.finishDelete());
  }

  finishDelete() {
    this.refreshAll();
    this.modalConfirm.show = false;
  }

  // Stats
  get revenue() { return this.ventas.reduce((a, b) => a + Number(b.total), 0); }
}