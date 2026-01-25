"use strict";

const url = "http://localhost:3000/api/users/";

export const getUser = async (id) => {
    try {
        if (!id) {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status} ${response.statusText}`)
            }
            return await response.json();
        } else {
            const response = await fetch(`${url}/${id}`);
            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status} ${response.statusText}`)
            }
            return await response.json();
        }
    } catch (error) {
        throw new Error(`${error}`);
    }
}

export const addUser = async (usuario) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status} ${response.statusText}`)
        }
        return await response.json();
    } catch (error) {
        throw new Error(`${error}`);
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status} ${response.statusText}`)
        }
        return await response.json();
    } catch (error) {
        throw new Error(`${error}`);
    }
}

export const updateUser = async (usuario) =>{
    const {id, ...datos} = usuario;

    try {
        const response = await fetch(`${url}/${id}`, {
            method: "PUT",
            body: JSON.stringify(datos),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status} ${response.statusText}`)
        }
        return await response.json();
    } catch (error) {
        throw new Error(`${error}`);
    }
}