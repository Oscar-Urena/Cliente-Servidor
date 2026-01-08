"use strict";

const AJAXFetch = (() => {

    let msg, spinner;
    const init = () => {
        document.addEventListener("DOMContentLoaded", () => {
            msg = document.querySelector("#mensaje");
            spinner = document.querySelector("#spinner");

            document.querySelector("#get").addEventListener("click", mostrarGet);
            document.querySelector("#post").addEventListener("click", mostrarPost);
            spinner.classList.add("ocultar");
        })
    }

    const mostratSpinner = () => {
        mensaje.textContent = "";
        return new Promise((resolve, reject) => {
            spinner.classList.remove("ocultar");
            setTimeout(() => {
                spinner.classList.add("ocultar");
                resolve(true);
            }, 2000)
        })
    }

    const mostrarGet = async () => {
        await mostratSpinner();
        try {
            const response = await fetch("./data/Ejemplo1.php?valor=GET&nombre=Ana");
            if (!response.ok) {
                throw new Error(`Error en la comunicacion ${response.status}`);
            }
            const data = await response.text();
            msg.textContent = data;
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