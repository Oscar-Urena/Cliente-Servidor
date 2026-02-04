"use strict"

import { Router } from 'express';
import { getUsers, getUser,addUser, updateUser, delUser } from '../controllers/users.controller.js';

const router = Router(); //permite definir rutas de manera modular y separada del archivo principal

// Usar el prefijo directamente dentro del archivo
router.get('/users/', getUsers);
router.get('/users/:id', getUser);
router.post('/users/', addUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', delUser);

export { router as usersRoutes };
