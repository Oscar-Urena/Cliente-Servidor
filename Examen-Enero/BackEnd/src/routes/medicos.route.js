"use strict"

import { Router } from 'express';


import { getMedicos} from '../controllers/medicos.controller.js';


const router = Router(); //permite definir rutas de manera modular y separada del archivo principal

// Usar el prefijo directamente dentro del archivo
router.get('/medicos/:idEspec',  getMedicos);



export { router as medicosRoutes };

