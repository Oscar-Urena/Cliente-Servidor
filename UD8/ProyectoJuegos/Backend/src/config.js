import {config} from 'dotenv'

config(); //leer las variables de entorno

export const PORT = process.env.PORT || 3000; // Puerto para el servidor
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER; 
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;


