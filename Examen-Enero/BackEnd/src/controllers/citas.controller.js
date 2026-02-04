import { pool } from '../data/db.js';

/**
 * @function addCitas
 * @description añadir una cita
 * @param {*} req 
 * @param {*} res 
 */
export const getCitasMedico = async (req, res) => {
 try {
    const {medico} = req.query;
    const {fecha} = req.params;
    if (!fecha){
      return res.status(400).json({message: `La fecha debe incluirse en el endpoint`});
    }

    const [result] = await pool.query("SELECT hora_cita FROM citas where fecha_cita=? AND num_colegiado=?", [fecha,medico]);
    console.log(result);
    res.status(200).json({data: result});
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al obtener las citas ${ error.message }`});
  }
}

export const addCitas = async (req, res) => {
 try {
   const { tarjeta, colegiado, fecha, hora, obser } = req.body;

    const [result] = await pool.query("INSERT INTO citas (tarjeta_sanitaria, num_colegiado, fecha_cita, hora_cita, observaciones) VALUES (?,?,?,?,?)", [tarjeta, colegiado,  fecha, hora, obser]);

    res.status(201).json({ id: result.insertId });
   
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al grabar la cita ${ error.message }`});
  }
}
