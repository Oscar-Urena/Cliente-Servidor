"use strict"

import { Router } from 'express';
import { addCitas, getCitasMedico } from '../controllers/citas.controller.js';

const router = Router(); //permite definir rutas de manera modular y separada del archivo principal

// Usar el prefijo directamente dentro del archivo
router.get('/citas/:fecha',  getCitasMedico);
router.post('/citas',  addCitas);


export { router as citasRoutes };
