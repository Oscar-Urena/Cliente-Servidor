"use strict"

import { Router } from 'express';
import { getUsers } from '../controllers/users.controller.js';

const router = Router(); //permite definir rutas de manera modular y separada del archivo principal

// Usar el prefijo directamente dentro del archivo
router.get('/users/', getUsers);


export { router as usersRoutes };
