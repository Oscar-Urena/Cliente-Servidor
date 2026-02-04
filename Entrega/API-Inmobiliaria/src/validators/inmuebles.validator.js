import {body ,validationResult} from "express-validator";


export const validarInmueble=[
    body('zona')
        .notEmpty().withMessage('La zona no puede estar vacía')
        .isInt({ min: 1 }).withMessage('La zona debe ser un número ')
]