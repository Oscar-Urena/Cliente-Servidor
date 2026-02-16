import { pool } from "../data/db.js";


export const getGames = async (req, res) => {
    try {
        const [games] = await pool.query('SELECT * FROM juegos');
        if (games.length == 0) { //para mostrar datos en tabulator
            return res.status(200).json({ data: [] });
        }
        console.log(games);
        res.status(200).json({ data: games });
    } catch (error) {
        console.error('Error al obtener los juegos:', error);
        res.status(500).json({ message: 'Error al obtener los juegos' });
    }
};

export const getGame = async (req, res) => {
    try {
        const { id } = req.params;

        const [game] = await pool.query('SELECT * FROM juegos WHERE id = ?', [id]);
       
        if (!game || game.length === 0)
            return res.status(404).json({ message: "Juego no encontrado" });

        res.status(200).json({ data: game[0] });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener juego", error: error.message });
    }
};
export const getEstadisticas = async (req, res) => {
    try {
        const [estadistica] = await pool.query('SELECT COUNT(*) AS total_juegos, COUNT(DISTINCT genero) AS generos, COUNT(DISTINCT plataforma) AS plataformas, ROUND(AVG(rating), 1) AS rating_medio,  ROUND(AVG(precio), 2) AS precio_medio, MAX(rating) AS mejor_valorado FROM juegos')   

        res.status(200).json({ data: estadistica[0] });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener estadística", error: error.message });
    }                       
};         

export const addGame = async (req, res) => {
    try {
        const { titulo, genero, plataforma, anio, precio, rating, desarrollador, descripcion, estado, imagen } = req.body;

        const [result] = await pool.query(
            'INSERT INTO juegos (titulo, genero, plataforma, anio, precio, rating, desarrollador, descripcion, estado, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [titulo, genero, plataforma, anio, precio, rating, desarrollador, descripcion, estado || 'Disponible', imagen || null]
        );

        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error al insertar el juego", error: error.message });
    }
};

export const updateGame = async (req, res) => {
    const { id } = req.params;
    const { titulo, genero, plataforma, anio, precio, rating, desarrollador, descripcion, estado, imagen } = req.body;
    try {

        const [result] = await pool.query(
            'UPDATE juegos SET titulo = ?, genero = ?, plataforma = ?, anio = COALESCE(?, anio), precio = COALESCE(?, precio), rating = COALESCE(?, rating), desarrollador = COALESCE(?, desarrollador), descripcion = COALESCE(?, descripcion), estado = COALESCE(?, estado), imagen = COALESCE(?, imagen) WHERE id = ?',
            [titulo, genero, plataforma, anio, precio, rating, desarrollador, descripcion, estado || 'Disponible', imagen || null, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }
        res.status(200).json({ message: 'Juego actualizado correctamente' });
    } catch (error) {
        console.error(`Error al actualizar el libro con id ${id}:`, error);
        res.status(500).json({ message: 'Error al actualizar el libro' });
    }
};

export const delGame = async (req, res) => {
     const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM juegos WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }
        res.status(200).json({ message: 'Juego eliminado correctamente' });
    }
    catch (error) {
        console.error(`Error al eliminar el juego con id ${id}:`, error);
        res.status(500).json({ message: 'Error al eliminar el juego' });
    }
};

