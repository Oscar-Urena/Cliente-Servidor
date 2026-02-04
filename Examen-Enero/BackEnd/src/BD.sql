-- Crear base de datos
CREATE DATABASE IF NOT EXISTS clinicatrassierra;
USE clinicatrassierra;

-- Tabla PACIENTES
CREATE TABLE pacientes (
    tarjeta_sanitaria VARCHAR(20) PRIMARY KEY,
    apellidos_nombre VARCHAR(150) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    telefono VARCHAR(15),
    email VARCHAR(100),
    direccion VARCHAR(200),
    fecha_alta TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla ESPECIALIDADES
CREATE TABLE especialidades (
    id_especialidad INT AUTO_INCREMENT PRIMARY KEY,
    nombre_especialidad VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);

-- Tabla MÉDICOS
CREATE TABLE medicos (
    num_colegiado VARCHAR(20) PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    id_especialidad INT NOT NULL,
    dias_consulta SET('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    duracion_cita INT DEFAULT 20 COMMENT 'Duración en minutos',
    telefono VARCHAR(15),
    email VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_especialidad) REFERENCES especialidades(id_especialidad)
);

-- Tabla CITAS
CREATE TABLE citas (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    tarjeta_sanitaria VARCHAR(20) NOT NULL,
    num_colegiado VARCHAR(20) NOT NULL,
    fecha_cita DATE NOT NULL,
    hora_cita TIME NOT NULL,
    observaciones TEXT,
    FOREIGN KEY (tarjeta_sanitaria) REFERENCES pacientes(tarjeta_sanitaria),
    FOREIGN KEY (num_colegiado) REFERENCES medicos(num_colegiado),
    UNIQUE KEY cita_unica (num_colegiado, fecha_cita, hora_cita)
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_paciente_apellidos ON pacientes(apellidos_nombre);
CREATE INDEX idx_citas_fecha ON citas(fecha_cita);
CREATE INDEX idx_citas_paciente ON citas(tarjeta_sanitaria);
CREATE INDEX idx_citas_medico ON citas(num_colegiado);

-- Insertar especialidades
INSERT INTO especialidades (nombre_especialidad, descripcion) VALUES
('Medicina General', 'Atención médica general'),
('Pediatría', 'Atención médica infantil'),
('Cardiología', 'Especialidad del corazón'),
('Traumatología', 'Huesos y articulaciones'),
('Dermatología', 'Enfermedades de la piel');

-- Insertar médicos (6 por especialidad)
-- Medicina General
INSERT INTO medicos (num_colegiado, nombre_completo, id_especialidad, dias_consulta, hora_inicio, hora_fin, duracion_cita, telefono) VALUES
('MG001', 'Dr. García Pérez, Juan', 1, 'Lunes,Miércoles,Viernes', '09:00:00', '14:00:00', 20, '911111001'),
('MG002', 'Dra. Fernández Ruiz, Carmen', 1, 'Martes,Jueves', '09:00:00', '14:00:00', 20, '911111002'),
('MG003', 'Dr. Sánchez López, Antonio', 1, 'Lunes,Martes,Miércoles', '16:00:00', '20:00:00', 20, '911111003'),
('MG004', 'Dra. Martín González, Laura', 1, 'Jueves,Viernes', '16:00:00', '20:00:00', 20, '911111004'),
('MG005', 'Dr. Jiménez Romero, Miguel', 1, 'Lunes,Miércoles,Viernes', '10:00:00', '13:00:00', 20, '911111005'),
('MG006', 'Dra. Álvarez Torres, Marta', 1, 'Martes,Jueves,Viernes', '09:00:00', '13:00:00', 20, '911111006'),

-- Pediatría
('PD001', 'Dra. Rodríguez Díaz, Elena', 2, 'Lunes,Martes,Miércoles', '09:00:00', '14:00:00', 30, '911112001'),
('PD002', 'Dr. Moreno Vázquez, David', 2, 'Jueves,Viernes', '09:00:00', '14:00:00', 30, '911112002'),
('PD003', 'Dra. Navarro Castillo, Beatriz', 2, 'Lunes,Miércoles', '16:00:00', '19:00:00', 30, '911112003'),
('PD004', 'Dr. Iglesias Muñoz, Rafael', 2, 'Martes,Jueves', '16:00:00', '19:00:00', 30, '911112004'),
('PD005', 'Dra. Serrano Ortiz, Patricia', 2, 'Lunes,Martes,Miércoles,Jueves,Viernes', '10:00:00', '12:00:00', 30, '911112005'),
('PD006', 'Dr. Gil Ramírez, Alberto', 2, 'Miércoles,Viernes', '09:00:00', '13:00:00', 30, '911112006'),

-- Cardiología
('CA001', 'Dr. Castro Herrera, José Luis', 3, 'Lunes,Miércoles,Viernes', '09:00:00', '13:00:00', 25, '911113001'),
('CA002', 'Dra. Ramos Medina, Isabel', 3, 'Martes,Jueves', '09:00:00', '14:00:00', 25, '911113002'),
('CA003', 'Dr. Vega Domínguez, Francisco', 3, 'Lunes,Martes', '16:00:00', '20:00:00', 25, '911113003'),
('CA004', 'Dra. Blanco Núñez, Cristina', 3, 'Miércoles,Jueves,Viernes', '16:00:00', '19:00:00', 25, '911113004'),
('CA005', 'Dr. Molina Prieto, Javier', 3, 'Lunes,Miércoles', '10:00:00', '14:00:00', 25, '911113005'),
('CA006', 'Dra. Pascual Sanz, Ana María', 3, 'Martes,Jueves,Viernes', '09:00:00', '12:00:00', 25, '911113006'),

-- Traumatología
('TR001', 'Dr. Cortés Lozano, Manuel', 4, 'Lunes,Miércoles,Viernes', '09:00:00', '14:00:00', 20, '911114001'),
('TR002', 'Dra. Guerrero Santos, Silvia', 4, 'Martes,Jueves', '09:00:00', '14:00:00', 20, '911114002'),
('TR003', 'Dr. Méndez Cabrera, Pablo', 4, 'Lunes,Martes,Miércoles', '16:00:00', '20:00:00', 20, '911114003'),
('TR004', 'Dra. Fuentes Morales, Lucía', 4, 'Jueves,Viernes', '16:00:00', '20:00:00', 20, '911114004'),
('TR005', 'Dr. Cruz Delgado, Sergio', 4, 'Lunes,Jueves', '10:00:00', '13:00:00', 20, '911114005'),
('TR006', 'Dra. Rubio Peña, Gloria', 4, 'Martes,Miércoles,Viernes', '09:00:00', '13:00:00', 20, '911114006'),

-- Dermatología
('DE001', 'Dra. Herrero Flores, Raquel', 5, 'Lunes,Miércoles', '09:00:00', '14:00:00', 15, '911115001'),
('DE002', 'Dr. Aguilar Vargas, Carlos', 5, 'Martes,Jueves,Viernes', '09:00:00', '14:00:00', 15, '911115002'),
('DE003', 'Dra. León Campos, Mónica', 5, 'Lunes,Martes', '16:00:00', '19:00:00', 15, '911115003'),
('DE004', 'Dr. Peña Hidalgo, Alejandro', 5, 'Miércoles,Viernes', '16:00:00', '19:00:00', 15, '911115004'),
('DE005', 'Dra. Soler Crespo, Teresa', 5, 'Lunes,Miércoles,Viernes', '10:00:00', '13:00:00', 15, '911115005'),
('DE006', 'Dr. Caballero Vidal, Óscar', 5, 'Martes,Jueves', '09:00:00', '12:00:00', 15, '911115006');

-- Insertar pacientes de ejemplo
INSERT INTO pacientes (tarjeta_sanitaria, apellidos_nombre, fecha_nacimiento, telefono, email, direccion) VALUES
('TSI123456789', 'González Fernández, Ana', '1985-05-15', '666111222', 'ana.gonzalez@email.com', 'Calle Mayor 15, Madrid'),
('TSI987654321', 'López Martín, Pedro', '1970-08-22', '666333444', 'pedro.lopez@email.com', 'Avenida España 23, Madrid'),
('TSI234567890', 'Martínez Sánchez, María', '1992-03-10', '666555666', 'maria.martinez@email.com', 'Plaza del Sol 8, Madrid'),
('TSI345678901', 'Rodríguez García, Carlos', '1978-11-25', '666777888', 'carlos.rodriguez@email.com', 'Calle Alcalá 45, Madrid'),
('TSI456789012', 'Fernández López, Laura', '2015-07-18', '666999000', 'laura.fernandez@email.com', 'Calle Serrano 30, Madrid'),
('TSI567890123', 'Sánchez Pérez, José', '1965-01-30', '677111222', 'jose.sanchez@email.com', 'Avenida América 12, Madrid'),
('TSI678901234', 'García Martín, Isabel', '1988-09-05', '677333444', 'isabel.garcia@email.com', 'Calle Goya 67, Madrid'),
('TSI789012345', 'Pérez Ruiz, Miguel', '1995-12-14', '677555666', 'miguel.perez@email.com', 'Plaza España 3, Madrid'),
('TSI890123456', 'Romero Díaz, Carmen', '1982-06-20', '677777888', 'carmen.romero@email.com', 'Calle Princesa 89, Madrid'),
('TSI901234567', 'Jiménez Torres, Antonio', '1973-04-08', '677999000', 'antonio.jimenez@email.com', 'Avenida Constitución 55, Madrid'),
('TSI012345678', 'Moreno Navarro, Beatriz', '2010-10-22', '688111222', 'beatriz.moreno@email.com', 'Calle Velázquez 41, Madrid'),
('TSI112345679', 'Torres Iglesias, David', '1990-02-17', '688333444', 'david.torres@email.com', 'Plaza Castilla 7, Madrid'),
('TSI212345680', 'Vázquez Serrano, Patricia', '1968-08-29', '688555666', 'patricia.vazquez@email.com', 'Calle Bravo Murillo 102, Madrid'),
('TSI312345681', 'Castillo Gil, Rafael', '1999-05-11', '688777888', 'rafael.castillo@email.com', 'Avenida Reina Victoria 28, Madrid'),
('TSI412345682', 'Muñoz Castro, Marta', '1980-12-03', '688999000', 'marta.munoz@email.com', 'Calle Gran Vía 150, Madrid');

-- Insertar citas de ejemplo
INSERT INTO citas (tarjeta_sanitaria, num_colegiado, fecha_cita, hora_cita, observaciones) VALUES
-- Citas de Ana González (TSI123456789)
('TSI123456789', 'PD001', '2026-01-27', '09:00:00', 'Revisión anual'),
('TSI123456789', 'MG001', '2026-01-29', '09:20:00', 'Dolor de espalda'),
('TSI123456789', 'CA001', '2026-02-03', '10:00:00', 'Control presión arterial'),

-- Citas de Pedro López (TSI987654321)
('TSI987654321', 'TR001', '2026-01-28', '10:00:00', 'Dolor en rodilla izquierda'),
('TSI987654321', 'CA002', '2026-02-04', '09:30:00', 'Seguimiento cardiológico'),

-- Citas de María Martínez (TSI234567890)
('TSI234567890', 'DE001', '2026-01-27', '09:15:00', 'Revisión lunar en la espalda'),
('TSI234567890', 'MG002', '2026-02-05', '09:00:00', 'Consulta general'),

-- Citas de Carlos Rodríguez (TSI345678901)
('TSI345678901', 'CA003', '2026-01-28', '16:25:00', 'Dolor en el pecho'),
('TSI345678901', 'TR002', '2026-02-06', '10:00:00', 'Rehabilitación hombro'),

-- Citas de Laura Fernández (TSI456789012)
('TSI456789012', 'PD002', '2026-01-30', '10:00:00', 'Vacunación infantil'),
('TSI456789012', 'PD003', '2026-02-10', '16:30:00', 'Revisión pediatría'),

-- Citas de José Sánchez (TSI567890123)
('TSI567890123', 'MG003', '2026-01-27', '16:20:00', 'Renovación recetas'),
('TSI567890123', 'TR003', '2026-02-11', '17:00:00', 'Dolor lumbar'),

-- Citas de Isabel García (TSI678901234)
('TSI678901234', 'DE002', '2026-01-28', '10:45:00', 'Dermatitis'),
('TSI678901234', 'MG004', '2026-02-12', '17:20:00', 'Resultados analítica'),

-- Citas de Miguel Pérez (TSI789012345)
('TSI789012345', 'CA004', '2026-01-29', '17:00:00', 'Primera consulta cardiología'),
('TSI789012345', 'TR004', '2026-02-13', '18:00:00', 'Esguince tobillo'),

-- Citas de Carmen Romero (TSI890123456)
('TSI890123456', 'MG005', '2026-01-29', '11:00:00', 'Gripe'),
('TSI890123456', 'DE003', '2026-02-14', '16:15:00', 'Alergias cutáneas'),

-- Citas de Antonio Jiménez (TSI901234567)
('TSI901234567', 'CA005', '2026-01-29', '11:50:00', 'Hipertensión'),
('TSI901234567', 'MG006', '2026-02-17', '10:40:00', 'Revisión general'),

-- Citas de Beatriz Moreno (TSI012345678)
('TSI012345678', 'PD004', '2026-01-28', '16:30:00', 'Control crecimiento'),
('TSI012345678', 'PD005', '2026-02-18', '10:30:00', 'Revisión pediátrica'),

-- Citas de David Torres (TSI112345679)
('TSI112345679', 'TR005', '2026-01-30', '10:40:00', 'Fractura antigua'),
('TSI112345679', 'DE004', '2026-02-19', '17:15:00', 'Acné'),

-- Citas de Patricia Vázquez (TSI212345680)
('TSI212345680', 'CA006', '2026-01-28', '10:25:00', 'Arritmias'),
('TSI212345680', 'MG001', '2026-02-20', '10:00:00', 'Consulta general'),

-- Citas de Rafael Castillo (TSI312345681)
('TSI312345681', 'DE005', '2026-01-29', '11:30:00', 'Psoriasis'),
('TSI312345681', 'TR006', '2026-02-21', '10:20:00', 'Tendinitis'),

-- Citas de Marta Muñoz (TSI412345682)
('TSI412345682', 'MG002', '2026-01-30', '11:00:00', 'Migrañas frecuentes'),
('TSI412345682', 'CA001', '2026-02-24', '11:25:00', 'Control colesterol');