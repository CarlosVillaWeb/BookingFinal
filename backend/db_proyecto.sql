CREATE DATABASE  IF NOT EXISTS `db_proyecto` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_proyecto`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: db_proyecto
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `caracteristicas`
--

DROP TABLE IF EXISTS `caracteristicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caracteristicas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caracteristicas`
--

LOCK TABLES `caracteristicas` WRITE;
/*!40000 ALTER TABLE `caracteristicas` DISABLE KEYS */;
INSERT INTO `caracteristicas` VALUES (1,'Wifi'),(2,'Servicio a la habitación'),(3,'Caja fuerte'),(4,'Ducha'),(5,'Televisor'),(6,'Aire acondicionado');
/*!40000 ALTER TABLE `caracteristicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `url_imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'708.105 ','Villas','https://cf.bstatic.com/xdata/images/city/square250/976919.webp?k=b4d2dd3f87340b547a0e1aa9fc7e89b47ebe9539086c7f5f4e637e5e2137be7c&o='),(2,'511.270','Hoteles','https://cf.bstatic.com/xdata/images/hotel/square250/293889746.webp?k=cb2926f516591521138d1bd4085068e0b040ca6dae4215bd9cc5ce0c9718e6aa&o='),(3,'19.214','Resorts','https://cf.bstatic.com/xdata/images/city/square250/644630.webp?k=700ac1d32a3bab480b14db2cba3050abe5b5bce062911dc4f5b3fdc15d81f007&o='),(4,'875.751','Apartamentos','https://q-xx.bstatic.com/xdata/images/hotel/300x240/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `producto_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhylof04iou23s0pb9ab6pbd4j` (`producto_id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
INSERT INTO `imagenes` VALUES (1,'Hotel Selis','https://cf.bstatic.com/xdata/images/hotel/max1024x768/420024535.jpg?k=9ff3cb167d95738ba5cabbc2720522347b7b0125d8141ecbe49c95a603ef49cd&o=&hp=1',2),(2,'Hotel Selis','https://cf.bstatic.com/xdata/images/hotel/max1024x768/419993879.jpg?k=1bd6b155d8294e69f5e820e9d4a354f5ede3db17f3092063a61eaa2ffb41e362&o=&hp=1',2),(3,'Hotel Selis','https://cf.bstatic.com/xdata/images/hotel/max1024x768/420000065.jpg?k=6691b6ff17c4d5e7bf75c7540df2f0f698eb09609fd44497644181609eaeee87&o=&hp=1',2),(4,'Hotel Selis','https://cf.bstatic.com/xdata/images/hotel/max1024x768/419993860.jpg?k=13685469401e93030dc05d974ceebbfc84187d4a068344f4037ae99a7804ae19&o=&hp=1',2),(5,'Hotel Selis','https://cf.bstatic.com/xdata/images/hotel/max1024x768/419993878.jpg?k=9af774f7e4262bfe5d99e579a56986d080508c838a3fbb9b9066977d4781f462&o=&hp=1',2),(6,'Hotel Selis','https://cf.bstatic.com/xdata/images/hotel/max1024x768/420000517.jpg?k=d7c2681465bfaff33ffd5fc2f019107fbfb256d009b36464cda5798e11d11106&o=&hp=1',2),(7,'Hotel Selis','https://cf.bstatic.com/xdata/images/hotel/max1024x768/420024416.jpg?k=bec5b9405a34ccc670ecce07fb49b470cb0d39e6134275209e9d5553f985e6b6&o=&hp=1',2),(8,'Portobelo Plaza de las Americas','https://cf.bstatic.com/xdata/images/hotel/max1024x768/124416288.jpg?k=b0b6b9f4539009087af7d6aa60d75e8c0d9e8f373efce8f689da6a64c5ff975c&o=&hp=1',3),(9,'Portobelo Plaza de las Americas','https://cf.bstatic.com/xdata/images/hotel/max1024x768/212019303.jpg?k=08d5c1817046f6e974f6980a09afe397726490d1eb036c99c1c4ff9e3ded365d&o=&hp=1',3),(10,'Portobelo Plaza de las Americas','https://cf.bstatic.com/xdata/images/hotel/max1024x768/212019196.jpg?k=9e7eb2a53e62104a6ecca0c4eb92e498f1bc296597e16a9ef926b09b23753a61&o=&hp=1',3),(11,'Portobelo Plaza de las Americas','https://cf.bstatic.com/xdata/images/hotel/max1024x768/124409068.jpg?k=0b13253bcebaf4e80099d10b60818ee8f1b96f9134c7f94459f2d608fde63b6a&o=&hp=1',3),(12,'Portobelo Plaza de las Americas','https://cf.bstatic.com/xdata/images/hotel/max1024x768/211991802.jpg?k=95d314c32af43d25c7e3c82e6889821d6162dd826a6ace824dc9203dfbdda0de&o=&hp=1',3),(13,'Portobelo Plaza de las Americas','https://cf.bstatic.com/xdata/images/hotel/max1024x768/124408337.jpg?k=66c77f5bca06c37872839cc3c8bed371c09ce1b070e4d890c1aaf24b6700e1bf&o=&hp=1',3),(14,'Portobelo Plaza de las Americas','https://cf.bstatic.com/xdata/images/hotel/max1024x768/211991802.jpg?k=95d314c32af43d25c7e3c82e6889821d6162dd826a6ace824dc9203dfbdda0de&o=&hp=1',3);
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `politica_producto`
--

DROP TABLE IF EXISTS `politica_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `politica_producto` (
  `producto_id` bigint NOT NULL,
  `politica_id` bigint NOT NULL,
  PRIMARY KEY (`producto_id`,`politica_id`),
  KEY `FKq5pwhlykfr8ftxw1uxjri9gi4` (`politica_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `politica_producto`
--

LOCK TABLES `politica_producto` WRITE;
/*!40000 ALTER TABLE `politica_producto` DISABLE KEYS */;
INSERT INTO `politica_producto` VALUES (1,1),(1,2),(1,6),(1,7),(2,1),(2,2),(2,6),(2,7),(3,1),(3,2),(3,6),(3,7);
/*!40000 ALTER TABLE `politica_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `politicas`
--

DROP TABLE IF EXISTS `politicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `politicas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `tipo_politica` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `politicas`
--

LOCK TABLES `politicas` WRITE;
/*!40000 ALTER TABLE `politicas` DISABLE KEYS */;
INSERT INTO `politicas` VALUES (1,'Prohibido fumar en todo el alojamiento','Normas del lugar'),(2,'El cliente que el día de su salida desocupe su habitación después de las 12:00 horas, sin previo aviso y sin justificar su retraso, deberá pagar un día adicional a la duración de su reserva.','Normas del lugar'),(3,'El cliente deberá declarar a la administración los elementos de valor y el dinero que traiga consigo, y guardarlos en la caja de seguridad de su habitación. La administración no se hace responsable por la pérdida de estos objetos.','Normas del lugar'),(4,'No podrán ingresar al hotel personas diferentes a las registradas.','Normas del lugar'),(5,'Todo cliente debe dejar en recepción las llaves de su habitación al momento de salir del hotel.','Normas del lugar'),(6,'La reserva puede ser cancelada gratuitamente hasta 72 horas antes de la fecha de la reserva, Solicitudes fuera de plazo no dan derecho a devolución.','Politicas de Cancelación'),(7,'Evitar hacer ruidos molestos, provocar altercados, y en general, cualquier acto que perturbe o incomode a los demás huéspedes.','Politicas de Seguridad');
/*!40000 ALTER TABLE `politicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_caracteristica`
--

DROP TABLE IF EXISTS `producto_caracteristica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_caracteristica` (
  `producto_id` bigint NOT NULL,
  `caracteristica_id` bigint NOT NULL,
  PRIMARY KEY (`producto_id`,`caracteristica_id`),
  KEY `FKp7sxommck2r629h007c2mau4t` (`caracteristica_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_caracteristica`
--

LOCK TABLES `producto_caracteristica` WRITE;
/*!40000 ALTER TABLE `producto_caracteristica` DISABLE KEYS */;
INSERT INTO `producto_caracteristica` VALUES (1,1),(2,1),(2,2),(2,3),(2,4),(2,5),(2,6),(3,1),(3,2),(3,3),(3,4),(3,5),(3,6);
/*!40000 ALTER TABLE `producto_caracteristica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `calificacion` int NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `disponibilidad` date NOT NULL,
  `precio` float NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `categoria_id` bigint DEFAULT NULL,
  `ubicacion_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2fwq10nwymfv7fumctxt9vpgb` (`categoria_id`),
  KEY `FK4ps38f0wca0jsddbi86pndfo2` (`ubicacion_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,5,'El HOTEL SELIS se encuentra en Medellín, a 350 metros del parque El Poblado,se encuentra a 8,4 km del parque Laureles y de la plaza de toros La Macarena. El aeropuerto Olaya Herrera, el más cercano, está a 4 km. ','2023-11-29',378,'Hotel Selis',2,1),(2,5,'El HOTEL SELIS se encuentra en Medellín, a 350 metros del parque El Poblado,se encuentra a 8,4 km del parque Laureles y de la plaza de toros La Macarena. El aeropuerto Olaya Herrera, el más cercano, está a 4 km. ','2023-11-29',378,'Hotel Selis',2,1),(3,8,'El establecimiento se encuentra a 600 metros de la playa Spratt Bight, a 800 metros de la bahía de San Andrés y a 1 km del aeropuerto internacional Gustavo Rojas Pinilla, el más cercano.','2023-11-29',570,'Portobelo Plaza las Americas',3,3);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicaciones`
--

DROP TABLE IF EXISTS `ubicaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ubicaciones` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ciudad` varchar(255) NOT NULL,
  `pais` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicaciones`
--

LOCK TABLES `ubicaciones` WRITE;
/*!40000 ALTER TABLE `ubicaciones` DISABLE KEYS */;
INSERT INTO `ubicaciones` VALUES (1,'Medellin','Colombia'),(2,'Cartagena de Indias','Colombia'),(3,'San Andrés','Colombia'),(4,'Bogotá','Colombia');
/*!40000 ALTER TABLE `ubicaciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-09 12:36:07
