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

export const getUser = async (req, res) => {
 try {
   const {id} =req.params
   

    const [result] = await pool.query("SELECT * FROM users where id=?",[id]);

    if (!result || result.length === 0) {
      return res.status(200).json({ //para que tabulator muestre el mensaje que no hay registros
        message: 'No se encontró el usuario',
        data: []
      })
    }
    console.log(result);
    res.status(200).json({data: result});
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al obtener el usuario ${ error.message }`});
  }
}

export const addUser = async (req, res) => {
  try {

    const { name, email, pass, role, active } = req.body;

    const [result] = await pool.query("INSERT INTO users (name, email, password, role, active) VALUES (?,?,?,?)", [name, email, pass, role, active]);

    res.status(201).json({ data: result, id: result.insertId });
  } catch (error) {
    res.status(500).json(
      { message: "Error al insertar el usuario", error: error.message }
    )

  };
}

  export const updateUser = async (req, res) => {
    try {
     
      const { name, email, role, active } = req.body;
      const { id } = req.params;

      const [result] = await pool.query("UPDATE users SET name=?, email=?, password=?, role=?, active=? WHERE id=?", [name, email, pass, role, active, id]);

      if (result.affectedRows == 0) { //No exite el usuario
        return res.status(400).json({
          message: 'El usuario no existe'
        })
      }
      res.status(200).json({
        message: 'El usuario ha sido actualizado'
      })


    } catch (error) {
      res.status(500).json(
        { message: "Error al actualizar el usuario", error: error.message }
      )
    }

  }

 
  export const delUser = async (req, res) => {

    try {
      console.log({ req });
      const { id } = req.params
      const [result] = await pool.query("DELETE FROM users WHERE id=?", [id]);
     
      if (result.affectedRows == 0) {
        return res.status(400).json({
          message: 'El usuario no existe'
        })
      } else {
        return res.status(200).json({
          message: 'El usuario ha sido borrado'
        })
      }
    } catch (error) {
       res.status(500).json(
        { message: "Error al borrar el usuario", error: error.message }
      )
    }
  };