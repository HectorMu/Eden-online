CREATE DATABASE edenonline;

USE edenonline;

CREATE TABLE roles(
id INT primary key auto_increment,
nombre VARCHAR(50));

INSERT INTO roles VALUES
(NULL, 'Administrador'),
(NULL, 'Cocinero'),
(NULL, 'Barman'),
(NULL, 'Mesero'),
(NULL, 'Repartidor');

CREATE TABLE usuarios(
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(50),
apellido VARCHAR(50),
correo VARCHAR(70),
contra VARCHAR(50),
fk_rol INT,
FOREIGN KEY(fk_rol)REFERENCES roles(id));

CREATE TABLE clientes(
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(50),
apellido VARCHAR(50),
correo VARCHAR(70),
telefono VARCHAR(50),
direccion VARCHAR(100),
contra VARCHAR(50),
verificado BOOLEAN);

CREATE TABLE categoria(
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(50));

INSERT INTO categoria VALUES
(NULL, 'Bebida'),
(NULL, 'Platillo');

CREATE TABLE productos(
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(50),
precio_compra DOUBLE,
precio_venta DOUBLE,
fk_categoria INT,
FOREIGN KEY(fk_categoria)REFERENCES categoria(id));

CREATE TABLE almacen(
fk_producto int PRIMARY KEY NOT NULL,
FOREIGN KEY(fk_producto)REFERENCES productos(id),
existencias int(11) NOT NULL);

CREATE TABLE entradas(
id INT PRIMARY KEY AUTO_INCREMENT,
fk_producto INT,
FOREIGN KEY(fk_producto)REFERENCES productos(id),
fecha VARCHAR(50),
cantidad INT,
total DOUBLE);

CREATE TABLE salidas(
id INT PRIMARY KEY AUTO_INCREMENT,
fk_producto INT,
FOREIGN KEY(fk_producto)REFERENCES productos(id),
fecha VARCHAR(50),
cantidad INT,
total DOUBLE);

CREATE TABLE mesas(
id INT PRIMARY KEY AUTO_INCREMENT,
mesa VARCHAR(50));

CREATE TABLE ventalocal(
id INT PRIMARY KEY AUTO_INCREMENT,
fecha VARCHAR(50),
fk_pedidolocal INT,
FOREIGN KEY(fk_pedidolocal)REFERENCES pedidolocal(id),
estatus VARCHAR(50));

CREATE TABLE pedidolocal(
id INT PRIMARY KEY AUTO_INCREMENT,
fk_mesa INT,
FOREIGN KEY(fk_mesa)REFERENCES mesas(id),
totalpedido DOUBLE,
estatus VARCHAR(50));

CREATE TABLE productospedidolocal(
num INT primary key AUTO_INCREMENT,
fk_pedidolocal INT,
FOREIGN KEY (fk_pedidolocal) REFERENCES pedidolocal(id),
fk_producto INT,
foreign KEY (fk_producto) REFERENCES productos(id),
cantidad INT
);

CREATE TABLE ventalinea(
id INT PRIMARY KEY AUTO_INCREMENT,
fecha VARCHAR(50),
fk_cliente INT,
FOREIGN KEY(fk_cliente)REFERENCES clientes(id),
totalventa DOUBLE,
estatus VARCHAR(50));

CREATE TABLE pedidolinea(
id INT PRIMARY KEY AUTO_INCREMENT,
fk_ventalinea INT,
FOREIGN KEY(fk_ventalinea)REFERENCES ventalinea(id),
fk_producto INT,
FOREIGN KEY(fk_producto)REFERENCES productos(id),
cantidad INT,
totalpedido DOUBLE,
estatus VARCHAR(50));

