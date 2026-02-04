import { pool} from '../data/db.js';

/**
 * @function getPaciente
 * @description extraer el paciente del id
 * @param {*} req 
 * @param {*} res 
 */


export const getPaciente = async (req, res) => {
 try {
    const {tarjeta} = req.params;
    if (!tarjeta){
      return res.status(400).json({message: `El nº de tarjeta sanitaria debe incluirse en el endpoint`});
    }

    const [result] = await pool.query("SELECT * FROM pacientes where tarjeta_sanitaria=?", [tarjeta]);
    console.log(result);
    res.status(200).json({data: result});
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al obtener el paciente ${ error.message }`});
  }
}