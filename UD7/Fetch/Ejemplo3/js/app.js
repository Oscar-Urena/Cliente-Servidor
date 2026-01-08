"use strict";

const AJAXFetch = (() => {

    let msg, provincias;
    const init = () => {
        document.addEventListener("DOMContentLoaded", () => {
            msg = document.querySelector("#mensaje");
            provincias = document.querySelector("#provincias");

            mostrarProvincias();
        })
    }

    const mostrarProvincias = async () => {
        try {
            const response = await fetch("https://raw.githubusercontent.com/IagoLast/pselect/master/data/provincias.json");
            if (!response.ok) {
                throw new Error(`Error en la comunicacion ${response.status}`);
            }
            const data = await response.json();
            
            
            data.sort((a,b) => a.nm.localeCompare(b.nm));
            console.log(data); 

            data.forEach(element => {
                const op = document.createElement("option");
                op.setAttribute("value", element.id);
                op.textContent = element.nm;
                provincias.append(op);
            });
            // xmlDoc.querySelectorAll("curso").forEach((element,index) =>{
            //     if(index == cursos.value-1){
                    
            //         element.querySelectorAll("asig").forEach(mod=>{
            //             const modulo = document.createElement("option");
            //             modulo.setAttribute("value", mod.textContent);
            //             modulo.textContent = mod.textContent;
                        
            //             document.querySelector("#modulos").append(modulo)
            //         })
            //     }
            // })
            
            provincias.addEventListener("change",()=>{
                msg.classList.remove("ocultar");
                msg.textContent = `El id es ${provincias.value}`;
            });
        } catch (error) {
            console.log(error);
        }
    }

    return {
        init
    }
})();

AJAXFetch.init();