"use strict"

import { Router } from 'express';
import { getPaciente} from '../controllers/pacientes.controller.js';


const router = Router(); //permite definir rutas de manera modular y separada del archivo principal



// GET - Obtener paciente por tarjeta sanitaria
router.get('/pacientes/:tarjeta', getPaciente);


export { router as pacientesRoutes };
