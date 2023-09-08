-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.33 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para edenonline
CREATE DATABASE IF NOT EXISTS edenonline /*!40100 DEFAULT CHARACTER SET latin1 */;
USE edenonline;

-- Volcando estructura para tabla edenonline.categoria
CREATE TABLE IF NOT EXISTS categoria (
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);

-- Volcando datos para la tabla edenonline.categoria: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE categoria DISABLE KEYS */;
INSERT INTO categoria (id, nombre) VALUES
	(1, 'Bebida'),
	(2, 'Platillo');

-- Volcando estructura para tabla edenonline.productos
CREATE TABLE IF NOT EXISTS productos (
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(50) DEFAULT NULL,
  precio_compra double DEFAULT NULL,
  precio_venta double DEFAULT NULL,
  imagen text,
  fk_categoria int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY fk_categoria (fk_categoria),
  FOREIGN KEY (fk_categoria) REFERENCES categoria (id)
);

-- Volcando datos para la tabla edenonline.productos: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE productos DISABLE KEYS */;
INSERT INTO productos (id, nombre, precio_compra, precio_venta, imagen, fk_categoria) VALUES
	(1, 'Coca', 12, 30, 'https://media.istockphoto.com/photos/plastic-bottle-of-coca-picture-id537059224?k=20&m=537059224&s=170667a&w=0&h=FD2NoCuJNIw3I5fYG8z0-JB9TFBjJG_3NCVb8l7p4HM=', 1),
	(2, 'Hamburguesa', 20, 50, 'https://www.pequerecetas.com/wp-content/uploads/2013/07/hamburguesas-caseras-receta.jpg', 2);
/*!40000 ALTER TABLE productos ENABLE KEYS */;
-- Volcando estructura para tabla edenonline.almacen
CREATE TABLE IF NOT EXISTS almacen (
  fk_producto int(11) NOT NULL,
  existencias int(11) NOT NULL,
  PRIMARY KEY (fk_producto),
  FOREIGN KEY (fk_producto) REFERENCES productos (id)
);

-- Volcando datos para la tabla edenonline.almacen: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE almacen DISABLE KEYS */;
INSERT INTO almacen (fk_producto, existencias) VALUES
	(1, 0),
	(2, 0);
/*!40000 ALTER TABLE almacen ENABLE KEYS */;



-- Volcando estructura para tabla edenonline.entradas
CREATE TABLE IF NOT EXISTS entradas (
  id int(11) NOT NULL AUTO_INCREMENT,
  fk_producto int(11) DEFAULT NULL,
  fecha varchar(50) DEFAULT NULL,
  cantidad int(11) DEFAULT NULL,
  total double DEFAULT NULL,
  PRIMARY KEY (id),
  KEY fk_producto (fk_producto),
  FOREIGN KEY (fk_producto) REFERENCES productos (id)
);

-- Volcando datos para la tabla edenonline.entradas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE entradas DISABLE KEYS */;
/*!40000 ALTER TABLE entradas ENABLE KEYS */;

-- Volcando estructura para tabla edenonline.mesas
CREATE TABLE IF NOT EXISTS mesas (
  id int(11) NOT NULL AUTO_INCREMENT,
  mesa varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);

-- Volcando datos para la tabla edenonline.mesas: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE mesas DISABLE KEYS */;
INSERT INTO mesas (id, mesa) VALUES
	(1, 'Los chidos'),
	(2, 'Los no chidos'),
	(3, 'Los propineros');


-- Volcando estructura para tabla edenonline.roles
CREATE TABLE IF NOT EXISTS roles (
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);

-- Volcando datos para la tabla edenonline.roles: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE roles DISABLE KEYS */;
INSERT INTO roles (id, nombre) VALUES
	(1, 'Administrador'),
	(2, 'Cocinero'),
	(3, 'Barman'),
	(4, 'Mesero'),
	(5, 'Repartidor'),
	(6, 'Cliente');
/*!40000 ALTER TABLE roles ENABLE KEYS */;

/*!40000 ALTER TABLE mesas ENABLE KEYS */;
-- Volcando estructura para tabla edenonline.usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(50) DEFAULT NULL,
  apellido varchar(50) DEFAULT NULL,
  correo varchar(70) DEFAULT NULL,
  contra varchar(255) DEFAULT NULL,
  telefono varchar(50) DEFAULT NULL,
  direccion varchar(255) DEFAULT NULL,
  fk_rol int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY fk_rol (fk_rol),
  FOREIGN KEY (fk_rol) REFERENCES roles (id)
);

-- Volcando datos para la tabla edenonline.usuarios: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE usuarios DISABLE KEYS */;
INSERT INTO usuarios (id, nombre, apellido, correo, contra, telefono, direccion, fk_rol) VALUES
	(1, 'Héctor Manuel', 'Muñoz Flores', 'admin@gmail.com', '$2a$10$2tiEEzGhI28/Y6kam6/tnOvhXHaRZ3NmV0s5IADimgAL18112eK.2', '+4741367606', 'Lazaro Cardenas #65', 1),
	(2, 'Hector Cliente', 'Muñoz', 'cliente@gmail.com', '$2a$10$Wzp4/ZIf7J/zK8W4q9zUmeBwNJ/mohvX7PbJKNUU67m4TT/jZNwCS', '12345678', 'Mi casa #69', 6),
	(3, 'Juancho Mesero', 'Meserin', 'mesero@gmail.com', '$2a$10$.joAyJdbNcgShMCNwsJX3exfNclthY3gl9ZdIG.iyLUiSyKLjpFFW', '12345678', 'Su casita #56', 4);
/*!40000 ALTER TABLE usuarios ENABLE KEYS */;

-- Volcando estructura para tabla edenonline.pedidolinea
CREATE TABLE IF NOT EXISTS pedidolinea (
  id int(11) NOT NULL AUTO_INCREMENT,
  fk_cliente int(11) DEFAULT NULL,
  totalpedido double DEFAULT NULL,
  estatus varchar(50) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY fk_cliente (fk_cliente),
  FOREIGN KEY (fk_cliente) REFERENCES usuarios (id)
);

-- Volcando datos para la tabla edenonline.pedidolinea: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE pedidolinea DISABLE KEYS */;
INSERT INTO pedidolinea (id, fk_cliente, totalpedido, estatus) VALUES
	(1, 2, 140, 'Preparacion');
/*!40000 ALTER TABLE pedidolinea ENABLE KEYS */;

-- Volcando estructura para tabla edenonline.pedidolocal
CREATE TABLE IF NOT EXISTS pedidolocal (
  id int(11) NOT NULL AUTO_INCREMENT,
  fk_mesa int(11) DEFAULT NULL,
  totalpedido double DEFAULT NULL,
  estatus varchar(50) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY fk_mesa (fk_mesa),
  FOREIGN KEY (fk_mesa) REFERENCES mesas (id)
);

-- Volcando datos para la tabla edenonline.pedidolocal: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE pedidolocal DISABLE KEYS */;
INSERT INTO pedidolocal (id, fk_mesa, totalpedido, estatus) VALUES
	(1, 1, 150, 'En cobro'),
	(2, 2, 0, 'Preparacion');
/*!40000 ALTER TABLE pedidolocal ENABLE KEYS */;



-- Volcando estructura para tabla edenonline.productospedidolinea
CREATE TABLE IF NOT EXISTS productospedidolinea (
  num int(11) NOT NULL AUTO_INCREMENT,
  fk_pedidolinea int(11) DEFAULT NULL,
  fk_producto int(11) DEFAULT NULL,
  cantidad int(11) DEFAULT NULL,
  estatus text,
  PRIMARY KEY (num),
  KEY fk_pedidolinea (fk_pedidolinea),
  KEY fk_producto (fk_producto),
  FOREIGN KEY (fk_pedidolinea) REFERENCES pedidolinea (id),
  FOREIGN KEY (fk_producto) REFERENCES productos (id)
);

-- Volcando datos para la tabla edenonline.productospedidolinea: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE productospedidolinea DISABLE KEYS */;
INSERT INTO productospedidolinea (num, fk_pedidolinea, fk_producto, cantidad, estatus) VALUES
	(1, 1, 2, 1, 'Preparacion'),
	(2, 1, 1, 3, 'Preparacion');
/*!40000 ALTER TABLE productospedidolinea ENABLE KEYS */;

-- Volcando estructura para tabla edenonline.productospedidolocal
CREATE TABLE IF NOT EXISTS productospedidolocal (
  num int(11) NOT NULL AUTO_INCREMENT,
  fk_pedidolocal int(11) DEFAULT NULL,
  fk_producto int(11) DEFAULT NULL,
  cantidad int(11) DEFAULT NULL,
  estatus text,
  PRIMARY KEY (num),
  KEY fk_pedidolocal (fk_pedidolocal),
  KEY fk_producto (fk_producto),
  FOREIGN KEY (fk_pedidolocal) REFERENCES pedidolocal (id),
  FOREIGN KEY (fk_producto) REFERENCES productos (id)
);

-- Volcando datos para la tabla edenonline.productospedidolocal: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE productospedidolocal DISABLE KEYS */;
INSERT INTO productospedidolocal (num, fk_pedidolocal, fk_producto, cantidad, estatus) VALUES
	(1, 1, 2, 3, 'Captura'),
	(2, 2, 1, 2, 'Preparacion'),
	(3, 2, 2, 3, 'Preparacion');
/*!40000 ALTER TABLE productospedidolocal ENABLE KEYS */;



-- Volcando estructura para tabla edenonline.salidas
CREATE TABLE IF NOT EXISTS salidas (
  id int(11) NOT NULL AUTO_INCREMENT,
  fk_producto int(11) DEFAULT NULL,
  fecha varchar(50) DEFAULT NULL,
  cantidad int(11) DEFAULT NULL,
  total double DEFAULT NULL,
  PRIMARY KEY (id),
  KEY fk_producto (fk_producto),
  FOREIGN KEY (fk_producto) REFERENCES productos (id)
);

-- Volcando datos para la tabla edenonline.salidas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE salidas DISABLE KEYS */;
/*!40000 ALTER TABLE salidas ENABLE KEYS */;

-- Volcando estructura para tabla edenonline.sessions
CREATE TABLE IF NOT EXISTS sessions (
  session_id varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  expires int(11) unsigned NOT NULL,
  data mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (session_id)
);

-- Volcando datos para la tabla edenonline.sessions: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE sessions DISABLE KEYS */;
INSERT INTO sessions (session_id, expires, data) VALUES
	('-MCPmCDUA3bkkYSdEphO8kTBDunmWlOm', 1660976665, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"flash":{},"passport":{"user":3}}');
/*!40000 ALTER TABLE sessions ENABLE KEYS */;



-- Volcando estructura para tabla edenonline.ventalinea
CREATE TABLE IF NOT EXISTS ventalinea (
  id int(11) NOT NULL AUTO_INCREMENT,
  fecha varchar(50) DEFAULT NULL,
  fk_pedidolinea int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY fk_pedidolinea (fk_pedidolinea),
  FOREIGN KEY (fk_pedidolinea) REFERENCES pedidolinea (id)
);

-- Volcando datos para la tabla edenonline.ventalinea: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE ventalinea DISABLE KEYS */;
/*!40000 ALTER TABLE ventalinea ENABLE KEYS */;

-- Volcando estructura para tabla edenonline.ventalocal
CREATE TABLE IF NOT EXISTS ventalocal (
  id int(11) NOT NULL AUTO_INCREMENT,
  fecha varchar(50) DEFAULT NULL,
  fk_pedidolocal int(11) DEFAULT NULL,
  estatus varchar(50) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY fk_pedidolocal (fk_pedidolocal),
  FOREIGN KEY (fk_pedidolocal) REFERENCES pedidolocal (id)
);

-- Volcando datos para la tabla edenonline.ventalocal: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE ventalocal DISABLE KEYS */;
/*!40000 ALTER TABLE ventalocal ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
