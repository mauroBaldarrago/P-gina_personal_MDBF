-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-12-2025 a las 00:51:57
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agenda_plus`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

CREATE TABLE `notas` (
  `id` int(11) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `texto` text NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `fecha` varchar(20) NOT NULL,
  `fechaRecordatorio` varchar(20) DEFAULT NULL,
  `completada` tinyint(1) DEFAULT 0,
  `color` varchar(20) DEFAULT 'black'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notas`
--

INSERT INTO `notas` (`id`, `correo`, `texto`, `tipo`, `fecha`, `fechaRecordatorio`, `completada`, `color`) VALUES
(1, 'admin@agenda.com', 'Revisar el servidor de Railway y la conexión PHP.', 'texto', '23/12/2025', '24/12/2025', 0, 'blue'),
(2, 'admin@agenda.com', 'Completar el trabajo final de programación.', 'texto', '23/12/2025', NULL, 1, 'green'),
(3, 'juan.perez@correo.com', 'Comprar víveres para la semana.', 'texto', '23/12/2025', '23/12/2025', 0, 'yellow'),
(4, 'm.lopez@gmail.com', 'Cita con el dentista a las 4pm.', 'texto', '24/12/2025', '24/12/2025', 0, 'red');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `plan` varchar(20) NOT NULL DEFAULT 'normal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `correo`, `clave`, `plan`) VALUES
(1, 'Mauro Administrador', 'admin@agenda.com', 'admin123', 'premium'),
(2, 'Juan Perez', 'juan.perez@correo.com', 'juanito2025', 'normal'),
(3, 'Maria Lopez', 'm.lopez@gmail.com', 'claveSegura', 'premium');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `notas`
--
ALTER TABLE `notas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
