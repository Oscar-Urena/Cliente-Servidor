"use strict";

const url = "http://localhost:3000/api";

export const GET = async (tabla) => {
    try {
        const response = await fetch(`${url}/${tabla}`);
        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`${error}`);
    }
}


export const GETid = async (tabla, id) => {
    try {
        const response = await fetch(`${url}/${tabla}/${id}`);
        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`${error}`);
    }
}

export const POST = async (data) =>{
    try {
        const response = await fetch(`${url}/citas`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`${error}`);
    }
}