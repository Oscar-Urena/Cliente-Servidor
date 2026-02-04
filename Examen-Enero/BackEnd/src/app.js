import express from 'express';

import cors from 'cors';

import { medicosRoutes } from './routes/medicos.route.js';
import { pacientesRoutes } from './routes/pacientes.route.js';
import { especialidadesRoutes } from './routes/especialidades.route.js';
import { citasRoutes } from './routes/citas.route.js';
import {PORT} from './config.js'


const app = express();

const corsOption ={
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}
app.use(cors(corsOption)); //habilitar cors

app.use(express.json()); // Para parsear JSON en el body

// Usar las rutas directas); // No necesitas añadir un prefijo aquí
app.use('/api', pacientesRoutes);
app.use('/api', medicosRoutes);
app.use('/api', especialidadesRoutes);
app.use('/api', citasRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'API REST con Express.js',
    })
});
// Manejar rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({ message: 'Página no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
