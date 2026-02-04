import { pool } from '../data/db.js';


export const getInmuebles = async (req, res) => {
    try {
        const { zona, precioMin, precioMax } = req.query;

        let query = "SELECT * FROM inmuebles";
        const params = [];

        // Si vienen los 3 filtros, aplicamos búsqueda filtrada
        if (zona && precioMin && precioMax) {
            query += " WHERE zona = ? AND precio >= ? AND precio <= ?";
            params.push(zona, precioMin, precioMax);
        }

        const [result] = await pool.query(query, params);

        if (result.length === 0) {
            return res.status(400).json({
                data: [],
                message: "No hay inmuebles que coincidan con la búsqueda"
            });
        }

        res.status(200).json({ data: result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener inmuebles" });
    }
};

export const getInmueble = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("SELECT * FROM inmuebles WHERE idinmueble = ?", [id]);
        if (result.length == 0) {
            res.status(400).json({ data: [], message: "No existe un inmueble registrados con ese id" });
        }
        console.log(result);
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener inmuebles" });
    }
}

export const postInmueble = async (req, res) => {
    try {

        const { zona, tipo, domicilio, habitaciones, banos, metros_cuadrados, precio, reservado } = req.body;
        const [result] = await pool.query("INSERT INTO inmuebles (zona, tipo_inmueble, domicilio, habitaciones, banos, metros_cuadrados, precio, reservado) VALUES (?,?,?,?,?,?,?,?)");
        if (result.length == 0) {
            res.status(400).json({ data: [], message: "No hay inmuebles registrados" });
        }
        console.log(result);
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener inmuebles" });
    }
}

export const putInmueble = async (req, res) =>{}

export const patchInmueble = async (req, res) =>{}

export const deleteInmueble = async (req, res) =>{}