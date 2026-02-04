import { pool } from '../data/db.js';

/**
 * @function getCursos
 * @description extraer todos las especialidades
 * @param {*} req 
 * @param {*} res 
 */
export const getEspecialidades = async (req, res) => {
 try {
    const [result] = await pool.query("SELECT * FROM especialidades");
     console.log(result);
     res.status(200).json({data: result});
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al obtener ${ error.message }`});
  }
}

