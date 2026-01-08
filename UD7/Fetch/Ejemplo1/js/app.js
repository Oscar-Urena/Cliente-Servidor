"use strict";

const AJAXFetch =(()=>{

    let msg, spinner;
    const init =()=>{
        document.addEventListener("DOMContentLoaded", ()=>{
            msg = document.querySelector("#mensaje");
            spinner = document.querySelector("#spinner");

            document.querySelector("#get").addEventListener("click",mostrarGet);
            document.querySelector("#post").addEventListener("click",mostrarPost);
            spinner.classList.add("ocultar");
        })
    }

    const mostratSpinner =()=>{
        mensaje.textContent ="";
        return new Promise((resolve, reject) =>{
            spinner.classList.remove("ocultar");
            setTimeout(() => {
                spinner.classList.add("ocultar");
                resolve(true);
            }, 2000)
        })
    }

    const mostrarGet= async()=>{
        await mostratSpinner();
        fetch("./data/Ejemplo1.php?valor=GET&nombre=Ana")
        .then(response =>{
            if(!response.ok){
                throw new Error(`Error en la comunicacion ${response.status}`);
            };
            return response.text();
        }).then(data=>{
            msg.textContent = data;
        }).catch(error =>{
            console.log(error);
        })
    }

    const mostrarPost= async()=>{
        await mostratSpinner();
        fetch("./data/Ejemplo1.php",{
            method: 'POST',
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body:"valor=POST&nombre=Luis"
        })
        .then(response =>{
            if(!response.ok){
                throw new Error(`Error en la comunicacion ${response.status}`);
            };
            return response.text();
        }).then(data=>{
            msg.textContent = data;
        }).catch(error =>{
            console.log(error);
        })
    }

    return{
        init
    }
})();

AJAXFetch.init();