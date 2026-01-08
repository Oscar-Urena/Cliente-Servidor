"use strict";

const AJAXFetch = (() => {
    let spinner, input, tabla;
    const init = () => {
        
        document.addEventListener("DOMContentLoaded", () => {
            const boton = document.querySelector("#buscarChip");
            input = document.querySelector("#inputChip");
            spinner = document.querySelector("#spinner");
            tabla = document.querySelector("#tabla-body");
            boton.addEventListener("click", mostrarPerros);
        })
    }

    const mostrarPerros = async () => {
        try {
            limpiarTabla();
            await mostrarSpinner();
            const params = input.value.trim();

            const response = await fetch(`./php/mostrar.php?perro=${params}`);
            if (!response.ok) {
                throw new Error(`Error en la comunicación: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            data.data.forEach(element => {
                console.log(element);
                const tr = document.createElement("tr");
                tabla.append(tr);
                let elemento = document.createElement("td");
                elemento.textContent=element.chip;
                tr.append(elemento);
                elemento = document.createElement("td");
                elemento.textContent=element.nombre;
                tr.append(elemento);
                elemento = document.createElement("td");
                elemento.textContent=element.raza;
                tr.append(elemento);
                elemento = document.createElement("td");
                elemento.textContent=element.fechaNac;
                tr.append(elemento);
            });
            
            
        } catch (error) {
            console.log(error);
        }
    }
    /** 
     * @function mostrarSpinner
     * @description Mostrar dos segundos y ocultar el spinner.
    */
    const mostrarSpinner = () => {
        return new Promise((resolve, reject) => {
            spinner.classList.remove("ocultar");
            setTimeout(() => {
                spinner.classList.add("ocultar");
                resolve(true);
            }, 2000)
        })
    }

    const limpiarTabla =()=>{
        [...tabla.children].forEach(element =>{
            element.remove();
        })
    }


    return {
        init
    }
})();

AJAXFetch.init();