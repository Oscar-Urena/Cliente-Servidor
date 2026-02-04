"use strict"

import { Router } from 'express';
import { getEspecialidades } from '../controllers/especialidades.controller.js';

const router = Router(); //permite definir rutas de manera modular y separada del archivo principal

// Usar el prefijo directamente dentro del archivo
router.get('/especialidades', getEspecialidades);


export { router as especialidadesRoutes };
