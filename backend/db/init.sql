-- 1. Tabla de Vendedores
CREATE TABLE Vendedor (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20)
);

-- 2. Tabla de Productos (Servicios Colserauto)
CREATE TABLE Producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(12, 2) NOT NULL
);

-- 3. Tabla de Ventas (La que une todo)
CREATE TABLE Venta (
    id SERIAL PRIMARY KEY,
    id_vendedor INTEGER REFERENCES Vendedor(id) ON DELETE CASCADE,
    id_producto INTEGER REFERENCES Producto(id) ON DELETE CASCADE,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cantidad INTEGER DEFAULT 1,
    total DECIMAL(12, 2) NOT NULL
);

-- 4. Registros de prueba (Los 5 que pide el reclutador)
INSERT INTO Vendedor (nombre, email, telefono) VALUES
('Juan Pérez', 'juan.perez@colserauto.com', '3101234567'),
('Andrea Gómez', 'andrea.g@colserauto.com', '3119876543'),
('Carlos Ruiz', 'c.ruiz@colserauto.com', '3005554433'),
('Laura Mejía', 'lmejia@colserauto.com', '3152221100'),
('Mateo Cano', 'm.cano@colserauto.com', '3203337788');

INSERT INTO Producto (nombre, descripcion, precio) VALUES
('Avalúo Peritaje', 'Estudio completo de componentes', 281220),
('Prueba de Motor', 'Análisis de compresión y fugas', 150000),
('Estudio Técnico', 'Validación de originalidad', 200000),
('Toma de Improntas', 'Registro de numeraciones legales', 45000),
('Inspección de Viaje', 'Revisión preventiva carretera', 120000);

INSERT INTO Venta (id_vendedor, id_producto, cantidad, total) VALUES
(1, 1, 1, 281220),
(2, 2, 1, 150000),
(3, 3, 1, 200000),
(4, 4, 1, 45000),
(5, 5, 1, 120000);