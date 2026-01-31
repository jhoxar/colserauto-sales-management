# Diagrama Entidad-Relación, ventas Colserauto

```mermaid
erDiagram
    VENDEDOR ||--o{ VENTA : registra
    PRODUCTO ||--o{ VENTA : contiene

    VENDEDOR {
        int id PK
        string nombre
        string email
        string telefono
    }

    PRODUCTO {
        int id PK
        string nombre
        string descripcion
        float precio
    }

    VENTA {
        int id PK
        int id_vendedor FK
        int id_producto FK
        datetime fecha
        int cantidad
        float total
    }