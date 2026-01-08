"use strict";

const AJAXFetch = (() => {

    let msg, spinner, cursos;
    const init = () => {
        document.addEventListener("DOMContentLoaded", () => {
            msg = document.querySelector("#mensaje");
            spinner = document.querySelector("#spinner");
            cursos = document.querySelector("#cursos");

            document.querySelector("#cursos").addEventListener("change", mostrarModulos);
            spinner.classList.add("ocultar");
        })
    }

    const mostratSpinner = () => {
        return new Promise((resolve, reject) => {
            spinner.classList.remove("ocultar");
            setTimeout(() => {
                spinner.classList.add("ocultar");
                resolve(true);
            }, 2000)
        })
    }

    const borrarModulos=()=>{
        const opciones = document.querySelector("#modulos").querySelectorAll("option:not(:first-child)");
        opciones.forEach(element=>{
            element.remove();
        })
    }

    const mostrarModulos = async () => {
        await mostratSpinner();
        try {
            const response = await fetch("./data/Ejemplo2.xml");
            if (!response.ok) {
                throw new Error(`Error en la comunicacion ${response.status}`);
            }
            const data = await response.text();
            console.log(data); 

            const parse = new DOMParser();
            const xmlDoc = parse.parseFromString(data, "text/xml");

            borrarModulos();
            xmlDoc.querySelectorAll("curso").forEach((element,index) =>{
                if(index == cursos.value-1){
                    
                    element.querySelectorAll("asig").forEach(mod=>{
                        const modulo = document.createElement("option");
                        modulo.setAttribute("value", mod.textContent);
                        modulo.textContent = mod.textContent;
                        
                        document.querySelector("#modulos").append(modulo)
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const mostrarPost = async () => {
        await mostratSpinner();
        try {
            const response = await fetch("./data/Ejemplo1.php", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "valor=POST&nombre=Luis"
            });
            if (!response.ok) {
                throw new Error(`Error en la comunicacion ${response.status}`);
            }
            const data = await response.text();
            msg.textContent = data;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        init
    }
})();

AJAXFetch.init();