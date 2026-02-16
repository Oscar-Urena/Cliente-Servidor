import { body, param, validationResult } from 'express-validator';

// Middleware reutilizable para manejar errores
const validationErrors = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            errors: errores.array()
        });
    }
    next();
};
// Validación de ID en parámetros de ruta
export const validarId = [
    param('id')
        .notEmpty().withMessage("El ID es requerido"),


    validationErrors //No lleva paréntesis porque Express necesita la función en sí, no el resultado de ejecutarla. Express la ejecutará más tarde cuando llegue una petición.
];


// Validación completa para POST y PUT
export const validar = [
    body('titulo')
        .notEmpty().withMessage('El título es obligatorio.')
        .isLength({ max: 150 }).withMessage('El título no puede superar 150 caracteres.')
        .trim(),

    body('genero')
        .notEmpty().withMessage('El género es obligatorio.')
        .isLength({ max: 50 }).withMessage('El género no puede superar 50 caracteres.')
        .trim(),

    body('plataforma')
        .notEmpty().withMessage('La plataforma es obligatoria.')
        .isLength({ max: 50 }).withMessage('La plataforma no puede superar 50 caracteres.')
        .trim(),

    body('anio')
        .notEmpty().withMessage('El año es obligatorio.')
        .isInt({ min: 1970, max: new Date().getFullYear() })
        .withMessage(`El año debe estar entre 1970 y ${new Date().getFullYear()}.`)
        .toInt(),

    body('precio')
        .notEmpty().withMessage('El precio es obligatorio.')
        .isFloat({ min: 0, max: 9999.99 })
        .withMessage('El precio debe ser un número entre 0 y 9999.99.')
        .toFloat(),

    body('rating')
        .notEmpty().withMessage('El rating es obligatorio.')
        .isFloat({ min: 0, max: 10 })
        .withMessage('El rating debe ser un número entre 0 y 10.')
        .toFloat(),

    body('desarrollador')
        .notEmpty().withMessage('El desarrollador es obligatorio.')
        .isLength({ max: 100 }).withMessage('El desarrollador no puede superar 100 caracteres.')
        .trim(),

    body('descripcion')
        .notEmpty().withMessage('La descripción es obligatoria.')
        .trim(),

    body('estado')
        .optional()
        .isIn(['Disponible', 'Rebajado', 'Agotado'])
        .withMessage("El estado debe ser 'Disponible', 'Rebajado' o 'Agotado'."),

    body('imagen')
        .optional({ nullable: true, checkFalsy: true })
        .isURL().withMessage('La imagen debe ser una URL válida.')
        .isLength({ max: 200 }).withMessage('La URL de imagen no puede superar 200 caracteres.')
        .trim(),


    validationErrors,
];



