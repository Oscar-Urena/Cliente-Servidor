"use strict"

import { Router } from 'express';


import { 
    getGame, 
    getGames, 
    getEstadisticas,
    delGame, 
    addGame, 
    updateGame
   
} from '../controllers/games.controllers.js';

import { validar, validarId} from '../validators/games.validators.js';

const router = Router(); //permite definir rutas de manera modular y separada del archivo principal

// Usar el prefijo directamente dentro del archivo
router.get('/games', getGames);
//GET  estadísitica
router.get('/games/estadisticas', getEstadisticas);
// GET - Obtener un Game por ID
router.get('/games/:id', validarId, getGame);


// POST - Crear nuevo Game
router.post('/games', validar, addGame);


// PUT - Actualizar Game completo
router.put('/games/:id', validarId, validar, updateGame);

// DELETE - Eliminar Game
router.delete('/games/:id', validarId, delGame);


export { router as gamesRoutes };
