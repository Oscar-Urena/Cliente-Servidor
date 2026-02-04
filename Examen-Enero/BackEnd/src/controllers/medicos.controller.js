import { pool } from '../data/db.js';

/**
 * @function getMedicos
 * @description extraer todos los médicos de una especilidad
 * @param {*} req 
 * @param {*} res 
 */






export const getMedicos = async (req, res) => {
  try {

    const { idEspec } = req.params
    
    const [result] = await pool.query("SELECT * FROM medicos where id_especialidad=? ANd activo=1 order by nombre_completo", [idEspec]);

    console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener médicos", error: error.message });
  }
};


