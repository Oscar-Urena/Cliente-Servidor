-- ============================================================
--  GAMEVERSE - Script MySQL
--  Crea la base de datos, la tabla juegos e inserta 20 juegos
-- ============================================================

-- Crear y seleccionar la base de datos
CREATE DATABASE IF NOT EXISTS games
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE games;

-- ============================================================
--  TABLA: juegos
-- ============================================================
DROP TABLE IF EXISTS juegos;

CREATE TABLE juegos (
  id           INT           NOT NULL AUTO_INCREMENT,
  titulo       VARCHAR(150)  NOT NULL,
  genero       VARCHAR(50)   NOT NULL,
  plataforma   VARCHAR(50)   NOT NULL,
  anio         YEAR          NOT NULL,
  precio       DECIMAL(6,2)  NOT NULL,
  rating       DECIMAL(3,1)  NOT NULL,
  desarrollador VARCHAR(100) NOT NULL,
  descripcion  TEXT          NOT NULL,
  estado       ENUM('Disponible','Rebajado','Agotado') NOT NULL DEFAULT 'Disponible',
  imagen       VARCHAR(50)   DEFAULT 'default',
  PRIMARY KEY (id),
  CONSTRAINT chk_rating  CHECK (rating  BETWEEN 0 AND 10),
  CONSTRAINT chk_precio  CHECK (precio  >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
--  DATOS: 20 juegos
-- ============================================================
INSERT INTO juegos (titulo, genero, plataforma, anio, precio, rating, desarrollador, descripcion, estado, imagen) VALUES

('The Legend of Zelda: Breath of the Wild',
 'Aventura', 'Switch', 2017, 59.99, 9.8, 'Nintendo EPD',
 'Explora el vasto reino de Hyrule con total libertad en un mundo abierto revolucionario.',
 'Disponible',
 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/c_scale,w_400/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58'),

('Elden Ring',
 'RPG', 'PC', 2026, 49.99, 9.6, 'FromSoftware',
 'Un vasto mundo oscuro y misterioso creado en colaboración con George R.R. Martin.',
 'Disponible',
 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg'),

('God of War Ragnarök',
 'Acción', 'PS5', 2022, 69.99, 9.4, 'Santa Monica Studio',
 'Kratos y Atreus se enfrentan al apocalipsis nórdico en una épica aventura de acción.',
 'Agotado',
 'https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/header.jpg'),

('Red Dead Redemption 2',
 'Acción', 'PC', 2018, 44.99, 9.7, 'Rockstar Games',
 'La épica historia de Arthur Morgan en el salvaje oeste americano de finales del siglo XIX.',
 'Disponible',
 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg'),

('The Witcher 3: Wild Hunt',
 'RPG', 'PC', 2015, 19.99, 9.5, 'CD Projekt RED',
 'Geralt de Rivia recorre un mundo devastado por la guerra en busca de su hija adoptiva.',
 'Rebajado',
 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg'),

('Minecraft',
 'Sandbox', 'Multiplataforma', 2011, 19.99, 9.2, 'Mojang Studios',
 'Construye, explora y sobrevive en un mundo generado proceduralmente de bloques infinitos.',
 'Disponible',
 'https://www.minecraft.net/content/dam/games/minecraft/key-art/Games_Subnav_Minecraft-300x465.jpg'),

('Hollow Knight',
 'Metroidvania', 'PC', 2017, 14.99, 9.1, 'Team Cherry',
 'Explora un reino subterráneo de insectos en decadencia con arte dibujado a mano.',
 'Disponible',
 'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg'),

('Cyberpunk 2077',
 'RPG', 'PC', 2020, 29.99, 8.7, 'CD Projekt RED',
 'Mundo futurista distópico donde te conviertes en mercenario en la ciudad de Night City.',
 'Rebajado',
 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg'),

('Stardew Valley',
 'Simulación', 'Multiplataforma', 2016, 13.99, 9.3, 'ConcernedApe',
 'Hereda una granja y construye una nueva vida en un encantador pueblo rural.',
 'Disponible',
 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg'),

('Dark Souls III',
 'RPG', 'PC', 2016, 19.99, 8.9, 'FromSoftware',
 'El capítulo final de la saga Dark Souls, repleto de desafíos y una oscura narrativa.',
 'Rebajado',
 'https://cdn.cloudflare.steamstatic.com/steam/apps/374320/header.jpg'),

('Hades',
 'Roguelike', 'PC', 2020, 24.99, 9.2, 'Supergiant Games',
 'Escapa del inframundo griego derrotando dioses y monstruos en cada intento.',
 'Disponible',
 'https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg'),

('Sekiro: Shadows Die Twice',
 'Acción', 'PC', 2019, 39.99, 9.0, 'FromSoftware',
 'Shinobi con un brazo prostético lucha en el Japón feudal del período Sengoku.',
 'Disponible',
 'https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg'),

('Celeste',
 'Plataformas', 'PC', 2018, 19.99, 9.1, 'Maddy Makes Games',
 'Escala una montaña mientras superas tus miedos en este preciso plataformas 2D.',
 'Disponible',
 'https://cdn.cloudflare.steamstatic.com/steam/apps/504230/header.jpg'),

('Portal 2',
 'Puzzles', 'PC', 2011, 9.99, 9.5, 'Valve Corporation',
 'Resuelve ingeniosos puzles usando una pistola de portales en una instalación científica abandonada.',
 'Rebajado',
 'https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg'),

('Disco Elysium',
 'RPG', 'PC', 2019, 19.99, 9.3, 'ZA/UM',
 'Detective con amnesia investiga un asesinato en una ciudad única con diálogos revolucionarios.',
 'Rebajado',
 'https://cdn.cloudflare.steamstatic.com/steam/apps/632470/header.jpg'),

('Returnal',
 'Roguelike', 'PS5', 2021, 49.99, 8.8, 'Housemarque',
 'Astronauta atrapada en un bucle temporal en un planeta alienígena hostil.',
 'Disponible',
 'https://cdn.cloudflare.steamstatic.com/steam/apps/1649240/header.jpg'),

('Ori and the Will of the Wisps',
 'Metroidvania', 'PC', 2020, 24.99, 9.0, 'Moon Studios',
 'El espíritu Ori viaja por bosques mágicos en una aventura visualmente impresionante.',
 'Disponible',
 'https://cdn.cloudflare.steamstatic.com/steam/apps/1057090/header.jpg'),

('Monster Hunter: World',
 'Acción', 'PC', 2018, 29.99, 8.8, 'Capcom',
 'Caza criaturas épicas en ecosistemas vivos y crafta equipamiento con sus materiales.',
 'Rebajado',
 'https://cdn.cloudflare.steamstatic.com/steam/apps/582010/header.jpg'),

('Divinity: Original Sin 2',
 'RPG', 'PC', 2017, 22.99, 9.4, 'Larian Studios',
 'RPG por turnos con una profunda narrativa, cooperativo para hasta 4 jugadores.',
 'Disponible',
 'https://cdn.cloudflare.steamstatic.com/steam/apps/435150/header.jpg'),

('Death Stranding',
 'Acción', 'PC', 2019, 29.99, 8.2, 'Kojima Productions',
 'Conecta una América post-apocalíptica transportando cargas en un mundo solitario y misterioso.',
 'Rebajado',
 'https://cdn.cloudflare.steamstatic.com/steam/apps/1190460/header.jpg');
