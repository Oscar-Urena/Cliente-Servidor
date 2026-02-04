import { pool } from '../data/db.js';

export const getZonas = async (req, res) => {
    try {
        const result = await pool.query("SELECT * from zonas");
        if (result.length == 0) {
            return res.status(400).json({ data: [], message: "No hay zonas registradas" });
        }
        console.log(result);
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener zonas" });
    }
}

export const getZona = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("SELECT * FROM zonas WHERE idzona = ?", [id]);
        if (result.length == 0) {
            return res.status(400).json({ data: [] });
        }
        console.log(result);
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la zona" });
    }
}

export const postZona = async (req, res) => {
    try {
        const { descrip } = req.body;

        const [result] = await pool.query("INSERT INTO zonas (descripcion) VALUES (?) ", [descrip]);
        res.status(201).json({ message: "Zona insertada correctamente", data: result });
    } catch (error) {
        res.status(500).json(
            { message: "Error al insertar la zona" }
        )
    };
}

export const putZona = async (req, res) => {
    try {

        const { descrip } = req.body;
        const {id} = req.params;

        const [result] = await pool.query("UPDATE zonas SET descripcion =? where idZona=?", [descrip, id]);

        if(result.affectedRows == 0){
            res.status(400).json({
                message: "No existe una zona con ese id"
            })
        }
        res.status(200).json({
            message: "La zona ha sido actualizado correctamente"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la zona"
        })
    };
}

export const deleteZona = async (req, res) =>{
    try {
        const {id} = req.params;

        const [result] = await pool.query("DELETE FROM zonas WHERE idZona=?",[id]);

        if(result.affectedRows == 0){
            res.status(400).json({
                message: "No existe una zona con ese id"
            })
        }
        res.status(200).json({
            message: "La zona se ha borrado ha sido actualizado correctamente"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la zona"
        })
    };
}