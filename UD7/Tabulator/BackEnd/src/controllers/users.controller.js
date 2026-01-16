import { pool } from '../data/db.js';

/**
 * @function getAlumnos
 * @description extraer todos los módulos de un curso determinado
 * @param {*} req 
 * @param {*} res 
 */


export const getUsers = async (req, res) => {
 try {
   
   

    const [result] = await pool.query("SELECT * FROM users");

    if (!result || result.length === 0) {
      return res.status(200).json({ //para que tabulator muestre el mensaje que no hay registros
        message: 'No se encontraron usuarios',
        data: []
      })
    }
    console.log(result);
    res.status(200).json({data: result});
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al obtener usuarios ${ error.message }`});
  }
}

