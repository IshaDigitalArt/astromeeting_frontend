-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-05-2024 a las 12:22:24
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
(1, 1, 5, 9, 'Compatibilidad de Capricornio-Tauro-Virgo. La compatibilidad entre Capricornio y Tauro es muy alta, porque tienen mucho en común y pueden esperar ser muy felices juntos. La compatibilidad de Capricornio con Virgo es muy alta. Virgo tendrá una compenetración inmediata con Capricornio'),
(2, 2, 6, 10, 'Compatibilidad de Acuario-Géminis-Libra. La compatibilidad entre los signos Acuario y Géminis es muy alta, ya que ambos esperan sacar más o menos lo mismo de la vida. La compatibilidad entre Libra y Acuario es excelente, ambos signos son sociables, les encanta conversar y disfrutan con reuniones y actos sociales.'),
(3, 3, 7, 11, 'Compatibilidad de Piscis-Cáncer-Escorpio. Piscis y Cáncer tienen mucho en común, especialmente en cuanto a compatibilidad emocional. La atracción de Escorpio y Piscis es irresistible, una unión con todas las posibilidades de éxito.'),
(4, 4, 8, 12, 'Compatibilidad de Aries-Leo-Sagitario. La atracción inmediata entre Aries y Leo es muy fuerte y tanto Aries como Leo se crecerán en compañía uno del otro y querrán conocer mejor a su pareja a todos los niveles. Tanto Aries como Sagitario son signos de Fuego, por lo que a esta combinación no le faltará nada de variedad y emoción.');

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
(169, 'Soy Capricornio 1', 224, '2024-05-20 07:27:10'),
(170, 'Soy Capricornio 2', 223, '2024-05-20 07:27:42'),
(171, 'Soy Acuario 1', 225, '2024-05-20 07:38:13'),
(172, 'Soy Acuario 2', 227, '2024-05-20 07:41:21'),
(173, 'Soy Piscis 1', 228, '2024-05-20 08:00:47'),
(174, 'Soy Piscis 2', 229, '2024-05-20 08:01:24'),
(175, 'Soy Aries 1', 231, '2024-05-20 08:13:19'),
(176, 'Soy Aries 2', 232, '2024-05-20 08:13:38'),
(177, 'Soy Tauro 1', 233, '2024-05-20 08:15:25'),
(178, 'Soy Tauro 2', 234, '2024-05-20 08:16:49'),
(179, 'Soy Geminis 1', 235, '2024-05-20 08:18:17'),
(180, 'Soy Geminis 2', 236, '2024-05-20 08:19:24'),
(181, 'Soy Cancer 1', 237, '2024-05-20 08:20:42'),
(182, 'Soy Cancer 2', 238, '2024-05-20 08:21:37'),
(183, 'Soy Leo 1', 239, '2024-05-20 09:32:25'),
(184, 'Soy Leo 2', 240, '2024-05-20 09:34:10'),
(185, 'Soy Virgo 1', 242, '2024-05-20 09:35:44'),
(186, 'Soy Virgo 2', 243, '2024-05-20 09:38:44'),
(187, 'Soy Libra 1', 244, '2024-05-20 09:39:53'),
(188, 'Soy Libra 2', 245, '2024-05-20 09:40:45'),
(189, 'Soy Escorpio 1', 246, '2024-05-20 09:41:55'),
(190, 'Soy Escorpio 2', 247, '2024-05-20 09:42:51'),
(191, 'Soy Sagitario 1', 248, '2024-05-20 10:00:43'),
(192, 'Soy Sagitario 2', 249, '2024-05-20 10:02:03');

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
(219, 'Admin', 'Primero', 1, 'admin1@gmail.com', '$2a$10$azMYTS14nPlAaT6nsbO4duTVUewl828f5L9MpjjlFnb96GBRODdWu', '1999-12-12', '', 1, '', 12, 4),
(220, 'Admin', 'Segundo', 1, 'admin2@gmail.com', '$2a$10$iQKjOCv7hkW2pSnY0AWT.uwMRbcAXMBzXitUx0oEyNK2YIZSlQQ2a', '1995-01-29', '', 1, '', 2, 2),
(223, 'Capricornio', 'Segundo', 1, 'capricornio2@gmail.com', '$2a$10$nJYOpM1rDAzDKNLbq6Qo..hUZznn4PLDUfsHWugeWJJ/jnjWHtRC2', '1995-01-02', '', 2, '', 1, 1),
(224, 'Capricornio', 'Primero', 1, 'capricornio1@gmail.com', '$2a$10$9v.LBZYfpXU64ae8S9zdVuHQ2WuIrEU0ujC2KePFlKVHDpPjpjaxu', '1994-12-30', 'Soy capricornio1 con foto y descripcion', 2, 'users/9HDaK_V-SlSUHQTINteeNd7q.png', 1, 1),
(225, 'Acuario', 'Primero', 1, 'acuario1@gmail.com', '$2a$10$N4VGbdH05Z6iN0FzPQRI2uvQiilP1dXCwj4gpcaAEu2cKeD4tbLHe', '1995-01-29', 'Soy acuario1 con foto y descripcion', 2, 'users/9xUwA22bz9C1BOs4tnn27Mi8.png', 2, 2),
(227, 'Acuario', 'Segundo', 1, 'acuario2@gmail.com', '$2a$10$OLxvt1skFm0ol8IIQGLl0ekZRnPeIyzNesYGkOIkXJBRJW38c/EE6', '1995-02-04', '', 2, '', 2, 2),
(228, 'Piscis', 'Primero', 1, 'piscis1@gmail.com', '$2a$10$FzpsZ.3yyePc04j6wLBhb.oxKWpdmB70hRWOINPowdbXpW0w.YSh6', '1995-02-22', 'Soy piscis1 con foto y descripcion', 2, 'users/i3dS7szVpwLRwg-eVXTkNCEe.png', 3, 3),
(229, 'Piscis', 'Segundo', 1, 'piscis2@gmail.com', '$2a$10$.zD0mlZZUvdEyYbugToKDeRdZ0.SHgUTm7In0DpG3gFgbm4Wl1HyC', '1995-03-18', '', 2, '', 3, 3),
(231, 'Aries', 'Primero', 1, 'aries1@gmail.com', '$2a$10$RSiLhye.nqd.D4qzLmhDi.QD8tXriYdEAuf3EE1ZV43NrP1EPN73m', '1995-03-25', 'Soy aries1 con foto y descripcion\r\n', 2, 'users/xD8f3L7kUGNkW0ofn3QvWBCp.png', 4, 4),
(232, 'Aries', 'Segundo', 1, 'aries2@gmail.com', '$2a$10$uvIm/UVWXLM38ki5kmDVmOoXcuH3TwXeeScwYo3AQ270ycC5GMk36', '1995-04-10', '', 2, '', 4, 4),
(233, 'Tauro', 'Primero', 1, 'tauro1@gmail.com', '$2a$10$nYxDjUNzSkmhczQz8r6Ml.jWQO1oQFk9ChbsxQpa2l.YuTAfdfCra', '1995-04-29', 'Soy tauro1 con foto y descripcion', 2, 'users/OrqJSV7qqxxg762I2d5w_77x.png', 5, 1),
(234, 'Tauro', 'Segundo', 1, 'tauro2@gmail.com', '$2a$10$aTiNsA4CT0BvMrsTBgx7Q.pcpPz5GG2gZnmi1f9TXUFdjTJIq7cGu', '1995-05-02', '', 2, '', 5, 1),
(235, 'Geminis', 'Primero', 1, 'geminis1@gmail.com', '$2a$10$M6lFwAWs/9hUIbgsjxtyWOpIgl/MRoaH4EYtGjtk0ybMFfPR3tM7u', '1995-05-29', 'Soy geminis1 con foto y descripcion', 2, 'users/0V59K-5dXHvVRsfMDw7OMlvz.png', 6, 2),
(236, 'Geminis', 'Segundo', 1, 'geminis2@gmail.com', '$2a$10$dQDPlvNsHo167E9Se7/WGep5OmQc3v1ruSeLCs9lJoikfJU.9yql.', '1995-06-10', '', 2, '', 6, 2),
(237, 'Cancer', 'Primero', 1, 'cancer1@gmail.com', '$2a$10$e6Ams8rnXNh9FRhriPMtSOi67Onf2WEjnLJjpt/LZzbi1fQ8TFFKm', '1995-06-21', 'Soy cancer1 con foto y descripcion', 2, 'users/4SLw_fUyNuQKHcmorIGmx9k8.png', 7, 3),
(238, 'Cancer', 'Segundo', 1, 'cancer2@gmail.com', '$2a$10$2easkeFxAuLx056dMHTLVefpH2Q.y187L.Rtqip5FEtrBZo4trjc6', '1995-07-22', '', 2, '', 7, 3),
(239, 'Leo', 'Primero', 1, 'leo1@gmail.com', '$2a$10$xNaa8Q/xfmTYef0g6SxFhuUIvzYE6dP1uRxN.8cYgFHncCKiBwlMK', '1995-07-23', 'Soy leo1 con foto y descripcion', 2, 'users/wc4qhKq7au3ng2Cwov2bAOdE.png', 8, 4),
(240, 'Leo', 'Segundo', 1, 'leo2@gmail.com', '$2a$10$c.1U9gyEz5hvRAW9yctLL.jZJnXfTyrbhp7qCqSEqUJjwUYsUmQ9m', '1995-08-22', '', 2, '', 8, 4),
(242, 'Virgo', 'Primero', 1, 'virgo1@gmail.com', '$2a$10$r8NoKxeKAWW76lTQdJ3cL.0AJtHfBPWBU6oW6eMK4bqSXZIyWuSxO', '1995-08-23', 'Soy virgo1 con foto y descripcion', 2, 'users/U-LsjF2VbreBPkxGXf_dqJqc.png', 9, 1),
(243, 'Virgo', 'Segundo', 1, 'virgo2@gmail.com', '$2a$10$TxjsM8Whc5Q.su0TQusk9.g20j7hBk4RVj1qJ3omqfVXy9KbVRtXK', '1995-09-22', '', 2, '', 9, 1),
(244, 'Libra', 'Primero', 1, 'libra1@gmail.com', '$2a$10$.c9i4sK6tt0hU0T76mZw9efS/BHxpJVoFvN5VD.W6VsVnOM26yqRu', '1995-09-23', 'Soy libra1 con foto y descripcion', 2, 'users/a2zRTXtUn2qM_QIa5ClDOzHr.png', 10, 2),
(245, 'Libra', 'Segundo', 1, 'libra2@gmail.com', '$2a$10$zG7ZWG6wxF8My0v6YmaDieOO/DQbtWi4kFvrcmMHyF3Qua3DO8JyK', '1996-10-21', '', 2, '', 10, 2),
(246, 'Escorpio', 'Primero', 1, 'escorpio1@gmail.com', '$2a$10$DcPg.5VHrxuNxURonaeY2O.xVfXkaRChMZoIdHL1kPdlcs13BRTDq', '1995-10-22', 'Soy escorpio1 con foto y descripcion', 2, 'users/fAoM7XfX9-hoJFEc5kW62Bg-.png', 11, 3),
(247, 'Escorpio', 'Segundo', 1, 'escorpio2@gmail.com', '$2a$10$eo47gFT8jfghtYBDjkbDMubHePPAcK9bciVeA9WDbwB.UI5BRawT6', '1995-11-21', '', 2, '', 11, 3),
(248, 'Sagitario', 'Primero', 1, 'sagitario1@gmail.com', '$2a$10$jJChcPpZB9d34vKDpeYpZOPEMnVh4mQyKe0qtB/Yyb1NtJzlhkf5a', '1995-11-22', 'Soy sagitario1 con foto y descripcion', 2, 'users/ZQ7KZBt380a2HUnHWUhezAgA.png', 12, 4),
(249, 'Sagitario', 'Segundo', 1, 'sagitario2@gmail.com', '$2a$10$FoNSvjwVai0QZYht3gu2Cu6bY2yOSRnSYMuV/PjBMLFn6sqAG43N2', '1995-12-21', '', 2, '', 12, 4);

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(150) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=251;

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
