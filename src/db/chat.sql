-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-05-2024 a las 08:58:19
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
-- Base de datos: `chat`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compatibilidad`
--

CREATE TABLE `compatibilidad` (
  `id_compatibilidad` int(11) NOT NULL,
  `id_horoscopo1` int(11) DEFAULT NULL,
  `id_horoscopo2` int(11) DEFAULT NULL,
  `id_horoscopo3` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compatibilidad`
--

INSERT INTO `compatibilidad` (`id_compatibilidad`, `id_horoscopo1`, `id_horoscopo2`, `id_horoscopo3`, `descripcion`) VALUES
(1, 1, 5, 9, 'La compatibilidad entre Capricornio y Tauro es muy alta, porque tienen mucho en común y pueden esperar ser muy felices juntos. La compatibilidad de Capricornio con Virgo es muy alta. Virgo tendrá una compenetración inmediata con Capricornio'),
(2, 2, 6, 10, 'La compatibilidad entre los signos Acuario y Géminis es muy alta, ya que ambos esperan sacar más o menos lo mismo de la vida. La compatibilidad entre Libra y Acuario es excelente, ambos signos son sociables, les encanta conversar y disfrutan con reuniones y actos sociales.'),
(3, 3, 7, 11, 'Piscis y Cáncer tienen mucho en común, especialmente en cuanto a compatibilidad emocional. La atracción de Escorpio y Piscis es irresistible, una unión con todas las posibilidades de éxito.'),
(4, 4, 8, 12, 'La atracción inmediata entre Aries y Leo es muy fuerte y tanto Aries como Leo se crecerán en compañía uno del otro y querrán conocer mejor a su pareja a todos los niveles. Tanto Aries como Sagitario son signos de Fuego, por lo que a esta combinación no le faltará nada de variedad y emoción.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horoscopos`
--

CREATE TABLE `horoscopos` (
  `id_horoscopo` int(11) NOT NULL,
  `zodiaco` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `start_month` int(11) DEFAULT NULL,
  `start_day` int(11) DEFAULT NULL,
  `end_month` int(11) DEFAULT NULL,
  `end_day` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horoscopos`
--

INSERT INTO `horoscopos` (`id_horoscopo`, `zodiaco`, `descripcion`, `start_month`, `start_day`, `end_month`, `end_day`) VALUES
(1, 'Capricornio', 'Tenaz, austero, resistente. Compatibilidades: Tauro y Virgo', 12, 22, 1, 19),
(2, 'Acuario', 'Inteligente y Equilibrado. Compatibilidades: Géminis y Libra', 1, 20, 2, 18),
(3, 'Piscis', 'Generoso, emotivo y sensitivo. Compatibilidades: Cáncer y Escorpio', 2, 19, 3, 20),
(4, 'Aries', 'Ingenioso, despierto. Compatibilidades: Leo y Sagitario', 3, 21, 4, 19),
(5, 'Tauro', 'Sensual, seguro y estable. Compatibilidades: Virgo y Capricornio', 4, 20, 5, 20),
(6, 'Géminis', 'Inteligente, versátil y buen comunicados. Compatibilidades: Libra y Acuario', 5, 21, 6, 20),
(7, 'Cáncer', 'Tenaces, cariñosos. Compatibilidades: Escorpio y Piscis', 6, 21, 7, 22),
(8, 'Leo', 'Sincero, abierto y generoso. Compatibilidades: Aries y Sagitario', 7, 23, 8, 22),
(9, 'Virgo', 'Firme, prudente y perseverante. Compatibilidades: Escorpio y Piscis', 8, 23, 9, 22),
(10, 'Libra', 'Amable, armónico y diplomático. Compatibilidades: Géminis y Acuario', 9, 23, 10, 21),
(11, 'Escorpio', 'Apasionado, intenso, vital y atrayente. Compatibilidades: Cáncer y Piscis', 10, 22, 11, 21),
(12, 'Sagitario', 'Aventurero, enérgico y curioso. Compatibilidades: Aries y Leo', 11, 22, 12, 21);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messages`
--

CREATE TABLE `messages` (
  `id` int(10) NOT NULL,
  `content` varchar(450) NOT NULL,
  `userId` int(10) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `messages`
--

INSERT INTO `messages` (`id`, `content`, `userId`, `date`) VALUES
(152, 'la lola', 219, '2024-05-16 20:54:36'),
(153, 'paca', 219, '2024-05-16 20:54:39'),
(154, 'she', 219, '2024-05-16 20:54:42'),
(155, 'sheiojoaeifaçs', 219, '2024-05-16 20:54:44'),
(156, 'f', 219, '2024-05-16 20:54:44'),
(157, 'jfdasjdfjsad', 220, '2024-05-16 21:12:42'),
(158, 'maerjj', 220, '2024-05-16 21:12:45'),
(159, 'rtrtr', 220, '2024-05-16 21:13:47'),
(160, 'rretet', 219, '2024-05-16 21:14:29'),
(161, 'sadsda', 219, '2024-05-16 21:20:49'),
(162, 'asdasd', 219, '2024-05-16 21:20:51'),
(163, 'www', 219, '2024-05-16 21:21:12'),
(164, 'sadas', 219, '2024-05-16 21:23:23'),
(165, 'eewew', 219, '2024-05-16 21:23:27'),
(166, 'fasfasfsa', 219, '2024-05-16 21:26:33'),
(167, 'aa', 219, '2024-05-16 21:26:35'),
(168, 'eeeee', 219, '2024-05-16 21:27:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(10) NOT NULL,
  `name` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(150) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `descripcion` text NOT NULL,
  `roleId` int(10) NOT NULL,
  `img` varchar(150) NOT NULL,
  `id_horoscopo` int(11) NOT NULL,
  `id_compatibilidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `active`, `email`, `password`, `fecha_nacimiento`, `descripcion`, `roleId`, `img`, `id_horoscopo`, `id_compatibilidad`) VALUES
(219, 'juan', 'fran', 1, 'juan@gmail.com', '$2a$10$azMYTS14nPlAaT6nsbO4duTVUewl828f5L9MpjjlFnb96GBRODdWu', '1999-12-12', '', 2, '', 12, 4),
(220, 'isa', 'cabel', 1, 'isa@gmail.com', '$2a$10$iQKjOCv7hkW2pSnY0AWT.uwMRbcAXMBzXitUx0oEyNK2YIZSlQQ2a', '1995-01-29', '', 2, '', 2, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `compatibilidad`
--
ALTER TABLE `compatibilidad`
  ADD PRIMARY KEY (`id_compatibilidad`),
  ADD KEY `id_horoscopo1` (`id_horoscopo1`),
  ADD KEY `id_horoscopo2` (`id_horoscopo2`),
  ADD KEY `id_horoscopo3` (`id_horoscopo3`);

--
-- Indices de la tabla `horoscopos`
--
ALTER TABLE `horoscopos`
  ADD PRIMARY KEY (`id_horoscopo`);

--
-- Indices de la tabla `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `roleId` (`roleId`),
  ADD KEY `id_horoscopo` (`id_horoscopo`),
  ADD KEY `id_compatibilidad` (`id_compatibilidad`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `compatibilidad`
--
ALTER TABLE `compatibilidad`
  MODIFY `id_compatibilidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(150) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=221;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compatibilidad`
--
ALTER TABLE `compatibilidad`
  ADD CONSTRAINT `compatibilidad_ibfk_1` FOREIGN KEY (`id_horoscopo1`) REFERENCES `horoscopos` (`id_horoscopo`),
  ADD CONSTRAINT `compatibilidad_ibfk_2` FOREIGN KEY (`id_horoscopo2`) REFERENCES `horoscopos` (`id_horoscopo`),
  ADD CONSTRAINT `compatibilidad_ibfk_3` FOREIGN KEY (`id_horoscopo3`) REFERENCES `horoscopos` (`id_horoscopo`);

--
-- Filtros para la tabla `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`id_horoscopo`) REFERENCES `horoscopos` (`id_horoscopo`),
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`id_compatibilidad`) REFERENCES `compatibilidad` (`id_compatibilidad`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
