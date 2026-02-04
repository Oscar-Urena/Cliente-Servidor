"use strict";
const url = "http://localhost:3000/api/users";

export const addUser = async (usuario) => {
  const param = {
    method: "POST",
    body: JSON.stringify(usuario),
    headers: {
      'Content-Type': 'application/json'
    },
  };
  try {
    const response = await fetch(url, param);
     if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data
  } catch (error) {
    return { error };
  }
};

export const getUser = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`);
     if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { error };
  }
};

/**
 * @function deleteUser
 * @description Elimina un usuario por su ID
 * @param {number} id - ID del usuario a eliminar
 * @returns {Promise<Object>} Objeto con el resultado de la operación
 */
export const deleteUser = async (id) => {
  const param = {
    method: "DELETE"
   
  };
  try {
    const response = await fetch(`${url}/${id}`, param);
    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return data;
  }
};

export const updateUser = async (usuario) => {
  const{id, ...datos} =usuario;
 
  const param = {
    method: "PUT",
    body: JSON.stringify(datos),
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const response = await fetch(`${url}/${id}`, param);
     if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return data
  }
};